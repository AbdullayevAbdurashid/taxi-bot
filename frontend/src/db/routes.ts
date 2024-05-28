import { FaUser, FaRss, FaCar } from "react-icons/fa";

export const routes = [
    {
        name: "Foydalanuvchilar",
        path: "/admin/users",
        icon: FaUser,

    },
    {
        name: "Buyurtmalar",
        path: "/admin/orders",
        icon: FaRss,
    },
    {
        name: "Haydovchilar",
        path: "/admin/drivers",
        icon: FaCar,
    },
]