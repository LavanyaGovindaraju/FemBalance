import subprocess
import os
import sys

def run_command(cmd_list, cwd):
    return subprocess.Popen(cmd_list, cwd=cwd, shell=True)

def main():
    root_dir = os.path.dirname(os.path.abspath(__file__))
    print(root_dir)
    frontend_dir = os.path.join(root_dir, "frontend")
    backend_dir = os.path.join(root_dir, "backend")

    if not os.path.isdir(frontend_dir) or not os.path.isdir(backend_dir):
        print("Error: 'frontend' or 'backend' directory not found.")
        sys.exit(1)

    os.environ["NODE_OPTIONS"] = "--openssl-legacy-provider"

    try:
        print("Installing frontend dependencies...")
        subprocess.check_call(["npm", "install"], cwd=frontend_dir, shell=True)

        print("Starting frontend...")
        frontend_proc = run_command(["npm", "start"], cwd=frontend_dir)

        print("Starting backend...")
        backend_proc = run_command(["uvicorn", "main:app", "--reload"], cwd=backend_dir)

        print("Both frontend and backend are running. Press Ctrl+C to stop.")
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
