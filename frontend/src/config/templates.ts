import { Template } from '../types';

export const CANVA_IMPORTED_TEMPLATES: Template[] = [
  {
    id: 1001,
    titleMr: 'भव्य उद्घाटन व सण विशेष (Canva Grand Opening Poster)',
    descriptionMr: 'पारंपारिक राजेशाही डिझाईनने परिपूर्ण भव्य उद्घाटन व सण विशेष पोस्टर (Canva द्वारे निर्मित)',
    categorySlug: 'festivals',
    planTier: 'FREE',
    width: 1080,
    height: 1350,
    thumbnailUrl: '/templates/canva/grand_opening_festival.png',
    tags: 'Canva, Grand Opening, भव्य उद्घाटन, सण, Festival, Poster',
    isPublished: true,
    createdAt: '2026-10-30T15:30:00.000Z',
    canvasJson: JSON.stringify({
      version: '5.3.0',
      objects: [
        // Background
        {
          type: 'rect',
          left: 0,
          top: 0,
          width: 1080,
          height: 1350,
          fill: '#3f0308',
          selectable: false
        },
        // Outer decorative gold border
        {
          type: 'rect',
          left: 40,
          top: 40,
          width: 1000,
          height: 1270,
          fill: 'transparent',
          stroke: '#d97706',
          strokeWidth: 4,
          selectable: false
        },
        // Inner thin gold frame
        {
          type: 'rect',
          left: 55,
          top: 55,
          width: 970,
          height: 1240,
          fill: 'transparent',
          stroke: '#fbbf24',
          strokeWidth: 1.5,
          selectable: false
        },
        // Invocational header
        {
          type: 'textbox',
          left: 90,
          top: 100,
          width: 900,
          text: '॥ श्री गणेशाय नमः ॥',
          fontSize: 32,
          fontFamily: 'Rozha One',
          fontWeight: 'bold',
          fill: '#fef08a',
          textAlign: 'center',
          selectable: true
        },
        // Main Marathi Headline
        {
          type: 'textbox',
          left: 90,
          top: 170,
          width: 900,
          text: 'भव्य उद्घाटन',
          fontSize: 76,
          fontFamily: 'Modak',
          fontWeight: 'normal',
          fill: '#fbbf24',
          textAlign: 'center',
          selectable: true,
          shadow: {
            color: 'rgba(0,0,0,0.6)',
            blur: 15,
            offsetX: 3,
            offsetY: 3
          }
        },
        // Subtitle Marathi
        {
          type: 'textbox',
          left: 90,
          top: 290,
          width: 900,
          text: 'व सण विशेष हार्दिक शुभेच्छा',
          fontSize: 38,
          fontFamily: 'Tillana',
          fontWeight: 'bold',
          fill: '#ffffff',
          textAlign: 'center',
          selectable: true
        },
        // English Subtitle
        {
          type: 'textbox',
          left: 90,
          top: 360,
          width: 900,
          text: 'GRAND OPENING & FESTIVAL CELEBRATION',
          fontSize: 22,
          fontFamily: 'Poppins',
          fontWeight: '600',
          fill: '#fed7aa',
          textAlign: 'center',
          charSpacing: 200,
          selectable: true
        },
        // Golden accent divider line
        {
          type: 'rect',
          left: 290,
          top: 420,
          width: 500,
          height: 4,
          fill: '#f59e0b',
          selectable: true
        },
        // Offer Pill Background
        {
          type: 'rect',
          left: 190,
          top: 460,
          width: 700,
          height: 74,
          rx: 37,
          ry: 37,
          fill: '#ea580c',
          stroke: '#fbbf24',
          strokeWidth: 2,
          selectable: true
        },
        // Offer Text
        {
          type: 'textbox',
          left: 200,
          top: 478,
          width: 680,
          text: '💥 सर्व खरेदीवर २५% ची विशेष महासूट! 💥',
          fontSize: 28,
          fontFamily: 'Mukta',
          fontWeight: 'bold',
          fill: '#ffffff',
          textAlign: 'center',
          selectable: true
        },
        // Event Box Background
        {
          type: 'rect',
          left: 140,
          top: 580,
          width: 800,
          height: 290,
          rx: 16,
          ry: 16,
          fill: 'rgba(0, 0, 0, 0.45)',
          stroke: '#f59e0b',
          strokeWidth: 1.5,
          selectable: true
        },
        // Date & Time
        {
          type: 'textbox',
          left: 160,
          top: 615,
          width: 760,
          text: '📅 तारीख: १५ नोव्हेंबर २०२६  |  ⏰ वेळ: सकाळी १०:०० वाजता',
          fontSize: 26,
          fontFamily: 'Mukta',
          fontWeight: 'bold',
          fill: '#ffffff',
          textAlign: 'center',
          selectable: true
        },
        // Venue Text
        {
          type: 'textbox',
          left: 160,
          top: 680,
          width: 760,
          text: '📍 स्थळ: संस्कृती संकुल, मुख्य बाजारपेठ, लक्ष्मी रोड, पुणे - ४११०३०',
          fontSize: 24,
          fontFamily: 'Mukta',
          fontWeight: 'bold',
          fill: '#fde047',
          textAlign: 'center',
          selectable: true
        },
        // Welcome Invitation message
        {
          type: 'textbox',
          left: 160,
          top: 750,
          width: 760,
          text: 'Join us for a grand joyous celebration with family & friends!\nआपली उपस्थिती आमच्यासाठी मोलाची आहे.',
          fontSize: 22,
          fontFamily: 'Poppins',
          fontWeight: 'normal',
          fill: '#e2e8f0',
          textAlign: 'center',
          selectable: true
        },
        // Organizer Footer Box
        {
          type: 'rect',
          left: 240,
          top: 940,
          width: 600,
          height: 74,
          rx: 20,
          ry: 20,
          fill: '#b91c1c',
          stroke: '#fbbf24',
          strokeWidth: 2,
          selectable: true
        },
        // Organizer text
        {
          type: 'textbox',
          left: 250,
          top: 960,
          width: 580,
          text: 'सस्नेह निमंत्रक: समस्त आप्तेष्ट परिवार व मित्रमंडळ',
          fontSize: 26,
          fontFamily: 'Mukta',
          fontWeight: 'bold',
          fill: '#ffffff',
          textAlign: 'center',
          selectable: true
        },
        // Contact details
        {
          type: 'textbox',
          left: 140,
          top: 1060,
          width: 800,
          text: '📞 संपर्क व माहिती: ९८७६५४३२१० / ०२०-२४४५५६६ | www.mywebsite.com',
          fontSize: 20,
          fontFamily: 'Poppins',
          fontWeight: '500',
          fill: '#cbd5e1',
          textAlign: 'center',
          selectable: true
        }
      ]
    })
  },
  {
    id: 1002,
    titleMr: 'शुभ विवाह - सारा आणि साहिल (Canva Traditional Wedding)',
    descriptionMr: 'पारंपारिक राजेशाही लाल आणि सोनेरी रंगातील शुभविवाह पत्रिका (Canva डिझाईन)',
    categorySlug: 'wedding',
    planTier: 'FREE',
    width: 1080,
    height: 1350,
    thumbnailUrl: '/templates/canva/traditional_wedding_poster.png',
    tags: 'Canva, Wedding, विवाह, लग्नपत्रिका, Invitation, Shubh Vivah, Poster',
    isPublished: true,
    createdAt: '2026-10-30T15:30:00.000Z',
    canvasJson: JSON.stringify({
      version: '5.3.0',
      objects: [
        {
          type: 'rect',
          left: 0,
          top: 0,
          width: 1080,
          height: 1350,
          fill: '#350409',
          selectable: false
        },
        {
          type: 'rect',
          left: 45,
          top: 45,
          width: 990,
          height: 1260,
          fill: 'transparent',
          stroke: '#d97706',
          strokeWidth: 5,
          selectable: false
        },
        {
          type: 'rect',
          left: 65,
          top: 65,
          width: 950,
          height: 1220,
          fill: 'transparent',
          stroke: '#fbbf24',
          strokeWidth: 2,
          selectable: false
        },
        {
          type: 'textbox',
          left: 90,
          top: 120,
          width: 900,
          text: '॥ ॐ श्री गणेशाय नमः ॥',
          fontSize: 34,
          fontFamily: 'Rozha One',
          fontWeight: 'bold',
          fill: '#fde047',
          textAlign: 'center',
          selectable: true
        },
        {
          type: 'textbox',
          left: 90,
          top: 200,
          width: 900,
          text: '॥ शुभ विवाह ॥',
          fontSize: 74,
          fontFamily: 'Yatra One',
          fontWeight: 'normal',
          fill: '#fbbf24',
          textAlign: 'center',
          selectable: true,
          shadow: {
            color: 'rgba(0,0,0,0.7)',
            blur: 18,
            offsetX: 2,
            offsetY: 4
          }
        },
        {
          type: 'textbox',
          left: 90,
          top: 310,
          width: 900,
          text: 'WELCOME TO THE WEDDING CELEBRATION OF',
          fontSize: 22,
          fontFamily: 'Montserrat',
          fontWeight: '600',
          fill: '#fed7aa',
          textAlign: 'center',
          charSpacing: 250,
          selectable: true
        },
        {
          type: 'textbox',
          left: 90,
          top: 370,
          width: 900,
          text: 'Sara & Sahil',
          fontSize: 70,
          fontFamily: 'Tillana',
          fontWeight: 'bold',
          fill: '#ffffff',
          textAlign: 'center',
          selectable: true
        },
        {
          type: 'textbox',
          left: 90,
          top: 480,
          width: 900,
          text: 'चि. साहिल  (संग)  चि.सौ.कां. सारा',
          fontSize: 36,
          fontFamily: 'Kalam',
          fontWeight: 'bold',
          fill: '#fef08a',
          textAlign: 'center',
          selectable: true
        },
        {
          type: 'rect',
          left: 290,
          top: 560,
          width: 500,
          height: 4,
          fill: '#f59e0b',
          selectable: true
        },
        {
          type: 'textbox',
          left: 120,
          top: 610,
          width: 840,
          text: 'सस्नेह निमंत्रण!\nआमच्या येथे ज्येष्ठ सुपुत्राचा शुभविवाह करण्याचे योजिले आहे.\nतरी आपण सहकुटुंब सहपरिवार उपस्थित राहून वधू-वरांस शुभाशीर्वाद द्यावेत ही नम्र विनंती.',
          fontSize: 26,
          fontFamily: 'Noto Sans Devanagari',
          fontWeight: 'normal',
          fill: '#f8fafc',
          textAlign: 'center',
          selectable: true
        },
        {
          type: 'rect',
          left: 140,
          top: 800,
          width: 800,
          height: 280,
          rx: 16,
          ry: 16,
          fill: 'rgba(0, 0, 0, 0.4)',
          stroke: '#f59e0b',
          strokeWidth: 2,
          selectable: true
        },
        {
          type: 'textbox',
          left: 160,
          top: 835,
          width: 760,
          text: '🔔 शुभमुहूर्त: रविवार, २५ डिसेंबर २०२६ — दुपारी १२:२४ वा.',
          fontSize: 28,
          fontFamily: 'Mukta',
          fontWeight: 'bold',
          fill: '#fbbf24',
          textAlign: 'center',
          selectable: true
        },
        {
          type: 'textbox',
          left: 160,
          top: 905,
          width: 760,
          text: '📍 विवाहस्थळ: संस्कृती लॉन्स, सातारा रस्ता, स्वारगेट जवळ, पुणे',
          fontSize: 25,
          fontFamily: 'Mukta',
          fontWeight: 'bold',
          fill: '#ffffff',
          textAlign: 'center',
          selectable: true
        },
        {
          type: 'textbox',
          left: 160,
          top: 975,
          width: 760,
          text: '🍽 स्नेहभोजन: दुपारी १:०० वाजता सुरू',
          fontSize: 23,
          fontFamily: 'Mukta',
          fontWeight: '600',
          fill: '#fed7aa',
          textAlign: 'center',
          selectable: true
        },
        {
          type: 'rect',
          left: 240,
          top: 1140,
          width: 600,
          height: 70,
          rx: 20,
          ry: 20,
          fill: '#b91c1c',
          stroke: '#fbbf24',
          strokeWidth: 2,
          selectable: true
        },
        {
          type: 'textbox',
          left: 250,
          top: 1158,
          width: 580,
          text: 'निमंत्रक: श्री. व सौ. देशमुख परिवार व समस्त आप्तेष्ट',
          fontSize: 25,
          fontFamily: 'Mukta',
          fontWeight: 'bold',
          fill: '#ffffff',
          textAlign: 'center',
          selectable: true
        },
        {
          type: 'textbox',
          left: 120,
          top: 1260,
          width: 840,
          text: 'आपली उपस्थिती हेच आमचे अहेर | कार्यसिद्धी!',
          fontSize: 22,
          fontFamily: 'Rozha One',
          fontWeight: 'bold',
          fill: '#fde047',
          textAlign: 'center',
          selectable: true
        }
      ]
    })
  },
  {
    id: 1003,
    titleMr: 'मा. बाळासाहेब ठाकरे हरिद्रा केंद्र (Canva Krushi Banner)',
    descriptionMr: 'मा. बाळासाहेब ठाकरे हळद संशोधन व प्रशिक्षण केंद्र जाहिरात बॅनर (Canva डिझाईन)',
    categorySlug: 'business',
    planTier: 'FREE',
    width: 1080,
    height: 1080,
    thumbnailUrl: '/templates/canva/balasaheb_tribute_banner.png',
    tags: 'Canva, Balasaheb, Krushi, Agriculture, हळद, Haldi, Banner',
    isPublished: true,
    createdAt: '2026-10-30T15:30:00.000Z',
    canvasJson: JSON.stringify({
      version: '5.3.0',
      objects: [
        {
          type: 'rect',
          left: 0,
          top: 0,
          width: 1080,
          height: 1080,
          fill: '#064e3b',
          selectable: false
        },
        {
          type: 'rect',
          left: 0,
          top: 0,
          width: 1080,
          height: 24,
          fill: '#ea580c',
          selectable: false
        },
        {
          type: 'textbox',
          left: 90,
          top: 60,
          width: 900,
          text: '॥ अखंड प्रेरणा व लोकनेता ॥',
          fontSize: 28,
          fontFamily: 'Mukta',
          fontWeight: 'bold',
          fill: '#fef08a',
          textAlign: 'center',
          selectable: true
        },
        {
          type: 'textbox',
          left: 90,
          top: 130,
          width: 900,
          text: 'मा. बाळासाहेब ठाकरे',
          fontSize: 64,
          fontFamily: 'Yatra One',
          fontWeight: 'normal',
          fill: '#ffffff',
          textAlign: 'center',
          selectable: true,
          shadow: {
            color: 'rgba(0,0,0,0.5)',
            blur: 12,
            offsetX: 2,
            offsetY: 2
          }
        },
        {
          type: 'textbox',
          left: 90,
          top: 230,
          width: 900,
          text: 'हरिद्रा (हळद) संशोधन आणि प्रशिक्षण केंद्र',
          fontSize: 38,
          fontFamily: 'Rozha One',
          fontWeight: 'bold',
          fill: '#fbbf24',
          textAlign: 'center',
          selectable: true
        },
        {
          type: 'textbox',
          left: 90,
          top: 310,
          width: 900,
          text: 'Vasmat Haldi — वसमत हळद',
          fontSize: 32,
          fontFamily: 'Poppins',
          fontWeight: 'bold',
          fill: '#fde047',
          textAlign: 'center',
          selectable: true
        },
        {
          type: 'rect',
          left: 240,
          top: 380,
          width: 600,
          height: 4,
          fill: '#ea580c',
          selectable: true
        },
        {
          type: 'textbox',
          left: 100,
          top: 430,
          width: 880,
          text: 'शेतकऱ्यांना आधुनिक कृषी तंत्रज्ञान, हळद प्रक्रिया उद्योग,\nमूल्यवर्धन व उच्च प्रतीच्या उत्पादनासाठी दर्जेदार मार्गदर्शन आणि प्रशिक्षण!',
          fontSize: 26,
          fontFamily: 'Mukta',
          fontWeight: 'normal',
          fill: '#f8fafc',
          textAlign: 'center',
          selectable: true
        },
        {
          type: 'rect',
          left: 190,
          top: 570,
          width: 700,
          height: 90,
          rx: 16,
          ry: 16,
          fill: '#ea580c',
          stroke: '#fef08a',
          strokeWidth: 2,
          selectable: true
        },
        {
          type: 'textbox',
          left: 200,
          top: 598,
          width: 680,
          text: '🌾 बळीराजाच्या सर्वांगीण समृद्धीसाठी कटिबद्ध! 🌾',
          fontSize: 30,
          fontFamily: 'Modak',
          fontWeight: 'normal',
          fill: '#ffffff',
          textAlign: 'center',
          selectable: true
        },
        {
          type: 'textbox',
          left: 100,
          top: 720,
          width: 880,
          text: 'पत्ता: कृषी संकुल, वसमत रोड, हिंगोली, महाराष्ट्र\nहेल्पलाइन: १८००-२३३-४५६७ | ई-मेल: info@vasmathaldi.org',
          fontSize: 24,
          fontFamily: 'Mukta',
          fontWeight: 'bold',
          fill: '#fed7aa',
          textAlign: 'center',
          selectable: true
        }
      ]
    })
  },
  {
    id: 1004,
    titleMr: 'Property Dot Com - रिअल इस्टेट व प्लॉट्स (Canva Real Estate)',
    descriptionMr: 'प्रीमियम गृहप्रकल्प व एन.ए. प्लॉट्स विक्रीसाठी आधुनिक जाहिरात पोस्टर (Canva डिझाईन)',
    categorySlug: 'business',
    planTier: 'FREE',
    width: 1080,
    height: 1080,
    thumbnailUrl: '/templates/canva/property_dot_com.png',
    tags: 'Canva, Property, Real Estate, घर, Plot, Business',
    isPublished: true,
    createdAt: '2026-10-30T15:30:00.000Z',
    canvasJson: JSON.stringify({
      version: '5.3.0',
      objects: [
        {
          type: 'rect',
          left: 0,
          top: 0,
          width: 1080,
          height: 1080,
          fill: '#0b1329',
          selectable: false
        },
        {
          type: 'rect',
          left: 40,
          top: 40,
          width: 1000,
          height: 1000,
          fill: 'transparent',
          stroke: '#38bdf8',
          strokeWidth: 3,
          selectable: false
        },
        {
          type: 'textbox',
          left: 90,
          top: 90,
          width: 900,
          text: 'PROPERTY DOT COM',
          fontSize: 52,
          fontFamily: 'Montserrat',
          fontWeight: '900',
          fill: '#38bdf8',
          textAlign: 'center',
          charSpacing: 200,
          selectable: true
        },
        {
          type: 'textbox',
          left: 90,
          top: 180,
          width: 900,
          text: 'तुमच्या स्वप्नातील हक्काचे घर आता साकार व्हा!',
          fontSize: 36,
          fontFamily: 'Mukta',
          fontWeight: 'bold',
          fill: '#ffffff',
          textAlign: 'center',
          selectable: true
        },
        {
          type: 'textbox',
          left: 90,
          top: 250,
          width: 900,
          text: '1, 2 & 3 BHK Luxury Living & Prime NA Bungalow Plots',
          fontSize: 26,
          fontFamily: 'Poppins',
          fontWeight: '500',
          fill: '#94a3b8',
          textAlign: 'center',
          selectable: true
        },
        {
          type: 'rect',
          left: 240,
          top: 340,
          width: 600,
          height: 80,
          rx: 20,
          ry: 20,
          fill: '#0284c7',
          stroke: '#38bdf8',
          strokeWidth: 2,
          selectable: true
        },
        {
          type: 'textbox',
          left: 250,
          top: 360,
          width: 580,
          text: 'किंमत: ₹३५ लाखांपासून पुढे • ०% दलाली',
          fontSize: 30,
          fontFamily: 'Rozha One',
          fontWeight: 'bold',
          fill: '#ffffff',
          textAlign: 'center',
          selectable: true
        },
        {
          type: 'rect',
          left: 140,
          top: 480,
          width: 800,
          height: 220,
          rx: 16,
          ry: 16,
          fill: 'rgba(30, 41, 59, 0.7)',
          stroke: '#38bdf8',
          strokeWidth: 1.5,
          selectable: true
        },
        {
          type: 'textbox',
          left: 160,
          top: 520,
          width: 760,
          text: '✔ क्लबहाऊस, गार्डन व स्विमिंग पूल   ✔ २४ तास पाणी व सुरक्षा\n✔ पीएमपीएमएल बसस्टॉप जवळ       ✔ १००% बँक लोन सुविधा उपलब्ध',
          fontSize: 25,
          fontFamily: 'Mukta',
          fontWeight: 'normal',
          fill: '#f8fafc',
          textAlign: 'center',
          selectable: true
        },
        {
          type: 'textbox',
          left: 90,
          top: 760,
          width: 900,
          text: '📍 लोकेशन: बाणेर-बालेवाडी हायवे टच, पुणे',
          fontSize: 26,
          fontFamily: 'Mukta',
          fontWeight: 'bold',
          fill: '#fde047',
          textAlign: 'center',
          selectable: true
        },
        {
          type: 'textbox',
          left: 90,
          top: 830,
          width: 900,
          text: '📞 बुकिंग व साईट व्हिजिटसाठी संपर्क: ९८७६५४३२१०',
          fontSize: 28,
          fontFamily: 'Poppins',
          fontWeight: 'bold',
          fill: '#38bdf8',
          textAlign: 'center',
          selectable: true
        }
      ]
    })
  }
];
