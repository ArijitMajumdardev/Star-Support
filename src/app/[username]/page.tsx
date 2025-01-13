import DonationForm from "@/components/DonationForm"
import { connectDB } from "@/lib/database"
import { Donation, DonationModel } from "@/models/donation"
import { ProfileInfoModel } from "@/models/profileInfo"
import Image from "next/image"
import Script from "next/script"
import { Toaster } from "react-hot-toast"
import { FaCoffee } from "react-icons/fa"
import { LuCoffee } from "react-icons/lu"

type Props = {
    params : {
        username : string
    }
}
export default async function singleProfilePage({ params } : Props) {
    const resolvedParams = await params; // Await params
  const { username } = resolvedParams;
    console.log("username from params",username)
    await connectDB()
    const profileInfoDoc = await ProfileInfoModel.findOne({ username })
    
    if (!profileInfoDoc) {
        return (
            <div>
                Profile Not Found
            </div>
        )
    }


    const donations: Donation[] = await DonationModel.find({ paid: true, email: profileInfoDoc.email });
    
    return (
        <div className="min-h-screen">
  <Toaster
  position="top-center"
/>
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
                
                <div className="grid grid-cols-2 gap-2 mt-4  items-start max-h-[60vh]">
                    <div className="bg-white rounded-xl p-4 shadow-sm">
                        <h3 className="font-semibold">About {profileInfoDoc.username}</h3>
                        {profileInfoDoc.bio}
                        <hr className="my-4" />
                        <h3 className="font-semibold">Recent supporters</h3>
                        {!donations.length && (
              <>
                <p>no recent donations</p>
              </>
            )}
            {donations.length && (
              <div className="mt-2 max-h-[35vh] overflow-scroll no-scrollbar">
                {donations.map(donation => (
                  <div className="py-2" key={donation.orderId}>
                    <h3>
                      <span className="font-semibold">{donation.name}</span>
                      {' '}
                      <span className="text-gray-400">
                        bought you {donation.amount/500 > 1 ? donation.amount/500 + ' coffees' : 'a coffee'}
                      </span>
                    </h3>
                    <p className="bg-gray-100 p-2 rounded-md">
                      {donation.message}
                    </p>
                  </div>
                ))}
              </div>
            )}

                    </div>

                    <div className="bg-white rounded-xl p-4 shadow-sm">
                        <DonationForm email={profileInfoDoc.email} toUser={profileInfoDoc.username} />
                    </div>
                </div>

            </div>
            
        </div>
    )
}