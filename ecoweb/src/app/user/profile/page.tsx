// app/user/profile/page.tsx
'use client'
import Link from 'next/link'
import { ProfileForm } from '@/modules/client/components/profileForm'

const ProfilePage = () => {
  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-8 max-w-2xl">
        <div className="mb-6">
          <Link 
            href="/user" 
            className="flex items-center text-gray-600 hover:text-gray-900"
          >
            <svg 
              className="w-5 h-5 mr-2"
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
            Volver
          </Link>
        </div>
        <div className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden">
          <ProfileForm />
        </div>
      </div>
    </div>
  )
}

export default ProfilePage