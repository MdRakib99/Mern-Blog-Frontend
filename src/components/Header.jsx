import {
  Avatar,
  Button,
  Dropdown,
  DropdownDivider,
  DropdownHeader,
  DropdownItem,
  Navbar,
  TextInput,
} from "flowbite-react";
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { AiOutlineSearch } from "react-icons/ai";
import { FaMoon } from "react-icons/fa";
import {
  getToken,
  getUserDetails,
  removeSessions,
} from "../helper/sessionHelper";

const Header = () => {
  const onLogout = () => {
    removeSessions();
  };
  const path = useLocation().pathname;
  return (
    <div>
      <Navbar className='border-b-2'>
        <Link
          to='/'
          className='self-center whitespace-nowrap text-sm sm:text-xl font-semibold dark:text-white'
        >
          <span className='px-2 py-1 bg-gradient-to-r from-teal-400 via-cyan-500 to-emerald-500 rounded-lg text-white'>
            Blog Logo
          </span>
        </Link>
        <form>
          <TextInput
            type='text'
            placeholder='Search...'
            rightIcon={AiOutlineSearch}
            className='hidden lg:inline'
          />
        </form>

        <Button className='w-12 h-10 lg:hidden' color='gray' pill>
          <AiOutlineSearch />
        </Button>
        <div className='flex gap-2 md:order-2'>
          <Button className='w-12 h-10 hidden sm:inline' color='gray' pill>
            <FaMoon />
          </Button>

          {getToken() ? (
            <Dropdown
              arrowIcon={false}
              inline
              label={
                <Avatar alt='user' img={getUserDetails()["photo"]} rounded />
              }
            >
              <Dropdown.Header>
                <span className='block text-sm'>
                  {getUserDetails()["username"]}
                </span>
                <span className='block text-sm font-medium truncate'>
                  {getUserDetails()["email"]}
                </span>
              </Dropdown.Header>
              <Link to={"/dashboard?tab=profile"}>
                <DropdownItem>Profile</DropdownItem>
              </Link>
              <DropdownDivider />
              <DropdownItem onClick={onLogout}>Sign Out.</DropdownItem>
            </Dropdown>
          ) : (
            <Link to='/sign-in'>
              <Button gradientDuoTone='greenToBlue' outline>
                Sign In
              </Button>
            </Link>
          )}

          <Navbar.Toggle />
        </div>

        <Navbar.Collapse>
          <Navbar.Link active={path === "/"} as={"div"}>
            <Link to='/'>Home</Link>
          </Navbar.Link>
          <Navbar.Link active={path === "/about"} as={"div"}>
            <Link to='/about'>About</Link>
          </Navbar.Link>
          <Navbar.Link active={path === "/projects"} as={"div"}>
            <Link to='/projects'>Projects</Link>
          </Navbar.Link>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
};

export default Header;
