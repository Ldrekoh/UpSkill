"use client";

import { useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { skillSchema, type SkillValues } from "@/lib/validations/skill";
import { createSkill, updateSkill } from "@/server/Skills";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import {
  Plus,
  Trash2,
  Zap,
  Clock,
  Coins,
  Loader2,
  CheckCircle2,
  ArrowLeft,
} from "@/components/ui/Icons";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface SkillFormProps {
  initialData?: SkillValues & { id: string };
}

export function SkillForm({ initialData }: SkillFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const isEditMode = !!initialData;

  const form = useForm<SkillValues>({
    resolver: zodResolver(skillSchema),
    defaultValues: initialData || {
      title: "",
      description: "",
      category: "",
      tokenCost: 1,
      duration: 30,
      isActive: true,
      learningOutcomes: ["", ""],
    },
  });

  const { fields, append, remove } = useFieldArray({
    name: "learningOutcomes",
    control: form.control,
  });

  async function onSubmit(values: SkillValues) {
    setIsLoading(true);
    try {
      const cleanValues = {
        ...values,
        learningOutcomes: values.learningOutcomes.filter(
          (o) => o.trim() !== "",
        ),
      };

      const result = isEditMode
        ? await updateSkill(initialData.id, cleanValues)
        : await createSkill(cleanValues);

      if (result.success) {
        toast.success(result.message || "Success!");
        router.refresh();
        router.push(isEditMode ? `/skills/${initialData.id}` : "/skills");
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      toast.error("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-10 max-w-3xl mx-auto"
      >
        {/* --- SECTION 1 : BASIC INFO --- */}
        <div className="p-8 rounded-[2.5rem] bg-surface border border-outline-variant/10 space-y-6 shadow-sm">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-primary/10 rounded-xl text-primary">
              <Zap size={20} />
            </div>
            <h2 className="font-headline font-black italic text-2xl tracking-tight">
              {isEditMode ? "Update the Craft" : "The Essentials"}
            </h2>
          </div>

          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-[10px] font-black uppercase tracking-widest text-outline">
                  Workshop Title
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="e.g. Master Advanced Framer Motion"
                    {...field}
                    className="h-14 rounded-2xl bg-surface-container-low border-none italic font-medium"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-[10px] font-black uppercase tracking-widest text-outline">
                    Category
                  </FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="w-full rounded-2xl bg-surface-container-low border-none">
                        <SelectValue placeholder="Select a craft" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="rounded-2xl border-outline-variant/10 z-100">
                      <SelectItem value="design">Design & Creative</SelectItem>
                      <SelectItem value="development">Development</SelectItem>
                      <SelectItem value="business">
                        Business & Strategy
                      </SelectItem>
                      <SelectItem value="marketing">Marketing</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="duration"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-[10px] font-black uppercase tracking-widest text-outline">
                    Duration (Min)
                  </FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Clock
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-outline"
                        size={18}
                      />
                      <Input
                        type="number"
                        {...field}
                        className="h-14 pl-12 rounded-2xl bg-surface-container-low border-none"
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-[10px] font-black uppercase tracking-widest text-outline">
                  Description
                </FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Describe the value..."
                    className="min-h-[150px] rounded-[2rem] bg-surface-container-low border-none p-6 leading-relaxed"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* --- SECTION 2 : PRICING --- */}
        <div className="p-8 rounded-[2.5rem] bg-on-surface text-surface space-y-6 shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 blur-[50px] rounded-full" />
          <div className="flex items-center justify-between relative z-10">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary rounded-xl text-white">
                <Coins size={20} />
              </div>
              <h2 className="font-headline font-black italic text-2xl tracking-tight">
                Value Exchange
              </h2>
            </div>
            <FormField
              control={form.control}
              name="tokenCost"
              render={({ field }) => (
                <FormItem className="flex items-center gap-4 space-y-0">
                  <FormControl>
                    <Input
                      type="number"
                      {...field}
                      className="h-16 w-24 rounded-2xl bg-white/10 border-none text-2xl font-headline font-black italic text-center text-white"
                    />
                  </FormControl>
                  <span className="font-black uppercase tracking-widest text-[10px] text-white/50">
                    Tokens
                  </span>
                </FormItem>
              )}
            />
          </div>
        </div>

        {/* --- SECTION 3 : OUTCOMES --- */}
        <div className="p-8 rounded-[2.5rem] bg-surface border border-outline-variant/10 space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-xl text-primary">
                <CheckCircle2 size={20} />
              </div>
              <h2 className="font-headline font-black italic text-2xl tracking-tight">
                Takeaways
              </h2>
            </div>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => append("")}
              className="rounded-full text-primary font-black text-[10px] uppercase tracking-widest"
            >
              <Plus size={14} className="mr-2" /> Add
            </Button>
          </div>

          <div className="space-y-3">
            {fields.map((field, index) => (
              <FormField
                key={field.id}
                control={form.control}
                name={`learningOutcomes.${index}`}
                render={({ field }) => (
                  <FormItem>
                    <div className="flex gap-2">
                      <FormControl>
                        <Input
                          placeholder="Learning goal..."
                          {...field}
                          className="h-12 rounded-xl bg-surface-container-low border-none italic"
                        />
                      </FormControl>
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() => remove(index)}
                        className="text-outline hover:text-error rounded-xl"
                      >
                        <Trash2 size={18} />
                      </Button>
                    </div>
                  </FormItem>
                )}
              />
            ))}
          </div>
        </div>

        {/* --- SUBMIT --- */}
        <div className="pt-6">
          <Button
            type="submit"
            disabled={isLoading}
            className="w-full h-20 rounded-[2rem] bg-primary text-white font-headline font-black italic text-2xl shadow-2xl shadow-primary/20 hover:scale-[1.01] transition-all"
          >
            {isLoading ? (
              <Loader2 className="animate-spin" size={24} />
            ) : isEditMode ? (
              "Save Changes"
            ) : (
              "Publish Workshop"
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
}
