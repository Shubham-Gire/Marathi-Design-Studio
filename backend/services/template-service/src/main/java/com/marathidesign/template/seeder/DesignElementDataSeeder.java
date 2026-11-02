package com.marathidesign.template.seeder;

import com.marathidesign.template.model.DesignElement;
import com.marathidesign.template.repository.DesignElementRepository;
import com.marathidesign.template.service.StorageAccountingService;
import org.springframework.boot.CommandLineRunner;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;

import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.List;

@Component
@Order(2)
public class DesignElementDataSeeder implements CommandLineRunner {

    private final DesignElementRepository designElementRepository;
    private final StorageAccountingService storageAccountingService;

    public DesignElementDataSeeder(DesignElementRepository designElementRepository,
                                  StorageAccountingService storageAccountingService) {
        this.designElementRepository = designElementRepository;
        this.storageAccountingService = storageAccountingService;
    }

    @Override
    public void run(String... args) {
        if (designElementRepository.count() > 0) {
            storageAccountingService.syncStorageAccounting();
            return;
        }

        List<DesignElement> elements = new ArrayList<>();

        // -------------------------------------------------------------
        // 1. BASIC & ADVANCED SHAPES
        // -------------------------------------------------------------
        elements.add(createSvgElement(
                "Rectangle Box", "shapes", "SHAPE",
                "<svg viewBox='0 0 100 100' width='100' height='100'><rect width='100' height='100' rx='8' fill='#ea580c'/></svg>",
                "rectangle,box,container,card,shape", false, 120, 120, "#ea580c", null));

        elements.add(createSvgElement(
                "Rounded Banner Pill", "shapes", "SHAPE",
                "<svg viewBox='0 0 200 60' width='200' height='60'><rect width='200' height='60' rx='30' fill='#b91c1c'/></svg>",
                "pill,banner,button,badge,rounded", false, 200, 60, "#b91c1c", null));

        elements.add(createSvgElement(
                "Circle Emblem", "shapes", "SHAPE",
                "<svg viewBox='0 0 100 100' width='100' height='100'><circle cx='50' cy='50' r='48' fill='#eab308'/></svg>",
                "circle,round,badge,emblem,yellow", false, 120, 120, "#eab308", null));

        elements.add(createSvgElement(
                "Geometric Triangle", "shapes", "SHAPE",
                "<svg viewBox='0 0 100 100' width='100' height='100'><polygon points='50,5 95,95 5,95' fill='#b91c1c'/></svg>",
                "triangle,geometry,pointer,direction", false, 120, 120, "#b91c1c", null));

        elements.add(createSvgElement(
                "Golden 5-Point Star", "shapes", "SHAPE",
                "<svg viewBox='0 0 100 100' width='100' height='100'><polygon points='50,5 64,36 98,36 70,57 81,91 50,70 19,91 30,57 2,36 36,36' fill='#f59e0b'/></svg>",
                "star,rating,gold,award,favorite", false, 100, 100, "#f59e0b", null));

        elements.add(createSvgElement(
                "Octagonal Badge Plate", "shapes", "SHAPE",
                "<svg viewBox='0 0 100 100' width='100' height='100'><polygon points='30,5 70,5 95,30 95,70 70,95 30,95 5,70 5,30' fill='#4338ca'/></svg>",
                "octagon,badge,stop,frame,plate", false, 120, 120, "#4338ca", null));

        elements.add(createSvgElement(
                "Heart Motif", "shapes", "SHAPE",
                "<svg viewBox='0 0 100 100' width='100' height='100'><path d='M50 85 L15 50 A25 25 0 0 1 50 20 A25 25 0 0 1 85 50 Z' fill='#e11d48'/></svg>",
                "heart,love,wedding,greeting,romance", false, 100, 100, "#e11d48", null));

        elements.add(createSvgElement(
                "Speech / Thought Callout", "shapes", "SHAPE",
                "<svg viewBox='0 0 120 90' width='120' height='90'><path d='M10 10 h100 a10 10 0 0 1 10 10 v50 a10 10 0 0 1 -10 10 h-60 l-20 15 v-15 h-20 a10 10 0 0 1 -10 -10 v-50 a10 10 0 0 1 10 -10 z' fill='#0284c7'/></svg>",
                "speech,bubble,callout,quote,chat", false, 140, 100, "#0284c7", null));

        // -------------------------------------------------------------
        // 2. LINES & ARROWS
        // -------------------------------------------------------------
        elements.add(createSvgElement(
                "Festive Saffron Divider", "lines_arrows", "SVG",
                "<svg viewBox='0 0 300 20' width='300' height='20'><line x1='5' y1='10' x2='295' y2='10' stroke='#ea580c' stroke-width='4' stroke-linecap='round'/></svg>",
                "line,divider,saffron,accent,separator", false, 280, 20, null, "#ea580c"));

        elements.add(createSvgElement(
                "Golden Double Arrow", "lines_arrows", "SVG",
                "<svg viewBox='0 0 200 40' width='200' height='40'><line x1='15' y1='20' x2='185' y2='20' stroke='#f59e0b' stroke-width='3'/><polyline points='170,10 185,20 170,30' fill='none' stroke='#f59e0b' stroke-width='3' stroke-linecap='round'/><polyline points='30,10 15,20 30,30' fill='none' stroke='#f59e0b' stroke-width='3' stroke-linecap='round'/></svg>",
                "arrow,direction,double arrow,pointer,gold", false, 200, 40, null, "#f59e0b"));

        elements.add(createSvgElement(
                "Royal Flourish Divider", "lines_arrows", "SVG",
                "<svg viewBox='0 0 300 30' width='300' height='30'><path d='M10 15 Q 75 0, 140 15 T 270 15' fill='none' stroke='#eab308' stroke-width='3'/><circle cx='150' cy='15' r='5' fill='#eab308'/></svg>",
                "flourish,vintage,divider,royal,invitation", false, 280, 30, "#eab308", "#eab308"));

        elements.add(createSvgElement(
                "Modern Dashed Divider", "lines_arrows", "SVG",
                "<svg viewBox='0 0 300 10' width='300' height='10'><line x1='5' y1='5' x2='295' y2='5' stroke='#94a3b8' stroke-width='2' stroke-dasharray='8,6'/></svg>",
                "dashed,dotted,line,minimalist,separator", false, 280, 10, null, "#94a3b8"));

        // -------------------------------------------------------------
        // 3. BORDERS & FRAMES
        // -------------------------------------------------------------
        elements.add(createSvgElement(
                "Royal Golden Corner Frame", "borders_frames", "FRAME",
                "<svg viewBox='0 0 100 100' width='100' height='100'><path d='M10 50 V15 A5 5 0 0 1 15 10 H50' fill='none' stroke='#f59e0b' stroke-width='5' stroke-linecap='round'/><circle cx='25' cy='25' r='6' fill='#f59e0b'/></svg>",
                "corner,frame,border,golden,royal,invitation", false, 120, 120, "#f59e0b", "#f59e0b"));

        elements.add(createSvgElement(
                "Ornate Certificate Border Frame", "borders_frames", "FRAME",
                "<svg viewBox='0 0 200 200' width='200' height='200'><rect x='10' y='10' width='180' height='180' rx='6' fill='none' stroke='#ca8a04' stroke-width='4'/><rect x='16' y='16' width='168' height='168' rx='4' fill='none' stroke='#ca8a04' stroke-width='1.5' stroke-dasharray='4,3'/></svg>",
                "certificate,frame,border,award,ornate", false, 220, 220, null, "#ca8a04"));

        elements.add(createSvgElement(
                "Polaroid Photo Frame", "borders_frames", "FRAME",
                "<svg viewBox='0 0 160 200' width='160' height='200'><rect x='5' y='5' width='150' height='190' rx='6' fill='#ffffff' stroke='#cbd5e1' stroke-width='2'/><rect x='15' y='15' width='130' height='130' fill='#f1f5f9'/></svg>",
                "polaroid,photo,camera,frame,picture", false, 160, 200, "#ffffff", "#cbd5e1"));

        // -------------------------------------------------------------
        // 4. STICKERS & SACRED ICONS
        // -------------------------------------------------------------
        elements.add(createSvgElement(
                "॥ श्री गणेशाय नमः ॥ Ganesha Symbol", "stickers_icons", "SVG",
                "<svg viewBox='0 0 100 100' width='100' height='100'><path d='M50 10 Q65 10, 65 30 Q65 45, 50 50 Q75 60, 70 85 Q65 95, 50 95 Q35 95, 30 85 Q25 60, 50 50 Q35 45, 35 30 Q35 10, 50 10 Z' fill='#ea580c'/><circle cx='50' cy='30' r='5' fill='#fef08a'/></svg>",
                "ganesh,ganpati,shree,sacred,auspicious,puja", false, 120, 120, "#ea580c", null));

        elements.add(createSvgElement(
                "॥ 卐 ॥ Vedic Swastik Motif", "stickers_icons", "SVG",
                "<svg viewBox='0 0 100 100' width='100' height='100'><path d='M50 10 v80 M10 50 h80 M50 10 h35 M90 50 v35 M50 90 h-35 M10 50 v-35' fill='none' stroke='#dc2626' stroke-width='8' stroke-linecap='square'/><circle cx='30' cy='30' r='4' fill='#dc2626'/><circle cx='70' cy='30' r='4' fill='#dc2626'/><circle cx='30' cy='70' r='4' fill='#dc2626'/><circle cx='70' cy='70' r='4' fill='#dc2626'/></svg>",
                "swastik,vedic,sacred,puja,red,hindu", false, 100, 100, null, "#dc2626"));

        elements.add(createSvgElement(
                "॥ ॐ ॥ Sacred Om Graphic", "stickers_icons", "SVG",
                "<svg viewBox='0 0 100 100' width='100' height='100'><text x='50' y='75' font-size='80' text-anchor='middle' font-family='Arial, sans-serif' font-weight='bold' fill='#ea580c'>ॐ</text></svg>",
                "om,sacred,spiritual,mantra,mandir", false, 100, 100, "#ea580c", null));

        elements.add(createSvgElement(
                "Mangal Kalash & Coconut", "stickers_icons", "SVG",
                "<svg viewBox='0 0 100 100' width='100' height='100'><ellipse cx='50' cy='65' rx='35' ry='25' fill='#ca8a04'/><circle cx='50' cy='35' r='18' fill='#78350f'/><polygon points='30,40 50,20 70,40' fill='#16a34a'/></svg>",
                "kalash,coconut,mango leaves,puja,wedding,shubh", false, 120, 120, "#ca8a04", null));

        elements.add(createSvgElement(
                "Namaste Greeting Hands", "stickers_icons", "SVG",
                "<svg viewBox='0 0 100 100' width='100' height='100'><path d='M35 80 L45 25 Q50 15, 55 25 L65 80 Q50 90, 35 80 Z' fill='#ea580c'/><line x1='50' y1='25' x2='50' y2='80' stroke='#7c2d12' stroke-width='2'/></svg>",
                "namaste,namaskar,pranam,greeting,welcome", false, 100, 100, "#ea580c", null));

        // -------------------------------------------------------------
        // 5. FESTIVAL DECORATIONS
        // -------------------------------------------------------------
        elements.add(createSvgElement(
                "Festive Toran (Mango Leaves & Marigold)", "festival_decor", "SVG",
                "<svg viewBox='0 0 300 60' width='300' height='60'><path d='M0 10 Q 75 35, 150 10 T 300 10' fill='none' stroke='#b45309' stroke-width='3'/><polygon points='75,25 65,55 85,55' fill='#15803d'/><circle cx='75' cy='25' r='8' fill='#ea580c'/><polygon points='225,25 215,55 235,55' fill='#15803d'/><circle cx='225' cy='25' r='8' fill='#ea580c'/></svg>",
                "toran,festival,diwali,gudipadwa,marigold,leaves", false, 280, 60, "#ea580c", "#b45309"));

        elements.add(createSvgElement(
                "Deepotsav Glowing Diya", "festival_decor", "SVG",
                "<svg viewBox='0 0 100 100' width='100' height='100'><path d='M20 60 Q 50 85, 80 60 Q 50 50, 20 60 Z' fill='#b45309'/><path d='M50 20 Q 60 40, 50 52 Q 40 40, 50 20 Z' fill='#f59e0b'/><circle cx='50' cy='38' r='5' fill='#fef08a'/></svg>",
                "diya,lamp,flame,diwali,light,deepotsav", false, 110, 110, "#b45309", null));

        elements.add(createSvgElement(
                "Ganesh Modak Sweet", "festival_decor", "SVG",
                "<svg viewBox='0 0 100 100' width='100' height='100'><path d='M50 15 Q75 40, 75 75 A25 25 0 0 1 25 75 Q25 40, 50 15 Z' fill='#fef08a' stroke='#f59e0b' stroke-width='3'/><line x1='50' y1='25' x2='50' y2='80' stroke='#f59e0b' stroke-width='2'/></svg>",
                "modak,sweet,ganesh,prasad,festival", false, 100, 100, "#fef08a", "#f59e0b"));

        elements.add(createSvgElement(
                "Maharashtra Dhol Tasha", "festival_decor", "SVG",
                "<svg viewBox='0 0 120 100' width='120' height='100'><ellipse cx='60' cy='50' rx='45' ry='30' fill='#ea580c' stroke='#7c2d12' stroke-width='4'/><line x1='20' y1='30' x2='100' y2='70' stroke='#fef08a' stroke-width='3'/><line x1='20' y1='70' x2='100' y2='30' stroke='#fef08a' stroke-width='3'/></svg>",
                "dhol,tasha,pathak,utsav,ganesh,shivjayanti", false, 130, 100, "#ea580c", "#7c2d12"));

        elements.add(createSvgElement(
                "Rajmudra Royal Seal Stamp", "festival_decor", "SVG",
                "<svg viewBox='0 0 100 100' width='100' height='100'><polygon points='50,5 95,50 50,95 5,50' fill='#7c2d12' stroke='#f59e0b' stroke-width='4'/><circle cx='50' cy='50' r='30' fill='#b91c1c'/><text x='50' y='55' font-size='14' text-anchor='middle' fill='#fef08a' font-weight='bold'>मुद्रा</text></svg>",
                "rajmudra,shivaji maharaj,seal,royal,maratha", false, 120, 120, "#7c2d12", "#f59e0b"));

        // -------------------------------------------------------------
        // 6. BUSINESS & RETAIL PROMOTIONAL ELEMENTS
        // -------------------------------------------------------------
        elements.add(createSvgElement(
                "50% Off Discount Starburst", "business_retail", "BADGE",
                "<svg viewBox='0 0 100 100' width='100' height='100'><polygon points='50,2 62,28 90,18 78,44 100,60 74,68 78,96 52,82 32,98 32,70 4,68 22,46 6,24 34,28' fill='#dc2626'/><text x='50' y='48' font-size='14' text-anchor='middle' fill='#ffffff' font-weight='black'>50%</text><text x='50' y='65' font-size='11' text-anchor='middle' fill='#fef08a' font-weight='bold'>OFF</text></svg>",
                "discount,offer,sale,50 off,starburst,retail", false, 110, 110, "#dc2626", null));

        elements.add(createSvgElement(
                "Grand Opening Ribbon Banner", "business_retail", "BADGE",
                "<svg viewBox='0 0 240 70' width='240' height='70'><path d='M20 15 H220 L200 45 H40 Z' fill='#b91c1c'/><text x='120' y='36' font-size='14' text-anchor='middle' fill='#ffffff' font-weight='black'>GRAND OPENING</text></svg>",
                "grand opening,ribbon,banner,store,launch", false, 220, 65, "#b91c1c", null));

        elements.add(createSvgElement(
                "100% Quality Assurance Stamp", "business_retail", "BADGE",
                "<svg viewBox='0 0 100 100' width='100' height='100'><circle cx='50' cy='50' r='46' fill='none' stroke='#16a34a' stroke-width='4' stroke-dasharray='6,4'/><circle cx='50' cy='50' r='38' fill='#15803d'/><text x='50' y='46' font-size='12' text-anchor='middle' fill='#ffffff' font-weight='black'>100%</text><text x='50' y='60' font-size='9' text-anchor='middle' fill='#fef08a' font-weight='bold'>QUALITY</text></svg>",
                "stamp,quality,guarantee,verified,badge", false, 110, 110, "#15803d", "#16a34a"));

        elements.add(createSvgElement(
                "Limited Time Offer Price Slash", "business_retail", "BADGE",
                "<svg viewBox='0 0 140 60' width='140' height='60'><rect width='140' height='60' rx='10' fill='#ea580c'/><text x='70' y='28' font-size='11' text-anchor='middle' fill='#fef08a' font-weight='black'>LIMITED TIME</text><text x='70' y='48' font-size='16' text-anchor='middle' fill='#ffffff' font-weight='black'>SPECIAL DEAL</text></svg>",
                "limited offer,deal,flash sale,price slash", false, 150, 60, "#ea580c", null));

        // -------------------------------------------------------------
        // 7. BACKGROUNDS & PATTERNS
        // -------------------------------------------------------------
        elements.add(createSvgElement(
                "Royal Paithani Gold Zari Border", "backgrounds_patterns", "SVG",
                "<svg viewBox='0 0 300 40' width='300' height='40'><rect width='300' height='40' fill='#7c2d12'/><path d='M10 20 L25 5 L40 20 L25 35 Z M50 20 L65 5 L80 20 L65 35 Z M90 20 L105 5 L120 20 L105 35 Z M130 20 L145 5 L160 20 L145 35 Z M170 20 L185 5 L200 20 L185 35 Z M210 20 L225 5 L240 20 L225 35 Z M250 20 L265 5 L280 20 L265 35 Z' fill='#f59e0b'/></svg>",
                "paithani,zari,border,pattern,maharashtrian,gold", false, 300, 40, "#7c2d12", "#f59e0b"));

        elements.add(createSvgElement(
                "Traditional Warli Tribal Art Motif", "backgrounds_patterns", "SVG",
                "<svg viewBox='0 0 120 100' width='120' height='100'><circle cx='60' cy='20' r='8' fill='#ffffff'/><polygon points='60,30 45,55 75,55' fill='#ffffff'/><polygon points='60,80 45,55 75,55' fill='#ffffff'/><line x1='60' y1='80' x2='50' y2='98' stroke='#ffffff' stroke-width='3'/><line x1='60' y1='80' x2='70' y2='98' stroke='#ffffff' stroke-width='3'/><line x1='48' y1='40' x2='30' y2='30' stroke='#ffffff' stroke-width='3'/><line x1='72' y1='40' x2='90' y2='30' stroke='#ffffff' stroke-width='3'/></svg>",
                "warli,tribal,art,folk,maharashtra,traditional", false, 120, 100, "#ffffff", null));

        elements.add(createSvgElement(
                "Golden Mandala Sunburst", "backgrounds_patterns", "SVG",
                "<svg viewBox='0 0 100 100' width='100' height='100'><circle cx='50' cy='50' r='15' fill='#f59e0b'/><circle cx='50' cy='50' r='30' fill='none' stroke='#f59e0b' stroke-width='3' stroke-dasharray='4,4'/><circle cx='50' cy='50' r='45' fill='none' stroke='#f59e0b' stroke-width='2' stroke-dasharray='2,6'/></svg>",
                "mandala,sunburst,sacred,pattern,gold,spiritual", false, 130, 130, "#f59e0b", null));

        // -------------------------------------------------------------
        // 8. ILLUSTRATIONS & BADGES
        // -------------------------------------------------------------
        elements.add(createSvgElement(
                "Makar Sankranti Festive Kite", "illustrations_badges", "SVG",
                "<svg viewBox='0 0 100 100' width='100' height='100'><polygon points='50,10 85,50 50,90 15,50' fill='#0284c7'/><polygon points='50,50 85,50 50,90' fill='#0369a1'/><line x1='50' y1='10' x2='50' y2='90' stroke='#ffffff' stroke-width='2'/><path d='M15 50 Q50 20, 85 50' fill='none' stroke='#ffffff' stroke-width='2'/><polygon points='40,90 60,90 50,100' fill='#ea580c'/></svg>",
                "kite,patang,sankranti,festival,sky,january", false, 110, 110, "#0284c7", "#ffffff"));

        elements.add(createSvgElement(
                "Shubh Vivah Kalash & Doli Badge", "illustrations_badges", "BADGE",
                "<svg viewBox='0 0 140 140' width='140' height='140'><circle cx='70' cy='70' r='65' fill='#b91c1c' stroke='#f59e0b' stroke-width='4'/><text x='70' y='55' font-size='16' text-anchor='middle' fill='#fef08a' font-weight='bold'>॥ शुभ विवाह ॥</text><text x='70' y='85' font-size='11' text-anchor='middle' fill='#ffffff'>सस्नेह निमंत्रण</text></svg>",
                "shubh vivah,wedding,lagna,invitation,kalash,red", false, 140, 140, "#b91c1c", "#f59e0b"));

        elements.add(createSvgElement(
                "Abhang Vichar Quotation Card", "illustrations_badges", "BADGE",
                "<svg viewBox='0 0 180 80' width='180' height='80'><rect width='180' height='80' rx='12' fill='#7c2d12' stroke='#f59e0b' stroke-width='3'/><text x='90' y='36' font-size='13' text-anchor='middle' fill='#fef08a' font-weight='bold'>॥ संत विचार ॥</text><text x='90' y='58' font-size='10' text-anchor='middle' fill='#ffffff'>सुविचार व प्रेरणा</text></svg>",
                "abhang,sant,vichar,quote,quotation,inspiration", false, 180, 80, "#7c2d12", "#f59e0b"));

        designElementRepository.saveAll(elements);
        storageAccountingService.syncStorageAccounting();
        System.out.printf("✅ Seeded %d rich reusable design elements and synchronized 10 GB Element Storage Ledger!%n", elements.size());
    }

    private DesignElement createSvgElement(String title, String category, String elementType,
                                           String svgData, String tags, boolean isPremium,
                                           int width, int height, String defaultFill, String defaultStroke) {
        byte[] bytes = svgData.getBytes(StandardCharsets.UTF_8);
        long fileSize = bytes.length;
        String sha256 = storageAccountingService.calculateSha256(bytes);

        return new DesignElement(
                title, category, elementType, svgData,
                null, null, tags, isPremium,
                fileSize, sha256, width, height, defaultFill, defaultStroke
        );
    }
}
