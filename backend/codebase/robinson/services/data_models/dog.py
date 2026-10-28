from pydantic import BaseModel


class DogModel(BaseModel):
    """
    This class is a model of dog price.
    """
    lei_price_per_night: int
    eur_price_per_night: int
