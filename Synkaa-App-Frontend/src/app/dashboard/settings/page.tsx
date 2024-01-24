"use client";
import { Box, CircularProgress, Tab, Tabs /*, Typography*/ } from "@mui/material";
import React from "react";
import { AccountCircle, Smartphone, LocalOffer } from "@mui/icons-material";
import Managetags from "@/components/Managetags";
import ModifyLanding from "@/components/ModifyLanding";
import LandingServices from "@/services/landing.services";
import LoaderGlobal from "@/components/LoaderGlobal";
import Manageprofile from "@/components/Manageprofile";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

interface GetLandingPageType {
  _id: string;
  uuid: string;
  companyLogo: string;
  resturantName: string;
  header: string;
  backgroundImage: string;
  termCondition: string;
  createdAt: string;
  updatedAt: string;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ pl: 3 }}>{children}</Box>}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  };
}

const SettingLandingModify: React.FC = () => {
  const [value, setValue] = React.useState(0);
  const [newLanding, setNewLanding] = React.useState<GetLandingPageType | null>(null);
  const [loading, setLoading] = React.useState<boolean>(true);
  const [apiLoading, setApiLoading] = React.useState<boolean>(false);

  const getAll = async () => {
    setApiLoading(true);
    try {
      const result = await LandingServices.getLanding();
      if (result.success) {
        // console.log(result);
        setNewLanding(result.data[0]);
      }
      setLoading(false);
    } catch (error) {
      setNewLanding(null);
      setLoading(false);
    }
    setApiLoading(false);
  };

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  React.useEffect(() => {
    getAll();
  }, []);

  React.useEffect(() => {
    return () => {
      setLoading(true);
    };
  }, []);

  return (
    <Box
      className="custom_tab"
      sx={{ bgcolor: "#F0F6FE;", display: "flex", height: "calc(100vh - 110px)" }}
    >
      {apiLoading && <LoaderGlobal />}
      <Box
        sx={{
          width: "324px",
          background: "white",
          borderRadius: "12px",

          padding: "24px",
          position: "sticky",
          top: "92px",
        }}
      >
        <Tabs
          orientation="vertical"
          variant="scrollable"
          value={value}
          onChange={handleChange}
          aria-label="Vertical tabs example"
        >
          <Tab
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "flex-start",
              fontSize: "16px",
              minHeight: "40px",
              color: "#1F1F1F",
              textTransform: "capitalize",
            }}
            icon={<AccountCircle sx={{ paddingRight: "8px", height: "24px", width: "24px" }} />}
            label="Manage Profile"
            {...a11yProps(0)}
          />
          <Tab
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "flex-start",
              fontSize: "16px",
              minHeight: "40px",
              color: "#1F1F1F",
              textTransform: "capitalize",
            }}
            icon={<Smartphone sx={{ paddingRight: "8px", height: "24px", width: "24px" }} />}
            label="Landing Page"
            {...a11yProps(1)}
          />
          <Tab
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "flex-start",
              fontSize: "16px",
              minHeight: "40px",
              color: "#1F1F1F",
              textTransform: "capitalize",
            }}
            icon={<LocalOffer sx={{ paddingRight: "8px", height: "24px", width: "24px" }} />}
            label="Manage Tags"
            {...a11yProps(2)}
          />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <Box
          sx={{
            width: "100%",
            background: "white",
            borderRadius: "12px",
            height: "calc(100vh - 110px)",
            padding: "28px",
          }}
        >
          {/* <Typography variant="h6" sx={{ fontWeight: "700" }}>
            Developing on progress t...
          </Typography> */}
          {loading ? (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100vh",
              }}
            >
              <CircularProgress />
            </Box>
          ) : (
            <Manageprofile />
          )}
        </Box>
      </TabPanel>
      <TabPanel value={value} index={1}>
        {loading ? (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <CircularProgress />
          </Box>
        ) : (
          <>
            <ModifyLanding
              resturantName={newLanding ? newLanding.resturantName : ""}
              header={newLanding ? newLanding.header : ""}
              lastUpdated={newLanding ? newLanding.updatedAt : ""}
            />
          </>
        )}
      </TabPanel>
      <TabPanel value={value} index={2}>
        <Managetags />
      </TabPanel>
    </Box>
  );
};

export default SettingLandingModify;
