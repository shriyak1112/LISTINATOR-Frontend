import React from "react";
import "./archive.css";
import { useState } from "react";

export default function ArchiveContent(props) {


  return (
    <div className="note flex-container-row">
      
      <p
        style={{ textDecorationLine: props.item.status ? "line-through" : "none" }}
        className="flex-item"
      >
        {props.item.value}
      </p>
    </div>
  );
}
