"use client";

import { useState } from "react";
import {
  Table,
  TableRow,
  TableHead,
  TableCell,
  TableBody,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";

export default function AdminDashboard({ items }: { items?: any[] }) {
  const [list, setList] = useState(items ?? []);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Admin — Prompts</h2>
        <Button>Create</Button>
      </div>

      <Table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Author</th>
            <th>Status</th>
            <th>Price</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {list.map((it: any) => (
            <tr key={it.id}>
              <td>{it.title}</td>
              <td>{it.author?.name}</td>
              <td>{it.status}</td>
              <td>₹{it.price}</td>
              <td>
                <Button variant="ghost">Edit</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}
