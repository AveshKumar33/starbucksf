import { Box, Typography, Button, Drawer } from '@mui/material';
import { Handle, Position, useNodeId, useNodes, useReactFlow } from 'reactflow';
import React, { useCallback, useEffect, useState } from 'react';
import listTrigger from "../../../../src/assets/images/listTrigger.svg";
import triggerMenu from "../../../../src/assets/images/triggerMenu.svg";
import Image from "next/image";
import InteractionPopover from './Intreactions';
import addNewNode from '../../../app/helpers/newNode';
import ContextMenu from './contextMenuPopover';
import { ListDrawerContent } from '../common/ListDrawerContent';
import { useInputValue } from '../../../../src/app/helpers/useInputHook';

type Anchor = 'left' | 'top' | 'bottom';
type ListItem = {
    id: string;
    name: string;
};

function ListButtonNode({ setNodes, setEdges }: any) {
    const node: any = useNodes();
    const nodeId: any = useNodeId();
    const parentId: any = nodeId
    const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
    const [anchorElMenu, setAnchorElMenu] = useState<HTMLButtonElement | null>(null);
    const openMenu = Boolean(anchorElMenu);
    const { getNode } = useReactFlow();
    const [drawerOpen, setDrawerOpen] = useState({ left: false });
    const [listItem, setListItem] = useState<Array<ListItem>>([]);
    const {  setGlobalListItems, setInputValue, addnewNode /*, setAddnewNode */ } = useInputValue();
    const [currentNodeState, setCurrentNodeSate] = useState<any>()
    const [updatedHeight, setUpdatedHeight] = useState<any>();
    // const [updateChildPositionY, setUpdateChildPositionY] = useState<any>(null);
    const childPosition = getNode(addnewNode)
    const idMenu = openMenu ? 'simple-popover' : undefined;
    const date_new = new Date();
    const initialHeight = getNode(nodeId);
    const ChildId = date_new.getTime();

    useEffect(() => {
        if (addnewNode === "") {
            setCurrentNodeSate(getNode(nodeId))
            // setUpdateChildPositionY(getNode(nodeId))
        } else {
            setCurrentNodeSate(getNode(addnewNode))
            // setUpdateChildPositionY(getNode(addnewNode))
        }
    }, [addnewNode])
    useEffect(() => {
        if (currentNodeState) {
            setUpdatedHeight(initialHeight?.height + currentNodeState.height)
        }
    }, [currentNodeState])
    const handleClose = () => {
        setAnchorEl(null);
    };
    const handleClickMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorElMenu(event.currentTarget);
    };
    const handleCloseMenu = () => {
        setAnchorElMenu(null);
    };
    const addObjectToList = (newItem: ListItem) => {
        setListItem(prevList => [...prevList, newItem]);
    };
    function handleListItem() {
        // addNewNode(setNodes, setEdges, null, updateChildPositionY, parentId, ChildId, globalListItems, "addNewItemNode");
        const newItem = { id: `Child-${ChildId}`, name: `Item ${listItem.length + 1}`, position: childPosition?.position };
        setInputValue(newItem.name)
        addObjectToList(newItem);

    }
    const deleteNode = useCallback(() => {
        setNodes((nodes: any) => nodes.filter((node: any) => node.id !== nodes[nodes?.length - 1].id));
        setEdges((edges: any) => edges.filter((edge: any) => edge.source !== node[node?.length - 1].id));
        // const deleteNode = node[node?.length - 2]
        // setUpdateChildPositionY(deleteNode)
        setUpdatedHeight(updatedHeight - node[node.length - 1].height)
    }, [nodeId, setNodes, setEdges, node, updatedHeight]);

    const removeItem = (idToRemove: string) => {
        const updatedList = listItem.filter(item => item.id !== idToRemove);
        setListItem(updatedList);
    };
    console.log("addnewNode", addnewNode)
    // console.log("currentNodeState", currentNodeState)
    const updateItemNameById = (idToUpdate: string, value: string) => {
        const updatedList: any = listItem.map(item => {
            if (item.id === idToUpdate) {

                return { ...item, name: value };
            }
            return item;
        });
        setInputValue(value)
        setGlobalListItems(updatedList)
        setListItem(updatedList);
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
            <Box sx={{
                width: currentNodeState ? `${currentNodeState.width}px` : "100%",
                height: `${updatedHeight}px`, bgcolor: "#fff", p: "8px", overflow: "hidden", borderRadius: "8px",
                // minHeight:currentNodeState?`${currentNodeState.height}px ` 
            }}>
                {/* Input handle */}
                <Handle
                    type="target"
                    position={Position.Left}
                    style={{ background: '#01CBD5', width: "15px", height: "15px" }}
                    onConnect={(params: any) => console.log('handle onConnect target', params)}
                />

                <>
                    {(['left'] as const).map((anchor) => (
                        <React.Fragment key={anchor}>

                            <Box
                                className="nodrag"
                                sx={{ display: "flex", width: "100%", gap: "16px", alignItems: "center", p: "8px", mb: "12px", justifyContent: "space-between", borderBottom: "1px solid #DADADA" }} >
                                <Button onClick={toggleDrawer(anchor, true)} sx={{ flex: 1, gap: "16px" }}>
                                    <Image width={24} height={24} src={listTrigger} alt="listTrigger" />
                                    <Box display="flex" flexDirection="column" gap="4px" sx={{ flex: "1" }}>
                                        <Typography sx={{ color: "#1F1F1F", fontSize: "16px", fontWeight: "500", textAlign: "left" }} >List Button</Typography>
                                        <Typography sx={{ color: "#707070", fontSize: "14px", fontWeight: "400", textAlign: "left" }} >Single choice menu</Typography>
                                    </Box>
                                </Button>
                                <Box>
                                    <Button aria-describedby={idMenu} onClick={handleClickMenu}
                                        sx={{
                                            ml: "auto", padding: "0",
                                            '&:hover': {
                                                backgroundColor: 'transparent',
                                            },
                                        }}>
                                        <Image width={24} height={24} src={triggerMenu} alt="triggerMenu" />
                                    </Button>
                                </Box>
                            </Box>

                            <Drawer
                                anchor={anchor}
                                open={drawerOpen[anchor]}
                                onClose={toggleDrawer(anchor, false)}
                            >
                                <ListDrawerContent
                                    toggleDrawer={toggleDrawer}
                                    listItem={listItem}
                                    updateItemNameById={updateItemNameById}
                                    deleteNode={deleteNode}
                                    removeItem={removeItem}
                                    handleListItem={handleListItem}
                                    anchor={anchor}
                                />
                            </Drawer>

                        </React.Fragment>
                    ))}
                </>
                <Box sx={{ bgcolor: "#F0F6FE", p: "10px", borderRadius: "8px", mb: "12px" }}>
                    <Typography sx={{ color: "#1F1F1F", fontSize: "14px", fontWeight: "500" }}>Welcome to Fortune Hotels!</Typography>
                    <Typography sx={{ color: "#707070", fontSize: "16px", fontWeight: "400" }}>We are delighted to have you dine with us.</Typography>
                </Box>
            </Box>
            <InteractionPopover
                setAnchorEl={setAnchorEl}
                anchorEl={anchorEl}
                addNewNode={addNewNode}
                currentNodeId={parentId}
                setEdges={setEdges}
                setNodes={setNodes}
                handleClose={handleClose}
                node={node}
                parentId={parentId}
                ChildId={ChildId}
                nodeId={nodeId}
            />
            <ContextMenu
                anchorElMenu={anchorElMenu}
                handleCloseMenu={handleCloseMenu}
            />
        </>
    );
}

export default ListButtonNode;
