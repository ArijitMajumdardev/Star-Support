import { connectDB } from "@/lib/database";
import { ProfileInfoModel } from "@/models/profileInfo";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    const searchParams = req.nextUrl.searchParams
    const query = searchParams.get('query')
    console.log(query)
    try {
        connectDB()
    const profiles = await ProfileInfoModel.find({ username: { $regex: query, $options: "i" } })
        console.log(profiles) 
    return NextResponse.json({profiles},
      { status: 200 }
    );
    } catch (error) {
        return NextResponse.error()
    }
  }