import { api } from './api';
import type { Character, CharacterCreate } from '../types';

export const characterService = {
  async getCharacters(): Promise<Character[]> {
    const response = await api.get<Character[]>('/characters/');
    return response.data;
  },

  async getCharacter(id: string): Promise<Character> {
    const response = await api.get<Character>(`/characters/${id}`);
    return response.data;
  },

  async createCharacter(character: CharacterCreate): Promise<Character> {
    const response = await api.post<Character>('/characters/', character);
    return response.data;
  },

  async updateCharacter(id: string, character: Partial<CharacterCreate>): Promise<Character> {
    const response = await api.put<Character>(`/characters/${id}`, character);
    return response.data;
  },

  async deleteCharacter(id: string): Promise<void> {
    await api.delete(`/characters/${id}`);
  },

  async getStats(): Promise<{ total_characters: number; average_level: number }> {
    const response = await api.get('/characters/stats');
    return response.data;
  },
};
