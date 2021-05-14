import React, { useState,useEffect } from 'react'
import { useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { Button } from "antd";
import styled from "styled-components";
import firebase from "../firebase"
import uuid from "react-uuid";

export const AddpopBox = styled.div`
  width:auto;min-width:300px;max-width:500px;
  padding:20px;
`

function AddPop(props) {
  useEffect(() => {
    console.log('close:',props.onClosePop)
  }, [])
  const userInfo = useSelector((state) => state.user.currentUser);
  const { register, handleSubmit, watch, errors } = useForm({
    mode: "onChange",
  });
  const onAddPopSubmit =  async (data) => {
    
    try {  
      if(props.WordArray){   
        let overlap = props.WordArray.find(el => {
          return el.name === data.name;
        });
        if(!overlap){
        await firebase.database()
        .ref("word_list")
        .child(data.name)
        .set({
          uid: uuid(),   
          w_uid: userInfo.uid,
          w_name: userInfo.displayName,
          w_email: userInfo.email,       
          timestamp: new Date().getTime(),
          ...data
        });        
      }else{
        alert("이미 등록된 단어 입니다.")
      }
    }
    if(props.ListArr){
      await firebase.database()
      .ref("word_list")
      .child(data.name)
      .update({
        timestamp: new Date().getTime(),
        ...data
      });
      props.onClosePop();
    }
  }catch (error) {
      console.error('error')
    }
  };



  watch("name");

  return (
    <>
      <AddpopBox>
        <form onSubmit={handleSubmit(onAddPopSubmit)}>
            <input name="name" ref={register} defaultValue={props.ListArr ? props.ListArr.name : ''} /> 
            <textarea name="desc" ref={register} defaultValue={props.ListArr ? props.ListArr.desc : ''} />
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
        </form>
      </AddpopBox>
    </>
  )
}

export default AddPop
