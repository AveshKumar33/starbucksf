"use client";
import {
  Box,
  CircularProgress,
  InputAdornment,
  TextField,
  TextareaAutosize,
  Typography,
} from "@mui/material";
import Image from "next/image";
import React, { useMemo, useState } from "react";
import threeDots from "@/assets/images/deleteIcon.svg";
import whatsApp from "@/assets/images/whatsApp.svg";
import whatsAppBg from "@/assets/images/whatsAppBg.jpg";
import attachment from "@/assets/images/attachment.svg";
import send from "@/assets/images/send.svg";
import UserServices from "@/services/user.service";
import EmojiPicker, { EmojiClickData } from "emoji-picker-react";
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";
import SearchIcon from "@mui/icons-material/Search";
import { DeleteConversationModal } from "@/components/DeleteConversationModal";
import { ConvertTime } from "@/components/ConvertTime";
import Toaster from "@/components/Toaster";
import { io } from "socket.io-client";
import ConversationServices from "@/services/conversation.services";
import LoaderGlobal from "@/components/LoaderGlobal";
import Resizer from "react-image-file-resizer";
import ListButtonMessage from "@/components/ListButtonMessage";
// import router from "next/router";
// const data = [
//   { name: "Anna Jones", RecurringCustomer: 2400, amt: 2400 },
//   { name: "John Cena", RecurringCustomer: 1398, amt: 2210 },
//   { name: "Timothy James", RecurringCustomer: 4800, amt: 2290 },
//   { name: "Anna Hay", RecurringCustomer: 3908, amt: 2000 },
//   { name: "Joanna Jones", RecurringCustomer: 4800, amt: 2181 },
//   { name: "Gerrard Butler ", RecurringCustomer: 4300, amt: 2100 },
//   { name: "Anna Jones", RecurringCustomer: 6300, amt: 2100 },
//   { name: "Madison Jones", RecurringCustomer: 5300, amt: 2100 },
//   { name: "Jessica Alba", RecurringCustomer: 4300, amt: 2100 },
//   { name: "Evin Kevins", RecurringCustomer: 6300, amt: 2100 },
// ];

interface TagsData {
  id?: string;
}
interface UsersInfo {
  chatMessage: string;
  _id: string;
  uuid: string;
  name: string;
  userNumberId: string;
  phoneNumber: string;
  tagslist: [TagsData];
  createdAt: string;
  updatedAt: string;
}

interface ToasterInterface {
  open: boolean;
  severity: string;
  message: string;
}

interface UserDetailType {
  _id: string;
  name: string;
  phoneNumber: string;
  createdAt: string;
  chatMessage: string;
}

