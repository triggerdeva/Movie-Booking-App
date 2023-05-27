import React, {useState,useContext} from 'react'
import { appContext } from '../Context.jsx'
const useLoginContext = () => {
  return useContext(appContext);
}
export default useLoginContext