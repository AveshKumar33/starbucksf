import { Box , Button, Typography} from "@mui/material";
import React from "react";
import Image from "next/image";
import logo from "../../../assets/images/logo.svg";
import theme from "../../../theme/theme";
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

export const LandingPage: React.FC = () => {
    return(
   <Box sx={{maxWidth: '393px', mx: 'auto'}}>
     <header>
        <Box sx={{px:'20px', py:'16px', backgroundColor: theme.palette.primary.light}}>
        <Image height='33' src={logo} alt="logo" />
        </Box>
     </header>
        <Box className="landing-bg" sx={{px: '29px' , paddingBottom: '40px', display:"flex", justifyContent:'end', flexDirection:'column'}}>
        <Typography variant="h3" sx={{color: '#FFF', fontWeight:'700'}}> 
         Smoke House
        </Typography>
        <Typography variant="h6" sx={{color:'#FFF' , fontWeight:'400' , py:'10px'}}> 
        Laugh. Eat. Enjoy.
        </Typography>
        <Typography variant="h6" sx={{fontWeight:'500', color: '#0EF4FF', paddingBottom:'48px'}}> 
        In order to continue, kindly follow instructions below
        </Typography>
        <FormGroup>
      <FormControlLabel  sx={{ color:'#fff', paddingBottom:'48px', fontSize:'14px', '& .MuiFormControlLabel-label' : {fontSize: '14px'}   }}  control={<Checkbox defaultChecked sx={{ '& .MuiSvgIcon-root': { fontSize: 28 , color:'#fff' } }} />} label="I have read the Terms & Conditions & allow Smoke House to contact me via Whatapp. "  />
       </FormGroup>
        <Button
            id="basic-button"
            aria-haspopup="true"
            variant="contained"
            disableElevation
            size="large"
            sx={{backgroundColor:'00A8F0', width:'100%'}}
          >
            Authenticate
          </Button>
        </Box>
   </Box>
    )
}