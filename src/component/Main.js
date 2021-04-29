import React, { useState, useEffect } from 'react'
import { Button } from "antd";
import AddPop from "./AddPop";
import WordList from "./WordList";
import firebase from "../firebase"


function Main() {
  const [WordArray, setWordArray] = useState();
  useEffect(() => {    
    firebase.database()
    .ref("word_list")
    .on("value", (snapshot) => {
      let array = [];
      snapshot.forEach(item => {        
        console.log(item.val().timestamp)
        let month = new Date(item.val().timestamp).getMonth();
        let date = new Date(item.val().timestamp).getDate();
        let hour = new Date(item.val().timestamp).getHours();
        let min = new Date(item.val().timestamp).getMinutes();
        console.log(date+hour)
        array.push({
          ...item.val(),
          timestamp: `${month}.${date} ${hour}:${min}`
        })
      });
      setWordArray(array);
    });
    return function cleanup() {
      firebase.database().ref("word_list").off();
    };
  }, [])

  const [AddPopState, setAddPopState] = useState(false)
  const onAddPop = () => {
    setAddPopState(true)
  }

  return (
    <>
      <Button onClick={onAddPop}>+</Button>
      {AddPopState && 
        <AddPop WordArray={WordArray} />
      }
      <WordList WordArray={WordArray} />
    </>
  )
}

export default Main
