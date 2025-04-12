"use client";
import { api } from "@/convex/_generated/api";
import { CoachingOptions } from "@/services/Options";
import { useQuery } from "convex/react";
import moment from "moment";
import Image from "next/image";
import { useParams } from "next/navigation";
import React from "react";
import ChatBox from "../../discussion-room/[roomid]/_components/ChatBox";
import SummeryBox from "../_components/SummeryBox";

const ViewSummery = () => {
  const { roomid } = useParams();
  const DiscussionRoomData = useQuery(api.DiscussionRoom.GetDiscussionRoom, {
    id: roomid,
  });

  const GetAbstractImages = (option) => {
    const coachingOption = CoachingOptions.find((item) => item.name === option);
    return coachingOption?.abstract ?? "/ab1.png";
  };

  return (
    <div className="-mt-10">
      <div
        className="flex justify-between
        items-end"
      >
        <div className="flex gap-7 items-center">
          <Image
            src={GetAbstractImages(DiscussionRoomData?.coachingOptions)}
            alt="abstract"
            height={100}
            width={100}
            className="w-[70px] h-[70px] rounded-full"
          />
          <div>
            <h2 className="font-bold text-lg">
              {DiscussionRoomData?.topic || "Untitled"}
            </h2>
            <h2 className="text-gray-400">
              {DiscussionRoomData?.coachingOptions || "No category"}
            </h2>
          </div>
        </div>
        <h2 className="text-gray-400">
          {DiscussionRoomData?._creationTime
            ? moment(DiscussionRoomData._creationTime).fromNow()
            : "Recent"}
        </h2>
      </div>

     <div className="grid grid-cols-1  lg:grid-cols-5 gap-5 mt-5">
        <div className="col-span-3">
            <h2 className="text-lg font-bold mb-6">Summery of Your Converstion</h2>
            <SummeryBox summery={DiscussionRoomData?.summery}/>
        </div>
        <div className="col-span-2">
        <h2 className="text-lg font-bold mb-6"> Your Converstion</h2>
          {DiscussionRoomData?.conversation && (
            <ChatBox
              conversation={DiscussionRoomData?.conversation}
              coachingOptions={DiscussionRoomData?.coachingOptions}
              enableFeedbackNotes={false}
            />
          )}
        </div>
      </div> 
    </div>
  );
};

export default ViewSummery;
