"use client";
import { Box, /*Button,*/ Typography } from "@mui/material";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import Image from "next/image";
import publish from "@/assets/images/publish.svg";
import chatbotRobot from "@/assets/images/chatbotRobot.svg";
import save from "@/assets/images/save.svg";
import arrowLeft from "@/assets/images/arrowLeft.svg";
// import settings from "@/assets/images/settings.svg";
import ReactFlow, {
  Background,
  Controls,
  MarkerType,
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
import TestBotModal from "@/components/TestBotModal";
import ListButtonNode from "@/components/ListButtonNode";
import AddNewItemNode from "@/components/AddNewItemNode";
import ConditionalNode from "@/components/ConditionalNode";

// const nodeTypes = { customNode: CustomNode };

interface ToasterInterface {
  open: boolean;
  severity: string;
  message: string;
}

interface UsersInfo {
  _id: string;
  uuid: string;
  name: string;
  userNumberId: string;
  phoneNumber: string;
  tagslist: [];
  createdAt: string;
  isdeleted: boolean;
  role: string;
  email: string;
  apiToken: string;
  isTestbotdeleted: boolean;
  isVerified: boolean;
}

function ChatbotBuilderStory({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [chatbotName, setChatbotName] = useState<string>();
  const [nodes, setNodes] = useState<any>([
    {
      id: "hidden-1",
      type: "customNode",
      position: { x: 100, y: 100 },
      data: { value: "start node" },
    },
  ]);
  const [testBot, setTestBot] = useState<boolean>(false);
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
  // const [users, setUsers] = useState<[UsersInfo] | null>(null);
  const [businessAccount, setBusinessAccount] = useState<UsersInfo>();
  // const [testUsers, setTestUsers] = React.useState<any>();
  const [chatbotStatus, setChatbotStatus] = useState<boolean>(false);
  const connectionLineStyle = { stroke: "#01CBD5", strokeWidth: 2 };
  const onNodesChange = useCallback(
    (changes: any) => setNodes((nds: any) => applyNodeChanges(changes, nds)),
    [setNodes],
  );

  // const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
  //   setAnchorEl(event.currentTarget);
  // };

  const onEdgesChange = useCallback(
    (changes: any) => setEdges((eds: any) => applyEdgeChanges(changes, eds)),
    [setEdges],
  );
  const onConnect = useCallback(
    (connection: any) => {
      const customEdgeStyle = {
        stroke: "#01CBD5",
        strokeWidth: 2,
        markerEnd: {
          type: MarkerType.ArrowClosed,
          width: 20,
          height: 20,
          color: "#01CBD5",
        },
      };

      const connectionWithStyle = {
        ...connection,
        style: customEdgeStyle,
      };
      setEdges((edges: any) => addEdge(connectionWithStyle, edges));
    },
    [setEdges],
  );

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
  async function handleSaveChatbot(withToaster: boolean) {
    setApiLoading(true);
    const flowData = {
      nodes: nodes,
      edges: edges,
    };

    try {
      const result = await ChatbotServices.updateChatData(params.id, flowData);
      if (result) {
        if (result.success) {
          if (withToaster) {
            setChatbotToaster({
              open: true,
              severity: "success",
              message: "Chatbot updated successfully",
            });
          }
          setApiLoading(false);
          return true;
        } else {
          setChatbotToaster({
            open: false,
            severity: "error",
            message: result.message,
          });
          setApiLoading(false);
          return false;
        }
      } else {
        setChatbotToaster({
          open: false,
          severity: "error",
          message: "Some error occured",
        });
        setApiLoading(false);
        return false;
      }
    } catch (error) {
      setChatbotToaster({
        open: false,
        severity: "error",
        message: "Some error occured",
      });
      setApiLoading(false);
      return false;
    }
  }

  // handling test chatbots
  const handleTestBot = async () => {
    const saveResult = await handleSaveChatbot(false);
    if (saveResult) {
      if (nodes.length - 1 === edges.length) {
        setTestBot(true);
      } else {
        setChatbotToaster({
          open: true,
          severity: "error",
          message: "Publish chatbot again",
        });
      }
    } else {
      setChatbotToaster({
        open: false,
        severity: "error",
        message: "Some error occured",
      });
    }
  };

  const handleInactiveTestBot = () => {
    setChatbotToaster({
      open: true,
      severity: "warning",
      message: "Publish chatbot first",
    });
  };

  const handleCloseToaster = () => {
    setChatbotToaster(null);
  };

  const handleClose = () => setTestBot(false);

  // getting chatbot details to display nodes
  const getChatbotDetail = async () => {
    setApiLoading(true);
    try {
      const result = await ChatbotServices.getChatbotDetail(params.id);

      if (result.success) {
        const data = result.data;
        const name = data.name;
        setChatbotName(name);
        setChatbotStatus(data.status);
        const chatData = JSON.parse(data.chatData);
        if (chatData.nodes.length > 0) {
          setNodes(chatData.nodes);
          setEdges(chatData.edges);
        }
      } else {
        setChatbotToaster({
          open: true,
          severity: "error",
          message: result.message,
        });
      }
    } catch (error) {
      setChatbotToaster({
        open: true,
        severity: "error",
        message: "Some error occured",
      });
    }
    setApiLoading(false);
  };

  /**user information list */
  const getAllUserData = async () => {
    setApiLoading(true);
    const adminData = localStorage.getItem("Admin") as string;
    setBusinessAccount(JSON.parse(adminData));
    setApiLoading(false);
  };

  // const getTestUserData = async () => {
  //   setApiLoading(true);
  //   try {
  //     const result: any = await UserServices.getTestUsers();
  //     if (result.success) {
  //       setTestUsers(result.data);
  //     } else {
  //       setTestUsers(null);
  //       setChatbotToaster({
  //         open: true,
  //         severity: "error",
  //         message: result.message,
  //       });
  //     }
  //   } catch (error) {
  //     setChatbotToaster({
  //       open: true,
  //       severity: "error",
  //       message: "Some error occured",
  //     });
  //   }
  //   setApiLoading(false);
  // };

  // Update status of testbot for publish
  const handlePublishBot = async () => {
    const saveResult = await handleSaveChatbot(false);
    if (saveResult) {
      setApiLoading(true);
      if (
        nodes.length - 1 !== edges.length ||
        edges.length === 0
        // || nodes[1].data === null ||
        // nodes[1].data === undefined ||
        // nodes[1].data.text === "" ||
        // nodes[1].data.text === null ||
        // nodes[1].data.text === undefined
      ) {
        setChatbotToaster({
          open: true,
          severity: "error",
          message:
            edges.length === 0 ? "Kindly create chatbot flow first" : "All nodes are not connected",
        });
        setApiLoading(false);
        setChatbotStatus(false);
      } else {
        try {
          const result: any = await ChatbotServices.publishTestBot(params.id);
          // console.log("result.message", result.message);
          if (result.success) {
            setChatbotToaster({
              open: true,
              severity: "success",
              message: "Chatbot published successfully",
            });
            setApiLoading(false);
            setChatbotStatus(true);
          } else {
            setChatbotToaster({
              open: true,
              severity: "error",
              message: result.message,
            });
            setApiLoading(false);
          }
        } catch (error) {
          setChatbotToaster({
            open: true,
            severity: "error",
            message: "Some error occured",
          });
          setApiLoading(false);
        }
      }
    } else {
      setChatbotToaster({
        open: true,
        severity: "error",
        message: "Some error occured",
      });
      setApiLoading(false);
    }
  };

  useEffect(() => {
    getChatbotDetail();
    getAllUserData();
    // getTestUserData();
  }, []);

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
                  {chatbotName}
                </Typography>
              </Box>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center", gap: "16px" }}>
              {/* <Button
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
              </Button> */}
              <Box
                sx={{
                  bgcolor: "#D3EDFF",
                  p: "10px",
                  borderRadius: "4px",
                  display: "flex",
                  alignItems: "center",
                }}
                onClick={() => {
                  handleSaveChatbot(true);
                }}
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
                  cursor: "pointer",
                }}
                onClick={chatbotStatus ? handleTestBot : handleInactiveTestBot}
              >
                <Image width={24} height={24} src={chatbotRobot} alt="chatbotRobot" />
                <Typography sx={{ fontSize: "16px", fontWeight: "500", color: "#008DF1" }}>
                  Test Bot
                </Typography>
              </Box>
              <Box
                onClick={handlePublishBot}
                sx={{
                  bgcolor: "#008DF1",
                  flexDirection: "row",
                  display: "flex",
                  px: "16px",
                  py: "10px",
                  gap: "10px",
                  alignItems: "center",
                  borderRadius: "4px",
                  cursor: "pointer",
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
              connectionLineStyle={connectionLineStyle}
            >
              <Background color="#707070" variant={variant} />
              <Controls onZoomOut={() => "hello"} position="top-right" showInteractive={false} />
            </ReactFlow>
          </Box>
        </Box>
      </Box>
      <SettingsPopover id={id} open={open} anchorEl={anchorEl} setAnchorEl={setAnchorEl} />
      {
        <TestBotModal
          openModal={testBot}
          handleClose={handleClose}
          // users={testUsers}
          businessAccount={businessAccount}
          chatbotId={params.id}
          // refreshUserList={getTestUserData}
        />
      }
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
