import prisma from "@/utils/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { name, phone_number, datetime, service_id, branch_id, user_id } =
    await req.json();
  try {
    const token = req.cookies.get("token");
    if (!token) throw new Error("Unautorized actions!");
    const createReview = await prisma.reservation.create({
      data: {
        name,
        phone_number,
        datetime,
        service_id,
        branch_id,
        user_id,
      },
    });

    return NextResponse.json(
      {
        message: "Success create reservation!",
        data: createReview,
      },
      { status: 201 }
    );
  } catch (error) {
    if (error instanceof Error)
      return NextResponse.json({ error: error.message });
  }
}

export async function GET() {
  try {
    const getALlReservation = await prisma.reservation.findMany({
      include: {
        Branch: true,
        Service: true,
        User: true,
      },
    });

    return NextResponse.json({
      message: "Retrived all datas!",
      data: getALlReservation,
    });
  } catch (error) {
    if (error instanceof Error)
      return NextResponse.json({ error: error.message });
  }
}
