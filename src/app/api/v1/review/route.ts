import prisma from "@/utils/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { name, rating, comment } = await req.json();
  try {
    const createReview = await prisma.review.create({
      data: {
        name,
        rating,
        comment,
      },
    });

    return NextResponse.json(
      {
        message: "Success create review!",
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
    const getAllReview = await prisma.review.findMany();

    return NextResponse.json({
      message: "Retrived all datas!",
      data: getAllReview,
    });
  } catch (error) {
    if (error instanceof Error)
      return NextResponse.json({ error: error.message });
  }
}
