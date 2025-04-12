"use client";
import { BlurFade } from "@/components/magicui/blur-fade";
import { Button } from "@/components/ui/button";
import { CoachingOptions } from "@/services/Options";
import { useUser } from "@stackframe/stack";
import Image from "next/image";
import React from "react";
import UserInputDialog from "./UserInputDialog";
import Link from "next/link";
import ProfileDialog from "./ProfileDialog";

const FeatureAssistants = () => {
    const user = useUser();

    return (
        <div className="flex flex-col">

            <div className="flex justify-between items-center mb-6">
                <div>
                    <h2 className="font-medium text-gray-500">My Workspace</h2>
                    <h2 className="text-3xl font-bold">
                        Welcome Back, {user?.displayName}
                    </h2>
                </div>
                <ProfileDialog>
                <Button>Profile</Button>
                </ProfileDialog>
                
            </div>


            <div className="grid grid-cols-2 lg:grid-cols-5 xl:grid-cols-5 gap-10">
                {CoachingOptions.map((item, index) => (
                      <BlurFade key={item.icon} delay={0.25 + index * 0.05} inView>
  <div
                        key={index}
                        className="p-3 bg-secondary rounded-3xl flex flex-col justify-center items-center"
                    >
                        <UserInputDialog CoachingOptions={item}>
                            <div
                        key={index}
                        className="flex flex-col justify-center items-center"
                    >
                        <Image
                            src={item.icon}
                            alt={item.name}
                            width={150}
                            height={150}
                            className="h-[70px] w-[70px] hover:rotate-12 cursor-pointe transition-all"
                        />
                        <h2 className="mt-2">{item.name}</h2>
                    </div>
                    </UserInputDialog>
                    </div>  
                    </BlurFade>
                    
                ))}
            </div>
        </div>
    );
};

export default FeatureAssistants;
