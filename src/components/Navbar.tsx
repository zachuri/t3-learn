import React, { Fragment, useState } from "react";
import { Menu, Transition } from "@headlessui/react";
import Link from "next/link";
import Logo from "../../public/favicon.ico";
import Image from "next/image";
import { BsThreeDotsVertical, BsPerson } from "react-icons/bs";
import { BiDumbbell } from "react-icons/bi";
import { TbScaleOutline } from "react-icons/tb";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import { useSession, signIn, signOut } from "next-auth/react";
import router from "next/router";

const accounts = [
  { id: 1, name: 'Account', href: '/account' },
  { id: 2, name: 'SignIn', href: '' },
  { id: 3, name: 'SignOut', href: '' },
  { href: 'https://github.com/zachuri/t3-learn', name: 'Source' },
]

const links = [
  { href: '/', name: 'Home' },
  { href: '/progress', name: 'Progress' },
  { href: '/exercise', name: 'Exercise' },
  { href: '/weight', name: 'Weight' },
  { href: '/diet', name: 'Diet' },
]


function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

const PagesMenu: React.FC = () => {
  return (
    <Menu as="div" className="relative inline-block text-left mt-1">
      <>
        <Menu.Button role="navigation" aria-label="hamburger menu to navigate to pages">
          <BsThreeDotsVertical />
        </Menu.Button>

        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-[#0e0e10] ring-1 ring-white ring-opacity-5 focus:outline-none">
            {/* <Menu.Items> */}
            {links.map((link) => (
              /* Use the `active` state to conditionally style the active item. */
              <Menu.Item key={link.href} as={Fragment}>
                {({ active }) => (
                  // Headless UI needs to use a tag
                  //  mylink component helps to make it work

                  // <MyLink href={`${link.href}`} active={active} onClick={() => {
                  //   setTimeout(() => {
                  //     ref.current?.click();
                  //   }, 0);
                  // }}>
                  //   {link.name}
                  // </MyLink>

                  // <Link href={link.href}>{link.name}</Link>

                  // <a href={link.href}
                  //   className={classNames(
                  //     active
                  //       ? "bg-gray-500 text-gray-100"
                  //       : "text-gray-200",
                  //     "block px-4 py-2 text-sm"
                  //   )}
                  // >
                  //   {link.name}
                  // </a>

                  // Work around for menu to close
                  <button
                    name={link.name}

                    className={classNames(
                      active
                        ? "bg-gray-500 text-gray-100"
                        : "text-gray-200",
                      "text-left w-full block px-4 py-2 text-sm"
                    )}

                    onClick={() => {
                      router.push(`${link.href}`)
                    }}>
                    {link.name}
                  </button>
                )}
              </Menu.Item>
            ))}
          </Menu.Items>
        </Transition>
      </>
    </Menu>
  )
}


const Navbar = () => {
  const { data: session } = useSession();

  return (
    <div className="border-b-4 border-black-500 fixed h-14 w-full flex flex-nowrap items-center p-4 bg-white mb-[2px] z-10">
      {/* Left Side */}
      <div className="flex grow items-center justify-start">
        <Link href="/">
          <a className="flex">
            <Image
              src={Logo}
              alt="/"
              width="36"
              height="36"
              className="cursor-pointer z-10"
            />
          </a>
        </Link>
        <p className="p-4">Tracker</p>
      </div>

      {/* Right Side */}
      <div className="hidden md:flex grow items-center justify-end">
        {session ? (
          <div className="flex items-center">

            {/* Menu for Pages */}
            <PagesMenu />

            <Link href="/account">
              <div>
                <p className="pr-4 cursor-pointer">
                  Welcome, {session?.user?.name}
                </p>
              </div>
            </Link>

            {/* Menu for Account*/}
            <Menu as="div" className="relative inline-block text-left mt-1">
              <>
                <Menu.Button role="navigation" aria-label="hamburger menu to navigate to pages">
                  <Image
                    className="rounded-full"
                    // Just casted as string because next see's string | undefined -> can't be undefined
                    src={session.user?.image === undefined ? "/assets/avatar.png" : session?.user?.image as string}
                    alt="profile image"
                    width="40"
                    height="40"
                  />
                </Menu.Button>

                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <Menu.Items className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-[#0e0e10] ring-1 ring-white ring-opacity-5 focus:outline-none">
                    {/* <Menu.Items> */}
                    <Menu.Item>
                      {({ active }) => (
                        <button
                          name={"account"}

                          className={classNames(
                            active
                              ? "bg-gray-500 text-gray-100"
                              : "text-gray-200",
                            "text-left w-full block px-4 py-2 text-sm"
                          )}

                          onClick={() => {
                            router.push("/account")
                          }}>
                          Account
                        </button>
                      )}
                    </Menu.Item>

                    <Menu.Item>
                      {({ active }) => (
                        <button
                          name={!session.user ? "Login" : "Logout"}

                          className={classNames(
                            active
                              ? "bg-gray-500 text-gray-100"
                              : "text-gray-200",
                            "text-left w-full block px-4 py-2 text-sm"
                          )}

                          onClick={() => {
                            { !session.user ? signIn() : signOut() }
                          }}>

                          {!session.user ? "Login" : "Logout"}
                        </button>
                      )}
                    </Menu.Item>

                    <Menu.Item>
                      {({ active }) => (
                        <button
                          name={"account"}

                          className={classNames(
                            active
                              ? "bg-gray-500 text-gray-100"
                              : "text-gray-200",
                            "text-left w-full block px-4 py-2 text-sm"
                          )}

                          onClick={() => {
                            router.push('https://github.com/zachuri/t3-learn')
                          }}>
                          Source
                        </button>
                      )}
                    </Menu.Item>
                  </Menu.Items>
                </Transition>
              </>
            </Menu>
          </div>
        ) : (
          <div className="flex items-center">
            <PagesMenu />
            <Link href="/api/auth/signin">
              <button className="px-4 py-[6px] rounded-lg font-bold bg-[#9147ff]">
                Sign In
              </button>
            </Link>
            <BsPerson size={30} />
          </div>
        )}
      </div>

      {/* Right (Hamburger Menu)*/}
      <div className='flex justify-between items-center md:hidden'>
        {/* <button
            onClick={handleTheme}
            className="flex justify-between items-center mr-2"
            role="hamgurger menu" aria-label="view the links to all the other pages"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z" />
            </svg>
          </button> */}
        <Menu as="div" className="relative inline-block text-left mt-1">
          <>
            <Menu.Button role="navigation" aria-label="hamburger menu to navigate to pages">
              <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
              </svg>
            </Menu.Button>

            <Transition
              as={Fragment}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Menu.Items className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-[#0e0e10] ring-1 ring-white ring-opacity-5 focus:outline-none">
                {/* <Menu.Items> */}
                {links.map((link) => (
                  /* Use the `active` state to conditionally style the active item. */
                  <Menu.Item key={link.href} as={Fragment}>
                    {({ active }) => (
                      // Headless UI needs to use a tag
                      //  mylink component helps to make it work

                      // <MyLink href={`${link.href}`} active={active} onClick={() => {
                      //   setTimeout(() => {
                      //     ref.current?.click();
                      //   }, 0);
                      // }}>
                      //   {link.name}
                      // </MyLink>

                      // <Link href={link.href}>{link.name}</Link>

                      // <a href={link.href}
                      //   className={classNames(
                      //     active
                      //       ? "bg-gray-500 text-gray-100"
                      //       : "text-gray-200",
                      //     "block px-4 py-2 text-sm"
                      //   )}
                      // >
                      //   {link.name}
                      // </a>

                      // Work around for menu to close
                      <button
                        name={link.name}

                        className={classNames(
                          active
                            ? "bg-gray-500 text-gray-100"
                            : "text-gray-200",
                          "text-left w-full block px-4 py-2 text-sm"
                        )}

                        onClick={() => {
                          router.push(`${link.href}`)
                        }}>
                        {link.name}
                      </button>
                    )}
                  </Menu.Item>
                ))}
              </Menu.Items>
            </Transition>
          </>
        </Menu>
      </div>

    </div>
  );
};

export default Navbar;
