"use client";
import React from "react";
import Image from "next/image";
import { Box, MenuItem, Select, Typography } from "@mui/material";

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
import Deskbell from "@/assets/images/Deskbell.svg";
import Repeat from "@/assets/images/Repeat.svg";
import UserServices from "@/services/user.service";
import LoaderGlobal from "@/components/LoaderGlobal";
// import { LatestUserAddedListing } from "@/stories/components/organisms/LatestUserAddedListing";
// import { DashBoardConversation } from "@/stories/components/organisms/DashBoardConversation";

const Dashboard: React.FC = () => {
  const [apiLoading, setApiLoading] = React.useState<boolean>(false);
  const [lastSevenDaysRecurring, setLastSevenDaysRecurring] = React.useState<number>(0);
  const [lastSevenDaysNew, setLastSevenDaysNew] = React.useState<number>(0);
  const [graphType, setGraphType] = React.useState<string>("Yearly");
  const [monthlyData, setMonthlyData] = React.useState<any>();
  const [yearlyData, setYearlyData] = React.useState<any>();
  const [weeklyData, setWeeklyData] = React.useState<any>();

  // To fetch recurring and new customer of last 7 days
  async function getLastSevenDaysCustomerData() {
    setApiLoading(true);
    // Date set for today and last seven day
    const currentDate = new Date();
    const sevenDaysAgo = new Date(currentDate);
    sevenDaysAgo.setDate(currentDate.getDate() - 7);

    // Custom API trigger for Custom dates
    const customResult: any = await UserServices.getUserDataForDashboard(
      "Custom",
      sevenDaysAgo.toISOString(),
      currentDate.toISOString(),
    );

    // Array set for both recurring and new customer
    let recurringCustomerArray: object[] = [];
    let newCustomerArray: object[] = [];

    // Storing and filtering data according to isRecurring
    customResult.data.map((user: any) => {
      if (user.role !== "Admin" && user.isRecurring === true) {
        recurringCustomerArray.push(user);
      }
      if (user.role !== "Admin" && user.isRecurring === false) {
        newCustomerArray.push(user);
      }
    });

    setLastSevenDaysRecurring(recurringCustomerArray.length);
    setLastSevenDaysNew(newCustomerArray.length);
    setApiLoading(false);
  }

  // To fetch recurring and new customer according to option selected for graph type
  async function getCustomerDataForGraph() {
    setApiLoading(true);
    if (graphType === "Yearly") {
      // Date set for current year and 5 years back
      const currentYear = new Date();
      const fiveYearsBack = new Date(currentYear);
      fiveYearsBack.setFullYear(currentYear.getFullYear() - 4);
      const reccursiveYears = new Date(currentYear);
      reccursiveYears.setFullYear(currentYear.getFullYear() - 4);

      // Start from five years ago and iterate until the current year to store all years falling in between
      const yearsBetween: any = [];
      while (reccursiveYears <= currentYear) {
        const yearNum = reccursiveYears.toLocaleString("en-US", {
          year: "numeric",
        });
        yearsBetween.push(yearNum);
        reccursiveYears.setFullYear(reccursiveYears.getFullYear() + 1);
      }

      // Custom API trigger for Custom dates
      const customResult: any = await UserServices.getUserDataForDashboard(
        "Custom",
        fiveYearsBack.toISOString(),
        currentYear.toISOString(),
      );

      const userList: any = customResult.data;

      // Dividing data according to months
      const yearlyUserData = yearsBetween.map((yearNum: string) => {
        const RecurringCustomer = userList.filter((userInfo: any) => {
          const updatedAt = new Date(userInfo.updatedAt);
          const userYearNum = updatedAt.toLocaleString("en-US", {
            year: "numeric",
          });

          return (
            userYearNum === yearNum &&
            updatedAt.toISOString() >= fiveYearsBack.toISOString() &&
            updatedAt.toISOString() < currentYear.toISOString() &&
            userInfo.role !== "Admin" &&
            userInfo.isRecurring === true &&
            userInfo.isRecurring !== undefined
          );
        }).length;

        const NewCustomer = userList.filter((userInfo: any) => {
          const updatedAt = new Date(userInfo.updatedAt);
          const userYearNum = updatedAt.toLocaleString("en-US", {
            year: "numeric",
          });

          return (
            userYearNum === yearNum &&
            updatedAt.toISOString() >= fiveYearsBack.toISOString() &&
            updatedAt.toISOString() < currentYear.toISOString() &&
            userInfo.role !== "Admin" &&
            userInfo.isRecurring === false &&
            userInfo.isRecurring !== undefined
          );
        }).length;

        return { name: yearNum, NewCustomer, RecurringCustomer };
      });

      setYearlyData(yearlyUserData);
    }

    if (graphType === "Monthly") {
      // Date set for today and last one year
      const currentMonth = new Date();
      const oldMonth = new Date(currentMonth);
      oldMonth.setFullYear(currentMonth.getFullYear() - 1);
      oldMonth.setMonth(currentMonth.getMonth() + 1);
      const oneYearAgoMonth = new Date(currentMonth);

      oneYearAgoMonth.setFullYear(currentMonth.getFullYear() - 1);
      oneYearAgoMonth.setMonth(currentMonth.getMonth() + 1);

      // Start from one year ago and iterate until the current date to store all months falling in between
      const monthsBetween: any = [];
      while (oneYearAgoMonth <= currentMonth) {
        const monthName = oneYearAgoMonth.toLocaleString("en-US", {
          month: "short",
          year: "numeric",
        });
        monthsBetween.push(monthName);
        oneYearAgoMonth.setMonth(oneYearAgoMonth.getMonth() + 1);
      }

      // Custom API trigger for Custom dates
      const customResult: any = await UserServices.getUserDataForDashboard(
        "Custom",
        oldMonth.toISOString(),
        currentMonth.toISOString(),
      );

      const userList: any = customResult.data;

      // Dividing data according to months
      const monthlyUserData = monthsBetween.map((monthName: string) => {
        const RecurringCustomer = userList.filter((userInfo: any) => {
          const updatedAt = new Date(userInfo.updatedAt);
          const userMonthName = updatedAt.toLocaleString("en-US", {
            month: "short",
            year: "numeric",
          });

          return (
            userMonthName === monthName &&
            updatedAt.toISOString() >= oldMonth.toISOString() &&
            updatedAt.toISOString() < currentMonth.toISOString() &&
            userInfo.role !== "Admin" &&
            userInfo.isRecurring === true &&
            userInfo.isRecurring !== undefined
          );
        }).length;

        const NewCustomer = userList.filter((userInfo: any) => {
          const updatedAt = new Date(userInfo.updatedAt);
          const userMonthName = updatedAt.toLocaleString("en-US", {
            month: "short",
            year: "numeric",
          });

          return (
            userMonthName === monthName &&
            updatedAt.toISOString() >= oldMonth.toISOString() &&
            updatedAt.toISOString() < currentMonth.toISOString() &&
            userInfo.role !== "Admin" &&
            userInfo.isRecurring === false &&
            userInfo.isRecurring !== undefined
          );
        }).length;

        return { name: monthName, NewCustomer, RecurringCustomer };
      });

      setMonthlyData(monthlyUserData);
    }

    if (graphType === "Weekly") {
      // Date set for today and last one year
      const currentDay = new Date();
      const sevenDaysBackDay = new Date(currentDay);
      sevenDaysBackDay.setDate(currentDay.getDate() - 6);

      const reccursiveDay = new Date(currentDay);
      reccursiveDay.setDate(currentDay.getDate() - 6);

      // Start from one week ago and iterate until the current date to store all days falling in between
      const daysBetween = [];
      while (reccursiveDay <= currentDay) {
        const dayName = reccursiveDay.toLocaleString("en-US", {
          weekday: "long",
        });
        daysBetween.push(dayName);
        reccursiveDay.setDate(reccursiveDay.getDate() + 1);
      }

      // Custom API trigger for Custom dates
      const customResult: any = await UserServices.getUserDataForDashboard(
        "Custom",
        sevenDaysBackDay.toISOString(),
        currentDay.toISOString(),
      );

      const userList = customResult.data;

      // Dividing data according to days
      const weeklyUserData = daysBetween.map((dayName) => {
        const RecurringCustomer = userList.filter((userInfo: any) => {
          const updatedAt = new Date(userInfo.updatedAt);
          const userDayName = updatedAt.toLocaleString("en-US", {
            weekday: "long",
          });

          return (
            userDayName === dayName &&
            updatedAt.toISOString() >= sevenDaysBackDay.toISOString() &&
            updatedAt.toISOString() < currentDay.toISOString() &&
            userInfo.role !== "Admin" &&
            userInfo.isRecurring === true &&
            userInfo.isRecurring !== undefined
          );
        }).length;

        const NewCustomer = userList.filter((userInfo: any) => {
          const updatedAt = new Date(userInfo.updatedAt);
          const userDayName = updatedAt.toLocaleString("en-US", {
            weekday: "long",
          });

          return (
            userDayName === dayName &&
            updatedAt.toISOString() >= sevenDaysBackDay.toISOString() &&
            updatedAt.toISOString() < currentDay.toISOString() &&
            userInfo.role !== "Admin" &&
            userInfo.isRecurring === false &&
            userInfo.isRecurring !== undefined
          );
        }).length;

        return { name: dayName, NewCustomer, RecurringCustomer };
      });

      setWeeklyData(weeklyUserData);
    }

    setApiLoading(false);
  }

  React.useEffect(() => {
    getCustomerDataForGraph();
    getLastSevenDaysCustomerData();
  }, []);

  React.useEffect(() => {
    getCustomerDataForGraph();
  }, [graphType]);

  return (
    <Box sx={{ height: "calc(100vh - 90px)" }}>
      {apiLoading && <LoaderGlobal />}
      <Box sx={{ display: "flex", gap: "24px", borderRadius: "10px" }}>
        <Box>
          <Box sx={{ display: "flex", flexDirection: "column", gap: "24px", height: "100%" }}>
            <Box sx={{ display: "flex", height: "100%" }}>
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
                  <Typography variant="h5" sx={{ color: "#008DF1", fontWeight: "600" }}>
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
                    <Typography variant="h2" sx={{ color: "#1F1F1F", fontWeight: "500" }}>
                      {lastSevenDaysNew}
                    </Typography>
                    <Typography variant="caption" sx={{ color: "#808080" }}>
                      Last 7 days
                    </Typography>
                  </Box>
                  <Image width={115} height={115} src={Deskbell} alt="Deskbell" />
                </Box>
              </Box>
            </Box>
            <Box sx={{ display: "flex", height: "100%" }}>
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
                  <Typography variant="h5" sx={{ color: "#F08200", fontWeight: "600" }}>
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
                    <Typography variant="h2" sx={{ color: "#1F1F1F", fontWeight: "500" }}>
                      {lastSevenDaysRecurring}
                    </Typography>
                    <Typography variant="caption" sx={{ color: "#808080" }}>
                      Last 7 days
                    </Typography>
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
            <Typography>Guest Infographic</Typography>
            <Select
              value={graphType}
              onChange={(e) => setGraphType(e.target.value)}
              sx={{
                border: "1px solid #9C9C9C",
                borderRadius: "4px",
                padding: "8px, 10px",
                color: "#008DF1",
                marginRight: "30px",
              }}
            >
              <MenuItem value="Weekly">Weekly</MenuItem>
              <MenuItem value="Monthly">Monthly</MenuItem>
              <MenuItem value="Yearly">Yearly</MenuItem>
            </Select>
          </Box>

          <ResponsiveContainer width="100%" height="85%">
            <LineChart
              data={
                graphType === "Monthly"
                  ? monthlyData
                  : graphType === "Yearly"
                    ? yearlyData
                    : graphType === "Weekly" && weeklyData
              }
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid stroke="#959595" vertical={false} />
              <XAxis
                dataKey="name"
                axisLine={false}
                tickFormatter={(word) => word.split(" ").join("\n")}
                tick={<CustomizedAxisTick />}
              />
              <YAxis
                axisLine={false}
                style={{
                  fill: "#959595",
                  textAlign: "center",
                  fontFamily: "Lato, sans-serif",
                  fontSize: "14px",
                  fontWeight: 600,
                }}
              />
              <Tooltip />
              <Legend verticalAlign="bottom" />
              <Line top={90} type="monotone" dataKey="NewCustomer" stroke="#008DF1" />
              <Line type="monotone" dataKey="RecurringCustomer" stroke="#F08200" />
            </LineChart>
          </ResponsiveContainer>
        </Box>
      </Box>
      {/* <Box sx={{ display: "flex", gap: "24px", marginTop: "24px" }}>
        <LatestUserAddedListing />
        <DashBoardConversation />
      </Box> */}
    </Box>
  );
};
const CustomizedAxisTick = (props: any) => {
  const { x, y, payload } = props;

  return (
    <g transform={`translate(${x},${y})`}>
      <text x={0} y={20} dy={16} textAnchor="middle" fill="#666" transform="rotate(-90deg)">
        {payload.value.split(" ").map((word: any, index: any) => (
          <tspan
            x={0}
            dy={index === 0 ? "0em" : "1.2em"}
            key={index}
            style={{
              fill: "#959595",
              textAlign: "center",
              fontFamily: "Lato, sans-serif",
              fontSize: "14px",
              fontStyle: "normal",
              fontWeight: 600,
            }}
          >
            {word}
          </tspan>
        ))}
      </text>
    </g>
  );
};

export default Dashboard;
