"use client";
import React from "react";
import Image from "next/image";
import ManageProfileBg from "@/assets/images/manage-profile-bg.svg";
import { Avatar, Badge, Box, Button, Stack, Typography, styled } from "@mui/material";
import { useUser } from "@auth0/nextjs-auth0/client";
import LoaderGlobal from "./LoaderGlobal";
import Edit from "../assets/images/editavatar.png";
import UploadProfilePic from "./UploadProfilePic";
import EditUserProfile from "./EditUserProfile";
import ChangeUserPasswordModal from "./ChangeUserPasswordModal";

const SmallAvatar = styled(Avatar)(() => ({
  width: 28,
  height: 28,
}));
const Manageprofile: React.FC = () => {
  const { user } = useUser();
  const [apiLoading, setApiLoading] = React.useState<boolean>(false);
  const [userProfile, setUserProfile] = React.useState<any>(null);
  const [openUploadProfile, setOpenUploadProfile] = React.useState<boolean>(false);
  const [openUpdateInfo, setOpenUpdateInfo] = React.useState<boolean>(false);
  const [refreshPage, setRefreshPage] = React.useState<boolean>(false);
  const [updatePasswordModal, setUpdatePasswordModal] = React.useState<boolean>(false);

  const handleMediaClick = () => {
    setOpenUploadProfile(!openUploadProfile);
  };

  const handleCloseModal = () => {
    setOpenUploadProfile(false);
    setOpenUpdateInfo(false);
    setUpdatePasswordModal(false);
  };

  const handleRefreshPage = () => {
    setRefreshPage(!refreshPage);
  };

  const handleUpdateUserInfo = () => {
    setOpenUpdateInfo(true);
  };

  const handleSetNewPassword = () => {
    setUpdatePasswordModal(true);
  };

  // Getting Access Token for triggering Management APIs
  async function getAccessToken() {
    setApiLoading(true);
    try {
      const tokenResult = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/get-access-token`, {
        method: "POST",
      });
      if (tokenResult.status === 200) {
        const data = await tokenResult.json();

        if (user) {
          const userResult = await fetch(
            `${process.env.NEXT_PUBLIC_BASE_URL}/api/get-user-profile?acessToken=${data.accessToken}&userId=${user.sub}`,
          );
          if (userResult.status === 200 || userResult.status === 201) {
            const userData = await userResult.json();
            setUserProfile(userData.userInfo);
          } else {
            // No user found set the package user
            setUserProfile(user);
          }
        }
      }
    } catch (error) {
      console.log(error);
    }
    setApiLoading(false);
  }

  React.useEffect(() => {
    getAccessToken();
  }, [refreshPage]);

  return (
    <>
      {apiLoading && <LoaderGlobal />}
      <Box sx={{ position: "relative" }}>
        <Image className="manage_profile" src={ManageProfileBg} alt="whatsAppBg" />
        <Box sx={{ position: "absolute", bottom: "-10px", left: "35px" }}>
          <Stack direction="row" spacing={1}>
            <Badge
              overlap="circular"
              anchorOrigin={{ vertical: "top", horizontal: "right" }}
              badgeContent={
                <SmallAvatar
                  sx={{ cursor: "pointer" }}
                  alt="Remy Sharp"
                  src={Edit.src}
                  onClick={handleMediaClick}
                />
              }
            >
              <Avatar
                alt="Travis Howard"
                src={
                  userProfile && userProfile.profile_picture && userProfile.profile_picture !== ""
                    ? userProfile.profile_picture
                    : ""
                }
                sx={{ width: "80px", height: "80px" }}
              />
            </Badge>
          </Stack>
        </Box>
      </Box>
      <Box sx={{ width: "60%", marginTop: "60px" }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "16px",
          }}
        >
          <Typography sx={{ color: "#00253F", fontSize: "16px", fontWeight: "600" }}>
            Name
          </Typography>
          <Typography sx={{ color: "#00253F", fontSize: "16px", fontWeight: "600" }}>
            {userProfile?.name}
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "16px",
          }}
        >
          <Typography sx={{ color: "#00253F", fontSize: "16px", fontWeight: "600" }}>
            Email
          </Typography>
          <Typography sx={{ color: "#00253F", fontSize: "16px", fontWeight: "600" }}>
            {userProfile?.email}
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "16px",
          }}
        >
          <Typography sx={{ color: "#00253F", fontSize: "16px", fontWeight: "600" }}>
            Contact Number
          </Typography>
          <Typography sx={{ color: "#00253F", fontSize: "16px", fontWeight: "600" }}>
            {userProfile?.phone_number}
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "16px",
          }}
        >
          <Typography sx={{ color: "#00253F", fontSize: "16px", fontWeight: "600" }}>
            Password
          </Typography>
          <Typography>
            <Button sx={{ color: "#008DF1" }} onClick={handleSetNewPassword}>
              Change
            </Button>
          </Typography>
        </Box>
        <Box
          onClick={handleUpdateUserInfo}
          sx={{
            display: "flex",
            width: "117px",
            height: "40px",
            padding: "13px 16px",
            justifyContent: "center",
            alignItems: "center",
            gap: "10px",
            flexShrink: 0,
            borderRadius: "4px",
            background: "#008DF1",
            boxShadow: "0px 1px 3px 0px rgba(0, 0, 0, 0.30), 0px 4px 8px 3px rgba(0, 0, 0, 0.15)",
            cursor: "pointer",
          }}
        >
          <Typography
            sx={{ color: "#FFF", fontSize: "15px", fontWeight: "500", letterSpacing: "0.1px" }}
          >
            Edit
          </Typography>
        </Box>
      </Box>
      {openUploadProfile && (
        <UploadProfilePic
          openModal={openUploadProfile}
          closeModal={handleCloseModal}
          refreshPage={handleRefreshPage}
          userId={user && user.sub ? user.sub : null}
          profilePic={
            userProfile && userProfile.profile_picture && userProfile.profile_picture !== ""
              ? userProfile.profile_picture
              : null
          }
        />
      )}
      {openUpdateInfo && (
        <EditUserProfile
          openModal={openUpdateInfo}
          closeModal={handleCloseModal}
          refreshPage={handleRefreshPage}
          userId={user && user.sub ? user.sub : null}
          userInfo={userProfile ? userProfile : null}
        />
      )}
      {updatePasswordModal && (
        <ChangeUserPasswordModal
          openModal={updatePasswordModal}
          closeModal={handleCloseModal}
          refreshPage={handleRefreshPage}
          userId={user && user.sub ? user.sub : null}
        />
      )}
    </>
  );
};

export default Manageprofile;
