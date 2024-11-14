"use server"

import { ActionResult } from "@/types";
import { redirect } from "next/navigation";
import { schemaLocation } from "@/lib/schema";
import prisma from "../../../../../../../lib/prisma";

export async function postLocation(
  _: unknown,
  formData: FormData
): Promise<ActionResult> {
  // console.log("input type:", typeof (formData.get("name")))
  const validate = schemaLocation.safeParse({
    name: formData.get("name")
  });

  if (!validate.success) {
    // console.log(validate.error.errors[0].message)
    return { error: validate.error.errors[0].message }
  }

  try {
    await prisma.location.create({
      data: {
        name: validate.data.name
      }
    })
  } catch (error) {
    console.error(error)
    return {
      error: "Failed to create location"
    }
  }

  return redirect("/dashboard/locations");
}

export async function updateLocation(
  _: unknown,
  formData: FormData,
  id: number | undefined
): Promise<ActionResult> {
  const validate = schemaLocation.safeParse({
    name: formData.get("name")
  });

  if (!validate.success) {
    return { error: validate.error.errors[0].message }
  }

  if (!id || id === undefined) {
    return {
      error: "Location not found"
    }
  }

  try {
    await prisma.location.update({
      where: {
        id
      },
      data: {
        name: validate.data.name
      }
    })
  } catch (error) {
    console.error(error)
    return {
      error: "Failed to update location"
    }
  }

  return redirect("/dashboard/locations");
}

export async function deleteLocation(
  _: unknown,
  formData: FormData,
  id: number | undefined
): Promise<ActionResult> {
  if (!id || id === undefined) {
    return {
      error: "Location not found"
    }
  }

  try {
    await prisma.location.delete({
      where: {
        id
      }
    })
  } catch (error) {
    console.error(error)
    return {
      error: "Failed to delete location"
    }
  }

  return redirect("/dashboard/locations");
}