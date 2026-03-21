"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Clock, Coins, Loader2, Sparkles } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { skillSchema, type SkillValues } from "@/lib/validations/skill";
import { createSkill } from "@/server/Skills";

import { Button } from "@/components/ui/button";
import { Field, FieldGroup, FieldLabel, FieldSet } from "@/components/ui/field";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";

export const CreateSkillForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const form = useForm<SkillValues>({
    resolver: zodResolver(skillSchema),
    defaultValues: {
      title: "",
      description: "",
      category: "",
      tokenCost: 1,
      duration: 60,
      isActive: true,
    },
  });

  async function onSubmit(values: SkillValues) {
    setIsLoading(true);
    const result = await createSkill(
      values.title,
      values.description,
      values.category,
      values.tokenCost,
      values.duration,
      values.isActive,
    );

    if (result.success) {
      toast.success("Skill publié dans l'Atelier !");
      router.push("/explore");
      router.refresh();
    } else {
      toast.error(result.message);
    }
    setIsLoading(false);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 max-w-2xl mx-auto bg-surface-container-lowest p-8 rounded-3xl border border-outline-variant/10 shadow-sm"
      >
        <div className="space-y-2">
          <h2 className="text-3xl font-headline font-extrabold tracking-tight">
            Post a New Skill
          </h2>
          <p className="text-on-surface-variant font-medium font-body italic">
            Define your expertise and set your terms.
          </p>
        </div>

        <FieldSet>
          <FieldGroup className="space-y-6">
            {/* Title */}
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <Field>
                    <FieldLabel className="text-xs font-bold uppercase tracking-widest text-outline">
                      Skill Title
                    </FieldLabel>
                    <div className="relative">
                      <Sparkles className="absolute left-4 top-4 text-outline w-4 h-4" />
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="e.g. Advanced UI Motion Design"
                          className="pl-12 h-14 bg-surface-container-low border-none rounded-xl"
                        />
                      </FormControl>
                    </div>
                    <FormMessage />
                  </Field>
                </FormItem>
              )}
            />

            {/* Category & Duration */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <Field>
                      <FieldLabel className="text-xs font-bold uppercase tracking-widest text-outline">
                        Category
                      </FieldLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="h-14 bg-surface-container-low border-none rounded-xl">
                            <SelectValue placeholder="Select category" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="design">Design</SelectItem>
                          <SelectItem value="dev">Development</SelectItem>
                          <SelectItem value="business">Business</SelectItem>
                          <SelectItem value="marketing">Marketing</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </Field>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="duration"
                render={({ field }) => (
                  <FormItem>
                    <Field>
                      <FieldLabel className="text-xs font-bold uppercase tracking-widest text-outline">
                        Duration (min)
                      </FieldLabel>
                      <div className="relative">
                        <Clock className="absolute left-4 top-4 text-outline w-4 h-4" />
                        <FormControl>
                          <Input
                            {...field}
                            type="number"
                            className="pl-12 h-14 bg-surface-container-low border-none rounded-xl"
                          />
                        </FormControl>
                      </div>
                      <FormMessage />
                    </Field>
                  </FormItem>
                )}
              />
            </div>

            {/* Description */}
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <Field>
                    <FieldLabel className="text-xs font-bold uppercase tracking-widest text-outline">
                      Description
                    </FieldLabel>
                    <FormControl>
                      <Textarea
                        {...field}
                        rows={5}
                        placeholder="What will the learner achieve?"
                        className="bg-surface-container-low border-none rounded-xl p-4"
                      />
                    </FormControl>
                    <FormMessage />
                  </Field>
                </FormItem>
              )}
            />

            {/* Cost & Visibility */}
            <div className="flex flex-col md:flex-row items-center justify-between p-6 bg-primary/5 rounded-2xl border border-primary/10 gap-6">
              <FormField
                control={form.control}
                name="tokenCost"
                render={({ field }) => (
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-white rounded-xl shadow-sm">
                      <Coins className="text-secondary w-6 h-6" />
                    </div>
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-widest text-outline">
                        Token Cost
                      </p>
                      <FormControl>
                        <input
                          {...field}
                          type="number"
                          className="bg-transparent border-none text-2xl font-headline font-extrabold w-20 focus:ring-0"
                        />
                      </FormControl>
                    </div>
                  </div>
                )}
              />

              <FormField
                control={form.control}
                name="isActive"
                render={({ field }) => (
                  <div className="flex items-center gap-3 bg-white px-4 py-2 rounded-xl shadow-sm">
                    <span className="text-xs font-bold text-on-surface">
                      Active Listing
                    </span>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  </div>
                )}
              />
            </div>
          </FieldGroup>
        </FieldSet>

        <Button
          disabled={isLoading}
          className="w-full h-16 bg-on-surface text-surface hover:bg-primary hover:text-white font-bold text-lg rounded-2xl shadow-xl transition-all active:scale-[0.98]"
        >
          {isLoading ? (
            <Loader2 className="animate-spin" />
          ) : (
            "Publish to Atelier"
          )}
        </Button>
      </form>
    </Form>
  );
};
