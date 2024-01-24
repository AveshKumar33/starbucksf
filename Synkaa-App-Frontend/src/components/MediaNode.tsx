import { Box, Typography, Button } from "@mui/material";
import { Handle, Position, useEdges, useNodeId, useNodes } from "reactflow";
import React, { useEffect, useState } from "react";
import mediaIcon from "@/assets/images/mediaIcon.png";
import triggerMenu from "@/assets/images/triggerMenu.svg";
import Image from "next/image";
import addInteraction from "@/assets/images/addInteraction.svg";
import InteractionPopover from "./Intreactions";
import addNewNode from "@/app/helpers/newNode";
import ContextMenu from "./contextMenuPopover";
import downloadIcon from "@/assets/images/download.png";
import UploadMediaPopup from "./UploadMediaPopup";

function MediaMessageNode({ setNodes, setEdges, data }: any) {
  const node: any = useNodes();
  const nodeId: any = useNodeId();
  const edge: any = useEdges();
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;
  const [anchorElMenu, setAnchorElMenu] = useState<HTMLButtonElement | null>(null);
  const openMenu = Boolean(anchorElMenu);
  const idMenu = openMenu ? "simple-popover" : undefined;
  const [openMediaPopup, setOpenMediaPopup] = useState<boolean>(false);
  const [imageName, setImageName] = React.useState<string | null>(null);
  const [imageBase64, setImageBase64] = React.useState<string | null>(null);
  const [sourceHandleArray, setSourceHandleArray] = useState<any>(null);
  const [targetHandleArray, setTargetHandleArray] = useState<any>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleClickMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorElMenu(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorElMenu(null);
  };

  //Opening modal for uploading image
  const handleMediaClick = () => {
    setOpenMediaPopup(true);
  };

  const handleCloseModal = () => {
    setOpenMediaPopup(false);
  };

  const uploadLocalImage = () => {
    setNodes((prevNodes: any) =>
      prevNodes.map((node: any) => {
        if (node.id === nodeId) {
          return { ...node, data: { ...node.data, imageBase64, imageName, text: "image" } };
        }
        return node;
      }),
    );
    handleCloseModal();
  };

  const uploadUriImage = (imageBase64: string, imageName: string) => {
    setNodes((prevNodes: any) =>
      prevNodes.map((node: any) => {
        if (node.id === nodeId) {
          return {
            ...node,
            data: { ...node.data, imageBase64, imageName, text: "image" },
          };
        }
        return node;
      }),
    );
    handleCloseModal();
  };
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
          overflow: "hidden",
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
          // gap="16px"
          alignItems="center"
          borderBottom="1px solid #DADADA"
          py="12px"
          mb="12px"
          justifyContent="space-between"
        >
          <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Box sx={{ mr: "16px" }}>
              <Image width={24} height={24} src={mediaIcon} alt="attach photo" />
            </Box>
            <Box display="flex" flexDirection="column" gap="4px">
              <Typography sx={{ color: "#1F1F1F", fontSize: "16px", fontWeight: "700" }}>
                Media
              </Typography>
              <Typography sx={{ color: "#707070", fontSize: "14px", fontWeight: "400" }}>
                Add an image
              </Typography>
            </Box>
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
        {data.imageBase64 ? (
          <Box
            onClick={handleMediaClick}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "132px",
              maxHeight: "300px",
              borderRadius: "4px",
              background: "var(--Background, #F0F6FE)",
              flexDirection: "column",
              textAlign: "center",
              position: "relative",
            }}
          >
            <img
              style={{
                width: "100%",
                height: "100%",
                objectFit: "contain",
              }}
              src={data.imageBase64}
              alt={data.imageName}
            />
          </Box>
        ) : (
          <Box
            onClick={handleMediaClick}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "132px",
              maxHeight: "300px",
              borderRadius: "4px",
              background: "var(--Background, #F0F6FE)",
              flexDirection: "column",
              textAlign: "center",
            }}
          >
            <Image width={36} height={36} src={downloadIcon} alt="Download Media" />
            <Typography
              sx={{
                color: "var(--Secondary-color, #008DF1)",
                fontFamily: "Roboto",
                fontSize: "17px",
                fontStyle: "normal",
                fontWeight: 500,
                lineHeight: "22px",
                letterSpacing: "0.5px",
              }}
            >
              Upload
            </Typography>
          </Box>
        )}

        {/* Output handle */}
        <Handle
          type="source"
          id={nodeId}
          position={Position.Right}
          style={{ background: "#01CBD5", width: "15px", height: "15px" }}
          isConnectable={!doValuesCoexist(nodeId)}
          onConnect={(params: any) => console.log("handle onConnect source", params)}
        />
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
        // nodeType={nodeType}
      />
      <ContextMenu anchorElMenu={anchorElMenu} handleCloseMenu={handleCloseMenu} />
      {openMediaPopup && (
        <UploadMediaPopup
          openModal={openMediaPopup}
          closeModal={handleCloseModal}
          imageName={imageName}
          setImageName={setImageName}
          imageBase64={imageBase64}
          setImageBase64={setImageBase64}
          uploadLocalImage={uploadLocalImage}
          uploadUriImage={uploadUriImage}
        />
      )}
    </>
  );
}

export default MediaMessageNode;
