import React from "react";
import PropTypes from "prop-types";

class Products extends React.Component {
    static propTypes = {
      details: PropTypes.shape({
        id: PropTypes.number,
        image: PropTypes.string,
        name: PropTypes.string,
        price: PropTypes.number,
        description: PropTypes.string,
      }),
      addToOrder: PropTypes.func,
      index: PropTypes.string
    };
    render() {
        const { id, image, name, price, description } = this.props.details;
        return (
            <li className="items-type">
                <img src={image} alt={name} />
                <h3 className="item-name">
                    {name}
                    <span className="item-price">
                        {price}
                    </span>
                    <span className="item-description">
                       <p>{description}</p> 
                    </span>
                </h3>
            </li>
        );
    }
}

export default Products;