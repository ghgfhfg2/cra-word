import React, { useState } from 'react'
import AddPop from "./AddPop";
import View from "./View";

function WordList(props) {

 
  const [ModifyPopState, setModifyPopState] = useState(false)
  const [ListArr, setListArr] = useState()
  const onModifyPop = (list) => {
    setModifyPopState(true);
    setListArr(list)
  }  

  const [ViewPopState, setViewPopState] = useState(false)
  const onViewPop = (list) => {
    setViewPopState(true);
    setListArr(list)
  }  


  
  return (
    <>
      <ul>
        {
          props.WordArray &&
          props.WordArray.map(list => (
          <li key={list.uid}>
            <span>{list.timestamp}</span>
            <span onClick={()=>{onViewPop(list)}}>{list.name}</span>
          </li>
        ))}
      </ul>
      {ModifyPopState && 
        <AddPop ListArr={ListArr} />
      }
      {ViewPopState && 
        <View ListArr={ListArr} />
      }            
    </>
  )
}

export default WordList
