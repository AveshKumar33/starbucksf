/* eslint-disable no-undef */
import theme from "../../../theme/theme";
import { Box, ThemeProvider, Typography } from "@mui/material";
import Image from "next/image";
import React from "react";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { Header } from "../organisms/Header";
import { SideBar } from "../organisms/SideBar";
import Deskbell from "../../../../src/assets/images/Deskbell.svg";
import Repeat from "../../../../src/assets/images/Repeat.svg";
import { LatestUserAddedListing } from "../organisms/LatestUserAddedListing";
import { DashBoardConversation } from "../organisms/DashBoardConversation";

const data = [
  { name: "Jan", NewCustomer: 1400, RecurringCustomer: 2400, amt: 2400 },
  { name: "Feb", NewCustomer: 4800, RecurringCustomer: 1398, amt: 2210 },
  { name: "Mar", NewCustomer: 1350, RecurringCustomer: 4800, amt: 2290 },
  { name: "Apr", NewCustomer: 8498, RecurringCustomer: 3908, amt: 2000 },
  { name: "May", NewCustomer: 1480, RecurringCustomer: 4800, amt: 2181 },
  { name: "Jun", NewCustomer: 6349, RecurringCustomer: 4300, amt: 2100 },
  { name: "Jul", NewCustomer: 1349, RecurringCustomer: 6300, amt: 2100 },
  { name: "Aug", NewCustomer: 4349, RecurringCustomer: 5300, amt: 2100 },
  { name: "Sep", NewCustomer: 1349, RecurringCustomer: 4300, amt: 2100 },
  { name: "Oct", NewCustomer: 8349, RecurringCustomer: 6300, amt: 2100 },
  { name: "Nov", NewCustomer: 1349, RecurringCustomer: 4300, amt: 2100 },
  { name: "Dec", NewCustomer: 4349, RecurringCustomer: 4300, amt: 2100 },
];

export const Dashboard: React.FC = () => {
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
          <Header heading="Settings" dashBoard={true} />
          <Box sx={{ p: "24px", display: "flex", flexDirection: "column", gap: "24px", marginTop: '68px'  }}>
            <Box sx={{ display: "flex", gap: "24px", borderRadius: "10px" }}>
              <Box>
                <Box sx={{ display: "flex", flexDirection: "column", gap: "24px" }}>
                  <Box sx={{ display: "flex" }}>
                    <Box
                      sx={{
                        p: "24px",
                        bgcolor: "#fff",
                        minWidth: "300px",
                        borderRadius: "10px",
                        width: "100%",
                      }}
                    >
                      <Box sx={{ display: "block", width: "100%", marginBottom: "12px" }}>
                        <Typography variant="h5" sx={{color: '#008DF1', fontWeight: '600'}}>
                          New
                          <br />
                          Customers
                        </Typography>
                      </Box>
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          width: "100%",
                          alignItems: "center",
                        }}
                      >
                        <Box>
                          <Typography variant="h2" sx={{color:'#1F1F1F',fontWeight: '500' }}>107</Typography>
                          <Typography sx={{ color: "#808080" }}>Last 7 days</Typography>
                        </Box>
                        <Image width={115} height={115} src={Deskbell} alt="Deskbell" />
                      </Box>
                    </Box>
                  </Box>
                  <Box sx={{ display: "flex" }}>
                    <Box
                      sx={{
                        p: "24px",
                        bgcolor: "#fff",
                        minWidth: "300px",
                        borderRadius: "10px",
                        width: "100%",
                      }}
                    >
                      <Box sx={{ display: "block", width: "100%", marginBottom: "12px" }}>
                        <Typography sx={{ color: "#F08200" }}>
                          Recurring <br /> Customers
                        </Typography>
                      </Box>
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          width: "100%",
                          alignItems: "center",
                        }}
                      >
                        <Box>
                          <Typography variant="h2" sx={{color:'#1F1F1F',fontWeight: '500' }}>12</Typography>
                          <Typography sx={{ color: "#808080" }}>Last 7 days</Typography>
                        </Box>
                        <Image width={115} height={115} src={Repeat} alt="Deskbell" />
                      </Box>
                    </Box>
                  </Box>
                </Box>
              </Box>
              <Box sx={{ flex: 1, bgcolor: "#fff", p: "24px", borderRadius: "10px" }}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    mb: "24px",
                  }}
                >
                  <Typography variant="subtitle1" sx={{fontWeight: '600'}}>Guest Infographic</Typography>
                  <Box sx={{ border: "1px solid", borderColor: "#E4E4E4", px: "16px" }}>
                    <Typography sx={{ color: "#008DF1" }}>Yearly</Typography>
                  </Box>
                </Box>

                <ResponsiveContainer width="99%" height="85%">
                  <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="0 0" vertical={undefined} />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend verticalAlign="bottom" height={20} />
                    <Line type="monotone" dataKey="NewCustomer" stroke="#008DF1" />
                    <Line type="monotone" dataKey="RecurringCustomer" stroke="#F08200" />
                  </LineChart>
                </ResponsiveContainer>
              </Box>
            </Box>
            <Box sx={{ display: "flex", gap: "24px" }}>
              <LatestUserAddedListing />
              <DashBoardConversation />
            </Box>
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
};
