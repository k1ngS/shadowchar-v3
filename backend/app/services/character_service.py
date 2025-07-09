from sqlalchemy.orm import Session
from app.models.character import Character
from app.schemas.character import CharacterCreate, CharacterUpdate
from typing import List, Optional
import uuid


class CharacterService:
    
    @staticmethod
    def create_character(db: Session, character: CharacterCreate, user_id: uuid.UUID) -> Character:
        """Criar novo personagem"""
        db_character = Character(
            user_id=user_id,
            **character.dict()
        )
        db.add(db_character)
        db.commit()
        db.refresh(db_character)
        return db_character
    
    @staticmethod
    def get_characters_by_user(db: Session, user_id: uuid.UUID, skip: int = 0, limit: int = 100) -> List[Character]:
        """Listar personagens do usuário"""
        return db.query(Character).filter(
            Character.user_id == user_id,
            Character.is_active == True
        ).offset(skip).limit(limit).all()
    
    @staticmethod
    def get_character_by_id(db: Session, character_id: uuid.UUID, user_id: uuid.UUID) -> Optional[Character]:
        """Obter personagem específico do usuário"""
        return db.query(Character).filter(
            Character.id == character_id,
            Character.user_id == user_id,
            Character.is_active == True
        ).first()
    
    @staticmethod
    def update_character(db: Session, character_id: uuid.UUID, character_update: CharacterUpdate, user_id: uuid.UUID) -> Optional[Character]:
        """Atualizar personagem"""
        db_character = CharacterService.get_character_by_id(db, character_id, user_id)
        if not db_character:
            return None
        
        update_data = character_update.dict(exclude_unset=True)
        for field, value in update_data.items():
            setattr(db_character, field, value)
        
        db.commit()
        db.refresh(db_character)
        return db_character
    
    @staticmethod
    def delete_character(db: Session, character_id: uuid.UUID, user_id: uuid.UUID) -> bool:
        """Deletar personagem (soft delete)"""
        db_character = CharacterService.get_character_by_id(db, character_id, user_id)
        if not db_character:
            return False
        
        db_character.is_active = False
        db.commit()
        return True
    
    @staticmethod
    def get_character_stats(db: Session, user_id: uuid.UUID) -> dict:
        """Estatísticas dos personagens do usuário"""
        total = db.query(Character).filter(
            Character.user_id == user_id,
            Character.is_active == True
        ).count()
        
        avg_level = db.query(Character).filter(
            Character.user_id == user_id,
            Character.is_active == True
        ).with_entities(Character.level).all()
        
        avg_level_value = sum([char.level for char in avg_level]) / len(avg_level) if avg_level else 0
        
        return {
            "total_characters": total,
            "average_level": round(avg_level_value, 1)
        }
