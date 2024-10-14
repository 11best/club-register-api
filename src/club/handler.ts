import { PrismaClient } from "@prisma/client";
import { NotFoundError } from "elysia";

interface ClubRequest {
  id?: number;
  name: string;
}

const prisma = new PrismaClient();

export async function getClubs() {
  try {
    return await prisma.club.findMany();
  } catch (e: unknown) {
    console.error(`Error getting clubs: ${e}`);
  }
}

export async function getClub(id: number) {
  const club = await prisma.club.findUnique({
    where: { id: id },
  });
  if (!club) {
    throw new NotFoundError();
  }
  return club;
}

export async function createClub(req: ClubRequest) {
  try {
    return await prisma.club.create({
      data: {
        name: req.name,
      },
    });
  } catch (e: unknown) {
    console.error(`Error creating club: ${e}`);
  }
}

export async function updateClub(req: ClubRequest) {
  try {
    return await prisma.club.update({
      where: {
        id: req.id,
      },
      data: {
        name: req.name,
      },
    });
  } catch (e: unknown) {
    console.error(`Error updating club: ${e}`);
  }
}

export async function deleteClub(id: number) {
  await prisma.club.delete({
    where: { id: id },
  });
  return { message: `club id: ${id} delete successful!` };
}
