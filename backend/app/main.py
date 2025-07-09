from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api import auth, characters

app = FastAPI(
    title="Shadowchar API",
    description="API para gerenciamento de personagens de Shadow of the Demon Lord",
    version="1.0.0"
)

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Routers
app.include_router(auth.router, prefix="/api/v1/auth", tags=["auth"])
app.include_router(characters.router, prefix="/api/v1/characters", tags=["characters"])

@app.get("/")
async def root():
    return {"message": "Shadowchar API"}

@app.get("/health")
async def health_check():
    return {"status": "healthy"}
