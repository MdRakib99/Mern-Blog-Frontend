import {
  Sidebar,
  SidebarItem,
  SidebarItemGroup,
  SidebarItems,
} from "flowbite-react";
import React, { useEffect, useState } from "react";
import { HiArrowSmRight, HiDocumentText, HiUser } from "react-icons/hi";
import { Link, useLocation } from "react-router-dom";
import { getUserDetails } from "../helper/sessionHelper";
const DashSidebar = () => {
  const location = useLocation();
  const [tab, setTab] = useState("");
  const profileData = getUserDetails();

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get("tab");

    if (tabFromUrl) {
      setTab(tabFromUrl);
    }
  }, [location.search]);
  return (
    <Sidebar className='w-full md:w-56 '>
      <SidebarItems>
        <SidebarItemGroup className='flex flex-col gap-1'>
          <Link to='/dashboard?tab=profile'>
            <SidebarItem
              active={tab === "profile"}
              label={profileData.isAdmin ? "admin" : "user"}
              // labelColor='dark'
              as='div'
              icon={HiUser}
            >
              Profile
            </SidebarItem>
          </Link>
          <Link to='/dashboard?tab=posts'>
            <SidebarItem
              active={tab === "posts"}
              // labelColor='dark'
              as='div'
              icon={HiDocumentText}
            >
              Posts
            </SidebarItem>
          </Link>
          <SidebarItem icon={HiArrowSmRight}>Sign Out</SidebarItem>
        </SidebarItemGroup>
      </SidebarItems>
    </Sidebar>
  );
};

export default DashSidebar;
