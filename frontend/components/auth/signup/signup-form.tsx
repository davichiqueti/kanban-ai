"use client"

import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form"

import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

import { useRouter } from "next/navigation"
import { signup } from "@/lib/services/userService";

const formSchema = z.object({
  name: z
    .string({
      required_error: "Name is requiered"
    }),
  username: z
    .string({
      required_error: "Username is requiered."
    }),
  email: z
    .string({
      required_error: "Email is requiered."
    })
    .email({
      message: "Must be a valid email."
    }),
  password: z
    .string({
      required_error: "Password is requiered."
    })
    .min(4, { message: "Must have at least 4 characters." })
    .max(12),
})

export default function SignUp() {

  const router = useRouter()

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {

      console.log(values)
      const result = await signup(values);

      if (result) {
        form.reset()
        router.push("/")
      }

    } catch (error) {
      console.log("Signup form", error)

    }
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      username: "",
      email: "",
      password: "",
    }
  })

  return (
    <div className="flex flex-col justify-center p-6 space-y-2
                        border rounded-xl shadow-2xl  ">

      <span>Create your account</span>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col space-y-2">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input placeholder="" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type="email" placeholder="" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit">Sign Up</Button>

        </form>
      </Form>
    </div>
  );
}
