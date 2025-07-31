import { PrismaClient } from "@/generated/prisma";
import { NextResponse } from "next/server";

export async function GET(request,{ params }){
    const prisma = new PrismaClient()
    try {
        const { id } = await params
        const data = await prisma.blog.findUnique({ where: { id } })
        return NextResponse.json(data)
    }
    catch(err) {
        return NextResponse.json({error:err},{status:200})
    }
}