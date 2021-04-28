import React, {useState,useEffect} from 'react'
import { Button } from "antd";
import firebase from "../firebase"
import AddPop from "./AddPop";

function WordList(props) {

 
  const [ModifyPopState, setModifyPopState] = useState(false)
  const [ListArr, setListArr] = useState()
  const onModifyPop = (list) => {
    setModifyPopState(true);
    setListArr(list)
  }  

  const onDelList = (name) => {
    firebase.database()
    .ref('word_list').child(name).remove();
  }

  const dateFormat = (timestamp) => {
    console.log(new Date(1619506732196))
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
            {list.name}:{list.desc}
            <Button htmlType="button" onClick={()=>{onDelList(list.name)}}>del</Button>
            <Button htmlType="button" onClick={()=>{onModifyPop(list)}}>modify</Button>
          </li>
        ))}
      </ul>
      {ModifyPopState && 
        <AddPop ListArr={ListArr} />
      }        
    </>
  )
}

export default WordList
