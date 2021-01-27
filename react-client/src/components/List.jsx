import React from 'react';
import ListItem from './ListItem.jsx';

const List = (props) => (
  <div>
    <h3 > {props.items.type} </h3>
    <h3 style ={{color : "hotPink"}}> Definition :</h3>
    <h3> { props.items.definition}</h3>
    <h3 style ={{color : "hotPink"}}>Synonyms : </h3>
    <h3>{props.items.syns} </h3>
    <h3 style ={{color : "hotPink"}}>Antonyms : </h3>
    <h3>{props.items.ant} </h3>
  </div>
)

export default List;
