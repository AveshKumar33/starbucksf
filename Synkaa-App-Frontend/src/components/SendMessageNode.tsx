import { Box, Typography, Button, CircularProgress, TextField } from "@mui/material";
import { Handle, Position, useEdges, useNodeId, useNodes } from "reactflow";
import React, { useEffect, useState } from "react";
import sendMsg from "@/assets/images/sendMsg.svg";
import triggerMenu from "@/assets/images/triggerMenu.svg";
import Image from "next/image";
import "react-quill/dist/quill.snow.css";
import dynamic from "next/dynamic";
import addInteraction from "@/assets/images/addInteraction.svg";
import InteractionPopover from "./Intreactions";
import EmojiPicker, { EmojiClickData } from "emoji-picker-react";
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";
import addNewNode from "@/app/helpers/newNode";
import ContextMenu from "./contextMenuPopover";
import SvgIcon from "@mui/material/SvgIcon";

const ReactQuill = dynamic(() => import("react-quill"), {
  loading: () => (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "95vh",
        width: "100%",
      }}
    >
      <CircularProgress />
    </Box>
  ),
  ssr: false,
});

// import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

function SendMessageNode({ setNodes, setEdges, data }: any) {
  const node: any = useNodes();
  const nodeId: any = useNodeId();
  const edge: any = useEdges();
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const open = Boolean(anchorEl);
  // const nodeType: string = "sendMessageNode";
  const id = open ? "simple-popover" : undefined;
  const [anchorElMenu, setAnchorElMenu] = useState<HTMLButtonElement | null>(null);
  const openMenu = Boolean(anchorElMenu);
  const idMenu = openMenu ? "simple-popover" : undefined;
  const [editorText, setEditorText] = React.useState<string>(data.text || "");
  const [sourceHandleArray, setSourceHandleArray] = useState<any>(null);
  const [targetHandleArray, setTargetHandleArray] = useState<any>(null);

  const [showVariable, setShowVariable] = React.useState<boolean>(false);
  const [showUrlForm, setShowUrlForm] = React.useState<boolean>(false);
  const [urlName, setUrlName] = React.useState<string>(data.urlName || "");
  const [urlData, setUrlData] = React.useState<string>(data.urlData || "");
  const [isWithUrl, setIsWithUrl] = React.useState<boolean>(data.isWithUrl || false);
  const [reSave, setReSave] = React.useState<boolean>(false);
  const [errorLength, setErrorLength] = React.useState<boolean>(false);
  const [urlError, setUrlError] = React.useState<boolean>(false);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleImageClick = () => {
    setShowEmojiPicker(!showEmojiPicker);
  };
  function handleEmoji(emojiData: EmojiClickData) {
    const emoji = emojiData.emoji;
    if (editorText === "") {
      setEditorText(emoji);
      setShowEmojiPicker(false);
    } else {
      const previousData = editorText.slice(0, editorText.length - 4);
      const newData = `${previousData}${emoji}</p>`;
      setEditorText(newData);
      setShowEmojiPicker(false);
    }
  }

  const handleClickMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorElMenu(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorElMenu(null);
  };

  // Variable name added in quil editor
  const handleNameClick = () => {
    if (editorText === "" || editorText === "<p><br></p>") {
      setEditorText("@name");
      setShowVariable(false);
    } else {
      const previousData = editorText.slice(0, editorText.length - 4);
      const newData = `${previousData} @name</p>`;
      setEditorText(newData);
      setShowVariable(false);
    }
  };

  const modules = {
    toolbar: [["bold", "italic"]],
    clipboard: {
      matchVisual: false,
    },
  };

  function handleNodeText(content: string) {
    setEditorText(content);
    setShowEmojiPicker(false);
  }

  const attachUrl = () => {
    if (urlName.length > 50 || urlName.length < 1) {
      setErrorLength(true);
    } else if (urlData.length < 1) {
      setUrlError(true);
    } else {
      setErrorLength(false);
      setIsWithUrl(true);
      setShowUrlForm(false);
      handleUrlResave();
    }
  };

  const dettachUrl = () => {
    setUrlName("");
    setUrlData("");
    setShowUrlForm(false);
    setIsWithUrl(false);
    handleUrlResave();
  };

  const handleUrlResave = () => {
    setReSave(!reSave);
  };

  useEffect(() => {
    setNodes((prevNodes: any) =>
      prevNodes.map((node: any) => {
        if (node.id === nodeId) {
          return {
            ...node,
            data: {
              ...node.data,
              text: editorText,
              urlName,
              urlData,
              isWithUrl,
            },
          };
        }
        return node;
      }),
    );
  }, [editorText, isWithUrl, reSave]);

  useEffect(() => {
    const sourceHandles = edge.map((edge: any) => edge.sourceHandle);
    setSourceHandleArray(sourceHandles);
    const targetHandles = edge.map((edge: any) => edge.targetHandle);
    setTargetHandleArray(targetHandles);
  }, [edge]);
  function doValuesCoexist(id: any) {
    return sourceHandleArray?.includes(id);
  }
  function doTargetCoexist(id: any) {
    return targetHandleArray?.includes(id);
  }

  return (
    <>
      <Box
        sx={{
          width: "100%",
          maxWidth: "400px",
          height: "auto",
          bgcolor: "#fff",
          p: "20px",
          borderRadius: "8px",
        }}
      >
        {/* Input handle */}
        <Handle
          type="target"
          id={nodeId}
          position={Position.Left}
          isConnectable={!doTargetCoexist(nodeId)}
          style={{ background: "#01CBD5", width: "15px", height: "15px" }}
          onConnect={(params: any) => console.log("handle onConnect target", params)}
        />
        <Box
          display="flex"
          gap="16px"
          alignItems="center"
          borderBottom="1px solid #DADADA"
          py="12px"
          mb="12px"
          justifyContent="space-between"
        >
          <Image width={24} height={24} src={sendMsg} alt="sendMsg" />
          <Box display="flex" flexDirection="column" gap="4px">
            <Typography sx={{ color: "#1F1F1F", fontSize: "16px", fontWeight: "500" }}>
              Send Message
            </Typography>
            <Typography sx={{ color: "#707070", fontSize: "14px", fontWeight: "400" }}>
              Type your message!
            </Typography>
          </Box>
          <Box>
            <Button
              aria-describedby={idMenu}
              onClick={handleClickMenu}
              sx={{
                ml: "auto",
                "&:hover": {
                  backgroundColor: "transparent",
                },
              }}
            >
              <Image width={36} height={36} src={triggerMenu} alt="triggerMenu" />
            </Button>
            <Button
              disabled={doValuesCoexist(nodeId)}
              aria-describedby={id}
              onClick={handleClick}
              sx={{
                ml: "auto",
                "&:hover": {
                  backgroundColor: "transparent",
                },
              }}
            >
              <Image width={36} height={36} src={addInteraction} alt="addInteraction" />
            </Button>
          </Box>
        </Box>
        <Box sx={{ cursor: "text", position: "relative" }} className="nodrag text_editor_node">
          <ReactQuill
            value={editorText}
            onChange={handleNodeText}
            placeholder="Enter message"
            modules={modules}
          />

          <EmojiEmotionsIcon
            onClick={handleImageClick}
            sx={{
              marginLeft: "4px",
              color: "#008DF1",
              cursor: "pointer",
              position: "absolute",
              top: "10px",
              left: "20%",
            }}
          />
          <Box
            sx={{
              position: "absolute",
              top: "7px",
              right: "10px",
              display: "flex",
            }}
          >
            <Box
              sx={{
                bgcolor: "#C9E9FF",
                px: "10px",
                py: "4px",
                borderRadius: "25px",
                "&:hover": {
                  backgroundColor: "#C9E9FF",
                },
                marginLeft: "4px",
                cursor: "pointer",
              }}
              onClick={() => {
                setShowVariable(!showVariable);
                setShowUrlForm(false);
              }}
            >
              <Typography sx={{ color: "#008DF1", fontSize: "14px", fontWeight: "500" }}>
                Variable
              </Typography>
            </Box>
            <Box
              sx={{
                bgcolor: "#C9E9FF",
                px: "10px",
                py: "4px",
                borderRadius: "25px",
                "&:hover": {
                  backgroundColor: "#C9E9FF",
                },
                marginLeft: "4px",
                cursor: "pointer",
              }}
              onClick={() => {
                setShowUrlForm(!showUrlForm);
                setErrorLength(false);
                setUrlError(false);
                setShowVariable(false);
                setUrlName(data.urlName);
                setUrlData(data.urlData);
                setIsWithUrl(data.isWithUrl);
              }}
            >
              <Typography sx={{ color: "#008DF1", fontSize: "14px", fontWeight: "500" }}>
                URL
              </Typography>
            </Box>
          </Box>
          {showVariable && (
            <Box
              sx={{
                position: "absolute",
                width: "150px",
                top: "50px",
                left: "50%",
                backgroundColor: "#FFFFFF",
                padding: "8px",
                gap: "4px",
                borderRadius: "8px",
                border: "1px solid rgba(0, 0, 0, 0.10)",
                display: "flex",
                justifyContent: "center",
                flexDirection: "column",
              }}
            >
              <Typography
                sx={{
                  color: "#5E5E5E",
                  fontSize: "16px",
                  fontWeight: 400,
                  px: "16px",
                  py: "8px",
                }}
              >
                Lead Data
              </Typography>
              <Box
                sx={{
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "flex-start",
                  px: "16px",
                  py: "8px",
                  gap: "10px",
                }}
                onClick={handleNameClick}
              >
                <SvgIcon
                  component={() => (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                    >
                      <circle cx="12" cy="12" r="12" fill="#8700F0" />
                      <text
                        x="7"
                        y="16"
                        style={{ fill: "#FFFFFF", fontFamily: "Arial", fontSize: "12px" }}
                      >
                        S
                      </text>
                    </svg>
                  )}
                />

                <Typography
                  sx={{
                    fontSize: "14px",
                    fontWeight: "500",
                  }}
                >
                  Name
                </Typography>
              </Box>
            </Box>
          )}
          {showUrlForm && (
            <Box
              sx={{
                position: "absolute",
                width: "150px",
                top: "50px",
                left: "75%",
                backgroundColor: "#FFFFFF",
                padding: "8px",
                gap: "12px",
                borderRadius: "8px",
                border: "1px solid rgba(0, 0, 0, 0.10)",
                display: "flex",
                justifyContent: "center",
                flexDirection: "column",
                zIndex: 2,
              }}
            >
              <Box sx={{ display: "flex", flexDirection: "column" }}>
                <Typography
                  sx={{
                    fontSize: "14px",
                    fontWeight: "500",
                  }}
                >
                  Title
                </Typography>
                <TextField
                  autoComplete="off"
                  sx={{
                    marginRight: "1rem",
                    flex: 1,
                    minWidth: "100px",
                    borderRadius: "8px",
                    border: errorLength ? "3px solid red" : "",
                  }}
                  value={urlName}
                  onChange={(e) => {
                    setUrlName(e.target.value);
                    setErrorLength(false);
                  }}
                />
                <Typography sx={{ color: "grey", fontWeight: 400, fontSize: "12px" }}>
                  Max characters: 50
                </Typography>
              </Box>
              <Box sx={{ display: "flex", flexDirection: "column" }}>
                <Typography
                  sx={{
                    fontSize: "14px",
                    fontWeight: "500",
                  }}
                >
                  URL
                </Typography>
                <TextField
                  autoComplete="off"
                  sx={{
                    marginRight: "1rem",
                    flex: 1,
                    minWidth: "100px",
                    borderRadius: "8px",
                    border: urlError ? "3px solid red" : "",
                  }}
                  value={urlData}
                  onChange={(e) => {
                    setUrlData(e.target.value);
                    setUrlError(false);
                  }}
                />
              </Box>
              <Box sx={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                <Button
                  sx={{
                    cursor: "pointer",
                    color: "white",
                    backgroundColor: "#008DF1",
                    "&:hover": {
                      color: "white",
                      backgroundColor: "#008DF1",
                    },
                  }}
                  onClick={attachUrl}
                >
                  {isWithUrl ? "Update" : "Add"}
                </Button>
                <Button
                  sx={{
                    cursor: "pointer",
                    backgroundColor: "#c90404",
                    color: "white",
                    "&:hover": {
                      backgroundColor: "#c90404",
                      color: "white",
                    },
                  }}
                  onClick={dettachUrl}
                >
                  Remove
                </Button>
              </Box>
            </Box>
          )}
          {showEmojiPicker && (
            <Box sx={{ bottom: "40px", right: "0" }}>
              <EmojiPicker onEmojiClick={handleEmoji} />
            </Box>
          )}
        </Box>
        {/* Output handle */}
        <Handle
          type="source"
          id={nodeId}
          position={Position.Right}
          style={{ background: "#01CBD5", width: "15px", height: "15px" }}
          isConnectable={!doValuesCoexist(nodeId)}
          onConnect={(params: any) => console.log("handle onConnect source", params)}
        />
        {isWithUrl && (
          <Box
            sx={{
              backgroundColor: "#C9E9FF",
              borderRadius: "8px",
              border: "1px solid rgba(0, 0, 0, 0.10)",
              marginTop: "12px",
              padding: "8px",
              display: "flex",
              justifyContent: "flex-start",
              flexDirection: "column",
              maxWidth: "400px",
              overflow: "auto", // Add overflow property
            }}
          >
            <Box sx={{ display: "flex", justifyContent: "flex-start", gap: "8px" }}>
              <Typography sx={{ fontSize: "14px", fotWeight: "700", color: "#008DF1" }}>
                Title:
              </Typography>
              <Typography sx={{ fontSize: "14px", fotWeight: "700", color: "#008DF1" }}>
                {urlName}
              </Typography>
            </Box>
            <Box sx={{ display: "flex", justifyContent: "flex-start", gap: "8px" }}>
              <Typography sx={{ fontSize: "14px", fotWeight: "700", color: "#008DF1" }}>
                URL:
              </Typography>
              <Typography sx={{ fontSize: "14px", fotWeight: "700", color: "#008DF1" }}>
                {urlData}
              </Typography>
            </Box>
          </Box>
        )}
      </Box>

      <InteractionPopover
        setAnchorEl={setAnchorEl}
        anchorEl={anchorEl}
        addNewNode={addNewNode}
        currentNodeId={nodeId}
        setEdges={setEdges}
        setNodes={setNodes}
        handleClose={handleClose}
        node={node}
        activeHandle={nodeId}
      />

      <ContextMenu
        anchorElMenu={anchorElMenu}
        handleCloseMenu={handleCloseMenu}
        data={data.hasOutgoingConnection}
      />
    </>
  );
}

export default SendMessageNode;
