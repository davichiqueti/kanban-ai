
import { User } from "@/types/user/userType";

import { useRouter } from "next/navigation";

interface HeaderInfoDropdownProps {
    userInfo: User | null;
    setModalOpen: (open: boolean) => void;
}

export default function HeaderDropdown({ userInfo, setModalOpen }: HeaderInfoDropdownProps) {
    const router  = useRouter()

    const handleLogout = () => {

        document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        router.push("/auth")
    }

    return (
        <div
            className="absolute right-0 w-64 max-w-xs bg-white border border-gray-300 rounded-lg shadow-lg p-4 flex flex-col gap-2"
            onMouseEnter={() => setModalOpen(true)}
            onMouseLeave={() => setModalOpen(false)}
        >
            <h2 className="text-lg font-bold whitespace-nowrap overflow-hidden text-ellipsis">
                {userInfo?.name}
            </h2>
            <h3 className="text-sm text-gray-600 whitespace-nowrap overflow-hidden text-ellipsis">
                {userInfo?.email}
            </h3>

            <button
                onClick={handleLogout}
                className="mt-2 w-full bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
            >
                Logout
            </button>
        </div>
    );
}
