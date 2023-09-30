
import { useState,useCallback, useEffect, useRef } from "react";
import "./App.css";

function App() {
const [length,setLength]=useState(8);
const [isNumber,setIsNumber]=useState(false);
const [isCharacter,setIsCharacter]=useState(false);
const [password,setPassword]=useState('')
const [copyText,setCopyText]=useState("Copy")
const [copybtnBackground,setCopyBtnBackground]=useState('orange')
const passwordRef=useRef(null);
const copyToClipboard=()=>{

passwordRef.current?.select()
navigator.clipboard.writeText(password);
setCopyText('Copied!')
setCopyBtnBackground('#01f00d')
}
const passwordGenerator=useCallback(()=>{
  let pass=''
  let str='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'
  if(isNumber) str+= "0123456789"
  if(isCharacter) str+='~!@#$%^&*()_+/*-'
  for(let i=1;i<=length;i++)
  {
    let char=Math.floor(Math.random()* str.length+1)
    pass+=str.charAt(char);
  
  }
  setPassword(pass)
  setCopyBtnBackground('orange')
},[length,isNumber,isCharacter,setPassword])

useEffect(()=>{passwordGenerator()},[length,isNumber,isCharacter,passwordGenerator])
  return <>
  <h1 className="heading">Password Generator</h1>
  <div className="container">
<input type="text" value={password} id="password" className="" placeholder="password" ref={passwordRef} readOnly/>
<button className="copy" onClick={copyToClipboard} style={{backgroundColor:`${copybtnBackground}`}}>{copyText}</button>
  </div>
  <div className="container2"><input id="passwordLength" type="range" min={6} max={100} value={length} onChange={(e)=>{
    setCopyText('Copy')
    setLength(e.target.value)}} className="range_finder"></input>
  <label htmlFor="passwordLength">Length: {length}</label>
<div class="character_container">
  <input type="checkbox" defaultChecked={isCharacter} id="characterInput" onChange={()=>{setCopyText('Copy')
  setIsCharacter((prev)=>!prev)}} ></input>
  <label htmlFor="characterInput">Special Characters</label>
</div>
<div class="number_container">
  <input type="checkbox" defaultChecked={isNumber} id="numberInput" onChange={()=>{setIsNumber((prev)=>!prev)}} ></input>
  <label htmlFor="characterInput">Number</label>
</div>
  </div>
 
  </>;
  
}

export default App;
