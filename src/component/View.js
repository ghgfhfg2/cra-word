import React, { useState, useEffect } from 'react'
import firebase from "../firebase"

function View({ match, location }) {
  const [WordArray, setWordArray] = useState();
  useEffect(() => {    
    firebase.database()
    .ref("word_list")
    .child(match.params.name)
    .on("value", (snapshot) => {
        let array = {};
        let month = new Date(snapshot.val().timestamp).getMonth();
        let date = new Date(snapshot.val().timestamp).getDate();
        let hour = new Date(snapshot.val().timestamp).getHours();
        let min = new Date(snapshot.val().timestamp).getMinutes();
        array = snapshot.val();
        array.timestamp = `${month}.${date} ${hour}:${min}`
        console.log(snapshot.val())        
        setWordArray(array);
      });
    return function cleanup() {
      firebase.database().ref("word_list").off();
    };
  }, [])
  return (
    <>
      {
        WordArray && (
          <>
            <div>{WordArray.name}</div>
            <div>{WordArray.desc}</div>
          </>
        )
      }
    </>
  )
}

export default View
