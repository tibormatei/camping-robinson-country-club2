import pytest
from fastapi.testclient import TestClient

from robinson.api.api_main import app


@pytest.fixture(scope="session")
def client() -> TestClient:
    return TestClient(app)
