import { Box, Button, Typography } from "@mui/material";
import React from "react";
import ClearIcon from '@mui/icons-material/Clear';

export const DeleteConfirmation: React.FC = () => {
    return(
        <Box sx={{ maxWidth: '410px', boxShadow:'0px 1px 3px 0px rgba(0, 0, 0, 0.20)', display: 'flex', alignItems:'center', flexDirection: 'column' , padding:'32px'}}>
        {/* <Image src={DeleteIcon} alt='DELETE' /> */}
        <Box sx={{display:'flex', alignItems:'center', justifyContent:'space-between', width:'100%' }}>
        <Typography variant="h3" sx={{fontWeight:'600', fontSize:'18px', lineHeight:"20px", my:'16px', textAlign:"center",}}>
        Confirmation
        </Typography>
        <ClearIcon />
        </Box>  
        <Typography variant="caption" sx={{fontWeight:'400', fontSize:'16px',letterSpacing:"-0.384px", color:'#707070', pb:'16px'}}>
        Are you sure you want to delete selected contact ?
        </Typography>               
        <Typography variant="caption" sx={{fontWeight:'500', fontSize:'16px',letterSpacing:"-0.384px", color:'#1F1F1F'}}>
        The tag your are trying to delete has already been associated with 7 customers.
         Deleting this will also remove the tags from each customer.
        </Typography>     
        <Box sx={{display:'flex', alignItems: 'center', justifyContent: 'flex-end' , pt: '32px' , width:'100%', gap: "16px"}}>
        <Button
         id="basic-button"
         aria-haspopup="true"
         // variant="contained"
         disableElevation
         size="large"
         sx={{backgroundColor:'#FF4F4F', color:'#FFFFFF', '&:hover': { backgroundColor:'#FF4F4F'}}}
         >
         Continue
        </Button>
     {/* <Button
       id="basic-button"
       aria-haspopup="true"
       variant="outlined"
       disableElevation
       size="large"
       sx={{color:'#5B5B5B', border:'1px solid #5B5B5B', width:'100% '}}
     >
       Cancel
     </Button> */}
        </Box>
   </Box>
    )

}