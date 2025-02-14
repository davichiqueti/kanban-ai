"use client"

import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form"

import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

import { useRouter } from "next/navigation"
import { login } from "@/lib/services/authService";

const formSchema = z.object({
  username: z
    .string({
      required_error: "Username is requiered."
    }),
  password: z
    .string({
      required_error: "Password is requiered."
    })
    .min(4, { message: "Must have at least 4 characters." })
    .max(12),
})

export default function Login() {

  const router = useRouter()

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {

      const result = await login(values);

      if (result) {
        form.reset()
        router.push("/")
      }

    } catch (error) {
      console.log("Login form", error)
    }
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
    }
  })

  return (
    <div className="flex flex-col justify-center p-6 space-y-2
                        border rounded-xl shadow-2xl  ">

      <span>Login to your account</span>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col space-y-2"
        >
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input
                    placeholder=""
                    {...field}
                  />
                </FormControl>
                <FormDescription></FormDescription>
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
                  <Input
                    placeholder=""
                    {...field}
                  />
                </FormControl>
                <FormDescription></FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit"> Login</Button>

        </form>
      </Form>
    </div>
  )
}
