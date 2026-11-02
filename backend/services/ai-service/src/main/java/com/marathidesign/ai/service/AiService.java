package com.marathidesign.ai.service;

import com.marathidesign.ai.dto.*;
import com.marathidesign.ai.model.AiUsageCounter;
import com.marathidesign.ai.repository.AiUsageCounterRepository;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Service
public class AiService {

    private final AiUsageCounterRepository usageRepository;

    @Value("${ai.gemini.api-key:}")
    private String geminiApiKey;

    private static final int FREE_DAILY_QUOTA = 5;
    private static final int PRO_DAILY_QUOTA = 50;

    public AiService(AiUsageCounterRepository usageRepository) {
        this.usageRepository = usageRepository;
    }

    @Transactional
    public void checkAndIncrementQuota(Long userId, String planTier) {
        int limit = ("PRO".equalsIgnoreCase(planTier) || "BUSINESS".equalsIgnoreCase(planTier))
                ? PRO_DAILY_QUOTA
                : FREE_DAILY_QUOTA;

        LocalDate today = LocalDate.now();
        AiUsageCounter counter = usageRepository.findByUserIdAndUsageDate(userId, today)
                .orElseGet(() -> new AiUsageCounter(userId, today, 0));

        if (counter.getCount() >= limit) {
            throw new IllegalStateException("Your daily AI generation quota (" + limit + " requests) has been reached. Please try again tomorrow or upgrade to Pro.");
        }

        counter.setCount(counter.getCount() + 1);
        usageRepository.save(counter);
    }

