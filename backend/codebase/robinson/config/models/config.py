from dataclasses import dataclass

from boot_config import BootConfig


@dataclass(frozen=True)
class Config():
    boot: BootConfig = BootConfig()
