import React from 'react';
import { Mail, Briefcase, Building2 } from 'lucide-react';
import { Contact } from '../types/Contact';

interface ContactCardProps {
  contact: Contact;
  onSelect: (contact: Contact) => void;
  isBlurred?: boolean;
}

export function ContactCard({ contact, onSelect, isBlurred }: ContactCardProps) {
  return (
    <div 
      className={`p-6 rounded-lg border transition-all ${isBlurred ? 'blur-sm' : ''} ${
        contact.selected 
          ? 'border-blue-500 bg-blue-50' 
          : 'border-gray-200 bg-white hover:border-blue-300'
      }`}
    >
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">{contact.name}</h3>
          <div className="flex items-center text-gray-600 mt-1">
            <div className="relative">
              <Mail className="h-4 w-4 mr-2" />
              <span className={isBlurred ? 'filter blur-sm select-none' : ''}>
                {isBlurred ? contact.email.replace(/@.*$/, '@...') : contact.email}
              </span>
              {isBlurred && (
                <div className="absolute inset-y-0 right-0 flex items-center pl-8 pr-2">
                  <span className="text-xs font-medium text-amber-600">
                    🔒 Premium
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
        <button
          onClick={() => onSelect(contact)}
          className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
            contact.selected
              ? 'bg-blue-600 text-white hover:bg-blue-700'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          {contact.selected ? 'Selected' : 'Select'}
        </button>
      </div>
      
      <div className="space-y-2 text-sm text-gray-600">
        <div className="flex items-center">
          <Briefcase className="h-4 w-4 mr-2" />
          <span>{contact.jobTitle}</span>
        </div>
        <div className="flex items-center">
          <Building2 className="h-4 w-4 mr-2" />
          <span>{contact.company}</span>
        </div>
      </div>
      
      <p className="mt-4 text-sm text-gray-600 border-t pt-4">
        {contact.summary}
      </p>
    </div>
  );
}