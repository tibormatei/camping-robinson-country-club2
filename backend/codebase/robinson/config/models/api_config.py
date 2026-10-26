from dataclasses import dataclass


@dataclass(frozen=True)
class ApiConfig():
    host: str = "0.0.0.0"
    port: int = 4000
    root: str = ""
    threads: int = 12
