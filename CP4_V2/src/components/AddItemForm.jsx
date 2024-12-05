import React from "react";
import PropTypes from "prop-types";

class AddItemForm extends React.Component {
    // idRef = React.createRef();
    imageRef = React.createRef();
    nameRef = React.createRef();
    priceRef = React.createRef();
    descriptionRef = React.createRef();

    static propTypes = {
        addItem: PropTypes.func
    };

    createItem = event => {
        event.preventDefault();
        const item = {
            // id: this.idRef.current.value,
            image: this.imageRef.current.value,
            name: this.nameRef.current.value,
            price: parseFloat(this.priceRef.current.value),
            description: this.descriptionRef.current.value,
        };
        this.props.addItem(item);

        event.currentTarget.reset();
    };
    render() {
        return (
            <form className="item-edit" onSubmit={this.createFish}>
                <input name="name" ref={this.nameRef} type="text" placeholder="Name" />
                <input
                    name="price"
                    ref={this.priceRef}
                    type="text"
                    placeholder="Price"
                />
                <textarea name="description" ref={this.descriptionRef} placeholder="Description" />
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