import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { characterService } from '../services/characters';
import type { Character, CharacterCreate } from '../types';

export const useCharacterSheet = (characterId: string) => {
  const queryClient = useQueryClient();

  const { data: character, isLoading, error } = useQuery<Character>({
    queryKey: ['character', characterId],
    queryFn: () => characterService.getCharacter(characterId),
    enabled: !!characterId, // Só executa a query se characterId existir
  });

  const updateCharacterMutation = useMutation({
    mutationFn: (payload: Partial<CharacterCreate>) =>
      characterService.updateCharacter(characterId, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['character', characterId] });
      queryClient.invalidateQueries({ queryKey: ['characters'] }); // Invalida a lista também
    },
  });

  return {
    character,
    isLoading,
    error,
    updateCharacter: updateCharacterMutation.mutate,
    isUpdating: updateCharacterMutation.isPending,
  };
};