    public AiCopyResponse generateCopy(Long userId, String planTier, AiCopyRequest req) {
        checkAndIncrementQuota(userId, planTier);

        String topic = req.getTopic() != null ? req.getTopic().trim() : "व्यवसाय";
        String tone = req.getTone() != null ? req.getTone().trim() : "आकर्षक";

        List<String> headlines = new ArrayList<>();
        List<String> slogans = new ArrayList<>();
        List<String> invitations = new ArrayList<>();

        if (topic.contains("गणेश") || topic.contains("बाप्पा") || topic.contains("उत्सव")) {
            headlines.add("|| गणपती बाप्पा मोरया || विघ्नहर्त्याचे आगमन!");
            headlines.add("सुखकर्ता दुःखहर्ता श्री गणेशाच्या चरणी लीन होऊया!");
            headlines.add("आनंद, भक्ती आणि उत्साहाचे मंगलमय दिवस!");

            slogans.add("बाप्पाच्या कृपेने घरात नांदो सुख, समाधान आणि समृद्धी!");
            slogans.add("विघ्न विनाशक मोरया, आम्हा संकटातून ताराया!");
            slogans.add("एक, दोन, तीन, चार, गणपतीचा जयजयकार!");

            invitations.add("आमच्या निवासस्थानी श्री गणेशाच्या दर्शनासाठी व प्रसादासाठी आपण सपरिवार सहर्ष निमंत्रित आहात.");
            invitations.add("गणेशोत्सव महाप्रसाद व आरती सोहळ्यास आपली उपस्थिती प्रार्थनीय आहे.");
        } else if (topic.contains("दिवाळी") || topic.contains("दीपावली") || topic.contains("लक्ष्मी")) {
            headlines.add("शुभ दीपावली! मांगल्याचे आणि प्रकाशाचे महापर्व!");
            headlines.add("तेजोमय दिव्यांच्या प्रकाशाने उजळू दे आपले आयुष्य!");
            headlines.add("धन, धान्य आणि आरोग्याची समृद्धी लाभो!");

            slogans.add("दिवाळी आली, आनंद घेऊन आली!");
            slogans.add("दीप जळोत प्रेमाचे, नाते घट्ट विश्वासाचे!");
            slogans.add("प्रकाशमय दिवाळीच्या लखलखत्या शुभेच्छा!");

            invitations.add("दीपावली पाडवा व स्नेहमिलन सोहळ्यास आपण सहकुटुंब उपस्थित राहावे.");
        } else if (topic.contains("ज्यूस") || topic.contains("आईस्क्रीम") || topic.contains("हॉटेल") || topic.contains("खाद्य")) {
            headlines.add("१००% अस्सल आणि ताजी चव! आजच भेट द्या.");
            headlines.add("उन्हाळ्यातील थंडगार गारवा आणि नैसर्गिक गोडवा!");
            headlines.add("खवय्यांसाठी खास पर्वणी — चव अशी जी विसरणार नाही!");

            slogans.add("शुद्धतेची हमी, उत्तम चव आणि वाजवी दर!");
            slogans.add("एकदा चव चाखाल तर पुन्हा नक्की याल!");
            slogans.add("थंडगार ज्यूस, मन प्रसन्न आणि शरीर तजेलदार!");

            invitations.add("आमच्या नवीन शाखेला आजच भेट द्या आणि विशेष २०% सवलतीचा लाभ घ्या!");
        } else if (topic.contains("ऑफर") || topic.contains("सेल") || topic.contains("दुकान") || topic.contains("डिस्काउंट")) {
            headlines.add("भव्य महासेल! थेट ५०% पर्यंत प्रचंड सूट!");
            headlines.add("मर्यादित कालावधीसाठी विशेष विकेंड बंपर धमाका!");
            headlines.add("खरेदी करा मनासारखी, बचत करा खिशासारखी!");

            slogans.add("दर्जेदार वस्तू, कमीत कमी किंमत!");
            slogans.add("अशी ऑफर पुन्हा कधीही मिळणार नाही!");
            slogans.add("आजच खरेदी करा आणि फ्री गिफ्ट जिंका!");

            invitations.add("आपल्या लाडक्या दुकानात नवीन स्टॉक दाखल! त्वरित भेट द्या.");
        } else if (topic.contains("वाढदिवस") || topic.contains("शुभेच्छा")) {
            headlines.add("वाढदिवसाच्या अनंत मनःपूर्वक हार्दिक शुभेच्छा!");
            headlines.add("व्यक्तिमत्त्व दिलखुलास, विचार अतिशय उदात्त!");
            headlines.add("आमचे आधारस्तंभ व मार्गदर्शक यांना अभीष्टचिंतन!");

            slogans.add("उदंड आयुष्याच्या अनंत कोटी शिवमय शुभेच्छा!");
            slogans.add("यश, कीर्ती आणि आरोग्य निरंतर लाभो हीच सदिच्छा!");

            invitations.add("वाढदिवसानिमित्त आयोजित स्नेहभोजन सोहळ्यास आपली उपस्थिती प्रार्थनीय आहे.");
        } else {
            // General business / social headline generator
            headlines.add(topic + " — आता महाराष्ट्रात पहिल्यांदाच नवीन रुपात!");
            headlines.add("आपल्या सेवेत सदैव तत्पर आणि विश्वासू: " + topic);
            headlines.add("उत्कृष्ट गुणवत्ता, योग्य भाव आणि विश्वासार्हता!");

            slogans.add("महाराष्ट्राची पसंती, मराठी माणसाचा विश्वास!");
            slogans.add("यशाची नवीन दिशा, प्रगतीची नवी आशा!");
            slogans.add("एक पाऊल समृद्धीकडे!");

            invitations.add("अधिक माहिती व सेवेसाठी आजच संपर्क साधा.");
        }

        return new AiCopyResponse(headlines, slogans, invitations);
    }

