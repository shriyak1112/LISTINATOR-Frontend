import { Card, CardActions, CardContent, Typography } from '@mui/material'
import styled from '@emotion/styled'
import React from 'react'
import { UnarchiveOutlined as Unarchive  , DeleteOutlineOutlined as Delete} from '@mui/icons-material'
import { useContext } from 'react'
import { DataContext } from '../../context/DataProvider'
import ArchiveContent from './ArchiveContent'
import { archiveUnarc } from '../../services/api'
const StyledCard = styled(Card)`
width: 250px;
margin:8px;
box-shadow:none;
background:#121212;
color:#fff;
border:1px solid #323232;
box-shadow: 2px 2px 16px #323232;

`

const Archive = ({ note,setRefresh }) => {

    const {notes , setNotes , archiveNotes, setArchiveNotes,showDelete } = useContext(DataContext);

    const UnarchieveNote = async(note) =>{

      const result=await archiveUnarc(note);
      const updatedNotes = archiveNotes.filter(data => data.id !==result.id);
      setRefresh(new Date());
      setArchiveNotes(updatedNotes);
      setNotes(prevArr => [result,...prevArr]);

     
    }

    const deleteNote = (note) =>{
        const updatedNotes = archiveNotes.filter(data => data.id !== note.id);
        setArchiveNotes(updatedNotes);

    }



  return (
    <StyledCard>
        <CardContent>
            <h4 style={{color:"wheat"}}>
                {note.heading}
            </h4>
            {note.todositem&&note.todositem.map((item, index) => {
          return (
            <ArchiveContent
              item={item}
              key={index}
              id={index}
            />
          );
        })}
        </CardContent>
        <CardActions>
            <Unarchive 
            fontSize='small'
             style = {{marginLeft:'auto',color:"wheat"}}
            onClick = {() => UnarchieveNote(note)}
            />


            {showDelete&&(<Delete fontSize='small'
             onClick = {() => deleteNote(note)}
            
            />)}

            

        </CardActions>
    </StyledCard>
  )
}

export default Archive;
