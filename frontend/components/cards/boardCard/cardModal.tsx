import { Card } from "@/types/card/cardType";

interface CardModalProps {
  card: Card;
  onClose: () => void;
}

export default function CardModal({ card, onClose }: CardModalProps) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-xl font-bold mb-2">{card.title}</h2>
        <p className="text-sm text-gray-700 mb-4">{card.description}</p>

        {card.due_date && (
          <p className="text-sm text-gray-500">
            Due date: {new Date(card.due_date).toLocaleDateString()}
          </p>
        )}

        <div className="flex justify-end mt-4">
          <button
            onClick={onClose}
            className="bg-red-500 text-white px-4 py-2 rounded-md"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
}
