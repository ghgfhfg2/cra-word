import React, {useState,useEffect} from 'react'
import firebase from "../firebase"
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

  const onDelList = (name) => {
    firebase.database()
    .ref('word_list').child(name).remove();
  }

  const dateFormat = (timestamp) => {
    return new Date(timestamp);
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
