import ArchiveIcon from '@mui/icons-material/Archive';
import { Box, Typography } from '@mui/material'
import React from 'react'
import styled from '@emotion/styled'
import { useContext } from 'react';
import {DataContext} from '../../context/DataProvider';
const Pen = styled(ArchiveIcon)`
font-size:120px;
color:#F5F5F5;
margin-top:0.7em;
`

const Text =styled(Typography)`
color:#80868b;
font-size:22px
`

const Containerr = styled(Box)`
display:flex;
flex-direction:column;
align-items:center;
margin-top:20vh;

`

const EmptyArchiveNotes = () => {
  const{showDelete}=useContext(DataContext);
  return (
    <div>
      <Containerr>
        
        <Pen/>
        <Text>There is nothing Here...</Text>
        
      </Containerr>
    </div>
  )
}

export default EmptyArchiveNotes;