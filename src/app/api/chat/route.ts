import { google } from '@ai-sdk/google';
import { streamText } from 'ai';

import { Conversation, IMessage } from '@/db/models';
import { connectToDatabase } from '@/db/mongoose';
import { getServerSession } from '@/lib/auth-server';

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
  try {
    const session = await getServerSession();
    if (!session) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const { messages, emailType, tone, conversationId } = await req.json();
    const aiStartTime = Date.now();

    await connectToDatabase();

    const systemPrompt = `You are Mailora, an AI email assistant. Generate professional emails based on user requests.

Email Type: ${emailType || 'general'}
Tone: ${tone || 'professional'}

IMPORTANT: Always respond in this exact JSON format:
{
  "subject": "Your email subject line here",
  "body": "Your email body content here"
}

Guidelines:
- Generate both subject and body content separately
- Subject should be clear, concise, and relevant to the email type
- Body should use proper email formatting with greetings and closings
- Match the requested tone (${tone || 'professional'}) and email type (${emailType || 'general'})
- Keep emails concise but complete
- Use placeholders like [Name], [Company] where appropriate
- Do not include any text outside the JSON format`;

    const result = streamText({
      model: google('gemini-2.0-flash-exp'),
      system: systemPrompt,
      messages,
      onFinish: async (result) => {
        // Save conversation and AI response when streaming finishes
        if (result.text) {
          try {
            const aiTimeTaken = Date.now() - aiStartTime;
            const firstUserMessage =
              messages.find((msg: IMessage) => msg.role === 'user')?.content || 'New Email';
            const title =
              firstUserMessage.length > 50
                ? firstUserMessage.substring(0, 50) + '...'
                : firstUserMessage;

            let conversation;
            if (conversationId) {
              conversation = await Conversation.findById(conversationId);
            }

            if (!conversation) {
              conversation = new Conversation({
                userId: session.user.id,
                title,
                messages: [],
                emailType,
                tone,
                totalTokens: 0,
                timeTaken: 0,
              });
            }

            // Add all messages from the current request if not already added
            const existingMessageIds = conversation.messages.map((msg: IMessage) => msg.id);
            const newMessages = messages.filter(
              (msg: IMessage) => !existingMessageIds.includes(msg.id)
            );

            newMessages.forEach((msg: IMessage) => {
              conversation.messages.push({
                id: msg.id || `${msg.role}-${Date.now()}`,
                role: msg.role,
                content: msg.content,
                timestamp: new Date(),
                ...(msg.role === 'user' && { timeTaken: 100 }), // User typing time
              });
            });

            // Add AI response with token and time data
            const aiTokens = {
              input: result.usage?.promptTokens || 0,
              output: result.usage?.completionTokens || 0,
              total: (result.usage?.promptTokens || 0) + (result.usage?.completionTokens || 0),
            };

            const aiMessage = {
              id: `ai-${Date.now()}`,
              role: 'assistant' as const,
              content: result.text,
              timestamp: new Date(),
              tokens: aiTokens,
              timeTaken: aiTimeTaken,
            };
            console.log('AI response:', aiMessage);

            conversation.messages.push(aiMessage);

            // Update conversation totals
            conversation.totalTokens = (conversation.totalTokens || 0) + aiTokens.total;
            conversation.timeTaken = (conversation.timeTaken || 0) + aiTimeTaken;
            conversation.updatedAt = new Date();

            await conversation.save();

            console.log(
              `Saved conversation with ${aiTokens.total} tokens and ${aiTimeTaken}ms time`
            );
          } catch (dbError) {
            console.error('Database error saving AI response:', dbError);
          }
        }
      },
      experimental_telemetry: {
        isEnabled: true,
        functionId: 'chat-response',
      },
    });

    return result.toDataStreamResponse();
  } catch (error) {
    console.error('Chat API error:', error);
    return new Response(JSON.stringify({ error: 'Failed to generate response' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
