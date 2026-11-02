"""
SEO Agent Database Layer for myjuice.in
Uses SQLite standard library for zero-dependency persistence, audit logging,
prospect tracking, quality scoring, and acquired backlink verification.
"""

import sqlite3
import os
import json
from datetime import datetime
from typing import List, Dict, Any, Optional

DB_PATH = os.path.join(os.path.dirname(os.path.abspath(__file__)), "seo_agent.db")

def get_connection(db_path: str = DB_PATH) -> sqlite3.Connection:
    conn = sqlite3.connect(db_path)
    conn.row_factory = sqlite3.Row
    return conn

def init_db(db_path: str = DB_PATH):
    """Initialize database tables with full constraints and indexes."""
    with get_connection(db_path) as conn:
        cursor = conn.cursor()
        
        # Prospects table
        cursor.execute("""
        CREATE TABLE IF NOT EXISTS prospects (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            domain TEXT NOT NULL,
            url TEXT NOT NULL,
            title TEXT,
            category TEXT NOT NULL, -- local_directory, food_blog, regional_media, tourism_guide, b2b_partner
            link_type TEXT NOT NULL, -- directory_citation, editorial, partner, guest_article, sponsored
            relevance_score INTEGER DEFAULT 0, -- 0-25
            audience_score INTEGER DEFAULT 0,  -- 0-25
            legitimacy_score INTEGER DEFAULT 0, -- 0-20
            editorial_score INTEGER DEFAULT 0,  -- 0-15
            spam_penalty INTEGER DEFAULT 0,     -- 0-50
            total_score INTEGER DEFAULT 0,      -- 0-100
            spam_risk TEXT DEFAULT 'Low',       -- Low, Medium, High, Extreme
            status TEXT DEFAULT 'discovered',   -- discovered, approved, rejected, outreach_drafted, outreach_sent, acquired, lost
            contact_name TEXT,
            contact_email TEXT,
            contact_url TEXT,
            target_page TEXT DEFAULT 'https://myjuice.in/',
            outreach_angle TEXT,
            outreach_draft_subject TEXT,
            outreach_draft_body TEXT,
            human_approved INTEGER DEFAULT 0,   -- 0: pending, 1: approved, -1: rejected
            follow_up_date TEXT,
            notes TEXT,
            created_at TEXT NOT NULL,
            updated_at TEXT NOT NULL
        )
        """)

        # Acquired / Monitored Backlinks table
        cursor.execute("""
        CREATE TABLE IF NOT EXISTS backlinks (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            prospect_id INTEGER REFERENCES prospects(id),
            source_url TEXT NOT NULL,
            target_url TEXT NOT NULL DEFAULT 'https://myjuice.in/',
            anchor_text TEXT,
            link_type TEXT, -- follow, nofollow, sponsored, ugc
            http_status INTEGER,
            link_status TEXT DEFAULT 'unknown', -- active, lost, redirected, nofollow, sponsored, unknown
            redirect_target TEXT,
            first_seen_at TEXT NOT NULL,
            last_checked_at TEXT NOT NULL,
            is_verified INTEGER DEFAULT 0
        )
        """)

        # Audit Log table for operating rule compliance
        cursor.execute("""
        CREATE TABLE IF NOT EXISTS audit_logs (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            timestamp TEXT NOT NULL,
            action TEXT NOT NULL,
            entity_type TEXT NOT NULL,
            entity_id INTEGER,
            details TEXT,
            requires_human_approval INTEGER DEFAULT 0,
            approved_by_human INTEGER DEFAULT 0
        )
        """)

        # Monthly / Periodic Reports snapshot table
        cursor.execute("""
        CREATE TABLE IF NOT EXISTS reports (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            period_start TEXT NOT NULL,
            period_end TEXT NOT NULL,
            total_prospects INTEGER,
            approved_prospects INTEGER,
            outreach_drafted INTEGER,
            outreach_sent INTEGER,
            active_backlinks INTEGER,
            lost_backlinks INTEGER,
            average_score REAL,
            summary_markdown TEXT,
            created_at TEXT NOT NULL
        )
        """)

        conn.commit()

def log_action(action: str, entity_type: str, entity_id: Optional[int] = None, 
               details: str = "", requires_approval: int = 0, db_path: str = DB_PATH):
    """Enforce strict audit logging for every automated or manual SEO action."""
    with get_connection(db_path) as conn:
        cursor = conn.cursor()
        now = datetime.now().isoformat()
        cursor.execute("""
            INSERT INTO audit_logs (timestamp, action, entity_type, entity_id, details, requires_human_approval)
            VALUES (?, ?, ?, ?, ?, ?)
        """, (now, action, entity_type, entity_id, details, requires_approval))
        conn.commit()
