
import { User} from "./header";

interface HeaderInfoModalProps {
    openModal: boolean;
    closeModal: () => void;
    userInfo: User | null;
}

export default function HeaderInfoModal({ openModal, closeModal, userInfo }: HeaderInfoModalProps) {
    if (!openModal) return null;

    return (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-5 rounded-lg shadow-lg">
                <h2 className="text-lg font-bold">Perfil</h2>
                <h3>{userInfo?.email}</h3>
                <button 
                    className="mt-3 mr-3 bg-red-500 text-white px-4 py-2 rounded"
                    onClick={closeModal}
                >
                    Fechar
                </button>
                <button 
                    className="mt-3 bg-red-500 text-white px-4 py-2 rounded"
                >
                    Logout
                </button>
            </div>
        </div>
    );
}
