// pages/api/createDonation.ts
// import { NextApiRequest, NextApiResponse } from "next";
// import Razorpay from "razorpay";
// import { connectDB } from "@/lib/database";
// import { DonationModel } from "@/models/donation";
// import { ProfileInfoModel } from "@/models/profileInfo";
// import { NextResponse } from "next/server";

// // Handler for donation creation
// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//   if (req.method === "POST") {
//     const { amount, name, message, email, toUser } = req.body;

//       console.log(amount)
//     try {
//       // Connect to the database
//       await connectDB();

//       // Parse and validate the amount
//       const parsedAmount = parseFloat(amount);
//       if (isNaN(parsedAmount)) {
//         return res.status(400).json({ error: "Invalid amount provided" });
//       }

//       const amountInPaise = parsedAmount * 100; // Razorpay accepts amount in paise

//       // Initialize Razorpay instance with keys
//       const razorpayInstance = new Razorpay({
//         key_id: process.env.RAZORPAY_KEY_ID as string,
//         key_secret: process.env.RAZORPAY_KEY_SECRET as string,
//       });

//       // Set options for the Razorpay order
//       const options = {
//         amount: amountInPaise, // Amount in paise
//         currency: "INR",
//         receipt: `receipt#${Date.now()}`, // Unique receipt ID
//         notes: {
//           key1: "value1",
//           key2: "value2",
//         },
//       };

//       // Create an order with Razorpay
//       const razorpayOrder = await razorpayInstance.orders.create(options);

//       if (!razorpayOrder) {
//         return res.status(500).json({ error: "Failed to create Razorpay order" });
//       }

//       // Optionally, you can save the donation in your database (this part is optional)
//       const donationDoc = await DonationModel.create({
//         amount,
//         name,
//         message,
//         email,
//         toUser,
//         orderId: razorpayOrder.id,
//       });

//       // Respond with the Razorpay order details
//       return res.status(200).json(razorpayOrder);
//     } catch (error) {
//       console.error("Error creating Razorpay order:", error);
//       return res.status(500).json({ error: "Internal Server Error" });
//     }
//   } else {
//     // Handle other HTTP methods (e.g., GET, PUT, DELETE)
//     return res.status(405).json({ error: "Method Not Allowed" });
//   }
// }



import { connectDB } from "@/lib/database";
import { DonationModel } from "@/models/donation";
import { NextResponse } from "next/server";
import Razorpay from "razorpay";

const razorpay = new Razorpay({
  key_id: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID as string,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

export async function POST(req: Request) {
  try {
    await connectDB();
    const { amount, name, message, email, toUser } = await req.json();
    console.log("this is the amount  ",amount,name,message,toUser)
    
  const order = await razorpay.orders.create({
    amount,
    currency: "INR",
  });

    console.log("order : ",order)
        const donationDoc = await DonationModel.create({
        amount,
        name,
        message,
        email,
        toUser,
        orderId: order.id,
    });
    
    console.log(amount, name, message, email, toUser)

  return NextResponse.json(order);
  
} catch (error) {
  console.error("Error creating Razorpay order:", error);
    return NextResponse.json({ error: "Internal Server Error" })
}
}