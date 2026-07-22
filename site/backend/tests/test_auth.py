def test_login_wrong_password(client, admin_user):
    r = client.post("/auth/login", json={"username": admin_user["username"], "password": "wrong"})
    assert r.status_code == 401


def test_login_unknown_user(client):
    r = client.post("/auth/login", json={"username": "nope", "password": "whatever"})
    assert r.status_code == 401


def test_login_success(client, admin_user):
    r = client.post("/auth/login", json=admin_user)
    assert r.status_code == 200
    body = r.json()
    assert "access_token" in body
    assert body["token_type"] == "bearer"


def test_login_rate_limit(client, admin_user):
    for _ in range(5):
        client.post(
            "/auth/login",
            json={"username": admin_user["username"], "password": "wrong"},
        )
    r = client.post(
        "/auth/login",
        json={"username": admin_user["username"], "password": "wrong"},
    )
    assert r.status_code == 429
