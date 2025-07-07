import mongoose, { Document, Schema } from 'mongoose';

export interface IMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  tokens?: {
    input: number;
    output: number;
    total: number;
  };
  timeTaken?: number; // in milliseconds
}

export interface IConversation extends Document {
  _id: string;
  userId: string;
  title: string;
  messages: IMessage[];
  emailType?: string;
  tone?: string;
  totalTokens: number;
  timeTaken: number; // in milliseconds
  createdAt: Date;
  updatedAt: Date;
}

const messageSchema = new Schema<IMessage>({
  id: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ['user', 'assistant'],
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
  tokens: {
    input: Number,
    output: Number,
    total: Number,
  },
  timeTaken: Number,
});

const conversationSchema = new Schema<IConversation>(
  {
    userId: {
      type: String,
      required: true,
      index: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    messages: [messageSchema],
    emailType: {
      type: String,
      required: false,
    },
    tone: {
      type: String,
      required: false,
    },
    totalTokens: {
      type: Number,
      default: 0,
    },
    timeTaken: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

conversationSchema.index({ userId: 1, createdAt: -1 });

export const Conversation =
  mongoose.models.Conversation || mongoose.model<IConversation>('Conversation', conversationSchema);
