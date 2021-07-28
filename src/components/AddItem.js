import React from 'react';
import { fb } from '../lib/firebase';
import uuid from 'react-uuid';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const initialState = {
  itemName: '',
  frequency: '',
  lastPurchase: null,
  id: '',
  userToken: '',
  itemNameError: '',
  frequencyError: '',
};

class AddItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = initialState;
  }

  validate = () => {
    let itemNameError = '';
    let frequencyError = '';

    if (!this.state.itemName) {
      itemNameError = 'Name needs to exist';
    }

    if (!this.state.frequency) {
      frequencyError = 'Please pick when you will need to buy next';
    }

    if (itemNameError || frequencyError) {
      this.setState({ itemNameError, frequencyError });
      return false;
    }

    return true;
  };

  submitHandler = (event) => {
    event.preventDefault();
    const groceriesRef = fb.firestore().collection('groceries');
    const isValid = this.validate();

    if (isValid) {
      groceriesRef.get().then((item) => {
        const items = item.docs.map((doc) =>
          doc
            .data()
            .itemName.toLowerCase()
            .replace(/[ *.,@#!$%&;:{}=\-_`~()]/g, ''),
        );

        const userInput = this.state.itemName
          .toLowerCase()
          .replace(/[ *.,@#!$%&;:{}=\-_`~()]/g, '');
        if (items.includes(userInput)) {
          alert('ITEM ALREADY EXISTS!');
        } else {
          groceriesRef.add({
            itemName: this.state.itemName,
            frequency: this.state.frequency,
            lastPurchase: this.state.lastPurchase,
            id: uuid(),
            userToken: 'josef heron mudd',
          });
          alert('Successfully added ' + this.state.itemName);
          this.setState(initialState);
        }
      });
    }
  };

  changeHandler = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    return (
      <form onSubmit={this.submitHandler}>
        <h1>Item </h1>
        <p>Please enter an item:</p>
        <input
          type="text"
          name="itemName"
          onChange={this.changeHandler}
          value={this.state.itemName}
          placeholder="Item name..."
        />
        <div style={{ fontsize: 12, color: 'red' }}>
          {this.state.itemNameError}
        </div>
        <p>When will you need to buy this item next?</p>
        <div style={{ fontsize: 12, color: 'red' }}>
          {this.state.frequencyError}
        </div>
        <div>
          <p>Soon</p>
          <input
            type="radio"
            name="frequency"
            value="7"
            checked={this.state.frequency === '7'}
            onChange={this.changeHandler}
          />
          <p>Kind of soon</p>
          <input
            type="radio"
            name="frequency"
            value="14"
            checked={this.state.frequency === '14'}
            onChange={this.changeHandler}
          />
          <p>Not Soon</p>
          <input
            type="radio"
            name="frequency"
            value="30"
            checked={this.state.frequency === '30'}
            onChange={this.changeHandler}
          />
        </div>

        <p>Last purchase:</p>
        <DatePicker
          selected={this.state.lastPurchase}
          onChange={(date) => this.setState({ lastPurchase: date })}
          popperClassName="some-custom-class"
          popperPlacement="top-end"
          popperModifiers={[
            {
              name: 'offset',
              options: {
                offset: [10, 10],
              },
            },
            {
              name: 'preventOverflow',
              options: {
                rootBoundary: 'viewport',
                tether: false,
                altAxis: true,
              },
            },
          ]}
        />

        <br />
        <br />
        <button type="submit">Submit</button>
      </form>
    );
  }
}

export default AddItem;
