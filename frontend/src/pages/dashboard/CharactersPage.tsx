import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import type { Character, CharacterCreate } from '../../types'; // Usando os tipos do index.ts
import { useNavigate } from 'react-router-dom';
import CharacterCard from '../../components/domain/Charater/CharacterCard';
import { useCharacters } from '../../hooks/useCharacters';

const CharactersPage: React.FC = () => {
  const { characters, isLoading, error, createCharacter, deleteCharacter } = useCharacters();
  const { register, handleSubmit, reset } = useForm<CharacterCreate>();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  const openModal = () => {
    setIsModalOpen(true);
    reset();
  };

  const closeModal = () => {
    setIsModalOpen(false);
    reset();
  };

  const onSubmit = (data: CharacterCreate) => {
    createCharacter(data);
    closeModal();
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Tem certeza que deseja excluir este personagem?')) {
      deleteCharacter(id);
    }
  };

  const handleViewCharacter = (characterId: string) => {
    navigate(`/characters/${characterId}`);
  };

  if (isLoading) return <div className="text-center text-gray-600">Carregando personagens...</div>;
  if (error) return <div className="text-center text-red-500">Erro ao carregar personagens: {(error as Error).message}</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Meus Personagens</h1>
      <button
        onClick={openModal}
        className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mb-6"
      >
        Criar Novo Personagem
      </button>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {characters?.map((character) => (
          <CharacterCard
            key={character.id}
            character={character}
            onView={handleViewCharacter}
            onDelete={handleDelete}
          />
        ))}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md">
            <h2 className="text-2xl font-bold mb-4">Criar Personagem</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">Nome:</label>
                <input
                  type="text"
                  id="name"
                  {...register('name', { required: true })}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              <div>
                <label htmlFor="ancestry" className="block text-gray-700 text-sm font-bold mb-2">Ancestralidade:</label>
                <input
                  type="text"
                  id="ancestry"
                  {...register('ancestry', { required: true })}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              <div>
                <label htmlFor="background" className="block text-gray-700 text-sm font-bold mb-2">Background:</label>
                <input
                  type="text"
                  id="background"
                  {...register('background', { required: true })}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              <div>
                <label htmlFor="profession" className="block text-gray-700 text-sm font-bold mb-2">Profissão:</label>
                <input
                  type="text"
                  id="profession"
                  {...register('profession', { required: true })}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              {/* Campos adicionais para CharacterCreate, se necessário */}
              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={closeModal}
                  className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                  Criar Personagem
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default CharactersPage;