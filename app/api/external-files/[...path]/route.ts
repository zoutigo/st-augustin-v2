/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from "next/server";
import path from "path";
import { promises as fs } from "fs";
import mime from "mime-types";

const EXTERNAL_UPLOAD_DIR =
  process.env.EXTERNAL_UPLOAD_DIR || "/home/zoutigo/projets/nextjs/files";
// Always resolve to an absolute path to avoid './uploads' vs 'uploads' mismatches
const BASE_UPLOAD_DIR = path.resolve(EXTERNAL_UPLOAD_DIR);

if (!EXTERNAL_UPLOAD_DIR) {
  throw new Error(
    "EXTERNAL_UPLOAD_DIR is not defined in the environment variables",
  );
}

/**
 * Validate the given file path to prevent directory traversal attacks
 * and ensure it adheres to expected patterns.
 */
const validateFilePath = (filePath: string): boolean => {
  // Ensure the file path contains only allowed characters
  const isPathValid = /^[a-zA-Z0-9_\-./]+$/.test(filePath);
  return isPathValid;
};

export async function GET(
  request: Request,
  { params }: { params: { path: string[] } },
) {
  console.log("Received params:", params);
  console.log("EXTERNAL_UPLOAD_DIR:", EXTERNAL_UPLOAD_DIR);
  console.log("BASE_UPLOAD_DIR (resolved):", BASE_UPLOAD_DIR);

  try {
    const filePathArray = params.path;

    if (!filePathArray || filePathArray.length === 0) {
      console.error("Invalid file path: no path provided");
      return NextResponse.json({ error: "Invalid file path" }, { status: 400 });
    }

    // Combine file path components
    const filePath = path.join(...filePathArray);

    // Validate the file path
    if (!validateFilePath(filePath)) {
      console.error("Invalid characters in file path:", filePath);
      return NextResponse.json({ error: "Invalid file path" }, { status: 400 });
    }

    // Normalize and construct the full path
    const safePath = path.normalize(filePath).replace(/^(\.\.(\/|\\|$))+/, "");
    // Resolve the full path inside the base directory
    const fullPath = path.resolve(BASE_UPLOAD_DIR, safePath);

    console.log("Safe path:", safePath);
    console.log("Full path:", fullPath);

    // Check if the resolved path is within the allowed directory
    // Ensure computed path stays within the allowed directory
    const baseWithSep = BASE_UPLOAD_DIR.endsWith(path.sep)
      ? BASE_UPLOAD_DIR
      : BASE_UPLOAD_DIR + path.sep;
    if (!fullPath.startsWith(baseWithSep)) {
      console.error("Access to the file is forbidden:", fullPath);
      return NextResponse.json(
        { error: "Access to the file is forbidden" },
        { status: 403 },
      );
    }

    // Read the file from the disk
    const file = await fs.readFile(fullPath);
    const mimeType = mime.lookup(fullPath) || "application/octet-stream";

    console.log("File found, serving with MIME type:", mimeType);

    // Return the file with appropriate headers
    return new Response(file, {
      headers: {
        "Content-Type": mimeType,
        "Content-Disposition": `inline; filename="${path.basename(fullPath)}"`,
      },
    });
  } catch (error: any) {
    if (error.code === "ENOENT") {
      console.error("File not found:", error.message);
      return NextResponse.json({ error: "File not found" }, { status: 404 });
    } else if (error.code === "EACCES") {
      console.error("Permission denied:", error.message);
      return NextResponse.json({ error: "Permission denied" }, { status: 403 });
    } else {
      console.error("Unexpected error:", error.message);
      return NextResponse.json(
        { error: "Internal server error" },
        { status: 500 },
      );
    }
  }
}
