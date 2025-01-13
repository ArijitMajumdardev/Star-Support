import ProfileInfoForm from '@/components/ProfileInfoForm'
import { getServerSession } from 'next-auth'
import React from 'react'
import { authoption } from '../api/auth/[...nextauth]/route'
import { connectDB } from '@/lib/database'
import { ProfileInfoModel } from '@/models/profileInfo'
import { Donation, DonationModel } from '@/models/donation'

const Profilepage = async () => {
  const session = await getServerSession(authoption)
  if (!session || !session.user?.email) {
    return 'Not logged in';
  }
  const email = session.user.email
  connectDB()
  
  const profileInfoDoc = JSON.parse(JSON.stringify(
    await ProfileInfoModel.findOne({email})
  ));

  const donations: Donation[] = await DonationModel.find({ paid: true, email });
  const total = donations.reduce((current, d) => current + d.amount/100, 0);
  return (
      <div className='w-full min-h-screen  '>
          <div className='w-2/3 min-h-[100vh] mx-auto   mt-10 mb-10 rounded-2xl  '>
        <ProfileInfoForm profileInfo={profileInfoDoc} total={total} />
       
      </div>
      
     
      
          
    </div>
  )
}

export default Profilepage