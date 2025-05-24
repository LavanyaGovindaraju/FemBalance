import subprocess
import os
import sys
import time

def run_command(cmd_list, cwd):
    return subprocess.Popen(cmd_list, cwd=cwd, shell=False)

def main():
    root_dir = os.path.dirname(os.path.abspath(__file__))
    frontend_dir = os.path.join(root_dir, "frontend")
    backend_dir = os.path.join(root_dir, "backend")

    if not os.path.isdir(frontend_dir) or not os.path.isdir(backend_dir):
        print("Error: 'frontend' or 'backend' directory not found.")
        sys.exit(1)

    try:
        # Start backend first
        print("Starting backend (FastAPI)...")
        backend_proc = run_command(["uvicorn", "main:app", "--reload"], cwd=backend_dir)

        # Wait a few seconds to ensure backend is up
        time.sleep(3)

        # Start frontend
        print("Starting frontend (React)...")
        frontend_proc = run_command(["npm.cmd", "start"], cwd=frontend_dir)

        print("App is running. Press Ctrl+C to stop.")
        frontend_proc.wait()
        backend_proc.wait()

    except KeyboardInterrupt:
        print("\nShutting down...")
        frontend_proc.terminate()
        backend_proc.terminate()
        sys.exit(0)

    except subprocess.CalledProcessError as e:
        print(f"Command failed: {e}")
        sys.exit(1)

if __name__ == "__main__":
    main()
