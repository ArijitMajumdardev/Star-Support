import { connectDB } from "@/lib/database";
import { DonationModel } from "@/models/donation";
import { ProfileInfoModel } from "@/models/profileInfo";

import Razorpay from "razorpay";

export async function createDonation(formData: FormData) {

  const { amount, name, message, email,toUser } = Object.fromEntries(formData);

  // const donationDoc = await DonationModel.create({
  //   amount,
  //   name,
  //   message,
  //   crypto,
  //   email,
  // });
  // const profileInfoDoc = await ProfileInfoModel.findOne({ email });
  // if (!profileInfoDoc) {
  //   return false;
  // }

  connectDB()


  const parsedAmount = parseFloat(amount as string);
  if (isNaN(parsedAmount)) {
    throw new Error("Invalid amount provided");
  }
  const amountInPaise = parsedAmount * 100

  let instance = new Razorpay({ key_id: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID as string, key_secret: process.env.NEXT_PUBLIC_RAZORPAY_KEY_SECRET })

  console.log(instance)

  
  let options = {
    amount: 50000,
    currency: 'INR'
  }




  // const razorpayOrder = await instance.orders.create(options);
  // // console.log("Razorpay Order Response:", razorpayOrder);

  // //   const donationDoc = await DonationModel.create({amount,name,message,email, toUser,orderId:x.id });
  
  
  // // return x

  try {
    // Create an order with Razorpay
    const razorpayOrder = await instance.orders.create(options);
  
    // Check if razorpayOrder is valid
    if (!razorpayOrder) {
      throw new Error("Failed to create Razorpay order");
    }
  
    console.log("Razorpay Order:", razorpayOrder); // Log to see the returned object
  
    // Now you can safely access the properties of razorpayOrder
    const donationDoc = await DonationModel.create({
      amount,
      name,
      message,
      email,
      toUser,
      orderId: razorpayOrder.id,
    });
  
    return razorpayOrder; // Return Razorpay order response
  
  } catch (error) {
    console.error("Error creating Razorpay order:", error);
    throw new Error("Failed to create Razorpay order");
  }
}
