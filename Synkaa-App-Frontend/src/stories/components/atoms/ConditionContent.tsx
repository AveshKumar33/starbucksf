import { Box, Button, InputAdornment, MenuItem, Popover, Typography } from "@mui/material";
import Image from "next/image";
import condition from "../../../../src/assets/images/condition.svg";
import close from "../../../../src/assets/images/close.svg";
import phoneNumber from "../../../../src/assets/images/phoneNumber.svg";
import AddIcon from '@mui/icons-material/Add';
import deleteIconGrey from "../../../../src/assets/images/deleteIconGrey.svg";
import { TextFieldWithoutLabel } from "../../../../src/theme/materialComponents/TextField";
import { SelectWithoutLabel } from "../../../../src/theme/materialComponents/SelectBox";
import React, { useState} from "react";



export function ConditionContent(props: any) {
    const { toggleDrawer, onConditionUpdate } = props;
    const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
    const [operand1, setOperand1] = useState('');
    const [operator, setOperator] = useState('');
    const [operand2, setOperand2] = useState('');

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };
    const handleApply = () => {
        const newCondition = [operand1, operator, operand2];
        onConditionUpdate(newCondition);
    };
    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;
    return (
        <Box sx={{ minWidth: "400px", display: "flex", flexDirection: "column", height: "100%" }}>

            <Box sx={{ display: "flex", gap: "16px", justifyContent: "space-between", alignItems: "center", px: "16px", py: "24px", borderBottom: "1px solid #DADADA" }}>
                <Box sx={{ display: "flex", gap: "16px", justifyContent: "flex-start", alignItems: "center" }}>
                    <Image width={24} height={24} src={condition} alt="condition" />
                    <Box display="flex" flexDirection="column" gap="4px">
                        <Typography sx={{ color: "#1F1F1F", fontSize: "16px", fontWeight: "500" }} >Conditions</Typography>
                        <Typography sx={{ color: "#707070", fontSize: "14px", fontWeight: "400" }} >Split your flows</Typography>
                    </Box>
                </Box>
                <Image width={24} height={24} src={close} alt="close" />
            </Box>
            <Box sx={{ width: "100%", flex: "1" }}>
                <Box sx={{ bgcolor: "#F4F4F4", p: "16px 16px 32px 16px", my: "16px", mx: "8px", borderRadius: "10px" }}>
                    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <Typography sx={{ color: "#00253F", fontSize: "16px", fontWeight: "500" }} >Set the Condition(s)</Typography>
                        <Image width={24} height={24} src={deleteIconGrey} alt="deleteIconGrey" />
                    </Box>
                    <Box sx={{ mt: "16px" }}>
                        <TextFieldWithoutLabel
                            value={operand1}
                            onChange={(e) => setOperand1(e.target.value)}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="start">
                                        <Button aria-describedby={id} onClick={handleClick} sx={{
                                            bgcolor: "#C9E9FF", px: '10px', py: "4px", borderRadius: "25px", '&:hover': {
                                                backgroundColor: '#C9E9FF',
                                            },
                                        }}>
                                            <Typography sx={{ color: "#008DF1", fontSize: "14px", fontWeight: "500" }}>Variable</Typography>
                                        </Button>
                                    </InputAdornment>
                                ),
                            }} />
                        <Popover
                            id={id}
                            open={open}
                            anchorEl={anchorEl}
                            onClose={handleClose}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                        >
                            <Box sx={{ border: "1px soild rgba(0, 0, 0, 0.10)", py: "8px", width: "300px" }}>
                                <Typography sx={{ color: "#5E5E5E", fontSize: "16px", fontWeight: "400", mx: "16px", my: "8px" }}>Lead Data</Typography>
                                <Box>
                                    <Box sx={{ display: 'flex', gap: "10px", justifyContent: "flex-start", alignItems: "center", mx: "16px", my: "8px" }}>
                                        <Box sx={{ bgcolor: "#8700F0", borderRadius: "50%", display: 'flex', justifyContent: "center", alignItems: "center", width: '24px', height: '24px' }}>
                                            <Typography sx={{ color: "#ffffff", fontSize: "14px", fontWeight: "400" }}>S</Typography>
                                        </Box>
                                        <Typography sx={{ color: "#5E5E5E", fontSize: "16px", fontWeight: "400" }}>Name</Typography>
                                    </Box>
                                    <Box sx={{ display: 'flex', gap: "10px", justifyContent: "flex-start", alignItems: "center", mx: "16px", my: "8px" }}>
                                        <Image width={24} height={24} src={phoneNumber} alt="phoneNumber" />
                                        <Typography sx={{ color: "#5E5E5E", fontSize: "16px", fontWeight: "400" }}>Phone Number</Typography>
                                    </Box>
                                </Box>
                            </Box>
                        </Popover>
                    </Box>
                    <Box sx={{ my: "16px", width: "100%" }}>
                        <SelectWithoutLabel
                            value={operator}
                            onChange={(event) => setOperator(event.target.value as string)}
                            variant="outlined"
                            sx={{ width: "100%", height: "40px" }}>
                            <MenuItem sx={{ color: "#000" }} value='Equals to'>
                                <Typography sx={{ color: "#79767D", fontSize: "16px", fontWeight: "400" }}>Equals to</Typography>
                            </MenuItem>
                            <MenuItem value="Does Not Equals to">
                                <Typography sx={{ color: "#79767D", fontSize: "16px", fontWeight: "400" }}>Does Not Equals to</Typography>
                            </MenuItem>
                            <MenuItem value="Contains">
                                <Typography sx={{ color: "#79767D", fontSize: "16px", fontWeight: "400" }}>Contains</Typography>
                            </MenuItem>
                            <MenuItem value="Greater than">
                                <Typography sx={{ color: "#79767D", fontSize: "16px", fontWeight: "400" }}>Greater than</Typography>
                            </MenuItem>
                            <MenuItem value="Less than">
                                <Typography sx={{ color: "#79767D", fontSize: "16px", fontWeight: "400" }}>Less than</Typography>
                            </MenuItem>
                        </SelectWithoutLabel>
                    </Box>
                    <Box>
                        <TextFieldWithoutLabel
                            value={operand2}
                            onChange={(e) => setOperand2(e.target.value)}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="start">
                                        <Button sx={{
                                            bgcolor: "#C9E9FF", px: '10px', py: "4px", borderRadius: "25px", '&:hover': {
                                                backgroundColor: '#C9E9FF',
                                            },
                                        }}>
                                            <Typography sx={{ color: "#008DF1", fontSize: "14px", fontWeight: "500" }}>Variable</Typography>
                                        </Button>
                                    </InputAdornment>
                                ),
                            }} />
                    </Box>
                </Box>
                <Box sx={{ display: "flex", justifyContent: "flex-end", mr: "24px" }}>
                    <Button startIcon={<AddIcon />} sx={{
                        bgcolor: "#C9E9FF", px: '10px', py: "4px", borderRadius: "25px", '&:hover': {
                            backgroundColor: '#C9E9FF'
                        },
                    }}>
                        <Typography sx={{ color: "#008DF1", fontSize: "14px", fontWeight: "500" }}>Add New Condition</Typography>
                    </Button>
                </Box>
            </Box>
            <Box sx={{
                bgcolor: "#CCD3D9", display: "flex", justifyContent: "center",
                alignItems: "center", gap: "16px", width: "100%", py: "25px", borderRadius: "4px", mt: "24px"
            }}>
                <Typography sx={{ color: "#1F1F1F", fontSize: "16px", fontWeight: "400", lineHeight: "22px" }} >Apply changes?</Typography>
                <Box sx={{ display: "flex", gap: "4px" }}>
                    <Button sx={{ border: "2px solid #707070", borderRadius: "4px", padding: "5px 20px" }}>
                        <Typography sx={{ color: "#1F1F1F", fontSize: "16px", fontWeight: "400", lineHeight: "22px" }} >Cancel</Typography>
                    </Button>
                    <Button onClick={() => { toggleDrawer; handleApply() }} sx={{
                        bgcolor: "#008DF1", padding: "7px 25px", '&:hover': {
                            backgroundColor: '#008DF1',
                        },
                    }}>
                        <Typography sx={{ color: "#ffffff", fontSize: "16px", fontWeight: "400", lineHeight: "22px" }} >Apply</Typography>
                    </Button>
                </Box>
            </Box>
        </Box>

    )
}