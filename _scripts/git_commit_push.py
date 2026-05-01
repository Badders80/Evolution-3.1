import subprocess
import sys
from datetime import datetime

def run_command(command):
    """Run a shell command and return the result."""
    try:
        result = subprocess.run(
            command,
            shell=True,
            check=True,
            capture_output=True,
            text=True
        )
        return result.stdout.strip()
    except subprocess.CalledProcessError as e:
        print(f"Error: {e.stderr}")
        return None

def git_commit_and_push(commit_message=None):
    """Commit and push changes to the repository."""
    
    # Check for changes
    status = run_command("git status --porcelain")
    if not status:
        print("No changes to commit.")
        return
    
    # Add all changes
    print("Adding all changes...")
    if run_command("git add .") is None:
        return
    
    # Create commit message
    if not commit_message:
        commit_message = f"Auto-commit: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}"
    
    # Commit changes
    print(f"Committing changes: {commit_message}")
    if run_command(f'git commit -m "{commit_message}"') is None:
        return
    
    # Push to remote
    print("Pushing to remote repository...")
    if run_command("git push") is None:
        return
    
    print("Successfully committed and pushed changes!")

if __name__ == "__main__":
    message = " ".join(sys.argv[1:]) if len(sys.argv) > 1 else None
    git_commit_and_push(message)
