"""
Transparent Backlink Quality Scoring Engine for myjuice.in
Evaluates opportunities based on Topical Relevance, Real Audience, Website Legitimacy,
Editorial Integrity, and strict Spam Risk penalties.
"""

from typing import Dict, Any, Tuple

def score_prospect(
    category: str,
    link_type: str,
    is_local_sambhajinagar: bool = False,
    is_maharashtra_regional: bool = False,
    has_editorial_review: bool = True,
    has_verified_contact: bool = True,
    is_pbn_or_farm: bool = False,
    has_spam_signals: bool = False,
    traffic_tier: str = "medium" # 'high', 'medium', 'low', 'unknown'
) -> Dict[str, Any]:
    """
    Computes a transparent 0-100 quality score and spam risk categorization.
    """
    
    # 1. Topical Relevance (Max 25 pts)
    relevance_score = 0
    if category in ['local_directory', 'local_guide', 'local_media'] and is_local_sambhajinagar:
        relevance_score = 25
    elif category in ['food_beverage_blog', 'culinary_portal'] and is_maharashtra_regional:
        relevance_score = 24
    elif category in ['food_beverage_blog', 'culinary_portal']:
        relevance_score = 20
    elif category in ['travel_tourism', 'lifestyle_publisher']:
        relevance_score = 18
    elif category in ['b2b_directory', 'local_business_directory']:
        relevance_score = 15
    elif category in ['general_directory']:
        relevance_score = 10
    else:
        relevance_score = 8

    # 2. Real Audience & Referral Potential (Max 25 pts)
    audience_score = 0
    if traffic_tier == 'high':
        audience_score = 25
    elif traffic_tier == 'medium':
        audience_score = 18
    elif traffic_tier == 'low':
        audience_score = 10
    else:
        audience_score = 5

    # 3. Website Legitimacy & Transparency (Max 20 pts)
    legitimacy_score = 0
    if has_verified_contact:
        legitimacy_score += 12
    else:
        legitimacy_score += 4
        
    if category in ['local_directory', 'b2b_directory', 'travel_tourism', 'regional_media']:
        legitimacy_score += 8
    else:
        legitimacy_score += 6

    # 4. Editorial Integrity & Outbound Quality (Max 15 pts)
    editorial_score = 0
    if has_editorial_review:
        editorial_score += 10
    else:
        editorial_score += 4

    if link_type in ['editorial', 'partner']:
        editorial_score += 5
    elif link_type in ['directory_citation', 'local_citation']:
        editorial_score += 4
    elif link_type in ['sponsored']:
        editorial_score += 2 # Needs rel=sponsored disclosure
    else:
        editorial_score += 1

    # 5. Spam Penalty (0 to -50 pts)
    spam_penalty = 0
    spam_risk = "Low"

    if is_pbn_or_farm:
        spam_penalty += 50
        spam_risk = "Extreme"
    elif has_spam_signals:
        spam_penalty += 30
        spam_risk = "High"
    elif not has_verified_contact:
        spam_penalty += 10
        spam_risk = "Medium"

    total_score = max(0, min(100, (relevance_score + audience_score + legitimacy_score + editorial_score) - spam_penalty))

    # Determine status recommendation
    if spam_risk in ['High', 'Extreme'] or total_score < 40:
        recommended_status = "rejected"
    elif total_score >= 65:
        recommended_status = "approved"
    else:
        recommended_status = "needs_review"

    return {
        "relevance_score": relevance_score,
        "audience_score": audience_score,
        "legitimacy_score": legitimacy_score,
        "editorial_score": editorial_score,
        "spam_penalty": spam_penalty,
        "total_score": total_score,
        "spam_risk": spam_risk,
        "recommended_status": recommended_status
    }
