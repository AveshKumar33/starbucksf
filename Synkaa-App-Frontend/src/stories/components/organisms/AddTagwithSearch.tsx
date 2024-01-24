import { Box, Button, Typography,  Stack, Chip, Autocomplete, TextField, Checkbox  } from "@mui/material";
import React from "react"
import AddIcon from '@mui/icons-material/Add';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

export const AddTagWithSearch: React.FC = () => {


    const handleClick = () => {
        console.info('You clicked the Chip.');
      };
    
      const handleDelete = () => {
        console.info('You clicked the delete icon.');
      };
      const Tags = [
        { title: 'The Shawshank Redemption', year: 1994 },
        { title: 'The Godfather', year: 1972 },
        { title: 'The Godfather: Part II', year: 1974 },
        { title: 'The Dark Knight', year: 2008 },
        { title: '12 Angry Men', year: 1957 },
        { title: "Schindler's List", year: 1993 },
        { title: 'Pulp Fiction', year: 1994 },
        {
          title: 'The Lord of the Rings: The Return of the King',
          year: 2003,
        },
      ];
    return(
        <Box sx={{ maxWidth: '410px', boxShadow:'0px 1px 3px 0px rgba(0, 0, 0, 0.20)', display: 'flex', flexDirection: 'column' , padding:'24px'}}>
    
        <Typography variant="h3" sx={{fontWeight:'600', fontSize:'24px', lineHeight:"20px", my:'16px', }}>
       Add Tags
        </Typography>
        <Autocomplete
      disablePortal
      disableCloseOnSelect
      id="combo-box-demo"
      options={Tags}
      getOptionLabel={(option) => option.title}
      sx={{ width: '100%' }}
      renderOption={(props, option, { selected }) => (
        <li {...props}>
          <Checkbox
            icon={icon}
            checkedIcon={checkedIcon}
            style={{ marginRight: 8 }}
            checked={selected}
          />
          {option.title}
        </li>
      )}
      style={{ width: '100%' }}
      renderInput={(params) => (
        <TextField {...params}  placeholder="Select tags" variant="outlined" />
      )}
    />
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