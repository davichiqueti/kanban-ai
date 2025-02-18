
interface CreateBoardModalProps {
    onClose: () => void;
}

export default function CreateBoardModal({ onClose }: CreateBoardModalProps) {

    return (
        <div className="fixed inset-0 bg-black bg-opacity-25 flex justify-center items-center z-50">

            <div className="bg-white p-6 pt-2 rounded-lg shadow-lg max-w-lg w-full">

                <button onClick={onClose}> fechar</button>
                <h1><strong>Crie seu Board!</strong></h1>

            </div>
        </div>
    )
}
