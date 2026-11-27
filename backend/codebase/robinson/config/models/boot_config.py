from dataclasses import dataclass, field

from robinson.config.models.app_config import AppConfig
from robinson.config.models.database_config import DatabaseConfig


@dataclass(frozen=True)
class BootConfig:
    version: int = 1
    app: AppConfig = field(default_factory=AppConfig)
    db: DatabaseConfig = field(default_factory=DatabaseConfig)
