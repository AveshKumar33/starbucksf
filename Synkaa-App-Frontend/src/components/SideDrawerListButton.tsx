import { Box, Button, Typography } from "@mui/material";
import Drawer from "@mui/material/Drawer";
import React, { useCallback, useEffect, useState } from "react";
import delay from "@/assets/images/delay.svg";
// import close from "@/assets/images/close.svg";
import deleteIconWhite from "@/assets/images/deleteIconWhite.svg";
import Image from "next/image";
import addInteractionWhite from "@/assets/images/addInteractionWhite.svg";
import { TextFieldListButton, TextFieldWithoutLabel } from "@/theme/materialComponents/TextField";
// import whatsAppBg from "../../../../src/assets/images/whatsAppBg.jpg";
import { useNodeId, useReactFlow } from "reactflow";
import { useInputValue } from "@/app/helpers/useInputHook";

type Anchor = "left" | "top" | "bottom";
type ListItem = {
  id: string;
  title: string;
};

export default function SideDrawerListButton({
  handleClickInteraction,
  cancelButton,
  header,
  setHeader,
  body,
  setBody,
  listHeader,
  setListHeader,
  saveListNode,
  listItemObject,
  setListItemObject,
  drawerOpen,
  setDrawerOpen,
  data,
  parentId,
  addNewNode,
  nodes /*,onChange*/,
}: any) {
  const [listItem, setListItem] = useState<any>(
    listItemObject ? listItemObject : <>{data.listItemObject ? data.listItemObject : []}</>,
  );
  const [headerError, setHeaderError] = useState<string | null>(null);
  const [bodyError, setBodyError] = useState<string | null>(null);
  const [listHeaderError, setListHeaderError] = useState<string | null>(null);
  const [updatedNodeData, setUpdatedNodeData] = useState(nodes);
  const { setNodes, setEdges } = useReactFlow();
  const nodeId: any = useNodeId();
  const date_new = new Date();
  const ChildId = date_new.getTime();
  const { /*globalListItems,*/ setGlobalListItems, setInputValue } = useInputValue();
  const addObjectToList = (newItem: ListItem) => {
    setListItem((prevList: any) => [...prevList, newItem]);
  };
  useEffect(() => {
    setUpdatedNodeData(nodes);
    // console.log(globalListItems);
  }, [nodes]);

  const updateItemNameById = (idToUpdate: string, value: string) => {
    const updatedList = listItem.map((item: any) => {
      if (item.id === idToUpdate) {
        return { ...item, title: value };
      }
      return item;
    });
    setInputValue(value);
    setGlobalListItems(updatedList);
    setListItem(updatedList);
    setListItemObject(updatedList);
  };
  // console.log("SideDrawerListButton", nodeId);
  function handleListItem() {
    const newItem = { id: `Child-${ChildId}`, title: `Item ${listItem.length + 1}` };
    setInputValue(newItem.title);
    setListItemObject((prevListItem: any) => [...prevListItem, newItem]);
    addObjectToList(newItem);
    addNewNode(setNodes, setEdges, null, updatedNodeData, parentId, ChildId, "addNewItemNode");
  }
  const removeItem = (idToRemove: string) => {
    const updatedList = listItem.filter((item: any) => item.id !== idToRemove);
    setListItem(updatedList);
    setListItemObject(updatedList);
  };

  const deleteNode = useCallback(
    (idToRemove: string) => {
      setNodes((nodes) => nodes.filter((node) => node.id !== idToRemove));
      setEdges((edges) => edges.filter((edge) => edge.source !== idToRemove));
    },
    [nodeId, setNodes, setEdges],
  );

  const handleSaveNode = () => {
    // console.log("List Headerr", listHeader);
    if (header === "" || !header || header === undefined || header.length > 50) {
      setHeaderError("Invalid Header");
    } else if (body === "" || !body || body === undefined) {
      setBodyError("Invalid Body");
    } else if (!listHeader || listHeader === undefined || listHeader.length > 15) {
      // console.log("HEYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYY");
      setListHeaderError("Invalid List Header/CTA");
    } else {
      setHeaderError(null);
      setBodyError(null);
      setListHeaderError(null);
      saveListNode();
      setDrawerOpen({ left: false });
    }

    setInputValue("");
  };

  const handleCancelNode = () => {
    setDrawerOpen({ left: false });
    cancelButton();
    {
      data.text && data.text.header !== "" ? setHeader(data.text.header) : setHeader("");
    }
    {
      data.text && data.text.body !== "" ? setBody(data.text.body) : setBody("");
    }
    {
      data.text && data.text.listHeader !== ""
        ? setListHeader(data.text.listHeader)
        : setListHeader("");
    }
    setHeaderError(null);
    setBodyError(null);
    setListHeaderError(null);
  };

  useEffect(() => console.log("listItem", listItem), [listItem]);
  const toggleDrawer =
    (anchor: Anchor, open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === "keydown" &&
        ((event as React.KeyboardEvent).key === "Tab" ||
          (event as React.KeyboardEvent).key === "Shift")
      ) {
        return;
      }

      setDrawerOpen({ ...drawerOpen, [anchor]: open });
    };
  const list = (anchor: Anchor) => (
    <>
      <Box
        sx={{
          width: anchor === "top" || anchor === "bottom" ? "auto" : 350,
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-start",
          alignItems: "flex-start",
          height: "100%",
        }}
        role="presentation"
        onKeyDown={toggleDrawer(anchor, true)}
      >
        <Box sx={{ width: "100%", flex: "1", mt: "25px" }}>
          <Box
            sx={{
              display: "flex",
              width: "100%",
              justifyContent: "space-between",
              alignItems: "center",
              bgcolor: "#ffffff",
              px: "16px",
              pt: "8px",
              pb: "24px",
              borderRadius: "8px",
              borderBottom: "1px solid #DADADA",
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                gap: "16px",
              }}
            >
              <Image width={24} height={24} src={delay} alt="delay" />
              <Box display="flex" flexDirection="column" gap="4px">
                <Typography
                  sx={{ color: "#1F1F1F", fontSize: "16px", fontWeight: "500", textAlign: "left" }}
                >
                  List Button
                </Typography>
                <Typography sx={{ color: "#707070", fontSize: "14px", fontWeight: "400" }}>
                  Single choice menu
                </Typography>
              </Box>
            </Box>
            {/* <Button onClick={toggleDrawer(anchor, false)} sx={{ minWidth: "auto", p: "0px" }}>
              <Image width={24} height={24} src={close} alt="close" />
            </Button> */}
          </Box>
          <Box sx={{ px: "24px", mt: "18px" }} component="form" noValidate autoComplete="off">
            <Typography
              sx={{
                color: "#1F1F1F",
                fontSize: "16px",
                fontWeight: "500",
                lineHeight: "22px",
                mb: "16px",
              }}
            >
              Header <span style={{ color: "red" }}>*</span>
            </Typography>
            <TextFieldWithoutLabel
              sx={{ borderRadius: "4px", border: headerError ? "3px solid red" : "" }}
              id="outlined-multiline-flexible"
              label=""
              multiline={true}
              maxRows={4}
              value={header}
              onChange={(e: any) => {
                setHeaderError(null);
                setHeader(e.target.value);
              }}
            />
            {headerError ? (
              <Typography style={{ color: "red", marginTop: "9px", fontSize: "15px" }}>
                {headerError}
              </Typography>
            ) : (
              <Typography sx={{ color: "grey", fontWeight: 400, fontSize: "12px" }}>
                Max characters: 50
              </Typography>
            )}
          </Box>
          <Box
            sx={{ px: "24px", mt: "18px", borderBottom: "1px solid #DADADA", pb: "30px" }}
            component="form"
            noValidate
            autoComplete="off"
          >
            <Typography
              sx={{
                color: "#1F1F1F",
                fontSize: "16px",
                fontWeight: "500",
                lineHeight: "22px",
                mb: "16px",
              }}
            >
              Text <span style={{ color: "red" }}>*</span>
            </Typography>
            <TextFieldWithoutLabel
              sx={{ borderRadius: "4px" }}
              id="outlined-multiline-flexible"
              label=""
              multiline={true}
              maxRows={4}
              value={body}
              onChange={(e: any) => {
                setBodyError(null);
                setBody(e.target.value);
              }}
            />
            {bodyError && (
              <Typography style={{ color: "red", marginTop: "9px", fontSize: "15px" }}>
                {bodyError}
              </Typography>
            )}
          </Box>
          <Box
            sx={{ px: "24px", mt: "24px", borderBottom: "1px solid #DADADA", pb: "30px" }}
            component="form"
            noValidate
            autoComplete="off"
          >
            <Typography
              sx={{
                color: "#1F1F1F",
                fontSize: "16px",
                fontWeight: "500",
                lineHeight: "22px",
                mb: "16px",
              }}
            >
              List Header / CTA <span style={{ color: "red" }}>*</span>
            </Typography>
            <TextFieldWithoutLabel
              sx={{ borderRadius: "4px", border: listHeaderError ? "3px solid red" : "" }}
              id="outlined-multiline-flexible"
              label=""
              multiline={true}
              maxRows={4}
              value={listHeader}
              onChange={(e: any) => {
                setListHeaderError(null);
                setListHeader(e.target.value);
              }}
            />
            {listHeaderError ? (
              <Typography style={{ color: "red", marginTop: "9px", fontSize: "15px" }}>
                {listHeaderError}
              </Typography>
            ) : (
              <Typography sx={{ color: "grey", fontWeight: 400, fontSize: "12px" }}>
                Max characters: 15
              </Typography>
            )}
          </Box>
          <Box sx={{ px: "24px", mt: "24px" }} component="form" noValidate autoComplete="off">
            <Typography
              sx={{
                color: "#1F1F1F",
                fontSize: "16px",
                fontWeight: "500",
                lineHeight: "22px",
                mb: "16px",
              }}
            >
              Section & Items
            </Typography>
            <Box sx={{ bgcolor: "#00253F", p: "24px", borderRadius: "4px" }}>
              <Box sx={{ display: "flex", flexDirection: "column", gap: "4px", mb: "8px" }}>
                {listItem &&
                  listItem.length > 0 &&
                  listItem.map((item: ListItem, index: number) => (
                    <Box
                      key={index}
                      sx={{
                        bgcolor: "#01CBD5",
                        borderRadius: "4px",
                        p: "8px 16px",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <TextFieldListButton
                        value={item["title"]}
                        onChange={(e) => {
                          updateItemNameById(item.id, e.target.value);
                        }}
                        sx={{
                          color: "#ffffff",
                          fontSize: "16px",
                          fontWeight: "500",
                          lineHeight: "22px",
                        }}
                      />
                      <Box>
                        <Button
                          onClick={() => {
                            removeItem(item.id);
                            deleteNode(item.id);
                          }}
                          sx={{
                            bgcolor: "transparent",
                            padding: "0",
                            minWidth: "auto",
                            "&:hover": { backgroundColor: "transparent" },
                          }}
                        >
                          <Image
                            width={24}
                            height={24}
                            src={deleteIconWhite}
                            alt="deleteIconWhite"
                          />
                        </Button>
                      </Box>
                    </Box>
                  ))}
              </Box>
              <Button
                onClick={handleListItem}
                sx={{
                  bgcolor: "#008DF1",
                  padding: "7px 25px",
                  width: "100%",
                  "&:hover": { backgroundColor: "#008DF1" },
                }}
              >
                <Typography
                  sx={{ color: "#ffffff", fontSize: "16px", fontWeight: "400", lineHeight: "22px" }}
                >
                  Add New Item
                </Typography>
              </Button>
            </Box>
          </Box>
        </Box>
        <Box
          sx={{
            bgcolor: "#CCD3D9",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "16px",
            width: "100%",
            py: "25px",
            borderRadius: "4px",
            mt: "24px",
          }}
        >
          <Typography
            sx={{ color: "#1F1F1F", fontSize: "16px", fontWeight: "400", lineHeight: "22px" }}
          >
            Apply changes?
          </Typography>
          <Box sx={{ display: "flex", gap: "4px" }}>
            <Button
              onClick={handleCancelNode}
              sx={{ border: "2px solid #707070", borderRadius: "4px", padding: "5px 20px" }}
            >
              <Typography
                sx={{ color: "#1F1F1F", fontSize: "16px", fontWeight: "400", lineHeight: "22px" }}
              >
                Cancel
              </Typography>
            </Button>
            <Button
              onClick={handleSaveNode}
              sx={{
                bgcolor: "#008DF1",
                padding: "7px 25px",
                "&:hover": {
                  backgroundColor: "#008DF1",
                },
              }}
            >
              <Typography
                sx={{ color: "#ffffff", fontSize: "16px", fontWeight: "400", lineHeight: "22px" }}
              >
                Apply
              </Typography>
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
  return (
    <>
      {(["left"] as const).map((anchor) => (
        <React.Fragment key={anchor}>
          <Box
            className="nodrag"
            sx={{
              bgcolor: "#01CBD5",
              width: "100%",
              px: "16px",
              borderRadius: "4px",
              mb: "8px",
              display: "flex",
              justifyContent: "flex-start",
            }}
          >
            <Button
              onClick={toggleDrawer(anchor, true)}
              sx={{ maxWidth: "auto", flex: "1", p: "0" }}
            >
              <Typography
                sx={{
                  color: "#ffffff",
                  fontSize: "14px",
                  fontWeight: "500",
                  textAlign: "start",
                  width: "100%",
                }}
              >
                View Menu
              </Typography>
            </Button>
            <Box sx={{ ml: "auto", padding: "0", minWidth: "auto" }}>
              <Button className="nodrag" onClick={handleClickInteraction} sx={{ maxWidth: "auto" }}>
                <Image width={36} height={36} src={addInteractionWhite} alt="addInteractionWhite" />
              </Button>
            </Box>
          </Box>

          <Drawer anchor={anchor} open={drawerOpen[anchor]}>
            {list(anchor)}
          </Drawer>
        </React.Fragment>
      ))}
    </>
  );
}
