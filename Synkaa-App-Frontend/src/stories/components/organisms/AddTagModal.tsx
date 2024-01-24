import { Box, Button, MenuItem, Select, Typography,  SelectChangeEvent, Stack, Chip  } from "@mui/material";
import React from "react"
import AddIcon from '@mui/icons-material/Add';
export const AddTagModal: React.FC = () => {
    const [age, setAge] = React.useState('');

    const handleChange = (event: SelectChangeEvent) => {
      setAge(event.target.value as string);
    };
  
    const handleClick = () => {
        console.info('You clicked the Chip.');
      };
    
      const handleDelete = () => {
        console.info('You clicked the delete icon.');
      };
    

    return(

        <Box sx={{ maxWidth: '410px', boxShadow:'0px 1px 3px 0px rgba(0, 0, 0, 0.20)', display: 'flex', flexDirection: 'column' , padding:'24px'}}>
    
        <Typography variant="h3" sx={{fontWeight:'600', fontSize:'24px', lineHeight:"20px", my:'16px', }}>
       Add Tags
        </Typography>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          label="Age"
          placeholder="Select tag"
          value={age}
          onChange={handleChange}
          sx={{
            mt: "0.625rem",
            mb: "1rem",
            width: "100%",
            ".MuiInputBase-input": {
              height: "48px",
              boxSizing: "border-box",
            },
            ".MuiOutlinedInput-notchedOutline": {
              borderColor: "#D0D5DD",
              borderRadius: "8px",
            },
          }}
        >
          <MenuItem value={10}>New User</MenuItem>
          <MenuItem value={20}>yatin </MenuItem>
          <MenuItem value={30}>Vegetarian</MenuItem>
        </Select>
   <Box>
   <Stack direction="row" spacing={1} sx={{flexWrap:'wrap'}}>
      <Chip
        label="Clickable Deletable"
        onClick={handleClick}
        onDelete={handleDelete}
        style={{margin:'5px'}}
      />
    <Chip
        label="Clickable Deletable"
        onClick={handleClick}
        onDelete={handleDelete}
        style={{margin:'5px'}}
      />
       <Chip
        label="Clickable Deletable"
        onClick={handleClick}
        onDelete={handleDelete}
        style={{margin:'5px'}}
      />
       <Chip
        label="Clickable Deletable"
        onClick={handleClick}
        onDelete={handleDelete}
        style={{margin:'5px'}}
      />
    </Stack>
   </Box>
        <Box sx={{display:'flex', alignItems: 'center', justifyContent: 'space-between' , pt: '16px' , width:'100%', gap: "16px"}}>
        <Button
       id="basic-button"
       aria-haspopup="true"
       variant="contained"
       disableElevation
       size="large"
       sx={{ width:'100%'}}
      >
        < AddIcon />
       Add Tag
      </Button>
   
        </Box>
   </Box>
    )}