import { NextResponse, NextRequest } from "next/server";
import prisma from "@/utils/prisma";
import jwt, { Secret } from "jsonwebtoken";
import bcrypt from "bcrypt";
import { Prisma } from "@prisma/client";

export async function POST(req: NextRequest) {
  const { email, password } = await req.json();
  try {
    const userExist = await prisma.user.findFirstOrThrow({
      where: {
        email: email,
      },
    });

    const compare = await bcrypt.compare(password, userExist.password);
    if (!compare) throw new Error("Invalid Credentials!");

    const payload = {
      id: userExist.id,
      full_name: userExist.full_name,
      email: userExist.email,
      phone_number: userExist.phone_number,
      role: userExist.role,
    };

    const token = jwt.sign(payload, process.env.SECRET_KEY as Secret);
    await prisma.refreshToken.create({
      data: {
        hashed_token: token,
        user_id: userExist.id,
      },
    });

    let response = NextResponse.json({
      message: "Login success!",
      data: payload,
    });
    response.cookies.set("token", token);

    return response;
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      return NextResponse.json(
        { error: "Invalid credentials!" },
        { status: 400 }
      );
    }
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }
  }
}
