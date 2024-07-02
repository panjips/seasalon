import { NextResponse, NextRequest } from "next/server";
import prisma from "@/utils/prisma";
import bcrypt from "bcrypt";
import { Prisma } from "@prisma/client";

export async function POST(req: NextRequest) {
  const { full_name, phone_number, email, password } = await req.json();
  try {
    const userExist = await prisma.user.findFirst({
      where: {
        email: email,
      },
    });

    if (userExist)
      throw new Prisma.PrismaClientKnownRequestError("User already exist!", {
        code: "",
        clientVersion: "",
      });

    const hashPassword = await bcrypt.hash(password, 10);
    const createUser = await prisma.user.create({
      data: {
        full_name,
        email,
        phone_number,
        password: hashPassword,
      },
    });

    return NextResponse.json(
      { message: "Success created account" },
      { status: 201 }
    );
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
  }
}
