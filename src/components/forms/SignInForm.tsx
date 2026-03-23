"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, Loader2, Lock, Mail } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";

import { signInSchema, type SignInValues } from "@/lib/validations/auth";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Field, FieldGroup, FieldLabel, FieldSet } from "@/components/ui/field";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { signIn } from "@/server/Users";
import { useRouter } from "next/navigation";

export const SignInForm = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm<SignInValues>({
    resolver: zodResolver(signInSchema),
    defaultValues: { email: "", password: "", remember: false },
  });

  async function onSubmit(values: SignInValues) {
    setIsLoading(true);

    const { success, message } = await signIn(values.email, values.password);

    if (success) {
      toast.success(message as string);
      router.push("/dashboard");
    } else {
      toast.error(message as string);
    }

    setIsLoading(false);
  }

  return (
    <div className="w-full max-w-md space-y-10">
      <div className="space-y-3">
        <h2 className="font-headline text-4xl font-extrabold text-on-surface tracking-tight">
          Welcome back
        </h2>
        <p className="text-on-surface-variant font-medium font-body">
          Enter your credentials to access your workshop.
        </p>
      </div>

      {/* Social Logins
      <div className="grid grid-cols-2 gap-4">
        <Button
          variant="outline"
          className="h-12 bg-surface-container-lowest ghost-border"
          onClick={() => authClient.signIn.social({ provider: "google" })}
        >
          <img
            src="https://www.google.com/favicon.ico"
            alt="Google"
            className="w-4 h-4 mr-2"
          />
          Google
        </Button>
        <Button
          variant="outline"
          className="h-12 bg-surface-container-lowest ghost-border"
          onClick={() => authClient.signIn.social({ provider: "github" })}
        >
          <Github className="w-4 h-4 mr-2" />
          GitHub
        </Button>
      </div> */}

      <div className="relative flex items-center py-2">
        <div className="grow border-t border-outline-variant/30"></div>
        <span className="mx-4 text-[10px] font-bold text-outline uppercase tracking-widest">
          or email
        </span>
        <div className="grow border-t border-outline-variant/30"></div>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FieldSet>
            <FieldGroup className="space-y-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <Field>
                      <FieldLabel className="text-xs font-bold text-on-surface-variant ml-1">
                        Email Address
                      </FieldLabel>
                      <div className="relative">
                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-outline w-5 h-5" />
                        <FormControl>
                          <Input
                            {...field}
                            placeholder="name@atelier.com"
                            className="pl-12 h-14 bg-surface-container-lowest border-outline-variant/30 rounded-xl"
                          />
                        </FormControl>
                      </div>
                      <FormMessage />
                    </Field>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <Field>
                      <div className="flex justify-between items-center ml-1">
                        <FieldLabel className="text-xs font-bold text-on-surface-variant">
                          Password
                        </FieldLabel>
                        <Link
                          href="#"
                          className="text-xs font-bold text-primary hover:underline"
                        >
                          Forgot?
                        </Link>
                      </div>
                      <div className="relative">
                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-outline w-5 h-5" />
                        <FormControl>
                          <Input
                            {...field}
                            type={showPassword ? "text" : "password"}
                            placeholder="••••••••"
                            className="pl-12 pr-12 h-14 bg-surface-container-lowest border-outline-variant/30 rounded-xl"
                          />
                        </FormControl>
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-4 top-1/2 -translate-y-1/2 text-outline"
                        >
                          {showPassword ? (
                            <EyeOff size={18} />
                          ) : (
                            <Eye size={18} />
                          )}
                        </button>
                      </div>
                      <FormMessage />
                    </Field>
                  </FormItem>
                )}
              />
            </FieldGroup>
          </FieldSet>

          <FormField
            control={form.control}
            name="remember"
            render={({ field }) => (
              <div className="flex items-center gap-3 px-1">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <label className="text-sm font-medium text-on-surface-variant">
                  Remember for 30 days
                </label>
              </div>
            )}
          />

          <Button
            disabled={isLoading}
            className="w-full h-14 bg-linear-to-br from-primary to-primary-container text-white font-bold text-lg rounded-xl shadow-xl shadow-primary/20 transition-all hover:scale-[1.01]"
          >
            {isLoading ? (
              <Loader2 className="animate-spin" />
            ) : (
              "Sign In to Atelier"
            )}
          </Button>
        </form>
      </Form>

      <p className="text-center text-on-surface-variant font-medium pt-4">
        New to the Atelier?
        <Link
          className="text-primary font-bold hover:underline ml-1"
          href="/sign-up"
        >
          Create an account
        </Link>
      </p>
    </div>
  );
};
