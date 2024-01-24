import { Box, Typography, Button } from "@mui/material";
import { Handle, Position, useNodes, useNodeId } from "reactflow";
import React, { useEffect, useState } from "react";
import addInteractionWhite from "@/assets/images/addInteractionWhite.svg";
import Image from "next/image";
import InteractionPopover from "./Intreactions";
import addNewNode from "@/app/helpers/newNode";
import { useInputValue } from "@/app/helpers/useInputHook";

function AddNewItemNode({ setNodes, setEdges, data }: any) {
  const node: any = useNodes();
  const nodeId: any = useNodeId();
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const { globalListItems, inputValue, setAddnewNode } = useInputValue();
  const [value, setValue] = useState<any>(data.text !== "" ? data.text : inputValue);

  // const id = open ? 'simple-popover' : undefined;
  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    setAddnewNode(nodeId);
    globalListItems.filter((i: any) => {
      if (i.id === nodeId) {
        setValue(i.title);
      }
    });
  }, [globalListItems]);
  data.text = value;
  // useEffect(() => {
  //     console.log("AddNewItemNode", inputValue);
  //     console.log("Previous Input Value", previousInputValue); // You can access the previous value here
  //     // Update the previous value whenever inputValue changes
  //     setPreviousInputValue(inputValue);
  // }, [inputValue, previousInputValue]);
  const handleClickInteraction = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  return (
    <>
      <Box
        className="nodrag"
        sx={{ width: "325px", height: "auto", bgcolor: "#fff", overflow: "hidden" }}
      >
        <Box
          sx={{
            bgcolor: "#01CBD5",
            width: "auto",
            px: "16px",
            borderRadius: "4px",
            display: "flex",
            justifyContent: "flex-start",
          }}
        >
          <Button sx={{ maxWidth: "auto", flex: "1", p: "0" }}>
            <Typography
              sx={{
                color: "#ffffff",
                fontSize: "14px",
                fontWeight: "500",
                textAlign: "start",
                width: "100%",
              }}
            >
              {data.text}
            </Typography>
          </Button>
          <Box sx={{ ml: "auto", padding: "0", minWidth: "auto" }}>
            <Button sx={{ maxWidth: "auto" }} onClick={handleClickInteraction}>
              <Image width={36} height={36} src={addInteractionWhite} alt="addInteractionWhite" />
            </Button>
          </Box>
        </Box>
        {/* Output handle */}
        <Handle
          type="source"
          position={Position.Right}
          style={{ background: "#01CBD5", width: "15px", height: "15px" }}
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
        newNodePositionX={node[node.length - 1]?.position?.x}
        newNodeHeightPositionY={node[node.length - 1]?.position?.y}
        node={node}
      />
    </>
  );
}

export default AddNewItemNode;
