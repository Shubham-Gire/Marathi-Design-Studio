"""
Lightweight Web Dashboard and REST API Server for myjuice.in SEO Agent.
Zero external dependencies - runs on Python standard library (http.server + sqlite3).
Provides prospect management, scoring inspection, approval workflow, outreach drafts,
live backlink verification, audit logs, and CSV export.
"""

import http.server
import socketserver
import json
import urllib.parse
import os
import sys
from datetime import datetime

# Add current directory to path
CURRENT_DIR = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, CURRENT_DIR)

from models import get_connection, log_action, DB_PATH
from verifier import verify_backlink
from reporter import export_prospects_to_csv, generate_monthly_report

PORT = 8550

HTML_DASHBOARD = """<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>myjuice.in · AI Backlink Management & SEO Agent</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600&display=swap" rel="stylesheet">
  <style>
    :root {
      --bg-canvas: #f8faf6;
      --bg-card: #ffffff;
      --border-subtle: #e2e8e0;
      --border-focus: #2d6a4f;
      --primary: #1b4332;
      --primary-light: #2d6a4f;
      --primary-accent: #40916c;
      --citrus: #d97706;
      --citrus-soft: #fef3c7;
      --emerald-soft: #d1fae5;
      --rose-soft: #ffe4e6;
      --rose: #e11d48;
      --text-main: #132a13;
      --text-muted: #52796f;
      --text-dim: #748c82;
      --radius-sm: 8px;
      --radius-md: 12px;
      --radius-lg: 16px;
      --shadow-sm: 0 1px 3px rgba(0,0,0,0.05);
      --shadow-md: 0 4px 12px rgba(19,42,19,0.08);
      --shadow-lg: 0 12px 24px -4px rgba(19,42,19,0.12);
    }
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      font-family: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, sans-serif;
      background: var(--bg-canvas);
      color: var(--text-main);
      line-height: 1.5;
      padding-bottom: 60px;
    }
    header {
      background: linear-gradient(135deg, #1b4332 0%, #081c15 100%);
      color: #fff;
      padding: 24px 36px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      box-shadow: var(--shadow-md);
    }
    .brand-title {
      font-size: 22px;
      font-weight: 800;
      display: flex;
      align-items: center;
      gap: 12px;
      letter-spacing: -0.02em;
    }
    .brand-badge {
      font-size: 11px;
      background: rgba(255,255,255,0.15);
      padding: 4px 10px;
      border-radius: 999px;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      font-weight: 700;
      color: #b7e4c7;
    }
    .brand-sub {
      font-size: 13px;
      color: #95d5b2;
      margin-top: 4px;
    }
    .header-actions {
      display: flex;
      gap: 12px;
    }
    .btn {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      font-size: 13px;
      font-weight: 600;
      padding: 8px 16px;
      border-radius: var(--radius-sm);
      border: 1px solid transparent;
      cursor: pointer;
      transition: all 0.15s ease;
      text-decoration: none;
      font-family: inherit;
    }
    .btn-primary {
      background: #52b788;
      color: #081c15;
    }
    .btn-primary:hover { background: #74c69d; }
    .btn-secondary {
      background: rgba(255,255,255,0.12);
      color: #fff;
      border-color: rgba(255,255,255,0.2);
    }
    .btn-secondary:hover { background: rgba(255,255,255,0.2); }
    .btn-approve { background: #2d6a4f; color: #fff; }
    .btn-approve:hover { background: #1b4332; }
    .btn-reject { background: #fff; color: var(--rose); border: 1px solid var(--rose); }
    .btn-reject:hover { background: var(--rose-soft); }

    .container {
      max-width: 1400px;
      margin: 0 auto;
      padding: 28px 24px;
    }

    /* KPI STATS */
    .kpi-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(210px, 1fr));
      gap: 16px;
      margin-bottom: 28px;
    }
    .kpi-card {
      background: var(--bg-card);
      border: 1px solid var(--border-subtle);
      border-radius: var(--radius-md);
      padding: 20px;
      box-shadow: var(--shadow-sm);
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }
    .kpi-label {
      font-size: 12px;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      color: var(--text-muted);
    }
    .kpi-value {
      font-size: 32px;
      font-weight: 800;
      color: var(--primary);
      margin: 6px 0 2px 0;
      letter-spacing: -0.02em;
    }
    .kpi-caption {
      font-size: 12px;
      color: var(--text-dim);
    }

    /* TABS */
    .tabs-nav {
      display: flex;
      gap: 8px;
      border-bottom: 1px solid var(--border-subtle);
      margin-bottom: 20px;
    }
    .tab-btn {
      padding: 10px 18px;
      font-weight: 600;
      font-size: 14px;
      color: var(--text-muted);
      background: none;
      border: none;
      cursor: pointer;
      border-bottom: 2px solid transparent;
      margin-bottom: -1px;
    }
    .tab-btn.active {
      color: var(--primary);
      border-color: var(--primary);
    }

    /* FILTER BAR */
    .filter-bar {
      background: var(--bg-card);
      border: 1px solid var(--border-subtle);
      border-radius: var(--radius-md);
      padding: 16px;
      display: flex;
      flex-wrap: wrap;
      gap: 14px;
      align-items: center;
      margin-bottom: 20px;
    }
    .filter-group {
      display: flex;
      align-items: center;
      gap: 8px;
    }
    .filter-label {
      font-size: 12px;
      font-weight: 600;
      color: var(--text-muted);
    }
    .input-control {
      font-family: inherit;
      font-size: 13px;
      padding: 8px 12px;
      border: 1px solid var(--border-subtle);
      border-radius: var(--radius-sm);
      outline: none;
      background: var(--bg-canvas);
      color: var(--text-main);
    }
    .input-control:focus {
      border-color: var(--primary-accent);
      background: #fff;
    }
    .search-input {
      min-width: 260px;
      flex: 1;
    }

    /* TABLE */
    .table-container {
      background: var(--bg-card);
      border: 1px solid var(--border-subtle);
      border-radius: var(--radius-md);
      overflow-x: auto;
      box-shadow: var(--shadow-sm);
    }
    table {
      width: 100%;
      border-collapse: collapse;
      text-align: left;
      font-size: 13px;
    }
    th {
      background: #f1f5ee;
      color: var(--text-muted);
      font-weight: 700;
      padding: 12px 16px;
      font-size: 11px;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      border-bottom: 1px solid var(--border-subtle);
    }
    td {
      padding: 14px 16px;
      border-bottom: 1px solid var(--border-subtle);
      vertical-align: middle;
    }
    tr:last-child td { border-bottom: none; }
    tr:hover td { background: #fafcf8; }

    /* BADGES */
    .badge {
      display: inline-flex;
      align-items: center;
      padding: 3px 8px;
      border-radius: 6px;
      font-size: 11px;
      font-weight: 700;
      text-transform: capitalize;
    }
    .badge-score {
      font-family: 'JetBrains Mono', monospace;
      font-weight: 700;
      padding: 4px 8px;
      border-radius: 6px;
      font-size: 12px;
    }
    .score-high { background: #d8f3dc; color: #1b4332; }
    .score-med { background: #fef3c7; color: #92400e; }
    .score-low { background: #fee2e2; color: #991b1b; }

    .badge-approved { background: var(--emerald-soft); color: #065f46; }
    .badge-pending { background: var(--citrus-soft); color: #b45309; }
    .badge-rejected { background: var(--rose-soft); color: #9f1239; }

    .domain-link {
      font-weight: 700;
      color: var(--primary);
      text-decoration: none;
    }
    .domain-link:hover { text-decoration: underline; }

    /* DRAWER / MODAL */
    .modal-backdrop {
      display: none;
      position: fixed;
      inset: 0;
      background: rgba(0,0,0,0.5);
      z-index: 100;
      backdrop-filter: blur(2px);
      align-items: center;
      justify-content: center;
    }
    .modal-backdrop.open { display: flex; }
    .modal {
      background: #fff;
      border-radius: var(--radius-lg);
      max-width: 820px;
      width: 90%;
      max-height: 90vh;
      overflow-y: auto;
      box-shadow: var(--shadow-lg);
      padding: 28px;
      position: relative;
    }
    .modal-close {
      position: absolute;
      top: 20px;
      right: 20px;
      background: none;
      border: none;
      font-size: 22px;
      cursor: pointer;
      color: var(--text-dim);
    }
    .modal-title {
      font-size: 20px;
      font-weight: 800;
      color: var(--primary);
      margin-bottom: 4px;
    }
    .modal-sub {
      font-size: 13px;
      color: var(--text-muted);
      margin-bottom: 20px;
    }
    .score-breakdown-box {
      background: var(--bg-canvas);
      border: 1px solid var(--border-subtle);
      border-radius: var(--radius-sm);
      padding: 16px;
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
      gap: 12px;
      margin-bottom: 20px;
    }
    .sb-item {
      display: flex;
      flex-direction: column;
    }
    .sb-title { font-size: 11px; text-transform: uppercase; color: var(--text-muted); font-weight: 700; }
    .sb-val { font-size: 18px; font-weight: 800; font-family: 'JetBrains Mono', monospace; color: var(--primary); }

    .draft-box {
      background: #f8fafc;
      border: 1px solid #cbd5e1;
      border-radius: var(--radius-sm);
      padding: 16px;
      font-family: 'JetBrains Mono', monospace;
      font-size: 12px;
      white-space: pre-wrap;
      line-height: 1.6;
      color: #1e293b;
      margin-bottom: 20px;
      max-height: 320px;
      overflow-y: auto;
    }
    .compliance-alert {
      background: #fef2f2;
      border-left: 4px solid #ef4444;
      padding: 12px 16px;
      border-radius: 4px;
      font-size: 12px;
      color: #991b1b;
      font-weight: 600;
      margin-bottom: 20px;
    }

    /* TOAST */
    .toast {
      position: fixed;
      bottom: 24px;
      right: 24px;
      background: #1b4332;
      color: #fff;
      padding: 12px 20px;
      border-radius: var(--radius-sm);
      font-size: 13px;
      font-weight: 600;
      box-shadow: var(--shadow-lg);
      transform: translateY(100px);
      transition: transform 0.25s ease;
      z-index: 1000;
    }
    .toast.show { transform: translateY(0); }
  </style>
</head>
<body>

  <header>
    <div>
      <div class="brand-title">
        <span>🍹 myjuice.in</span>
        <span class="brand-badge">Off-Page SEO Agent</span>
      </div>
      <div class="brand-sub">Navnath Raswanti Gruha · Chhatrapati Sambhajinagar · Backlink Opportunity & Authority Hub</div>
    </div>
    <div class="header-actions">
      <a href="/api/export" class="btn btn-secondary">📥 Export CSV</a>
      <button onclick="openVerifierModal()" class="btn btn-primary">🔍 Verify Live Link</button>
    </div>
  </header>

  <div class="container">

    <!-- KPI CARDS -->
    <div class="kpi-grid">
      <div class="kpi-card">
        <div class="kpi-label">Discovered Prospects</div>
        <div class="kpi-value" id="kpi-total">50</div>
        <div class="kpi-caption">Verified Indian & regional sources</div>
      </div>
      <div class="kpi-card">
        <div class="kpi-label">Algorithm Pre-Approved</div>
        <div class="kpi-value" id="kpi-preapproved" style="color: #2d6a4f;">-</div>
        <div class="kpi-caption">Score ≥ 65 &amp; Low spam risk</div>
      </div>
      <div class="kpi-card">
        <div class="kpi-label">Human Approved</div>
        <div class="kpi-value" id="kpi-human">-</div>
        <div class="kpi-caption">Strict authorization required</div>
      </div>
      <div class="kpi-card">
        <div class="kpi-label">Active Backlinks</div>
        <div class="kpi-value" id="kpi-active" style="color: #0284c7;">0</div>
        <div class="kpi-caption">Baseline verified referring links</div>
      </div>
      <div class="kpi-card">
        <div class="kpi-label">Avg Opportunity Score</div>
        <div class="kpi-value" id="kpi-avg">-</div>
        <div class="kpi-caption">Transparent rubric (0-100)</div>
      </div>
    </div>

    <!-- TABS -->
    <div class="tabs-nav">
      <button class="tab-btn active" onclick="switchTab('prospects')">Prospect Discovery (50)</button>
      <button class="tab-btn" onclick="switchTab('backlinks')">Monitored Backlinks</button>
      <button class="tab-btn" onclick="switchTab('audit')">Safety &amp; Audit Logs</button>
      <button class="tab-btn" onclick="switchTab('report')">Executive Monthly Report</button>
    </div>

    <!-- PROSPECTS VIEW -->
    <div id="view-prospects">
      <div class="filter-bar">
        <input type="text" id="filter-search" class="input-control search-input" placeholder="Search domain, title, or keywords..." oninput="fetchProspects()">
        
        <div class="filter-group">
          <span class="filter-label">Category:</span>
          <select id="filter-category" class="input-control" onchange="fetchProspects()">
            <option value="">All Categories</option>
            <option value="local_directory">Local Directory &amp; Citations</option>
            <option value="food_beverage_blog">Food &amp; Beverage Blog</option>
            <option value="regional_media">Regional News &amp; Media</option>
            <option value="travel_tourism">Travel &amp; Tourism</option>
            <option value="b2b_directory">B2B &amp; Event Catering</option>
          </select>
        </div>

        <div class="filter-group">
          <span class="filter-label">Status:</span>
          <select id="filter-status" class="input-control" onchange="fetchProspects()">
            <option value="">All Statuses</option>
            <option value="approved">Pre-Approved</option>
            <option value="needs_review">Needs Review</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>

        <div class="filter-group">
          <span class="filter-label">Sign-Off:</span>
          <select id="filter-signoff" class="input-control" onchange="fetchProspects()">
            <option value="">All Sign-Offs</option>
            <option value="1">Human Approved</option>
            <option value="0">Pending Approval</option>
            <option value="-1">Human Rejected</option>
          </select>
        </div>
      </div>

      <div class="table-container">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Opportunity / Platform</th>
              <th>Category</th>
              <th>Link Type</th>
              <th>Score</th>
              <th>Spam Risk</th>
              <th>Approval Gate</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody id="prospects-tbody">
            <tr><td colspan="8" style="text-align: center; padding: 40px; color: var(--text-muted);">Loading prospects database...</td></tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- BACKLINKS VIEW -->
    <div id="view-backlinks" style="display:none;">
      <div class="table-container">
        <table>
          <thead>
            <tr>
              <th>Source URL</th>
              <th>Target URL</th>
              <th>Anchor Text</th>
              <th>Rel Type</th>
              <th>HTTP Code</th>
              <th>Status</th>
              <th>Last Checked</th>
            </tr>
          </thead>
          <tbody id="backlinks-tbody">
            <tr><td colspan="7" style="text-align: center; padding: 40px; color: var(--text-muted);">No backlinks monitored yet. Use 'Verify Live Link' to inspect.</td></tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- AUDIT VIEW -->
    <div id="view-audit" style="display:none;">
      <div class="table-container">
        <table>
          <thead>
            <tr>
              <th>Timestamp</th>
              <th>Action Executed</th>
              <th>Entity</th>
              <th>Details &amp; Reason</th>
              <th>Requires Approval</th>
            </tr>
          </thead>
          <tbody id="audit-tbody">
            <tr><td colspan="5" style="text-align: center; padding: 40px; color: var(--text-muted);">Loading audit logs...</td></tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- REPORT VIEW -->
    <div id="view-report" style="display:none;">
      <div style="background: #fff; padding: 32px; border-radius: var(--radius-md); border: 1px solid var(--border-subtle);">
        <pre id="report-pre" style="white-space: pre-wrap; font-family: 'Plus Jakarta Sans', sans-serif; font-size: 14px; line-height: 1.7;"></pre>
      </div>
    </div>

  </div>

  <!-- DETAIL & OUTREACH MODAL -->
  <div class="modal-backdrop" id="prospectModal">
    <div class="modal">
      <button class="modal-close" onclick="closeProspectModal()">&times;</button>
      <div class="modal-title" id="m-domain">Domain Name</div>
      <div class="modal-sub" id="m-title">Title and URL</div>

      <div class="compliance-alert">
        ⚠️ <strong>STRICT OPERATING RULE:</strong> Outreach draft is generated for human review only. Never send emails, submit forms, or purchase placements without explicit approval.
      </div>

      <div class="score-breakdown-box">
        <div class="sb-item">
          <div class="sb-title">Total Quality</div>
          <div class="sb-val" id="m-score">85/100</div>
        </div>
        <div class="sb-item">
          <div class="sb-title">Topical Fit</div>
          <div class="sb-val" id="m-relevance">25/25</div>
        </div>
        <div class="sb-item">
          <div class="sb-title">Real Audience</div>
          <div class="sb-val" id="m-audience">20/25</div>
        </div>
        <div class="sb-item">
          <div class="sb-title">Legitimacy</div>
          <div class="sb-val" id="m-legitimacy">20/20</div>
        </div>
        <div class="sb-item">
          <div class="sb-title">Spam Penalty</div>
          <div class="sb-val" id="m-penalty" style="color: #dc2626;">-0</div>
        </div>
      </div>

      <div style="margin-bottom: 16px;">
        <strong>Strategic Outreach Angle:</strong>
        <p id="m-angle" style="font-size: 13px; color: var(--text-muted); margin-top: 4px;"></p>
      </div>

      <div style="margin-bottom: 16px;">
        <strong>Target Destination Page on myjuice.in:</strong>
        <p id="m-target" style="font-size: 13px; color: var(--primary); font-family: 'JetBrains Mono', monospace; margin-top: 4px;"></p>
      </div>

      <div style="margin-bottom: 16px;">
        <strong>Personalized Outreach Message Draft:</strong>
        <div style="margin-top: 6px;" class="draft-box" id="m-draft"></div>
      </div>

      <div style="display: flex; gap: 12px; align-items: center; justify-content: flex-end; border-top: 1px solid var(--border-subtle); padding-top: 20px;">
        <button onclick="approveCurrentProspect(-1)" class="btn btn-reject">Reject Prospect</button>
        <button onclick="copyDraftToClipboard()" class="btn btn-secondary" style="background: #e2e8f0; color: #1e293b;">📋 Copy Draft</button>
        <button onclick="approveCurrentProspect(1)" class="btn btn-approve">✅ Human Sign-Off (Approve)</button>
      </div>
    </div>
  </div>

  <!-- VERIFIER MODAL -->
  <div class="modal-backdrop" id="verifierModal">
    <div class="modal" style="max-width: 550px;">
      <button class="modal-close" onclick="closeVerifierModal()">&times;</button>
      <div class="modal-title">Live Backlink Verifier</div>
      <div class="modal-sub">Check if an external webpage links to myjuice.in</div>
      
      <div style="margin-bottom: 16px;">
        <label style="font-size: 12px; font-weight: 700; color: var(--text-muted);">Source URL to Crawl:</label>
        <input type="text" id="verify-url" class="input-control" style="width: 100%; margin-top: 6px;" placeholder="https://example.com/page-mentioning-us">
      </div>

      <div id="verify-result" style="display:none; margin-bottom: 16px; padding: 14px; border-radius: var(--radius-sm); font-size: 13px;"></div>

      <div style="display: flex; justify-content: flex-end; gap: 10px;">
        <button onclick="closeVerifierModal()" class="btn btn-secondary" style="background:#e2e8f0; color:#1e293b;">Cancel</button>
        <button onclick="runVerification()" class="btn btn-primary" id="btn-run-verify">Run Check</button>
      </div>
    </div>
  </div>

  <div class="toast" id="toast">Notice message</div>

  <script>
    let currentProspectId = null;
    let allProspects = [];

    async function loadStats() {
      try {
        const res = await fetch('/api/stats');
        const data = await res.json();
        document.getElementById('kpi-total').textContent = data.total_prospects;
        document.getElementById('kpi-preapproved').textContent = data.approved_prospects;
        document.getElementById('kpi-human').textContent = data.human_approved_prospects;
        document.getElementById('kpi-active').textContent = data.active_backlinks;
        document.getElementById('kpi-avg').textContent = data.average_score.toFixed(1) + '/100';
      } catch (e) {
        console.error('Stats error:', e);
      }
    }

    async function fetchProspects() {
      const q = document.getElementById('filter-search').value;
      const cat = document.getElementById('filter-category').value;
      const status = document.getElementById('filter-status').value;
      const signoff = document.getElementById('filter-signoff').value;

      const params = new URLSearchParams();
      if (q) params.set('q', q);
      if (cat) params.set('category', cat);
      if (status) params.set('status', status);
      if (signoff) params.set('signoff', signoff);

      const res = await fetch('/api/prospects?' + params.toString());
      const data = await res.json();
      allProspects = data;

      const tbody = document.getElementById('prospects-tbody');
      if (data.length === 0) {
        tbody.innerHTML = '<tr><td colspan="8" style="text-align: center; padding: 40px; color: var(--text-muted);">No prospects match current filters.</td></tr>';
        return;
      }

      tbody.innerHTML = data.map(p => {
        let scoreClass = p.total_score >= 70 ? 'score-high' : (p.total_score >= 50 ? 'score-med' : 'score-low');
        let signoffBadge = p.human_approved === 1 
          ? '<span class="badge badge-approved">Approved</span>' 
          : (p.human_approved === -1 ? '<span class="badge badge-rejected">Rejected</span>' : '<span class="badge badge-pending">Pending Review</span>');
        
        let spamClass = p.spam_risk === 'Low' ? 'badge-approved' : (p.spam_risk === 'Medium' ? 'badge-pending' : 'badge-rejected');

        return `
          <tr>
            <td style="font-family: 'JetBrains Mono', monospace; font-size: 11px; color: var(--text-dim);">#${p.id}</td>
            <td>
              <a href="${p.url}" target="_blank" rel="noopener noreferrer" class="domain-link">${p.domain}</a>
              <div style="font-size: 11px; color: var(--text-dim); max-width: 320px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">${p.title || p.url}</div>
            </td>
            <td><span class="badge" style="background:#e8edf3; color:#1e293b;">${p.category.replace('_', ' ')}</span></td>
            <td><span style="font-size: 12px; color: var(--text-muted);">${p.link_type.replace('_', ' ')}</span></td>
            <td><span class="badge-score ${scoreClass}">${p.total_score}</span></td>
            <td><span class="badge ${spamClass}">${p.spam_risk}</span></td>
            <td>${signoffBadge}</td>
            <td>
              <button onclick="openProspectDetail(${p.id})" class="btn btn-secondary" style="background:#f1f5f9; color:#0f172a; padding: 4px 10px; font-size: 12px;">View &amp; Draft</button>
            </td>
          </tr>
        `;
      }).join('');
    }

    function openProspectDetail(id) {
      const p = allProspects.find(x => x.id === id);
      if (!p) return;
      currentProspectId = id;

      document.getElementById('m-domain').textContent = p.domain;
      document.getElementById('m-title').textContent = p.title + ' (' + p.url + ')';
      document.getElementById('m-score').textContent = p.total_score + '/100';
      document.getElementById('m-relevance').textContent = p.relevance_score + '/25';
      document.getElementById('m-audience').textContent = p.audience_score + '/25';
      document.getElementById('m-legitimacy').textContent = p.legitimacy_score + '/20';
      document.getElementById('m-penalty').textContent = '-' + p.spam_penalty;
      document.getElementById('m-angle').textContent = p.outreach_angle || 'Local relevance and brand citation.';
      document.getElementById('m-target').textContent = p.target_page;
      document.getElementById('m-draft').textContent = p.outreach_draft_body || '(Draft not generated)';

      document.getElementById('prospectModal').classList.add('open');
    }

    function closeProspectModal() {
      document.getElementById('prospectModal').classList.remove('open');
      currentProspectId = null;
    }

    async function approveCurrentProspect(statusVal) {
      if (!currentProspectId) return;
      const res = await fetch(`/api/prospects/${currentProspectId}/approve`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ human_approved: statusVal })
      });
      const data = await res.json();
      showToast(statusVal === 1 ? '✅ Opportunity Approved by Human!' : 'Opportunity Flagged/Rejected');
      closeProspectModal();
      loadStats();
      fetchProspects();
    }

    function copyDraftToClipboard() {
      const text = document.getElementById('m-draft').textContent;
      navigator.clipboard.writeText(text);
      showToast('📋 Outreach message copied to clipboard!');
    }

    function openVerifierModal() {
      document.getElementById('verify-result').style.display = 'none';
      document.getElementById('verifierModal').classList.add('open');
    }

    function closeVerifierModal() {
      document.getElementById('verifierModal').classList.remove('open');
    }

    async function runVerification() {
      const url = document.getElementById('verify-url').value.trim();
      if (!url) return;

      const btn = document.getElementById('btn-run-verify');
      btn.disabled = true;
      btn.textContent = 'Verifying...';

      try {
        const res = await fetch('/api/verify', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ source_url: url })
        });
        const d = await res.json();

        const box = document.getElementById('verify-result');
        box.style.display = 'block';

        if (d.link_status === 'active') {
          box.style.background = '#d1fae5';
          box.style.color = '#065f46';
          box.innerHTML = `<strong>Active Link Found!</strong><br>HTTP: ${d.http_status} | Anchor: "${d.anchor_text}" | Rel: ${d.rel_type}`;
        } else if (d.link_status === 'lost') {
          box.style.background = '#fee2e2';
          box.style.color = '#991b1b';
          box.innerHTML = `<strong>No Link Found:</strong> Target 'myjuice.in' not present on this page. (HTTP ${d.http_status})`;
        } else {
          box.style.background = '#fef3c7';
          box.style.color = '#92400e';
          box.innerHTML = `<strong>Status: ${d.link_status}</strong><br>${d.error || 'Crawl inspected.'}`;
        }

        loadStats();
      } catch (e) {
        alert('Verification error: ' + e);
      } finally {
        btn.disabled = false;
        btn.textContent = 'Run Check';
      }
    }

    function switchTab(tab) {
      document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
      event.target.classList.add('active');

      document.getElementById('view-prospects').style.display = tab === 'prospects' ? 'block' : 'none';
      document.getElementById('view-backlinks').style.display = tab === 'backlinks' ? 'block' : 'none';
      document.getElementById('view-audit').style.display = tab === 'audit' ? 'block' : 'none';
      document.getElementById('view-report').style.display = tab === 'report' ? 'block' : 'none';

      if (tab === 'audit') loadAuditLogs();
      if (tab === 'backlinks') loadBacklinks();
      if (tab === 'report') loadReport();
    }

    async function loadAuditLogs() {
      const res = await fetch('/api/logs');
      const data = await res.json();
      const tbody = document.getElementById('audit-tbody');
      tbody.innerHTML = data.map(l => `
        <tr>
          <td style="font-family: monospace; font-size: 11px;">${l.timestamp.slice(0,19).replace('T', ' ')}</td>
          <td><strong>${l.action}</strong></td>
          <td>${l.entity_type} ${l.entity_id ? '#' + l.entity_id : ''}</td>
          <td style="font-size: 12px; color: var(--text-muted);">${l.details || '-'}</td>
          <td>${l.requires_human_approval ? '<span class="badge badge-pending">Yes</span>' : '<span class="badge" style="background:#e2e8f0;">No</span>'}</td>
        </tr>
      `).join('');
    }

    async function loadBacklinks() {
      const res = await fetch('/api/backlinks');
      const data = await res.json();
      const tbody = document.getElementById('backlinks-tbody');
      if (data.length === 0) {
        tbody.innerHTML = '<tr><td colspan="7" style="text-align: center; padding: 40px; color: var(--text-muted);">No backlinks monitored yet. Use "Verify Live Link" above.</td></tr>';
        return;
      }
      tbody.innerHTML = data.map(b => `
        <tr>
          <td><a href="${b.source_url}" target="_blank" class="domain-link">${b.source_url}</a></td>
          <td>${b.target_url}</td>
          <td>${b.anchor_text || '-'}</td>
          <td>${b.link_type || '-'}</td>
          <td>${b.http_status || '-'}</td>
          <td><span class="badge ${b.link_status === 'active' ? 'badge-approved' : 'badge-rejected'}">${b.link_status}</span></td>
          <td style="font-size: 11px; color: var(--text-dim);">${b.last_checked_at.slice(0,10)}</td>
        </tr>
      `).join('');
    }

    async function loadReport() {
      const res = await fetch('/api/report');
      const data = await res.json();
      document.getElementById('report-pre').textContent = data.markdown;
    }

    function showToast(msg) {
      const t = document.getElementById('toast');
      t.textContent = msg;
      t.classList.add('show');
      setTimeout(() => t.classList.remove('show'), 3000);
    }

    // Initialize
    loadStats();
    fetchProspects();
  </script>
</body>
</html>
"""

