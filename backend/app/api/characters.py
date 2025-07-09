from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List
import uuid

from app.core.database import get_db
from app.core.deps import get_current_user
from app.models.user import User
from app.schemas.character import CharacterCreate, CharacterUpdate, CharacterResponse
from app.services.character_service import CharacterService

router = APIRouter()

@router.post("/", response_model=CharacterResponse, status_code=status.HTTP_201_CREATED)
def create_character(
    character: CharacterCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Criar novo personagem"""
    return CharacterService.create_character(db, character, current_user.id)

@router.get("/", response_model=List[CharacterResponse])
def get_my_characters(
    skip: int = 0,
    limit: int = 100,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Listar meus personagens"""
    return CharacterService.get_characters_by_user(db, current_user.id, skip, limit)

@router.get("/stats")
def get_character_stats(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Estatísticas dos meus personagens"""
    return CharacterService.get_character_stats(db, current_user.id)

@router.get("/{character_id}", response_model=CharacterResponse)
def get_character(
    character_id: uuid.UUID,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Obter personagem específico"""
    character = CharacterService.get_character_by_id(db, character_id, current_user.id)
    if not character:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Character not found"
        )
    return character

@router.put("/{character_id}", response_model=CharacterResponse)
def update_character(
    character_id: uuid.UUID,
    character_update: CharacterUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Atualizar personagem"""
    character = CharacterService.update_character(db, character_id, character_update, current_user.id)
    if not character:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Character not found"
        )
    return character

@router.delete("/{character_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_character(
    character_id: uuid.UUID,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Deletar personagem"""
    success = CharacterService.delete_character(db, character_id, current_user.id)
    if not success:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Character not found"
        )
