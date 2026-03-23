"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";

import { signUpSchema, type SignUpValues } from "@/lib/validations/auth";
import { toast } from "sonner";

// Tes nouveaux composants de structure de champ
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSet,
} from "@/components/ui/field";
import {
  Form,
  FormControl,
  FormField,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { signUp } from "@/server/Users";
import { useRouter } from "next/navigation";

export const SignUpForm = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<SignUpValues>({
    resolver: zodResolver(signUpSchema),
    defaultValues: { name: "", email: "", password: "", terms: false },
  });

  async function onSubmit(values: SignUpValues) {
    setIsLoading(true);

    const { success, message } = await signUp(
      values.name,
      values.email,
      values.password,
    );

    if (success) {
      toast.success(message as string);
      router.push("/dashboard");
    } else {
      toast.error(message as string);
    }

    setIsLoading(false);
  }

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="bg-surface-container-lowest p-8 md:p-10 rounded-xl shadow-2xl border border-outline-variant/20">
        <div className="mb-8 space-y-2">
          <h2 className="text-2xl font-headline font-bold text-on-surface">
            Create your account
          </h2>
          <p className="text-on-surface-variant text-sm italic">
            Enter the digital atelier of expertise.
          </p>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FieldSet>
              <FieldGroup className="space-y-4">
                {/* Champ Nom */}
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <Field>
                      <FieldLabel className="text-on-surface-variant uppercase text-[10px] tracking-widest font-bold">
                        Full Name
                      </FieldLabel>
                      <FormControl>
                        <Input
                          placeholder="John Atelier"
                          {...field}
                          className="bg-surface-container-low border-none h-12"
                        />
                      </FormControl>
                      <FormMessage />
                    </Field>
                  )}
                />

                {/* Champ Email */}
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <Field>
                      <FieldLabel className="text-on-surface-variant uppercase text-[10px] tracking-widest font-bold">
                        Email Address
                      </FieldLabel>
                      <FormControl>
                        <Input
                          placeholder="name@example.com"
                          {...field}
                          className="bg-surface-container-low border-none h-12"
                        />
                      </FormControl>
                      <FieldDescription className="text-[10px]">
                        We&apos;ll never share your email.
                      </FieldDescription>
                      <FormMessage />
                    </Field>
                  )}
                />

                {/* Champ Password */}
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <Field>
                      <FieldLabel className="text-on-surface-variant uppercase text-[10px] tracking-widest font-bold">
                        Password
                      </FieldLabel>
                      <div className="relative">
                        <FormControl>
                          <Input
                            type={showPassword ? "text" : "password"}
                            {...field}
                            className="bg-surface-container-low border-none h-12 pr-10"
                          />
                        </FormControl>
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-outline"
                        >
                          {showPassword ? (
                            <EyeOff size={16} />
                          ) : (
                            <Eye size={16} />
                          )}
                        </button>
                      </div>
                      <FieldDescription className="text-[10px]">
                        At least 8 characters required.
                      </FieldDescription>
                      <FormMessage />
                    </Field>
                  )}
                />
              </FieldGroup>
            </FieldSet>

            {/* Checkbox Terms */}
            <FormField
              control={form.control}
              name="terms"
              render={({ field }) => (
                <div className="flex items-center gap-3">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <label className="text-xs text-on-surface-variant">
                    I agree to the{" "}
                    <Link href="#" className="text-primary font-bold">
                      Terms of Service
                    </Link>
                  </label>
                </div>
              )}
            />

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full h-14 bg-linear-to-br from-primary to-primary-container font-headline font-bold text-lg shadow-lg shadow-primary/20"
            >
              {isLoading ? (
                <Loader2 className="animate-spin" />
              ) : (
                "Create Account"
              )}
            </Button>
          </form>
        </Form>

        <div className="mt-8 text-center border-t border-outline-variant/10 pt-6">
          <p className="text-on-surface-variant text-sm">
            Already part of the atelier?
            <Link
              className="text-primary font-bold hover:underline ml-1"
              href="/sign-in"
            >
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};
