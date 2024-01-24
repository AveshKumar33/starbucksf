import { Box, Typography, Button, Drawer } from '@mui/material';
import { Handle, Position, useNodes, useNodeId } from 'reactflow';
import React, { useState } from 'react';
import condition from "../../../../src/assets/images/condition.svg";
import triggerMenu from "../../../../src/assets/images/triggerMenu.svg";
import ifCondition from "../../../../src/assets/images/ifCondition.svg";
import Image from "next/image";
import InteractionPopover from './Intreactions';
import addNewNode from '../../../app/helpers/newNode';
import ContextMenu from './contextMenuPopover';
import { ConditionContent } from './ConditionContent';

type Anchor = 'left' | 'top' | 'bottom';

function ConditionalNode({ setNodes, setEdges }: any) {
    const node: any = useNodes();
    const nodeId: string | null = useNodeId();
    const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
    const [anchorElMenu, setAnchorElMenu] = useState<HTMLButtonElement | null>(null);
    const [drawerOpen, setDrawerOpen] = useState({ left: false });
    const open = Boolean(anchorEl);
    const openMenu = Boolean(anchorElMenu);
    const id = open ? 'simple-popover' : undefined;
    const idMenu = openMenu ? 'simple-popover' : undefined;
    const [conditionArray, setConditionArray] = useState(null);
    const handleConditionUpdate = (newCondition:any) => {
        setConditionArray(newCondition);
    };
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
    const toggleDrawer =
        (anchor: Anchor, open: boolean) =>
            (event: React.KeyboardEvent | React.MouseEvent) => {
                if (
                    event.type === 'keydown' &&
                    ((event as React.KeyboardEvent).key === 'Tab' ||
                        (event as React.KeyboardEvent).key === 'Shift')
                ) {
                    return;
                }

                setDrawerOpen({ ...drawerOpen, [anchor]: open });
            };
    return (
        <>
            <Box sx={{ width: "340px", height: "auto", bgcolor: "#fff", p: "20px", overflow: "hidden", borderRadius: "8px" }}>
                {/* Input handle */}
                <Handle
                    type="target"
                    position={Position.Left}
                    style={{ background: '#01CBD5', width: "15px", height: "15px" }}
                    onConnect={(params: any) => console.log('handle onConnect target', params)}
                />
                <Box display="flex" gap="16px" alignItems="center" borderBottom="1px solid #DADADA" py="12px" mb="12px" justifyContent="space-between">
                    <Box sx={{ display: "flex", gap: "16px", justifyContent: "flex-start", alignItems: "center" }}>
                        <Image width={24} height={24} src={condition} alt="condition" />
                        <Box display="flex" flexDirection="column" gap="4px">
                            <Typography sx={{ color: "#1F1F1F", fontSize: "16px", fontWeight: "500" }} >Conditions</Typography>
                            <Typography sx={{ color: "#707070", fontSize: "14px", fontWeight: "400" }} >Split your flows</Typography>
                        </Box>
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
                    </Box>
                </Box>
                <Box sx={{ bgcolor: "#00253F", p: "10px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>

                    <>
                        {(['left'] as const).map((anchor) => (
                            <React.Fragment key={anchor}>
                                <Button aria-describedby={id}
                                    className="nodrag"
                                    onClick={toggleDrawer(anchor, true)}
                                    sx={{
                                        ml: "auto", p: "0", flex: "1", justifyContent: "flex-start",
                                        '&:hover': {
                                            backgroundColor: 'transparent',
                                        },
                                    }}>
                                    <Typography sx={{ color: "#9922D0", fontSize: "14px", fontWeight: "400" }} >{conditionArray || "if"}</Typography>
                                </Button>

                                <Drawer
                                    anchor={anchor}
                                    open={drawerOpen[anchor]}
                                    onClose={toggleDrawer(anchor, false)}
                                >

                                    <ConditionContent 
                                    toggleDrawer={toggleDrawer(anchor, false)}
                                    onConditionUpdate={handleConditionUpdate}
                                     />
                                </Drawer>

                            </React.Fragment>
                        ))}
                    </>
                    <Button aria-describedby={id} onClick={handleClick}
                        sx={{
                            ml: "auto", p: "0", minWidth: "auto",
                            '&:hover': {
                                backgroundColor: 'transparent',
                            },
                        }}>
                        <Image width={24} height={24} src={ifCondition} alt="ifCondition" />
                    </Button>
                </Box>
                <Handle
                    type="source"
                    position={Position.Right}
                    style={{ background: '#01CBD5', width: "15px", height: "15px", top: "55%", right: "-7px" }}
                    onConnect={(params: any) => console.log('handle onConnect source', params)}
                />
                <Handle
                    type="source"
                    position={Position.Right}
                    style={{ background: '#FF6D6D', width: "15px", height: "15px", top: "80%", right: "-7px" }}
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
                node={node}
            />
            <ContextMenu
                anchorElMenu={anchorElMenu}
                handleCloseMenu={handleCloseMenu}
            />
        </>
    );
}

export default ConditionalNode;
