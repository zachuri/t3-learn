// src/server/router/index.ts
import { createRouter } from "./context";
import superjson from "superjson";

import { weightRouter } from "./weight";
import { exampleRouter } from "./example";
import { protectedExampleRouter } from "./protected-example-router";

export const appRouter = createRouter()
	.transformer(superjson)
	.merge("example.", exampleRouter)
	.merge("auth.", protectedExampleRouter)
	.merge("weights.", weightRouter);

// export type definition of API
export type AppRouter = typeof appRouter;
