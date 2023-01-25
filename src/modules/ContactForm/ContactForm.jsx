import { Component } from 'react';
import { nanoid } from 'nanoid';

class ContactForm extends Component {
  state = {
    items: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
    name: '',
    number: '',
  };

  addConact = e => {
    e.preventDefault();
    const { name } = this.state;
    if (this.isDublicate(name)) {
      return alert(`${name} is olready is contacts`);
    }
    this.setState(prentState => {
      const { name, number, items } = prentState;
      const newContact = {
        id: nanoid(),
        name,
        number,
      };
      return { items: [newContact, ...items], name: '', number: '' };
    });
  };

  handleChenge = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  };
  contactDelete = id => {
    this.setState(({ items }) => {
      const newConact = items.filter(item => item.id !== id);
      return { items: newConact };
    });
  };
  isDublicate(mame) {
    const contactnormalized = mame.toLowerCase();
    // const { items } = this.state;
    const result = this.state.items.find(item => {
      return item.mame.toLowerCase() === contactnormalized;
    });
    return Boolean(result);
  }

  getFilteredBooks() {
    const { filter, items } = this.state;
    if (!filter) {
      return items;
    }

    const normalizedFilter = filter.toLowerCase();
    const result = items.filter(({ mame }) => {
      return mame.toLowerCase().includes(normalizedFilter);
    });

    return result;
  }

  render() {
    const { addConact, handleChenge } = this;
    // const { items } = this.state;
    const { name, number } = this.state;
    const items = this.getFilteredBooks();

    const contact = items.map(({ id, name, number }) => (
      <li key={id}>
        {name}:{number}
        <button type="button" onClick={() => this.contactDelete(id)}>
          Delete
        </button>
      </li>
    ));
    return (
      <div>
        <h1>Phonebook</h1>
        <form action="" onSubmit={addConact}>
          <input
            type="text"
            name="name"
            value={name}
            onChange={handleChenge}
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            required
          />
          <input
            type="tel"
            name="number"
            value={number}
            onChange={handleChenge}
            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            required
          />
          <button type="submint"> Add contact</button>
        </form>
        <div>
          <h1>Contact</h1>
          <label htmlFor="">
            <input type="text" name="filter" onChange={handleChenge} />
          </label>
          <ul>{contact}</ul>
        </div>
      </div>
    );
  }
}

export default ContactForm;
