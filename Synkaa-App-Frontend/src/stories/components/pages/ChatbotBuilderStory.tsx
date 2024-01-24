import { Box, Button, ThemeProvider, Typography } from "@mui/material";
import React, { useCallback, useMemo, useState } from "react";
import Image from "next/image";
import { SideBar } from "../organisms/SideBar";
import theme from "../../../theme/theme";
import publish from "../../../../src/assets/images/publish.svg";
import { Header } from "../organisms/Header";
import chatbotRobot from "../../../../src/assets/images/chatbotRobot.svg";
import save from "../../../../src/assets/images/save.svg";
import arrowLeft from "../../../../src/assets/images/arrowLeft.svg";
import settings from "../../../../src/assets/images/settings.svg";
import ReactFlow, { Background, Controls, addEdge, applyEdgeChanges, applyNodeChanges, updateEdge } from 'reactflow';
import 'reactflow/dist/style.css';
import CustomNode from "../atoms/CustomStartingNode";
import SendMessageNode from "../atoms/SendMessageNode";
import addNewNode from "../../../app/helpers/newNode";
import SettingsPopover from "../atoms/SettingsPopover";
import TestBotModal from "../atoms/testBotModal";
import DelayTimeNode from "../atoms/DelayTimeNode";
import ListButtonNode from "../atoms/ListButtonNode";
import AddNewItemNode from "../atoms/AddNewItemNode";
import ConditionalNode from "../atoms/ConditionalNode";
// import { useInputValue } from "../../../../src/app/helpers/useInputHook";

const initialNodes = [
    { id: 'hidden-1', type: 'customNode', position: { x: 100, y: 100 }, data: { value: 123 } },
];

export function ChatbotBuilderStory() {
    const [nodes, setNodes] = useState<any>(initialNodes);
    const [edges, setEdges] = useState<any>([]);
    // const nodeId = useNodeId();
    const [variant] = useState<any>('lines');
    const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
    const proOptions = { hideAttribution: true };
    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;
    const [openModal, setOpenModal] = useState(false);
    const handleOpen = () => setOpenModal(true);
    const handleClose = () => setOpenModal(false);
    const [itemValue, setItemValue] = useState('');

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        console.log(itemValue)
        setAnchorEl(event.currentTarget);
    };
    const onNodesChange = useCallback(
        (changes: any) => setNodes((nds: any) => applyNodeChanges(changes, nds)),
        [setNodes]
    );
    const onEdgesChange = useCallback(
        (changes: any) => setEdges((eds: any) => applyEdgeChanges(changes, eds)),
        [setEdges]
    );
    const onConnect = useCallback(
        (connection: any) => setEdges((eds: any) => addEdge(connection, eds)),
        [setEdges]
    );
    const handleItemNameChangeFromParent = (itemName: string) => {
        setItemValue(itemName);
    };
    const memoizedNodeTypes = useMemo(() => ({
        customNode: (props: any) => <CustomNode {...props} setNodes={setNodes} setEdges={setEdges} addNewNode={addNewNode} />,
        sendMessageNode: (props: any) => <SendMessageNode {...props} setNodes={setNodes} setEdges={setEdges} addNewNode={addNewNode} />,
        delayTimeNode: (props: any) => <DelayTimeNode {...props} setNodes={setNodes} setEdges={setEdges} addNewNode={addNewNode} />,
        listButtonNode: (props: any) => <ListButtonNode {...props} setNodes={setNodes} setEdges={setEdges} addNewNode={addNewNode} onItemNameChange={handleItemNameChangeFromParent} />,
        addNewItemNode: (props: any) => <AddNewItemNode {...props} setNodes={setNodes} setEdges={setEdges} addNewNode={addNewNode}  />,
        conditionalNode: (props: any) => <ConditionalNode {...props} setNodes={setNodes} setEdges={setEdges} addNewNode={addNewNode}  />
    }), [setNodes]);

    const onEdgeUpdate = useCallback(
        (oldEdge: any, newConnection: any) => {
            setEdges((prevEdges: any) => updateEdge(oldEdge, newConnection, prevEdges));
        },
        []
    );

    return (
        <ThemeProvider theme={theme}>
            <Box sx={{ display: "flex", width: "100%", height: "100%", flexGrow: "1", bgcolor: "#F0F6FE" }}>
                <Box sx={{ flexBasis: "60px" }}>
                    <SideBar />
                </Box>
                <Box sx={{ flex: 1 }}>
                    <Header headingType={false} heading="Chatbot Builder" />
                    <Box sx={{ display: "flex", gap: "24px", p: "24px", borderRadius: "10px", mt: '68px' }}>
                        <Box sx={{ display: "flex", flexDirection: "column", flex: 1, bgcolor: "#F0F6FE", gap: "24px" }}>
                            <Box sx={{ bgcolor: "#fff", display: "flex", justifyContent: "space-between", alignItems: "center", py: "18px", px: "32px", borderRadius: '10px' }}>
                                <Box sx={{ display: "flex", justifyContent: "flex-start", alignItems: "center", gap: "10px" }}>
                                    <Box sx={{ display: "flex", alignItems: "center", gap: "16px" }}>
                                        <Image width={24} height={24} src={arrowLeft} alt="arrowLeft" />
                                        <Typography sx={{ fontSize: "18px", fontWeight: "600", color: "#008DF1" }}>Guest Welcoming Bot</Typography>
                                    </Box>
                                </Box>
                                <Box sx={{ display: "flex", alignItems: "center", gap: "16px" }}>
                                    <Button aria-describedby={id} variant="contained" onClick={handleClick} sx={{
                                        bgcolor: "#E7E7E7",
                                        p: "10px",
                                        borderRadius: "4px",
                                        display: "flex",
                                        alignItems: "center",
                                        minWidth: "auto",
                                        '&:hover': {
                                            bgcolor: '#E7E7E7',
                                        }
                                    }}>
                                        <Image width={24} height={24} src={settings} alt="settings" />
                                    </Button>
                                    <Box sx={{ bgcolor: "#D3EDFF", p: "10px", borderRadius: "4px", display: "flex", alignItems: "center" }}>
                                        <Image width={24} height={24} src={save} alt="save" />
                                    </Box>
                                    <Button onClick={handleOpen} sx={{ bgcolor: "#fff", flexDirection: "row", display: "flex", px: "16px", py: "8px", gap: "10px", alignItems: "center", borderRadius: "4px", border: "2px solid #008DF1", }}>
                                        <Image width={24} height={24} src={chatbotRobot} alt="chatbotRobot" />
                                        <Typography sx={{ fontSize: "16px", fontWeight: "500", color: "#008DF1" }}>Test Bot</Typography>
                                    </Button>
                                    <Box sx={{ bgcolor: "#008DF1", flexDirection: "row", display: "flex", px: "16px", py: "10px", gap: "10px", alignItems: "center", borderRadius: "4px" }}>
                                        <Image width={24} height={24} src={publish} alt="publish" />
                                        <Typography sx={{ fontSize: "16px", fontWeight: "500", color: "#fff" }}>Publish</Typography>
                                    </Box>
                                </Box>
                            </Box>
                            <Box sx={{ width: '100%', height: '700px', maxHeight: "800px", bgcolor: "#00253F" }}>
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
                </Box>
                <SettingsPopover
                    id={id}
                    open={open}
                    anchorEl={anchorEl}
                    setAnchorEl={setAnchorEl}
                />
                <TestBotModal openModal={openModal} handleClose={handleClose} />
            </Box>
        </ThemeProvider>
    );
}