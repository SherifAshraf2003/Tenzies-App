import { useState, useEffect } from 'react'
import './App.css'
import Die from './Components/Die.jsx'




function App() {

  function rand(){
    const randNum = [];
    for (let index = 0; index < 10; index++) {
      const num = Math.ceil(Math.random()*6)
      randNum.push({value: num, isHeld: false, id: index});
      
    }
    return randNum;
  }

  const [numbers,setNumbers] = useState(rand());
  const [tenzies, setTenzies] = useState(false);

  useEffect(()=>{
    console.log("Dice state changed !");
  }
  , [numbers])

  function onClick(){
    setNumbers(oldNum => oldNum.map(num => {
      return num.isHeld ?
      num :
      {...num, value: Math.ceil(Math.random()*6)}
    }))
  }

  function holdDice(id){
    setNumbers(oldNum => oldNum.map(num => {
      return num.id === id ?
      {...num, isHeld: !num.isHeld} :
      num
    }))
  }

  const diceElements = numbers.map((num) => <Die key={num.id} value={num.value} isHeld={num.isHeld} hold={() => holdDice(num.id)} />)

  return (
    <div className="frame">
      <div className="main">

        <h1 className="title">Tenzies</h1>
        <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
        
        <div className="dice">
          {diceElements}  
        </div>

        <button onClick={onClick} className='Roll'>Roll</button>

      </div>
    </div>
  )
}

export default App
