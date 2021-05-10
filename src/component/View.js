import React, { useState } from 'react'
import { Button } from "antd";
import AddPop, {AddpopBox} from "./AddPop";
import firebase from "../firebase"
import { useSelector } from "react-redux";

function View(props) {
  const userInfo = useSelector((state) => state.user.currentUser);

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

  return (
      <>
        <AddpopBox>
          {userInfo.name}
          <div>{props.ListArr.name}</div>
          <div>{props.ListArr.desc}</div>
          <Button htmlType="button" onClick={()=>{onDelList(props.ListArr.name)}}>del</Button>
          <Button htmlType="button" onClick={()=>{onModifyPop(props.ListArr)}}>modify</Button>
        </AddpopBox>
        {ModifyPopState && 
          <AddPop ListArr={ListArr} />
        }
      </>
  )
}

export default View
