import React, { useEffect } from 'react'

function PersonPresent({person,type,setName,setEmail,setAddress}) {
    useEffect(()=>{
        if (type='Bon de Reception') {
            setName(person.info.name)
            setEmail(person.info.email)
            setAddress(person.info.address)
        }
    },
    [])
  return (
    <div>
                <div className='mt-3'>
                  <span >{person?.info?.name}</span>
                </div>
                <div className='mt-3'>
                  <span>{person?.info?.email}</span>
                </div>
                <div className='mt-3'>
                  <span>{person?.info?.address}</span>
                </div>
                </div>
  )
}

export default PersonPresent