import React from 'react'


function WordList(props) {
  
  

  return (
    <>
      <ul>
        {
          props.WordArray &&
          props.WordArray.map(list => (
          <li>{list.name}:{list.desc}</li>
        ))}
      </ul>  
    </>
  )
}

export default WordList
