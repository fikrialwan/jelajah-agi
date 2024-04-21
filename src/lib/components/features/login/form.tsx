"use client";

import { useCookies } from "next-client-cookies";
import { signInWithEmailAndPassword } from "firebase/auth";
import { get, child, ref } from "firebase/database";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { loginFormSchema } from "~/lib/schema/login.schema";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../ui/form";
import { Input } from "../../ui/input";
import { Button } from "../../ui/button";
import { useState } from "react";
import { auth, db } from "~/lib/api/firebase";
import { useToast } from "../../ui/use-toast";
import { useRouter } from "next/navigation";
import { ToastAction } from "../../ui/toast";

export default function LoginForm() {
  const router = useRouter();
  const cookies = useCookies();
  const { toast } = useToast();

  const [isLoading, setLoading] = useState<boolean>();

  const form = useForm<z.infer<typeof loginFormSchema>>({
    resolver: zodResolver(loginFormSchema),
  });

  async function onSubmit(values: z.infer<typeof loginFormSchema>) {
    try {
      if (!isLoading) {
        setLoading(true);
        const userCredential = await signInWithEmailAndPassword(
          auth,
          values.email,
          values.password
        );
        if (userCredential.user) {
          const role = await get(
            child(ref(db), `account/${userCredential.user.uid}/type`)
          );
          cookies.set("role", role.val() as string);
          cookies.set("uid", userCredential.user.uid);

          setLoading(false);
          toast({
            variant: "success",
            title: "Success",
            description: "Login successfully",
          });
          router.replace(`/${role.val() as string}`);
        } else {
          setLoading(false);
          toast({
            variant: "destructive",
            title: "Uh oh! Login failed.",
            description: "Please check your email and password again.",
            action: <ToastAction altText="Try again">Try again</ToastAction>,
          });
        }
      }
    } catch (error) {
      setLoading(false);
      toast({
        variant: "destructive",
        title: "Uh oh! Login failed.",
        description: "Please check your email and password again.",
        action: <ToastAction altText="Try again">Try again</ToastAction>,
      });
    }
  }
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        aria-label="form-login"
        className="flex flex-col gap-3"
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="example@gmail.com" {...field} />
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
                <Input placeholder="*********" type="password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button variant={isLoading ? "secondary" : "default"} className="my-4">
          {isLoading ? "Loading..." : "Login"}
        </Button>
      </form>
    </Form>
  );
}
