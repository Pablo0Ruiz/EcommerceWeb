import { Sidebar } from "@/modules/client/components/sideBar"
import { ProfileForm } from "@/modules/client/components/profileForm"
const ProfilePage =()=>{
    return(
        <div className="flex min-h-screen bg-gray-50">
            <aside  className="w-64 bg-white border-r p-6">
                <Sidebar/>
            </aside>
            <main className="flex-1 p-8">
                <ProfileForm/>
            </main>
        </div>
    )
}

export default ProfilePage