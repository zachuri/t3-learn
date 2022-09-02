import Head from "next/head";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import { trpc } from "../utils/trpc";
import { CreateWeightInput } from "../schema/weight.schema";

const Progress = () => {
	const { handleSubmit, register, reset } = useForm<CreateWeightInput>();

	const router = useRouter();

	const { mutate, error } = trpc.useMutation(["weights.create-weight"], {
		onSuccess({ id }) {
			// router.push(`/weight/${id}`);
			router.push(`/weight`);
			reset();
		},
	});

	function onSubmit(values: CreateWeightInput) {
		mutate(values);
	}

	return (
		<>
			<main className="container mx-auto flex flex-col items-center justify-center min-h-screen p-4">
				{/* <h1 className="text-5xl md:text-[5rem] leading-normal font-extrabold text-gray-700">
					Weight
				</h1> */}
				<form onSubmit={handleSubmit(onSubmit)}>
					{error && error.message}
					<h1>Add weight</h1>
					<input
						type="text"
						placeholder="Your weight in lbs"
						{...register("weightTotal")}
					/>
					<br />
					<textarea placeholder="Your post title" {...register("body")} />
					<br />
					<button>Create post</button>
				</form>
			</main>
		</>
	);
};

export default Progress;
