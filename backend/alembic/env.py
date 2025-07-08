import os
import socket
import sys
from logging.config import fileConfig

from alembic import context
from sqlalchemy import engine_from_config, pool

# Adicione o path
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

# Import a Base primeiro
from app.core.database import Base

# Import TODOS os models ANTES de usar o metadata
from app.models.user import User  # noqa: F401

config = context.config

if config.config_file_name is not None:
    fileConfig(config.config_file_name)

# Agora o metadata já tem as tabelas registradas
target_metadata = Base.metadata


def get_database_url():
    """Detecta automaticamente o ambiente e retorna a URL correta"""

    # Método 1: Verificar se existe o arquivo .dockerenv (presente em containers)
    if os.path.exists("/.dockerenv"):
        return "postgresql://shadowchar:shadowchar123@db:5432/shadowchar"

    # Método 2: Verificar se consegue resolver o host "db"
    try:
        socket.gethostbyname("db")
        # Se conseguiu resolver "db", está dentro do container
        return "postgresql://shadowchar:shadowchar123@db:5432/shadowchar"
    except socket.gaierror:
        # Se não conseguiu resolver "db", está fora do container
        return "postgresql://shadowchar:shadowchar123@localhost:5433/shadowchar"


def run_migrations_offline() -> None:
    url = get_database_url()
    context.configure(
        url=url,
        target_metadata=target_metadata,
        literal_binds=True,
        dialect_opts={"paramstyle": "named"},
    )

    with context.begin_transaction():
        context.run_migrations()


def run_migrations_online() -> None:
    # Use a URL detectada automaticamente
    url = get_database_url()
    print(f"🔍 Alembic usando URL: {url}")

    configuration = config.get_section(config.config_ini_section)
    configuration["sqlalchemy.url"] = url  # type: ignore

    connectable = engine_from_config(
        configuration,  # type: ignore
        prefix="sqlalchemy.",
        poolclass=pool.NullPool,
    )

    with connectable.connect() as connection:
        context.configure(connection=connection, target_metadata=target_metadata)

        with context.begin_transaction():
            context.run_migrations()


if context.is_offline_mode():
    run_migrations_offline()
else:
    run_migrations_online()
