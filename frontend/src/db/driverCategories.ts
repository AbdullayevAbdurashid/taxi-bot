import React from 'react';
import { FaUserFriends } from 'react-icons/fa';
import { IconType } from 'react-icons';
import { IoPersonAddOutline } from "react-icons/io5";
import { MdOutlineOutbox ,MdOutlineMoveToInbox } from "react-icons/md";

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
    { name: "Yolovchi berish", url: "/driver/user/give", icon: FaUserFriends,  bgColor: "green.400",
        hoverBgColor: "teal.200", },
        {name : "Pochta berish", bgColor: "red.400",
            hoverBgColor: "red.200", url: "/driver/post/give", icon: MdOutlineOutbox},
            {name : "Yolovchi olish", bgColor: "green.400",
                hoverBgColor: "teal.200", url: "/driver/user/get", icon: IoPersonAddOutline},
    {name : "Pochta olish",  bgColor: "red.400",
        hoverBgColor: "red.200",url: "/driver/post/get", icon: MdOutlineMoveToInbox}

];