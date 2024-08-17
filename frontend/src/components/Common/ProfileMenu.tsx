import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  IconButton,
} from "@chakra-ui/react";
import { FaUser } from "react-icons/fa";
import { CalendarIcon, UnlockIcon } from "@chakra-ui/icons";
import { Link } from "react-router-dom";
function ProfileMenu() {
  const logout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");

    window.location.href = "/driver/login";
  };

  return (
    <Menu>
      <MenuButton
        as={IconButton}
        icon={<FaUser />}
        aria-label="Profile"
        borderRadius="xl"
        colorScheme="teal"
        size="md"
      />
      <MenuList>
        <MenuItem as={Link} to={"/driver/profile"} icon={<FaUser />}>
          Profilga o'tish
        </MenuItem>
        <MenuItem as={Link} to={"/driver/orders"} icon={<CalendarIcon />}>
          Olingan zakazlar
        </MenuItem>
        <MenuItem onClick={logout} icon={<UnlockIcon />}>
          Chiqish
        </MenuItem>
      </MenuList>
    </Menu>
  );
}

export default ProfileMenu;
