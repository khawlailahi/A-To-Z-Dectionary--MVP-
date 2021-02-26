import React from 'react';
import ListItem from './ListItem.jsx';
var styles = { color: "hotPink" }
const List = (props) => (
  <div>
    <h3 > {props.items.type} </h3>
    <h3 style={styles}> Definition :</h3>
    <h3> {props.items.definition}</h3>
    <h3 style={styles}>Synonyms : </h3>
    <h3>{props.items.syns} </h3>
    <h3 style={styles}>Antonyms : </h3>
    <h3>{props.items.ant} </h3>

  </div>
)

export default List;