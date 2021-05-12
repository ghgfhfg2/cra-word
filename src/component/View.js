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

  const onDelList = (name) => {
    firebase.database()
    .ref('word_list').child(name).remove();
  }

  return (
      <>
        <AddpopBox>          
          <div>{props.ListArr.name}</div>
          <div>{props.ListArr.desc}</div>
          {userInfo.uid === props.ListArr.w_uid &&
            <>
              <Button htmlType="button" onClick={()=>{onDelList(props.ListArr.name)}}>del</Button>
              <Button htmlType="button" onClick={()=>{onModifyPop(props.ListArr)}}>modify</Button>
            </>
          }
        </AddpopBox>
        {ModifyPopState && userInfo.uid === props.ListArr.w_uid &&
          <AddPop ListArr={ListArr} modiState={ModifyPopState} />
        }
      </>
  )
}

export default View
