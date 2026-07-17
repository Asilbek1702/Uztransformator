import os
import sys
from pathlib import Path

backend_dir = Path(r"C:\Users\energomax media\Desktop\Web site v2\site\backend")
os.chdir(backend_dir)
sys.path.insert(0, str(backend_dir))

import importlib
import uvicorn

main_module = importlib.import_module("main")

if __name__ == "__main__":
    uvicorn.run(main_module.app, host="127.0.0.1", port=8000, reload=False)
