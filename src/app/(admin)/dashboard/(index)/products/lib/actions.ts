"use server"

import { ActionResult } from "@/types";
import { redirect } from "next/navigation";
import { ProductStock } from "@prisma/client";
import prisma from "../../../../../../../lib/prisma";
import { deleteFile, uploadFile } from "@/lib/supabase";
import { schemaProduct, schemaProductEdit } from "@/lib/schema";

export async function storeProduct(
  _: unknown,
  formData: FormData
): Promise<ActionResult> {
  const parse = schemaProduct.safeParse({
    name: formData.get("name"),
    description: formData.get("description"),
    price: formData.get("price"),
    stock: formData.get("stock"),
    brand_id: formData.get("brand_id"),
    category_id: formData.get("category_id"),
    location_id: formData.get("location_id"),
    images: formData.getAll("images"),
  });

  if (!parse.success) {
    console.error(parse.error.errors);
    return {
      error: parse.error.errors[0].message,
    }
  }

  const uploadedImages = parse.data.images as File[];
  const fileNames = []

  for (const image of uploadedImages) {
    const fileName = await uploadFile(image, "products");
    fileNames.push(fileName);
  }

  try {
    await prisma.product.create({
      data: {
        name: parse.data.name,
        description: parse.data.description,
        brand_id: parseInt(parse.data.brand_id),
        category_id: parseInt(parse.data.category_id),
        location_id: parseInt(parse.data.location_id),
        price: parseInt(parse.data.price),
        stock: parse.data.stock as ProductStock,
        images: fileNames,
      }
    })
  } catch (error) {
    console.error(error)
    return { error: "Failed to create product" }
  }

  return redirect("/dashboard/products");
}

export async function updateProduct(
  _: unknown,
  formData: FormData,
  id: number
): Promise<ActionResult> {
  const parse = schemaProductEdit.safeParse({
    name: formData.get("name"),
    description: formData.get("description"),
    price: formData.get("price"),
    stock: formData.get("stock"),
    brand_id: formData.get("brand_id"),
    category_id: formData.get("category_id"),
    location_id: formData.get("location_id"),
    id: id,
  });

  if (!parse.success) {
    console.error(parse.error.errors);
    return {
      error: parse.error.errors[0].message,
    }
  }

  const product = await prisma.product.findFirst({
    where: {
      id
    }
  })

  if (!product) {
    return {
      error: "Product not found"
    }
  }

  const uploadedImages = formData.getAll("images") as File[];
  let fileNames = []

  if (uploadedImages.length === 3) {
    const parsedImages = schemaProduct.pick({ images: true }).safeParse({
      images: uploadedImages
    })

    if (!parsedImages.success) {
      console.log("Failed to parse images");
      console.error(parsedImages.error.errors);
      return {
        error: parsedImages.error.errors[0].message,
      }
    }

    for (const image of uploadedImages) {
      const fileName = await uploadFile(image, "products");
      fileNames.push(fileName);
    }
  } else {
    fileNames = product.images
  }

  try {
    await prisma.product.update({
      where: {
        id
      },
      data: {
        name: parse.data.name,
        description: parse.data.description,
        brand_id: parseInt(parse.data.brand_id),
        category_id: parseInt(parse.data.category_id),
        location_id: parseInt(parse.data.location_id),
        price: parseInt(parse.data.price),
        stock: parse.data.stock as ProductStock,
        images: fileNames,
      }
    })
  } catch (error) {
    console.error(error)
    return { error: "Failed to update product" }
  }

  return redirect("/dashboard/products");
}

export async function deleteProduct(
  _: unknown,
  formData: FormData,
  id: number
): Promise<ActionResult> {
  const product = await prisma.product.findFirst({
    where: {
      id
    },
    select: {
      id: true,
      images: true
    }
  })

  if (!product) {
    return {
      error: "Product not found"
    }
  }

  try {
    for (const image of product.images) {
      await deleteFile(image, "products");
    }

    await prisma.product.delete({
      where: {
        id
      }
    })
  } catch (error) {
    console.error(error)
    return { error: "Failed to delete product" }
  }

  return redirect("/dashboard/products");
}