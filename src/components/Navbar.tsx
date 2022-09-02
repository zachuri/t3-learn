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

function classNames(...classes: string[]) {
	return classes.filter(Boolean).join(" ");
}

const Navbar = () => {
	const [nav, setNav] = useState(false);

	const handleNav = () => {
		setNav(!nav);
	};

	const { data: session } = useSession();

	// console.log(session);

	return (
		<div className="fixed h-14 w-full flex flex-nowrap items-center p-4 bg-[#0e0e10] mb-[2px] z-10">
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
				<p className="text-white p-4">Tracker</p>
				<div className="p-4">
					{/* Headless UI */}
					<Menu as="div" className="relative text-left">
						<div className="flex">
							<Menu.Button>
								<BsThreeDotsVertical size={20} />
							</Menu.Button>
						</div>

						<Transition
							as={Fragment}
							enter="transition ease-out duration-100"
							enterFrom="transform opacity-0 scale-95"
							enterTo="transform opacity-100 scale-100"
							leave="transition ease-in duration-75"
							leaveFrom="transform opacity-100 scale-100"
							leaveTo="transform opacity-0 scale-95"
						>
							<Menu.Items className="origin-top-right absolute left-0 mt-2 w-56 rounded-md shadow-lg bg-[#0e0e10] ring-1 ring-white ring-opacity-5 focus:outline-none">
								<div className="py-1">
									<Menu.Item>
										{({ active }) => (
											<a
												href="#"
												className={classNames(
													active
														? "bg-gray-500 text-gray-100"
														: "text-gray-200",
													"block px-4 py-2 text-sm"
												)}
											>
												Settings
											</a>
										)}
									</Menu.Item>
									<Menu.Item>
										{({ active }) => (
											<a
												href="#"
												className={classNames(
													active
														? "bg-gray-500 text-gray-100"
														: "text-gray-200",
													"block px-4 py-2 text-sm"
												)}
											>
												Support
											</a>
										)}
									</Menu.Item>
									<Menu.Item>
										{({ active }) => (
											<a
												href="#"
												className={classNames(
													active
														? "bg-gray-500 text-gray-100"
														: "text-gray-200",
													"block px-4 py-2 text-sm"
												)}
											>
												License
											</a>
										)}
									</Menu.Item>
								</div>
							</Menu.Items>
						</Transition>
					</Menu>
				</div>
			</div>

			{/* Right Side */}
			<div className="hidden md:flex grow items-center justify-end">
      

				{session ? (
					<div className="flex items-center">
						<Link href="/account">
							<div>
								<p className="text-white pr-4 cursor-pointer">
									Welcome, {session?.user?.name}
								</p>
							</div>
						</Link>
						{/* Headless UI */}
						<Menu as="div" className="relative text-left">
							<div className="flex">
								<Menu.Button>
									<Image
										className="rounded-full"
										src={session?.user?.image}
										width="40"
										height="40"
									/>
								</Menu.Button>
							</div>

							<Transition
								as={Fragment}
								enter="transition ease-out duration-100"
								enterFrom="transform opacity-0 scale-95"
								enterTo="transform opacity-100 scale-100"
								leave="transition ease-in duration-75"
								leaveFrom="transform opacity-100 scale-100"
								leaveTo="transform opacity-0 scale-95"
							>
								{/* change direction to show on the left (right-0) */}
								<Menu.Items className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-[#0e0e10] ring-1 ring-white ring-opacity-5 focus:outline-none">
									<div className="py-1">
										<Menu.Item>
											{({ active }) => (
												// eslint-disable-next-line @next/next/no-html-link-for-pages
												<a
													href="/account"
													className={classNames(
														active
															? "bg-gray-500 text-gray-100"
															: "text-gray-200",
														"block px-4 py-2 text-sm"
													)}
												>
													Account
												</a>
											)}
										</Menu.Item>
										<Menu.Item>
											{({ active }) => (
												<p
													onClick={() => signOut()}
													className={classNames(
														active
															? "bg-gray-500 text-gray-100"
															: "text-gray-200",
														"block px-4 py-2 text-sm"
													)}
												>
													Logout
												</p>
											)}
										</Menu.Item>
									</div>
								</Menu.Items>
							</Transition>
						</Menu>
					</div>
				) : (
					<div className="flex items-center">
						<Link href="/api/auth/signin">
							<button className="px-4 py-[6px] rounded-lg font-bold bg-[#9147ff]">
								Sign In
							</button>
						</Link>
						<BsPerson size={30} />
					</div>
				)}
			</div>

			{/* Hamburger Menu */}
			<div
				onClick={handleNav}
				className="block md:hidden z-10 cursor-pointer"
			>
				{nav ? <AiOutlineClose size={25} /> : <AiOutlineMenu size={25} />}
			</div>

			{/* Mobile Menu */}
			<div
				// md:hidden -> anything above medium make hidden
				className={
					nav
						? "md:hidden fixed top-0 left-0 w-full h-screen bg-[#0e0e10] flex justify-center items-center ease-in duration-300"
						: "md:hidden fixed top-[-100%] left-0 w-full h-screen bg-[#0e0e10] flex justify-center items-center ease-in duration-300"
				}
			>
				<ul className="text-center">
					<li
						onClick={() => setNav(false)}
						className="p-4 text-3xl font-bold"
					>
						<Link href="/">Progress</Link>
					</li>
					<li
						onClick={() => setNav(false)}
						className="p-4 text-3xl font-bold"
					>
						<Link href="#/live">Exercise Tracker</Link>
					</li>
					<li
						onClick={() => setNav(false)}
						className="p-4 text-3xl font-bold"
					>
						<Link href="/#categories">Weight Tracker</Link>
					</li>
					<li
						onClick={() => setNav(false)}
						className="p-4 text-3xl font-bold"
					>
						<Link href="/account">Diet Tracker</Link>
					</li>
				</ul>
			</div>
		</div>
	);
};

export default Navbar;
