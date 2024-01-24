import { Box, Button, Divider, Link, TextField, ThemeProvider } from "@mui/material";
import React from "react";
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Image from "next/image";
import Typography from '@mui/material/Typography';
import { Header } from "../organisms/Header";
import { SideBar } from "../organisms/SideBar";
import theme from "../../../theme/theme";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SmartphoneIcon from '@mui/icons-material/Smartphone';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import MobileFrame from '../../../assets/images/mobile_frame.svg';
import { Managetags } from "./Managetags";
import { Manageprofile } from "./Manageprofile";

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
  }

  function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;
  
    return(
        <div
        role="tabpanel"
        hidden={value !== index}
        id={`vertical-tabpanel-${index}`}
        aria-labelledby={`vertical-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{ p: 3 }}>
           {children}
          </Box>
        )}
      </div>
    );
  }
  
  function a11yProps(index: number) {
    return {
      id: `vertical-tab-${index}`,
      'aria-controls': `vertical-tabpanel-${index}`,
    };
  }
  
  export const SettingLandingModify: React.FC = () => {
    const [value, setValue] = React.useState(0);
  
    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
      setValue(newValue);
    };
  
    return (
      <ThemeProvider theme={theme}>
      <Box
        sx={{
          display: "flex",
          width: "100%",
          height: "100%",
          flexGrow: "1",
          bgcolor: "#F0F6FE",
        }}
      >
        <Box
          sx={{
            flexBasis: "60px",
          }}
        >
          <SideBar />
        </Box>
        <Box
          sx={{
            flex: 1,
          }}
        >
          <Header  heading="Settings" dashBoard={false}/>
          <Box
          className="custom_tab" 
        sx={{ flexGrow: 1, bgcolor: '#F0F6FE;', display: 'flex', marginTop: '68px', }}
      >
        <Box  sx={{ width:'324px',margin:'24px',background:'white', borderRadius:'12px', height:'calc(100vh - 133px)' , padding:'24px', position:'sticky', top:'92px'}}>
        <Tabs
          orientation="vertical"
          variant="scrollable"
          value={value}
          onChange={handleChange}
          aria-label="Vertical tabs example"
         
        >
          <Tab sx={{display:'flex', flexDirection:'row', justifyContent:'flex-start', fontSize:'16px', minHeight:'40px', color:'#1F1F1F',  textTransform:'capitalize' }} icon={<AccountCircleIcon sx={{paddingRight:'8px', height:'24px', width:'24px'}}/>} label="Manage Profile" {...a11yProps(0)} />
          <Tab sx={{display:'flex', flexDirection:'row',justifyContent:'flex-start', fontSize:'16px', minHeight:'40px',color:'#1F1F1F', textTransform:'capitalize' }} icon={<SmartphoneIcon sx={{paddingRight:'8px', height:'24px', width:'24px'}}/>} label="Landing Page" {...a11yProps(1)} />
          <Tab  sx={{display:'flex', flexDirection:'row', justifyContent:'flex-start', fontSize:'16px', minHeight:'40px', color:'#1F1F1F',   textTransform:'capitalize'}} icon={<LocalOfferIcon sx={{paddingRight:'8px', height:'24px', width:'24px'}} />} label="Manage Tags" {...a11yProps(2)} />
        
        </Tabs>
        </Box>
        <TabPanel value={value} index={0}>
        <Box sx={{width:'100%',background:'white', borderRadius:'12px', height:'calc(100vh - 133px)', padding:'28px'}}>
         <Manageprofile />
          </Box>
        </TabPanel>
        <TabPanel value={value} index={1} >
          <Box sx={{width:'100%',background:'white', borderRadius:'12px', height:'auto', padding:'28px'}}>
            <Box sx={{display:'flex', justifyContent:'space-between', alignItems:'center', paddingBottom:'24px'}}>
             <Box>
              <Typography variant="subtitle1" sx={{fontWeight:'700'}}>
              Landing Page
             </Typography>
             <Typography variant="caption" sx={{fontWeight:'400', color:'#1C1B1F', fontSize:'14px'}}>
             Edit and personalize your landing page
             </Typography>
            </Box>
            <Box>
              <Button variant="contained">
                Update
              </Button>
            </Box>
            </Box>
            <Divider sx={{marginBottom:'24px'}}/>
            <Box sx={{display:'flex' }}>
             <Box sx={{flexGrow:'1', width:'calc(40% - 65px)'}}>
                 <label><Typography variant="h6" sx={{fontWeight:'700'}} >Restaurant Name</Typography></label>
               <TextField
                 sx={{ width: "100%", borderRadius: "4px", height: "40px", marginTop:'16px', marginBottom:'32px'}}
                 type="text"
                 >
               </TextField>
            
               <label><Typography variant="h6" sx={{fontWeight:'700'}} >Header</Typography></label>
              <TextField
                 sx={{ width: "100%", borderRadius: "4px", height: "40px", marginTop:'16px', marginBottom:'32px' }}
                 type="text"
                 >
                </TextField>
               <label><Typography variant="h6" sx={{fontWeight:'700'}}>Company Logo</Typography></label>
               <label htmlFor="file-input"  style={{position:'relative' , marginTop:'16px' }}>
               <TextField
                 sx={{opacity:'0', position:'absolute', top:'0', left:'0', right:'0', bottom:'0' }}
                 type="file"
                 id="file-input"
                 >
               </TextField>
               <Box sx={{border:'1px dashed #008DF1', padding:'40px', background:'#F5FBFF' , display:'flex', alignItems:'center', justifyContent:'center', borderRadius: "4px",  marginTop:'16px', height:'600'}}>
                <FileDownloadIcon sx={{color:'#008DF1', marginRight:'14px'}} />
                <Typography sx={{color:'#008DF1', fontSize:"14px", fontWeight:'500', textAlign:'center'}} >Select a media file to upload
                  <br />
                  or drag & drop here
                </Typography>
               </Box>
              </label>
              <Typography sx={{fontSize:'14px', fontWeight:'600', color:'#008DF1', p:'16px 0 24px 0'}}>
              Synkaa.jpg
              </Typography>
              <label><Typography variant="h6" sx={{fontWeight:'700'}}>Background Image</Typography></label>
               <label htmlFor="file-input"  style={{position:'relative' , marginTop:'16px' }}>
               <TextField
                 sx={{opacity:'0', position:'absolute', top:'0', left:'0', right:'0', bottom:'0' }}
                 type="file"
                 id="file-input"
                 >
               </TextField>
               <Box sx={{border:'1px dashed #008DF1', padding:'40px', background:'#F5FBFF' , display:'flex', alignItems:'center', justifyContent:'center', borderRadius: "4px",  marginTop:'16px'}}>
                <FileDownloadIcon sx={{color:'#008DF1', marginRight:'14px'}} />
                <Typography sx={{color:'#008DF1', fontSize:"14px", fontWeight:'500', textAlign:'center'}} >Select a media file to upload
                  <br />
                  or drag & drop here
                </Typography>
               </Box>
              </label>
              <Typography sx={{fontSize:'14px', fontWeight:'600', color:'#008DF1', py:'16px'}}>
              Restaurant Images 104.jpg
              </Typography>
              <Divider sx={{marginTop:'8px', marginBottom:'24px'}} />
              <Typography variant="h6" sx={{fontWeight:'600'}}>Terms & Condition</Typography>
              <Typography variant="subtitle2" sx={{py:'20px'}} >I have read the 
               <Link style={{fontWeight:'600' , color:'#000', paddingLeft:'4px', fontStyle:'italic' }} href="#" >
                   Terms & Conditions
                </Link> & allow Hans Im Gluck  to contact me via Whatapp. </Typography>
              <Box sx={{display:'flex', alignItems:'center', justifyContent:'space-between',flexWrap:'wrap' }}>
              <Typography variant="h6" sx={{fontWeight:'700' , color:'#008DF1'}}>Edit Terms & Conditions</Typography>
              <Typography variant="caption" sx={{fontWeight:'400', color:'#707070', py:'16px'}}>Last Updated: 20 Aug, 2023 - 14:00:00 SGT</Typography>
              </Box>
             </Box>
             <Box sx={{flexGrow:'1', width:'calc(60% - 65px)', padding:'40px'}}>
              <Box sx={{border:'1px dashed #000', padding:'56px',}}>
             <Box sx={{width:'320px' ,borderRadius:'53px', height:'670px', background:'red', position:'relative'}}>
             <Image className="mobile_frame" src={MobileFrame} alt="QrCodeIcon" />
              </Box>   
              </Box>
             </Box>
            </Box>
          </Box>
        </TabPanel>
        <TabPanel value={value} index={2}>    
<Managetags />
        </TabPanel>
        
      </Box>
        </Box>
      </Box>
      </ThemeProvider>
    )
}