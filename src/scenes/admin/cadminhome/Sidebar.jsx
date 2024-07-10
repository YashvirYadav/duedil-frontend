import { useState } from "react";
import { ProSidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { Link } from "react-router-dom";
import "react-pro-sidebar/dist/css/styles.css";
import { tokens } from "../../../theme";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";

import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import ContactsIcon from "@mui/icons-material/Contacts";
import PersonPinCircleIcon from "@mui/icons-material/PersonPinCircle";
import PersonIcon from "@mui/icons-material/Person";

import FileCopyIcon from "@mui/icons-material/FileCopy";
import PendingActionsIcon from "@mui/icons-material/PendingActions";
import Diversity2Icon from "@mui/icons-material/Diversity2";
import PasswordIcon from "@mui/icons-material/Password";

const Item = ({ title, to, icon, selected, setSelected }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <MenuItem
      active={selected === title}
      style={{
        color: colors.grey[100],
      }}
      onClick={() => setSelected(title)}
      icon={icon}
    >
      <Typography>{title}</Typography>
      <Link to={to} />
    </MenuItem>
  );
};

const Sidebar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selected, setSelected] = useState("Dashboard");

  return (
    <Box
      sx={{
        "& .pro-sidebar-inner": {
          background: `${colors.primary[400]} !important`,
        },
        "& .pro-icon-wrapper": {
          backgroundColor: "transparent !important",
        },
        "& .pro-inner-item": {
          padding: "5px 35px 5px 20px !important",
        },
        "& .pro-inner-item:hover": {
          color: "#868dfb !important",
        },
        "& .pro-menu-item.active": {
          color: "#6870fa !important",
        },
      }}
    >
      <ProSidebar collapsed={isCollapsed}>
        <Menu iconShape="square">
          {/* LOGO AND MENU ICON */}
          <MenuItem
            onClick={() => setIsCollapsed(!isCollapsed)}
            icon={isCollapsed ? <MenuOutlinedIcon /> : undefined}
            style={{
              margin: "10px 0 20px 0",
              color: colors.grey[100],
            }}
          >
            {!isCollapsed && (
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                ml="15px"
              >
                <Typography variant="h3" color={colors.grey[100]}>
                  ADMIN
                </Typography>
                <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
                  <MenuOutlinedIcon />
                </IconButton>
              </Box>
            )}
          </MenuItem>

          {!isCollapsed && (
            <Box mb="25px">
              <Box display="flex" justifyContent="center" alignItems="center">
                <img
                  alt="profile-user"
                  width="100px"
                  height="100px"
                  src={`../../assets/user.png`}
                  style={{ cursor: "pointer", borderRadius: "50%" }}
                />
              </Box>
              <Box textAlign="center">
                <Typography
                  variant="h2"
                  color={colors.grey[100]}
                  fontWeight="bold"
                  sx={{ m: "10px 0 0 0" }}
                >
                  {sessionStorage.getItem("name")}
                </Typography>
                <Typography variant="h5" color={colors.greenAccent[500]}>
                  {sessionStorage.getItem("role")}
                </Typography>
              </Box>
            </Box>
          )}

          <Box paddingLeft={isCollapsed ? undefined : "10%"}>
            <Item
              title="Dashboard"
              to=""
              icon={<HomeOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />

            <Typography
              variant="h6"
              color={colors.grey[300]}
              sx={{ m: "15px 0 5px 20px" }}
            >
              Master
            </Typography>

            <Item
              title="User"
              to="user"
              icon={<PersonIcon />}
              selected={selected}
              setSelected={setSelected}
            />

            <Item
              title="Client"
              to="client"
              icon={<ContactsIcon />}
              selected={selected}
              setSelected={setSelected}
            />

            <Item
              title="Product catalogue"
              to="productcatalogue"
              icon={<ContactsIcon />}
              selected={selected}
              setSelected={setSelected}
            />

            

            <Item
              title="Role"
              to="role"
              icon={<PersonPinCircleIcon />}
              selected={selected}
              setSelected={setSelected}
            ></Item>

            <Item
              title="Workflow"
              to="workflow"
              icon={<Diversity2Icon />}
              selected={selected}
              setSelected={setSelected}
            ></Item>

            <Typography
              variant="h6"
              color={colors.grey[300]}
              sx={{ m: "15px 0 5px 20px" }}
            >
              Reports
            </Typography>

            <Item
              title="Pending requests"
              to="pendinginvoice"
              icon={<PendingActionsIcon />}
              selected={selected}
              setSelected={setSelected}
            />

            <Item
              title="Aging reports"
              to="agingreports"
              icon={<PendingActionsIcon />}
              selected={selected}
              setSelected={setSelected}
            />

            <Typography
              variant="h6"
              color={colors.grey[300]}
              sx={{ m: "15px 0 5px 20px" }}
            >
              Pages
            </Typography>
            {/* <Item
              title="Profile Form"
              to="form"
              icon={<PersonOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            /> */}

            <Item
              title="Change Password"
              to="changepassword"
              icon={<PasswordIcon />}
              selected={selected}
              setSelected={setSelected}
            />
          </Box>
        </Menu>
      </ProSidebar>
    </Box>
  );
};

export default Sidebar;
