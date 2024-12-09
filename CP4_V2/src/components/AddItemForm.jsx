import React from "react";
import PropTypes from "prop-types";

/**
 * A React component that renders a form for adding an item.
 * The form includes inputs for name, price, description, and an image URL.
 * Upon submission, the form invokes the `addItem` function passed via props with the item data.
 * 
 * @class AddItemForm
 * @extends React.Component
 */
class AddItemForm extends React.Component {
  /**
   * References to form input fields for collecting user input.
   * @private
   */
  imageRef = React.createRef();
  nameRef = React.createRef();
  priceRef = React.createRef();
  descriptionRef = React.createRef();

  /**
   * PropTypes for the component.
   * 
   * @property {Function} addItem - A callback function to handle adding an item.
   */
  static propTypes = {
    addItem: PropTypes.func.isRequired,
  };

  /**
   * Handles form submission, creates an item object from the input values,
   * and calls the `addItem` function passed via props.
   * The form is reset after submission.
   * 
   * @param {Event} event - The form submission event.
   */
  createItem = (event) => {
    event.preventDefault();
    const item = {
      image: this.imageRef.current.value,
      name: this.nameRef.current.value,
      price: parseFloat(this.priceRef.current.value),
      description: this.descriptionRef.current.value,
    };
    this.props.addItem(item);
    event.currentTarget.reset();
  };

  /**
   * Renders the form UI.
   * 
   * @returns {JSX.Element} The JSX representation of the form.
   */
  render() {
    return (
      <form className="item-edit" onSubmit={this.createItem}>
        <input
          name="name"
          ref={this.nameRef}
          type="text"
          placeholder="Name"
        />
        <input
          name="price"
          ref={this.priceRef}
          type="text"
          placeholder="Price"
        />
        <textarea
          name="description"
          ref={this.descriptionRef}
          placeholder="Description"
          rows="4"
        ></textarea>
        <input
          name="image"
          ref={this.imageRef}
          type="text"
          placeholder="Image"
        />
        <button type="submit">Add Item</button>
      </form>
    );
  }
}

export default AddItemForm;
