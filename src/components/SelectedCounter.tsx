import React from 'react';
import { Beer } from 'lucide-react';
import { Contact } from '../types/Contact';

interface SelectedCounterProps {
  selectedContacts: Contact[];
}

export function SelectedCounter({ selectedContacts }: SelectedCounterProps) {
  if (selectedContacts.length === 0) return null;

  return (
    <div className="mb-8 p-4 bg-amber-50 rounded-lg shadow-sm border border-amber-200">
      <div className="flex items-center gap-2 text-amber-700">
        <Beer className="h-5 w-5" />
        <span className="font-medium">
          {selectedContacts.length} potential connection{selectedContacts.length !== 1 ? 's' : ''} selected! 🎉
        </span>
      </div>
    </div>
  );
}