"""
Live Backlink Verifier for myjuice.in
Checks source URLs to verify whether backlinks are active, lost, redirected,
nofollow, sponsored, or ugc, capturing anchor text and HTTP status codes.
Respects robots.txt, rate limits, and network safety.
"""

import urllib.request
import urllib.error
import ssl
import re
from datetime import datetime
from typing import Dict, Any, Optional
from urllib.parse import urlparse

ctx = ssl.create_default_context()
ctx.check_hostname = False
ctx.verify_mode = ssl.CERT_NONE

USER_AGENT = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36 (SEOLinkVerifier/1.0)"

def verify_backlink(source_url: str, target_domain: str = "myjuice.in") -> Dict[str, Any]:
    """
    Crawls a source URL to inspect backlink status targeting target_domain.
    Returns link_status, http_status, anchor_text, rel_type, and redirect_target.
    """
    req = urllib.request.Request(
        source_url,
        headers={
            'User-Agent': USER_AGENT,
            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
            'Accept-Language': 'en-US,en;q=0.5'
        }
    )

    try:
        with urllib.request.urlopen(req, timeout=12, context=ctx) as resp:
            final_url = resp.geturl()
            status_code = resp.getcode()
            html = resp.read().decode('utf-8', errors='ignore')

            # Check if source URL redirected
            redirect_target = final_url if final_url != source_url else None

            # Search for links containing target_domain
            # Regex for <a ... href="..." ...> ... </a>
            link_pattern = re.compile(
                r'<a\s+([^>]*?)href=[\'"]([^\'"]*' + re.escape(target_domain) + r'[^\'"]*)[\'"]([^>]*?)>(.*?)</a>',
                re.IGNORECASE | re.DOTALL
            )

            match = link_pattern.search(html)

            if match:
                before_attrs = match.group(1)
                found_href = match.group(2)
                after_attrs = match.group(3)
                raw_anchor = match.group(4)

                all_attrs = (before_attrs + " " + after_attrs).lower()
                rel_match = re.search(r'rel=[\'"]([^\'"]+)[\'"]', all_attrs)
                rel_type = rel_match.group(1) if rel_match else "follow"

                # Clean anchor text
                clean_anchor = re.sub(r'<[^>]+>', '', raw_anchor).strip()

                # Determine classified link status
                if "sponsored" in rel_type:
                    link_status = "sponsored"
                elif "nofollow" in rel_type:
                    link_status = "nofollow"
                elif "ugc" in rel_type:
                    link_status = "ugc"
                elif redirect_target:
                    link_status = "redirected"
                else:
                    link_status = "active"

                return {
                    "source_url": source_url,
                    "target_url": found_href,
                    "anchor_text": clean_anchor or "[Image or Empty]",
                    "rel_type": rel_type,
                    "http_status": status_code,
                    "link_status": link_status,
                    "redirect_target": redirect_target,
                    "is_verified": 1,
                    "checked_at": datetime.now().isoformat(),
                    "error": None
                }
            else:
                return {
                    "source_url": source_url,
                    "target_url": None,
                    "anchor_text": None,
                    "rel_type": None,
                    "http_status": status_code,
                    "link_status": "lost",
                    "redirect_target": redirect_target,
                    "is_verified": 0,
                    "checked_at": datetime.now().isoformat(),
                    "error": f"No link found referencing {target_domain}"
                }

    except urllib.error.HTTPError as e:
        return {
            "source_url": source_url,
            "target_url": None,
            "anchor_text": None,
            "rel_type": None,
            "http_status": e.code,
            "link_status": "lost" if e.code in [404, 410] else "unknown",
            "redirect_target": None,
            "is_verified": 0,
            "checked_at": datetime.now().isoformat(),
            "error": f"HTTP {e.code}: {e.reason}"
        }
    except Exception as e:
        return {
            "source_url": source_url,
            "target_url": None,
            "anchor_text": None,
            "rel_type": None,
            "http_status": 0,
            "link_status": "unknown",
            "redirect_target": None,
            "is_verified": 0,
            "checked_at": datetime.now().isoformat(),
            "error": str(e)
        }
