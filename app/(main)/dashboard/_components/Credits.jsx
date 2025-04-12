"use client"
import { UserContext } from '@/app/_context/UserContext'
import { useUser } from '@stackframe/stack'
import Image from 'next/image'
import React, { useContext, useEffect, useState } from 'react'
import { Progress } from "@/components/ui/progress"
import { Button } from '@/components/ui/button'
import { Loader2Icon, User, Wallet2 } from 'lucide-react'
import axios from 'axios'
import { toast } from 'sonner'
import { useMutation } from 'convex/react'
import { api } from '@/convex/_generated/api'

const Credits = () => {

    const {userData}=useContext(UserContext)
    const user=useUser();
    const [loading, setLoading] = useState(false);

    const updateUserToken=useMutation(api.users.UpdateUserToken);

    const CalculateProgress = () => {
        if (!userData?.subscriptionId) return 100; // Show full bar for free plan
        
        const maxTokens = 50000;
        return (userData?.credits / maxTokens) * 100;
    }

useEffect(() => {
const script = document.createElement("script");
script.src = "https://checkout.razorpay.com/v1/checkout.js";
script.async = true;
script.onload = () => {
    console.log("Razorpay script loaded");
  };
document.body.appendChild(script);
return () => {
    document.body.removeChild(script);
  };
},[])


const GenerateSubscriptionId=async()=>{
  setLoading(true);
const result=await axios.post('/api/create-subscription');
console.log(result.data);
MakePayment(result?.data?.Id);
setLoading(false);
}

const MakePayment=(subscriptionId)=>{
  const options = {
    key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID, 
    subscription_id: subscriptionId, 
    name: "Ai Voice Agent(Voicenix)",
    description: "50,000 Tokens",
    image: "/t3.jpg",
    handler: async function(response) {
      if(response?.razorpay_payment_id){
        await updateUserToken({
          id: userData._id,
          credits: 50000, 
          subscriptionId: response.razorpay_payment_id
        });
        toast("Payment Successful");
      } else {
        toast.error("Payment Failed");
      }
    },
    prefill: {
      name: user?.displayName,
      email: user?.primaryEmail,
    },
    notes: {
      
    },
    theme: {
      color: "#3399cc",
    },
  };
  const rzp = new window.Razorpay(options);
  rzp.open();
}


    
  return (
    <div>
      <div className='flex items-center gap-5'>
        <Image className='rounded-full' src={user?.profileImageUrl} alt='profileImage' width={60} height={60}/>
        <div>
            <h2 className='text-lg font-bold'>{user?.displayName}</h2>
            <h2 className='text-gray-500'>{user?.primaryEmail}</h2>
        </div>
      </div>
        <hr className='my-3' />
        <div>
            <h2 className='font-bold'>Token Usage</h2>
            <h2>
                {!userData?.subscriptionId ? '10,000' : userData?.credits}/
                {userData?.subscriptionId ? '50,000' : '10,000'}
            </h2>
            <Progress value={CalculateProgress()} className='my-3' />

            <div className='flex mt-3 justify-between items-center'>
                <h2 className='font-bold'>Current Plan</h2>
                <h2 className='p-1 bg-secondary rounded-lg px-2'>
                    
                {userData?.subscriptionId?'Paid Plan':'Free Plan'} 
                    </h2>
            </div>


            <div className='mt-5 p-5 border rounded-2xl'>
               <div className='flex justify-between'>
                <div>
                <h2 className='font-bold'>Pro Plan</h2>
                <h2>50,000 Token</h2>
               </div>
               <h2 className='font-bold'>
                ₹1500/Month
               </h2>
                </div>
                <hr className='my-2' />
                {userData?.subscriptionId ? (
                  <Button 
                    className='w-full bg-destructive hover:bg-destructive/90' 
                    onClick={() => {
                      updateUserToken({
                        id: userData._id,
                        credits: userData.credits,
                        subscriptionId: null
                      });
                      toast("Subscription Cancelled");
                    }}
                  >
                    Cancel Subscription
                  </Button>
                ) : (
                  <Button 
                    className='w-full' 
                    disabled={loading} 
                    onClick={GenerateSubscriptionId}
                  >
                    {loading ? <Loader2Icon className='animate-spin'/> : <Wallet2/>} 
                    Upgrade ₹1500
                  </Button>
                )}
            </div>

        </div>
    </div>
  )
}

export default Credits
