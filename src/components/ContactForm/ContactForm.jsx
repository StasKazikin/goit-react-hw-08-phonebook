import { Component } from 'react';
import PropTypes from 'prop-types';
import shortid from 'shortid';
import { form, label, input, button } from './ContactForm.module.scss';
import { connect } from 'react-redux';
import { contactsOperations, contactsSelectors } from '../../redux/contacts';

class ContactForm extends Component {
  state = {
    name: '',
    number: '',
  };

  nameInputId = shortid.generate();
  numberInputId = shortid.generate();

  handleInput = event => {
    const { name, value } = event.currentTarget;
    this.setState({
      [name]: value,
    });
  };

  reset = () => {
    this.setState({ name: '', number: '' });
  };

  sameContact = (contactName, contacts) => {
    return contacts.find(({ name }) => {
      return name.toLowerCase() === contactName.toLowerCase();
    });
  };

  handleSubmit = event => {
    event.preventDefault();

    const { name, number } = this.state;

    const { contacts } = this.props;

    if (this.sameContact(name, contacts.items)) {
      alert(`${name} is already in contacts`);
      return;
    }

    if (name !== '') {
      this.props.onSubmit({ name, number });
      this.reset();
      return;
    }
    alert('Введите имя контакта');
  };

  render() {
    const { name, number } = this.state;

    return (
      <form className={form} onSubmit={this.handleSubmit}>
        <label className={label} htmlFor={this.nameInputId}>
          Name
          <input
            className={input}
            type="text"
            name="name"
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Имя может состоять только из букв, апострофа, тире и пробелов. Например Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan и т. п."
            required
            value={name}
            onChange={this.handleInput}
            id={this.nameInputId}
          ></input>
        </label>
        <label className={label} htmlFor={this.numberInputId}>
          Number
          <input
            className={input}
            type="text"
            name="number"
            pattern="(\+?( |-|\.)?\d{1,2}( |-|\.)?)?(\(?\d{3}\)?|\d{3})( |-|\.)?(\d{3}( |-|\.)?\d{4})"
            title="Номер телефона должен состоять из 11-12 цифр и может содержать цифры, пробелы, тире, пузатые скобки и может начинаться с +"
            required
            value={number}
            onChange={this.handleInput}
            id={this.numberInputId}
          ></input>
        </label>
        <button className={button} type="submit">
          Add contact
        </button>
      </form>
    );
  }
}

ContactForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

const mapStateToProps = state => {
  return {
    contacts: contactsSelectors.getContacts(state),
  };
};

const mapDispatchToProps = dispatch => ({
  onSubmit: newContact => dispatch(contactsOperations.addContact(newContact)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ContactForm);
