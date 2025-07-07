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

interface AdminNotificationEmailProps {
  contactName: string;
  contactEmail: string;
  subject: string;
  message: string;
  contactId: string;
  submittedAt: string;
}

export default function AdminNotificationEmail({
  contactName,
  contactEmail,
  subject,
  message,
  contactId,
  submittedAt,
}: AdminNotificationEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>New contact form submission from {contactName}</Preview>
      <Body style={main}>
        <Container style={container}>
          <Section style={logoContainer}>
            <Heading style={logo}>📧 Mailora</Heading>
          </Section>

          <Section style={content}>
            <Heading style={h1}>New Contact Form Submission</Heading>
            <Text style={text}>
              You have received a new contact form submission from your website.
            </Text>

            <Section style={detailsContainer}>
              <Heading style={h2}>Contact Details</Heading>
              <Text style={detailItem}>
                <strong>Name:</strong> {contactName}
              </Text>
              <Text style={detailItem}>
                <strong>Email:</strong> {contactEmail}
              </Text>
              <Text style={detailItem}>
                <strong>Subject:</strong> {subject}
              </Text>
              <Text style={detailItem}>
                <strong>Submitted:</strong> {submittedAt}
              </Text>
              <Text style={detailItem}>
                <strong>Contact ID:</strong> {contactId}
              </Text>
            </Section>

            <Section style={messageContainer}>
              <Heading style={h2}>Message</Heading>
              <Text style={messageText}>{message}</Text>
            </Section>

            <Hr style={hr} />

            <Text style={footer}>
              Reply to this email or contact {contactEmail} directly to respond to this inquiry.
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

const detailsContainer = {
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
  backgroundColor: '#f3f4f6',
  borderRadius: '8px',
  padding: '24px',
  margin: '24px 0',
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
  fontSize: '12px',
  lineHeight: '20px',
  margin: '24px 0 0',
};
