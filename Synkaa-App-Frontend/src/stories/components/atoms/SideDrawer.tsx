import { Box, Button, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, Typography } from '@mui/material';
import Drawer from '@mui/material/Drawer';
import React, { useState } from 'react';
import delayTime from "../../../../src/assets/images/delayTime.svg";
import delay from "../../../../src/assets/images/delay.svg";
import close from "../../../../src/assets/images/close.svg";
import Image from "next/image";

type Anchor = 'left' | 'top' | 'bottom';

export default function TriggerDrawer() {
    const [age, setAge] = useState('');
    const [drawerOpen, setDrawerOpen] = useState({ left: false });
    const handleChange = (event: SelectChangeEvent) => {
        setAge(event.target.value as string);
    };
    const toggleDrawer =
        (anchor: Anchor, open: boolean) =>
            (event: React.KeyboardEvent | React.MouseEvent) => {
                if (
                    event.type === 'keydown' &&
                    ((event as React.KeyboardEvent).key === 'Tab' ||
                        (event as React.KeyboardEvent).key === 'Shift')
                ) {
                    return;
                }

                setDrawerOpen({ ...drawerOpen, [anchor]: open });
            };
    const list = (anchor: Anchor) => (
        <Box
            sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 350, display: "flex", flexDirection: "column", justifyContent: "flex-start", alignItems: "flex-start", height: "100%" }}
            role="presentation"
            // onClick={toggleDrawer(anchor, true)}
            onKeyDown={toggleDrawer(anchor, false)}
        >
            <Box sx={{ width: "100%", flex: "1" }}>
                <Box sx={{
                    display: "flex", width: "100%", justifyContent: "space-between",
                    alignItems: "center", bgcolor: "#ffffff", px: "16px",
                    pt: "8px", pb: "24px", borderRadius: "8px", borderBottom: "1px solid #DADADA"
                }}>
                    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: "16px" }}>
                        <Image width={24} height={24} src={delay} alt="delay" />
                        <Box display="flex" flexDirection="column" gap="4px">
                            <Typography sx={{ color: "#1F1F1F", fontSize: "16px", fontWeight: "500", textAlign: "left" }} >Delays</Typography>
                            <Typography sx={{ color: "#707070", fontSize: "14px", fontWeight: "400" }} >Trigger delay between messages</Typography>
                        </Box>
                    </Box>
                    <Button onClick={toggleDrawer(anchor, false)} sx={{ minWidth: "auto", p: "0px" }}>
                        <Image width={24} height={24} src={close} alt="close" />
                    </Button>
                </Box>
                <Box sx={{ px: "24px" }}>
                    <Typography sx={{ color: "#1F1F1F", fontSize: "16px", fontWeight: "500", lineHeight: "22px", my: "16px" }} >Select delay time</Typography>
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">
                            <Typography sx={{ color: "#1F1F1F", fontSize: "16px", fontWeight: "400", lineHeight: "22px" }} >Select Time</Typography>
                        </InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={age}
                            label="Select Time"
                            onChange={handleChange}
                        >
                            <MenuItem value={10}>Ten</MenuItem>
                            <MenuItem value={20}>Twenty</MenuItem>
                            <MenuItem value={30}>Thirty</MenuItem>
                        </Select>
                    </FormControl>
                </Box>
            </Box>
            <Box sx={{ bgcolor: "#CCD3D9", display: "flex", justifyContent: "center", alignItems: "center",gap:"16px",width:"100%",py:"25px",borderRadius:"4px" }}>
                <Typography sx={{ color: "#1F1F1F", fontSize: "16px", fontWeight: "400", lineHeight: "22px" }} >Apply changes?</Typography>
                <Box sx={{display:"flex",gap:"4px"}}>
                    <Button sx={{border:"2px solid #707070",borderRadius:"4px",padding:"5px 20px"}}>
                        <Typography sx={{ color: "#1F1F1F", fontSize: "16px", fontWeight: "400", lineHeight: "22px" }} >Cancel</Typography>
                    </Button>
                    <Button onClick={toggleDrawer(anchor, false)} sx={{bgcolor:"#008DF1",padding:"7px 25px", '&:hover': {
                                    backgroundColor: '#008DF1',
                                },}}>
                        <Typography sx={{ color: "#ffffff", fontSize: "16px", fontWeight: "400", lineHeight: "22px" }} >Apply</Typography>
                    </Button>
                </Box>
            </Box>
        </Box>
    );
    return (
        <>
            {(['left'] as const).map((anchor) => (
                <React.Fragment key={anchor}>
                    <Button className="nodrag"
                        onClick={toggleDrawer(anchor, true)}
                        sx={{
                            display: "flex", width: "100%", justifyContent: "space-between",
                            alignItems: "center", bgcolor: "#F0F6FE", px: "16px",
                            py: "8px", borderRadius: "8px", '&:hover': {
                                backgroundColor: '#F0F6FE',
                            },
                        }}>
                        <Box display="flex" flexDirection="column" gap="4px">
                            <Typography sx={{ color: "#1F1F1F", fontSize: "16px", fontWeight: "500", textAlign: "left" }} >Delay</Typography>
                            <Typography sx={{ color: "#707070", fontSize: "14px", fontWeight: "400" }} >2hrs from the last message</Typography>
                        </Box>
                        <Image width={24} height={24} src={delayTime} alt="delayTime" />
                    </Button>
                    <Drawer
                        anchor={anchor}
                        open={drawerOpen[anchor]}
                        onClose={toggleDrawer(anchor, false)}
                    >
                        {list(anchor)}
                    </Drawer>
                </React.Fragment>
            ))}
        </>
    );
}