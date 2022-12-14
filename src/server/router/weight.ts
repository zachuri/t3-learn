import { createRouter } from "./context";
// import { z } from "zod";
import { createWeightSchema } from "../../schema/weight.schema";
import * as trpc from "@trpc/server";

export const weightRouter = createRouter()
	.mutation("create-weight", {
		input: createWeightSchema,
		async resolve({ ctx, input }) {
			// !ctx.session.user -> no need for user
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
	.query("getAllWeights", {
		async resolve({ ctx }) {
			if (!ctx.session) {
				new trpc.TRPCError({
					code: "FORBIDDEN",
					message: "Please Sign In: can't get any post",
				});
			}

			return ctx.prisma.weight.findMany({
				where: {
					userId: ctx.session?.user?.id,
				},
			});
		},
	});
