import React from "react";
import { Box, Button, Typography } from "@mui/material";
import { useState } from "react";
import Image from "next/image";
import flag from "@/assets/images/flag.svg";
import addInteraction from "@/assets/images/addInteraction.svg";
import InteractionPopover from "./Intreactions";
import addNewNode from "@/app/helpers/newNode";
import ReactFlow, {
  addEdge,
  applyEdgeChanges,
  applyNodeChanges,
  updateEdge,
  useNodes,
  useEdges,
  // useReactFlow,
} from "reactflow";
import SendMessageNode from "./SendMessageNode";
import DelayTimeNode from "./DelayTimeNode";
import ListButtonNode from "./ListButtonNode";
import MediaMessageNode from "./MediaNode";

function ListButton(/*{ buttons }: any*/) {
  const node: any = useNodes();
  const edges: any = useEdges();
  // const reactFlowInstance: any = useReactFlow();
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const [buttonNodes, setButtonNodes] = React.useState<any>(node);
  const [buttonEdges, setButtonEdges] = React.useState<any>(edges);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const onNodesChange = React.useCallback(
    (changes: any) => setButtonNodes((nds: any) => applyNodeChanges(changes, nds)),
    [setButtonNodes],
  );

  const onEdgesChange = React.useCallback(
    (changes: any) => setButtonEdges((eds: any) => applyEdgeChanges(changes, eds)),
    [setButtonEdges],
  );
  const onConnect = React.useCallback(
    (connection: any) => setButtonEdges((eds: any) => addEdge(connection, eds)),
    [setButtonEdges],
  );

  const onEdgeUpdate = React.useCallback((oldEdge: any, newConnection: any) => {
    setButtonEdges((prevEdges: any) => updateEdge(oldEdge, newConnection, prevEdges));
  }, []);

  const memoizedNodeTypes = React.useMemo(
    () => ({
      sendMessageNode: (props: any) => (
        <SendMessageNode
          {...props}
          setNodes={setButtonNodes}
          setEdges={setButtonEdges}
          addNewNode={addNewNode}
        />
      ),
      delayTimeNode: (props: any) => (
        <DelayTimeNode
          {...props}
          setNodes={setButtonNodes}
          setEdges={setButtonEdges}
          addNewNode={addNewNode}
        />
      ),
      listButtonNode: (props: any) => (
        <ListButtonNode {...props} setNodes={setButtonNodes} setEdges={setButtonEdges} />
      ),
      mediaMessageNode: (props: any) => (
        <MediaMessageNode
          {...props}
          setNodes={setButtonNodes}
          setEdges={setButtonEdges}
          addNewNode={addNewNode}
        />
      ),
    }),
    [setButtonNodes],
  );

  // useEffect(() => {
  //   console.log("defaultReactflow", reactFlowInstance);
  //   console.log("defaultNodes", node);
  //   console.log("defaultEdges", edges);
  // }, []);

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
      <ReactFlow
        nodes={buttonNodes}
        edges={buttonEdges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onEdgeUpdate={onEdgeUpdate}
        onConnect={onConnect}
        nodeTypes={memoizedNodeTypes}
      />
      <InteractionPopover
        setNodes={setButtonNodes}
        setEdges={setButtonEdges}
        setAnchorEl={setAnchorEl}
        anchorEl={anchorEl}
        addNewNode={addNewNode}
        handleClose={handleClose}
        currentNodeId={node[node.length - 1].id}
        node={node}
      />
    </>
  );
}

export default ListButton;
