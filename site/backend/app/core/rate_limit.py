from slowapi import Limiter
from slowapi.util import get_remote_address

# По умолчанию 200 запросов в минуту с одного IP на весь API.
# Отдельные эндпоинты (например /auth/login) могут иметь свой, более строгий лимит.
limiter = Limiter(key_func=get_remote_address, default_limits=["200/minute"])
