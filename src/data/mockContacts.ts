import { Contact } from '../types/Contact';

const MOCK_DATA = [
  {
    name: 'Sarah Johnson',
    jobTitle: 'Senior Product Manager',
    company: 'TechCorp',
  },
  {
    name: 'Michael Chen',
    jobTitle: 'Director of Operations',
    company: 'Innovate.io',
  },
  {
    name: 'Emily Rodriguez',
    jobTitle: 'Head of Business Development',
    company: 'FutureTech',
  },
  {
    name: 'James Wilson',
    jobTitle: 'Chief Innovation Officer',
    company: 'NextStep',
  },
  {
    name: 'Lisa Zhang',
    jobTitle: 'VP of Sales',
    company: 'GrowthCo',
  },
  {
    name: 'David Park',
    jobTitle: 'Technical Director',
    company: 'InnoSys',
  },
  {
    name: 'Anna Martinez',
    jobTitle: 'Marketing Lead',
    company: 'GrowthLabs',
  },
  {
    name: 'Robert Kim',
    jobTitle: 'Solutions Architect',
    company: 'CloudTech',
  },
  {
    name: 'Sophie Anderson',
    jobTitle: 'Customer Success Manager',
    company: 'ServicePro',
  },
  {
    name: 'Thomas Lee',
    jobTitle: 'Business Analyst',
    company: 'DataCorp',
  },
];

export const generateMockContacts = (searchTerm: string, page = 1): Contact[] => {
  // This is mock data - replace with actual API integration
  const startIndex = (page - 1) * 6 % MOCK_DATA.length;
  const contacts = [...MOCK_DATA, ...MOCK_DATA]; // Double the data to ensure we always have enough
  return contacts.slice(startIndex, startIndex + 6).map((contact, index) => ({
    id: `${page}-${index + 1}`,
    name: contact.name,
    email: contact.name.toLowerCase().replace(' ', '.') + '@' + contact.company.toLowerCase().replace('.', '-') + '.com',
    jobTitle: contact.jobTitle,
    company: contact.company,
    summary: `Experienced ${contact.jobTitle.toLowerCase()} specializing in ${searchTerm} with a proven track record at ${contact.company}.`
  }));
};