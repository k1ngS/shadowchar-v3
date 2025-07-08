# Shadowchar - Plataforma de Gerenciamento de RPG

Uma plataforma moderna e especializada para gerenciamento de RPG, focada inicialmente em **Shadow of the Demon Lord** com arquitetura modular para expansão futura.

![Status](https://img.shields.io/badge/Status-Em%20Desenvolvimento-yellow)
![Version](https://img.shields.io/badge/Version-1.0.0-blue)
![License](https://img.shields.io/badge/License-MIT-green)

## 🎯 Sobre o Projeto

O Shadowchar é uma plataforma web que visa revolucionar a experiência de jogadores e mestres de RPG, oferecendo:

- **Fichas automatizadas** com cálculos inteligentes
- **Ferramentas de mestre** integradas e eficientes
- **Gerenciamento de campanhas** completo
- **Comunicação em tempo real** via WebSockets
- **Interface responsiva** para todos os dispositivos

### 🌟 Diferenciais

- **Especialização em Shadow of the Demon Lord** com suporte nativo às mecânicas únicas
- **Automação de Insanidade e Corrupção** - mecânicas centrais do sistema
- **Sistema de Caminhos** completamente integrado
- **Arquitetura modular** preparada para múltiplos sistemas de RPG

## 🚀 Tecnologias

### Frontend
- **React** 18.3.1 - Biblioteca para interfaces
- **TypeScript** - Tipagem estática
- **Vite** - Build tool moderna e rápida
- **Tailwind CSS** - Styling utilitário
- **React Query** - Gerenciamento de estado server
- **Zustand** - Gerenciamento de estado local
- **React Router** - Roteamento
- **React Hook Form** - Formulários
- **Zod** - Validação de esquemas

### Backend
- **Python** 3.11 - Linguagem principal
- **FastAPI** - Framework web moderno
- **SQLAlchemy** - ORM
- **PostgreSQL** - Banco de dados
- **JWT** - Autenticação
- **WebSockets** - Comunicação em tempo real
- **Alembic** - Migrações de banco

### Infraestrutura
- **Docker** - Containerização
- **Docker Compose** - Orquestração
- **PostgreSQL** 15 - Banco de dados
- **Nginx** - Proxy reverso (produção)

## 📋 Pré-requisitos

- Docker 20.10+
- Docker Compose 2.0+
- Git

## 🛠️ Instalação

### 1. Clonar o repositório

```bash
git clone https://github.com/seu-usuario/shadowchar.git
cd shadowchar
```

### 2. Configurar variáveis de ambiente

```bash
cp .env.example .env
```

Edite o arquivo `.env` com suas configurações:

```env
# Database
DATABASE_URL=postgresql://shadowchar:shadowchar123@db:5432/shadowchar

# JWT
SECRET_KEY=your-super-secret-key-here-change-in-production
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30

# Development
DEBUG=True
ENVIRONMENT=development
```

### 3. Iniciar com Docker

```bash
# Iniciar todos os serviços
docker-compose up -d

# Verificar se está funcionando
docker-compose ps
```

### 4. Configurar o banco de dados

```bash
# Entrar no container do backend
docker-compose exec backend bash

# Executar migrações
alembic upgrade head

# Sair do container
exit
```

## 🌐 Acessos

Após iniciar o projeto:

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:8000
- **Documentação da API**: http://localhost:8000/docs
- **Health Check**: http://localhost:8000/health
- **Banco de dados**: localhost:5433

## 📁 Estrutura do Projeto

```
shadowchar/
├── frontend/                 # React + TypeScript + Vite
│   ├── src/
│   │   ├── components/      # Componentes reutilizáveis
│   │   ├── pages/          # Páginas da aplicação
│   │   ├── hooks/          # Custom hooks
│   │   ├── services/       # Serviços de API
│   │   ├── stores/         # Gerenciamento de estado
│   │   ├── types/          # Tipos TypeScript
│   │   └── utils/          # Utilitários
│   ├── package.json
│   └── Dockerfile
├── backend/                 # Python + FastAPI
│   ├── app/
│   │   ├── api/           # Rotas da API
│   │   ├── core/          # Configurações e segurança
│   │   ├── models/        # Modelos SQLAlchemy
│   │   ├── schemas/       # Schemas Pydantic
│   │   └── utils/         # Utilitários
│   ├── alembic/           # Migrações
│   ├── tests/             # Testes
│   ├── requirements.txt
│   └── Dockerfile
├── docker-compose.yml       # Orquestração Docker
└── README.md
```

## 🔧 Desenvolvimento

### Comandos úteis

```bash
# Ver logs em tempo real
docker-compose logs -f

# Logs de um serviço específico
docker-compose logs -f backend
docker-compose logs -f frontend

# Reiniciar serviços
docker-compose restart backend
docker-compose restart frontend

# Entrar no container para debug
docker-compose exec backend bash
docker-compose exec frontend sh

# Parar todos os serviços
docker-compose down

# Rebuild completo
docker-compose down
docker-compose up --build -d
```

### Executar localmente (sem Docker)

#### Backend

```bash
cd backend
python -m venv venv
source venv/bin/activate  # Linux/Mac
# ou
venv\Scripts\activate     # Windows

pip install -r requirements.txt
uvicorn app.main:app --reload
```

#### Frontend

```bash
cd frontend
npm install
npm run dev
```

## 🧪 Testes

### Backend

```bash
# Executar testes
docker-compose exec backend pytest

# Executar com coverage
docker-compose exec backend pytest --cov=app
```

### Frontend

```bash
# Executar testes
docker-compose exec frontend npm test

# Executar com coverage
docker-compose exec frontend npm run test:coverage
```

## 📊 Status do Desenvolvimento

### ✅ Concluído

- [x] Configuração inicial do projeto
- [x] Ambiente Docker
- [x] Estrutura do banco de dados
- [x] Sistema de autenticação (JWT)
- [x] APIs básicas de usuário
- [x] Configuração do frontend

### 🚧 Em Desenvolvimento

- [ ] Interface de autenticação (login/registro)
- [ ] Modelos de personagem
- [ ] Ficha de Shadow of the Demon Lord
- [ ] Sistema de campanhas
- [ ] WebSockets para tempo real

### 📋 Próximos Passos

- [ ] Ferramentas de mestre
- [ ] Biblioteca de regras
- [ ] Sistema de convites
- [ ] Temas e personalização
- [ ] Suporte a múltiplos sistemas

## 🤝 Contribuindo

1. Faça um fork do projeto
2. Crie uma branch para sua feature (\`git checkout -b feature/AmazingFeature\`)
3. Commit suas mudanças (\`git commit -m 'Add some AmazingFeature'\`)
4. Push para a branch (\`git push origin feature/AmazingFeature\`)
5. Abra um Pull Request

## 📝 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 🎮 Shadow of the Demon Lord

Shadow of the Demon Lord é um RPG criado por Robert J. Schwalb. Este projeto é uma ferramenta de fãs não oficial e não é afiliado com Schwalb Entertainment.

## 📞 Contato

- **Autor**: Marcos k1ngs
- **Email**: marcos.beltrao@outlook.pt
- **GitHub**: [@k1ngs](https://github.com/k1ngs)
- **LinkedIn**: [marcos k1ngs](https://linkedin.com/in/marcos-k1ngs)

## 🙏 Agradecimentos

- Comunidade de Shadow of the Demon Lord
- Contribuidores do projeto
- Desenvolvedores das tecnologias utilizadas


**Shadowchar** - Revolucionando o RPG digital, uma ficha de cada vez.