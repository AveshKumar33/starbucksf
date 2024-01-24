import { TextFieldWithoutLabel, TextFieldListButton } from "../../../../src/theme/materialComponents/TextField";
import { Box, Typography, Button } from "@mui/material";
import Image from "next/image";
import delay from "../../../../src/assets/images/delay.svg";
import deleteIconWhite from "../../../../src/assets/images/deleteIconWhite.svg";
import close from "../../../../src/assets/images/close.svg";
type ListItemType = {
    id: string;
    name: string;
};

export const ListDrawerContent = ({ anchor, toggleDrawer, listItem, updateItemNameById, deleteNode, removeItem, handleListItem }: any) => (
    <>
        <Box
            sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 350, display: "flex", flexDirection: "column", justifyContent: "flex-start", alignItems: "flex-start", height: "100%" }}
            role="presentation"
            onKeyDown={toggleDrawer(anchor, true)}
        >
            <Box sx={{ width: "100%", flex: "1", mt: "25px" }}>
                <Box sx={{
                    display: "flex", width: "100%", justifyContent: "space-between",
                    alignItems: "center", bgcolor: "#ffffff", px: "16px",
                    pt: "8px", pb: "24px", borderRadius: "8px", borderBottom: "1px solid #DADADA"
                }}>
                    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: "16px" }}>
                        <Image width={24} height={24} src={delay} alt="delay" />
                        <Box display="flex" flexDirection="column" gap="4px">
                            <Typography sx={{ color: "#1F1F1F", fontSize: "16px", fontWeight: "500", textAlign: "left" }} >List Button</Typography>
                            <Typography sx={{ color: "#707070", fontSize: "14px", fontWeight: "400" }} >Single choice menu</Typography>
                        </Box>
                    </Box>
                    <Button onClick={toggleDrawer(anchor, false)} sx={{ minWidth: "auto", p: "0px" }}>
                        <Image width={24} height={24} src={close} alt="close" />
                    </Button>
                </Box>
                <Box sx={{ px: "24px", mt: "18px", }} component="form" noValidate autoComplete="off">
                    <Typography sx={{ color: "#1F1F1F", fontSize: "16px", fontWeight: "500", lineHeight: "22px", mb: "16px" }}>Header</Typography>
                    <TextFieldWithoutLabel
                        sx={{ borderRadius: "4px" }}
                        id="outlined-multiline-flexible"
                        label=""
                        multiline={true}
                        maxRows={4}
                    />

                </Box>
                <Box sx={{ px: "24px", mt: "18px", borderBottom: "1px solid #DADADA", pb: "30px" }} component="form" noValidate autoComplete="off">
                    <Typography sx={{ color: "#1F1F1F", fontSize: "16px", fontWeight: "500", lineHeight: "22px", mb: "16px" }}>Text</Typography>
                    <TextFieldWithoutLabel
                        sx={{ borderRadius: "4px" }}
                        id="outlined-multiline-flexible"
                        label=""
                        multiline={true}
                        maxRows={4}
                    />
                </Box>
                <Box sx={{ px: "24px", mt: "24px", borderBottom: "1px solid #DADADA", pb: "30px" }} component="form" noValidate autoComplete="off">
                    <Typography sx={{ color: "#1F1F1F", fontSize: "16px", fontWeight: "500", lineHeight: "22px", mb: "16px" }}>List Header / CTA</Typography>
                    <TextFieldWithoutLabel
                        sx={{ borderRadius: "4px" }}
                        id="outlined-multiline-flexible"
                        label=""
                        multiline={true}
                        maxRows={4}
                    />

                </Box>
                <Box sx={{ px: "24px", mt: "24px", }} component="form" noValidate autoComplete="off">
                    <Typography sx={{ color: "#1F1F1F", fontSize: "16px", fontWeight: "500", lineHeight: "22px", mb: "16px" }}>Section & Items</Typography>
                    <Box sx={{ bgcolor: "#00253F", p: "24px", borderRadius: "4px" }}>
                        <Box sx={{ display: "flex", flexDirection: "column", gap: "4px", mb: "8px" }}>
                            {listItem.map((item: ListItemType, index: any) => (
                                <Box key={index} sx={{ bgcolor: "#01CBD5", borderRadius: "4px", p: "8px 16px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                    <TextFieldListButton value={item["name"]} onChange={e => { updateItemNameById(item.id, e.target.value) }} sx={{ color: "#ffffff", fontSize: "16px", fontWeight: "500", lineHeight: "22px" }} />
                                    <Box>
                                        <Button onClick={() => { removeItem(item.id); deleteNode() }} sx={{ bgcolor: "transparent", padding: "0", minWidth: "auto", '&:hover': { backgroundColor: 'transparent' } }}>
                                            <Image width={24} height={24} src={deleteIconWhite} alt="deleteIconWhite" />
                                        </Button>
                                    </Box>
                                </Box>

                            ))}
                        </Box>
                        <Button onClick={handleListItem} sx={{ bgcolor: "#008DF1", padding: "7px 25px", width: "100%", '&:hover': { backgroundColor: '#008DF1' } }}>
                            <Typography sx={{ color: "#ffffff", fontSize: "16px", fontWeight: "400", lineHeight: "22px" }} >Add New Item</Typography>
                        </Button>
                    </Box>
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
                    <Button onClick={toggleDrawer(anchor, false)} sx={{
                        bgcolor: "#008DF1", padding: "7px 25px", '&:hover': {
                            backgroundColor: '#008DF1',
                        },
                    }}>
                        <Typography sx={{ color: "#ffffff", fontSize: "16px", fontWeight: "400", lineHeight: "22px" }} >Apply</Typography>
                    </Button>
                </Box>
            </Box>
        </Box>
        {/* <Box sx={{ position: "fixed", left: "400px", top: "20%", bgcolor: "white", width: "350px", height: "350px", borderRadius: "8px", overflow: "hidden" }}>
            <Box
                sx={{
                    position: "absolute",
                    width: "100%",
                    height: "100%",
                    top: "0",
                    bottom: "0",
                    left: "0",
                    right: "0",
                    zIndex: "-1"
                }}
            >
                <Image src={whatsAppBg} alt="whatsAppBg" layout="fill" objectFit="cover" />
            </Box>
            <Box sx={{ zIndex: "9", bgcolor: "#ffffff", m: "24px 38px 8px 24px", p: "8px", borderRadius: "4px" }}>
                <Typography sx={{ color: "#1F1F1F", fontSize: "14px", fontWeight: "500" }}>Welcome to Fortune Hotels</Typography>
                <Typography sx={{ color: "#79767D", fontSize: "12px", fontWeight: "400" }}>We are delighted to have you dine with us.</Typography>
            </Box>
            <Box sx={{ zIndex: "9", bgcolor: "#ffffff", m: "0px 38px 24px 24px", p: "8px", borderRadius: "4px" }}>
                <Typography sx={{ color: "#008DF1", fontSize: "14px", fontWeight: "500", textAlign: "center" }}>View Menu</Typography>
            </Box>
            <Box sx={{ zIndex: "9", bgcolor: "#ffffff", mt: "24px", p: "8px", borderRadius: "4px", height: "100%" }}>
                <Typography sx={{ color: "#1F1F1F", fontSize: "14px", fontWeight: "500", textAlign: "center" }}>View Menu</Typography>
                <FormControl sx={{ width: "100%" }}>

                    <RadioGroup
                        aria-labelledby="demo-radio-buttons-group-label"
                        defaultValue="Vegetarian"
                        name="radio-buttons-group"
                    >
                        <FormControlLabel sx={{
                            justifyContent: "space-between", px: "8px", m: "24px 0 14px 0",
                            "& .MuiFormControlLabel-label": {
                                fontSize: "14px", // Set the font size to 14
                            },
                        }} value="Vegetarian" labelPlacement="start" control={<Radio />} label="Vegetarian" />
                        <FormControlLabel value="Non - Vegetarian" sx={{
                            justifyContent: "space-between", px: "8px", m: "0",
                            "& .MuiFormControlLabel-label": {
                                fontSize: "14px", // Set the font size to 14
                            },
                        }} labelPlacement="start" control={<Radio />} label="Non - Vegetarian" />
                    </RadioGroup>
                </FormControl>
            </Box>
        </Box> */}
    </>
);