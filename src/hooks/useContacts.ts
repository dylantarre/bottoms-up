import { useState } from 'react';
import { Contact } from '../types/Contact';
import { generateMockContacts } from '../data/mockContacts';

export function useContacts() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [selectedContacts, setSelectedContacts] = useState<Contact[]>([]);
  const [showingPremium, setShowingPremium] = useState(false);
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (term: string) => {
    if (term.trim()) {
      setSearchTerm(term);
      setPage(1);
      setShowingPremium(false);
      const results = generateMockContacts(term);
      setContacts(results);
    }
  };

  const handleLoadMore = () => {
    if (searchTerm) {
      const newResults = generateMockContacts(searchTerm, page + 1);
      setShowingPremium(true);
      setContacts(prev => [...prev, ...newResults]);
      setPage(prev => prev + 1);
    }
  };

  const handleSelect = (contact: Contact) => {
    setContacts(contacts.map(c => 
      c.id === contact.id ? { ...c, selected: !c.selected } : c
    ));
    
    setSelectedContacts(prev => {
      const isSelected = prev.some(c => c.id === contact.id);
      if (isSelected) {
        return prev.filter(c => c.id !== contact.id);
      }
      return [...prev, contact];
    });
  };

  return {
    contacts,
    selectedContacts,
    page,
    showingPremium,
    handleSearch,
    handleSelect,
    handleLoadMore,
  };
}