import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import "./Shipment.css"
import { UserContext } from '../../App';
const Shipment = () => {
    const { register, handleSubmit, watch, errors } = useForm();

    const [loggedInUser, setLoggedInUser] = useContext(UserContext)
    
    const onSubmit = data =>  console.log("from submitted",data);

//   console.log(watch("example")); 
  return (
    
    <form className="ship-form" onSubmit={handleSubmit(onSubmit)}>
      
      <input name="name" defaultValue={loggedInUser.name} placeholder="Name" ref={register({ required: true })} />
      {errors.name && <span className="error">Name is required</span>}
      
      <input name="email" defaultValue={loggedInUser.email} placeholder="Email" ref={register({ required: true })} />
      {errors.email && <span className="error">Email is required</span>}
      
      <input name="address" placeholder="Address" ref={register({ required: true })} />
      {errors.address && <span className="error">Address is required</span>}
      
      <input name="phone" placeholder="Phone" ref={register({ required: true })} />
      {errors.phone && <span className="error">Phone is required</span>}
      
      <input type="submit" />
    </form>
  );
};

export default Shipment;