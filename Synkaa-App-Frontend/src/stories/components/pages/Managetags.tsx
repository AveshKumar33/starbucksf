import { Box, Button, Divider, InputAdornment, TextField, Typography } from "@mui/material";
import React from "react";
import SearchIcon from '@mui/icons-material/Search'; 
import EditIcon from '../../../assets/images/border_color.png';
import DeleteIcon from '../../../assets/images/delete.png';
import Image from "next/image";

export const Managetags: React.FC = () => {
    return(

        
            <Box sx={{width:'100%',background:'white', borderRadius:'12px', height:'calc(100vh - 133px)', padding:'28px'}}>
            <Box sx={{display:'flex', justifyContent:'space-between', alignItems:'center', paddingBottom:'24px'}}>
             <Box>
              <Typography variant="subtitle1" sx={{fontWeight:'700'}}>
              Manage Tags
             </Typography>
             <Typography variant="caption" sx={{fontWeight:'400', color:'#1C1B1F', fontSize:'14px'}}>
             Total Tags: 4
             </Typography>
            </Box>
            <Box sx={{display:'flex', alignItems:'center',}}>
            <TextField
            sx={{marginRight:'.5rem', flex: 1, minWidth:'200px' , borderRadius:'8px',  }}
            placeholder="Search"
            size="small"
            inputProps={{ 'aria-label': 'search google maps' }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                <SearchIcon />
                </InputAdornment>
              ),
                }}
               />
              <Button variant="contained">
                Create Tags
              </Button>
            </Box>
            </Box>
            <Divider sx={{marginBottom:'24px'}}/>
            <Box sx={{display:'flex', alignItems:'center', justifyContent:'space-between',gap:'12px'}}>
             <Box sx={{display:'flex', padding: '16px', justifyContent:'space-between',border:'1px solid #D9D9D9', borderRadius:'7px', width:'32%' }}>
             <Typography>High Value Customer</Typography>
             <Box>
             <Image style={{marginRight:'10px'}} src={EditIcon} alt="QrCodeIcon" />
             <Image  src={DeleteIcon} alt="QrCodeIcon" />
             </Box>
             </Box>
             
             <Box sx={{display:'flex', padding: '16px', justifyContent:'space-between',border:'1px solid #D9D9D9', borderRadius:'7px', width:'32%' }}>
             <Typography>New User</Typography>
             <Box>
             <Image style={{marginRight:'10px'}} src={EditIcon} alt="QrCodeIcon" />
             <Image  src={DeleteIcon} alt="QrCodeIcon" />
             </Box>
             </Box>
             <Box sx={{display:'flex', padding: '16px', justifyContent:'space-between',border:'1px solid #D9D9D9', borderRadius:'7px', width:'32%' }}>
             <Typography>Recurring</Typography>
             <Box>
             <Image style={{marginRight:'10px'}} src={EditIcon} alt="QrCodeIcon" />
             <Image  src={DeleteIcon} alt="QrCodeIcon" />
             </Box>
             </Box>
            </Box>
            </Box>
      
    )}