import React, { useState } from 'react'
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
  const { register, handleSubmit, watch, errors } = useForm({
    mode: "onChange",
  });
  const onAddPopSubmit =  async (data) => {
    try {     
      let overlap = props.WordArray.find(el => {
        return el.name === data.name;
      });
      if(!overlap){
      await firebase.database()
      .ref("word_list")
      .child(data.name)
      .set({
        uid: uuid(),
        ...data
      })
    }else{
      alert("이미 등록된 단어 입니다.")
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
            <input name="name" ref={register} /> 
            <textarea name="desc" ref={register} />
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
        </form>
      </AddpopBox>
    </>
  )
}

export default AddPop
