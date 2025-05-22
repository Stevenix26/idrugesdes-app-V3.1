import { auth } from "@clerk/nextjs";
import { prisma } from "./prisma";

export async function getCurrentUser() {
  const { userId } = auth();

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
