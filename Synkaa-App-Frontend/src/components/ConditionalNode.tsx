import { Box, Typography, Button, Drawer } from "@mui/material";
import { Handle, Position, useNodes, useNodeId, useEdges } from "reactflow";
import React, { useEffect, useState } from "react";
import condition from "@/assets/images/condition.svg";
import triggerMenu from "@/assets/images/triggerMenu.svg";
import ifCondition from "@/assets/images/ifCondition.svg";
import elseCondition from "@/assets/images/elseCondition.svg";
import Image from "next/image";
import InteractionPopover from "./Intreactions";
import addNewNode from "@/app/helpers/newNode";
import ContextMenu from "./contextMenuPopover";
import { ConditionContent } from "@/components/common/ConditionDrawerContent";

type Anchor = "left" | "top" | "bottom";

function ConditionalNode({ setNodes, setEdges, data }: any) {
  const node: any = useNodes();
  const edge: any = useEdges();
  const nodeId: string | null = useNodeId();
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const [anchorElMenu, setAnchorElMenu] = useState<HTMLButtonElement | null>(null);
  const [drawerOpen, setDrawerOpen] = useState({ left: false });
  const open = Boolean(anchorEl);
  const openMenu = Boolean(anchorElMenu);
  const id = open ? "simple-popover" : undefined;
  const idMenu = openMenu ? "simple-popover" : undefined;
  const [sourceHandleArray, setSourceHandleArray] = useState<any>(null);
  const [formValues, setFormValues] = useState<any>(data.text || null);
  const [activeHandle, setActiveHandle] = useState<string | null>(null);
  const initializeConditionArray = (dataText: any) => {
    if (!dataText) return [];

    const { operand1, operator, operand2, dynamicConditions } = dataText;

    let initialArray = [
      { key: "operand1", value: operand1 || "" },
      { key: "operator", value: operator || "" },
      { key: "operand2", value: operand2 || "" },
    ];

    if (dynamicConditions && dynamicConditions.length) {
      // @ts-ignore
      initialArray.push({ dynamicCondition: dynamicConditions });
    }

    return initialArray;
  };

  const [conditionArray, setConditionArray] = useState<any>(
    initializeConditionArray(data.text) || [],
  );
  const handleConditionUpdate = (newCondition: any) => {
    const arrayCondition = [
      { key: "operand1", value: newCondition.operand1 },
      { key: "operator", value: newCondition.operator },
      { key: "operand2", value: newCondition.operand2 },
      { dynamicCondition: newCondition.dynamicConditions },
    ];
    setConditionArray(arrayCondition);

    const preFilledValue = {
      operand1: newCondition.operand1,
      operator: newCondition.operator,
      operand2: newCondition.operand2,
      dynamicConditions: newCondition.dynamicConditions,
    };
    setFormValues(preFilledValue);
  };
  useEffect(() => {
    const sourceHandles = edge.map((edge: any) => edge.sourceHandle);
    setSourceHandleArray(sourceHandles);
  }, [edge]);
  const nodeHandlerId = (handleId: string) => {
    setActiveHandle(handleId);
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
  useEffect(() => {
    setNodes((prevNodes: any) =>
      prevNodes.map((node: any) => {
        if (node.id === nodeId) {
          return { ...node, data: { ...node.data, text: formValues } };
        }
        return node;
      }),
    );
  }, [formValues]);
  function doValuesCoexist(id: any) {
    return sourceHandleArray?.includes(id);
  }

  return (
    <>
      <Box
        sx={{
          width: "340px",
          height: "auto",
          bgcolor: "#fff",
          p: "20px",
          overflow: "hidden",
          borderRadius: "8px",
        }}
      >
        {/* Input handle */}
        <Handle
          type="target"
          position={Position.Left}
          style={{ background: "#01CBD5", width: "15px", height: "15px" }}
          onConnect={(params: any) => console.log("handle onConnect target", params)}
        />
        <>
          {(["left"] as const).map((anchor) => (
            <React.Fragment key={anchor}>
              <Box
                sx={{
                  display: "flex",
                  gap: "16px",
                  alignItems: "center",
                  borderBottom: "1px solid #DADADA",
                  py: "12px",
                  mb: "12px",
                  justifyContent: "space-between",
                  width: "100%",
                }}
              >
                <Button
                  onClick={toggleDrawer(anchor, true)}
                  sx={{
                    display: "flex",
                    gap: "16px",
                    justifyContent: "flex-start",
                    alignItems: "center",
                    flex: 1,
                    p: "0",
                    minWidth: "auto",
                  }}
                >
                  <Image width={24} height={24} src={condition} alt="condition" />
                  <Box display="flex" flexDirection="column" gap="4px">
                    <Typography sx={{ color: "#1F1F1F", fontSize: "16px", fontWeight: "500" }}>
                      Conditions
                    </Typography>
                    <Typography sx={{ color: "#707070", fontSize: "14px", fontWeight: "400" }}>
                      Split your flows
                    </Typography>
                  </Box>
                </Button>
                <Box>
                  <Button
                    aria-describedby={idMenu}
                    onClick={handleClickMenu}
                    sx={{
                      ml: "auto",
                      minWidth: "auto",
                      p: "0",
                      "&:hover": {
                        backgroundColor: "transparent",
                      },
                    }}
                  >
                    <Image width={36} height={36} src={triggerMenu} alt="triggerMenu" />
                  </Button>
                </Box>
              </Box>
              <Drawer
                anchor={anchor}
                open={drawerOpen[anchor]}
                onClose={toggleDrawer(anchor, false)}
              >
                <ConditionContent
                  toggleDrawer={toggleDrawer(anchor, false)}
                  onConditionUpdate={handleConditionUpdate}
                  initialFormValues={formValues}
                />
              </Drawer>
            </React.Fragment>
          ))}
        </>
        <Box
          sx={{
            bgcolor: "#00253F",
            p: "10px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              ml: "auto",
              p: "0",
              flex: "1",
              justifyContent: "flex-start",
              "&:hover": {
                backgroundColor: "transparent",
              },
            }}
          >
            {/* {Object.keys(data.text)} */}
            {conditionArray.map((condition: any, index: any) => {
              if (condition.key) {
                return (
                  <Typography
                    key={index}
                    sx={{
                      color: "#9922D0",
                      fontSize: "14px",
                      fontWeight: "400",
                      display: "inline-block",
                    }}
                  >
                    {condition.value}&nbsp;
                  </Typography>
                );
              } else if (condition.dynamicCondition) {
                return condition.dynamicCondition.map(
                  (dynamicCondition: any, dynamicIndex: any) => (
                    <Box key={dynamicIndex}>
                      <Typography
                        sx={{
                          color: "#9922D0",
                          fontSize: "14px",
                          fontWeight: "400",
                          display: "inline-block",
                        }}
                      >
                        {dynamicCondition.gate}{" "}
                      </Typography>
                      <Typography
                        sx={{
                          color: "#9922D0",
                          fontSize: "14px",
                          fontWeight: "400",
                          display: "inline-block",
                        }}
                      >
                        &nbsp;{dynamicCondition.operand1}
                      </Typography>
                      <Typography
                        sx={{
                          color: "#9922D0",
                          fontSize: "14px",
                          fontWeight: "400",
                          display: "inline-block",
                        }}
                      >
                        &nbsp;{dynamicCondition.operator}
                      </Typography>
                      <Typography
                        sx={{
                          color: "#9922D0",
                          fontSize: "14px",
                          fontWeight: "400",
                          display: "inline-block",
                        }}
                      >
                        &nbsp;{dynamicCondition.operand2}
                      </Typography>
                    </Box>
                  ),
                );
              }
              return null;
            })}
          </Box>
          <Box sx={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            <Button
              disabled={doValuesCoexist(`if-${nodeId}`)}
              aria-describedby={id}
              onClick={(e: any) => {
                handleClick(e);
                nodeHandlerId(`if-${nodeId}`);
              }}
              sx={{
                ml: "auto",
                p: "0",
                minWidth: "auto",
                "&:hover": {
                  backgroundColor: "transparent",
                },
              }}
            >
              <Image width={24} height={24} src={ifCondition} alt="ifCondition" />
            </Button>
            <Button
              disabled={doValuesCoexist(`else-${nodeId}`)}
              aria-describedby={id}
              onClick={(e: any) => {
                handleClick(e);
                nodeHandlerId(`else-${nodeId}`);
              }}
              sx={{
                ml: "auto",
                p: "0",
                minWidth: "auto",
                "&:hover": {
                  backgroundColor: "transparent",
                },
              }}
            >
              <Image width={24} height={24} src={elseCondition} alt="elseCondition" />
            </Button>
          </Box>
        </Box>
        <Handle
          type="source"
          position={Position.Right}
          id={`if-${nodeId}`}
          isConnectable={!doValuesCoexist(`if-${nodeId}`)}
          style={{
            background: "#01CBD5",
            width: "15px",
            height: "15px",
            top: "55%",
            right: "-7px",
          }}
          onConnect={(params: any) => {
            console.log("handle onConnect source", params.sourceHandle);
          }}
        />
        <Handle
          type="source"
          position={Position.Right}
          id={`else-${nodeId}`}
          isConnectable={!doValuesCoexist(`else-${nodeId}`)}
          style={{
            background: "#FF6D6D",
            width: "15px",
            height: "15px",
            top: "80%",
            right: "-7px",
          }}
          onConnect={(params: any) => {
            console.log("handle onConnect source", params.sourceHandle);
          }}
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
        activeHandle={activeHandle}
      />

      <ContextMenu
        anchorElMenu={anchorElMenu}
        handleCloseMenu={handleCloseMenu}
        setConditionArray={setConditionArray}
      />
    </>
  );
}

export default ConditionalNode;
