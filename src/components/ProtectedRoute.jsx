import React from 'react'
import useLoginContext from "../hooks/useLoginContext"
import { Navigate } from "react-router-dom";
const ProtectedRoute = ({Comp}) => {
  const {user} = useLoginContext();
  if(user){
      return (<Comp/>)
  }else{
    return (<Navigate to="/" replace={true} />)
  }
}

export default ProtectedRoute