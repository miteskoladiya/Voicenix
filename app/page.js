import React from 'react'
import { Button } from "@/components/ui/button"
import Image from 'next/image';
import Link from 'next/link';
import AppHeader from './(main)/_components/AppHeader';

const Page = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-white to-indigo-50 animate-gradient overflow-x-hidden sticky">
      <AppHeader />

      <main className="max-w-6xl mx-auto px-4 py-12 sm:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <div className="animate-fade-in-left text-center lg:text-left">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight bg-gradient-to-r from-primary to-indigo-600 bg-clip-text text-transparent">
              Your Personal AI Voice Assistant
            </h1>
            <p className="mt-4 sm:mt-6 text-lg sm:text-xl text-gray-600 leading-relaxed animate-fade-in">
              Practice conversations, interviews, and language learning with our advanced AI voice agents. Get real-time feedback and improve your skills.
            </p>
            <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row gap-4 animate-fade-in-up justify-center lg:justify-start">
              <Link href="/dashboard" className="w-full sm:w-auto">
                <Button className="w-full sm:w-auto text-base sm:text-lg px-6 sm:px-8 py-4 sm:py-6 bg-primary hover:bg-primary/90 hover:scale-105 transition-all shadow-lg hover:shadow-primary/25">
                  Get Started!
                </Button>
              </Link>
              <Button variant="outline" className="w-full sm:w-auto text-base sm:text-lg px-6 sm:px-8 py-4 sm:py-6 hover:scale-105 transition-all hover:bg-primary/5 border-2">
                Learn More
              </Button>
            </div>
          </div>
          <div className="relative animate-fade-in-right mt-8 lg:mt-0">
            <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 to-indigo-500/20 rounded-2xl blur-3xl -z-10"></div>
            <Image 
              src="/t2.jpg" 
              alt="AI Voice Assistant"
              width={600}
              height={600}
              className="rounded-2xl shadow-2xl hover:scale-[1.02] transition-all duration-300 w-full max-w-[500px] mx-auto"
            />
          </div>
        </div>

        <div className="mt-20 sm:mt-32 animate-fade-in-up">
          <h2 className="text-3xl sm:text-4xl font-bold text-center bg-gradient-to-r from-primary to-indigo-600 bg-clip-text text-transparent mb-8 sm:mb-12">
            Key Features
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {features.map((feature, index) => (
              <div 
                key={index}
                className="group p-6 sm:p-8 bg-white/70 backdrop-blur-sm rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 border border-gray-100"
              >
                <div className="w-12 h-12 sm:w-14 sm:h-14 bg-primary/10 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  {feature.icon}
                </div>
                <h3 className="text-lg sm:text-xl font-semibold mb-2 text-gray-800">{feature.title}</h3>
                <p className="text-sm sm:text-base text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}

const features = [
  {
    title: "Real-time Voice Interaction",
    description: "Practice natural conversations with AI-powered voice agents that respond in real-time.",
    icon: <Image src="/interview.png" alt="Voice" width={24} height={24} className="w-6 h-6 sm:w-8 sm:h-8" />
  },
  {
    title: "Instant Feedback",
    description: "Get detailed feedback on your speaking skills, pronunciation, and language use.",
    icon: <Image src="/lecture.png" alt="Feedback" width={24} height={24} className="w-6 h-6 sm:w-8 sm:h-8" />
  },
  {
    title: "Multiple Scenarios",
    description: "Practice for interviews, language learning, presentations, and more.",
    icon: <Image src="/language.png" alt="Scenarios" width={24} height={24} className="w-6 h-6 sm:w-8 sm:h-8" />
  }
];

export default Page;
