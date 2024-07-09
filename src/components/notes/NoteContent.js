import React from "react";
import "./noteStyle.css";
import { useState,useContext } from "react";
import { DataContext } from "../../context/DataProvider";
export default function NoteContent(props) {
  const [IsChecked, setIsChecked] = useState(props.item.status);
  const{showDelete}=useContext(DataContext);
  function handleChecked() {
    setIsChecked((prevValue) => {
      return !prevValue;
    });
    props.onCheckNoteContent(props.item);
    console.log(IsChecked);
  }

  return (
    <div className="note flex-container-row">
      
      {!showDelete&&<div className="flex-container-row flex-item">
        <input onChange={handleChecked} type="checkbox" className="flex-item" defaultChecked={IsChecked} />
      </div>}
      <p
        style={{ textDecorationLine: IsChecked ? "line-through" : "none" }}
        className="flex-item"
      >
        {props.item.value}
      </p>
      
    </div>
  );
}
