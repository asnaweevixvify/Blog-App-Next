import { NextResponse } from "next/server";
import { PrismaClient } from "@/generated/prisma";

export async function PUT(request,{ params }){
    const id = params.id
    const data = await request.json()
    try {
        const prisma = new PrismaClient()
        await prisma.blog.update({
            where:{ id },
            data
        })
        return NextResponse.json({msg:"แก้ไขบทความสำเร็จ"})
    }
    catch(err) {
        return NextResponse.json({error:err},{status:200})
    }
}