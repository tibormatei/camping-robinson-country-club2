import pytest
from fastapi import status
from fastapi.testclient import TestClient


class TestDog:
    @pytest.mark.parametrize("dog_expected_fields", [{"lei_price_per_night", "eur_price_per_night"},])
    def test_dog_fields(self, client: TestClient, dog_expected_fields: set[str]) -> None:
        response = client.get("/api/rental/dog")

        assert response.status_code == status.HTTP_200_OK
        data = response.json()
        assert data.keys() == dog_expected_fields

    @pytest.mark.parametrize("dog_field, dog_field_expected_type", [
        pytest.param("lei_price_per_night", int),
        pytest.param("eur_price_per_night", int),
    ])
    def test_dog_fields_types(self, client: TestClient, dog_field: str, dog_field_expected_type: type) -> None:
        response = client.get("/api/rental/dog")

        assert response.status_code == status.HTTP_200_OK
        data = response.json()
        assert isinstance(data[dog_field], dog_field_expected_type)
