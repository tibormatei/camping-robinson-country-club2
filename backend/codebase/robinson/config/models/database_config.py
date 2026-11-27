from dataclasses import dataclass, field

from robinson.config.models.postgres_database_config import PostgresDatabaseConfig


@dataclass(frozen=True)
class DatabaseConfig:
    provider: str = "postgres"
    postgres: PostgresDatabaseConfig = field(default_factory=PostgresDatabaseConfig)
