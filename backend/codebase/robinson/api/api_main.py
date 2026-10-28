from fastapi import FastAPI

from robinson.config.loader import get_config


# FastAPI app initialization
app = FastAPI(
    root_path=get_config().boot.app.api.root,
    title=get_config().boot.app.api.schema.title,
    description=get_config().boot.app.api.schema.description,
    version="1.0.0",
    redirect_slashes=False,
)

@app.get("/api/health")
async def health() -> dict[str, str]:
    return {"status": "ok"}

# Routes initialization
from robinson.api.impl.rental import router as rental_router

api_routers = [
    rental_router,
]

for router in api_routers:
    app.include_router(router)
