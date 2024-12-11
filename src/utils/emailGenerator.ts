import { Contact } from '../types/Contact';

export function generateEmailTemplate(contacts: Contact[]): string {
  const [firstContact] = contacts;
  
  const intro = `Dear ${firstContact.name}${contacts.length > 1 ? ' and team' : ''},`;
  
  const body = `
I hope this email finds you well. I recently came across ${firstContact.company} and was particularly impressed by your work in the industry.

As ${firstContact.jobTitle}, I believe you would be the perfect person to discuss potential opportunities for collaboration. Your experience in [Industry/Field] aligns perfectly with what we're looking to achieve.

[Specific Value Proposition]

I would love to schedule a brief call to discuss how we might work together. Would you have 15 minutes this week for a quick conversation?

Looking forward to your response.

Best regards,
[Your Name]`;

  return `${intro}\n${body}`;
}