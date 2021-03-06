import React from 'react';
import { useEffect , useState} from 'react';
import { getDatabaseCart, removeFromDatabaseCart, processOrder } from '../../utilities/databaseManager';
import fakeData from '../../fakeData';
import ReviewItem from '../ReviewItem/ReviewItem';
import Cart from '../Cart/Cart';
import happyImage from '../../images/giphy.gif'
import { useHistory } from 'react-router-dom';

const Review = () => {
    const [cart, setCart] = useState([]);
    const [orderPlaced , setOrderPlaced] = useState(false);
    const history = useHistory();

    const handleProceedCheckout = () => {
        history.push('/shipment')
    
    }

    const removeProduct = (productKey) => {
        // console.log ("remove clicked", productKey)
        const newCart = cart.filter(pd => pd.key !== productKey);
        setCart(newCart);
        removeFromDatabaseCart(productKey);
    }
    useEffect(()=>{
        //cart
        const savedCart = getDatabaseCart();
        const productKeys = Object.keys(savedCart)
        // Object.value can do the job directly


            const cartProducts = productKeys.map( key => {
            const product = fakeData.find(pd => pd.key === key);
            product.quantity = savedCart[key]
            return product;

        })
        setCart(cartProducts)
    },[])

    let thankYou; 
    if(orderPlaced){
        thankYou = <img src={happyImage} alt=""/>
    }
    return (
        <div className="twin-container">
            <div className="product-container">

            {
                     cart.map(pd => <ReviewItem 
                     key = {pd.key}
                     product ={pd}
                     removeProduct = {removeProduct}></ReviewItem>)
            }
            {thankYou}
            
            </div>
            <div className="cart-container">
                <Cart cart={cart}>
                    <button onClick={handleProceedCheckout} className = "main-button">Proceed Checkout</button>
                </Cart>
                

            </div>

            
        </div>
    );
};

export default Review;