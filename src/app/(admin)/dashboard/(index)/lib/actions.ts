"use server"

import { ActionResult } from "@/types"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { getUser, lucia } from "@/lib/auth"

export async function Logout(
  _: unknown,
  formData: FormData
): Promise<ActionResult> {
  console.log("Logging out")
  const { session } = await getUser()
  console.log("Session", session)

  if (!session) {
    return { error: "Unauthorized" }
  }
  if (session) await lucia.invalidateSession(session.id)

  const sessionCookie = lucia.createBlankSessionCookie()
  cookies().set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes
  )

  return redirect("/dashboard/sign-in")
}