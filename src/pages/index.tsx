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

	const user = session?.user?.email;

	return (
		<>
			<Head>
				<title>Fitness Tracker</title>
				<meta name="Fitness Tracker" content="Build your lifestyle" />
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<main className="container mx-auto flex flex-col items-center justify-center min-h-screen p-4">
				<h1 className="text-5xl md:text-[5rem] leading-normal font-extrabold text-gray-700">
					Your <span className="text-purple-300">Lifestyle</span> App
				</h1>
				<p className="text-2xl text-gray-700">Check your:</p>
				<div className="grid gap-3 pt-3 mt-3 text-center md:grid-cols-2 lg:w-2/3">
					<Link href={"/progress"}>
						<button>
							<TechnologyCard
								name="Progress"
								description="Total Progress since day one"
								documentation="https://nextjs.org/"
							/>
						</button>
					</Link>
					<Link href={"/exercise"}>
						<button>
							<TechnologyCard
								name="Exercise"
								description="Enter you workouts for today"
								documentation="https://nextjs.org/"
							/>
						</button>
					</Link>
					<Link href={"/weight"}>
						<button>
							<TechnologyCard
								name="Weight"
								description="Enter your weight for today"
								documentation="https://nextjs.org/"
							/>
						</button>
					</Link>
					<Link href={"/diet"}>
						<button>
							<TechnologyCard
								name="Diet"
								description="What did you eat today?"
								documentation="https://nextjs.org/"
							/>
						</button>
					</Link>
				</div>
			</main>
		</>
	);
};

const TechnologyCard = ({
	name,
	description,
	documentation,
}: TechnologyCardProps) => {
	return (
		<section className="flex flex-col justify-center p-6 duration-500 border-2 border-gray-500 rounded shadow-xl motion-safe:hover:scale-105">
			<h2 className="text-lg text-gray-700">{name}</h2>
			<p className="text-sm text-gray-600">{description}</p>
			{/* <a
				className="mt-3 text-sm underline text-violet-500 decoration-dotted underline-offset-2"
				href={documentation}
				target="_blank"
				rel="noreferrer"
			>
				Documentation
			</a> */}
		</section>
	);
};

export default Home;

// 	return (
// 		<>
// 			<main className="container mx-auto flex flex-col items-center justify-center min-h-screen p-4">
// 				{/* {!session && (
// 					<Link href="/api/auth/signin">
// 						<a className="text-blue-400">Sign In</a>
// 					</Link>
// 				)}
// 				{session && (
// 					<>
// 						<div>Welcome to the HOME PAGE</div>
// 						<Link href="/api/auth/signout">
// 							<a className="text-blue-400">Sign Out</a>
// 						</Link>
// 						<h1>{hello?.greeting}</h1>
// 					</>
// 				)} */}

// 				<button className="">hello</button>
// 			</main>
// 		</>
// 	);
// };

// export default Home;
