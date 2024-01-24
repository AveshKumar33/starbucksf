/* eslint-disable no-undef */
import theme from "../../../theme/theme";
import { Box, TextField, ThemeProvider, Typography } from "@mui/material";
import Image from "next/image";
import React, { useState } from "react";
// import { Header } from "../organisms/Header";
import { SideBar } from "../organisms/SideBar";
import search from "../../../../src/assets/images/search.svg";
import threeDots from "../../../../src/assets/images/threeDots.svg";
import whatsApp from "../../../../src/assets/images/whatsApp.svg";
import whatsAppBg from "../../../../src/assets/images/whatsAppBg.jpg";
import attachment from "../../../../src/assets/images/attachment.svg";
import send from "../../../../src/assets/images/send.svg";
import { Header } from "../organisms/Header";


const data = [
    { name: "Anna Jones", RecurringCustomer: 2400, amt: 2400 },
    { name: "John Cena", RecurringCustomer: 1398, amt: 2210 },
    { name: "Timothy James", RecurringCustomer: 4800, amt: 2290 },
    { name: "Anna Hay", RecurringCustomer: 3908, amt: 2000 },
    { name: "Joanna Jones", RecurringCustomer: 4800, amt: 2181 },
    { name: "Gerrard Butler ", RecurringCustomer: 4300, amt: 2100 },
    { name: "Anna Jones", RecurringCustomer: 6300, amt: 2100 },
    { name: "Madison Jones", RecurringCustomer: 5300, amt: 2100 },
    { name: "Jessica Alba", RecurringCustomer: 4300, amt: 2100 },
    { name: "Evin Kevins", RecurringCustomer: 6300, amt: 2100 },
];

