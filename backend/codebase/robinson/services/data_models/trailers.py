from pydantic import BaseModel

from robinson.services.data_models.trailer import TrailerModel


class TrailersModel(BaseModel):
    """
    This class is a model of rental trailers prices.
    """
    trailers: list[TrailerModel]
