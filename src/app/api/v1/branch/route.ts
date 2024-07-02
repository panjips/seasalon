import prisma from "@/utils/prisma";
import { NextRequest, NextResponse } from "next/server";
import * as jwt from "jsonwebtoken";

export async function POST(req: NextRequest) {
  const { name, location, open_at, close_at } = await req.json();
  try {
    const token = req.cookies.get("token");
    if (!token) throw new Error("Unautorized actions!");

    const decode = jwt.decode(token.value, { complete: true });
    const role: string = decode?.payload.role;
    if (role != "Admin") throw new Error("Unautorized actions!");

    const createBranch = await prisma.branch.create({
      data: {
        name,
        location,
        open_at,
        close_at,
      },
    });

    return NextResponse.json(
      { message: "Success create branch!", data: createBranch },
      { status: 201 }
    );
  } catch (error) {
    if (error instanceof Error)
      return NextResponse.json({ error: error.message }, { status: 400 });
  }
}

export async function GET() {
  try {
    const getAllBranch = await prisma.branch.findMany({
      include: {
        service: true,
        reservation: true,
      },
    });

    return NextResponse.json({
      message: "Retrived all datas!",
      data: getAllBranch,
    });
  } catch (error) {
    if (error instanceof Error)
      return NextResponse.json({ error: error.message });
  }
}
