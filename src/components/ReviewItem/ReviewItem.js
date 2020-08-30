import React from 'react';

const ReviewItem = (props) => {
    console.log(props)
    const {name, quantity}= props.product;
    const reviewItemStyle = {
        borderBottom:"1px solid lightGray",
        marginBottom:"5px",
        paddingBottom:"5px",
        marginLeft : "200px"

    }
    return (
        <div style={reviewItemStyle}>
            <h4 className="product-name">{name}</h4>
            <p>Quantity : {quantity}</p>
            <button className="main-button">remove</button>
        </div>
    );
};

export default ReviewItem;