import { Popover, Box, Typography, TextField, InputAdornment, Button, } from "@mui/material";
import Image from "next/image";
import SearchIcon from '@mui/icons-material/Search';
import condition from "../../../../src/assets/images/condition.svg";
import delay from "../../../../src/assets/images/delay.svg";
import sendMsg from "../../../../src/assets/images/sendMsg.svg";
import listTrigger from "../../../../src/assets/images/listTrigger.svg";
import addMedia from "../../../../src/assets/images/addMedia.svg";
import { useEffect, useState } from "react";
import React from "react";
import { useReactFlow } from "reactflow";



function InteractionPopover({ anchorEl, addNewNode, handleClose, setNodes, setEdges, currentNodeId, node,}: any) {
    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;
    const { getNode } = useReactFlow();
    const currentNode: any = getNode(currentNodeId);
 
    const [updatedNodeData, setUpdatedNodeData] = useState(node);
    useEffect(() => {
        setUpdatedNodeData(node)
        console.log(updatedNodeData)
    }, [node])
    const handleAddNewNode = (type: string) => {
        handleClose()
        addNewNode(setNodes, setEdges, currentNodeId, currentNode, null, null, null, type);
    };

    return (
        <Popover
            sx={{ marginLeft: "20px", marginBottom: "80px", borderRadius: "8px" }}
            id={id}
            open={open}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
        >
            <Box sx={{ bgcolor: "#F4FAFF", p: "16px", borderRadius: "8px" }}>
                <Box>
                    <Typography sx={{ color: "#1F1F1F", fontSize: "16px", fontWeight: "500", mb: "8px" }} >Type to Search</Typography>
                    <TextField
                        placeholder='Search'
                        sx={{ bgcolor: "#fff" }}
                        variant="outlined"
                        fullWidth
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <SearchIcon />
                                </InputAdornment>
                            ),
                        }}
                    />
                    <Box sx={{ mt: "16px" }}>
                        {/* <Box display="flex" gap="16px" alignItems="center" borderBottom="1px solid #DADADA" py="12px">
                            <Image width={24} height={24} src={integration} alt="integration" />
                            <Box display="flex" flexDirection="column" gap="4px">
                                <Typography sx={{ color: "#1F1F1F", fontSize: "16px", fontWeight: "500" }} >Integration</Typography>
                                <Typography sx={{ color: "#707070", fontSize: "14px", fontWeight: "400" }} >Add integration to Flow</Typography>
                            </Box>
                        </Box> */}
                        <Button onClick={() => handleAddNewNode("conditionalNode")}
                            sx={{ width: "100%", display: "flex", gap: "16px", alignItems: "flex-start", borderBottom: "1px solid #DADADA", justifyContent: "flex-start", p: "0", py: "12px", }}>
                            <Image width={24} height={24} src={condition} alt="condition" />
                            <Box display="flex" flexDirection="column" gap="4px">
                                <Typography sx={{ color: "#1F1F1F", fontSize: "16px", fontWeight: "500", textAlign: "left" }} >Conditions</Typography>
                                <Typography sx={{ color: "#707070", fontSize: "14px", fontWeight: "400" }} >Split your flows</Typography>
                            </Box>
                        </Button>
                        <Button onClick={() => handleAddNewNode("delayTimeNode")}
                            sx={{ width: "100%", display: "flex", gap: "16px", alignItems: "flex-start", borderBottom: "1px solid #DADADA", justifyContent: "flex-start", p: "0", py: "12px", }}>
                            <Image width={24} height={24} src={delay} alt="delay" />
                            <Box display="flex" flexDirection="column" gap="4px">
                                <Typography sx={{ color: "#1F1F1F", fontSize: "16px", fontWeight: "500", textAlign: "left" }} >Delays</Typography>
                                <Typography sx={{ color: "#707070", fontSize: "14px", fontWeight: "400" }} >Trigger delay between messages</Typography>
                            </Box>
                        </Button>



                        <Button
                            onClick={() => handleAddNewNode("sendMessageNode")}
                            sx={{ width: "100%", display: "flex", gap: "16px", alignItems: "center", borderBottom: "1px solid #DADADA", justifyContent: "flex-start", p: "0", py: "12px", }}>
                            <Image width={24} height={24} src={sendMsg} alt="sendMsg" />
                            <Box display="flex" flexDirection="column" gap="4px">
                                <Typography sx={{ color: "#1F1F1F", fontSize: "16px", fontWeight: "500", textAlign: "left" }} >Send Message</Typography>
                                <Typography sx={{ color: "#707070", fontSize: "14px", fontWeight: "400" }} >Type your message!</Typography>
                            </Box>
                        </Button>
                        <Button
                            onClick={() => {handleAddNewNode("listButtonNode") }}
                            sx={{ width: "100%", display: "flex", gap: "16px", alignItems: "flex-start", borderBottom: "1px solid #DADADA", justifyContent: "flex-start", p: "0", py: "12px", }}>
                            <Image width={24} height={24} src={listTrigger} alt="listTrigger" />
                            <Box display="flex" flexDirection="column" gap="4px">
                                <Typography sx={{ color: "#1F1F1F", fontSize: "16px", fontWeight: "500", textAlign: "left" }} >List Button</Typography>
                                <Typography sx={{ color: "#707070", fontSize: "14px", fontWeight: "400" }} >Single choice menu</Typography>
                            </Box>
                        </Button>

                        <Box display="flex" gap="16px" alignItems="center" borderBottom="1px solid #DADADA" py="12px">
                            <Image width={24} height={24} src={addMedia} alt="addMedia" />
                            <Box display="flex" flexDirection="column" gap="4px">
                                <Typography sx={{ color: "#1F1F1F", fontSize: "16px", fontWeight: "500" }} >Media</Typography>
                                <Typography sx={{ color: "#707070", fontSize: "14px", fontWeight: "400" }} >Add images, video, etc.</Typography>
                            </Box>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Popover >
    )
}
export default InteractionPopover