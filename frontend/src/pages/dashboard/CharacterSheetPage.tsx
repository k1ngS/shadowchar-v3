import React from 'react';
import { useParams } from 'react-router-dom';
import { useCharacterSheet } from '../../hooks/useCharacterSheet';
import CharacterSheet from '../../components/domain/Charater/CharacterSheet';

const CharacterSheetPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  if (!id) {
    return <div className="text-center text-red-500">ID do personagem não fornecido.</div>;
  }

  const { character, isLoading, error, updateCharacter, isUpdating } = useCharacterSheet(id);

  if (isLoading) {
    return <div className="text-center text-gray-600">Carregando ficha do personagem...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500">Erro ao carregar ficha do personagem: {(error as Error).message}</div>;
  }

  if (!character) {
    return <div className="text-center text-gray-600">Personagem não encontrado.</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <CharacterSheet
        character={character}
        onUpdate={updateCharacter}
        isUpdating={isUpdating}
      />
    </div>
  );
};

export default CharacterSheetPage;