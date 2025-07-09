import uuid
from sqlalchemy import Column, String, Integer, Boolean, Text, ForeignKey, JSON
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.sql import func
from sqlalchemy import DateTime
from sqlalchemy.orm import relationship

from app.core.database import Base


class Character(Base):
    __tablename__ = "characters"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    user_id = Column(UUID(as_uuid=True), ForeignKey("users.id"), nullable=False)
    
    # Informações básicas
    name = Column(String(255), nullable=False)
    ancestry = Column(String(100))  # Human, Dwarf, Elf, etc.
    background = Column(String(100))  # Academic, Criminal, etc.
    profession = Column(String(100))  # Warrior, Magician, etc.
    level = Column(Integer, default=0)
    
    # Atributos básicos
    strength = Column(Integer, default=10)
    agility = Column(Integer, default=10)
    intellect = Column(Integer, default=10)
    will = Column(Integer, default=10)
    
    # Status derivados
    health = Column(Integer, default=0)
    current_health = Column(Integer, default=0)
    healing_rate = Column(Integer, default=0)
    defense = Column(Integer, default=0)
    size = Column(String(20), default="1")
    speed = Column(Integer, default=10)
    power = Column(Integer, default=0)
    
    # Insanidade e Corrupção
    insanity = Column(Integer, default=0)
    corruption = Column(Integer, default=0)
    
    # Dados complexos (JSON)
    languages = Column(JSON)  # Lista de idiomas
    professions_skills = Column(JSON)  # Habilidades profissionais
    talents = Column(JSON)  # Talentos
    spells = Column(JSON)  # Magias
    equipment = Column(JSON)  # Equipamentos
    
    # Experiência
    experience_points = Column(Integer, default=0)
    
    # Metadados
    is_active = Column(Boolean, default=True)
    notes = Column(Text)
    
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
    
    # Relacionamentos
    user = relationship("User", back_populates="characters")
