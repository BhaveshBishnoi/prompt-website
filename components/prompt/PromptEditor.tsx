"use client";
import React, { useState } from "react";

export default function PromptEditor() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState("");

  async function handleCreate() {
    const body = {
      title,
      content,
      tags: tags
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean),
    };
    const res = await fetch("/api/prompts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    if (res.ok) {
      setTitle("");
      setContent("");
      setTags("");
      alert("Created");
    }
  }

  return (
    <div className="bg-white/5 rounded-lg p-4">
      <h2 className="text-lg font-semibold mb-3">New Prompt</h2>
      <label className="block mb-2">
        <div className="text-sm">Title</div>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full rounded bg-white/3 p-2 mt-1"
        />
      </label>

      <label className="block mb-2">
        <div className="text-sm">Content</div>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full rounded bg-white/3 p-2 mt-1"
          rows={6}
        />
      </label>

      <label className="block mb-4">
        <div className="text-sm">Tags (comma separated)</div>
        <input
          value={tags}
          onChange={(e) => setTags(e.target.value)}
          className="w-full rounded bg-white/3 p-2 mt-1"
        />
      </label>

      <div className="flex gap-2">
        <button
          onClick={handleCreate}
          className="px-4 py-2 bg-blue-600 rounded"
        >
          Create
        </button>
      </div>
    </div>
  );
}
