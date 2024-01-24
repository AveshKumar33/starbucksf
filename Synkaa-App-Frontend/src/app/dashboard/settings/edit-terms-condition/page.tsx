"use client";
import React, { useEffect, useRef, useState } from "react";
import { Box, Button, CircularProgress, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import SideBar from "@/components/SideBar";
import LandingServices from "@/services/landing.services";
import "react-quill/dist/quill.snow.css";
import dynamic from "next/dynamic";
import Toaster from "@/components/Toaster";
import LoaderGlobal from "@/components/LoaderGlobal";

const ReactQuill = dynamic(() => import("react-quill"), {
  loading: () => (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "95vh",
        width: "100%",
      }}
    >
      <CircularProgress />
    </Box>
  ),
  ssr: false,
});

interface ToasterInterface {
  open: boolean;
  severity: string;
  message: string;
}

function TermsEditor() {
  const router = useRouter();
  const [isButtonDisabled, setIsButtonDisabled] = React.useState(false);
  const [initialValue, setInitialValue] = useState("");
  const [updateToaster, setUpdateToaster] = React.useState<ToasterInterface | null>(null);
  const [apiLoading, setApiLoading] = React.useState<boolean>(false);

  const getAll = async () => {
    setApiLoading(true);
    try {
      const result = await LandingServices.getLanding();
      if (result.success) {
        if (result.data[0].termCondition && result.data[0].termCondition !== "") {
          setInitialValue(result.data[0].termCondition);
        } else {
          setInitialValue("");
        }
      }
    } catch (error) {
      console.log(error);
    }
    setApiLoading(false);
  };

  const handleCancelEditor = () => {
    router.push("/dashboard/settings");
    setIsButtonDisabled(false);
  };

  const handleSaveEditor = async () => {
    if (initialValue) {
      setIsButtonDisabled(true);
      setApiLoading(true);
      try {
        const result = await LandingServices.postLanding(null, null, null, null, initialValue);
        if (result) {
          if (result.success) {
            setUpdateToaster({
              open: true,
              severity: "success",
              message: "Terms and condition saved successfully",
            });
            setTimeout(() => {
              handleCloseToaster();
            }, 500);
            router.push("/dashboard/settings");
            setIsButtonDisabled(false);
          } else {
            setUpdateToaster({
              open: true,
              severity: "error",
              message: result.message,
            });
            setTimeout(() => {
              handleCloseToaster();
            }, 500);
          }
        } else {
          setUpdateToaster({
            open: true,
            severity: "error",
            message: "Some error code",
          });
          setTimeout(() => {
            handleCloseToaster();
          }, 500);
        }
      } catch (error) {
        setUpdateToaster({
          open: true,
          severity: "error",
          message: "Some error occured",
        });
      }
      setApiLoading(false);
    } else {
      setUpdateToaster({
        open: true,
        severity: "error",
        message: "Empty value cannot not be stored",
      });
    }
  };

  const handleCloseToaster = () => {
    setIsButtonDisabled(false);
    setUpdateToaster(null);
  };
  const quillRef = useRef(null);

  useEffect(() => {
    if (quillRef.current) {
      quillRef.current;
    }
  }, []);

  useEffect(() => {
    getAll();
  }, []);

  const modules = {
    toolbar: [
      ["bold", "italic", "underline"],
      [{ list: "ordered" }, { list: "bullet" }],
    ],
  };
  return (
    <>
      {apiLoading && <LoaderGlobal />}
      <Box
        sx={{
          display: "flex",
          width: "100%",
          height: "100%",
          bgcolor: "#F0F6FE",
        }}
      >
        <Box
          sx={{
            flexBasis: "60px",
          }}
        >
          <SideBar />
        </Box>
        <Box
          sx={{
            flex: 1,
          }}
        >
          <Box
            sx={{
              dsiplay: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
              height: "100vh",
              backgroundColor: "#F0F6FE",
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                px: "32px",
                py: "14px",
                backgroundColor: "#fff",
              }}
            >
              <Typography variant="subtitle1" sx={{ fontWeight: "500", color: "#1F1F1F" }}>
                Edit Terms & Conditions
              </Typography>
              <Box>
                <Button
                  disabled={isButtonDisabled}
                  sx={{
                    bgcolor: "#008DF1",
                    gap: "10px",
                    boxShadow:
                      "0px 1px 3px 0px rgba(0, 0, 0, 0.30), 0px 4px 8px 3px rgba(0, 0, 0, 0.15);",
                    borderRadius: "4px",
                    marginRight: "12px",
                  }}
                  variant="contained"
                  onClick={handleSaveEditor}
                >
                  Save
                </Button>
                <Button
                  variant="outlined"
                  sx={{ height: "36px", textTransform: "initial" }}
                  onClick={handleCancelEditor}
                >
                  Cancel
                </Button>
              </Box>
            </Box>
            <Box
              className="text_editor"
              sx={{
                width: "70%",
                backgroundColor: "#fff",
                borderRadius: "10px",
                padding: "32px",
                mx: "auto",
                marginTop: "14px",
              }}
            >
              <ReactQuill
                value={initialValue}
                onChange={setInitialValue}
                placeholder=""
                modules={modules}
              />
            </Box>
          </Box>
        </Box>
      </Box>
      {updateToaster && (
        <Toaster
          open={updateToaster.open}
          severity={updateToaster.severity}
          onClose={handleCloseToaster}
          message={updateToaster.message}
        />
      )}
    </>
  );
}

export default TermsEditor;
