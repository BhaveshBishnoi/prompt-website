"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function CreatePromptForm({
  onCreate,
}: {
  onCreate?: (payload: any) => void;
}) {
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [price, setPrice] = useState("0");
  const [preview, setPreview] = useState("");
  const [model, setModel] = useState("GPT4");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const payload = { title, slug, price: Number(price), preview, model };
    onCreate?.(payload);
    // Ideally call API route to persist via Prisma
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium">Title</label>
        <Input value={title} onChange={(e) => setTitle(e.target.value)} />
      </div>

      <div>
        <label className="block text-sm font-medium">Slug</label>
        <Input value={slug} onChange={(e) => setSlug(e.target.value)} />
      </div>

      <div>
        <label className="block text-sm font-medium">Price (INR)</label>
        <Input value={price} onChange={(e) => setPrice(e.target.value)} />
      </div>

      <div>
        <label className="block text-sm font-medium">Preview</label>
        <Textarea
          value={preview}
          onChange={(e) => setPreview(e.target.value)}
        />
      </div>

      <div>
        <label className="block text-sm font-medium">AI Model</label>
        <Select onValueChange={(v) => setModel(v)}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select model" />
          </SelectTrigger>
          <SelectItem value="GPT4">GPT-4</SelectItem>
          <SelectItem value="GPT3_5">GPT-3.5</SelectItem>
          <SelectItem value="CLAUDE">Claude</SelectItem>
        </Select>
      </div>

      <div>
        <Button type="submit">Create Prompt</Button>
      </div>
    </form>
  );
}
