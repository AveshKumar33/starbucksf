import { Box, Button, Popover, TextField, Typography } from "@mui/material";

function SettingsPopover({ id, open, anchorEl, setAnchorEl }: any) {
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <Popover
      id={id}
      open={open}
      anchorEl={anchorEl}
      onClose={handleClose}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "left",
      }}
    >
      <Box sx={{ p: "24px" }}>
        <Typography sx={{ fontSize: "24px", fontWeight: "500", color: "#1F1F1F" }}>
          Settings
        </Typography>
        <Box
          sx={{
            mt: "24px",
            display: "flex",
            gap: "16px",
            flexDirection: "column",
            borderBottom: "1px solid #E8E8E8",
            pb: "36px",
          }}
        >
          <Typography sx={{ fontSize: "16px", fontWeight: "500", color: "#1F1F1F" }}>
            Chatbot Name
          </Typography>
          <TextField
            autoComplete="off"
            sx={{ borderRadius: "4px", border: "1px solid #D1D1D1" }}
            id="outlined-basic"
            label="Guest Welcoming Bot"
            variant="outlined"
            disabled
          />
        </Box>
        <Box
          sx={{
            mt: "45px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: "20px",
            borderBottom: "1px solid #E8E8E8",
            pb: "30px",
          }}
        >
          <Typography sx={{ fontSize: "16px", fontWeight: "500", color: "#1F1F1F" }}>
            Disable Chatbot
          </Typography>
          <Box>
            <Button
              sx={{
                bgcolor: "#008DF1",
                color: "#fff",
                borderTopRightRadius: "0px",
                borderBottomRightRadius: "0px",
                "&:hover": {
                  bgcolor: "#008DF1",
                },
              }}
            >
              <Typography sx={{ fontSize: "14px", fontWeight: "500", color: "#fff" }}>
                Active
              </Typography>
            </Button>
            <Button
              sx={{
                border: "1px solid #D1D1D1",
                borderTopLeftRadius: "0px",
                borderBottomLeftRadius: "0px",
                "&:hover": {
                  bgcolor: "#fff",
                },
              }}
            >
              <Typography sx={{ fontSize: "14px", fontWeight: "500", color: "#707070" }}>
                Disabled
              </Typography>
            </Button>
          </Box>
        </Box>
        <Box
          sx={{
            mt: "20px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: "20px",
          }}
        >
          <Typography sx={{ fontSize: "16px", fontWeight: "500", color: "#1F1F1F" }}>
            Delete Chatbot
          </Typography>
          <Button
            sx={{
              border: "1px solid #FF5858",
              "&:hover": {
                bgcolor: "#fff",
              },
            }}
          >
            <Typography sx={{ fontSize: "14px", fontWeight: "500", color: "#FF5858" }}>
              Delete
            </Typography>
          </Button>
        </Box>
        <Button
          sx={{
            bgcolor: "#008DF1",
            color: "#fff",
            width: "100%",
            mt: "23px",
            borderRadius: "8px",
            "&:hover": {
              bgcolor: "#008DF1",
            },
          }}
        >
          <Typography sx={{ fontSize: "14px", fontWeight: "500", color: "#fff" }}>
            Apply Changes
          </Typography>
        </Button>
      </Box>
    </Popover>
  );
}
export default SettingsPopover;
