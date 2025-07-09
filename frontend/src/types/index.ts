export interface User {
  id: string;
  username: string;
  email: string;
  is_active: boolean;
  created_at: string;
}

export interface Character {
  id: string;
  user_id: string;
  name: string;
  ancestry: string;
  background: string;
  profession: string;
  level: number;
  
  // Atributos
  strength: number;
  agility: number;
  intellect: number;
  will: number;
  
  // Status
  health: number;
  current_health: number;
  healing_rate: number;
  defense: number;
  size: string;
  speed: number;
  power: number;
  
  // Insanidade e Corrupção
  insanity: number;
  corruption: number;
  
  // Dados complexos
  languages: string[];
  professions_skills: string[];
  talents: any[];
  spells: any[];
  equipment: any[];
  
  // Experiência
  experience_points: number;
  
  // Metadados
  is_active: boolean;
  notes: string;
  created_at: string;
  updated_at: string | null;
}

export interface CharacterCreate {
  name: string;
  ancestry: string;
  background: string;
  profession: string;
  level: number;
  strength: number;
  agility: number;
  intellect: number;
  will: number;
  health: number;
  current_health: number;
  healing_rate: number;
  defense: number;
  size: string;
  speed: number;
  power: number;
  insanity: number;
  corruption: number;
  languages: string[];
  professions_skills: string[];
  talents: any[];
  spells: any[];
  equipment: any[];
  experience_points: number;
  notes: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  username: string;
  email: string;
  password: string;
}

export interface AuthResponse {
  access_token: string;
  token_type: string;
}
