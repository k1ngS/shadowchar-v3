import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { characterService } from '../services/characters';
import type { Character, CharacterCreate } from '../types';

export const useCharacters = () => {
  const queryClient = useQueryClient();

  // Query para buscar todos os personagens
  const { data: characters, isLoading, error } = useQuery<Character[]> ({
    queryKey: ['characters'],
    queryFn: characterService.getCharacters,
  });

  // Mutação para criar um novo personagem
  const createCharacterMutation = useMutation({
    mutationFn: (newCharacter: CharacterCreate) => characterService.createCharacter(newCharacter),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['characters'] }); // Invalida o cache para re-buscar a lista
    },
  });

  // Mutação para deletar um personagem
  const deleteCharacterMutation = useMutation({
    mutationFn: (id: string) => characterService.deleteCharacter(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['characters'] }); // Invalida o cache para re-buscar a lista
    },
  });

  return {
    characters,
    isLoading,
    error,
    createCharacter: createCharacterMutation.mutate,
    isCreating: createCharacterMutation.isPending,
    deleteCharacter: deleteCharacterMutation.mutate,
    isDeleting: deleteCharacterMutation.isPending,
  };
};