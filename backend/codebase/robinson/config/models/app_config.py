from dataclasses import dataclass, field

from robinson.config.models.api_config import ApiConfig
from robinson.config.models.swagger_config import SwaggerConfig


@dataclass(frozen=True)
class AppConfig:
    app: str = "robinson.api.api_main:app"
    api: ApiConfig = field(default_factory=ApiConfig)
    log_level: str = "info"
    swagger: SwaggerConfig = field(default_factory=SwaggerConfig)
