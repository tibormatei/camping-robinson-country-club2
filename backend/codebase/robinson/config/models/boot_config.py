from dataclasses import dataclass, field

from robinson.config.models.app_config import AppConfig


@dataclass(frozen=True)
class BootConfig:
    version: int = 1
    app: AppConfig = field(default_factory=AppConfig)
    # db: DbConfig
