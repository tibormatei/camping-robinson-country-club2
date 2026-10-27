import os
from functools import lru_cache

from robinson.config.models.api_config import ApiConfig
from robinson.config.models.app_config import AppConfig
from robinson.config.models.boot_config import BootConfig
from robinson.config.models.config import Config


def _load_config_from_envs() -> Config:
    """
    Reads the environment variables and if missing one keeps the default of the model.
    """
    api = ApiConfig(
        host=os.environ.get("API_HOST", ApiConfig.host),
        port=int(os.environ.get("API_PORT", ApiConfig.port)),
    )
    app = AppConfig(
        api=api,
        log_level=os.environ.get("APP_LOG_LEVEL", AppConfig.log_level),
    )
    return Config(boot=BootConfig(app=app))

@lru_cache(maxsize=1)
def get_config() -> Config:
    return _load_config_from_envs()
