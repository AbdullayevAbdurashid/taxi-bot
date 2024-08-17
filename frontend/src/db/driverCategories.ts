import React from "react";
import { FaUserFriends } from "react-icons/fa";
import { IconType } from "react-icons";
import { IoPersonAddOutline } from "react-icons/io5";
import { MdOutlineOutbox, MdOutlineMoveToInbox } from "react-icons/md";

// Define the Category interface
interface Category {
  name: string;
  url: string;
  icon: IconType; // Correctly typing the icon
  bgColor: string;
  hoverBgColor: string;
}

// Define the categories array with the specified type
export const categories: Category[] = [
  {
    name: "Yolovchi olish",
    bgColor: "green.400",
    hoverBgColor: "teal.200",
    url: "/driver/user/get?title=Yolovchi olish",
    icon: IoPersonAddOutline,
  },
  {
    name: "Yolovchi berish",
    url: "/driver/user/add?title=Yolovchi berish",
    icon: FaUserFriends,
    bgColor: "red.400",
    hoverBgColor: "teal.200",
  },
 
  {
    name: "Pochta olish",
    bgColor: "green.400",
    hoverBgColor: "teal.200",
    url: "/driver/parcel/get?title=Pochta olish",
    icon: MdOutlineMoveToInbox,
  },
  {
    name: "Pochta berish",
    bgColor: "red.400",
    hoverBgColor: "red.200",
    url: "/driver/parcel/add?title=Pochta berish",
    icon: MdOutlineOutbox,
  },
];
