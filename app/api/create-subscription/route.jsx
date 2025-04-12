import { NextResponse } from "next/server";
import Razorpay from "razorpay";

export async function POST(request) {

    //const data=await request.json();
    const instance=new Razorpay({
        key_id: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        key_secret: process.env.RAZORPAY_SECRET_KEY,
    })

    const result=await instance.subscriptions.create({
        plan_id: process.env.RAZORPAY_PLAN_ID,
        customer_notify: 1,
        quantity:1,
        total_count: 12,
        addons:[
        ],
        notes:{
            key1:"value3",
            key2:"value2"
        }
    })

    return NextResponse.json(result);


}