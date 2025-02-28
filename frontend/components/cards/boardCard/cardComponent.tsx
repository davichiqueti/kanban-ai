import { useState } from "react";
import { Card } from "@/types/card/cardType";
import CardModal from "./cardModal";

interface CardProps {
  card: Card;
}

export default function CardComponent({ card }: CardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const priorityMap: Record<number, { text: string; color: string }> = {
    1: { text: "Low", color: "bg-blue-300" },
    2: { text: "Medium", color: "bg-yellow-300" },
    3: { text: "High", color: "bg-green-400" },
  };

  const priority = priorityMap[card.priority ?? 0] || { text: "Desconhecida", color: "bg-gray-500" };

  return (
    <>
      <div
        className="bg-white p-2 rounded shadow cursor-pointer h-28"

        onClick={() => setIsModalOpen(true)}
      >

        <h3 className="font-normal"><strong>{card.title}</strong></h3>

        {card.due_date && (
          <p className="text-xs text-gray-500">
            Due: {new Date(card.due_date).toLocaleDateString()}
          </p>
        )}

        <span className={`px-2 py-1 rounded text-white ${priority.color}`}>
          {priority.text}
        </span>

      </div>

      {isModalOpen && (
        <CardModal card={card} onClose={() => setIsModalOpen(false)} />
      )}
    </>
  );
}
