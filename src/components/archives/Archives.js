import React from 'react'
import { Box, Grid} from '@mui/material';
import { styled } from '@mui/material';
import { useContext,useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { getToken } from "../../services/api";
import EmptyArchiveNotes from '../notes/EmptyArchiveNotes';
//import components

import Archive from './Archive'
import { DataContext } from '../../context/DataProvider';
import SwiperDrawer from '../SwiperDrawer';
import {archive} from '../../services/api.js';
import { useState } from 'react';
const DrawerHeader = styled('div')(({ theme }) => ({
    ...theme.mixins.toolbar,
  }));

const Archives = () => {
    const navigate = useNavigate();
    const { archiveNotes,setArchiveNotes } = useContext(DataContext);
    const [refresh,setRefresh]=useState();
    useEffect(()=>{
      if(!getToken()){
        navigate('/error');
      }
      fetchtodo();
    },[refresh])
    async function fetchtodo(){
      const result =await archive();
      const contentArray = result.data.data.todos.map(({ _id, heading, todositem,isArchive }) => ({ _id, heading, todositem,isArchive }));
      const reversedContentArray = contentArray.reverse();
      if (result.status===200&&result.data.status===200){
         setArchiveNotes(reversedContentArray);
      }  
    }
  return (
    
    <Box sx={{ display: 'flex',width:'100%',backgroundColor:"black",height:"100vh" }}>
      <SwiperDrawer/>
        <Box sx={{p: 3 ,width:'100%'}}>
        <DrawerHeader />
       
       
        


        {archiveNotes && archiveNotes.length > 0 ? (
        <Grid container style={{marginTop:"18px"}}>

        {
            archiveNotes.map(archive => (
                <Grid item>
                <Archive note = {archive } setRefresh={setRefresh}/>
                </Grid>
                ))
            }
        
            </Grid> 
             ) : (
              <EmptyArchiveNotes />
            )}
         

        </Box>
    </Box>
  )
}

export default Archives;

  