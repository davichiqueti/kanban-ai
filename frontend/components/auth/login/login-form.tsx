"use client"

import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form"

import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

const formSchema = z.object({
    username: z
        .string({
            required_error: "Username is requiered."
        }),
    password: z
        .string({
            required_error: "Password is requiered."
        })
        .min(7, { message: "Must have at least 7 characters." })
        .max(12),
})

export default function Login() {

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            username: "",
            password: "",
        }
    })
    
//flex flex-col justify-center items-center space-y-2
    return (
        <div className="flex flex-col justify-center p-6 space-y-2
                        border rounded-xl shadow-2xl  ">

            <span>Login to your account</span>

            <Form {...form}>
                <form
                    
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
