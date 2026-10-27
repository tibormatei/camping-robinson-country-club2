from dataclasses import dataclass


@dataclass(frozen=True)
class OpenApiSchemaConfig:
    title: str = "Camping Robinson Country Web Service API"
    version: str = "0.0.0"
    description: str = "The one and only Camping Robinson Country Club web server."
