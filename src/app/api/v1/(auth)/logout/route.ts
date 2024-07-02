import { NextRequest, NextResponse } from "next/server";
import { permanentRedirect } from "next/navigation";

export async function GET(req: NextRequest) {
  try {
    const token: string | undefined = req.cookies.get("token")?.value;
    console.log(typeof token);
    if (typeof token === undefined) throw new Error("Token unavailable!");

    const res = NextResponse.json(
      { message: "Success logout" },
      { status: 200 }
    );
    res.cookies.delete("token");

    return res;
  } catch (error) {
    if (error instanceof Error)
      return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
