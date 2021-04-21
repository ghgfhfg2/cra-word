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
        array.push({
          ...item.val()
        })
      });
      setWordArray(array);
      console.log(array)
    });
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
