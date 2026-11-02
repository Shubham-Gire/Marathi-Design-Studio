"""
Launcher for myjuice.in SEO Agent & Backlink Management Dashboard
"""

import sys
import os

CURRENT_DIR = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, CURRENT_DIR)

from models import init_db
from seed_data import seed
from app import run_server, PORT

def main():
    print("=" * 65)
    print("🍹 myjuice.in · AI-Powered Off-Page SEO & Backlink Management Agent")
    print(f"Target: Navnath Raswanti Gruha, Chhatrapati Sambhajinagar")
    print(f"Status: Database initialized & verified")
    print(f"Web Dashboard URL: http://127.0.0.1:{PORT}")
    print("=" * 65)
    init_db()
    seed()
    try:
        run_server(PORT)
    except KeyboardInterrupt:
        print("\nSEO Dashboard stopped cleanly.")

if __name__ == '__main__':
    main()
