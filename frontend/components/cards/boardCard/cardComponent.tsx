import { useState } from "react";
import { Card } from "@/types/card/cardType";
import CardModal from "./cardModal";

interface CardProps {
  card: Card;
}

export default function CardComponent({ card }: CardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div
        className="bg-white p-2 rounded shadow cursor-pointer"
        onClick={() => setIsModalOpen(true)}
      >
        <h3 className="font-medium">{card.title}</h3>
        {card.description && <p className="text-sm">{card.description}</p>}
        {card.due_date && (
          <p className="text-xs text-gray-500">
            Due: {new Date(card.due_date).toLocaleDateString()}
          </p>
        )}
      </div>

      {isModalOpen && (
        <CardModal card={card} onClose={() => setIsModalOpen(false)} />
      )}
    </>
  );
}
