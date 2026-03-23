"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import {
  Clock,
  Coins,
  Loader2,
  Sparkles,
  CheckCircle2,
  Plus,
  X,
} from "lucide-react";
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

// --- Sous-composant pour les points d'apprentissage ---
const LearningOutcomesField = ({
  value,
  onChange,
}: {
  value: string[];
  onChange: (val: string[]) => void;
}) => {
  const [currentInput, setCurrentInput] = useState("");

  const addItem = () => {
    if (currentInput.trim()) {
      onChange([...value, currentInput.trim()]);
      setCurrentInput("");
    }
  };

  const removeItem = (index: number) => {
    onChange(value.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {value.map((item, index) => (
          <div
            key={index}
            className="flex items-center gap-3 p-3 bg-surface-container-low rounded-xl border border-outline-variant/5 group"
          >
            <CheckCircle2 size={16} className="text-primary shrink-0" />
            <span className="text-xs font-medium grow truncate">{item}</span>
            <button
              type="button"
              onClick={() => removeItem(index)}
              className="hover:text-error transition-colors"
            >
              <X size={14} />
            </button>
          </div>
        ))}
      </div>
      <div className="flex gap-2">
        <Input
          placeholder="What will they learn?"
          value={currentInput}
          onChange={(e) => setCurrentInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              addItem();
            }
          }}
          className="bg-surface-container-low border-none rounded-xl h-12"
        />
        <Button
          type="button"
          onClick={addItem}
          size="icon"
          className="h-12 w-12 rounded-xl bg-on-surface"
        >
          <Plus size={20} />
        </Button>
      </div>
    </div>
  );
};

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
      learningOutcomes: [], // Initialisé comme tableau vide
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
      values.learningOutcomes, // <--- Transmission du tableau
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
                            onChange={(e) =>
                              field.onChange(parseInt(e.target.value))
                            }
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

            {/* Learning Outcomes - LA NOUVELLE SECTION */}
            <FormField
              control={form.control}
              name="learningOutcomes"
              render={({ field }) => (
                <FormItem>
                  <Field>
                    <FieldLabel className="text-xs font-bold uppercase tracking-widest text-outline">
                      What you'll learn (Points)
                    </FieldLabel>
                    <FormControl>
                      <LearningOutcomesField
                        value={field.value}
                        onChange={field.onChange}
                      />
                    </FormControl>
                    <FormMessage />
                  </Field>
                </FormItem>
              )}
            />

            {/* Description */}
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <Field>
                    <FieldLabel className="text-xs font-bold uppercase tracking-widest text-outline">
                      Full Description
                    </FieldLabel>
                    <FormControl>
                      <Textarea
                        {...field}
                        rows={4}
                        placeholder="Describe the session details..."
                        className="bg-surface-container-low border-none rounded-xl p-4 resize-none"
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
                          onChange={(e) =>
                            field.onChange(parseInt(e.target.value))
                          }
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
                  <FormItem className="flex flex-row items-center justify-between gap-3 bg-white px-4 py-2 rounded-xl shadow-sm border border-outline-variant/5">
                    <div className="space-y-0.5">
                      <p className="text-xs font-bold text-on-surface">
                        Active Listing
                      </p>
                      <p className="text-[10px] text-outline-variant">
                        Visible in exploration
                      </p>
                    </div>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        type="button"
                      />
                    </FormControl>
                  </FormItem>
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
