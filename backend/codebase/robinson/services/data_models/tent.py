from pydantic import BaseModel


class TentModel(BaseModel):
    """
    This class is a model of rental tent prices.
    """
    tent_capacities: list[str]
    lei_price_per_person: int
    eur_price_per_person: int
