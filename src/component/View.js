import React, { useState } from 'react'
import { Button } from "antd";
import { useForm } from "react-hook-form";
import AddPop, {AddpopBox} from "./AddPop";
import firebase from "../firebase"
import { useSelector } from "react-redux";

function View(props) {
  const userInfo = useSelector((state) => state.user.currentUser);

  const { register, handleSubmit, watch, errors } = useForm({
    mode: "onChange",
  });

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

  
  const onClosePop = () => {
    setModifyPopState(false);
  }

  const onReplySubmit = async (data) => {
    try{
      console.log(data);
    }catch (error) {
      console.error('error')
    }
  }

  return (
      <>
        <AddpopBox>          
          <div>{props.ListArr.name}</div>
          <div>{props.ListArr.desc}</div>
          <form onSubmit={handleSubmit(onReplySubmit)}>
            <input name="reply" ref={register} />
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </form>
          {userInfo.uid === props.ListArr.w_uid &&
            <>
              <Button htmlType="button" onClick={()=>{onDelList(props.ListArr.name)}}>del</Button>
              <Button htmlType="button" onClick={()=>{onModifyPop(props.ListArr)}}>modify</Button>
            </>
          }
        </AddpopBox>
        {ModifyPopState && userInfo.uid === props.ListArr.w_uid &&
          <AddPop ListArr={ListArr} modiState={ModifyPopState} onClosePop={onClosePop} />
        }
      </>
  )
}

export default View
