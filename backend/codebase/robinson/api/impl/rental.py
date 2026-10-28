from fastapi import APIRouter, status

from robinson.services.data_models.tent import TentModel


# ---------------------------
# Router Definition
# ---------------------------

router = APIRouter(
    prefix="/rental",
    tags=["rental"],
    responses={
        status.HTTP_200_OK: {"description": "Ok"},
    },
)

# ---------------------------
# Endpoints
# ---------------------------

@router.get("/tent")
async def get_tent() -> TentModel:
    return TentModel(tent_capacities=["1", "2", "3"], lei_price_per_person=1, eur_price_per_person=2)