class SEOAgentHandler(http.server.BaseHTTPRequestHandler):
    def log_message(self, format, *args):
        # Suppress noisy standard logging to terminal
        pass

    def send_json(self, data, status=200):
        body = json.dumps(data).encode('utf-8')
        self.send_response(status)
        self.send_header('Content-Type', 'application/json; charset=utf-8')
        self.send_header('Content-Length', str(len(body)))
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        self.end_headers()
        self.wfile.write(body)

    def do_OPTIONS(self):
        self.send_response(200)
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        self.end_headers()

    def do_GET(self):
        parsed = urllib.parse.urlparse(self.path)
        path = parsed.path
        query = urllib.parse.parse_qs(parsed.query)

        if path == '/' or path == '/dashboard':
            body = HTML_DASHBOARD.encode('utf-8')
            self.send_response(200)
            self.send_header('Content-Type', 'text/html; charset=utf-8')
            self.send_header('Content-Length', str(len(body)))
            self.end_headers()
            self.wfile.write(body)
            return

        elif path == '/api/stats':
            with get_connection() as conn:
                cursor = conn.cursor()
                cursor.execute("SELECT COUNT(*) FROM prospects")
                total = cursor.fetchone()[0]

                cursor.execute("SELECT COUNT(*) FROM prospects WHERE status = 'approved'")
                approved = cursor.fetchone()[0]

                cursor.execute("SELECT COUNT(*) FROM prospects WHERE human_approved = 1")
                human_app = cursor.fetchone()[0]

                cursor.execute("SELECT COUNT(*) FROM backlinks WHERE link_status = 'active'")
                active_links = cursor.fetchone()[0]

                cursor.execute("SELECT AVG(total_score) FROM prospects")
                avg = cursor.fetchone()[0] or 0

            self.send_json({
                "total_prospects": total,
                "approved_prospects": approved,
                "human_approved_prospects": human_app,
                "active_backlinks": active_links,
                "average_score": avg
            })
            return

        elif path == '/api/prospects':
            q_text = query.get('q', [''])[0].strip().lower()
            cat = query.get('category', [''])[0].strip()
            status = query.get('status', [''])[0].strip()
            signoff = query.get('signoff', [''])[0].strip()

            sql = "SELECT * FROM prospects WHERE 1=1"
            params = []

            if q_text:
                sql += " AND (LOWER(domain) LIKE ? OR LOWER(title) LIKE ? OR LOWER(outreach_angle) LIKE ?)"
                like_term = f"%{q_text}%"
                params.extend([like_term, like_term, like_term])

            if cat:
                sql += " AND category = ?"
                params.append(cat)

            if status:
                sql += " AND status = ?"
                params.append(status)

            if signoff != '':
                sql += " AND human_approved = ?"
                params.append(int(signoff))

            sql += " ORDER BY total_score DESC, id ASC"

            with get_connection() as conn:
                cursor = conn.cursor()
                cursor.execute(sql, params)
                rows = [dict(r) for r in cursor.fetchall()]

            self.send_json(rows)
            return

        elif path == '/api/logs':
            with get_connection() as conn:
                cursor = conn.cursor()
                cursor.execute("SELECT * FROM audit_logs ORDER BY id DESC LIMIT 100")
                rows = [dict(r) for r in cursor.fetchall()]
            self.send_json(rows)
            return

        elif path == '/api/backlinks':
            with get_connection() as conn:
                cursor = conn.cursor()
                cursor.execute("SELECT * FROM backlinks ORDER BY id DESC")
                rows = [dict(r) for r in cursor.fetchall()]
            self.send_json(rows)
            return

        elif path == '/api/export':
            csv_path = export_prospects_to_csv()
            with open(csv_path, 'rb') as f:
                content = f.read()
            self.send_response(200)
            self.send_header('Content-Type', 'text/csv; charset=utf-8')
            self.send_header('Content-Disposition', 'attachment; filename="myjuice_backlink_prospects.csv"')
            self.send_header('Content-Length', str(len(content)))
            self.end_headers()
            self.wfile.write(content)
            return

        elif path == '/api/report':
            md = generate_monthly_report()
            self.send_json({"markdown": md})
            return

        else:
            self.send_error(404, "Not Found")

    def do_POST(self):
        parsed = urllib.parse.urlparse(self.path)
        path = parsed.path

        content_length = int(self.headers.get('Content-Length', 0))
        post_body = self.rfile.read(content_length).decode('utf-8')
        data = json.loads(post_body) if post_body else {}

        if path.startswith('/api/prospects/') and path.endswith('/approve'):
            parts = path.split('/')
            prospect_id = int(parts[3])
            human_val = int(data.get('human_approved', 1))

            with get_connection() as conn:
                cursor = conn.cursor()
                now = datetime.now().isoformat()
                cursor.execute("""
                    UPDATE prospects
                    SET human_approved = ?, updated_at = ?
                    WHERE id = ?
                """, (human_val, now, prospect_id))
                conn.commit()

            status_str = "Approved" if human_val == 1 else ("Rejected" if human_val == -1 else "Pending")
            log_action(f"Human sign-off updated: {status_str}", "prospect", prospect_id, "User action via UI", requires_approval=1)
            self.send_json({"success": True, "id": prospect_id, "status": status_str})
            return

        elif path == '/api/verify':
            source_url = data.get('source_url', '').strip()
            if not source_url:
                self.send_json({"error": "source_url required"}, status=400)
                return

            res = verify_backlink(source_url, "myjuice.in")

            with get_connection() as conn:
                cursor = conn.cursor()
                now = datetime.now().isoformat()
                cursor.execute("""
                    INSERT INTO backlinks (source_url, target_url, anchor_text, link_type, http_status, link_status, redirect_target, first_seen_at, last_checked_at, is_verified)
                    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
                """, (
                    source_url,
                    res.get('target_url') or 'https://myjuice.in/',
                    res.get('anchor_text'),
                    res.get('rel_type'),
                    res.get('http_status'),
                    res.get('link_status'),
                    res.get('redirect_target'),
                    now, now,
                    res.get('is_verified', 0)
                ))
                conn.commit()

            log_action("Live backlink verification completed", "backlink", None, f"Source: {source_url} => {res.get('link_status')}")
            self.send_json(res)
            return

        else:
            self.send_error(404, "Not Found")

def run_server(port=PORT):
    # Bind to localhost
    server_address = ('127.0.0.1', port)
    httpd = socketserver.TCPServer(server_address, SEOAgentHandler)
    print(f"myjuice.in SEO Dashboard running on http://127.0.0.1:{port}")
    httpd.serve_forever()

if __name__ == '__main__':
    run_server()
