import { Popover, Box, Typography, TextField, InputAdornment, Button } from "@mui/material";
import Image from "next/image";
import SearchIcon from "@mui/icons-material/Search";
import condition from "@/assets/images/condition.svg";
import delay from "@/assets/images/delay.svg";
import sendMsg from "@/assets/images/sendMsg.svg";
import listTrigger from "@/assets/images/listTrigger.svg";
import addMedia from "@/assets/images/addMedia.svg";
import React from "react";
import { useReactFlow, useNodes } from "reactflow";

function InteractionPopover({
  anchorEl,
  addNewNode,
  handleClose,
  setNodes,
  setEdges,
  currentNodeId,
  activeHandle,
}: any) {
  const nodes = useNodes();
  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;
  const { getNode } = useReactFlow();
  const currentNode: any = getNode(currentNodeId);

  const [searchInput, setSearchInput] = React.useState<string>("");

  const [allOptions] = React.useState([
    {
      title: "Conditions",
      subtitle: "Split your flows",
      parameter: "conditionalNode",
      img_src: condition,
      img_alt: "Condition Trigger",
    },
    {
      title: "Delays",
      subtitle: " Trigger delay between messages",
      parameter: "delayTimeNode",
      img_src: delay,
      img_alt: "Delay Trigger",
    },
    {
      title: "Send Message",
      subtitle: "Type your message!",
      parameter: "sendMessageNode",
      img_src: sendMsg,
      img_alt: "Send Message Trigger",
    },
    {
      title: "List Button",
      subtitle: "Single choice menu",
      parameter: "listButtonNode",
      img_src: listTrigger,
      img_alt: "List Trigger",
    },
    {
      title: "Media",
      subtitle: "Add images",
      parameter: "mediaMessageNode",
      img_src: addMedia,
      img_alt: "Media Trigger",
    },
  ]);

  const filteredOptions = React.useMemo(() => {
    if (searchInput) {
      return allOptions.filter((option) =>
        option.title.toLowerCase().includes(searchInput.toLowerCase()),
      );
    }

    return allOptions;
  }, [allOptions, searchInput]);

  const closeMenu = () => {
    handleClose();
    setSearchInput("");
  };

  const handleAddNewNode = (type: string) => {
    closeMenu();
    addNewNode(setNodes, setEdges, currentNodeId, currentNode, null, activeHandle, type, nodes);
  };

  return (
    <Popover
      sx={{ marginLeft: "20px", marginBottom: "80px", borderRadius: "8px" }}
      id={id}
      open={open}
      anchorEl={anchorEl}
      onClose={closeMenu}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
    >
      <Box sx={{ bgcolor: "#F4FAFF", p: "16px", borderRadius: "8px" }}>
        <Box>
          <Typography sx={{ color: "#1F1F1F", fontSize: "16px", fontWeight: "500", mb: "8px" }}>
            Type to Search
          </Typography>
          <TextField
            placeholder="Search"
            sx={{ bgcolor: "#fff" }}
            variant="outlined"
            fullWidth
            onChange={(e) => setSearchInput((e.target as HTMLInputElement).value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
          <Box sx={{ mt: "16px" }}>
            {filteredOptions.map((row, index) => (
              <Button
                key={index}
                onClick={() => handleAddNewNode(row.parameter)}
                sx={{
                  width: "100%",
                  display: "flex",
                  gap: "16px",
                  alignItems: "center",
                  borderBottom: "1px solid #DADADA",
                  justifyContent: "flex-start",
                  p: "0",
                  py: "12px",
                }}
              >
                <Image width={24} height={24} src={row.img_src} alt={row.img_alt} />
                <Box display="flex" flexDirection="column" gap="4px">
                  <Typography
                    sx={{
                      color: "#1F1F1F",
                      fontSize: "16px",
                      fontWeight: "500",
                      textAlign: "left",
                    }}
                  >
                    {row.title}
                  </Typography>
                  <Typography sx={{ color: "#707070", fontSize: "14px", fontWeight: "400" }}>
                    {row.subtitle}
                  </Typography>
                </Box>
              </Button>
            ))}
          </Box>
        </Box>
      </Box>
    </Popover>
  );
}

export default InteractionPopover;
