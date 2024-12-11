import React, { useState } from 'react';
import { SearchBar } from './components/SearchBar';
import { ContactCard } from './components/ContactCard';
import { SelectedCounter } from './components/SelectedCounter';
import { ActionButtons } from './components/ActionButtons';
import { EmailComposer } from './components/EmailComposer';
import { useContacts } from './hooks/useContacts';

function App() {
  const [showEmailComposer, setShowEmailComposer] = useState(false);
  const {
    contacts,
    selectedContacts,
    showingPremium,
    handleSearch,
    handleSelect,
    handleLoadMore,
  } = useContacts();

  const handleSendEmail = (message: string, contact: Contact) => {
    // In a real application, this would send the email
    console.log('Sending email:', { recipient: contact, message });
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-amber-700 mb-4">🍻 Bottoms Up!</h1>
          <p className="text-gray-600 mb-8">
            Connect with professionals over a virtual drink! 🥂
          </p>
          <SearchBar onSearch={handleSearch} />
        </div>

        <SelectedCounter selectedContacts={selectedContacts} />

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {contacts.map((contact, index) => {
            const isBlurred = showingPremium && index >= contacts.length - 3;
            return (
              <div key={contact.id} className="relative">
                <ContactCard
                  contact={contact}
                  onSelect={handleSelect}
                  isBlurred={isBlurred}
                />
                {isBlurred && (
                  <div className="absolute inset-0 flex items-center justify-center bg-amber-900/30 backdrop-blur-sm rounded-lg">
                    <div className="text-center p-6">
                      <h3 className="text-white text-xl font-bold mb-2">
                        🍻 Premium Round!
                      </h3>
                      <p className="text-amber-50 mb-4">
                        Sign up to unlock all potential drinking buddies!
                      </p>
                      <button className="px-6 py-2 bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition-colors">
                        🔓 Unlock Premium
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {contacts.length === 0 && (
          <div className="text-center text-gray-500 mt-12">
            Pour in some search terms to discover potential connections! 🍺
          </div>
        )}

        {contacts.length > 0 && (
          <ActionButtons
            onLoadMore={handleLoadMore}
            showLoadMore={!showingPremium}
            onContinue={() => setShowEmailComposer(true)}
            hasSelection={selectedContacts.length > 0} />
        )}
        
        {showEmailComposer && (
          <EmailComposer
            selectedContacts={selectedContacts}
            onClose={() => setShowEmailComposer(false)}
            onSend={(message) => handleSendEmail(message, selectedContacts[currentIndex])}
          />
        )}
      </div>
    </div>
  );
}

export default App;
