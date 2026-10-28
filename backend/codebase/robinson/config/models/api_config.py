from dataclasses import dataclass, field

from robinson.config.models.open_api_schema import OpenApiSchemaConfig


@dataclass(frozen=True)
class ApiConfig:
    host: str = "0.0.0.0"
    port: int = 4000
    root: str = ""
    threads: int = 12
    prefix: str = "/api"
    schema: OpenApiSchemaConfig = field(default_factory=OpenApiSchemaConfig)
