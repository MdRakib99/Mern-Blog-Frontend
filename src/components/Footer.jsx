import { Footer } from "flowbite-react";
import React from "react";
import {
  BsDribbble,
  BsFacebook,
  BsGithub,
  BsInstagram,
  BsTwitter,
} from "react-icons/bs";
import { Link } from "react-router-dom";

const FooterCom = () => {
  return (
    <Footer container className='border border-t-4 border-teal-500'>
      <div className='w-full'>
        <div className='grid w-full justify-between sm:flex sm:justify-between md:flex md:grid-cols-1'>
          <div className='py-7'>
            <Link
              to='/'
              className='self-center whitespace-nowrap text-2xl sm:text-xl font-semibold dark:text-white'
            >
              <span className='px-2 py-1 bg-gradient-to-r from-teal-400 via-cyan-500 to-emerald-500 rounded-lg text-white'>
                Blog Logo
              </span>
            </Link>
          </div>
          <div className='grid grid-cols-2 gap-8 sm:mt-4 sm:grid-cols-3 sm:gap-6'>
            <div>
              <Footer.Title title='about' />
              <Footer.LinkGroup col>
                <Footer.Link href='#'>Flowbite</Footer.Link>
                <Footer.Link href='#'>Tailwind CSS</Footer.Link>
              </Footer.LinkGroup>
            </div>
            <div>
              <Footer.Title title='Follow us' />
              <Footer.LinkGroup col>
                <Footer.Link href='#'>Github</Footer.Link>
                <Footer.Link href='#'>Discord</Footer.Link>
              </Footer.LinkGroup>
            </div>
            <div>
              <Footer.Title title='Legal' />
              <Footer.LinkGroup col>
                <Footer.Link href='#'>Privacy Policy</Footer.Link>
                <Footer.Link href='#'>Terms &amp; Conditions</Footer.Link>
              </Footer.LinkGroup>
            </div>
          </div>
        </div>
        <Footer.Divider />
        <div className='w-full sm:flex sm:items-center sm:justify-between'>
          <Footer.Copyright href='#' by='Flowbite™' year={2022} />
          <div className='mt-4 flex space-x-6 sm:mt-0 sm:justify-center'>
            <Footer.Icon href='#' icon={BsFacebook} />
            <Footer.Icon href='#' icon={BsInstagram} />
            <Footer.Icon href='#' icon={BsTwitter} />
            <Footer.Icon href='#' icon={BsGithub} />
            <Footer.Icon href='#' icon={BsDribbble} />
          </div>
        </div>
      </div>
    </Footer>
  );
};

export default FooterCom;
