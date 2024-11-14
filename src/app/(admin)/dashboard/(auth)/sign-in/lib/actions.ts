"use server"

import bcrypt from "bcrypt"
import { lucia } from "@/lib/auth"
import { ActionResult } from "@/types"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { schemaSignIn } from "@/lib/schema"
import prisma from "../../../../../../../lib/prisma"

export async function SignIn(
  _: unknown,
  formData: FormData
): Promise<ActionResult> {
  const validate = schemaSignIn.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  })

  if (!validate.success) {
    console.log(validate)
    return { error: validate.error.errors[0].message }
  }

  const existingUser = await prisma.user.findFirst({
    where: {
      email: validate.data.email,
      role: "superadmin"
    },
  })

  if (!existingUser) {
    return { error: "Email not found" }
  }

  const comparePassword = bcrypt.compareSync(
    validate.data.password,
    existingUser.password
  )

  if (!comparePassword) {
    return { error: "Password is incorrect" }
  }

  const session = await lucia.createSession(existingUser.id, {})
  const sessionCookie = lucia.createSessionCookie(session.id)

  cookies().set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes
  )

  return redirect("/dashboard")
}