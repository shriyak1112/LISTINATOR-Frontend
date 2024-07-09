import {
  Card,
  CardActions,
  CardContent,
  Modal,
  TextField,
  Typography,
} from "@mui/material";
import { useTheme } from "@mui/system";
import styled from "@emotion/styled";
import React, { useState } from "react";
import {
  ArchiveOutlined as Archive,
  DeleteOutlineOutlined as Delete,
  NotificationsActive as Reminder,
} from "@mui/icons-material";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import NoteContent from "./NoteContent";
import { useContext } from "react";
import { DataContext } from "../../context/DataProvider";
import {
  addReminder,
  gettodoarc,
  marktodoitem,
  noteDelete,
} from "../../services/api";
import { LocalizationProvider } from "@mui/x-date-pickers";
import moment from "moment";
import { toast } from "react-toastify";
import { NotificationContext } from "../../context/NotificationProvider";
const StyledCard = styled(Card)`
  width: 250px;
  margin: 8px;
  background: #121212;
  color: white;
  border:1px solid #323232;
  box-shadow: 2px 2px 16px #323232;
`;

const Note = ({ note, setRefresh }) => {
  const [reminderDate, setReminderDate] = useState(null);
  const [openPicker, setOpenPicker] = useState(false);
  const theme = useTheme();

  const { notes, setNotes, setArchiveNotes, showDelete, showRem} =
    useContext(DataContext);

  const { notificationTimer, setNoticationTimer } =
    useContext(NotificationContext);
    const [isReminder, setIsReminder] = useState(false);
  const archieveNote = async (note) => {
    const result = await gettodoarc(note);
    const updatedNotes = notes.filter((data) => data.id !== result.id);
    setRefresh(new Date());
    setNotes(updatedNotes);
    setArchiveNotes((prevArr) => [result, ...prevArr]);
  };

  const reminderNote = async () => {
    note.reminder = reminderDate;
    const result = await addReminder(note);

    if (result.status === 200) {
      const time = new Date(note.reminder).getTime() - new Date().getTime();
      let x = setTimeout(() => {
        new Notification(
          `You have a pending task : ${note.heading}  `
        );
        setRefresh(new Date());
      }, time);
      setNoticationTimer({
        ...notificationTimer,
        [note._id]: x,
      });
      toast.success("Reminder Added");
    } else {
      toast.error("Error Creating Reminder");
    }
    setOpenPicker(false);
    
  };
  const checkNoteContent = async (note_content) => {
    const updatedNotes = notes.map((data) => {
      return {
        ...data,
        todositem: data.todositem.map((value) => {
          if (value._id !== note_content._id) return value;
          return {
            ...value,
            status: !value.status,
          };
        }),
      };
    });
    setNotes(updatedNotes);
    const result = await marktodoitem({
      _id: note._id,
      itemid: note_content._id,
      status: note_content.status,
    });
  };
  const deleteNote = async (note) => {
    const result = await noteDelete({ _id: note._id });
    if (notificationTimer[note._id]) {
      console.log("notification timer deleted");
      clearTimeout(notificationTimer[note._id]);
      setNoticationTimer({
        ...notificationTimer,
        [note._id]: null,
      });
    }
    setRefresh(new Date());
    const updatedNotes = notes.filter((data) => data.id !== result.id);
    setNotes(updatedNotes);
  };
  const isReminderPast = () => {
    if (note.reminder) {
      return new Date(note.reminder) < new Date();
    }
    return false;
  };
  const calculateTimeDifference = (reminderDate) => {
    const timeDifference = new Date(reminderDate).getTime() - new Date().getTime();
    const minutes = Math.floor(timeDifference / (1000 * 60));
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    if (days > 0) {
      return `${days} day${days > 1 ? "s" : ""}`;
    } else if (hours > 0) {
      return `${hours} hour${hours > 1 ? "s" : ""}`;
    } else {
      return `${minutes} minute${minutes > 1 ? "s" : ""}`;
    }
  };
  return (
    <StyledCard>
      <CardContent>
        {/* <Typography>{note.heading}</Typography>
        <Typography>{note.text}</Typography> */}
        <h4 style={{ color:  note.todositem && note.todositem.every(item => item.status)? "green" : (isReminderPast() ? "red" : "wheat") }}>{note.heading}{" "}
        </h4>
        
        {note.todositem &&
          note.todositem.map((item, index) => {
            return (
              <NoteContent
                item={item}
                key={index}
                id={index}
                onCheckNoteContent={checkNoteContent}
              />
            );
          })}
      </CardContent>
      <CardActions>
      <p style={{ color:  note.todositem && note.todositem.every(item => item.status)? "green" : (isReminderPast() ? "red" : "wheat") }}>
        { note.todositem && note.todositem.every(item => item.status)?"Everything's Done":(note.reminder?(!isReminderPast()
              ? `Upcoming in ${calculateTimeDifference(note.reminder)}`
              : "Pending"):"")}
          </p>  
        <Archive
          fontSize="small"
          style={{ marginLeft: "auto", color: "wheat" }}
          onClick={() => archieveNote(note)}
        />
        {showRem&& <Reminder
          fontSize="small"
          style={{ color: "wheat" }}
          onClick={() => {
            setReminderDate(moment());
            setOpenPicker(true);
          }}
        />}
       
       
        {showDelete && (
          <Delete
            style={{ color: "wheat" }}
            fontSize="small"
            onClick={() => deleteNote(note)}
          />
        )}
      </CardActions>

      <Modal
        open={openPicker}
        onClose={() => {
          setReminderDate(null);
          setOpenPicker(false);
        }}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div
          style={{
            position: "absolute",
            top: "30%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            backgroundColor: "#121212",
            padding: "32px",
            color: "wheat ",
          }}
        >
          <Typography id="modal-modal-title" variant="h6" component="h2" style={{marginBottom:"1em"}}>
            Choose Time for the Reminder
          </Typography>

          <LocalizationProvider dateAdapter={AdapterMoment} >
            <DateTimePicker
              renderInput={(params) => (
                <TextField style={{ width: "100%"  }} {...params} />
              )}
              label="Reminder date and time"
              value={reminderDate}
              onChange={(newValue) => {
                setReminderDate(newValue);
              }}
              minDateTime={reminderDate}
            />
          </LocalizationProvider>
          <div
            style={{
              display: "flex",
              gap: "4px",
              marginTop: "5px",
            }}
          >
            <button
              style={{
                border: "none",
                color: "wheat",
                backgroundColor: "#121212",
              }}
              onClick={() => {
                setReminderDate(null);
                setOpenPicker(false);
              }}
            >
              Cancel
            </button>

            <button
              style={{
                borderRadius: "4px",
                border: "none",
                color: "wheat",
                backgroundColor: "#121212",
              }}
              onClick={reminderNote}
            >
              Ok
            </button>
          </div>
        </div>
      </Modal>
    </StyledCard>
  );
};

const style = {
  position: "absolute",
  top: "30%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  p: 4,
};

export default Note;
