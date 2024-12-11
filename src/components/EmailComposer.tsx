import React, { useState } from 'react';
import { Send, X, ChevronLeft, ChevronRight, Check, Beer } from 'lucide-react';
import { Contact } from '../types/Contact';
import { generateEmailTemplate } from '../utils/emailGenerator';
import confetti from 'canvas-confetti';

interface EmailComposerProps {
  selectedContacts: Contact[];
  onClose: () => void;
  onSend: (message: string) => void;
}

export function EmailComposer({ selectedContacts, onClose, onSend }: EmailComposerProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [sentEmails, setSentEmails] = useState<Set<number>>(new Set());
  const [messages, setMessages] = useState(() => 
    selectedContacts.map(contact => generateEmailTemplate([contact]))
  );
  
  const currentContact = selectedContacts[currentIndex];
  const isCurrentEmailSent = sentEmails.has(currentIndex);
  
  const handleNext = () => {
    if (currentIndex < selectedContacts.length - 1) {
      setCurrentIndex(prev => prev + 1);
    }
  };
  
  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
    }
  };

  const handleSend = () => {
    // Trigger confetti animation
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#fbbf24', '#b45309', '#fef3c7']
    });

    // Mark email as sent
    setSentEmails(prev => new Set([...prev, currentIndex]));

    onSend(messages[currentIndex]);
    // Don't close, allow user to continue with other emails
  };
  
  const updateCurrentMessage = (newMessage: string) => {
    setMessages(prev => {
      const updated = [...prev];
      updated[currentIndex] = newMessage;
      return updated;
    });
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg w-full max-w-3xl shadow-xl">
        <div className="p-4 border-b flex justify-between items-center bg-amber-50">
          <h2 className="text-lg font-semibold text-gray-900">
            🥃 Shot {currentIndex + 1} of {selectedContacts.length}
          </h2>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>
        
        <div className="p-4">
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Recipient
            </label>
            <div className="bg-gray-50 p-3 rounded-lg text-sm text-gray-600">
              {currentContact.name} ({currentContact.email})
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Message
            </label>
            <textarea
              value={messages[currentIndex]}
              onChange={(e) => updateCurrentMessage(e.target.value)}
              className="w-full h-64 p-3 border rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all outline-none resize-none"
            />
          </div>
        </div>
        
        <div className="p-4 border-t flex justify-between items-center">
          <div className="flex gap-2">
            <button
              onClick={handlePrevious}
              disabled={currentIndex === 0}
              className="px-4 py-2 text-gray-600 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed inline-flex items-center gap-1"
            >
              <ChevronLeft className="w-4 h-4" /> Previous
            </button>
            <button
              onClick={handleNext}
              disabled={currentIndex === selectedContacts.length - 1}
              className="px-4 py-2 text-gray-600 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed inline-flex items-center gap-1"
            >
              Next <ChevronRight className="w-4 h-4" />
            </button>
          </div>
          <button
            onClick={handleSend}
            disabled={isCurrentEmailSent}
            className={`px-6 py-2 rounded-lg transition-colors inline-flex items-center gap-2 ${
              isCurrentEmailSent 
                ? 'bg-green-500 text-white cursor-not-allowed'
                : 'bg-amber-600 text-white hover:bg-amber-700'
            }`}
          >
            {isCurrentEmailSent ? (
              <>
                Shot Sent! <Check className="w-4 h-4" />
              </>
            ) : (
              <>
                Take Shot {currentIndex + 1} <Beer className="w-4 h-4" />
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}