import type { NextPage } from "next";
import { useSession } from "next-auth/react";
import Head from "next/head";
import Link from "next/link";
import { trpc } from "../utils/trpc";

type TechnologyCardProps = {
	name: string;
	description: string;
	documentation: string;
};

const Home: NextPage = () => {
	const { data: session } = useSession();

	return (
		<>
			<main className="container mx-auto flex flex-col items-center justify-center min-h-screen p-4">
				{!session && (
					<Link href="/api/auth/signin">
						<a className="text-blue-400">Sign In</a>
					</Link>
				)}
				{session && (
					<>
						<div>Welcome</div>
						<Link href="/api/auth/signout">
							<a className="text-blue-400">Sign Out</a>
						</Link>
					</>
				)}
			</main>
		</>
	);
};

export default Home;
