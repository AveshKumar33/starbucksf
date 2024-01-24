"use client";
import { Box, Button, Typography } from "@mui/material";
import React, { useCallback, useMemo, useState } from "react";
import Image from "next/image";
import publish from "@/assets/images/publish.svg";
import chatbotRobot from "@/assets/images/chatbotRobot.svg";
import save from "@/assets/images/save.svg";
import arrowLeft from "@/assets/images/arrowLeft.svg";
import settings from "@/assets/images/settings.svg";
import ReactFlow, {
  Background,
  Controls,
  addEdge,
  applyEdgeChanges,
  applyNodeChanges,
  updateEdge,
} from "reactflow";
import "reactflow/dist/style.css";
import CustomNode from "@/components/CustomStartingNode";
import SendMessageNode from "@/components/SendMessageNode";
import MediaMessageNode from "@/components/MediaNode";
import addNewNode from "@/app/helpers/newNode";
import SettingsPopover from "@/components/SettingsPopover";
import DelayTimeNode from "@/components/DelayTimeNode";
import ChatbotServices from "@/services/chatbot.services";
import Toaster from "@/components/Toaster";
import { useRouter } from "next/navigation";
import LoaderGlobal from "@/components/LoaderGlobal";
import ListButtonNode from "@/components/ListButtonNode";
import AddNewItemNode from "@/components/AddNewItemNode";
import ConditionalNode from "@/components/ConditionalNode";

const initialNodes = [
  { id: "hidden-1", type: "customNode", position: { x: 100, y: 100 }, data: { value: 123 } },
];

// const nodeTypes = { customNode: CustomNode };

interface ToasterInterface {
  open: boolean;
  severity: string;
  message: string;
}

