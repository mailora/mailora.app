import { render } from '@react-email/render';

import { IContact } from '@/db/models/contact';
import { EMAIL_CONFIG, isEmailConfigured, resend } from '@/lib/resend';

import AdminNotificationEmail from '../templates/contact/admin-notification';
import UserConfirmationEmail from '../templates/contact/user-confirmation';

export interface ContactEmailData {
  contact: IContact;
}

export class ContactEmailService {
  /**
   * Send admin notification email
   */
  static async sendAdminNotification(contact: IContact): Promise<void> {
    if (!isEmailConfigured || !resend) {
      console.log('Email not configured, skipping admin notification');
      return;
    }

    try {
      const emailHtml = await render(
        AdminNotificationEmail({
          contactName: contact.name,
          contactEmail: contact.email,
          subject: contact.subject,
          message: contact.message,
          contactId: contact._id,
          submittedAt: contact.createdAt.toLocaleString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: 'numeric',
            minute: '2-digit',
            timeZoneName: 'short',
          }),
        })
      );

      const emailText = `
New Contact Form Submission

Contact Details:
- Name: ${contact.name}
- Email: ${contact.email}
- Subject: ${contact.subject}
- Submitted: ${contact.createdAt.toLocaleString()}
- Contact ID: ${contact._id}

Message:
${contact.message}

Reply to this email or contact ${contact.email} directly to respond to this inquiry.
      `.trim();

      await resend.emails.send({
        from: EMAIL_CONFIG.from,
        to: EMAIL_CONFIG.adminEmail,
        subject: `New Contact: ${contact.subject}`,
        html: emailHtml,
        text: emailText,
        headers: {
          'X-Contact-ID': contact._id,
          'X-Contact-Email': contact.email,
        },
      });

      console.log(`Admin notification sent for contact ${contact._id}`);
    } catch (error) {
      console.error('Failed to send admin notification:', error);
      throw new Error('Failed to send admin notification email');
    }
  }

  /**
   * Send user confirmation email
   */
  static async sendUserConfirmation(contact: IContact): Promise<void> {
    if (!isEmailConfigured || !resend) {
      console.log('Email not configured, skipping user confirmation');
      return;
    }

    try {
      const emailHtml = await render(
        UserConfirmationEmail({
          contactName: contact.name,
          subject: contact.subject,
          message: contact.message,
          contactId: contact._id,
          submittedAt: contact.createdAt.toLocaleString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: 'numeric',
            minute: '2-digit',
            timeZoneName: 'short',
          }),
        })
      );

      const emailText = `
Thank you for contacting Mailora!

Hi ${contact.name},

We've received your message and wanted to confirm that it's safely in our inbox. Our team will review your inquiry and get back to you as soon as possible.

Your Message Summary:
- Subject: ${contact.subject}
- Submitted: ${contact.createdAt.toLocaleString()}
- Reference ID: ${contact._id}

Your Message:
${contact.message}

What happens next?
• We typically respond within 24-48 hours during business days
• You'll receive our response at the email address you provided
• For urgent matters, you can reference your message using ID: ${contact._id}

If you have any additional questions or need immediate assistance, feel free to reply to this email.

Best regards,
The Mailora Team
      `.trim();

      await resend.emails.send({
        from: EMAIL_CONFIG.from,
        to: contact.email,
        subject: `Thank you for contacting us - ${contact.subject}`,
        html: emailHtml,
        text: emailText,
        headers: {
          'X-Contact-ID': contact._id,
        },
      });

      console.log(`User confirmation sent to ${contact.email} for contact ${contact._id}`);
    } catch (error) {
      console.error('Failed to send user confirmation:', error);
      throw new Error('Failed to send user confirmation email');
    }
  }

  /**
   * Send both admin notification and user confirmation emails
   */
  static async sendContactEmails(contact: IContact): Promise<void> {
    const promises = [this.sendAdminNotification(contact), this.sendUserConfirmation(contact)];

    try {
      await Promise.all(promises);
      console.log(`All contact emails sent successfully for contact ${contact._id}`);
    } catch (error) {
      console.error('Failed to send some contact emails:', error);
      // Don't throw here as we want to save the contact even if emails fail
      // Log the error for monitoring
    }
  }
}
