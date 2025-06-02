import { getAuth } from "@clerk/nextjs/server";
import { prisma } from "./prisma";

export async function getCurrentUser(req?: Request) {
  const { userId } = getAuth(req);

  if (!userId) {
    return null;
  }

  const user = await prisma.user.findUnique({
    where: { id: userId },
    include: {
      pharmacistProfile: true,
    },
  });

  return user;
}

export async function isPharmacist() {
  const user = await getCurrentUser();
  return user?.role === "PHARMACIST";
}

export async function isAdmin() {
  const user = await getCurrentUser();
  return user?.role === "ADMIN";
}
