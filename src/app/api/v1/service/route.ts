import prisma from "@/utils/prisma";
import { NextRequest, NextResponse } from "next/server";
import * as jwt from "jsonwebtoken";

export async function POST(req: NextRequest) {
  const { name, duration, branch_id } = await req.json();
  try {
    const token = req.cookies.get("token");
    if (!token) throw new Error("Unautorized actions!");

    const decode = jwt.decode(token.value, { complete: true });
    const role: string = decode?.payload.role;
    if (role != "Admin") throw new Error("Unautorized actions!");

    const createService = await prisma.service.create({
      data: {
        name,
        duration,
        branch_id,
      },
    });

    return NextResponse.json(
      { message: "Success create branch!", data: createService },
      { status: 201 }
    );
  } catch (error) {
    if (error instanceof Error)
      return NextResponse.json({ error: error.message }, { status: 400 });
  }
}

export async function GET() {
  try {
    const getAllService = await prisma.service.findMany({
      include: {
        Branch: true,
        reservation: true,
      },
    });

    return NextResponse.json({
      message: "Retrived all datas!",
      data: getAllService,
    });
  } catch (error) {
    if (error instanceof Error)
      return NextResponse.json({ error: error.message });
  }
}
