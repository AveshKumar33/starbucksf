import React, { useEffect } from "react";
import { Box, Button, Typography } from "@mui/material";
import { useState } from "react";
import Image from "next/image";
import flag from "@/assets/images/flag.svg";
import addInteraction from "@/assets/images/addInteraction.svg";
import InteractionPopover from "./Intreactions";
import addNewNode from "@/app/helpers/newNode";
import { Handle, Position, useEdges, useNodeId, useNodes } from "reactflow";

function CustomNode({ setNodes, setEdges }: any) {
  const node: any = useNodes();
  const edge: any = useEdges();
  const nodeId: any = useNodeId();
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const [sourceHandleArray, setSourceHandleArray] = useState<any>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  useEffect(() => {
    const sourceHandles = edge.map((edge: any) => edge.sourceHandle);
    setSourceHandleArray(sourceHandles);
  }, [edge]);
  function doValuesCoexist(id: any) {
    return sourceHandleArray?.includes(id);
  }

  return (
    <>
      <Box
        className="nodrag"
        sx={{
          height: "auto",
          border: "1px solid #000",
          px: "16px",
          py: "20px",
          borderRadius: "5px",
          bgcolor: "#fff",
          display: "flex",
          gap: "40px",
          alignItems: "center",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <Image width={24} height={24} src={flag} alt="flag" />
          <Box>
            <Typography fontSize="16px" fontWeight="500" color="#00253F">
              Starting Point
            </Typography>
            <Typography fontSize="14px" fontWeight="400" color="#707070">
              This is where your bot begins
            </Typography>
          </Box>
        </Box>
        <Button
          disabled={doValuesCoexist(nodeId)}
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
        {/* Output handle */}
        <Handle
          type="source"
          id={nodeId}
          isConnectable={!doValuesCoexist(nodeId)}
          position={Position.Right}
          style={{ background: "#01CBD5", width: "15px", height: "15px" }}
          onConnect={(params: any) => console.log("handle onConnect source", params)}
        />
      </Box>

      <InteractionPopover
        setNodes={setNodes}
        setEdges={setEdges}
        setAnchorEl={setAnchorEl}
        anchorEl={anchorEl}
        addNewNode={addNewNode}
        handleClose={handleClose}
        currentNodeId={nodeId}
        node={node}
        nodeId={nodeId}
        activeHandle={nodeId}
      />
    </>
  );
}

export default CustomNode;
