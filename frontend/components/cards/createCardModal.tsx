

interface CreateCardModalProps {
    onClose: () => void;
}


export default function CreateCardModal({ onClose }: CreateCardModalProps) {

    return(
<div className="fixed inset-0 bg-black bg-opacity-25 flex justify-center items-center z-50">
            <div className="bg-white p-6 pt-2 rounded-lg shadow-lg max-w-lg w-full">
                <button onClick={onClose} className="text-red-500">Fechar</button>
                <h1><strong>Crie seu Card!</strong></h1>
                


            </div>
        </div>
    )
}