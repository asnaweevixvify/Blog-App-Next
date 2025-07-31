import { PrismaClient } from "@/generated/prisma";
import { NextResponse } from "next/server";

const prisma = new PrismaClient()

export async function POST(req){
    try {
        const body = await req.json()
        const newBlog = await prisma.blog.create({data:body})
        return NextResponse.json(newBlog,{status:201})
    }
    catch (err) {
        console.log(err);
        return NextResponse.json({
            msg:"faild to create blog",
            error:err,
        },{status:500})
    }
}