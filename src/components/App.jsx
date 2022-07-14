import { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { nanoid } from "nanoid";
import ContactForm from './ContactForm';
import Filter from './Filter';
import ContactList from './ContactList';
import { Box } from './Box';

const initialContacts = [
  { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
  { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
  { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
  { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
];

export default function App() {
  const [contacts, setContacts] = useState(() => {
    return JSON.parse(window.localStorage.getItem('contacts')) ?? initialContacts });
  const [filter, setFilter] = useState('');

  useEffect(() => {
    window.localStorage.setItem('contacts', JSON.stringify(contacts))
  }, [contacts]);

  const deleteContact = (contactId) => {
    setContacts(prevState => prevState.filter(contact => contact.id !== contactId));
  };

  const addContact = ({name, number}) => {
    const contact = {
      id: nanoid(),
      name,
      number,
    };
    const isContact = contacts.find(contact => contact.name === name);

    if (isContact) {
      return toast.error(`${name} is already in contact`);
    }

    setContacts(prevState => {
      return [...prevState, contact];
    });
  }

  const changeFilter = e => {
    setFilter(e.target.value);
  };

  const getVisibleContacts = () => {
    const normalizedFilter = filter.toLowerCase();
    return contacts.filter(contact => contact.name.toLowerCase().includes(normalizedFilter));
  };
    
  const visibleContacts = getVisibleContacts();

  return (
    <Box width="m" p={5} as="div">
      <h1>Phonebook</h1>
      <ContactForm onSubmit={addContact} />
      <h2>Contacts</h2>
      <Filter value={filter} onChange={changeFilter} />
      <ContactList contacts={visibleContacts} onDelete={deleteContact} />
      <ToastContainer autoClose={3000} pauseOnHover />
    </Box>
  );
 
}