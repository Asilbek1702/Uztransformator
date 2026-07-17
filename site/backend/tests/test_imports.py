import importlib
import sys
from pathlib import Path

BACKEND_DIR = Path(__file__).resolve().parents[1]
if str(BACKEND_DIR) not in sys.path:
    sys.path.insert(0, str(BACKEND_DIR))


def test_main_imports_without_sqlalchemy_table_conflict():
    sys.modules.pop("main", None)
    sys.modules.pop("routers.auth", None)
    sys.modules.pop("routers.products", None)
    sys.modules.pop("crud", None)
    import main

    assert main.app is not None
