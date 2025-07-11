import uuid
from datetime import datetime
from typing import Any, Dict, List, Optional

from pydantic import BaseModel, Field


class CharacterBase(BaseModel):
    name: str = Field(..., min_length=1, max_length=255)
    ancestry: Optional[str] = Field(None, max_length=100)
    background: Optional[str] = Field(None, max_length=100)
    profession: Optional[str] = Field(None, max_length=100)
    level: int = Field(0, ge=0)

    # Atributos básicos
    strength: int = Field(10, ge=1, le=20)
    agility: int = Field(10, ge=1, le=20)
    intellect: int = Field(10, ge=1, le=20)
    will: int = Field(10, ge=1, le=20)

    # Status
    health: int = Field(0, ge=0)
    current_health: int = Field(0, ge=0)
    healing_rate: int = Field(0, ge=0)
    defense: int = Field(0, ge=0)
    size: str = Field("1", max_length=20)
    speed: int = Field(10, ge=0)
    power: int = Field(0, ge=0)

    # Insanidade e Corrupção
    insanity: int = Field(0, ge=0)
    corruption: int = Field(0, ge=0)

    # Dados complexos
    languages: Optional[List[str]] = Field(default_factory=list)
    professions_skills: Optional[List[str]] = Field(default_factory=list)
    talents: Optional[List[Dict[str, Any]]] = Field(default_factory=list)
    spells: Optional[List[Dict[str, Any]]] = Field(default_factory=list)
    equipment: Optional[List[Dict[str, Any]]] = Field(default_factory=list)

    # Experiência
    experience_points: int = Field(0, ge=0)

    # Notas
    notes: Optional[str] = None


class CharacterCreate(CharacterBase):
    pass


class CharacterUpdate(BaseModel):
    name: Optional[str] = Field(None, min_length=1, max_length=255)
    ancestry: Optional[str] = Field(None, max_length=100)
    background: Optional[str] = Field(None, max_length=100)
    profession: Optional[str] = Field(None, max_length=100)
    level: Optional[int] = Field(None, ge=0)

    # Atributos básicos
    strength: Optional[int] = Field(None, ge=1, le=20)
    agility: Optional[int] = Field(None, ge=1, le=20)
    intellect: Optional[int] = Field(None, ge=1, le=20)
    will: Optional[int] = Field(None, ge=1, le=20)

    # Status
    health: Optional[int] = Field(None, ge=0)
    current_health: Optional[int] = Field(None, ge=0)
    healing_rate: Optional[int] = Field(None, ge=0)
    defense: Optional[int] = Field(None, ge=0)
    size: Optional[str] = Field(None, max_length=20)
    speed: Optional[int] = Field(None, ge=0)
    power: Optional[int] = Field(None, ge=0)

    # Insanidade e Corrupção
    insanity: Optional[int] = Field(None, ge=0)
    corruption: Optional[int] = Field(None, ge=0)

    # Dados complexos
    languages: Optional[List[str]] = None
    professions_skills: Optional[List[str]] = None
    talents: Optional[List[Dict[str, Any]]] = None
    spells: Optional[List[Dict[str, Any]]] = None
    equipment: Optional[List[Dict[str, Any]]] = None

    # Experiência
    experience_points: Optional[int] = Field(None, ge=0)

    # Notas
    notes: Optional[str] = None


class CharacterResponse(CharacterBase):
    id: uuid.UUID
    user_id: uuid.UUID
    is_active: bool
    created_at: datetime
    updated_at: Optional[datetime] = None

    class Config:
        from_attributes = True
