"use client";

import { useState, useRef } from "react";
import { uploadAvatarAction } from "@/server/Users";
import { toast } from "sonner";
import Image from "next/image";
import { Camera, Loader2 } from "lucide-react";
import { Exo_2 } from "next/font/google";

export function AvatarUpload({
  initialImage,
}: {
  initialImage?: string | null;
}) {
  const [imgUrl, setImgUrl] = useState(initialImage);
  const [isPending, setIsPending] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validation rapide
    if (file.size > 2 * 1024 * 1024) {
      return toast.error("File too large (max 2MB)");
    }

    setIsPending(true);
    const formData = new FormData();
    formData.append("avatar", file);

    const result = await uploadAvatarAction(formData);

    if (result.success) {
      setImgUrl(result.url);
      toast.success("Avatar updated!");
    } else {
      toast.error(result.error || "Something went wrong");
    }
    setIsPending(false);
  };

  return (
    <div className="relative mx-auto w-32 h-32 group">
      <div className="relative w-full h-full rounded-[2.5rem] overflow-hidden border-4 border-surface-container-highest bg-surface-container-low">
        <Image
          src={imgUrl || "/avatar-placeholder.png"}
          alt="Profile"
          fill
          className={`object-cover ${isPending ? "opacity-40" : "opacity-100"}`}
        />
        {isPending && (
          <div className="absolute inset-0 flex items-center justify-center">
            <Loader2 className="animate-spin text-primary" />
          </div>
        )}
      </div>

      {/* Input caché */}
      <input
        type="file"
        className="hidden"
        ref={fileInputRef}
        accept="image/*"
        onChange={handleFileChange}
      />

      {/* Bouton Trigger */}
      <button
        onClick={() => fileInputRef.current?.click()}
        disabled={isPending}
        className="absolute -bottom-2 -right-2 w-10 h-10 rounded-2xl bg-on-surface text-surface shadow-lg hover:bg-primary transition-all flex items-center justify-center disabled:opacity-50"
      >
        <Camera size={18} />
      </button>
    </div>
  );
}
