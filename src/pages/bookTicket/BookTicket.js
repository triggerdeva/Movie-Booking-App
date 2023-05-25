import { useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import "./bookTicket.css";
const BookTicket = () => {
  const { id } = useParams();
  const[currentlyBooked, setCurrentlyBooked] = useState([]);
  let seatsData = [];
  for(let i = 0;i<60;i++){
    seatsData[i] = {
      seatNo: i + 1,
      booked : false,
      paid: false
    }
  }
  console.log(seatsData);  
  const [seats, setSeats] = useState(seatsData) 
  const handleClick = (e) => {
    console.log(e.target.dataset.seatNo);
    console.log(e.target.dataset.seatBooked);
    if(e.target.dataset.paid === "paid") return null;
    let currentBooked = e.target.dataset.seatBooked === "false" ? false : true;
    let newSeats = seats.filter(seat => Number(seat.seatNo) !== Number(e.target.dataset.seatNo));
    newSeats = [...newSeats,{seatNo : e.target.dataset.seatNo, booked : !currentBooked, paid: false}].sort((a,b) => a.seatNo - b.seatNo);
    setSeats(newSeats);
  }
  const location = useLocation();
  const { imgSrc,name } = location.state;
  useEffect(() => {
    let data = JSON.parse(localStorage.getItem(`seats-${id}`));
    if(data) setSeats(data);
  },[])
  useEffect(() => {
    // storing input name
    try{
      let newlyBooked = seats.filter(seat => seat.booked === true).map(seat => seat.seatNo);
      setCurrentlyBooked([...newlyBooked]);
      console.log(newlyBooked);
      localStorage.setItem(`seats-${id}`, JSON.stringify(seats));
    }catch(error){
      console.error(error);
    }
  }, [seats]);
  console.log(imgSrc, name);
  return (
    <>
      <div className='movieSeatImg'>
        <img src={imgSrc} />
        <Link state={{ ticketsIDs : [...currentlyBooked], movieImg : imgSrc, movieTitle : name}} to={`/movie/bookticket/checkout/${id}`} style={{textDecoration:"none", color:"white"}}>
          <button >Book Selected Tickets</button>
        </Link>
        <p>{name}</p>
        <div className="movieSeats">
          {
            seats.map(seat => {
              return (
                <div onClick={handleClick} className={seat.booked ? `booked seat` : `seat` } data-paid={seat.paid === true ? "paid" : "notPaid"} data-seat-no={seat.seatNo} data-seat-booked={seat.booked} >
                  {seat.seatNo}
                </div>
              )
            })
          }
        </div>
      </div>
    </>
  )
}

export default BookTicket;