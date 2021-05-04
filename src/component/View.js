import React, { useState } from 'react'
import {AddpopBox} from "./AddPop";

function View(props) {
  
  return (
      <AddpopBox>
        <div>{props.ListArr.name}</div>
        <div>{props.ListArr.desc}</div>
      </AddpopBox>
  )
}

export default View
