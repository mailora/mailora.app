import { NextResponse } from 'next/server';

import { Conversation } from '@/db/models';
import { connectToDatabase } from '@/db/mongoose';
import { getServerSession } from '@/lib/auth-server';

export async function GET() {
  try {
    const session = await getServerSession();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await connectToDatabase();

    const conversations = await Conversation.find({ userId: session.user.id })
      .sort({ updatedAt: -1 })
      .select('_id title emailType tone totalTokens timeTaken createdAt updatedAt')
      .limit(50);

    return NextResponse.json(conversations);
  } catch (error) {
    console.error('Error fetching conversations:', error);
    return NextResponse.json({ error: 'Failed to fetch conversations' }, { status: 500 });
  }
}
