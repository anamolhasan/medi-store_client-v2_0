'use client'
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import { authClient } from "@/lib/auth-client"

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {


  const demoCredentials = {
    admin: {
      email: "admin@gmail.com",
      password: "admin123",
    },
    customer: {
      email: "customer@gmail.com",
      password: "customer123",
    },
    seller: {
      email: "seller@gmail.com",
      password: "seller123",
    },
  };

  const handleGoogleLogin = async () => {
    await authClient.signIn.social({
      provider:'google',
      callbackURL:'http://localhost:3000'
    })
  }

  const session = authClient.useSession()
  console.log(session)
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle>Login to your account</CardTitle>
          <CardDescription>
          <div className="flex items-center mb-3 gap-2">
        <div>
          <h1 className="text-lg  font-semibold">Login</h1>
          <small className="text-gray-600">
            Join us today and start your journey
          </small>
        </div>
      </div>
      <div className="flex items-center my-5 justify-around">
        <Button
          variant="default"
          size="sm"
          className="cursor-pointer"
        >
           Admin
        </Button>
        <Button
          variant="default"
          size="sm"
          className="cursor-pointer"
        >
           Seller
        </Button>
        <Button
          variant="default"
          size="sm"
          className="cursor-pointer"
        >
           Customer
        </Button>
      </div>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                />
              </Field>
              <Field>
                <div className="flex items-center">
                  <FieldLabel htmlFor="password">Password</FieldLabel>
                  <a
                    href="#"
                    className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                  >
                    Forgot your password?
                  </a>
                </div>
                <Input id="password" type="password" required />
              </Field>
              <Field>
                <Button type="submit">Login</Button>
                <Button onClick={()=> handleGoogleLogin()} variant="outline" type="button">
                  Login with Google
                </Button>
                <FieldDescription className="text-center">
                  Don&apos;t have an account? <Link href="/register">Register</Link> Now
                </FieldDescription>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
