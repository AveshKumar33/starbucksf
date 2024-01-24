import { Popover, Box, Typography, Button } from "@mui/material";
import React, { useCallback } from "react";
import { useNodeId, useReactFlow } from "reactflow";
import Image from "next/image";
// import listTrigger from "@/assets/images/listTrigger.svg";
import duplicate from "@/assets/images/duplicate.svg";
import deleteIcon from "@/assets/images/deleteIcon.svg";

export default function ContextMenu({ id, anchorElMenu, handleCloseMenu, ...props }: any) {
  const nodeId: any = useNodeId();
  const openMenu = Boolean(anchorElMenu);
  const idMenu = openMenu ? "simple-popover" : undefined;
  const { getNode, setNodes, addNodes, setEdges } = useReactFlow();
  const duplicateNode = useCallback(() => {
    const node: any = getNode(nodeId);
    // console.log("node", node);
    const position = {
      x: node.position.x,
      y: node.position.y + node.height + 50,
    };

    addNodes({ ...node, id: `${node.id}-copy`, position, selected: false });
    handleCloseMenu();
  }, [id, getNode, addNodes]);

  const deleteNode = useCallback(() => {
    setEdges((prevEdges) => {
      const filteredEdges = prevEdges.filter(
        (edge) => edge.source !== nodeId && edge.target !== nodeId,
      );

      const outgoingEdge = prevEdges.find((edge) => edge.target === nodeId);
      if (outgoingEdge) {
        const sourceNode = getNode(outgoingEdge.source);
        if (sourceNode && sourceNode.data.hasOutgoingConnection) {
          sourceNode.data = {
            ...sourceNode.data,
            hasOutgoingConnection: false,
          };

          setNodes((prevNodes) => {
            return prevNodes.map((node) => (node.id === outgoingEdge.source ? sourceNode : node));
          });
        }
      }

      return filteredEdges;
    });

    // Filter out the node and its child nodes (assuming nodes have a parentNode property pointing to their parent node)
    setNodes((prevNodes) =>
      prevNodes.filter((node) => node.id !== nodeId && node.parentNode !== nodeId),
    );
    handleCloseMenu();
  }, [nodeId, setNodes, setEdges, getNode]);

  return (
    <Popover
      open={openMenu}
      id={idMenu}
      anchorEl={anchorElMenu}
      onClose={handleCloseMenu}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
    >
      <Box sx={{ p: "16px" }} {...props}>
        <Button
          onClick={duplicateNode}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "10px",
            "&:hover": {
              backgroundColor: "transparent",
            },
          }}
        >
          <Image width={24} height={24} src={duplicate} alt="duplicate" />
          <Typography sx={{ fontSize: "16px", fontWeight: "400", color: "#5E5E5E" }}>
            Duplicate Trigger
          </Typography>
        </Button>
        <Button
          onClick={deleteNode}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "10px",
            mt: "24px",
            "&:hover": {
              backgroundColor: "transparent",
            },
          }}
        >
          <Image width={24} height={24} src={deleteIcon} alt="deleteIcon" />
          <Typography sx={{ fontSize: "16px", fontWeight: "400", color: "#5E5E5E" }}>
            Delete Trigger
          </Typography>
        </Button>
      </Box>
    </Popover>
  );
}
