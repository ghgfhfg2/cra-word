import React, {useState} from 'react'
import { Button } from "antd";
import firebase from "../firebase"

function WordList(props) {

  const onDelList = (name) => {
    firebase.database()
    .ref('word_list').child(name).remove();
  }

  const onSearch = () => {
    
  }
  
  return (
    <>
      <ul>
        {
          props.WordArray &&
          props.WordArray.map(list => (
          <li key={list.uid} onClick={onSearch}>
            {list.name}:{list.desc}
            <Button htmlType="button" onClick={()=>{onDelList(list.name)}}>del</Button>
          </li>
        ))}
      </ul>  
    </>
  )
}

export default WordList
