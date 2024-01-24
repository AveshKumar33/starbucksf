import { Box, Typography, Button, Drawer } from "@mui/material";
import { Handle, Position, useEdges, useNodeId, useNodes } from "reactflow";
import React, { useCallback, useEffect, useState } from "react";
import listTrigger from "@/assets/images/listTrigger.svg";
import triggerMenu from "@/assets/images/triggerMenu.svg";
import Image from "next/image";
import InteractionPopover from "./Intreactions";
import addNewNode from "@/app/helpers/newNode";
import ContextMenu from "./contextMenuPopover";
import { ListDrawerContent } from "./common/ListDrawerContent";

import MenuIcon from "@mui/icons-material/Menu";
import addInteractionWhite from "@/assets/images/addInteractionWhite.svg";

type Anchor = "left" | "top" | "bottom";
type ListItem = {
  id: string;
  title: string;
};

function ListButtonNode({ setNodes, setEdges, data }: any) {
  const node: any = useNodes();
  const edge: any = useEdges();
  const nodeId: any = useNodeId();
  const parentId: any = nodeId;
  const [drawerOpen, setDrawerOpen] = useState({ left: false });
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const [anchorElMenu, setAnchorElMenu] = useState<HTMLButtonElement | null>(null);
  const [header, setHeader] = React.useState<string>(
    data.text && data.text.header ? data.text.header : "",
  );
  const [body, setBody] = React.useState<string>(data.text && data.text.body ? data.text.body : "");
  const [listHeader, setListHeader] = React.useState<string>(
    data.text && data.text.listHeader ? data.text.listHeader : "",
  );
  const openMenu = Boolean(anchorElMenu);
  const [listItem, setListItem] = useState<any>(
    data.text && data.listItemObject && data.listItemObject.length > 0 ? data.listItemObject : [],
  );

  const idMenu = openMenu ? "simple-popover" : undefined;
  // const date_new = new Date();
  // const ChildId = date_new.getTime();
  const [activeHandle, setActiveHandle] = useState<string | null>(null);
  const [sourceHandleArray, setSourceHandleArray] = useState<any>(null);
  const [targetHandleArray, setTargetHandleArray] = useState<any>(null);

  useEffect(() => {
    const sourceHandles = edge.map((edge: any) => edge.sourceHandle);
    setSourceHandleArray(sourceHandles);
    const targetHandles = edge.map((edge: any) => edge.targetHandle);
    setTargetHandleArray(targetHandles);
  }, [edge]);

  const nodeHandlerId = (handleId: string) => {
    setActiveHandle(handleId);
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
  const addObjectToList = (newItem: ListItem) => {
    setListItem((prevList: any) => [...prevList, newItem]);
  };

  function handleListItem() {
    const newItem = {
      id: `Child-${listItem.length}${nodeId}`,
      title: `Item ${listItem.length + 1}`,
    };

    addObjectToList(newItem);
  }

  const deleteNode = useCallback(
    (idToRemove: string) => {
      setNodes((nodes: any) => nodes.filter((node: any) => node?.id !== idToRemove));
      setEdges((edges: any) => edges.filter((edge: any) => edge.source !== idToRemove));
    },
    [nodeId, setNodes, setEdges, node],
  );

  const removeItem = (idToRemove: string) => {
    const updatedList = listItem.filter((item: any) => item.id !== idToRemove);
    setNodes((prevNodes: any) =>
      prevNodes.map((node: any) => {
        if (node.id === parentId) {
          let updatedData = { ...node.data };
          updatedData.listItemObject = updatedList;
          return { ...node, data: updatedData };
        }
        return node;
      }),
    );
    setListItem(updatedList);
  };

  const updateItemNameById = (idToUpdate: string, value: string) => {
    const updatedList = listItem.map((item: any) => {
      if (item.id === idToUpdate) {
        return { ...item, title: value };
      }
      return item;
    });

    setListItem(updatedList);
  };
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

  const saveListNode = () => {
    if (listItem.length > 0) {
      listItem.map((itemObject: any) =>
        setNodes((prevNodes: any) =>
          prevNodes.map((node: any) => {
            if (node.id === nodeId) {
              let updatedData = { ...node.data };
              if (header !== "") {
                updatedData.text = { ...updatedData.text, header };
              }
              if (body !== "") {
                updatedData.text = { ...updatedData.text, body };
              }
              if (listHeader !== "") {
                updatedData.text = { ...updatedData.text, listHeader };
              }
              if (listItem) {
                updatedData = { ...updatedData, listItemObject: listItem };
              }
              return { ...node, data: updatedData };
            }
            if (node.id === itemObject.id) {
              let updatedData = { ...node.data };
              if (updatedData.text === "") {
                updatedData = { ...updatedData, text: itemObject.title };
                return { ...node, data: updatedData };
              }
            }
            return node;
          }),
        ),
      );
    } else {
      setNodes((prevNodes: any) =>
        prevNodes.map((node: any) => {
          if (node.id === nodeId) {
            let updatedData = { ...node.data };
            if (header !== "") {
              updatedData.text = { ...updatedData.text, header };
            }
            if (body !== "") {
              updatedData.text = { ...updatedData.text, body };
            }
            if (listHeader !== "") {
              updatedData.text = { ...updatedData.text, listHeader };
            }
            return { ...node, data: updatedData };
          }
          return node;
        }),
      );
    }
    setDrawerOpen({ left: false });
  };

  const handleClickInteraction = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleCancelButton = () => {
    setListHeader(listHeader);
    setBody(body);
    setHeader(header);
    setListItem(listItem);
    setDrawerOpen({ left: false });
  };

  function doValuesCoexist(id: any) {
    return sourceHandleArray?.includes(id);
  }

  function doTargetCoexist(id: any) {
    return targetHandleArray?.includes(id);
  }
  return (
    <>
      <Box
        sx={{
          width: "395px",
          height: "auto",
          bgcolor: "#fff",
          p: "8px",
          overflow: "hidden",
          borderRadius: "8px",
          // minHeight:currentNodeState?`${currentNodeState.height}px `
        }}
      >
        {/* Input handle */}
        <Handle
          type="target"
          id={nodeId}
          position={Position.Left}
          isConnectable={!doTargetCoexist(nodeId)}
          style={{ background: "#01CBD5", width: "15px", height: "15px" }}
          onConnect={(params: any) => console.log("handle onConnect target", params)}
        />

        <>
          {(["left"] as const).map((anchor) => (
            <React.Fragment key={anchor}>
              <Box
                className="nodrag"
                sx={{
                  display: "flex",
                  width: "100%",
                  gap: "16px",
                  alignItems: "center",
                  p: "8px",
                  mb: "12px",
                  justifyContent: "space-between",
                  borderBottom: "1px solid #DADADA",
                }}
              >
                <Button onClick={toggleDrawer(anchor, true)} sx={{ flex: 1, gap: "16px" }}>
                  <Image width={24} height={24} src={listTrigger} alt="listTrigger" />
                  <Box display="flex" flexDirection="column" gap="4px" sx={{ flex: "1" }}>
                    <Typography
                      sx={{
                        color: "#1F1F1F",
                        fontSize: "16px",
                        fontWeight: "500",
                        textAlign: "left",
                      }}
                    >
                      List Button
                    </Typography>
                    <Typography
                      sx={{
                        color: "#707070",
                        fontSize: "14px",
                        fontWeight: "400",
                        textAlign: "left",
                      }}
                    >
                      Single choice menu
                    </Typography>
                  </Box>
                </Button>
                <Box>
                  <Button
                    aria-describedby={idMenu}
                    onClick={handleClickMenu}
                    sx={{
                      ml: "auto",
                      padding: "0",
                      "&:hover": {
                        backgroundColor: "transparent",
                      },
                    }}
                  >
                    <Image width={24} height={24} src={triggerMenu} alt="triggerMenu" />
                  </Button>
                </Box>
              </Box>

              <Drawer
                anchor={anchor}
                open={drawerOpen[anchor]}
                // onClose={toggleDrawer(anchor, false)}
              >
                <ListDrawerContent
                  toggleDrawer={toggleDrawer}
                  listItem={listItem}
                  updateItemNameById={updateItemNameById}
                  deleteNode={deleteNode}
                  removeItem={removeItem}
                  handleListItem={handleListItem}
                  anchor={anchor}
                  header={header}
                  setHeader={setHeader}
                  body={body}
                  setBody={setBody}
                  listHeader={listHeader}
                  setListHeader={setListHeader}
                  saveListNode={saveListNode}
                  data={data}
                  cancelButton={handleCancelButton}
                  // handleHeight={handleHeight(nodeId)}
                />
              </Drawer>
            </React.Fragment>
          ))}
        </>
        <Box sx={{ bgcolor: "#F0F6FE", p: "10px", borderRadius: "8px", mb: "12px" }}>
          <Typography sx={{ color: "#1F1F1F", fontSize: "14px", fontWeight: "500" }}>
            {header !== "" ? (
              header
            ) : (
              <>{data?.text?.header !== undefined ? data.text.header : "Add header for message"}</>
            )}
          </Typography>
          <Typography sx={{ color: "#707070", fontSize: "16px", fontWeight: "400" }}>
            <Typography sx={{ color: "#707070", fontSize: "16px", fontWeight: "400" }}>
              {body !== "" ? (
                body
              ) : (
                <>{data?.text?.body !== undefined ? data.text.body : "Add body of message"}</>
              )}
            </Typography>
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "10px",
            borderBottom: "1px solid #707070",
            paddingBottom: "5px",
          }}
        >
          <Typography
            sx={{
              color: "#707070",
              fontSize: "16px",
              fontWeight: "700",
              display: "flex",
              alignItems: "center",
            }}
          >
            <MenuIcon sx={{ marginRight: "5px" }} />
            {listHeader !== "" ? (
              listHeader
            ) : (
              <>{data?.text?.listHeader !== undefined ? data.text.listHeader : "Add list header"}</>
            )}
          </Typography>
        </Box>
        {listItem.map((item: ListItem, index: any) => {
          return (
            <Box
              key={index}
              sx={{
                bgcolor: "#01CBD5",
                borderRadius: "4px",
                p: "8px 16px",
                mt: "8px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                position: "relative",
              }}
            >
              <Box>
                <Typography sx={{ color: "#ffffff", fontSize: "16px", fontWeight: "500" }}>
                  {item.title}
                </Typography>
              </Box>
              <Box sx={{ ml: "auto", padding: "0", minWidth: "auto" }}>
                <Button
                  disabled={doValuesCoexist(`Child-${index}${nodeId}`)}
                  key={`Child-${index}${nodeId}`}
                  sx={{ maxWidth: "auto" }}
                  onClick={(e) => {
                    handleClickInteraction(e);
                    nodeHandlerId(`Child-${index}${nodeId}`);
                  }}
                >
                  <Image
                    width={36}
                    height={36}
                    src={addInteractionWhite}
                    alt="addInteractionWhite"
                  />
                </Button>
              </Box>
              <Handle
                type="source"
                position={Position.Right}
                id={`Child-${index}${nodeId}`}
                isConnectable={!doValuesCoexist(`Child-${index}${nodeId}`)}
                style={{
                  background: "#01CBD5",
                  width: "15px",
                  height: "15px",
                  top: "55%",
                  right: "-7px",
                }}
                onConnect={(params: any) => {
                  console.log("handle onConnect source", params);
                }}
              />
            </Box>
          );
        })}
      </Box>
      <InteractionPopover
        setAnchorEl={setAnchorEl}
        anchorEl={anchorEl}
        addNewNode={addNewNode}
        currentNodeId={parentId}
        setEdges={setEdges}
        setNodes={setNodes}
        handleClose={handleClose}
        nodeId={nodeId}
        activeHandle={activeHandle}
      />
      <ContextMenu anchorElMenu={anchorElMenu} handleCloseMenu={handleCloseMenu} />
    </>
  );
}

export default ListButtonNode;
