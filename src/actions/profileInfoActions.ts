'use server'

import { authoption } from "@/app/api/auth/[...nextauth]/route"
import { connectDB } from "@/lib/database"
import { ProfileInfoModel } from "@/models/profileInfo"
import mongoose from "mongoose"
import { getServerSession } from "next-auth"

export async function saveProfile(formData: FormData) {
    
    connectDB()
    const session = await getServerSession(authoption)
    if (!session) throw 'You need to be logged in '
    const email = session.user?.email
    const { username, displayName, bio ,coverUrl, avatarUrl,} = Object.fromEntries(formData)
    
    const profileInfoDoc = await ProfileInfoModel.findOne({ email })
    if (profileInfoDoc) {
        profileInfoDoc.set({ username, displayName, bio ,coverUrl, avatarUrl,})
        await profileInfoDoc.save()
    } else {
        await ProfileInfoModel.create({username,displayName,bio,email,coverUrl, avatarUrl,})

    }
return true
}