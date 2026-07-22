PRODUCT_PAYLOAD = {
    "category": "TMG",
    "name_ru": "Тест",
    "name_uz": "Test",
    "name_en": "Test",
    "image": "",
    "pdf": "",
    "specs": {"power": {"ru": "1 кВА", "uz": "1 kVA", "en": "1 kVA"}},
}


def test_create_requires_auth(client):
    r = client.post("/products/", json=PRODUCT_PAYLOAD)
    assert r.status_code == 401


def test_update_requires_auth(client):
    r = client.put("/products/1", json=PRODUCT_PAYLOAD)
    assert r.status_code == 401


def test_delete_requires_auth(client):
    r = client.delete("/products/1")
    assert r.status_code == 401


def test_full_crud_cycle(client, auth_token):
    headers = {"Authorization": f"Bearer {auth_token}"}

    r = client.post("/products/", json=PRODUCT_PAYLOAD, headers=headers)
    assert r.status_code == 200
    product = r.json()
    product_id = product["id"]
    assert product["name_ru"] == "Тест"

    r = client.get("/products/")
    assert r.status_code == 200
    assert any(p["id"] == product_id for p in r.json())

    updated_payload = {**PRODUCT_PAYLOAD, "name_ru": "Обновлено"}
    r = client.put(f"/products/{product_id}", json=updated_payload, headers=headers)
    assert r.status_code == 200
    assert r.json()["name_ru"] == "Обновлено"

    r = client.delete(f"/products/{product_id}", headers=headers)
    assert r.status_code == 200
    assert r.json() == {"ok": True}

    r = client.delete(f"/products/{product_id}", headers=headers)
    assert r.status_code == 404


def test_update_nonexistent_returns_404(client, auth_token):
    headers = {"Authorization": f"Bearer {auth_token}"}
    r = client.put("/products/999999", json=PRODUCT_PAYLOAD, headers=headers)
    assert r.status_code == 404