function ChatbotBuilderStory() {
  const router = useRouter();
  const [chatbotName] = useState<string>("Guest Welcoming Bot");
  const [nodes, setNodes] = useState<any>(initialNodes);
  // const [buttonDisabled, setButtonDisabled] = useState<boolean>(false);
  const [edges, setEdges] = useState<any>([]);
  const [variant] = useState<any>("lines");
  // const [text, setText] = useState<string>("");
  // const [nodeId, setNodeId] = useState<any>();
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const [chatbotToaster, setChatbotToaster] = React.useState<ToasterInterface | null>(null);
  const [apiLoading, setApiLoading] = React.useState<boolean>(false);
  const proOptions = { hideAttribution: true };
  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;
  const [itemValue, setItemValue] = useState("");

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const onNodesChange = useCallback(
    (changes: any) => setNodes((nds: any) => applyNodeChanges(changes, nds)),
    [setNodes],
  );
  const onEdgesChange = useCallback(
    (changes: any) => setEdges((eds: any) => applyEdgeChanges(changes, eds)),
    [setEdges],
  );
  const onConnect = useCallback(
    (connection: any) => setEdges((eds: any) => addEdge(connection, eds)),
    [setEdges],
  );

  const handleItemNameChangeFromParent = (itemName: string) => {
    setItemValue(itemName);
  };

  const memoizedNodeTypes = useMemo(
    () => ({
      customNode: (props: any) => (
        <CustomNode {...props} setNodes={setNodes} setEdges={setEdges} addNewNode={addNewNode} />
      ),
      sendMessageNode: (props: any) => (
        <SendMessageNode
          {...props}
          setNodes={setNodes}
          setEdges={setEdges}
          addNewNode={addNewNode}
        />
      ),
      delayTimeNode: (props: any) => (
        <DelayTimeNode {...props} setNodes={setNodes} setEdges={setEdges} addNewNode={addNewNode} />
      ),
      listButtonNode: (props: any) => (
        <ListButtonNode
          {...props}
          setNodes={setNodes}
          setEdges={setEdges}
          addNewNode={addNewNode}
          onItemNameChange={handleItemNameChangeFromParent}
        />
      ),
      mediaMessageNode: (props: any) => (
        <MediaMessageNode
          {...props}
          setNodes={setNodes}
          setEdges={setEdges}
          addNewNode={addNewNode}
        />
      ),
      addNewItemNode: (props: any) => (
        <AddNewItemNode
          {...props}
          setNodes={setNodes}
          setEdges={setEdges}
          addNewNode={addNewNode}
          itemValue={itemValue}
        />
      ),
      conditionalNode: (props: any) => (
        <ConditionalNode
          {...props}
          setNodes={setNodes}
          setEdges={setEdges}
          addNewNode={addNewNode}
        />
      ),
    }),
    [setNodes],
  );

  const onEdgeUpdate = useCallback((oldEdge: any, newConnection: any) => {
    setEdges((prevEdges: any) => updateEdge(oldEdge, newConnection, prevEdges));
  }, []);

  // handling save chatbots
  async function handleDownload() {
    // setButtonDisabled(true);
    setApiLoading(true);
    const flowData = {
      nodes: nodes,
      edges: edges,
    };
    // console.log(flowData);
    try {
      const result = await ChatbotServices.postChatbot(chatbotName, flowData);
      if (result) {
        if (result.success) {
          setChatbotToaster({
            open: true,
            severity: "success",
            message: "Chatbot saved successfully",
          });
        } else {
          setChatbotToaster({
            open: false,
            severity: "error",
            message: result.message,
          });
        }
      } else {
        setChatbotToaster({
          open: false,
          severity: "error",
          message: "Some error occured",
        });
      }
    } catch (error) {
      setChatbotToaster({
        open: false,
        severity: "error",
        message: "Some error occured",
      });
    }
    setApiLoading(false);
    // setButtonDisabled(false);
  }

  // const handleTestBot = async () => {
  //   const result = await ChatbotServices.testChatot(params.id);
  //   console.log(result);
  // }

  const handleCloseToaster = () => {
    setChatbotToaster(null);
  };

  // useEffect(() => {
  //   setNodes((nds: any) =>
  //     nds.map((node: any) => {
  //       // console.log("Node", node.id);
  //       // console.log("Current", nodeId);

  //       if (node.id === nodeId) {
  //         // it's important that you create a new object here
  //         // in order to notify react flow about the change
  //         node.data = {
  //           ...node.data,
  //           value: text,
  //         };
  //       }

  //       return node;
  //     }),
  //   );
  // }, [text, setNodes]);

  return (
    <>
      {apiLoading && <LoaderGlobal />}
      <Box sx={{ display: "flex", gap: "24px", p: "0", borderRadius: "10px" }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            flex: 1,
            bgcolor: "#F0F6FE",
            gap: "24px",
          }}
        >
          <Box
            sx={{
              bgcolor: "#fff",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              py: "18px",
              px: "32px",
              borderRadius: "10px",
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-start",
                alignItems: "center",
                gap: "10px",
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center", gap: "16px" }}>
                <Image
                  onClick={() => router.back()}
                  width={24}
                  height={24}
                  src={arrowLeft}
                  alt="arrowLeft"
                  style={{ cursor: "pointer" }}
                />
                <Typography sx={{ fontSize: "18px", fontWeight: "600", color: "#008DF1" }}>
                  Guest Welcoming Bot
                </Typography>
              </Box>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center", gap: "16px" }}>
              <Button
                aria-describedby={id}
                variant="contained"
                onClick={handleClick}
                sx={{
                  bgcolor: "#E7E7E7",
                  p: "10px",
                  borderRadius: "4px",
                  display: "flex",
                  alignItems: "center",
                  minWidth: "auto",
                  "&:hover": {
                    bgcolor: "#E7E7E7",
                  },
                }}
              >
                <Image width={24} height={24} src={settings} alt="settings" />
              </Button>
              <Box
                sx={{
                  bgcolor: "#D3EDFF",
                  p: "10px",
                  borderRadius: "4px",
                  display: "flex",
                  alignItems: "center",
                }}
                onClick={handleDownload}
              >
                <Image width={24} height={24} src={save} alt="save" />
              </Box>
              <Box
                sx={{
                  bgcolor: "#fff",
                  flexDirection: "row",
                  display: "flex",
                  px: "16px",
                  py: "8px",
                  gap: "10px",
                  alignItems: "center",
                  borderRadius: "4px",
                  border: "2px solid #008DF1",
                }}
                // onClick={handleTestBot}
              >
                <Image width={24} height={24} src={chatbotRobot} alt="chatbotRobot" />
                <Typography sx={{ fontSize: "16px", fontWeight: "500", color: "#008DF1" }}>
                  Test Bot
                </Typography>
              </Box>
              <Box
                sx={{
                  bgcolor: "#008DF1",
                  flexDirection: "row",
                  display: "flex",
                  px: "16px",
                  py: "10px",
                  gap: "10px",
                  alignItems: "center",
                  borderRadius: "4px",
                }}
              >
                <Image width={24} height={24} src={publish} alt="publish" />
                <Typography sx={{ fontSize: "16px", fontWeight: "500", color: "#fff" }}>
                  Publish
                </Typography>
              </Box>
            </Box>
          </Box>
          <Box sx={{ width: "100%", height: "700px", maxHeight: "800px", bgcolor: "#00253F" }}>
            <ReactFlow
              nodes={nodes}
              edges={edges}
              onNodesChange={onNodesChange}
              onEdgesChange={onEdgesChange}
              onEdgeUpdate={onEdgeUpdate}
              onConnect={onConnect}
              nodeTypes={memoizedNodeTypes}
              proOptions={proOptions}
            >
              <Background color="#707070" variant={variant} />
              <Controls onZoomOut={() => "hello"} position="top-right" showInteractive={false} />
            </ReactFlow>
          </Box>
        </Box>
      </Box>
      <SettingsPopover id={id} open={open} anchorEl={anchorEl} setAnchorEl={setAnchorEl} />
      {chatbotToaster && (
        <Toaster
          open={chatbotToaster.open}
          severity={chatbotToaster.severity}
          onClose={handleCloseToaster}
          message={chatbotToaster.message}
        />
      )}
    </>
  );
}

export default ChatbotBuilderStory;
