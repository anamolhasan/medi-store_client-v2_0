"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { authClient } from "@/lib/auth-client";
import { useForm } from "@tanstack/react-form";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import z, { email } from "zod";
import { Badge } from "../ui/badge";
import { FcGoogle } from "react-icons/fc";

const formSchema = z.object({
  name: z.string().min(1, "This field is required"),
  email: z.email("Invalid email"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  role: z.enum(["CUSTOMER", "SELLER"], {
    message: "Please select a role",
  }),
});

export function RegisterForm({ ...props }: React.ComponentProps<typeof Card>) {
  const [showPassword, setShowPassword] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [role, setRole] = useState("CUSTOMER");
  const router = useRouter();

  const form = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      role: "CUSTOMER",
    },
    validators: {
      onSubmit: formSchema,
    },
    onSubmit: async ({ value }) => {
      const toastId = toast.loading("Registering...");

      try {
        const { data, error } = await authClient.signUp.email(value);
        if (error) {
          toast.error(error.message, { id: toastId });
          return;
        }
        console.log(data);

        toast.success("Registration success", { id: toastId });
        router.push("/");
        router.refresh();
      } catch (error) {
        console.log(error);
        toast.error("Something went wrong,", {
          id: toastId,
        });
      }
    },
  });

  const handleGoogleLogin = async () => {
    await authClient.signIn.social({
      provider: "google",
      callbackURL: "http://localhost:3000",
    });
  };

  return (
    <>
      <Button
        variant={"ghost"}
        asChild
        className="w-fit items-center gap-2 justify-start mb-4"
      >
        <Link href={"/"}>
          <ArrowLeft className="h-4 w-4" /> Back to home
        </Link>
      </Button>
      <Card {...props}>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Create an account</CardTitle>
            <CardDescription>
              Enter your information below to create your account
            </CardDescription>
          </div>
          <Badge variant={"default"} className="w-20">
            {role === "SELLER" ? "Seller" : "Customer"}
          </Badge>
        </CardHeader>
        <CardContent>
          <form
            id="register-form"
            onSubmit={(e) => {
              e.preventDefault();
              form.handleSubmit();
            }}
          >
            <FieldGroup>
              {/* Name */}
              <form.Field name="name">
                {(field) => {
                  const isInvalid =
                    field.state.meta.isTouched && !field.state.meta.isValid;
                  return (
                    <Field data-invalid={isInvalid}>
                      <FieldLabel htmlFor={field.name}>Name</FieldLabel>

                      <Input
                        type="text"
                        id={field.name}
                        name={field.name}
                        value={field.state.value}
                        onChange={(e) => field.handleChange(e.target.value)}
                      />
                      {isInvalid && (
                        <FieldError 
                        errors={field.state.meta.errors} 
                        />
                      )}
                    </Field>
                  );
                }}
              </form.Field>

              {/* email */}
              <form.Field name="email">
                  {(field) => {
                    const isInvalid = 
                      field.state.meta.isTouched && !field.state.meta.isValid

                      return (
                        <Field data-invalid={isInvalid}>
                            <FieldLabel htmlFor={field.name}>Email</FieldLabel>

                            <Input 
                             type="email"
                             id={field.name}
                             name={field.name}
                             value={field.state.value}
                             onChange={(e) => 
                              field.handleChange(e.target.value)
                             }
                            />
                            {
                              isInvalid && (
                                <FieldError 
                                 errors={field.state.meta.errors}
                                />
                              )
                            }
                        </Field>
                      )
                  }}
              </form.Field>

              {/* role */}
              <form.Field name="role">
                 {(field) => (
                  <Field>
                     <div className="flex items-center justify-between border rounded-full overflow-hidden mt-1 w-full">
                       {['CUSTOMER', 'SELLER'].map(
                        (roleOption) => (
                          <button
                          key={roleOption}
                          type="button"
                          onClick={()=>{
                            setRole(roleOption);
                            field.handleChange(roleOption)
                          }}
                          className={`flex-1 px-4 py-2 transition-colors font-medium cursor-pointer ${
                            field.state.value === roleOption 
                            ? 'bg-primary text-white'
                            : 'bg-white text-black dark:bg-black dark:text-white'
                          }`}
                          >
                            {
                              roleOption.charAt(0) + roleOption.slice(1).toLowerCase()
                            }
                          </button>
                        )
                       )}
                     </div>
                  </Field>
                 )}
              </form.Field>
            </FieldGroup>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col items-center w-full gap-3">
          <Button 
          form="register-form" 
          type="submit" 
          className="w-full cursor-pointer bg-[#2B93C4] hover:bg-[#2B93Ca]"
          >Register
          </Button>
          <Button
          onClick={()=> handleGoogleLogin()}
          variant={'outline'}
          type="button"
          className="w-full cursor-pointer" 
          >
            <FcGoogle /> Sign up with Google
          </Button>
          <FieldDescription className="text-center">
             Already have an account?
             <Link href={'/login'}>Login</Link>
          </FieldDescription>
        </CardFooter>
      </Card>
    </>
  );
}
