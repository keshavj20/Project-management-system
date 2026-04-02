import React, { useEffect, useState } from 'react'

function useDebounce(value,delay=500) {
  const[debounceValue,setdebounceValue]=useState(value)
  useEffect(()=>{
    const timer= setTimeout(()=>{
        setdebounceValue(value)
    },delay)
     return ()=>clearTimeout(timer)
  },[value,delay])
    return debounceValue
}

export default useDebounce