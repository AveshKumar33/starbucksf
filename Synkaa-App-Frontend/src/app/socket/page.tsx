"use client";
import LoaderGlobal from "@/components/LoaderGlobal";
import React, { useEffect } from "react";
import { io } from "socket.io-client";
function SocketComponent() {
  useEffect(() => {
    // console.log("connection begins");
    /*const manager = new Manager(`${'http://localhost:2222'}`, {
      reconnectionDelayMax: 100,
      path: "api",
      transports: ["websocket"],
      withCredentials: true
    });*/
    // https://synkaa-websocket.symple.co.in
    // const socket = io("ws://localhost:2222");
    const socket = io("https://synkaa-websocket.symple.co.in");
    // console.log("connection begins", socket);
    socket.on("new-message", (msg: any) => {
      console.log("msg listen socket", msg);
    });
  }, []);

  return (
    <>
      <div>
        <img src="https://synkaa-uploads.s3.ap-southeast-1.amazonaws.com/bird-1696491677176.jpg?AWSAccessKeyId=AKIAZMKFPOEN2GFOJPIN&Expires=1696492621&Signature=zbfg9b%2Bl8%2Bc6vFOIjW4FqK8QUcE%3D"></img>
      </div>
      <LoaderGlobal />
    </>
  );
}

export default SocketComponent;
