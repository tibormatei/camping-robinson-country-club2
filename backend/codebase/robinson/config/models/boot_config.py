from dataclasses import dataclass

from app_config import AppConfig


@dataclass(frozen=True)
class BootConfig():
    version: int = 1
    app: AppConfig = AppConfig()
    # db: DbConfig
