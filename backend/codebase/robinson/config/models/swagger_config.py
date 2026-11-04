from dataclasses import dataclass, field


@dataclass(frozen=True)
class SwaggerConfig:
    """
    The Swagger UI (interactive API documentation) is disabled by default, only the development environment turns it on.
    """
    enabled: bool = False
    template: str = ""
    params: dict[str, str] = field(default_factory=dict)
