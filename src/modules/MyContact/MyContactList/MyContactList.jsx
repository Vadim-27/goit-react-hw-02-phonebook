import PropTypes from 'prop-types';

const ContactList = ({ contactDelete, items }) => {
  const contact = items.map(({ id, name, number }) => (
    <li key={id}>
      {name}:{number}
      <button type="button" onClick={() => contactDelete(id)}>
        Delete
      </button>
    </li>
  ));
  return <ul>{contact}</ul>;
};

export default ContactList;

ContactList.defaultProps = {
  items: [],
};
ContactList.propTypes = {
  contactDelete: PropTypes.func.isRequired,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    })
  ),
};