    public AiBriefResponse generateDesignFromBrief(Long userId, String planTier, AiBriefRequest req) {
        checkAndIncrementQuota(userId, planTier);

        String brief = req.getBrief() != null ? req.getBrief().toLowerCase().trim() : "";

        if (brief.contains("ज्यूस") || brief.contains("आईस्क्रीम") || brief.contains("थंड")) {
            return new AiBriefResponse(
                    "ज्यूस सेंटर उन्हाळी विशेष ऑफर",
                    "नैसर्गिक ताजे ज्यूस व शेक!",
                    "हापूस मँगो, मोसंबी आणि थंडगार मलाई कुल्फीवर बाय १ गेट १ फ्री!\\nसर्वोत्तम दर्जा, १००% ताजे फळे.",
                    "शीतल ज्यूस सेंटर | भेट द्या: मेन रोड, पुणे",
                    "#FFFBEB", "#D97706", "#78350F",
                    "Mukta", "offers",
                    List.of(
                            "उष्णतेच्या काळात केशरी आणि सोनेरी रंग वापरल्याने पेय अधिक ताजे आणि आकर्षक दिसते.",
                            "फळांचे चित्र डाव्या बाजूला किंवा मध्यभागी ठेवल्यास परिणामकारकता वाढते."
                    )
            );
        } else if (brief.contains("दिवाळी") || brief.contains("सण") || brief.contains("उत्सव")) {
            return new AiBriefResponse(
                    "शुभ दीपावली सण शुभेच्छा",
                    "|| शुभ दीपावली ||",
                    "तेजोमय दिव्यांच्या प्रकाशाने आपले जीवन उजळून निघो!\\nआपणास व आपल्या कुटुंबियांस दिवाळीच्या हार्दिक शुभेच्छा.",
                    "शुभेच्छुक: समस्त मित्र परिवार",
                    "#1E1B4B", "#EAB308", "#FEF08A",
                    "Mukta", "festivals",
                    List.of(
                            "गडद जांभळा आणि सोनेरी रंगाची जोड दिवाळीच्या दिव्य वातावरणासाठी सर्वोत्तम ठरते.",
                            "मध्यभागी पणती किंवा रांगोळीचे घटक जोडा."
                    )
            );
        } else if (brief.contains("ऑफर") || brief.contains("दुकान") || brief.contains("सेल")) {
            return new AiBriefResponse(
                    "दुकान भव्य महासेल",
                    "धमाका ऑफर! ५०% थेट सूट",
                    "सर्व नवीन व्हरायटीवर मर्यादित कालावधीसाठी विशेष सवलत!\\nआजच खरेदी करा आणि भरघोस बचत करा.",
                    "त्वरित भेट द्या | संपर्क: ९८XXXXXXXX",
                    "#7F1D1D", "#EAB308", "#FFFFFF",
                    "Mukta", "offers",
                    List.of(
                            "लाल आणि पिवळा रंग तातडीने लक्ष वेधून घेतात आणि विक्री वाढवतात.",
                            "डिस्काउंटचा आकडा ठळक आणि मोठा ठेवा."
                    )
            );
        } else {
            return new AiBriefResponse(
                    "मराठी व्यवसाय व ब्रँडिंग पोस्ट",
                    "आपला व्यवसाय, आमची गुणवत्ता!",
                    "ग्राहकांचा विश्वास हेच आमचे भांडवल!\\nसर्वोत्कृष्ट सेवा आणि हमखास समाधान मिळवण्यासाठी आजच संपर्क करा.",
                    "अधिक माहितीसाठी: info@domain.com",
                    "#0F172A", "#38BDF8", "#FFFFFF",
                    "Mukta", "business",
                    List.of(
                            "गडद निळा पार्श्वभूमी कॉर्पोरेट विश्वासार्हता दर्शवते.",
                            "मथळा देवनागरी अक्षरांमध्ये स्पष्ट दिसण्यासाठी 'Mukta' फॉन्ट वापरा."
                    )
            );
        }
    }

    public AiImproveResponse improveText(Long userId, String planTier, AiImproveRequest req) {
        checkAndIncrementQuota(userId, planTier);

        String original = req.getText() != null ? req.getText().trim() : "";
        String shortVar = original.length() > 20 ? original.substring(0, Math.min(original.length(), 20)) + "!" : original + "!";
        String stdVar = original + " — सर्वांचे मनःपूर्वक स्वागत!";
        String detailedVar = "आम्हाला कळवण्यास अत्यंत आनंद होत आहे की, " + original + ". तरी आपण सर्वांनी या शुभप्रसंगी उपस्थित राहून सोहळ्याची शोभा वाढवावी ही नम्र विनंती.";

        return new AiImproveResponse(original, shortVar, stdVar, detailedVar);
    }
}
