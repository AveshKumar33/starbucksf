import React from "react";

interface ConvertTimeTypes {
  defaultTime: string;
  type: string;
}

export const ConvertTime: React.FC<ConvertTimeTypes> = ({ defaultTime, type }) => {
  const gmtTime = new Date(defaultTime); // Define options for formatting the output
  if (type === "full") {
    const options: object = {
      timeZone: "Asia/Singapore",
      year: "numeric",
      month: "short",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    }; // Convert the GMT time to Singapore time and format it
    const singaporeTime = gmtTime.toLocaleString("en-US", options);
    return singaporeTime;
  } else if (type === "time") {
    const options: object = {
      timeZone: "Asia/Singapore",
      date: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }; // Convert the GMT time to Singapore time and format it
    const singaporeTime = gmtTime.toLocaleString("en-US", options);
    return singaporeTime;
  } else if (type === "dateTime") {
    const options: object = {
      timeZone: "Asia/Singapore",
      dateStyle: "short",
      timeStyle: "short",
    };
    try {
      const singaporeTime = gmtTime.toLocaleString("en-US", options);
      return singaporeTime;
    } catch (error) {
      console.error("Error formatting date:", error);
      return "Invalid Date";
    }
  } else if (type === "date") {
    const options: object = {
      timeZone: "Asia/Singapore",
      dateStyle: "medium",
    };
    try {
      const singaporeTime = gmtTime.toLocaleString("en-US", options);
      return singaporeTime;
    } catch (error) {
      console.error("Error formatting date:", error);
      return "Invalid Date";
    }
  } else {
    return null;
  }
};
