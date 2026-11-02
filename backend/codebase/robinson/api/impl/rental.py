from fastapi import APIRouter, status

from robinson.services.data_models.tent import TentModel
from robinson.services.data_models.trailers import TrailersModel
from robinson.services.data_models.trailer import TrailerModel
from robinson.services.data_models.dog import DogModel


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

@router.get("/trailer")
async def get_trailer() -> TrailersModel:
    return TrailersModel(trailers=[
        TrailerModel(trailer_capacity="1", lei_price=10, eur_price=20),
        TrailerModel(trailer_capacity="2", lei_price=15, eur_price=30)
    ])

@router.get("/dog")
async def get_dog() -> DogModel:
    return DogModel(lei_price_per_night=10, eur_price_per_night=20)
