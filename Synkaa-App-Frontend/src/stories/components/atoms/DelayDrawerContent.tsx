// import { Box, Button, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, Typography } from "@mui/material";
// import Image from "next/image";
// import delay from "../../../../src/assets/images/delay.svg";
// import close from "../../../../src/assets/images/close.svg";
// import { useState } from "react";

// export default function DelayDrawerContent( anchor:any, toggleDrawer:(anchor:any,type:boolean)=>any ) {
//     const [age, setAge] = useState('');
//     const handleChange = (event: SelectChangeEvent) => {
//         setAge(event.target.value as string);
//     };
//     return (
//         <Box
//             sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 350, display: "flex", flexDirection: "column", justifyContent: "flex-start", alignItems: "flex-start", height: "100%" }}
//             role="presentation"
//             // onClick={toggleDrawer(anchor, true)}
//             onKeyDown={toggleDrawer(anchor, false)}
//         >
//           hello
//         </Box>
//     )
// }