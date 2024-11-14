import FormSignIn from "./_components/form"

export const description =
  "A simple login form with email and password. The submit button says 'Sign in'."

export default function SignInPage() {
  return (
    <main className="w-full h-screen overflow-hidden relative">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <FormSignIn />
      </div>
    </main>
  )
}
