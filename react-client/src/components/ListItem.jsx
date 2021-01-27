import React from 'react';

const ListItem = (props) => (
  <div style={{border: "solid 3px"}}>
    <h4>Search History</h4>
    <ul>
    { props.history.map((word, index)=>{
     return <li key={index}>{word.word}</li>
    }) }
    </ul>
  </div>
)

export default ListItem;