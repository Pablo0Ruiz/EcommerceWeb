// app/user/profile/page.tsx
'use client'
import Link from "next/link";
import { ProfileForm } from "@/modules/client/components/profileForm"

const ProfilePage = () => {
    return (
        <div className="min-h-screen bg-gray-50 p-4">
            <div className="container max-w-2xl mx-auto relative">
                <Link 
                    href="/user" 
                    className="absolute -left-10 top-0 md:-left-12 flex items-center justify-center w-8 h-8 rounded-full hover:bg-gray-200 transition-colors"
                >
                    <svg 
                        className="w-5 h-5 text-gray-600"
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                    >
                        <path 
                            strokeLinecap="round" 
                            strokeLinejoin="round" 
                            strokeWidth={2} 
                            d="M10 19l-7-7m0 0l7-7m-7 7h18" 
                        />
                    </svg>
                </Link>
                
                <ProfileForm />
            </div>
        </div>
    )
}

export default ProfilePage 