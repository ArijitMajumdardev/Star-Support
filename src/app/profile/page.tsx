import ProfileInfoForm from '@/components/ProfileInfoForm'
import { getServerSession } from 'next-auth'
import React from 'react'
import { authoption } from '../api/auth/[...nextauth]/route'
import { connectDB } from '@/lib/database'
import { ProfileInfoModel } from '@/models/profileInfo'
import { Donation, DonationModel } from '@/models/donation'
import Link from 'next/link'

const Profilepage = async () => {
  const session = await getServerSession(authoption)
  if (!session || !session.user?.email) {
    return (
      <div className="w-full min-h-screen flex justify-center items-center bg-gradient-to-r from-white  to-red-200">
        <div className="text-center bg-white p-10 rounded-xl shadow-lg max-w-md w-full">
          <h1 className="text-4xl font-bold text-gray-800 mb-6">Not Logged In</h1>
          <p className="text-xl text-gray-600 mb-6">
            Please log in to view and manage your profile information and donations.
          </p>
          <Link href="/api/auth/signin" className="bg-orange-500 text-white px-8 py-3 rounded-full text-xl font-semibold shadow-md hover:bg-yellow-600 transition-all">
          
              Log In
     
          </Link>
          <p className="mt-4 text-gray-500">
            New here? <Link href="/signup" className="text-yellow-600"> Sign up</Link>
          </p>
        </div>
      </div>
    );
  }

  const email = session.user.email
  connectDB()

  const profileInfoDoc = JSON.parse(JSON.stringify(
    await ProfileInfoModel.findOne({ email })
  ));

  const donations: Donation[] = await DonationModel.find({ paid: true, email });
  const total = donations.reduce((current, d) => current + d.amount / 100, 0);

  return (
    <div className='w-full min-h-screen'>
      <div className='w-2/3 min-h-[100vh] mx-auto mt-10 mb-10 rounded-2xl'>
        <ProfileInfoForm profileInfo={profileInfoDoc} total={total} />
      </div>
    </div>
  );
}

export default Profilepage;
