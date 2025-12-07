"use client";
import React, { useEffect, useState } from "react";

type Prompt = {
  id: string;
  title: string;
  content: string;
  tags: string[];
  updatedAt: string;
};

export default function PromptList() {
  const [prompts, setPrompts] = useState<Prompt[]>([]);
  const [loading, setLoading] = useState(false);

  async function fetchPrompts() {
    setLoading(true);
    const res = await fetch("/api/prompts");
    const data = await res.json();
    setPrompts(data);
    setLoading(false);
  }

  useEffect(() => {
    fetchPrompts();
  }, []);

  async function handleDelete(id: string) {
    await fetch(`/api/prompts?id=${id}`, { method: "DELETE" });
    setPrompts((p) => p.filter((x) => x.id !== id));
  }

  return (
    <div className="bg-white/5 rounded-lg p-4">
      <h2 className="text-xl font-semibold mb-3">Prompts</h2>
      {loading && <div>Loading...</div>}
      <ul className="space-y-3">
        {prompts.map((p) => (
          <li
            key={p.id}
            className="p-3 bg-white/2 rounded flex justify-between items-start"
          >
            <div>
              <h3 className="font-medium">{p.title}</h3>
              <p className="text-sm mt-1">{p.content}</p>
              <div className="text-xs mt-2 text-muted-foreground">
                Updated: {new Date(p.updatedAt).toLocaleString()}
              </div>
            </div>

            <div className="flex flex-col gap-2 ml-4">
              <button
                className="text-sm underline"
                onClick={() => {
                  navigator.clipboard.writeText(p.content);
                }}
              >
                Copy
              </button>
              <button
                className="text-sm text-red-400"
                onClick={() => handleDelete(p.id)}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
