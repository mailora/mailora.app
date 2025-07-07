import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Preview,
  Section,
  Text,
} from '@react-email/components';
import React from 'react';

interface UserConfirmationEmailProps {
  contactName: string;
  subject: string;
  message: string;
  contactId: string;
  submittedAt: string;
}

export default function UserConfirmationEmail({
  contactName,
  subject,
  message,
  contactId,
  submittedAt,
}: UserConfirmationEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>Thank you for contacting Mailora - We&apos;ve received your message</Preview>
      <Body style={main}>
        <Container style={container}>
          <Section style={logoContainer}>
            <Heading style={logo}>📧 Mailora</Heading>
          </Section>

          <Section style={content}>
            <Heading style={h1}>Thank you for reaching out!</Heading>
            <Text style={text}>Hi {contactName},</Text>
            <Text style={text}>
              We&apos;ve received your message and wanted to confirm that it&apos;s safely in our
              inbox. Our team will review your inquiry and get back to you as soon as possible.
            </Text>

            <Section style={summaryContainer}>
              <Heading style={h2}>Your Message Summary</Heading>
              <Text style={detailItem}>
                <strong>Subject:</strong> {subject}
              </Text>
              <Text style={detailItem}>
                <strong>Submitted:</strong> {submittedAt}
              </Text>
              <Text style={detailItem}>
                <strong>Reference ID:</strong> {contactId}
              </Text>

              <Section style={messageContainer}>
                <Text style={messageLabel}>Your Message:</Text>
                <Text style={messageText}>{message}</Text>
              </Section>
            </Section>

            <Section style={responseTimeContainer}>
              <Heading style={h2}>What happens next?</Heading>
              <Text style={text}>
                • We typically respond within 24-48 hours during business days
              </Text>
              <Text style={text}>
                • You&apos;ll receive our response at the email address you provided
              </Text>
              <Text style={text}>
                • For urgent matters, you can reference your message using ID: {contactId}
              </Text>
            </Section>

            <Hr style={hr} />

            <Text style={footer}>
              If you have any additional questions or need immediate assistance, feel free to reply
              to this email.
            </Text>

            <Text style={signature}>
              Best regards,
              <br />
              The Mailora Team
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}

const main = {
  backgroundColor: '#f6f9fc',
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
};

const container = {
  backgroundColor: '#ffffff',
  margin: '0 auto',
  padding: '20px 0 48px',
  marginBottom: '64px',
};

const logoContainer = {
  padding: '32px 0',
  textAlign: 'center' as const,
};

const logo = {
  fontSize: '32px',
  fontWeight: 'bold',
  color: '#1f2937',
  margin: '0',
};

const content = {
  padding: '0 48px',
};

const h1 = {
  color: '#1f2937',
  fontSize: '24px',
  fontWeight: 'bold',
  margin: '40px 0 20px',
  padding: '0',
};

const h2 = {
  color: '#374151',
  fontSize: '18px',
  fontWeight: '600',
  margin: '24px 0 12px',
  padding: '0',
};

const text = {
  color: '#6b7280',
  fontSize: '16px',
  lineHeight: '26px',
  margin: '16px 0',
};

const summaryContainer = {
  backgroundColor: '#f0f9ff',
  borderRadius: '8px',
  padding: '24px',
  margin: '24px 0',
  border: '1px solid #e0f2fe',
};

const responseTimeContainer = {
  backgroundColor: '#f9fafb',
  borderRadius: '8px',
  padding: '24px',
  margin: '24px 0',
};

const detailItem = {
  color: '#374151',
  fontSize: '14px',
  lineHeight: '24px',
  margin: '8px 0',
};

const messageContainer = {
  backgroundColor: '#ffffff',
  borderRadius: '6px',
  padding: '16px',
  margin: '16px 0',
  border: '1px solid #e5e7eb',
};

const messageLabel = {
  color: '#374151',
  fontSize: '14px',
  fontWeight: '600',
  margin: '0 0 8px 0',
};

const messageText = {
  color: '#1f2937',
  fontSize: '14px',
  lineHeight: '24px',
  whiteSpace: 'pre-wrap' as const,
  margin: '0',
};

const hr = {
  borderColor: '#e5e7eb',
  margin: '32px 0',
};

const footer = {
  color: '#6b7280',
  fontSize: '14px',
  lineHeight: '24px',
  margin: '24px 0',
};

const signature = {
  color: '#374151',
  fontSize: '14px',
  lineHeight: '24px',
  margin: '24px 0 0',
};
