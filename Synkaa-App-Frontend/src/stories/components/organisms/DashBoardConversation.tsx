import theme from "../../../theme/theme";
import { Box, Card, Divider, Link, Typography } from "@mui/material";
import React from "react";

import CardContent from "@mui/material/CardContent";

export const DashBoardConversation = () => {
  return (
    <Box sx={{ borderRadius: "10px", backgroundColor: "white", flexBasis: "30%", p: "24px" }}>
      <Box sx={{ height: "100%" }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            backgroundColor: "#fff",
            alignItems: "start",
          }}
        >
          <Box>
            <Typography variant="h6" sx={{ fontWeight: "600" }}>
              {" "}
              Conversations{" "}
            </Typography>
            <Typography sx={{ color: "#808080" }} variant="caption">
              {" "}
              All conversations to go through.
            </Typography>
          </Box>
          <Link
            href="#"
            underline="none"
            sx={{
              padding: "16px 0",
              borderRadius: "8px",
              color: "#808080",
              fontWeight: 500,
              fontFamily: "Roboto",
            }}
          >
            View All
          </Link>
        </Box>
        <Divider />
        <Box sx={{ pt: "22px" }}>
          <Card
            sx={{
              boxShadow: "none",
              backgroundColor: "#F5FAFF",
              borderLeft: `4px solid ${theme.palette.primary.main}`,
              marginBottom: "4px",
              borderRadius: "0",
            }}
          >
            <CardContent>
              <Typography variant="subtitle1">Anna Jones</Typography>
              <Typography sx={{ color: "#808080" }} variant="caption">
                Lörem ipsum häpynat ogenat ipsum häpynat ogenat
              </Typography>
            </CardContent>
          </Card>

          <Card
            sx={{
              boxShadow: "none",
              backgroundColor: "#F5FAFF",
              borderLeft: `4px solid ${theme.palette.primary.main}`,
              marginBottom: "4px",
              borderRadius: "0",
            }}
          >
            <CardContent>
              <Typography variant="subtitle1">Anna Jones</Typography>
              <Typography sx={{ color: "#808080" }} variant="caption">
                Lörem ipsum häpynat ogenat ipsum häpynat ogenat
              </Typography>
            </CardContent>
          </Card>
          <Card
            sx={{
              boxShadow: "none",
              backgroundColor: "#F5FAFF",
              borderLeft: `4px solid ${theme.palette.primary.main}`,
              marginBottom: "4px",
              borderRadius: "0",
            }}
          >
            <CardContent>
              <Typography variant="subtitle1">Anna Jones</Typography>
              <Typography sx={{ color: "#808080" }} variant="caption">
                Lörem ipsum häpynat ogenat ipsum häpynat ogenat
              </Typography>
            </CardContent>
          </Card>
        </Box>
      </Box>
    </Box>
  );
};
