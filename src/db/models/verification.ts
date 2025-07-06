import mongoose, { Document, Schema } from 'mongoose';

export interface IVerification extends Document {
  _id: string;
  identifier: string;
  value: string;
  expiresAt: Date;
  createdAt: Date;
  updatedAt: Date;
}

const verificationSchema = new Schema<IVerification>(
  {
    identifier: {
      type: String,
      required: true,
    },
    value: {
      type: String,
      required: true,
    },
    expiresAt: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

verificationSchema.index({ identifier: 1 });
verificationSchema.index({ expiresAt: 1 });

export const Verification =
  mongoose.models.Verification || mongoose.model<IVerification>('Verification', verificationSchema);
