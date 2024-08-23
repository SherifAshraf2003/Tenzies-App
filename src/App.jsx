import { useState, useEffect } from 'react'
import Confetti from 'react-confetti';
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
  const [Rolls, setRolls] = useState(0);

  useEffect(()=>{
    const num = numbers[0].value;
    for (let i = 0; i < numbers.length; i++) {
      if(numbers[i].value !== num || !numbers[i].isHeld){
        return;
      }
    }
    setTenzies(true);
    if(tenzies){
      setNumbers(rand());
      setTenzies(false);
      setRolls(0);
    }
  }
  , [numbers])

  function onClick(){
    setRolls(Rolls + 1);
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

        <button onClick={onClick} className='Roll'>{tenzies ? "New Game" : "Roll" }</button>
        <p className="rolls">Rolls: {Rolls}</p>
        {tenzies ? <Confetti /> : null}

      </div>
    </div>
  )
}

export default App
