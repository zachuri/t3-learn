import { createRouter } from "./context";
// import { z } from "zod";
import { createWeightSchema } from "../../schema/weight.schema";
import * as trpc from "@trpc/server";

export const weightRouter = createRouter()
	.mutation("create-weight", {
		input: createWeightSchema,
		async resolve({ ctx, input }) {
			if (!ctx.session) {
				new trpc.TRPCError({
					code: "FORBIDDEN",
					message: "Cannot create a post while logged out",
				});
			}

			// create weight in prisma data base
			const weight = await ctx.prisma.weight.create({
				data: {
					...input,
					user: {
						connect: {
							id: ctx.session?.user?.id,
						},
					},
				},
			});

			return weight;
		},
	})
	.query("getAll", {
		async resolve({ ctx }) {
			return await ctx.prisma.example.findMany();
		},
	});
