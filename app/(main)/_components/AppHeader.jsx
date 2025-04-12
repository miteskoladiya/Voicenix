import { UserButton } from '@stackframe/stack'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { Button } from '@/components/ui/button'

const AppHeader = () => {
  return (
    <div className='p-3 shadow-md flex justify-between items-center'>
      <Link href={'/dashboard'}>
        <div className="flex items-center gap-2">
             {/* <Image src={"/logo.png"} alt="Logo" width={160} height={200} /> */}
          <h2 className='text-2xl font-bold bg-gradient-to-r from-primary to-primary/60 text-transparent bg-clip-text hover:scale-105 transition-all'>
            Voicenix
          </h2>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-6 h-6 text-primary animate-pulse"
          >
            <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"/>
            <path d="M19 10v2a7 7 0 0 1-14 0v-2"/>
            <line x1="12" y1="19" x2="12" y2="22"/>
          </svg>
        </div>
      </Link>
      <div className="flex items-center gap-4">
        <Link href="/dashboard">
          <Button variant="ghost" className="hover:bg-primary/10 hover:scale-105 transition-all">
            Dashboard
          </Button>
        </Link>
        <UserButton/>
      </div>
    </div>
  )
}

export default AppHeader
