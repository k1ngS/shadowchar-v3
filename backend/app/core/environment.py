import os
import socket


def is_running_in_docker():
    """Detecta se está rodando dentro de um container Docker"""

    # Método 1: Verificar arquivo .dockerenv
    if os.path.exists("/.dockerenv"):
        return True

    # Método 2: Verificar se consegue resolver o host "db"
    try:
        socket.gethostbyname("db")
        return True
    except socket.gaierror:
        return False


def get_database_url():
    """Retorna a URL do banco baseada no ambiente"""

    if is_running_in_docker():
        # Dentro do container - comunicação interna
        return "postgresql://shadowchar:shadowchar123@db:5432/shadowchar"
    else:
        # Fora do container - porta mapeada
        return "postgresql://shadowchar:shadowchar123@localhost:5433/shadowchar"


def get_environment_info():
    """Retorna informações sobre o ambiente"""
    in_docker = is_running_in_docker()
    return {
        "in_docker": in_docker,
        "database_url": get_database_url(),
        "environment": "docker" if in_docker else "local",
    }
