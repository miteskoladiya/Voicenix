"use client";
import { UserContext } from "@/app/_context/UserContext";
import { Button } from "@/components/ui/button";
import { api } from "@/convex/_generated/api";
import { CoachingOptions } from "@/services/Options";
import { useConvex } from "convex/react";
import moment from "moment";
import Image from "next/image";
import Link from "next/link";
import React, { useContext, useEffect, useState } from "react";



const Feedback = () => {
  const converx = useConvex();
    const { userData } = useContext(UserContext);
    const [discussionRoomList, setDiscussionRoomList] = useState([]);
  
    const GetDiscussionRooms = async () => {
      const result = await converx.query(
        api.DiscussionRoom.GetAllDiscussionRoom,
        {
          uid: userData?._id,
        }
      );
      console.log(result);
      setDiscussionRoomList(result);
    };
  
    useEffect(() => {
      userData && GetDiscussionRooms();
    }, [GetDiscussionRooms]);
  
    const GetAbstractImages=(option)=>{
      const coachingOption= CoachingOptions.find((item)=>item.name===option)
  
      return coachingOption?.abstract?? '/ab1.png';
    }
  
    return (
      <div className="mt-5">
        <h2 className="font-bold text-xl">Feedbacks</h2>
  
        {discussionRoomList?.length == 0 && (
          <h2 className="text-gray-400">You don't have any previous Feedback </h2>
        )}
        <div>
          {discussionRoomList.map((item, index) => (item.coachingOptions==='Mock Interview'
          || item.coachingOptions==='Ques Ans Prep') &&
            (
            <div key={index} className="border-b-[1px] pb-3 mb-4  flex justify-between items-center cursor-pointer">
              <div className="flex gap-7 items-center">
                <Image className="rounded-full h-[50px] w-[50px]  " src={GetAbstractImages(item.coachingOptions)} alt="abstract" height={70} width={70}/>
                <div>
                <h2 className="font-bold">{item.topic}</h2>
                <h2 className="text-gray-400">{item.coachingOptions}</h2>
                <h2 className="text-gray-400 text-sm">{moment(item._creationTime).fromNow()}</h2>
              </div>
            </div>
            <Link href={`/view-summery/${item._id}`} >
            <Button  variant='outline'>View Feedback</Button>
            </Link>
            </div>
          ))}
        </div>
      </div>
    );
  };

export default Feedback
