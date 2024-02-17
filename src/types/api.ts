import { z } from "zod";

export namespace Guide {
  export const updateStatus = z.object({
    status: z.union([z.literal("done"), z.literal("inProgress")]),
  });
}
