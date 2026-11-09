import pytest
from fastapi import status
from fastapi.testclient import TestClient

from robinson.api.api_main import app


@pytest.fixture(scope="session")
def client() -> TestClient:
    return TestClient(app)


class TestHealth:
    def test_health_returns_ok(self, client: TestClient) -> None:
        response = client.get("/api/health")

        assert response.status_code == status.HTTP_200_OK
        data = response.json()
        assert data["status"] == "ok"

    def test_health_without_prefix(self, client: TestClient) -> None:
        response = client.get("/health")
        assert response.status_code == status.HTTP_404_NOT_FOUND
