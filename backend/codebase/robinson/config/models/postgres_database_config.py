from dataclasses import dataclass, field


@dataclass(frozen=True)
class PostgresDatabaseConfig:
    host: str = "localhost"
    port: int = 5432
    database: str = "robinson"
    username: str = "robinson"
    password: str = field(default="", repr=False)
