from pydantic import BaseModel


class TrailerModel(BaseModel):
    """
    This class is a model of rental trailer prices.
    """
    trailer_capacity: str
    lei_price: int
    eur_price: int
