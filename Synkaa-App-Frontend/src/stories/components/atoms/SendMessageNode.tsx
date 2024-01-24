import { Box, Typography, Button, TextField } from '@mui/material';
import { Handle, Position, useNodes, useNodeId } from 'reactflow';
import React, { useState } from 'react';
import sendMsg from "../../../../src/assets/images/sendMsg.svg";
import triggerMenu from "../../../../src/assets/images/triggerMenu.svg";
import Image from "next/image";
import addInteraction from "../../../../src/assets/images/addInteraction.svg";
import InteractionPopover from './Intreactions';
import addNewNode from '../../../app/helpers/newNode';
import ContextMenu from './contextMenuPopover';


function SendMessageNode({ setNodes, setEdges,data }: any) {
    const node: any = useNodes();
    const nodeId:string | null = useNodeId();
    const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
    const [anchorElMenu, setAnchorElMenu] = useState<HTMLButtonElement | null>(null);
    const open = Boolean(anchorEl);
    const openMenu = Boolean(anchorElMenu);
    const id = open ? 'simple-popover' : undefined;
    const idMenu = openMenu ? 'simple-popover' : undefined;
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
     function handleNodeText(e: any) {
        const value = e.target.value;
        setNodes((prevNodes: any) => prevNodes.map((node: any) => {
            if (node.id === nodeId) {
                return { ...node, data: { ...node.data, text: value } };
            }
            return node;
        }));
    }
    console.log("node",node)
    return (
        <>
            <Box sx={{ width: "100%", height: "auto", bgcolor: "#fff", p: "20px", overflow: "hidden",borderRadius: "8px" }}>
                {/* Input handle */}
                <Handle
                    type="target"
                    position={Position.Left}
                    style={{ background: '#01CBD5', width: "15px", height: "15px" }}
                    onConnect={(params: any) => console.log('handle onConnect target', params)}
                />
                <Box display="flex" gap="16px" alignItems="center" borderBottom="1px solid #DADADA" py="12px" mb="12px" justifyContent="space-between">
                    <Image width={24} height={24} src={sendMsg} alt="sendMsg" />
                    <Box display="flex" flexDirection="column" gap="4px">
                        <Typography sx={{ color: "#1F1F1F", fontSize: "16px", fontWeight: "500" }} >Send Message</Typography>
                        <Typography sx={{ color: "#707070", fontSize: "14px", fontWeight: "400" }} >Type your message!</Typography>
                    </Box>
                    <Box>
                        <Button aria-describedby={idMenu} onClick={handleClickMenu}
                            sx={{
                                ml: "auto",
                                '&:hover': {
                                    backgroundColor: 'transparent',
                                },
                            }}>
                            <Image width={36} height={36} src={triggerMenu} alt="triggerMenu" />
                        </Button>
                        <Button aria-describedby={id} onClick={handleClick}
                            sx={{
                                ml: "auto",
                                '&:hover': {
                                    backgroundColor: 'transparent',
                                },
                            }}>
                            <Image width={36} height={36} src={addInteraction} alt="addInteraction" />
                        </Button>
                    </Box>
                </Box>
                <Box sx={{ cursor: "text" }} className="nodrag text_editor_node" >
                    <TextField id="outlined-basic" value={data.text || ""} label="Outlined" variant="outlined" onChange={(e) => handleNodeText(e)} />
                </Box>
                {/* Output handle */}
                <Handle
                    type="source"
                    position={Position.Right}
                    style={{ background: '#01CBD5', width: "15px", height: "15px" }}
                    onConnect={(params: any) => console.log('handle onConnect source', params)}
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
            <ContextMenu
                anchorElMenu={anchorElMenu}
                handleCloseMenu={handleCloseMenu}
            />
        </>
    );
}

export default SendMessageNode;
