import { NextResponse } from "next/server";
import formidable, { Fields, Files } from "formidable";
import path from "path";
import { spawn } from "child_process";
import { Readable } from "stream";
//route
// Parse form data from the Next.js Request
async function parseForm(req: Request): Promise<{ fields: Fields; files: Files }> {
  // Ensure content type is multipart/form-data
  const contentType = req.headers.get("content-type") || "";
  if (!contentType.includes("multipart/form-data")) {
    throw new Error("Unsupported content type");
  }

  // Convert Next.js Request to IncomingMessage
  const body = await req.arrayBuffer();
  const stream = Readable.from(Buffer.from(body));
  const incomingMessage = Object.assign(stream, {
    headers: Object.fromEntries(req.headers),
    method: req.method,
    url: req.url,
  });

  const form = formidable({
    uploadDir: path.join(process.cwd(), "public/uploads"),
    keepExtensions: true,
    maxFileSize: 5 * 1024 * 1024, // 5MB limit
    filter: ({ mimetype }) => mimetype?.startsWith("image/") ?? false,
  });

  return new Promise((resolve, reject) => {
    form.parse(incomingMessage as any, (err, fields, files) => {
      if (err) reject(err);
      else resolve({ fields, files });
    });
  });
}

// Disable automatic body parsing for this route
export const config = {
  api: {
    bodyParser: false,
  },
};

// POST handler for processing photos
export async function POST(req: Request) {
  try {
    const { files } = await parseForm(req);
    const photo = files.photo;

    if (!photo) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    const file = Array.isArray(photo) ? photo[0] : photo;
    const filePath = (file as formidable.File).filepath;

    // Run the Python script
    const pythonProcess = spawn("python3", [path.join(process.cwd(), "main.py"), filePath]);

    let result = "";
    let error = "";

    pythonProcess.stdout.on("data", (data) => {
      result += data.toString();
    });

    pythonProcess.stderr.on("data", (data) => {
      error += data.toString();
    });

    return new Promise((resolve) => {
      pythonProcess.on("close", (code) => {
        if (code !== 0) {
          resolve(NextResponse.json({ error: "Python script error: " + error }, { status: 500 }));
        } else {
          try {
            const parsedResult = JSON.parse(result);
            resolve(NextResponse.json(parsedResult));
          } catch {
            resolve(NextResponse.json({ error: "Error parsing Python script output" }, { status: 500 }));
          }
        }
      });
    });
  } catch (err) {
    console.error("Error processing file upload:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
