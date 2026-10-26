from dataclasses import dataclass

from api_config import ApiConfig


@dataclass(frozen=True)
class AppConfig():
    app: str = "robinson.main:app"
    api: ApiConfig = ApiConfig()
    log_level: str = "info"
    # swagger: SwaggerConfig
