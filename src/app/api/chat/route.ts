import { google } from '@ai-sdk/google';
import { streamText } from 'ai';

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
  try {
    const { messages, emailType, tone } = await req.json();

    const systemPrompt = `You are Mailora, an AI email assistant. Generate professional emails based on user requests.

Email Type: ${emailType || 'general'}
Tone: ${tone || 'professional'}

Guidelines:
- Always include a clear subject line
- Use proper email formatting
- Match the requested tone and email type
- Keep emails concise but complete
- Include appropriate greetings and closings
- Use placeholders like [Name], [Company] where appropriate`;

    const result = streamText({
      model: google('gemini-2.0-flash-exp'),
      system: systemPrompt,
      messages,
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
