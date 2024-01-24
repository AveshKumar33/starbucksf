// import { Box, Button, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, Typography } from '@mui/material';
// import Drawer from '@mui/material/Drawer';
// import React, { useState } from 'react';
// import delayTime from "../../../../src/assets/images/delayTime.svg";
// import delay from "../../../../src/assets/images/delay.svg";
// import close from "../../../../src/assets/images/close.svg";
// import Image from "next/image";

// type Anchor = 'left' | 'top' | 'bottom';

// interface GenericDrawerProps {
//     content: React.ReactNode; // Content to be displayed in the drawer
// }

// export default function GenericNodeDrawer({

//     content, // Pass the content as a prop
   
// }: GenericDrawerProps) {
//     const [drawerOpen, setDrawerOpen] = useState({ left: false });
//     const toggleDrawer =
//         (anchor: Anchor, open: boolean) =>
//             (event: React.KeyboardEvent | React.MouseEvent) => {
//                 if (
//                     event.type === 'keydown' &&
//                     ((event as React.KeyboardEvent).key === 'Tab' ||
//                         (event as React.KeyboardEvent).key === 'Shift')
//                 ) {
//                     return;
//                 }

//                 setDrawerOpen({ ...drawerOpen, [anchor]: open });
//             };

//     const list = (anchor: Anchor) => (
//         <Box
//             sx={{
//                 width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 350,
//                 display: 'flex',
//                 flexDirection: 'column',
//                 justifyContent: 'flex-start',
//                 alignItems: 'flex-start',
//                 height: '100%',
//             }}
//             role="presentation"
//             // onClick={toggleDrawer(anchor, true)}
//             onKeyDown={toggleDrawer(anchor, false)}
//         >
//             {content}
//         </Box>
//     );

//     return (
//         <>
//             {(['left'] as const).map((anchor) => (
//                 <React.Fragment key={anchor}>
//                     <Button
//                         className="nodrag"
//                         onClick={toggleDrawer(anchor, true)}
//                         sx={{
//                             display: 'flex',
//                             width: '100%',
//                             justifyContent: 'space-between',
//                             alignItems: 'center',
//                             bgcolor: '#F0F6FE',
//                             px: '16px',
//                             py: '8px',
//                             borderRadius: '8px',
//                             '&:hover': {
//                                 backgroundColor: '#F0F6FE',
//                             },
//                         }}
//                     >
//                         <Box display="flex" flexDirection="column" gap="4px">
//                             <Typography sx={{ color: '#1F1F1F', fontSize: '16px', fontWeight: '500', textAlign: 'left' }}>
//                                 Delay
//                             </Typography>
//                             <Typography sx={{ color: '#707070', fontSize: '14px', fontWeight: '400' }}>
//                                 2hrs from the last message
//                             </Typography>
//                         </Box>
//                         <Image width={24} height={24} src={delayTime} alt="delayTime" />
//                     </Button>
//                     <Drawer anchor={anchor} open={drawerOpen[anchor]} onClose={toggleDrawer(anchor, false)}>
//                         {list(anchor)}
//                     </Drawer>
//                 </React.Fragment>
//             ))}
//         </>
//     );
// }
