"use client";
import { createDonation } from "@/actions/donationActions";
import React, { useEffect, useState } from "react";
import { FaCoffee } from "react-icons/fa";
import Script from "next/script";
import Razorpay from "razorpay";
import toast from "react-hot-toast";

function DonationForm({ email,toUser }: { email: string,toUser:string }) {
  const [numberInValue, setNumberInValue] = useState("");
  const [amount, setAmount] = useState(1);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (numberInValue) {
      const intValue = parseInt(numberInValue);
      if (intValue > 5 && intValue <= 1000) {
        setAmount(intValue);
      } else if (intValue === 1 || intValue === 3 || intValue === 5) {
        setAmount(intValue);
      } else {
        setAmount(1);
      }
    }
  }, [numberInValue]);

    async function handleFormSubmit(formData: FormData) {
        console.log("inside form submit")
        formData.set("amount", amount.toString());
        formData.set("email", email);
        formData.set("toUser", toUser)
    
            console.log(name,message)
        // const { SendAmount, SendName, SendMessage, SendEmail,SendToUser } = Object.fromEntries(formData);

       

    }
    

    const createOrder = async () => {
        console.log("this is the amount  ",amount,name,message,toUser)
        const res = await fetch("/api/createOrder", {
          method: "POST",
          body: JSON.stringify({ amount: amount*5*100 ,name,message,toUser,email}),
        });
        const data = await res.json();
    
        const paymentData = {
          key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
          order_id: data.id,
    
          handler: async function (response: any) {
            // verify payment
            const res = await fetch("/api/verifyOrder", {
              method: "POST",
              body: JSON.stringify({
                orderId: response.razorpay_order_id,
                razorpayPaymentId: response.razorpay_payment_id,
                razorpaySignature: response.razorpay_signature,
              }),
            });
            const data = await res.json();
            console.log(data);
            if (data.isOk) {
                // do whatever page transition you want here as payment was successful
                
                toast.success('Thanks for your donation!');
            } else {
                toast.error('Payment Failed');
            }
          },
        };
    
        const payment = new (window as any).Razorpay(paymentData);
        payment.open();
      };





    

  return (
      <form action={handleFormSubmit}>
          <Script src="https://checkout.razorpay.com/v1/checkout.js"></Script>
      <div className="border border-yellow-300 bg-yellow-300/10 rounded-xl p-4 flex gap-2 items-center">
        <FaCoffee size={36} />
        <span>x</span>
        <button
          type="button"
          onClick={() => {
            setAmount(1);
            setNumberInValue("1");
          }}
          className={"amount " + (amount === 1 ? "active" : "")}
        >
          1
        </button>
        <button
          type="button"
          onClick={() => {
            setAmount(3);
            setNumberInValue("3");
          }}
          className={"amount " + (amount === 3 ? "active" : "")}
        >
          3
        </button>
        <button
          type="button"
          onClick={() => {
            setAmount(5);
            setNumberInValue("5");
          }}
          className={"amount " + (amount === 5 ? "active" : "")}
        >
          5
        </button>
        <input
          className="w-12 h-12 border border-yellow-300 rounded-xl text-center"
          type="number"
          placeholder="10"
          onChange={(ev) => setNumberInValue(ev.target.value)}
          value={numberInValue}
        />
      </div>
      <div className="mt-3 ">
        <input
          name="name"
          type="text"
          placeholder="Your name"
                  className="outline-none p-2  "
                  onChange={(e)=>setName(e.target.value)}
        />
      </div>
      <div className="mt-3 ">
        <textarea
          name="message"
          id=""
          placeholder="Say something nice"
                  className="outline-none p-2  "
                  onChange={(e)=>setMessage(e.target.value)}
        ></textarea>
      </div>
          <div className="mt-2">
          <Script
        type="text/javascript"
        src="https://checkout.razorpay.com/v1/checkout.js"
      />
        <button type="submit" className="bg-yellow-300 w-full rounded-xl py-2 font-semibold"  onClick={(e) => {
    e.preventDefault(); // Prevent form submission
    createOrder(); // Trigger Razorpay payment
  }}>
          Support ${amount * 5}
        </button>
      </div>
    </form>
  );
}

export default DonationForm;
