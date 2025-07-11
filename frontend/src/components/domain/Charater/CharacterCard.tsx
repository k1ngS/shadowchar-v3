import React from 'react';
import type { Character } from '../../../types'; // Usando os tipos do index.ts

interface CharacterCardProps {
  character: Character;
  onView: (id: string) => void; // Nova prop para visualização
  onDelete: (id: string) => void;
}

const CharacterCard: React.FC<CharacterCardProps> = ({ character, onView, onDelete }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-4 mb-4 flex flex-col">
      <h3 className="text-xl font-bold text-gray-800 mb-2">{character.name}</h3>
      <p className="text-gray-600">Ancestralidade: {character.ancestry}</p>
      <p className="text-gray-600">Profissão: {character.profession}</p>
      <p className="text-gray-600">Nível: {character.level}</p>
      <div className="mt-4 flex justify-end space-x-2">
        <button
          onClick={() => onView(character.id)}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Ver Ficha
        </button>
        <button
          onClick={() => onDelete(character.id)}
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
        >
          Excluir
        </button>
      </div>
    </div>
  );
};

export default CharacterCard;