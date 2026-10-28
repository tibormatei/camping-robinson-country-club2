from pydantic import BaseModel

from robinson.services.data_models.trailer import TrailerModel


class TrailersModel(BaseModel):
    """
    This class is a model of rental trailers prices.
    """
    trailers: list[TrailerModel]

    def __iter__(self):
        """
        This is an iterable class.

        Args:
            self: TrailersModel self parameter.
        """
        return iter(self.trailers)
