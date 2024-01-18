// import { clerkClient } from "@clerk/nextjs/server";
// import { z } from "zod";

// import {
//   createTRPCRouter,
//   protectedProcedure,
//   publicProcedure,
// } from "../trpc";

// export const prescribeRouter = createTRPCRouter({
//   list: publicProcedure.query(({ ctx }) => {
//     return ctx.prisma.prescribe.findMany();
//   }),
//   get: publicProcedure
//     .input(z.object({ prescribeId: z.string() }))
//     .query(({ ctx, input }) => {
//       return ctx.prisma.prescribe.findUnique({
//         where: {
//           id: input.prescribeId,
//         },
//       });
//     }),
//   getMessage: protectedProcedure.query(async ({ input, ctx }) => {
//     const userId = ctx.auth.userId;
//     const precribes = await ctx.prisma.prescribe.findMany({
//       where: {
//         userId,
//       },
//       include: {
//         message: true,
//       },
//     });
//     return precribes.flatMap((item) => item.message);
//   }),
//   sendMessage: protectedProcedure
//     .input(z.object({ message: z.string(), listingId: z.string() }))
//     .mutation(async ({ input, ctx }) => {
//       const fromUser = await clerkClient.users.getUser(ctx.auth.userId);

//       const message = await ctx.prisma.message.create({
//         data: {
//           fromUser: ctx.auth.userId,
//           fromUserName: fromUser.username ?? "unknown",
//           listingId: input.listingId,
//           message: input.message,
//         },
//       });
//       return message;
//     }),
//   create: protectedProcedure
//     .input(
//       z.object({ name: z.string(), description: z.string() })
//     )
//     .mutation(async ({ input, ctx }) => {
//       const precribes = await ctx.prisma.prescribe.create({
//         data: {
//           ...input,
//           userId: ctx.auth.userId,
//         },
//       });
//       return precribes;
//     }),
// });
