// import { Box } from "@mui/material";
import React from "react";
import Image from "next/image";
import ManageProfileBg from "../../../assets/images/manage-profile-bg.svg";
import { Avatar, Badge, Box, Button, Stack, Typography, styled } from "@mui/material";


const SmallAvatar = styled(Avatar)(() => ({
    width: 28,
    height: 28,
  }));
export const Manageprofile: React.FC = () => {
    return(
   <>
           <Box sx={{position:'relative'}}>
        <Image className="manage_profile"  src={ManageProfileBg} alt="whatsAppBg"   />
         <Box sx={{position:'absolute', bottom:'-10px', left:'35px'}}>
         <Stack direction="row" spacing={1}>
         <Badge
        overlap="circular"
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        badgeContent={
          <SmallAvatar sx={{cursor:'pointer'}} alt="Remy Sharp" src="../../../assets/images/editavatar.png" />
        }
      >
        <Avatar alt="Travis Howard" src="../../../assets/images/avatar_img.png" sx={{ width: '80px', height:'80px' }} />
         </Badge>
         </Stack>
         </Box>
         </Box>
         <Box sx={{width:'60%' , marginTop:'60px'}}>
          <Box sx={{display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'16px'}}>
           <Typography sx={{color:'#00253F', fontSize:'16px', fontWeight:'600'}}>
           Name
           </Typography>
           <Typography sx={{color:'#00253F', fontSize:'16px', fontWeight:'600'}}>
           Sarah John
           </Typography>
          </Box>
          <Box sx={{display:'flex', justifyContent:'space-between', alignItems:'center',  marginBottom:'16px'}}>
           <Typography sx={{color:'#00253F', fontSize:'16px', fontWeight:'600'}}>
           Email
           </Typography>
           <Typography sx={{color:'#00253F', fontSize:'16px', fontWeight:'600', }}>
           sarahjohn@gmail.com
           </Typography>
          </Box>
          <Box sx={{display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'16px'}}>
           <Typography sx={{color:'#00253F', fontSize:'16px', fontWeight:'600'}}>
           Contact Number
           </Typography>
           <Typography sx={{color:'#00253F', fontSize:'16px', fontWeight:'600'}}>
           (804) 89652 3652
           </Typography>
          </Box>
          <Box sx={{display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'16px'}}>
           <Typography sx={{color:'#00253F', fontSize:'16px', fontWeight:'600'}}>
           Password
           </Typography>
           <Typography>
            <Button sx={{color:'#008DF1'}}>
            Change
            </Button>
           </Typography>
          </Box>
         </Box>
         </>
      
    )}