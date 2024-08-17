import React from "react";
import { FaUserFriends } from "react-icons/fa";
import { IconType } from "react-icons";
import { IoPersonAddOutline } from "react-icons/io5";
import { MdOutlineOutbox, MdOutlineMoveToInbox } from "react-icons/md";
import { FaHome, FaList, FaCog, FaUser } from "react-icons/fa";
// Define the Category interface
interface Category {
  name: string;
  url: string;
  icon: IconType; // Correctly typing the icon
  bgColor: string;
  iconColor?: string;
  hoverBgColor: string;
}

// Define the categories array with the specified type
export const categories: Category[] = [
  {
    name: "Yolovchi olish",
    bgColor: "primary",
    hoverBgColor: "teal.200",
    url: "/driver/user/get?title=Yolovchi olish",
    icon: IoPersonAddOutline,
  },
  {
    name: "Yolovchi berish",
    url: "/driver/user/add?title=Yolovchi berish",
    icon: FaUserFriends,
    bgColor: "secondary",
    hoverBgColor: "teal.200",
  },
 
  {
    name: "Pochta olish",
    bgColor: "primary",
    hoverBgColor: "teal.200",
    iconColor: "white",
    url: "/driver/parcel/get?title=Pochta olish",
    icon: MdOutlineMoveToInbox,
  },
  {
    name: "Pochta berish",
    bgColor: "secondary",
    hoverBgColor: "red.200",
    url: "/driver/parcel/add?title=Pochta berish",
    icon: MdOutlineOutbox,
  },
];

export const menuItems = [
  { label: "Asosiy", icon: FaHome ,path: "/" },
  { label: "Buyurtmalar", icon: FaList , path: "/driver/orders" },
  { label: "Profil", icon: FaUser, path: "/driver/profile" },
];
