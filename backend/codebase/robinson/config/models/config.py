from dataclasses import dataclass, field

from robinson.config.models.boot_config import BootConfig


@dataclass(frozen=True)
class Config:
    boot: BootConfig = field(default_factory=BootConfig)
