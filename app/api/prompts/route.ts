import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function GET() {
  try {
    const filePath = path.join(process.cwd(), "public", "data", "prompts.json");

    if (!fs.existsSync(filePath)) {
      return NextResponse.json(
        { error: "prompts.json not found" },
        { status: 404 }
      );
    }

    const fileContents = fs.readFileSync(filePath, "utf8");
    const prompts = JSON.parse(fileContents);

    return NextResponse.json(prompts, {
      headers: {
        "Cache-Control": "no-store, max-age=0",
      },
    });
  } catch (error) {
    console.error("Error reading prompts:", error);
    return NextResponse.json(
      { error: "Failed to load prompts" },
      { status: 500 }
    );
  }
}
