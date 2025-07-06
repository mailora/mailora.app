import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { connectToDatabase } from '@/db/mongoose';
import Contact from '@/db/models/contact';
import { ContactEmailService } from '@/emails/services/contact-email';

// Validation schema for contact form
const ContactSchema = z.object({
  name: z.string().min(1, 'Name is required').max(100, 'Name cannot exceed 100 characters').trim(),
  email: z.string().email('Please provide a valid email address').trim().toLowerCase(),
  subject: z
    .string()
    .min(1, 'Subject is required')
    .max(200, 'Subject cannot exceed 200 characters')
    .trim(),
  message: z
    .string()
    .min(10, 'Message must be at least 10 characters')
    .max(2000, 'Message cannot exceed 2000 characters')
    .trim(),
});

export async function POST(request: NextRequest) {
  try {
    // Parse and validate request body
    const body = await request.json();
    const validatedData = ContactSchema.parse(body);

    // Connect to database
    await connectToDatabase();

    // Create contact record
    const contact = new Contact({
      ...validatedData,
      source: 'website',
      status: 'new',
      priority: 'medium',
    });

    // Save to database
    const savedContact = await contact.save();

    // Send emails asynchronously (don't wait for completion)
    ContactEmailService.sendContactEmails(savedContact).catch((error) => {
      console.error('Email sending failed:', error);
      // Could add to a retry queue here
    });

    // Return success response
    return NextResponse.json(
      {
        success: true,
        message: "Your message has been sent successfully! We'll get back to you soon.",
        contactId: savedContact._id,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Contact form submission error:', error);

    // Handle validation errors
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          error: 'Please check your input and try again.',
          details: error.errors.map((err) => ({
            field: err.path.join('.'),
            message: err.message,
          })),
          code: 'VALIDATION_ERROR',
        },
        { status: 400 }
      );
    }

    // Handle database connection errors
    if (error instanceof Error && error.message.includes('database')) {
      return NextResponse.json(
        {
          error: "We're experiencing technical difficulties. Please try again later.",
          code: 'DATABASE_ERROR',
        },
        { status: 503 }
      );
    }

    // Generic error response
    return NextResponse.json(
      {
        error: 'Something went wrong. Please try again later.',
        code: 'INTERNAL_ERROR',
      },
      { status: 500 }
    );
  }
}

// GET endpoint for admin to retrieve contacts (optional)
export async function GET(request: NextRequest) {
  try {
    // Basic auth check could be added here
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const status = searchParams.get('status');

    await connectToDatabase();

    // Build query
    const query: Record<string, unknown> = {};
    if (status) {
      query.status = status;
    }

    // Get contacts with pagination
    const contacts = await Contact.find(query)
      .sort({ createdAt: -1 })
      .limit(limit)
      .skip((page - 1) * limit)
      .lean();

    const total = await Contact.countDocuments(query);

    return NextResponse.json({
      contacts,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error('Error fetching contacts:', error);
    return NextResponse.json({ error: 'Failed to fetch contacts' }, { status: 500 });
  }
}
