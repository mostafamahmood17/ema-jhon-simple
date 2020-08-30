import React from 'react';
import { useEffect , useState} from 'react';
import { getDatabaseCart } from '../../utilities/databaseManager';
import fakeData from '../../fakeData';
import ReviewItem from '../ReviewItem/ReviewItem';

const Review = () => {
    const [cart, setCart] = useState([]);
    useEffect(()=>{
        //cart
        const savedCart = getDatabaseCart();
        const productKeys = Object.keys(savedCart)
        // Object.keys can do the job directly


        const cartProducts = productKeys.map( key => {
            const product = fakeData.find(pd => pd.key === key);
            product.quantity = savedCart[key]
            return product;

        })
        setCart(cartProducts)
    },[])
    return (
        <div>
            <h1>Cart items: {cart.length}</h1>
            {
                cart.map(pd => <ReviewItem key = {pd.key} product ={pd}></ReviewItem>)
            }

            
        </div>
    );
};

export default Review;