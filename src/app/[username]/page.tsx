import DonationForm from "@/components/DonationForm"
import { connectDB } from "@/lib/database"
import { ProfileInfoModel } from "@/models/profileInfo"
import Image from "next/image"
import { FaCoffee } from "react-icons/fa"
import { LuCoffee } from "react-icons/lu"

type Props = {
    params : {
        username : string
    }
}
export default async function singleProfilePage({ params } : Props) {
    const { username } = params
    connectDB()
    const profileInfoDoc = await ProfileInfoModel.findOne({ username })
    if (!profileInfoDoc) {
        return (
            <div>
                Profile Not Found
            </div>
        )
    }
    return (
        <div className="h-screen min-h-screen">
            <div className="w-full h-48">
                <Image src={profileInfoDoc.coverUrl} height={2048} width={2048} alt="cover image"  className="h-48 object-cover object-center "/>

            </div>
            <div className="px-2 mx-auto max-w-xl relative -mt-16 ">
                <div className="flex items-end gap-3">
                <div className="border-2 border-white size-36 overflow-hidden rounded-xl">
                    <Image src={profileInfoDoc.avatarUrl} height={256} width={256} alt="cover image" className="size-36 object-cover object-center " />
                </div>
                <div className="mb-1">
                        <h1 className="text-4xl font-semibold ">
                            {profileInfoDoc.displayName}
                        </h1>
                        <h2 className="flex gap-1  items-center">
                            <LuCoffee  />
                            <span>/</span>
                            <span>{profileInfoDoc.username}</span>
                           

                        </h2>
                </div>
                </div>
                
                <div className="grid grid-cols-2 gap-2 mt-4 ">
                    <div className="bg-white rounded-xl p-4 shadow-sm">
                        <h3 className="font-semibold">About {profileInfoDoc.username}</h3>
                        {profileInfoDoc.bio}
                        <hr className="my-4" />
                        <h3 className="font-semibold">Recent supporters</h3>
                        <p>no recent donations</p>

                    </div>

                    <div className="bg-white rounded-xl p-4 shadow-sm">
                        <DonationForm/>
                    </div>
                </div>

            </div>
            
        </div>
    )
}