'use client'
import React, { useEffect, useState } from 'react'
import { FaCoffee } from 'react-icons/fa';

function DonationForm() {
    const [numberInValue, setNumberInValue] = useState('');
    const [amount, setAmount] = useState(1);

    useEffect(()=>{
        if(numberInValue) {
            const intValue = parseInt(numberInValue);
            if (intValue > 5 && intValue <= 1000) {
              setAmount(intValue);
            } else if (intValue === 1 || intValue === 3 || intValue === 5) {
              setAmount(intValue);
            } else {
              setAmount(1);
            }
          }
    },[numberInValue])
  return (
      <form action="">
          <div className="border border-yellow-300 bg-yellow-300/10 rounded-xl p-4 flex gap-2 items-center">
        <FaCoffee size={36} />
        <span>x</span>
        <button
          type="button"
          onClick={() => {setAmount(1); setNumberInValue('1');}}
          className={"amount " + (amount === 1 ? 'active' : '')}>
          1
        </button>
        <button
          type="button"
          onClick={() => {setAmount(3); setNumberInValue('3');}}
          className={"amount " + (amount === 3 ? 'active' : '')}>
          3
        </button>
        <button
          type="button"
          onClick={() => {setAmount(5); setNumberInValue('5');}}
          className={"amount " + (amount === 5 ? 'active' : '')}>
          5
        </button>
        <input
          className="w-12 h-12 border border-yellow-300 rounded-xl text-center"
          type="number"
          placeholder="10"
          onChange={ev => setNumberInValue(ev.target.value)}
          value={numberInValue} />
          </div>
          <div className="mt-3 ">
        <input name="name" type="text" placeholder="Your name" className='outline-none p-2  '/>
      </div>
      <div className="mt-3 ">
        <textarea name="message" id="" placeholder="Say something nice" className='outline-none p-2  '></textarea>
      </div>
          <div className="mt-2">
        <button className="bg-yellow-300 w-full rounded-xl py-2 font-semibold">
          Support ${amount * 5}
        </button>
      </div>
    </form>
  )
}

export default DonationForm