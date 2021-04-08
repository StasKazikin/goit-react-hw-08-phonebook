import PropTypes from 'prop-types';
import { list, item, button } from './ContactList.module.scss';
import { connect } from 'react-redux';
import { contactsOperations, contactsSelectors } from '../../redux/contacts';

const ContactList = ({ contacts, deleteContact }) => {
  return (
    <ul className={list}>
      {contacts.map(({ name, number, id }) => (
        <li className={item} key={id}>
          <span>
            {name}: {number}
          </span>
          <button
            className={button}
            id={id}
            type="button"
            onClick={() => deleteContact(id)}
          >
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
};

ContactList.propTypes = {
  contacts: PropTypes.array.isRequired,
  deleteContact: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  contacts: contactsSelectors.getFilteredContacts(state),
});

const mapDispatchToProps = dispatch => ({
  deleteContact: id => dispatch(contactsOperations.deleteContact(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ContactList);
