"""
Personalized Outreach Draft Generator for myjuice.in
Strict Operating Constraint: Generates draft messages ONLY.
NEVER sends emails, submits forms, or creates accounts without explicit human authorization.
"""

from typing import Dict, Any

BRAND_NAME = "Navnath Raswanti Gruha"
BRAND_URL = "https://myjuice.in/"
BRAND_LOCATION = "Hanuman Nagar, Chhatrapati Sambhajinagar (Aurangabad), Maharashtra 431002"
BRAND_PHONE = "+91 75074 17433"
BRAND_EMAIL = "shubhamgire96k@gmail.com"
FOUNDED_YEAR = "2011"

def generate_outreach_draft(prospect: Dict[str, Any]) -> Dict[str, str]:
    """
    Generates a personalized, transparent outreach draft tailored to the prospect's category and angle.
    Includes explicit warning that human approval is required prior to sending.
    """
    category = prospect.get('category', 'local_directory')
    domain = prospect.get('domain', '')
    contact_name = prospect.get('contact_name') or 'Editorial / Business Team'
    target_page = prospect.get('target_page', BRAND_URL)

    subject = ""
    body = ""

    if category in ['local_directory', 'b2b_directory']:
        subject = f"Business Listing Verification & Website Update for {BRAND_NAME} in Chhatrapati Sambhajinagar"
        body = f"""Dear {contact_name},

I hope this message finds you well.

I am reaching out on behalf of {BRAND_NAME}, an established fresh juice and sugarcane refresher center operating since {FOUNDED_YEAR} in Chhatrapati Sambhajinagar (Aurangabad), Maharashtra.

We would like to ensure our business details on {domain} are fully up to date for local patrons and visitors searching for fresh beverages.

Here are our verified business credentials for your directory listing:
• Business Name: {BRAND_NAME}
• Category: Juice Center / Fresh Fruit & Sugarcane Juices
• Official Website: {target_page}
• Address: {BRAND_LOCATION}
• Direct Contact: {BRAND_PHONE}
• Operating Hours: Mon–Sun, 08:00 AM – 11:00 PM
• Primary Specialties: Fresh cold-pressed Sugarcane juice, seasonal Mango, Apple, Mosambi, Santra, Pineapple, Chikoo, Fig juices (₹20–₹50).

Could you please verify our profile or let us know if additional documentation is required to display our verified official website link?

Thank you for supporting authentic local businesses.

Warm regards,

Shubham Gire
Navnath Raswanti Gruha
Phone: {BRAND_PHONE}
Website: {target_page}
"""

    elif category in ['food_beverage_blog', 'culinary_portal']:
        subject = f"Story Idea / Authentic Sugarcane Juice Heritage in Marathwada ({BRAND_NAME})"
        body = f"""Dear {contact_name},

I regularly follow your culinary guides and stories on {domain}. Your dedication to authentic regional food traditions and street food gems is fantastic.

I am writing from {BRAND_NAME}, a local juice center serving Chhatrapati Sambhajinagar since {FOUNDED_YEAR}. In Maharashtra, the traditional "Raswanti Gruha" holds deep cultural significance as a natural summer lifesaver, yet today consumers frequently struggle to find hygienic, authentic preparation that avoids unpasteurized ice and unfiltered processing.

We recently published our guide and digital menu at {target_page}, highlighting:
• The farm-to-cup sugarcane pressing tradition in Marathwada
• Strict hygiene standards and cold-pressed extraction methods
• Nutritional comparisons of natural sugarcane juice vs. commercial sodas

If you are planning an upcoming feature on Maharashtra's authentic beverage heritage, street food trails in Sambhajinagar (the gateway to Ajanta & Ellora), or summer cooling drinks, we would love to contribute high-resolution photos, local insights, or recipe context.

Please take a look at our website ({target_page}) and let me know if this could be a valuable reference for your readers.

Best regards,

Shubham Gire
Navnath Raswanti Gruha
Phone: {BRAND_PHONE}
Website: {target_page}
"""

    elif category in ['travel_tourism', 'tourism_guide']:
        subject = f"Ajanta & Ellora Traveler Refreshment Guide: Fresh Juice Stop in Chhatrapati Sambhajinagar"
        body = f"""Hello {contact_name},

We appreciate the comprehensive travel recommendations you maintain on {domain} for tourists visiting Chhatrapati Sambhajinagar and the UNESCO World Heritage Ajanta & Ellora caves.

One of the top questions domestic and international travelers ask when exploring our city is where to safely enjoy authentic Indian fresh fruit and sugarcane juices with strict hygiene standards.

{BRAND_NAME} has been serving travelers and local residents since {FOUNDED_YEAR}. Located conveniently at Hanuman Nagar, we offer:
• Pure sugarcane juice prepared with fresh ginger, mint, and lemon
• Fresh fruit juices (Mango, Sweet Lime/Mosambi, Orange, Apple, Fig)
• Transparent hygiene and clean ice options
• Complete price transparency (₹20–₹50)

You can review our location and menu details here: {target_page}
Google Maps CID: https://www.google.com/maps?cid=7374732611098394112

If you maintain a local food & drink recommendation section for Aurangabad/Sambhajinagar, we would be honored to be considered as a trusted recommendation for your readers.

Thank you for your time and continued guidance for visitors to our region!

Warm regards,

Shubham Gire
Navnath Raswanti Gruha
Phone: {BRAND_PHONE}
Website: {target_page}
"""

    elif category in ['regional_media', 'local_media']:
        subject = f"Local Feature: Traditional 15-Year Sambhajinagar Juice Center Embraces Digital Transparency"
        body = f"""Dear Editorial Desk at {domain},

I am writing to share a brief local feature story from Chhatrapati Sambhajinagar.

{BRAND_NAME}, a beloved local juice shop established in {FOUNDED_YEAR} near Hanuman Nagar, has recently launched a full digital transparency initiative ({target_page}), making ingredient sourcing, nutritional benefits, and live pricing completely accessible online for local residents.

Traditional Maharashtrian 'Raswanti Gruhas' are an iconic cultural staple, yet few local small businesses have modernized their customer experience while keeping prices affordable (₹20 for pure sugarcane juice).

We would be happy to share details on the changing consumer habits for healthy, unadulterated street beverages in Sambhajinagar and provide local photos.

If you are interested in exploring this local enterprise story, please let us know!

Best regards,

Shubham Gire
Navnath Raswanti Gruha
Phone: {BRAND_PHONE}
Website: {target_page}
"""

    else:
        subject = f"Resource Suggestion for {domain} - Fresh Juice & Local Dining in Chhatrapati Sambhajinagar"
        body = f"""Hello {contact_name},

I came across your helpful resource listings on {domain} and wanted to suggest a relevant local addition.

{BRAND_NAME} ({target_page}) is a long-standing juice center in Chhatrapati Sambhajinagar (Aurangabad), Maharashtra, known for authentic sugarcane and fresh seasonal fruit juices since {FOUNDED_YEAR}.

If you maintain a directory of recommended beverage outlets, street food spots, or local businesses in Maharashtra, our website offers an accurate menu, operating hours, and location reference for your audience.

Thank you for considering our submission!

Sincerely,

Shubham Gire
Navnath Raswanti Gruha
Phone: {BRAND_PHONE}
Website: {target_page}
"""

    compliance_header = (
        "----------------------------------------------------------------------\n"
        "AI OUTREACH DRAFT - STRICT COMPLIANCE NOTICE\n"
        "STATUS: DRAFT ONLY | REQUIRES MANUAL HUMAN REVIEW AND SIGN-OFF\n"
        "NO AUTOMATED OUTREACH, FORM SUBMISSIONS, OR SPAM EMAILS PERMITTED.\n"
        "Ensure rel='sponsored' or rel='nofollow' is requested if commercial fees apply.\n"
        "----------------------------------------------------------------------\n\n"
    )

    return {
        "subject": subject,
        "body": compliance_header + body
    }
