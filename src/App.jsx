import { useCallback, useState } from 'react'

import './App.css'

function App() {
  const [length , setLength] = useState(8);
  const [numberAllowed , setNumberAllowed] = useState(false)
  const [charAllowed , setCharAllowed] = useState(false)

  const [password , setPassword] = useState("")

  const passwordGen = useCallback(()=>{
    let pass=''
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"

    if(numberAllowed) str+="0123456789"
    if(charAllowed) str+="?/!@#$%^&*()_+=-}{][.,/`~"
    
  },[length , numberAllowed , charAllowed , setPassword])


  return (
    <>
      <h1 className='text-white text-4xl text-center'>Password generator</h1>
    </>
  )
}

export default App
