import { PrismaClient } from "@/generated/prisma";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export async function POST(req){
    const userData = await req.json()
    const prisma = new PrismaClient()
    const { username , password } = userData

    try {
        if(!username || !password){
            return NextResponse.json({msg:"โปรดกรอก username และ password ให้ครบ"},{status:200})
        }
        const find = await prisma.user.findUnique({where:{username}})
        if(find){
            return NextResponse.json({msg:"username นี้ถูกใช้งานแล้ว"},{status:200})
        }
        const hashPass = await bcrypt.hash(password,10)
        const newUser = await prisma.user.create({
            data:{
                username,password:hashPass
            }
        })
        return NextResponse.json({msg:"สมัครบัญชีสำเร็จ"})
        
    }
    catch(err) {
        return NextResponse.json({error:err},{status:200})
    }
}