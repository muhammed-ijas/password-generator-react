import { useCallback, useEffect, useRef, useState } from 'react'


function App() {
  const [length , setLength] = useState(8);
  const [numberAllowed , setNumberAllowed] = useState(false)
  const [charAllowed , setCharAllowed] = useState(false)
  const [isClicked, setIsClicked] = useState(false);
  const [copyText, setCopyText] = useState('copy');
  const [password , setPassword] = useState("")

  //useRef hook
  const passwordRef = useRef(null)

  const passwordGen = useCallback(()=>{
    let pass=''
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"

    if(numberAllowed) str+="0123456789"
    if(charAllowed) str+="?/!@#$%^&*()_+=-}{][.,/`~"

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1)
      pass += str.charAt(char)
    }

    setPassword(pass)

  },[length , numberAllowed , charAllowed , setPassword])

  const copyPass = useCallback(() => {
    passwordRef.current?.select();
    navigator.clipboard.writeText(password);

    setIsClicked(true);
    setCopyText('copied')

    setTimeout(() => {
      setIsClicked(false);
      setCopyText('copy')
    }, 200);

  }, [password])


  useEffect(()=>{
    passwordGen()
  },[length,numberAllowed,charAllowed,passwordGen])


  return (
    <>
    
      <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8     text-orange-500 bg-gray-800'>
      <h1 className='text-white  text-center my-2'>Password generator</h1>
        <div className='flex shadow rounded-lg overflow-hidden mb-4 '>

          <input
           type="text"
           value={password}
           className='outline-none w-full py-1  px-3'
           placeholder='password'
           readOnly
           ref={passwordRef} />

           <button 
            className={`outline-none text-white px-3 py-0.5 shrink-0 transition-colors duration-300 ${
          isClicked ? 'bg-blue-900' : 'bg-blue-700'
        }`}
            onClick={copyPass}>{copyText}</button>

        </div>
        <div className='flex text-sm gap-x-2'>
          <div className='flex items-center gap-x-1'>
            <input type="range"
              min={6}
              max={50}
              value={length} 
              className='cursor-pointer'
              onChange={(e) => {setLength(e.target.value)}}/>
              <label>Length: {length}</label>
          </div>
          <div className='flex items-center gap-x-1'>
            <input type="checkbox"
            defaultChecked={numberAllowed}
            id='numberInput' 
            onChange={()=>{
              setNumberAllowed((prev) => !prev);
            }} />
            <label htmlFor="numberInput">Numbers</label>
          </div>
          <div className='flex items-center gap-x-1'>
            <input type="checkbox"
            defaultChecked={charAllowed}
            id='charInput' 
            onChange={()=>{
              setCharAllowed((prev) => !prev);
            }} />
            <label htmlFor="charInput">Characters</label>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
