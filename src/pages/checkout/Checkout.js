import "./checkout.css";
import React from 'react'
import { useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
const Checkout = () => {
  const { id } = useParams();
  const location = useLocation();
  const [formData, setFormData] = useState({
    name : "",
    email : "",
    upi : "",
    phone : ""
  });
  const [showModal, setShowModal] = useState(false);
  const { ticketsIDs, movieImg, movieTitle  } = location.state;
  const handleSubmit = (e) => {
    e.preventDefault();
    let data = JSON.parse(localStorage.getItem(`seats-${id}`));
    if(data){
      console.log(data);
      
      const newData = data.map(seat => {
        ticketsIDs.forEach(id => {
          if(Number(id) === Number(seat.seatNo)){
            seat.paid = true;
          }
        })
        return seat;
      })
      console.log("newData", newData);
      localStorage.setItem(`seats-${id}`, JSON.stringify(newData));
    } 

    // id
    setShowModal(current => !current);
  }
  const handleChange = (e) => {
    setFormData(formData => {
      return {
        ...formData,
        [e.target.name] : e.target.value
      }
    })
  }
  return (
    <div className="checkout-container" style={{background: `url(${movieImg})`}}>
      <div className="priceDispaly">
        <p>per Tickets 250 * {ticketsIDs.length} : {ticketsIDs.length * 250}$</p>
        <p>Extras : 0$</p>
        <p>Seates no: {ticketsIDs.join(', ')}</p>
      </div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">You complete Name</label>
        <input value={formData.name} onChange={handleChange} required type="text" id="name" name="name"/>
        <label htmlFor="email">You Email</label>
        <input value={formData.email} onChange={handleChange} required type="email" id="email" name="email"/>
        <label htmlFor="phone">You phone no.</label>
        <input value={formData.phone} onChange={handleChange} required type="text" id="phone" name="phone"/>
        <label htmlFor="upi">You UPI id</label>
        <input value={formData.upi} onChange={handleChange} required type="text" id="upi" name="upi"/>
        <input type="submit" id="submit" name="submit"/>
      </form>
      {
        showModal ? (
          <div id="modal">
        <p>Thank You {formData.name}</p>
        <p>Amount of rs. {ticketsIDs.length * 250} have been debeted from your upi</p>
        <p>{formData.upi}</p>
        <p>You have successfully booked Seat no. {ticketsIDs.join(', ')}</p>
        <p>Hope you have a Nice day</p>
        <a className="movie__imdbButton movie__Button" href="/" >ok</a>
      </div>
        ) : ("")
      }
      
    </div>
  )
}

export default Checkout