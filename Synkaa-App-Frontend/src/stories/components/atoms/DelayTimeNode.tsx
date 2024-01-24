import { Box, Typography, Button, } from '@mui/material';
import { Handle, Position, useNodeId, useNodes, } from 'reactflow';
import React, { useState } from 'react';
import delay from "../../../../src/assets/images/delay.svg";
import triggerMenu from "../../../../src/assets/images/triggerMenu.svg";
import Image from "next/image";
import addInteraction from "../../../../src/assets/images/addInteraction.svg";
import InteractionPopover from './Intreactions';
import addNewNode from '../../../app/helpers/newNode';
import ContextMenu from './contextMenuPopover';
import TriggerDrawer from './SideDrawer';


function DelayTimeNode({ setNodes, setEdges, /*data*/ }: any) {
    const node: any = useNodes();
    const nodeId: string | null = useNodeId();
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
    return (
        <>
            <Box sx={{ width: "100%", height: "auto", bgcolor: "#fff", p: "8px", overflow: "hidden", borderRadius: "8px" }}>
                {/* Input handle */}
                <Handle
                    type="target"
                    position={Position.Left}
                    style={{ background: '#01CBD5', width: "15px", height: "15px" }}
                    onConnect={(params: any) => console.log('handle onConnect target', params)}
                />
                <Box display="flex" gap="16px" alignItems="center" p="8px" mb="12px" justifyContent="space-between">
                    <Image width={24} height={24} src={delay} alt="delay" />
                    <Box display="flex" flexDirection="column" gap="4px">
                        <Typography sx={{ color: "#1F1F1F", fontSize: "16px", fontWeight: "500" }} >Delays</Typography>
                        <Typography sx={{ color: "#707070", fontSize: "14px", fontWeight: "400" }} >Trigger delay between messages</Typography>
                    </Box>
                    <Box>
                        <Button aria-describedby={idMenu} onClick={handleClickMenu}
                            sx={{
                                ml: "auto", padding: "0", minWidth: "auto",
                                '&:hover': {
                                    backgroundColor: 'transparent',
                                },
                            }}>
                            <Image width={24} height={24} src={triggerMenu} alt="triggerMenu" />
                        </Button>
                        <Button aria-describedby={id} onClick={handleClick}
                            sx={{
                                ml: "auto", padding: "0", minWidth: "auto",
                                '&:hover': {
                                    backgroundColor: 'transparent',
                                },
                            }}>
                            <Button sx={{p:"0",minWidth:"auto"}}>
                                <Image width={36} height={36} src={addInteraction} alt="addInteraction" />
                            </Button>
                        </Button>
                    </Box>
                </Box>
                <TriggerDrawer />
                {/* <GenericNodeDrawer  content={<DelayDrawerContent />} /> */}
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

export default DelayTimeNode;
