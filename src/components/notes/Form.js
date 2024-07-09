import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import React, { useContext, useEffect } from "react";
import { styled } from "@mui/material";
import { useState, useRef } from "react";
import { ClickAwayListener } from "@mui/base/ClickAwayListener";
import { DataContext } from "../../context/DataProvider";
import { v4 as uuid } from "uuid";
import AddIcon from "@mui/icons-material/Add";
import Fab from "@mui/material/Fab";
import "./noteStyle.css";
import { createtodo } from "../../services/api";
import { useNavigate } from "react-router-dom";
import { getToken } from "../../services/api";
const Container = styled(Box)`
  display: flex;
  flex-direction: column;
  width: 600px;
  box-shadow: 0 1px 2px 0 rgb(60 64 67 / 30%), 0 2px 6px 2px rgb(60 64 67 / 15%);
  padding: 10px 15px;
  border-radius: 8px;
  border-color: "#e0e0e0";
  margin: auto;
  min-height: 30px;
`;

const note = {
  heading: "",
  text: "",
  todositem: [],
  isArchive: false,
};

const Form = () => {
  const containerRef = useRef();

  const [showTextField, setShowTextField] = useState(false);

  const [addNote, setAddNote] = useState({ ...note});

  const {notes, setNotes } = useContext(DataContext);

  const onTextAreaClick = () => {
    setShowTextField(true);
    containerRef.current.style.minHeight = "70px";
  };

  const handleClickAway = async() => {
    setShowTextField(false);
    containerRef.current.style.minHeight = "30px";
    
    let temp_note = addNote;
    let temp_content = addNote.text
      .trim()
      .split("\n")
      .map((value) => {
        return {
          id: uuid(),
          value: value,
          status: false,
        };
      });//new line for checklist
      //tempcontent is an array of objects of individual items
    setAddNote({
      ...note,
      todositem: temp_content,
    });
    temp_note.todositem = temp_content;
    const contentArray = addNote.todositem.map(({ id, status, value }) => ({ id, status, value }));
    if (addNote.heading || addNote.text) {
      const result=await createtodo({heading:addNote.heading,todositem:contentArray});
      setNotes((prevArr) => [result.data.data, ...prevArr]);
    }
    // console.log("notes",notes);
    // console.log(addNote);
    // console.log(contentArray);
    
  };

  const onTextChange = (e) => {
    // console.log(e.target.name, e.target.value);
    // console.log(addNote);
    let changedNote = { ...addNote, [e.target.name]: e.target.value };
    setAddNote(changedNote);
  };



  const navigate = useNavigate();
  useEffect (()=>{
    if(!getToken()){
      navigate('/error');
    }
  },[])
  return (
    <ClickAwayListener onClickAway={handleClickAway}>
    <Container className="add-note-input" ref={containerRef}>
      {showTextField && (
        <TextField
          placeholder="Title"
          variant="standard"
          InputProps={{ disableUnderline: true }}
          style={{ marginBottom: 10 }}
          onChange={(e) => onTextChange(e)}
          name="heading"
          value={addNote.heading}
        />
      )}
      <TextField
        placeholder="Take a note..."
        variant="standard"
        multiline
        maxRows={Infinity}
        InputProps={{ disableUnderline: true }}
        onClick={onTextAreaClick}
        onChange={(e) => onTextChange(e)}
        name="text"
        value={addNote.text}
      />
      <Fab className="add-icon" onClick={handleClickAway}>
        <AddIcon />
      </Fab>
    </Container>
    </ClickAwayListener>
  );
};

export default Form;
