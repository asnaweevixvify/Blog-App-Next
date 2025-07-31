import { PrismaClient } from "@/generated/prisma";
import { NextResponse } from "next/server";

export async function DELETE(request,{ params }){
    const { id } = params
    const prisma = new PrismaClient()

    try {
        await prisma.blog.delete({where:{ id }})
        return NextResponse.json({msg:"ลบบทความเรียบร้อย"})
    }
    catch(err) {
        return NextResponse.json({error:err},{status:200})
    }
}