const Conversation: React.FC = () => {
  const userIdRef = React.useRef<any>();
  const chatBoxRef = React.useRef<any>();
  const [loading, setLoading] = React.useState(true);
  const [apiLoading, setApiLoading] = React.useState<boolean>(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [businessAccount, setBusinessAccount] = useState<UsersInfo>();
  const [chatSearchInput, setChatSearchInput] = useState<string>("");
  const [text, setText] = React.useState("");
  const [bgColor] = useState<string>("#fff");
  const [activeIndex, setActiveIndex] = useState("");
  const [userChats, setUserChats] = useState([]);
  const [searchValue, setSearchValue] = React.useState<string>("");
  const [rowId, setRowId] = React.useState<string>("");
  const [deleteModal, setDeleteModal] = React.useState<boolean>(false);
  const [refreshConversation, setRefreshConversation] = React.useState<boolean>(false);
  const [refreshChat, setRefreshChat] = React.useState<boolean>(false);
  const [chatSendToaster, setChatSendToaster] = React.useState<ToasterInterface | null>(null);
  const [userDetail, setUserDetail] = useState<UserDetailType | null>(null);
  const [users, setUsers] = React.useState<[UsersInfo] | null>(null);
  const [imageName, setImageName] = React.useState<string | null>(null);
  const [imageBase64, setImageBase64] = React.useState<string | null>(null);

  // Toggling emoji picker box
  const handleImageClick = () => {
    setShowEmojiPicker(!showEmojiPicker);
  };

  // Handling the search bar input of contacts in conversation
  const handleConversationSearch = (value: string) => {
    setShowEmojiPicker(false);
    setChatSearchInput("");
    setSearchValue(value);
  };

  // Handling the search bar input of messages in conversation
  // const handleChatSearch = (message: string) => {
  //   setShowEmojiPicker(false);
  //   if (message === "") {
  //     setChatSearchInput("");
  //     setChatSearchInput(null);
  //   } else {
  //     setChatSearchInput(message);
  //     const filteredChats = userChats.filter((chat: any) =>
  //       chat.message.toLowerCase().includes(message.toLowerCase()),
  //     );
  //     setChatSearchInput(filteredChats);
  //     // const result = await UserServices.searchChat(id, message);
  //     // console.log(result);
  //   }
  // };

  const filterChats = useMemo(() => {
    setShowEmojiPicker(false);
    if (userChats.length === 0) {
      return null;
    }

    if (chatSearchInput === "" || chatSearchInput === null) {
      // console.log("FILTERED", userChats);
      return userChats;
    }

    if (userChats.length !== 0 && chatSearchInput !== "") {
      const filteredChatData = userChats.filter(
        (chat: any) => chat?.message?.toLowerCase().includes(chatSearchInput?.toLowerCase()),
      );
      return filteredChatData;
    }

    return null;
  }, [userDetail, userChats, chatSearchInput]);

  // Filtering contact according to search value of contacts in conversation
  const filterContact = useMemo(() => {
    setChatSearchInput("");
    if (users === null) {
      return null;
    }

    if (!searchValue) {
      return users;
    }

    if (users) {
      const filteredUsers = users.filter(
        (user) =>
          user.name.toLowerCase().includes(searchValue.toLowerCase()) ||
          user.phoneNumber.includes(searchValue),
      );
      return filteredUsers;
    }

    return null;
  }, [searchValue, users]);

  // Handling delete modal open on click
  const handleDeleteContact = (id: string) => {
    setRowId(id);
    setDeleteModal(true);
  };

  // Handling delete modal close on click
  const handleCloseDeleteContactModal = () => {
    setRowId("");
    setDeleteModal(false);
  };

  // Refresh of conversation list for useEffect Trigger of API function
  const handleRefresh = () => {
    setRefreshConversation(!refreshConversation);
  };

  // Function for getting all the contacts to display in contact list of conversation (Except Business Account)
  async function getAllUserData(socket: boolean) {
    // setApiLoading(true);
    const adminData = localStorage.getItem("Admin") as string;
    setBusinessAccount(JSON.parse(adminData));
    try {
      const usersData: any = await UserServices.getAll("", 0, 0);
      const contactList = usersData.data;
      const removeHans = contactList.filter(function (data: any) {
        return data.role !== "Admin";
      });
      // const result = await UserServices.getUserList();
      // console.log("=-=-=-=-=-=-=-=-=-=-=-", result);
      /*const promises = */ await contactList.map(async (data: any) => {
        const chatDetail: any = await UserServices.getUserChat(data._id);
        if (chatDetail.data.length > 0) {
          if (chatDetail.data[chatDetail.data.length - 1].type === "listButtonNode") {
            const listData = JSON.parse(chatDetail.data[chatDetail.data.length - 1].message);
            data.chatMessage = listData.text.header;
          } else if (chatDetail.data[chatDetail.data.length - 1].message) {
            data.chatMessage = chatDetail.data[chatDetail.data.length - 1].message;
          } else {
            data.chatMessage = chatDetail.data[chatDetail.data.length - 1].mediaKey;
          }
        } else {
          data.chatMessage = "";
        }
        return data;
      });
      // const userLists = await Promise.all(promises);
      // console.log("userLists......", userLists);
      setUsers(removeHans);
      if (socket == true) {
        // For socket true returning reference of user Id and list of contacts
        setLoading(false);
        setApiLoading(false);
        return { userIdRef, removeHans };
      }

      if (socket == false) {
        /**top user selection**/
        const detail = removeHans[0];
        /**latest user selections**/
        getUserChat(detail);
      }
      setLoading(false);
      setApiLoading(false);
      return;
    } catch (error) {
      setUsers(null);
      setLoading(false);
      setApiLoading(false);
      return;
    }
  }

  /**single chat handle**/
  async function getUserChat(user: UsersInfo) {
    // setApiLoading(true);
    if (user) {
      setChatSearchInput("");
      setSearchValue("");
      setChatSearchInput("");
      const getUserChats: any = await UserServices.getUserChat(user._id);
      // console.log("++++++++++++++++++++++++++++++++++", getUserChats.data);
      // console.log("getUserChats...", getUserChats);
      setUserChats(getUserChats.data);
      // console.log("selected user...", user);
      setActiveIndex(user._id);
      userIdRef.current = user._id;
      /***update user details with last message**/
      setUserDetail({
        _id: user._id,
        name: user.name,
        phoneNumber: user.phoneNumber,
        createdAt: user.createdAt,
        chatMessage: getUserChats[0]?.message,
      });
      // setChatLoading(false);
      // const contactList = usersData.data;
      // const removeHans = contactList.filter(function (data: any) {
      //   return data.name !== "Hans";
      // });
      // setUsers(removeHans);
    }
    setApiLoading(false);
  }

  // Refreshing chat for call of API in useEffect
  const getRefreshChat = async (id: string) => {
    setApiLoading(true);
    if (id) {
      setChatSearchInput("");
      setSearchValue("");
      setChatSearchInput("");
      try {
        const getUserChats: any = await UserServices.getUserChat(id);
        // console.log("getUserChats...", getUserChats);
        setUserChats(getUserChats.data);
      } catch (error) {
        console.log(error);
      }
    }
    setApiLoading(false);
  };

  // Handling value of search box in chat
  const handleChange = (event: any) => {
    setShowEmojiPicker(false);
    setChatSearchInput("");
    setText(event.target.value);
  };

  // To resize the image
  const resizeImage = (file: any) =>
    new Promise((resolve) => {
      Resizer.imageFileResizer(
        file,
        1080,
        1920,
        "JPEG",
        75,
        0,
        (uri) => {
          resolve(uri);
        },
        "base64",
      );
    });

  // Storing image file in state from attach input
  async function fileUpload(event: any) {
    const file = event.target.files[0];
    if (file) {
      const date = new Date();
      const timeString = date.getTime();
      const fileName = file.name;
      if (fileName.endsWith(".jpg")) {
        const splitName = fileName.split(".jpg");
        const newImageName = `${splitName[0]}-${timeString}.jpg`;
        setImageName(newImageName);
      }
      if (fileName.endsWith(".jpeg")) {
        const splitName = fileName.split(".jpeg");
        const newImageName = `${splitName[0]}-${timeString}.jpeg`;
        setImageName(newImageName);
      }
      if (fileName.endsWith(".png")) {
        const splitName = fileName.split(".png");
        const newImageName = `${splitName[0]}-${timeString}.png`;
        setImageName(newImageName);
      }
      const backgroundImage = (await resizeImage(file)) as string;
      const imageSizeInBytes = new TextEncoder().encode(backgroundImage).length;
      const imageSizeInMB = imageSizeInBytes / (1024 * 1024);

      // console.log("SIZE", imageSizeInMB);
      if (imageSizeInMB > 5) {
        setImageName(null);
        setImageBase64(null);
        setChatSendToaster({
          open: true,
          severity: "error",
          message: "Image size is bigger.",
        });
      } else {
        setImageBase64(backgroundImage);
      }
    }
  }

  // Adding emoji in the text area
  function handleEmoji(emojiData: EmojiClickData) {
    setText((prevText) => prevText + emojiData.emoji);
  }

  // Handling send message trigger
  const handleSendMessage = async () => {
    setApiLoading(true);
    setShowEmojiPicker(false);
    if (businessAccount && userDetail) {
      const senderId = businessAccount._id;
      const receiverId = userDetail._id;
      const phoneNumber = userDetail.phoneNumber;
      const message = text;
      const images = imageBase64;
      const mediaKey = imageName;
      const result = await ConversationServices.postMessage(
        senderId,
        receiverId,
        phoneNumber,
        message,
        images,
        mediaKey,
      );
      if (result.success) {
        if (result.data === null) {
          setChatSendToaster({
            open: true,
            severity: "error",
            message: "Some error occured",
          });
        } else {
          setRefreshChat(!refreshChat);
          setChatSendToaster({
            open: true,
            severity: "success",
            message: "Message Sent Successfully",
          });
          setTimeout(() => {
            handleCloseToaster();
          }, 1000);
        }
      } else {
        setChatSendToaster({
          open: true,
          severity: "error",
          message: "Some error occured",
        });
        setTimeout(() => {
          handleCloseToaster();
        }, 1000);
      }
    } else {
      setChatSendToaster({
        open: true,
        severity: "error",
        message: "Some error occured",
      });
      setTimeout(() => {
        handleCloseToaster();
      }, 1000);
    }
    setText("");
    setImageBase64(null);
    setImageName(null);
    setApiLoading(false);
    // fetch(`${process.env.NEXT_PUBLIC_API_URL}/chat/create`, {
    //   method: "POST",
    //   body: formdata,
    //   // headers: {
    //   //   "Content-type": "application/json"
    //   // },
    // })
    //   .then((response) => response.json())
    //   .then((data) => {
    //     console.log(data);
    //     setRefreshChat(!refreshChat);
    //     setChatSendToaster({
    //       open: true,
    //       severity: "success",
    //       message: "Message Sent Successfully",
    //     });
    //   })
    //   .catch((error) => {
    //     console.error(error);
    //   });
    // setChatLoading(false);
  };

  // Closing toaster message
  const handleCloseToaster = () => {
    setChatSendToaster(null);
  };

  // To differ in today yesterday or others
  function getMessageCategory(createdAt: string) {
    const today = new Date();
    const messageDate = new Date(createdAt);

    if (
      messageDate.getDate() === today.getDate() &&
      messageDate.getMonth() === today.getMonth() &&
      messageDate.getFullYear() === today.getFullYear()
    ) {
      return "Today";
    } else {
      const yesterday = new Date(today);
      yesterday.setDate(today.getDate() - 1);
      if (
        messageDate.getDate() === yesterday.getDate() &&
        messageDate.getMonth() === yesterday.getMonth() &&
        messageDate.getFullYear() === yesterday.getFullYear()
      ) {
        return "Yesterday";
      } else {
        return messageDate.toLocaleDateString().toString();
      }
    }
  }

  React.useEffect(() => {
    if (chatBoxRef.current) {
      chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
    }
  }, [userChats]);

  React.useEffect(() => {
    getAllUserData(false);
    if (activeIndex) {
      getRefreshChat(activeIndex);
    }
  }, [refreshChat, refreshConversation]);

  /***sockets*** */
  React.useEffect(() => {
    const socket = io(`${process.env.NEXT_PUBLIC_SOCKET_URL}`);
    // console.log("connection begins", socket);
    socket.on("new-message", async (msg: any) => {
      console.log("msg listen socket", msg);
      const allUsers = await getAllUserData(true);
      const { userIdRef, removeHans } = allUsers as any;
      if (
        msg.content.entry[0].changes[0].value.contacts !== undefined &&
        msg.content.entry[0].changes[0].value.contacts.length > 0
      ) {
        const phoneNumber = msg.content.entry[0].changes[0].value.contacts[0].wa_id;
        const filteredUsers = removeHans.filter((user: any) =>
          user.phoneNumber.toLowerCase().includes(phoneNumber.toLowerCase()),
        );
        if (filteredUsers[0]._id === userIdRef.current) {
          getUserChat(filteredUsers[0]);
        }
      } else if (
        msg.content.entry[0].changes[0].value.statuses !== undefined &&
        msg.content.entry[0].changes[0].value.statuses.length > 0
      ) {
        const phoneNumber = msg.content.entry[0].changes[0].value.statuses[0].recipient_id;
        const filteredUsers = removeHans.filter((user: any) =>
          user.phoneNumber.toLowerCase().includes(phoneNumber.toLowerCase()),
        );
        if (filteredUsers[0]._id === userIdRef.current) {
          getUserChat(filteredUsers[0]);
        }
      }
    });
  }, []);

  React.useEffect(() => {
    return () => {
      setLoading(true);
    };
  }, []);

  return (
    <Box sx={{ height: "calc(100vh - 90px)" }}>
      {loading ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
            width: "100%",
          }}
        >
          <CircularProgress />
        </Box>
      ) : (
        <>
          {users ? (
            <>
              {users && userDetail ? (
                <>
                  <Box
                    sx={{
                      display: "flex",
                      gap: "24px",
                      p: "0",
                      borderRadius: "10px",
                      height: "calc(100vh - 110px)",
                    }}
                  >
                    <Box
                      sx={{
                        flexBasis: "394px",
                        bgcolor: "#fff",
                        borderRadius: "10px",
                        overflow: "auto",
                      }}
                    >
                      {apiLoading && <LoaderGlobal />}
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          py: "18px",
                          px: "27px",
                          position: "sticky",
                          top: "0",
                          zIndex: "1",
                          backgroundColor: "white",
                        }}
                      >
                        <Typography
                          sx={{
                            fontSize: "20px",
                            fontWeight: "600",
                            color: "#1F1F1F",
                            paddingRight: "20px",
                          }}
                        >
                          Inbox
                        </Typography>
                        <TextField
                          autoComplete="off"
                          sx={{
                            marginRight: ".5rem",
                            flex: 1,
                            minWidth: "100px",
                            borderRadius: "8px",
                          }}
                          value={searchValue}
                          placeholder="Search"
                          size="small"
                          onChange={(e) => handleConversationSearch(e.target.value)}
                          inputProps={{ "aria-label": "search google maps" }}
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <SearchIcon />
                              </InputAdornment>
                            ),
                          }}
                        />
                      </Box>
                      {filterContact && (
                        <>
                          {filterContact.map((user) => {
                            const messageCategory = user.updatedAt
                              ? getMessageCategory(user.updatedAt)
                              : getMessageCategory(user.createdAt);
                            return (
                              <Box
                                key={user._id}
                                sx={{
                                  display: "flex",
                                  justifyContent: "space-between",
                                  alignItems: "center",
                                  bgcolor: activeIndex === user._id ? "#F5FAFF" : bgColor,
                                  px: "27px",
                                  transition: "100ms ease",
                                  cursor: "pointer",
                                  py: "10px",
                                  gap: "8px",
                                  "&:hover": {
                                    bgcolor: "#F5FAFF",
                                  },
                                }}
                                onClick={() => getUserChat(user)}
                              >
                                <Box sx={{ py: "8px" }}>
                                  <Typography
                                    sx={{ fontSize: "14px", fontWeight: "500", color: "#707070" }}
                                  >
                                    {messageCategory === "Today" ? (
                                      "Today"
                                    ) : (
                                      <>
                                        {messageCategory === "Yesterday" ? (
                                          "Yesterday"
                                        ) : (
                                          <>
                                            <ConvertTime
                                              defaultTime={messageCategory}
                                              type="date"
                                            />
                                          </>
                                        )}
                                      </>
                                    )}
                                  </Typography>
                                  <Typography
                                    sx={{ fontSize: "16px", fontWeight: "500", color: "#1F1F1F" }}
                                  >
                                    {user.name}
                                  </Typography>
                                  <Typography
                                    sx={{ fontSize: "14px", fontWeight: "400", color: "#707070" }}
                                  >
                                    {user.chatMessage}
                                  </Typography>
                                </Box>
                                <Box>
                                  <Image
                                    width={24}
                                    height={24}
                                    src={threeDots}
                                    onClick={() => handleDeleteContact(user._id)}
                                    alt="threeDots"
                                  />
                                </Box>
                              </Box>
                            );
                          })}
                        </>
                      )}
                    </Box>
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        flex: 1,
                        bgcolor: "#F0F6FE",
                        gap: "7px",
                      }}
                    >
                      <Box
                        sx={{
                          bgcolor: "#fff",
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          py: "18px",
                          pl: "20px",
                          pr: "40px",
                          borderRadius: "10px",
                        }}
                      >
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "flex-start",
                            alignItems: "center",
                            gap: "10px",
                          }}
                        >
                          <Box
                            sx={{
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                              bgcolor: "#FF8C8C",
                              px: "18px",
                              py: "15px",
                              borderRadius: "50%",
                            }}
                          >
                            <Typography
                              sx={{ fontSize: "24px", fontWeight: "500", color: "#1F1F1F" }}
                            >
                              {userDetail?.name?.slice(0, 2)}
                            </Typography>
                          </Box>
                          <Box>
                            <Typography
                              sx={{ fontSize: "16px", fontWeight: "500", color: "#181818" }}
                            >
                              {userDetail.name}
                            </Typography>
                            <Box
                              sx={{
                                display: "flex",
                                justifyContent: "flex-start",
                                alignItems: "center",
                              }}
                            >
                              <Image width={24} height={24} src={whatsApp} alt="whatsApp" />
                              <Typography
                                sx={{ fontSize: "14px", fontWeight: "500", color: "#707070" }}
                              >
                                + {userDetail.phoneNumber}
                              </Typography>
                            </Box>
                            <Typography
                              sx={{ fontSize: "14px", fontWeight: "400", color: "#707070" }}
                            >
                              Scanned on -{" "}
                              <ConvertTime defaultTime={userDetail.createdAt} type="full" />
                              {/* Scanned on - {userDetail.createdAt} */}
                            </Typography>
                          </Box>
                        </Box>
                        <Box>
                          <TextField
                            autoComplete="off"
                            sx={{
                              marginRight: ".5rem",
                              flex: 1,
                              minWidth: "200px",
                              borderRadius: "8px",
                            }}
                            placeholder="Search"
                            size="small"
                            value={chatSearchInput}
                            onChange={(e) => setChatSearchInput(e.target.value)}
                            inputProps={{ "aria-label": "search google maps" }}
                            InputProps={{
                              startAdornment: (
                                <InputAdornment position="start">
                                  <SearchIcon />
                                </InputAdornment>
                              ),
                            }}
                          />
                        </Box>
                      </Box>
                      <Box
                        sx={{
                          flex: "1",
                          height: "100%",
                          width: "100%",
                          position: "relative",
                        }}
                      >
                        <Box
                          sx={{
                            position: "absolute",
                            width: "100%",
                            height: "100%",
                            top: "0",
                            bottom: "0",
                            left: "0",
                            right: "0",
                          }}
                        >
                          <Image
                            src={whatsAppBg}
                            alt="whatsAppBg"
                            layout="fill"
                            objectFit="cover"
                          />
                        </Box>
                        <Box
                          ref={chatBoxRef}
                          sx={{
                            position: "absolute",
                            overflow: "auto",
                            top: "0",
                            bottom: "0",
                            left: "0",
                            right: "0",
                          }}
                        >
                          {filterChats && (
                            <>
                              {filterChats.map((data: any) => {
                                const messageCategory = getMessageCategory(data.createdAt);

                                return (
                                  <Box
                                    key={data._id}
                                    sx={{
                                      px: "32px",
                                      py: "20px",
                                      display: "flex",
                                      flexDirection: "column",
                                      gap: "20px",
                                    }}
                                  >
                                    {data.senderId == businessAccount?._id ? (
                                      <Box
                                        sx={{
                                          position: "relative",
                                          bgcolor: "#D9FDD3",
                                          width: "fit-content",
                                          ml: "auto",
                                          p: "15px",
                                          maxWidth: "50%",
                                          display: "flex",
                                          flexDirection: "column",
                                          gap: "4px",
                                          borderRadius: "10px",
                                          boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
                                        }}
                                      >
                                        <Typography
                                          sx={{
                                            fontSize: "14px",
                                            fontWeight: "400",
                                            color: "#3E3E3E",
                                            textAlign: "end",
                                          }}
                                        >
                                          {messageCategory === "Today" ? (
                                            <>
                                              {"Today - "}
                                              {
                                                <ConvertTime
                                                  defaultTime={data.createdAt}
                                                  type="time"
                                                />
                                              }
                                            </>
                                          ) : (
                                            <>
                                              {messageCategory === "Yesterday" ? (
                                                <>
                                                  {"Yesterday - "}
                                                  {
                                                    <ConvertTime
                                                      defaultTime={data.createdAt}
                                                      type="time"
                                                    />
                                                  }
                                                </>
                                              ) : (
                                                <ConvertTime
                                                  defaultTime={data.createdAt}
                                                  type="full"
                                                />
                                              )}
                                            </>
                                          )}
                                        </Typography>
                                        {data.type === "mediaMessageNode" ? (
                                          <>
                                            {data.images && data.images !== "" && (
                                              <Box
                                                sx={{
                                                  display: "flex",
                                                  justifyContent: "center",
                                                  alignItems: "center",
                                                  height: "132px",
                                                  maxHeight: "300px",
                                                  borderRadius: "4px",
                                                  background: "var(--Background, #F0F6FE)",
                                                  flexDirection: "column",
                                                  textAlign: "center",
                                                  position: "relative",
                                                }}
                                              >
                                                <img
                                                  style={{
                                                    width: "100%",
                                                    height: "100%",
                                                    objectFit: "contain",
                                                  }}
                                                  src={data.images}
                                                  alt={data.imageName}
                                                />
                                              </Box>
                                            )}
                                          </>
                                        ) : (
                                          <>
                                            {data.type === "listButtonNode" ? (
                                              <>
                                                <ListButtonMessage messageData={data.message} />
                                              </>
                                            ) : (
                                              <>
                                                {data.type === "sendMessageNode" ? (
                                                  <>
                                                    <Typography
                                                      sx={{
                                                        fontSize: "16px",
                                                        fontWeight: "400",
                                                        color: "#5E5E5E",
                                                      }}
                                                    >
                                                      {data.message}
                                                    </Typography>
                                                  </>
                                                ) : (
                                                  <>
                                                    <Typography
                                                      sx={{
                                                        fontSize: "16px",
                                                        fontWeight: "400",
                                                        color: "#5E5E5E",
                                                      }}
                                                    >
                                                      {data.message}
                                                    </Typography>
                                                  </>
                                                )}
                                              </>
                                            )}
                                          </>
                                        )}
                                        {/* {data.images && data.images !== "" && (
                                          <Box
                                            sx={{
                                              display: "flex",
                                              justifyContent: "center",
                                              alignItems: "center",
                                              height: "132px",
                                              maxHeight: "300px",
                                              borderRadius: "4px",
                                              background: "var(--Background, #F0F6FE)",
                                              flexDirection: "column",
                                              textAlign: "center",
                                              position: "relative",
                                            }}
                                          >
                                            <img
                                              style={{
                                                width: "100%",
                                                height: "100%",
                                                objectFit: "contain",
                                              }}
                                              src={data.images}
                                              alt={data.imageName}
                                            />
                                          </Box>
                                        )}
                                        {data.message && data.message !== "" && (
                                          <>
                                            <Typography
                                              sx={{
                                                fontSize: "16px",
                                                fontWeight: "400",
                                                color: "#5E5E5E",
                                              }}
                                            >
                                              {data.message}
                                            </Typography>
                                          </>
                                        )} */}
                                      </Box>
                                    ) : (
                                      <Box
                                        sx={{
                                          position: "relative",
                                          bgcolor: "#fff",
                                          width: "fit-content",
                                          mr: "auto",
                                          p: "15px",
                                          maxWidth: "50%",
                                          display: "flex",
                                          flexDirection: "column",
                                          gap: "4px",
                                          borderRadius: "10px",
                                          boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
                                        }}
                                      >
                                        <Box
                                          sx={{
                                            display: "flex",
                                            justifyContent: "space-between",
                                            alignItems: "center",
                                          }}
                                        >
                                          <Typography
                                            sx={{
                                              fontSize: "14px",
                                              fontWeight: "700",
                                              color: "#181818",
                                              textAlign: "end",
                                            }}
                                          >
                                            {userDetail.name}
                                          </Typography>
                                          <Typography
                                            sx={{
                                              fontSize: "14px",
                                              fontWeight: "400",
                                              color: "#3E3E3E",
                                              textAlign: "end",
                                              pl: "16px",
                                            }}
                                          >
                                            {messageCategory === "Today" ? (
                                              <>
                                                {"Today - "}
                                                {
                                                  <ConvertTime
                                                    defaultTime={data.createdAt}
                                                    type="time"
                                                  />
                                                }
                                              </>
                                            ) : (
                                              <>
                                                {messageCategory === "Yesterday" ? (
                                                  <>
                                                    {"Yesterday - "}
                                                    {
                                                      <ConvertTime
                                                        defaultTime={data.createdAt}
                                                        type="time"
                                                      />
                                                    }
                                                  </>
                                                ) : (
                                                  <ConvertTime
                                                    defaultTime={data.createdAt}
                                                    type="full"
                                                  />
                                                )}
                                              </>
                                            )}
                                          </Typography>
                                        </Box>
                                        {data.type === "mediaMessageNode" ? (
                                          <>
                                            {data.images && data.images !== "" && (
                                              <Box
                                                sx={{
                                                  display: "flex",
                                                  justifyContent: "center",
                                                  alignItems: "center",
                                                  height: "132px",
                                                  maxHeight: "300px",
                                                  borderRadius: "4px",
                                                  background: "var(--Background, #F0F6FE)",
                                                  flexDirection: "column",
                                                  textAlign: "center",
                                                  position: "relative",
                                                }}
                                              >
                                                <img
                                                  style={{
                                                    width: "100%",
                                                    height: "100%",
                                                    objectFit: "contain",
                                                  }}
                                                  src={data.images}
                                                  alt={data.imageName}
                                                />
                                              </Box>
                                            )}
                                          </>
                                        ) : (
                                          <>
                                            {data.type === "listButtonNode" ? (
                                              <>
                                                <ListButtonMessage messageData={data.message} />
                                              </>
                                            ) : (
                                              <>
                                                {data.type === "sendMessageNode" ? (
                                                  <>
                                                    <Typography
                                                      sx={{
                                                        fontSize: "16px",
                                                        fontWeight: "400",
                                                        color: "#5E5E5E",
                                                      }}
                                                    >
                                                      {data.message}
                                                    </Typography>
                                                  </>
                                                ) : (
                                                  <>
                                                    <Typography
                                                      sx={{
                                                        fontSize: "16px",
                                                        fontWeight: "400",
                                                        color: "#5E5E5E",
                                                      }}
                                                    >
                                                      {data.message}
                                                    </Typography>
                                                  </>
                                                )}
                                              </>
                                            )}
                                          </>
                                        )}
                                        {/* {data.images && data.images !== "" && (
                                          <Box
                                            sx={{
                                              display: "flex",
                                              justifyContent: "center",
                                              alignItems: "center",
                                              height: "132px",
                                              maxHeight: "300px",
                                              borderRadius: "4px",
                                              background: "var(--Background, #F0F6FE)",
                                              flexDirection: "column",
                                              textAlign: "center",
                                              position: "relative",
                                            }}
                                          >
                                            <img
                                              style={{
                                                width: "100%",
                                                height: "100%",
                                                objectFit: "contain",
                                              }}
                                              src={data.images}
                                              alt={data.imageName}
                                            />
                                          </Box>
                                        )}
                                        {data.message && data.message !== "" && (
                                          <>
                                            <Typography
                                              sx={{
                                                fontSize: "16px",
                                                fontWeight: "400",
                                                color: "#5E5E5E",
                                              }}
                                            >
                                              {data.message}
                                            </Typography>
                                          </>
                                        )} */}
                                      </Box>
                                    )}
                                  </Box>
                                );
                              })}
                            </>
                          )}
                        </Box>
                      </Box>
                      <Box
                        sx={{
                          bgcolor: "#fff",
                          py: "32px",
                          px: "24px",
                          borderRadius: "10px",
                          display: "flex",
                          justifyContent: "flex-start",
                          alignItems: "center",
                          gap: "12px",
                          cursor: "pointer",
                        }}
                      >
                        <label htmlFor="file-input" style={{ position: "relative" }}>
                          <input
                            type="file"
                            id="file-upload-input"
                            accept=".jpg, .jpeg, .png"
                            style={{
                              opacity: 0,
                              position: "absolute",
                              top: 0,
                              left: 0,
                              right: 0,
                              bottom: 0,
                            }}
                            onChange={fileUpload}
                          />
                          <Box
                            sx={{
                              bgcolor: "#008DF1",
                              px: "12px",
                              py: "10px",
                              borderRadius: "10px",
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                              cursor: "pointer",
                            }}
                          >
                            <Image
                              width={18}
                              height={18}
                              src={attachment}
                              alt="attachment"
                              onChange={fileUpload}
                            />
                          </Box>
                        </label>

                        <Box
                          sx={{
                            flex: "1",
                            width: "100%",
                            display: "flex",
                            alignItems: "center",
                            position: "relative",
                          }}
                        >
                          <TextareaAutosize
                            id="text_area"
                            placeholder=""
                            aria-label={"message"}
                            value={text}
                            onChange={handleChange}
                            style={{
                              borderRadius: "5px",
                              border: "1px solid rgba(0, 0, 139, 0.50)",
                              padding: "9px 15px",
                              width: "100%",
                            }}
                          />

                          <EmojiEmotionsIcon
                            onClick={handleImageClick}
                            sx={{ marginLeft: "4px", color: "#008DF1", cursor: "pointer" }}
                          />
                          {showEmojiPicker && (
                            <Box sx={{ position: "absolute", bottom: "40px", right: "0" }}>
                              <EmojiPicker onEmojiClick={handleEmoji} />
                            </Box>
                          )}

                          {/* <TextField name="upload-photo" type="file" onChange={fileUpload} />
                  <TextField
                    id="outlined-basic"
                    label="Type a message"
                    variant="outlined"
                    sx={{
                      "& .MuiInputBase-root": {
                        height: "40px",
                      },
                      "& .MuiInputLabel-outlined": {
                        transform: "translate(14px, 8px) scale(1)",
                        fontSize: "16px",
                      },
                      "& .MuiInputLabel-outlined.MuiInputLabel-shrink": {
                        transform: "translate(20px, -6px) scale(0.75)",
                      },
                    }}
                  /> */}
                        </Box>
                        <Box
                          onClick={handleSendMessage}
                          sx={{
                            bgcolor: "#008DF1",
                            px: "12px",
                            py: "10px",
                            borderRadius: "10px",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                        >
                          <Image width={18} height={18} src={send} alt="send" />
                        </Box>
                        <Box>
                          {imageName && (
                            <Typography
                              sx={{ fontSize: "14px", fontWeight: "500", color: "#707070" }}
                            >
                              {imageName}
                            </Typography>
                          )}
                        </Box>
                      </Box>
                    </Box>
                  </Box>
                </>
              ) : (
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "100%",
                    width: "100%",
                  }}
                >
                  <CircularProgress />
                </Box>
              )}
              {chatSendToaster && (
                <Toaster
                  open={chatSendToaster.open}
                  severity={chatSendToaster.severity}
                  onClose={handleCloseToaster}
                  message={chatSendToaster.message}
                />
              )}
              {deleteModal && (
                <DeleteConversationModal
                  open={deleteModal}
                  onClose={handleCloseDeleteContactModal}
                  refreshPage={handleRefresh}
                  selectedConversation={rowId}
                />
              )}
            </>
          ) : (
            <p>No conversation to display</p>
          )}
        </>
      )}
    </Box>
  );
};

export default Conversation;
