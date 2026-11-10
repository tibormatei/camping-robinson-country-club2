import pytest
from fastapi import status
from fastapi.testclient import TestClient


class TestTrailers:
    @pytest.mark.parametrize("trailers_expected_fields", [{"trailers"},])
    def test_trailers_fields(self, client: TestClient, trailers_expected_fields: set[str]) -> None:
        response = client.get("/api/rental/trailer")

        assert response.status_code == status.HTTP_200_OK
        data = response.json()
        assert data.keys() == trailers_expected_fields

    @pytest.mark.parametrize("trailers_field, trailers_field_expected_type", [
        pytest.param("trailers", list),
    ])
    def test_trailers_fields_types(self, client: TestClient, trailers_field: str, trailers_field_expected_type: type) -> None:
        response = client.get("/api/rental/trailer")

        assert response.status_code == status.HTTP_200_OK
        data = response.json()
        assert isinstance(data[trailers_field], trailers_field_expected_type)
        if trailers_field_expected_type is int:
            assert not isinstance(data[trailers_field], bool)
