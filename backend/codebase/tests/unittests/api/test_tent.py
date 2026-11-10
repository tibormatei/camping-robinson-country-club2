from typing import get_origin, get_args

import pytest
from fastapi import status
from fastapi.testclient import TestClient


class TestTent:
    @pytest.mark.parametrize("tent_expected_fields", [{"tent_capacities", "lei_price_per_person", "eur_price_per_person"},])
    def test_tent_fields(self, client: TestClient, tent_expected_fields: set[str]) -> None:
        response = client.get("/api/rental/tent")

        assert response.status_code == status.HTTP_200_OK
        data = response.json()
        assert data.keys() == tent_expected_fields

    @pytest.mark.parametrize("tent_field, tent_field_expected_type", [
        pytest.param("tent_capacities", list[str]),
        pytest.param("lei_price_per_person", int),
        pytest.param("eur_price_per_person", int),
    ])
    def test_tent_fields_types(self, client: TestClient, tent_field: str, tent_field_expected_type: type) -> None:
        response = client.get("/api/rental/tent")

        assert response.status_code == status.HTTP_200_OK
        data = response.json()
        origin_type = get_origin(tent_field_expected_type)
        if origin_type is None:
            assert isinstance(data[tent_field], tent_field_expected_type)
            if tent_field_expected_type is int:
                assert not isinstance(data[tent_field], bool)
        else:
            (item_type,) = get_args(tent_field_expected_type)
            assert all(isinstance(item, item_type) for item in data[tent_field])
