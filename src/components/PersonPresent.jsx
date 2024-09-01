import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { ip } from '../constants/ip';

function PersonPresent({person,setName,setEmail,setAddress}) {
    const [pName,setPName]=useState('')
    const [pEmail,setPEmail]=useState('')
    const [pAddress,setPAddress]=useState('')
    useEffect(()=>{
      getInfo()
    },
    [])

    const getInfo = async () => {
      try {
        if (person.type === "BR") {
          if (person.receiver != 0) {
            const response = await axios.get(`${ip}/stocks/${person.receiver}`);
            console.log(person,response.data,'hello');
            const { name, location } = response.data;
            setName(name)
            setPName(name)
            setEmail('jalyss@gmail.com')
            setPEmail('jalyss@gmail.com')
            setAddress(location)
            setPAddress(location)
          }
          if (person.sender != 0) {
            const response = await axios.get(`${ip}/forniseurs/${person.sender}`);
            console.log("sender", response.data);
          }
        }
      } catch (error) {
        console.error(error);
      }
    };
  return (
    <div>
                <div className='mt-3'>
                  <span >{pName}</span>
                </div>
                <div className='mt-3'>
                  <span>{pEmail}</span>
                </div>
                <div className='mt-3'>
                  <span>{pAddress}</span>
                </div>
                </div>
  )
}

export default PersonPresent