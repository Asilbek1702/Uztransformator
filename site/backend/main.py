import sys
from pathlib import Path

from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from slowapi import _rate_limit_exceeded_handler
from slowapi.errors import RateLimitExceeded
from slowapi.middleware import SlowAPIMiddleware

backend_dir = Path(__file__).resolve().parent
if str(backend_dir) not in sys.path:
    sys.path.insert(0, str(backend_dir))

from app.core.config import get_settings  # noqa: E402
from app.core.logging import setup_logging  # noqa: E402
from app.core.rate_limit import limiter  # noqa: E402
from app.database import Base, engine  # noqa: E402
from app.middlewares.request_logging import RequestLoggingMiddleware  # noqa: E402
from app.middlewares.security_headers import SecurityHeadersMiddleware  # noqa: E402
from routers import auth as auth_router  # noqa: E402
from routers import products as products_router  # noqa: E402

logger = setup_logging()
settings = get_settings()

Base.metadata.create_all(bind=engine)

app = FastAPI(title="Uztransformator API")

app.state.limiter = limiter
app.add_exception_handler(RateLimitExceeded, _rate_limit_exceeded_handler)
app.add_middleware(SlowAPIMiddleware)
app.add_middleware(SecurityHeadersMiddleware)
app.add_middleware(RequestLoggingMiddleware)
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.origins_list,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth_router.router)
app.include_router(products_router.router)


@app.exception_handler(Exception)
async def unhandled_exception_handler(request: Request, exc: Exception):
    logger.exception("Необработанная ошибка на %s", request.url.path)
    return JSONResponse(status_code=500, content={"detail": "Внутренняя ошибка сервера"})


@app.get("/")
def root():
    return {"status": "ok", "service": "Uztransformator API"}


@app.get("/health")
def health():
    return {"status": "healthy"}