export const Conversation: React.FC = () => {
    const [bgColor ] = useState<string>('#fff')
    const [activeIndex, setActiveIndex] = useState<number | null>(null);
    // function bgColorOnClick() {
    //     setBgColor("#F5FAFF")
    // }
    return (
        <ThemeProvider theme={theme}>
            <Box sx={{ display: "flex", width: "100%", height: "100%", flexGrow: "1", bgcolor: "#F0F6FE" }}>
                <Box sx={{ flexBasis: "60px" }}>
                    <SideBar />
                </Box>
                <Box sx={{ flex: 1 }}>
                    <Header headingType={false} heading="Conversations" />
                    <Box sx={{ display: "flex", gap: "24px", p: "24px", borderRadius: "10px", mt: '68px' }}>
                        <Box sx={{ flexBasis: "394px", bgcolor: "#fff", borderRadius: "10px" }}>
                            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", py: "18px", px: "27px", }}>
                                <Typography sx={{ fontSize: "18px", fontWeight: "500", color: "#1F1F1F" }}>Inbox</Typography>
                                <Image width={24} height={24} src={search} alt="search" />
                            </Box>
                            {data.map((i,index) => (
                                <Box
                                    key={index}
                                    onClick={() => setActiveIndex(index)}
                                    sx={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                        alignItems: "center",
                                        bgcolor: activeIndex === index ? '#F5FAFF' : bgColor,
                                        px: "27px",
                                        transition: "100ms ease",
                                        cursor: "pointer",
                                        py: "10px",
                                        gap: "8px",
                                        '&:hover': {
                                            bgcolor: "#F5FAFF",
                                        },
                                    }}
                                >
                                    <Box sx={{ py: "8px" }}>
                                        <Typography sx={{ fontSize: "14px", fontWeight: "500", color: "#707070" }}>02:23PM</Typography>
                                        <Typography sx={{ fontSize: "16px", fontWeight: "500", color: "#1F1F1F" }}>{i.name}</Typography>
                                        <Typography sx={{ fontSize: "14px", fontWeight: "400", color: "#707070" }}>Lörem ipsum häpynat ogenat </Typography>
                                    </Box>
                                    <Box>
                                        <Image width={24} height={24} src={threeDots} alt="threeDots" />
                                    </Box>
                                </Box>
                            ))}

                        </Box>
                        <Box sx={{ display: "flex", flexDirection: "column", flex: 1, bgcolor: "#F0F6FE", gap: "24px" }}>
                            <Box sx={{ bgcolor: "#fff", display: "flex", justifyContent: "space-between", alignItems: "center", py: "18px", pl: "20px", pr: "40px", borderRadius: '10px' }}>
                                <Box sx={{ display: "flex", justifyContent: "flex-start", alignItems: "center", gap: "10px" }}>
                                    <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", bgcolor: "#FF8C8C", px: "18px", py: "15px", borderRadius: "50%" }}>
                                        <Typography sx={{ fontSize: "24px", fontWeight: "500", color: "#1F1F1F" }}>AJ</Typography>
                                    </Box>
                                    <Box>
                                        <Typography sx={{ fontSize: "16px", fontWeight: "500", color: "#181818" }}>Anna Jones</Typography>
                                        <Box sx={{ display: "flex", justifyContent: "flex-start", alignItems: "center" }}>
                                            <Image width={24} height={24} src={whatsApp} alt="whatsApp" />
                                            <Typography sx={{ fontSize: "14px", fontWeight: "500", color: "#707070" }}>+183939292021</Typography>
                                        </Box>
                                        <Typography sx={{ fontSize: "14px", fontWeight: "400", color: "#707070" }}>Scanned on -24th October, 2022  13:10</Typography>
                                    </Box>
                                </Box>
                                <Box>
                                    <Image width={24} height={24} src={search} alt="search" />
                                </Box>
                            </Box>
                            <Box sx={{
                                flex: "1",
                                height: '100%',
                                width: '100%',
                                position: 'relative',

                            }}>
                                <Box sx={{ position: "absolute", width: "100%", height: "100%", zIndex: "0" }}>
                                    <Image src={whatsAppBg} alt="whatsAppBg" layout="fill" objectFit="cover" />
                                </Box>
                                <Box sx={{ px: "32px", py: "20px", display: "flex", flexDirection: 'column', gap: '20px' }}>
                                    <Box sx={{ position: "relative", bgcolor: "#D9FDD3", width: "fit-content", ml: "auto", p: '15px', maxWidth: "50%", display: "flex", flexDirection: "column", gap: "4px", borderRadius: "10px", boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px" }}>
                                        <Typography sx={{ fontSize: "14px", fontWeight: "400", color: "#3E3E3E", textAlign: "end" }}>09:24AM</Typography>
                                        <Typography sx={{ fontSize: "16px", fontWeight: "400", color: "#5E5E5E" }}>
                                            Hey Anna hope you enjoyed your meal with us. If you could kindly fill the feedback form attached below, it will be great
                                        </Typography>
                                    </Box>
                                    <Box sx={{ position: "relative", bgcolor: "#fff", width: "fit-content", mr: "auto", p: '15px', maxWidth: "50%", display: "flex", flexDirection: "column", gap: "4px", borderRadius: "10px", boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px" }}>
                                        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", }}>
                                            <Typography sx={{ fontSize: "14px", fontWeight: "700", color: "#181818", textAlign: "end" }}>Anna Jones</Typography>
                                            <Typography sx={{ fontSize: "14px", fontWeight: "400", color: "#3E3E3E", textAlign: "end" }}>09:24AM</Typography>
                                        </Box>
                                        <Typography sx={{ fontSize: "16px", fontWeight: "400", color: "#5E5E5E" }}>
                                            It was a great experience. Thanks you so much for such wonderful service.
                                        </Typography>
                                    </Box>
                                </Box>
                            </Box>
                            <Box sx={{ bgcolor: "#fff", py: "32px", px: "24px", borderRadius: "10px", display: "flex", justifyContent: "flex-start", alignItems: "center", gap: "12px" }}>
                                <Box sx={{ bgcolor: "#008DF1", px: '12px', py: '10px', borderRadius: "10px", display: "flex", justifyContent: "center", alignItems: "center" }}>
                                    <Image width={18} height={18} src={attachment} alt="attachment" />
                                </Box>
                                <Box sx={{ flex: '1' }}>
                                    <TextField
                                        id="outlined-basic"
                                        label="Type a message"
                                        variant="outlined"
                                        sx={{
                                            '& .MuiInputBase-root': {
                                                height: '40px',
                                            },
                                            '& .MuiInputLabel-outlined': {
                                                transform: 'translate(14px, 8px) scale(1)',
                                                fontSize: "16px"
                                            },
                                            '& .MuiInputLabel-outlined.MuiInputLabel-shrink': {
                                                transform: 'translate(20px, -6px) scale(0.75)',
                                            },
                                        }}
                                    />
                                </Box>
                                <Box sx={{ bgcolor: "#008DF1", px: '12px', py: '10px', borderRadius: "10px", display: "flex", justifyContent: "center", alignItems: "center" }}>
                                    <Image width={18} height={18} src={send} alt="send" />
                                </Box>

                            </Box>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </ThemeProvider>
    );
};
