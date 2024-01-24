import { Box, Typography, Button } from "@mui/material";
import { Handle, Position, useNodes, useNodeId, useEdges } from "reactflow";
import React, { useEffect, useState } from "react";
import delay from "@/assets/images/delay.svg";
// import delayTime from "../../../../src/assets/images/delayTime.svg";
import triggerMenu from "@/assets/images/triggerMenu.svg";
import Image from "next/image";
import addInteraction from "@/assets/images/addInteraction.svg";
import InteractionPopover from "./Intreactions";
import addNewNode from "@/app/helpers/newNode";
import ContextMenu from "./contextMenuPopover";
import TriggerDrawer from "./SideDrawer";

function DelayTimeNode({ setNodes, setEdges, data }: any) {
  const node: any = useNodes();
  const nodeId: any = useNodeId();
  const edge: any = useEdges();
  // const [days, setDays] = React.useState<string | null>(data.days ? data.days : null);
  // const [hours, setHours] = React.useState<string | null>(data.hours ? data.hours : null);
  // const [minutes, setMinutes] = React.useState<string | null>(data.minutes ? data.minutes : null);
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const [anchorElMenu, setAnchorElMenu] = useState<HTMLButtonElement | null>(null);
  const [delayTimeData, setDelayTimeData] = useState<string | null>(data.text ? data.text : null);
  const open = Boolean(anchorEl);
  const openMenu = Boolean(anchorElMenu);
  const id = open ? "simple-popover" : undefined;
  const idMenu = openMenu ? "simple-popover" : undefined;
  const [sourceHandleArray, setSourceHandleArray] = useState<any>(null);
  const [targetHandleArray, setTargetHandleArray] = useState<any>(null);

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

  const addDelayTime = () => {
    setNodes((prevNodes: any) =>
      prevNodes.map((node: any) => {
        if (node.id === nodeId) {
          return {
            ...node,
            data: { ...node.data, text: delayTimeData },
          };
        }
        return node;
      }),
    );
  };

  return (
    <>
      <Box
        sx={{
          width: "100%",
          height: "auto",
          bgcolor: "#fff",
          p: "8px",
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
          gap="16px"
          alignItems="center"
          p="8px"
          mb="12px"
          justifyContent="space-between"
        >
          <Image width={24} height={24} src={delay} alt="delay" />
          <Box display="flex" flexDirection="column" gap="4px">
            <Typography sx={{ color: "#1F1F1F", fontSize: "16px", fontWeight: "500" }}>
              Delays
            </Typography>
            <Typography sx={{ color: "#707070", fontSize: "14px", fontWeight: "400" }}>
              Trigger delay between messages
            </Typography>
          </Box>
          <Box>
            <Button
              aria-describedby={idMenu}
              onClick={handleClickMenu}
              sx={{
                ml: "auto",
                padding: "0",
                minWidth: "auto",
                "&:hover": {
                  backgroundColor: "transparent",
                },
              }}
            >
              <Image width={24} height={24} src={triggerMenu} alt="triggerMenu" />
            </Button>
            <Button
              disabled={doValuesCoexist(nodeId)}
              aria-describedby={id}
              onClick={handleClick}
              sx={{
                ml: "auto",
                padding: "0",
                minWidth: "auto",
                "&:hover": {
                  backgroundColor: "transparent",
                },
              }}
            >
              <Box sx={{ p: "0", minWidth: "auto" }}>
                <Image width={36} height={36} src={addInteraction} alt="addInteraction" />
              </Box>
            </Button>
          </Box>
        </Box>
        <TriggerDrawer
          // days={days}
          // setDays={setDays}
          // hours={hours}
          // setHours={setHours}
          // minutes={minutes}
          // setMinutes={setMinutes}
          delayTimeData={delayTimeData}
          setDelayTimeData={setDelayTimeData}
          addDelayTime={addDelayTime}
          data={data}
        />
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
      />

      <ContextMenu anchorElMenu={anchorElMenu} handleCloseMenu={handleCloseMenu} />
    </>
  );
}

export default DelayTimeNode;
