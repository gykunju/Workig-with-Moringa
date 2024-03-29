import React, { useEffect, useState } from 'react'
import BotArmy from './BotArmy'
import BotCard from './BotCard'
 
function Functions() {
   const[bots, setBots] = useState([])
   const[army, setArmy] = useState([])
  
   useEffect(()=>{
    fetch('http://localhost:3000/bots')
    .then(resp=>resp.json())
    .then(data=>setBots(data))
    .catch(error=>{console.error('Error fetching bots:', error)})
   },[])

   const addBotArmy = (key) =>{
    const selectedBot = bots.find((bot)=>bot.id === key)
    console.log(selectedBot)
    const newArmy = [...army, selectedBot]
    setArmy(newArmy)
   }

  const removeArmy = (key) =>{
    const remaining = army.filter((army)=>army.id !== key)
    setArmy(remaining)
  }

   const deleteBot = (key) =>{
    const remainingBots = bots.filter((bot)=>bot.id !== key)
    setBots(remainingBots)
    fetch(`http://localhost:3000/bots/${key}`,{
      method:'DELETE'
    })
    .then(()=>{setBots(remainingBots)})
  
   }
  return (
    <div>
       <BotArmy army={army} removeArmy={removeArmy}/>
       <BotCard bots={bots} addBotArmy={addBotArmy} handleDelete={deleteBot}/>
    </div>
  )
}

export default Functions