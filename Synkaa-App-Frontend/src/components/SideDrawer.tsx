import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Typography,
} from "@mui/material";
import Drawer from "@mui/material/Drawer";
import React, { useState } from "react";
import delayTime from "@/assets/images/delayTime.svg";
import delay from "@/assets/images/delay.svg";
import close from "@/assets/images/close.svg";
import Image from "next/image";
// import { TextFieldWithoutLabel } from "@/theme/materialComponents/TextField";

type Anchor = "left" | "top" | "bottom";

interface TriggerDrawerProps {
  // days: string | null;
  // setDays: any;
  // hours: string | null;
  // setHours: any;
  // minutes: string | null;
  // setMinutes: any;
  delayTimeData: string | null;
  setDelayTimeData: any;
  addDelayTime: () => void;
  data: any;
}

export default function TriggerDrawer({
  // days,
  // setDays,
  // hours,
  // setHours,
  // minutes,
  // setMinutes,
  delayTimeData,
  setDelayTimeData,
  addDelayTime,
  data,
}: TriggerDrawerProps) {
  const [drawerOpen, setDrawerOpen] = useState({ left: false });

  const toggleDrawer =
    (anchor: Anchor, open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === "keydown" &&
        ((event as React.KeyboardEvent).key === "Tab" ||
          (event as React.KeyboardEvent).key === "Shift")
      ) {
        return;
      }

      setDrawerOpen({ ...drawerOpen, [anchor]: open });
    };

  const addDelay = () => {
    addDelayTime();
    setDrawerOpen({ left: false });
  };

  const handleChange = (event: SelectChangeEvent) => {
    setDelayTimeData(event.target.value as string);
  };

  const cancelDelay = () => {
    // {
    //   data.days ? setDays(data.days) : setDays(null);
    // }
    // {
    //   data.hours ? setHours(data.hours) : setHours(null);
    // }
    // {
    //   data.minutes ? setMinutes(data.minutes) : setMinutes(null);
    // }
    {
      data.text ? setDelayTimeData(data.text) : setDelayTimeData(null);
    }
    setDrawerOpen({ left: false });
  };

  // console.log("drawerOpen", drawerOpen);
  const list = (anchor: Anchor) => (
    <Box
      sx={{
        width: anchor === "top" || anchor === "bottom" ? "auto" : 350,
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "flex-start",
        height: "100%",
      }}
      role="presentation"
    >
      <Box sx={{ width: "100%", flex: "1" }}>
        <Box
          sx={{
            display: "flex",
            width: "100%",
            justifyContent: "space-between",
            alignItems: "center",
            bgcolor: "#ffffff",
            px: "16px",
            pt: "8px",
            pb: "24px",
            borderRadius: "8px",
            borderBottom: "1px solid #DADADA",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              gap: "16px",
            }}
          >
            <Image width={24} height={24} src={delay} alt="delay" />
            <Box display="flex" flexDirection="column" gap="4px">
              <Typography
                sx={{ color: "#1F1F1F", fontSize: "16px", fontWeight: "500", textAlign: "left" }}
              >
                Delays
              </Typography>
              <Typography sx={{ color: "#707070", fontSize: "14px", fontWeight: "400" }}>
                Trigger delay between messages
              </Typography>
            </Box>
          </Box>
          <Button onClick={cancelDelay} sx={{ minWidth: "auto", p: "0px" }}>
            <Image width={24} height={24} src={close} alt="close" />
          </Button>
        </Box>
        {/* <Box sx={{ display: "flex", flexDirection: "column", px: "24px", py: "18px", gap: "16px" }}>
          <Typography
            sx={{ color: "#1F1F1F", fontSize: "17px", fontFamily: "Roboto", fontWeight: 500 }}
          >
            Days
          </Typography>
          <TextFieldWithoutLabel
            value={days}
            onChange={(e) => setDays(e.target.value)}
            placeholder="Enter days"
            inputProps={{
              type: "text",
              style: { height: "43px" },
              onInput: (e: any) => {
                e.target.value = e.target.value.replace(/[^0-9]/g, ""); // Remove non-numeric characters
              },
            }}
          />
          <Typography
            sx={{ color: "#1F1F1F", fontSize: "17px", fontFamily: "Roboto", fontWeight: 500 }}
          >
            Hours
          </Typography>
          <TextFieldWithoutLabel
            value={hours}
            onChange={(e) => setHours(e.target.value)}
            placeholder="Enter hours"
            inputProps={{
              type: "text",
              style: { height: "43px" },
              onInput: (e: any) => {
                e.target.value = e.target.value.replace(/[^0-9]/g, ""); // Remove non-numeric characters
              },
            }}
          />
          <Typography
            sx={{ color: "#1F1F1F", fontSize: "17px", fontFamily: "Roboto", fontWeight: 500 }}
          >
            Minutes
          </Typography>
          <TextFieldWithoutLabel
            value={minutes}
            onChange={(e) => setMinutes(e.target.value)}
            placeholder="Enter minutes"
            inputProps={{
              type: "text",
              style: { height: "43px" },
              onInput: (e: any) => {
                e.target.value = e.target.value.replace(/[^0-9]/g, ""); // Remove non-numeric characters
              },
            }}
          />
        </Box> */}
        <Box sx={{ px: "24px" }}>
          <Typography
            sx={{
              color: "#1F1F1F",
              fontSize: "16px",
              fontWeight: "500",
              lineHeight: "22px",
              my: "16px",
            }}
          >
            Select delay time
          </Typography>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">
              <Typography
                sx={{ color: "#1F1F1F", fontSize: "16px", fontWeight: "400", lineHeight: "22px" }}
              >
                Select Time
              </Typography>
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={delayTimeData !== "0" ? delayTimeData : data.text || ""}
              label="Select Time"
              onChange={handleChange}
              sx={{ display: "flex", justifyContent: "center", alignItems: "flex-start" }}
            >
              <MenuItem value={1}>1 min</MenuItem>
              <MenuItem value={5}>5 mins</MenuItem>
              <MenuItem value={15}>15 mins</MenuItem>
              <MenuItem value={30}>30 mins</MenuItem>
              <MenuItem value={60}>1hr</MenuItem>
              <MenuItem value={120}>2hr</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </Box>
      <Box
        sx={{
          bgcolor: "#CCD3D9",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "16px",
          width: "100%",
          py: "25px",
          borderRadius: "4px",
        }}
      >
        <Typography
          sx={{ color: "#1F1F1F", fontSize: "16px", fontWeight: "400", lineHeight: "22px" }}
        >
          Apply changes?
        </Typography>
        <Box sx={{ display: "flex", gap: "4px" }}>
          <Button
            sx={{ border: "2px solid #707070", borderRadius: "4px", padding: "5px 20px" }}
            onClick={cancelDelay}
          >
            <Typography
              sx={{ color: "#1F1F1F", fontSize: "16px", fontWeight: "400", lineHeight: "22px" }}
            >
              Cancel
            </Typography>
          </Button>
          <Button
            onClick={addDelay}
            sx={{
              bgcolor: "#008DF1",
              padding: "7px 25px",
              "&:hover": {
                backgroundColor: "#008DF1",
              },
            }}
          >
            <Typography
              sx={{ color: "#ffffff", fontSize: "16px", fontWeight: "400", lineHeight: "22px" }}
            >
              Apply
            </Typography>
          </Button>
        </Box>
      </Box>
    </Box>
  );
  return (
    <>
      {(["left"] as const).map((anchor) => (
        <React.Fragment key={anchor}>
          <Button
            className="nodrag"
            onClick={toggleDrawer(anchor, true)}
            sx={{
              display: "flex",
              width: "100%",
              maxWidth: "350px",
              justifyContent: "space-between",
              alignItems: "center",
              bgcolor: "#F0F6FE",
              px: "16px",
              py: "8px",
              borderRadius: "8px",
              "&:hover": {
                backgroundColor: "#F0F6FE",
              },
            }}
          >
            <Box display="flex" flexDirection="column" gap="4px">
              <Typography
                sx={{ color: "#1F1F1F", fontSize: "16px", fontWeight: "500", textAlign: "left" }}
              >
                Delay
              </Typography>
              <Typography sx={{ color: "#707070", fontSize: "14px", fontWeight: "400" }}>
                {delayTimeData ? delayTimeData : <>{data.text ? data.text : "0"}</>} mins from the
                last message
              </Typography>
              {/* <Typography
                sx={{
                  color: "#707070",
                  fontSize: "14px",
                  fontWeight: "400",
                  textAlign: "left",
                }}
              >
                {(days && days !== "0") ||
                (hours && hours !== "0") ||
                (minutes && minutes !== "0") ? (
                  <>{`${days || 0} days ${hours || 0} hours ${
                    minutes || 0
                  } minutes from the last message`}</>
                ) : (
                  <>Click me to add delay</>
                )}
              </Typography> */}
            </Box>
            <Image width={24} height={24} src={delayTime} alt="delayTime" />
          </Button>
          <Drawer anchor={anchor} open={drawerOpen[anchor]} onClose={cancelDelay}>
            {list(anchor)}
          </Drawer>
        </React.Fragment>
      ))}
    </>
  );
}
