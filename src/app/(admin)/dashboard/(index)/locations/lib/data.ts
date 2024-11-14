import prisma from "../../../../../../../lib/prisma";

export async function getLocations() {
  try {
    const locations = await prisma.location.findMany({});
    return locations;
  } catch (error) {
    console.error(error);
    return [];
  }
}

export async function getLocationById(id: string) {
  try {
    const location = await prisma.location.findFirst({
      where: {
        id: Number.parseInt(id),
      },
    });
    return location;
  } catch (error) {
    console.error(error);
    return null;
  }
}