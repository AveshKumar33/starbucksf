import { Popover, Box, Typography, Button } from "@mui/material";
import Image from "next/image";
import React, { useCallback } from 'react';
import { useNodeId, useReactFlow, useViewport } from 'reactflow';
import duplicate from "../../../../src/assets/images/duplicate.svg";
import deleteIcon from "../../../../src/assets/images/deleteIcon.svg";
// import listTrigger from "../../../../src/assets/images/listTrigger.svg";

export default function ContextMenu({ id, anchorElMenu, handleCloseMenu, ...props }: any) {
  const nodeId: any = useNodeId();
  const { x, y } = useViewport();
  const openMenu = Boolean(anchorElMenu);
  const idMenu = openMenu ? 'simple-popover' : undefined;
  const { getNode, setNodes, addNodes, setEdges } = useReactFlow();
  // const node: any = getNode(nodeId);
  const duplicateNode = useCallback(() => {
    const node: any = getNode(nodeId);
    const position = {
      x: x + 50,
      y: y + 50,
    };

    addNodes({ ...node, id: `${node.id}-copy`, position });
    handleCloseMenu()
  }, [id, getNode, addNodes]);

  const deleteNode = useCallback(() => {
    setNodes((nodes) => nodes.filter((node) => node.id !== nodeId));
    setEdges((edges) => edges.filter((edge) => edge.source !== nodeId));
    handleCloseMenu()
  }, [nodeId, setNodes, setEdges]);
  return (
    <Popover
      open={openMenu}
      id={idMenu}
      anchorEl={anchorElMenu}
      onClose={handleCloseMenu}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}>
      <Box className="context-menu" sx={{ p: "16px" }} {...props}>
        <Button onClick={duplicateNode} sx={{
          display: "flex", justifyContent: "center", alignItems: "center", gap: "10px", '&:hover': {
            backgroundColor: 'transparent',
          },
        }}>
          <Image width={24} height={24} src={duplicate} alt="duplicate" />
          <Typography sx={{ fontSize: "16px", fontWeight: "400", color: "#5E5E5E" }} >Duplicate Trigger</Typography>
        </Button>
        <Button onClick={deleteNode} sx={{
          display: "flex", justifyContent: "center", alignItems: "center", gap: "10px", mt: "24px", '&:hover': {
            backgroundColor: 'transparent',
          },
        }}>
          <Image width={24} height={24} src={deleteIcon} alt="deleteIcon" />
          <Typography sx={{ fontSize: "16px", fontWeight: "400", color: "#5E5E5E" }} >Delete Trigger</Typography>
        </Button>
        {/* {node.type === "listButtonNode" ?
        <Button onClick={deleteNode} sx={{
          display: "flex", justifyContent: "center", alignItems: "center", gap: "10px", mt: "24px", '&:hover': {
            backgroundColor: 'transparent',
          },
        }}>
          <Image width={24} height={24} src={listTrigger} alt="listTrigger" />
          <Typography sx={{ fontSize: "16px", fontWeight: "400", color: "#5E5E5E" }} >List Menu</Typography>
        </Button>:null
        } */}
        
      </Box>
    </Popover>
  );
}
