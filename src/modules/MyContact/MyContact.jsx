import { Component } from 'react';
import { nanoid } from 'nanoid';
import items from './items';

import ContactList from './MyContactList/MyContactList';
import ContactFilter from './MyContactFilter/MyContactFilter';
import MyContactForm from './MyContactForm/MyContactForm';
import css from './myContact.module.css';

class MyContact extends Component {
  state = {
    items: [...items],
    filter: '',
  };

  addConact = ({ name, number }) => {
    if (this.isDublicate(name)) {
      return alert(`${name} is olready is contacts`);
    }
    this.setState(prentState => {
      const { items } = prentState;
      const newContact = {
        id: nanoid(),
        name,
        number,
      };
      return { items: [newContact, ...items] };
    });
    return true;
  };

  handleFilter = ({ target }) => {
    this.setState({ filter: target.value });
  };

  contactDelete = id => {
    this.setState(({ items }) => {
      const newConact = items.filter(item => item.id !== id);
      return { items: newConact };
    });
  };
  isDublicate(name) {
    const contactnormalized = name.toLowerCase();
    const result = this.state.items.find(item => {
      return item.name.toLowerCase() === contactnormalized;
    });
    return Boolean(result);
  }

  getFilteredBooks() {
    const { filter, items } = this.state;
    if (!filter) {
      return items;
    }

    const normalizedFilter = filter.toLowerCase();
    const result = items.filter(({ name }) => {
      return name.toLowerCase().includes(normalizedFilter);
    });

    return result;
  }

  render() {
    const { addConact, contactDelete, handleFilter } = this;

    const items = this.getFilteredBooks();
    const isContacts = Boolean(items.length);

    return (
      <div>
        <h2 className={css.title}>Phonebook</h2>
        <MyContactForm onSubmint={addConact} />
        <div>
          <h3 className={css.title}>Contact</h3>
          <ContactFilter handleChenge={handleFilter} />

          {isContacts && (
            <ContactList contactDelete={contactDelete} items={items} />
          )}
          {!isContacts && <p className={css.message}>No saved contacts</p>}
        </div>
      </div>
    );
  }
}

export default MyContact;
