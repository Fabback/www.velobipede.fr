import "server-only";

import { readFile } from "fs/promises";
import { type NextRequest, NextResponse } from "next/server";
import path from "path";

export async function GET(request: NextRequest) {
  const fileName = request.nextUrl.searchParams.get("fileName");

  if (!fileName)
    return NextResponse.json({ error: "Bad request" }, { status: 400 });

  return await readFile(path.join(process.cwd(), "public/downloads", fileName))
    .then((buffer) => {
      const headers = new Headers();
      headers.append(
        "Content-Disposition",
        `attachment; filename="${fileName}"`,
      );

      switch (fileName.split(".")[1]) {
        case "pdf":
          headers.append("Content-Type", "application/pdf");
          break;
        case "png":
          headers.append("Content-Type", "image/png");
          break;
      }

      return new Response(buffer, {
        headers,
      });
    })
    .catch((reason) => {
      return NextResponse.json(
        { error: "Internal Server Error" },
        { status: 500 },
      );
    });
}
