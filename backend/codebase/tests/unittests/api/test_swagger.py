import pytest
from collections.abc import Iterator
from fastapi import status
from fastapi.testclient import TestClient

from robinson.api.api_main import create_app
from robinson.config.loader import get_config


class TestSwagger:
    @pytest.fixture(name="client_no_swagger")
    def client_disabled_swagger(self, monkeypatch: pytest.MonkeyPatch) -> Iterator[TestClient]:
        monkeypatch.setenv("APP_ENABLE_SWAGGER", "false")
        get_config.cache_clear()
        yield TestClient(create_app())
        get_config.cache_clear()

    @pytest.fixture(name="client_swagger")
    def client_enabled_swagger(self, monkeypatch: pytest.MonkeyPatch) -> Iterator[TestClient]:
        monkeypatch.setenv("APP_ENABLE_SWAGGER", "true")
        get_config.cache_clear()
        yield TestClient(create_app())
        get_config.cache_clear()

    @pytest.mark.parametrize("path", ["/api/docs", "/api/openapi.json"])
    def test_no_docs_when_swagger_disabled(self, client_no_swagger: TestClient, path: str) -> None:
        assert client_no_swagger.get(path).status_code == status.HTTP_404_NOT_FOUND

    @pytest.mark.parametrize("path", ["/api/docs", "/api/openapi.json"])
    def test_docs_page_when_swagger_enabled(self, client_swagger: TestClient, path: str) -> None:
        assert client_swagger.get(path).status_code == status.HTTP_200_OK
