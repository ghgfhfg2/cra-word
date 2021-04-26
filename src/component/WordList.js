import React, {useState,useRef} from 'react'
import { Button } from "antd";
import firebase from "../firebase"
import styled from "styled-components";
export const IframeBox = styled.iframe`
  width:auto;min-width:300px;max-width:500px;
  height:500px;display:none;
`

function WordList(props) {

  const onDelList = (name) => {
    firebase.database()
    .ref('word_list').child(name).remove();
  }

  const searchFrame = useRef();
  const onSearch = () => {
    searchFrame.current.src = 'https://m.dietshin.com/calorie/calorie_main.asp?idx=';
    searchFrame.current.style.display = 'block';
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
      <IframeBox id="iframe-box" ref={searchFrame}>
      </IframeBox>
    </>
  )
}

export default WordList
