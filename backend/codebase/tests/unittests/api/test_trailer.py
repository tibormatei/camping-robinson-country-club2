import pytest
from fastapi import status
from fastapi.testclient import TestClient


class TestTrailer:
    @pytest.mark.parametrize("trailer_expected_fields", [{"trailer_capacity", "lei_price", "eur_price"},])
    def test_trailer_fields(self, client: TestClient, trailer_expected_fields: set[str]) -> None:
        response = client.get("/api/rental/trailer")

        assert response.status_code == status.HTTP_200_OK
        data = response.json()["trailers"][0]
        assert data.keys() == trailer_expected_fields

    @pytest.mark.parametrize("trailer_field, trailer_field_expected_type", [
        pytest.param("trailer_capacity", str),
        pytest.param("lei_price", int),
        pytest.param("eur_price", int),
    ])
    def test_trailer_fields_types(self, client: TestClient, trailer_field: str, trailer_field_expected_type: type) -> None:
        response = client.get("/api/rental/trailer")

        assert response.status_code == status.HTTP_200_OK
        data = response.json()["trailers"][0]
        assert isinstance(data[trailer_field], trailer_field_expected_type)
