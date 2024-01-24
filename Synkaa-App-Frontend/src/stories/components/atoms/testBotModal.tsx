import { Modal, Box, Typography, Button } from "@mui/material";

import close from "../../../../src/assets/images/close.svg";
import comment from "../../../../src/assets/images/comment.svg";
import flagAmerica from "../../../../src/assets/images/flagAmerica.svg";
import arrowLeft from "../../../../src/assets/images/arrowLeft.svg";
import Image from "next/image";
import { useState } from "react";
import { TextFieldWithoutLabel } from "../../../theme/materialComponents/TextField";

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 500,
    bgcolor: 'background.paper',
    borderRadius: "8px",
    boxShadow: 24,
    p: "16px",
};

function TestBotModal({ openModal, handleClose }: any) {
    const [addNumber, SetAddNumber] = useState<boolean>(true)
    function handleCloseModal() {
        SetAddNumber(true)
        handleClose()
    }
    return (
        <Modal
            open={openModal}
            onClose={handleCloseModal}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid #DADADA", pb: "22px", }}>
                    <Box sx={{ display: "flex", alignItems: "center", gap: "12px" }}>
                        {addNumber ?
                            null : <Button sx={{minWidth:"auto",padding:"0"}} onClick={() => SetAddNumber(true)}><Image width={24} height={24} src={arrowLeft} alt="arrowLeft" /></Button>
                        }

                        <Typography id="modal-modal-title" variant="h6" sx={{ fontSize: "24px", fontWeight: "700", lineHeight: "22px", color: "#1F1F1F" }}>
                            Test this bot on your phone
                        </Typography>
                    </Box>
                    <Button onClick={handleCloseModal} sx={{ '&:hover': { bgcolor: 'transparent', } }}>
                        <Image width={24} height={24} src={close} alt="close" />
                    </Button>
                </Box>
                {addNumber ?
                    <>
                        <Box sx={{ mt: "28px", display: "flex", justifyContent: "space-between", alignItems: "center", px: "8px" }}>
                            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: "16px" }}>
                                <Image width={24} height={24} src={comment} alt="comment" />
                                <Box>
                                    <Typography sx={{ fontSize: "16px", fontWeight: "500", lineHeight: "22px", color: "#1F1F1F" }}>Andrew Brown</Typography>
                                    <Typography sx={{ fontSize: "14px", fontWeight: "400", lineHeight: "22px", color: "#707070" }}>+1 98364 82929</Typography>
                                </Box>
                            </Box>
                            <Button sx={{ border: "1px solid #008DF1", px: "20px", py: "10px", borderRadius: "4px" }}>
                                <Typography sx={{ fontSize: "16px", fontWeight: "500", lineHeight: "22px", color: "#008DF1" }}>Test Bot</Typography>
                            </Button>
                        </Box>
                        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", px: "8px", mt: "40px" }}>
                            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: "16px" }}>
                                <Image width={24} height={24} src={comment} alt="comment" />
                                <Box>
                                    <Typography sx={{ fontSize: "16px", fontWeight: "500", lineHeight: "22px", color: "#1F1F1F" }}>Andrew Brown</Typography>
                                    <Typography sx={{ fontSize: "14px", fontWeight: "400", lineHeight: "22px", color: "#707070" }}>+1 98364 82929</Typography>
                                </Box>
                            </Box>
                            <Button sx={{ border: "1px solid #008DF1", px: "20px", py: "10px", borderRadius: "4px" }}>
                                <Typography sx={{ fontSize: "16px", fontWeight: "500", lineHeight: "22px", color: "#008DF1" }}>Test Bot</Typography>
                            </Button>
                        </Box>
                        <Box sx={{ display: "flex", justifyContent: "flex-end", alignItems: "center", px: "8px", mt: "50px" }}>
                            <Button onClick={() => SetAddNumber(false)} sx={{ bgcolor: "#008DF1", borderRadius: "4px", '&:hover': { bgcolor: '#008DF1', } }}>
                                <Typography sx={{ fontSize: "14px", fontWeight: "500", lineHeight: "22px", color: "#ffffff" }}>Add Number</Typography>
                            </Button>
                        </Box>
                    </> :
                    <>
                        <Box sx={{ display: "flex", justifyContent: "flex-start", alignItems: "flex-start", gap: "12px", flexDirection: "column", mt: "16px", px: "8px" }}>
                            <Typography sx={{ fontSize: "16px", fontWeight: "500", lineHeight: "22px", color: "#1F1F1F" }}>Name</Typography>
                            <Box sx={{ width: "100%" }}>
                                <TextFieldWithoutLabel placeholder="Enter Name" id="custom-css-outlined-input" />
                            </Box>
                        </Box>
                        <Box sx={{ display: "flex", justifyContent: "flex-start", alignItems: "flex-start", gap: "12px", flexDirection: "column", mt: "16px", px: "8px" }}>
                            <Typography sx={{ fontSize: "16px", fontWeight: "500", lineHeight: "22px", color: "#1F1F1F" }}>Phone Number</Typography>
                            <Box sx={{ width: "100%", display: "flex", justifyContent: "flex-start", alignItems: "center", gap: "12px" }}>
                                <Box sx={{ bgcolor: "#C9E9FF", display: "flex", justifyContent: "flex-start", alignItems: "center", gap: "4px", py: "10px", px: "12px", borderRadius: "30px" }}>
                                    <Image width={24} height={24} src={flagAmerica} alt="flagAmerica" />
                                    <Typography sx={{ fontSize: "12px", fontWeight: "500", lineHeight: "22px", color: "#008DF1" }}>+1</Typography>
                                </Box>
                                <TextFieldWithoutLabel placeholder="Enter Phone Number" id="custom-css-outlined-input" />
                            </Box>
                        </Box>
                        <Box sx={{ display: "flex", justifyContent: "flex-end", alignItems: "center", px: "8px", mt: "50px" }}>
                            <Button sx={{ bgcolor: "#008DF1", borderRadius: "4px", '&:hover': { bgcolor: '#008DF1', } }}>
                                <Typography sx={{ fontSize: "14px", fontWeight: "500", lineHeight: "22px", color: "#ffffff" }}>Add Number & Test</Typography>
                            </Button>
                        </Box>
                    </>
                }

            </Box>
        </Modal>
    )
}
export default TestBotModal