import { PrismaClient } from "@/generated/prisma";
import { NextResponse } from "next/server";

export async function GET(){
    const prisma = new PrismaClient()

    try {
        const data = await prisma.blog.findMany()
        return NextResponse.json(data)
    }
    catch(err) {
        return NextResponse.json({error:err},{status:200})
    }
}