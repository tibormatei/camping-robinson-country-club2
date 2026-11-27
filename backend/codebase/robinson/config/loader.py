import os
from functools import lru_cache

from robinson.config.models.api_config import ApiConfig
from robinson.config.models.app_config import AppConfig
from robinson.config.models.boot_config import BootConfig
from robinson.config.models.config import Config
from robinson.config.models.database_config import DatabaseConfig
from robinson.config.models.postgres_database_config import PostgresDatabaseConfig
from robinson.config.models.swagger_config import SwaggerConfig


def _load_config_from_envs() -> Config:
    """
    Reads the environment variables and if missing one keeps the default of the model.
    """
    api = ApiConfig(
        host=os.environ.get("API_HOST", ApiConfig.host),
        port=int(os.environ.get("API_PORT", ApiConfig.port)),
    )
    swagger = SwaggerConfig(
        enabled=os.environ.get("APP_ENABLE_SWAGGER", str(SwaggerConfig.enabled)).lower() in ('true', '1', 'yes', 'on'),
    )
    app = AppConfig(
        api=api,
        log_level=os.environ.get("APP_LOG_LEVEL", AppConfig.log_level),
        swagger=swagger,
    )

    postgres = PostgresDatabaseConfig(
        host=os.environ.get("DB_POSTGRES_HOST", PostgresDatabaseConfig.host),
        port=int(os.environ.get("DB_POSTGRES_PORT", PostgresDatabaseConfig.port)),
        database=os.environ.get("DB_POSTGRES_DBNAME", PostgresDatabaseConfig.database),
        username=os.environ.get("DB_POSTGRES_USERNAME", PostgresDatabaseConfig.username),
        password=os.environ.get("DB_POSTGRES_PASSWORD", PostgresDatabaseConfig.password),
    )
    db = DatabaseConfig(postgres=postgres)

    return Config(boot=BootConfig(app=app, db=db))

@lru_cache(maxsize=1)
def get_config() -> Config:
    return _load_config_from_envs()
