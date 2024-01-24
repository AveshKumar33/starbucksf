import { Box, Button, TextField, Typography } from "@mui/material"
import React from "react"
import CloseIcon from '@mui/icons-material/Close';

export const CreateTag: React.FC = () => {
    return(
        <Box sx={{ maxWidth: '410px', boxShadow:'0px 1px 3px 0px rgba(0, 0, 0, 0.20)', display: 'flex', flexDirection: 'column' , padding:'24px'}}>
            <Box sx={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
            <Typography variant="h3" sx={{fontWeight:'600', fontSize:'24px', lineHeight:"20px", my:'16px', }}>
            Create Tag
            </Typography>
            <CloseIcon />
            </Box>
              <TextField
                 sx={{ width: "100%", borderRadius: "4px", height: "40px", marginTop:'16px', marginBottom:'32px' }}
                 type="text"
                 >
                </TextField>
                <Button
       id="basic-button"
       aria-haspopup="true" 
       variant="contained"
       size="large"
       sx={{ width:'100%'}}
      >
    
    Create Tag
      </Button>
        </Box>
    )
}