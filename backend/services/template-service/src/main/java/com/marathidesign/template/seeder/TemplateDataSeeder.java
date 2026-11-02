package com.marathidesign.template.seeder;

import com.marathidesign.template.model.Template;
import com.marathidesign.template.model.TemplateCategory;
import com.marathidesign.template.repository.CategoryRepository;
import com.marathidesign.template.repository.TemplateRepository;
import com.marathidesign.template.service.StorageAccountingService;
import org.springframework.boot.CommandLineRunner;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;

import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.List;

@Component
@Order(1)
public class TemplateDataSeeder implements CommandLineRunner {

    private final CategoryRepository categoryRepository;
    private final TemplateRepository templateRepository;
    private final StorageAccountingService storageAccountingService;

    public TemplateDataSeeder(CategoryRepository categoryRepository,
                              TemplateRepository templateRepository,
                              StorageAccountingService storageAccountingService) {
        this.categoryRepository = categoryRepository;
        this.templateRepository = templateRepository;
        this.storageAccountingService = storageAccountingService;
    }

    @Override
    public void run(String... args) {
        if (categoryRepository.count() == 0) {
            seedCategories();
        }
        if (templateRepository.count() < 28) {
            seedTemplates();
        }

        // Ensure all templates have file size and sha256 checksum populated
        List<Template> templates = templateRepository.findAll();
        boolean updated = false;
        for (Template t : templates) {
            if (t.getFileSizeBytes() == null || t.getFileSizeBytes() == 0 || t.getSha256Hash() == null) {
                if (t.getCanvasJson() != null) {
                    byte[] bytes = t.getCanvasJson().getBytes(StandardCharsets.UTF_8);
                    t.setFileSizeBytes((long) bytes.length);
                    t.setSha256Hash(storageAccountingService.calculateSha256(bytes));
                    updated = true;
                }
            }
        }
        if (updated) {
            templateRepository.saveAll(templates);
        }

        storageAccountingService.syncStorageAccounting();
        System.out.printf("✅ Synchronized 10 GB Template Storage Accounting for %d templates!%n", templates.size());
    }

    private void seedCategories() {
        List<TemplateCategory> categories = List.of(
                new TemplateCategory("festivals", "सण आणि उत्सव", "Sparkles", 1),
                new TemplateCategory("business", "व्यवसाय जाहिराती", "Briefcase", 2),
                new TemplateCategory("offers", "दुकानांचे ऑफर्स आणि सेल", "Tag", 3),
                new TemplateCategory("birthday", "वाढदिवस आणि शुभेच्छा", "Gift", 4),
                new TemplateCategory("wedding", "लग्नपत्रिका आणि निमंत्रणे", "Heart", 5),
                new TemplateCategory("social", "सोशल मीडिया पोस्ट", "Share2", 6),
                new TemplateCategory("education", "शिक्षण आणि शैक्षणिक कार्यक्रम", "BookOpen", 7),
                new TemplateCategory("suvichar", "प्रेरणादायी सुविचार", "Quote", 8)
        );
        categoryRepository.saveAll(categories);
    }

    private String buildCanvas(String bgColor, String headerText, String headerColor, String subText, String subColor,
                               String footerText, String footerColor, String accentColor) {
        return "{\n" +
                "  \"version\": \"5.3.0\",\n" +
                "  \"objects\": [\n" +
                "    {\n" +
                "      \"type\": \"rect\",\n" +
                "      \"left\": 0, \"top\": 0, \"width\": 1080, \"height\": 1080,\n" +
                "      \"fill\": \"" + bgColor + "\", \"selectable\": false\n" +
                "    },\n" +
                "    {\n" +
                "      \"type\": \"rect\",\n" +
                "      \"left\": 40, \"top\": 40, \"width\": 1000, \"height\": 1000,\n" +
                "      \"fill\": \"transparent\", \"stroke\": \"" + accentColor + "\", \"strokeWidth\": 4, \"selectable\": false\n" +
                "    },\n" +
                "    {\n" +
                "      \"type\": \"rect\",\n" +
                "      \"left\": 140, \"top\": 180, \"width\": 800, \"height\": 8,\n" +
                "      \"fill\": \"" + accentColor + "\", \"selectable\": true\n" +
                "    },\n" +
                "    {\n" +
                "      \"type\": \"textbox\",\n" +
                "      \"left\": 90, \"top\": 230, \"width\": 900,\n" +
                "      \"text\": \"" + headerText + "\",\n" +
                "      \"fontSize\": 58, \"fontFamily\": \"Mukta\", \"fontWeight\": \"bold\",\n" +
                "      \"fill\": \"" + headerColor + "\", \"textAlign\": \"center\", \"selectable\": true\n" +
                "    },\n" +
                "    {\n" +
                "      \"type\": \"textbox\",\n" +
                "      \"left\": 110, \"top\": 460, \"width\": 860,\n" +
                "      \"text\": \"" + subText + "\",\n" +
                "      \"fontSize\": 36, \"fontFamily\": \"Noto Sans Devanagari\", \"fontWeight\": \"normal\",\n" +
                "      \"fill\": \"" + subColor + "\", \"textAlign\": \"center\", \"selectable\": true\n" +
                "    },\n" +
                "    {\n" +
                "      \"type\": \"rect\",\n" +
                "      \"left\": 240, \"top\": 820, \"width\": 600, \"height\": 80,\n" +
                "      \"fill\": \"" + accentColor + "\", \"rx\": 16, \"ry\": 16, \"selectable\": true\n" +
                "    },\n" +
                "    {\n" +
                "      \"type\": \"textbox\",\n" +
                "      \"left\": 260, \"top\": 840, \"width\": 560,\n" +
                "      \"text\": \"" + footerText + "\",\n" +
                "      \"fontSize\": 28, \"fontFamily\": \"Mukta\", \"fontWeight\": \"bold\",\n" +
                "      \"fill\": \"" + footerColor + "\", \"textAlign\": \"center\", \"selectable\": true\n" +
                "    }\n" +
                "  ]\n" +
                "}";
    }

    private void seedTemplates() {
        List<Template> templates = new ArrayList<>();

        // 1. गणेशोत्सव
        templates.add(new Template(
                "गणेशोत्सव आगमन व मंगलमय शुभेच्छा",
                "गणपती बाप्पाच्या आगमनानिमित्त आकर्षक व भक्तीमय सोशल मीडिया पोस्टर",
                "festivals", "FREE", 1080, 1080, null,
                buildCanvas("#FFF7ED", "|| गणपती बाप्पा मोरया ||", "#C2410C",
                        "बुद्धीची देवता, विघ्नहर्ता श्री गणेशाचे आपल्या घरी सहर्ष आगमन!\\nआपणा सर्वांना गणेशोत्सवाच्या हार्दिक शुभेच्छा.",
                        "#7C2D12", "निमंत्रक: समस्त परिवार व मित्रपरिवार", "#FFFFFF", "#EA580C"),
                "गणेशोत्सव, बाप्पा, सण, शुभेच्छा, उत्सव"
        ));

        // 2. दिवाळी
        templates.add(new Template(
                "दीपावली व धनत्रयोदशी मंगलमय शुभेच्छा",
                "दिवाळी सणासाठी प्रकाशमय व समृद्धीचे संदेश देणारे खास डिझाईन",
                "festivals", "FREE", 1080, 1080, null,
                buildCanvas("#1E1B4B", "शुभ दीपावली", "#FDE047",
                        "तेजोमय दिव्यांच्या प्रकाशाने आपले आयुष्य उजळून निघो!\\nआपणास व आपल्या कुटुंबियांस दिवाळीच्या मनःपूर्वक शुभेच्छा.",
                        "#F8FAFC", "दीपावलीच्या लाख लाख शुभेच्छा!", "#1E1B4B", "#EAB308"),
                "दिवाळी, लक्ष्मीपूजन, सण, दीप, उत्सव"
        ));

        // 3. शिवजयंती
        templates.add(new Template(
                "छत्रपती शिवाजी महाराज जयंती उत्सव",
                "शिवजयंती निमित्त पराक्रम व स्वाभिमानाचे भव्य भगवे डिझाईन",
                "festivals", "FREE", 1080, 1080, null,
                buildCanvas("#431407", "|| जय भवानी जय शिवाजी ||", "#FDBA74",
                        "प्रौढ प्रताप पुरंदर, क्षत्रियकुलावतंस,\\nसिंहासनाधीश्वर, श्रीमंत छत्रपती शिवाजी महाराज जयंती निमित्त त्रिवार वंदन!",
                        "#FFEDD5", "शिवजयंतीच्या शिवमय शुभेच्छा!", "#431407", "#F97316"),
                "शिवजयंती, छत्रपती, शिवाजी महाराज, स्वराज्य"
        ));

        // 4. गुढीपाडवा
        templates.add(new Template(
                "गुढीपाडवा व मराठी नववर्ष स्वागत",
                "हिंदू नववर्ष व गुढीपाडव्याच्या पवित्र पर्वावर मांगल्याचे डिझाईन",
                "festivals", "FREE", 1080, 1080, null,
                buildCanvas("#FEFCE8", "गुढीपाडवा व नववर्ष शुभेच्छा", "#A16207",
                        "उभारून आनंदाची गुढी, करू नववर्षाचे स्वागत!\\nमराठी नववर्ष आपणास सुख, समृद्धी आणि आरोग्याचे जावो.",
                        "#713F12", "नववर्षाभिनंदन!", "#FFFFFF", "#CA8A04"),
                "गुढीपाडवा, नववर्ष, सण, चैत्र"
        ));

        // 5. मकर संक्रांत
        templates.add(new Template(
                "मकर संक्रांत - तिळगुळ घ्या गोड गोड बोला",
                "संक्रांतीच्या सणासाठी पारंपरिक व मनमोहक शुभेच्छा पोस्टर",
                "festivals", "FREE", 1080, 1080, null,
                buildCanvas("#18181B", "मकर संक्रांतीच्या गोड शुभेच्छा", "#FACC15",
                        "तिळगुळ घ्या, गोड गोड बोला!\\nनात्यातील गोडवा आणि आपुलकी अशीच वृद्धिंगत होत राहो.",
                        "#FAFAFA", "भोगी व संक्रांत शुभेच्छा!", "#09090B", "#F59E0B"),
                "संक्रांत, पतंग, तिळगुळ, सण"
        ));

        // 6. डिजिटल मार्केटिंग
        templates.add(new Template(
                "डिजिटल मार्केटिंग व सोशल मीडिया सेवा जाहिरात",
                "आपल्या स्थानिक व्यवसायाची ऑनलाइन वाढ करण्यासाठी आधुनिक पोस्टर",
                "business", "FREE", 1080, 1080, null,
                buildCanvas("#0F172A", "आपला व्यवसाय ऑनलाइन न्या!", "#38BDF8",
                        "सोशल मीडिया जाहिराती, वेबसाइट डिझाईन व ब्रँडिंग सेवा!\\nआजच संपर्क करा आणि ग्राहकांची संख्या दुप्पट करा.",
                        "#E2E8F0", "संपर्क: ९८XXXXXXXX | आजच कॉल करा", "#0F172A", "#0EA5E9"),
                "व्यवसाय, डिजिटल, मार्केटिंग, ब्रँडिंग, सेवा"
        ));

        // 7. भव्य दुकान उद्घाटन
        templates.add(new Template(
                "नवीन भव्य शोरूमचा उद्घाटन सोहळा",
                "नवीन दुकान किंवा ऑफिस उद्घाटनासाठी प्रीमियम सोहळा आमंत्रण",
                "business", "PRO", 1080, 1080, null,
                buildCanvas("#1E293B", "|| श्री गणेशाय नमः ||\\nभव्य शुभारंभ सोहळा", "#FCD34D",
                        "आमच्या नवीन वस्त्रदालनाचा उद्घाटन सोहळा शुभहस्ते संपन्न होत आहे.\\nआपली उपस्थिती प्रार्थनीय आहे.",
                        "#F1F5F9", "तारीख: १५ नोव्हेंबर | वेळ: सकाळी १० वा.", "#1E293B", "#F59E0B"),
                "उद्घाटन, शुभारंभ, व्यवसाय, निमंत्रण"
        ));

        // 8. कोल्हापुरी हॉटेल
        templates.add(new Template(
                "अस्सल कोल्हापुरी जेवणावळ व थाळी",
                "हॉटेल व रेस्टॉरंटच्या खवय्यांसाठी चवदार मेनू जाहिरात",
                "business", "FREE", 1080, 1080, null,
                buildCanvas("#450A0A", "अस्सल गावरान चव!", "#FCA5A5",
                        "तांबडा-पांढरा रस्सा, चुलीवरची भाकरी आणि झणझणीत मटण थाळी!\\nएकदा चव चाखाल तर नेहमीच याल.",
                        "#FEF2F2", "हॉटेल स्वाद कोल्हापूर | टेबल बुक करा", "#FFFFFF", "#DC2626"),
                "हॉटेल, जेवण, थाळी, चव, व्यवसाय"
        ));

        // 9. दिवाळी महासेल
        templates.add(new Template(
                "वस्त्रदुकान भव्य ५०% दिवाळी महासेल",
                "दुकानातील कपडे व साड्यांच्या सवलतीसाठी ठळक सेल पोस्टर",
                "offers", "FREE", 1080, 1080, null,
                buildCanvas("#7F1D1D", "भव्य महासेल! थेट ५०% सूट", "#FEF08A",
                        "सर्व प्रकारच्या पैठणी, सिल्क साड्या आणि मेन्स वेअरवर प्रचंड डिस्काउंट!\\nमर्यादित कालावधीसाठी ऑफर लागू.",
                        "#FFFFFF", "ऑफर फक्त या रविवारीच!", "#7F1D1D", "#EAB308"),
                "सेल, डिस्काउंट, ऑफर, कपडे, दुकान"
        ));

        // 10. किराणा सुपरमार्ट
        templates.add(new Template(
                "किराणा सुपरमार्ट विकेंड बंपर डिस्काउंट",
                "स्थानिक किराणा दुकानासाठी ताजे धान्य व किराणा माल बचत ऑफर",
                "offers", "PRO", 1080, 1080, null,
                buildCanvas("#064E3B", "किराणा सुपरमार्ट बचत मेळावा", "#6EE7B7",
                        "सर्व डाळी, तेल, तांदूळ आणि घरगुती वस्तूंवर होलसेल दर!\\n₹२००० च्या खरेदीवर मोफत होम डिलिव्हरी.",
                        "#ECFDF5", "घरपोच सेवेसाठी संपर्क करा", "#064E3B", "#10B981"),
                "किराणा, डिस्काउंट, सुपरमार्ट, ऑफर"
        ));

        // 11. ज्यूस सेंटर
        templates.add(new Template(
                "नैसर्गिक ताजे ज्यूस व आईस्क्रीम ऑफर",
                "उन्हाळी थंडगार पेय आणि ज्यूस सेंटरसाठी आकर्षक बॅनर",
                "offers", "FREE", 1080, 1080, null,
                buildCanvas("#78350F", "१००% नैसर्गिक ताजे ज्यूस!", "#FDE68A",
                        "हापूस मँगो शेक, मोसंबी, डाळिंब व थंडगार मलाई कुल्फी!\\nबाय १ गेट १ फ्री - विशेष उन्हाळी ऑफर.",
                        "#FFFBEB", "आजच भेट द्या - शीतल ज्यूस बार", "#78350F", "#D97706"),
                "ज्यूस, आईस्क्रीम, ऑफर, उन्हाळा"
        ));

        // 12. वाढदिवस हार्दिक शुभेच्छा
        templates.add(new Template(
                "वाढदिवसाच्या मनःपूर्वक हार्दिक शुभेच्छा",
                "भाऊ, मित्र व सहकाऱ्यांसाठी सन्मानजनक व उत्साही वाढदिवस बॅनर",
                "birthday", "FREE", 1080, 1080, null,
                buildCanvas("#172554", "वाढदिवसाच्या हार्दिक शुभेच्छा!", "#93C5FD",
                        "आमचे मार्गदर्शक व लाडके मित्र यांना वाढदिवसाच्या अनंत शुभेच्छा!\\nआपणास उदंड व निरोगी दीर्घायुष्य लाभो हीच ईश्वरचरणी प्रार्थना.",
                        "#EFF6FF", "शुभेच्छुक: समस्त मित्र परिवार", "#172554", "#3B82F6"),
                "वाढदिवस, शुभेच्छा, मित्र, अभीष्टचिंतन"
        ));

        // 13. पहिला वाढदिवस
        templates.add(new Template(
                "चिमुकल्याचा पहिला वाढदिवस सोहळा",
                "बाळाच्या १ ल्या वाढदिवसासाठी गोड व आकर्षक सोहळा आमंत्रण",
                "birthday", "PRO", 1080, 1080, null,
                buildCanvas("#831843", "आमच्या लाडक्या परीचा १ ला वाढदिवस", "#FBCFE8",
                "हसतमुखाने घरात आनंद पसरवणाऱ्या आमच्या लेकीचा पहिला वाढदिवस!\\nआपले शुभाशीर्वाद देण्यासाठी सहकुटुंब यावे ही नम्र विनंती.",
                "#FDF2F8", "वेळ: संध्याकाळी ७ वा. | स्नेहभोजन", "#831843", "#EC4899"),
                "वाढदिवस, बाळ, आमंत्रण, सोहळा"
        ));

        // 14. अभीष्टचिंतन सोहळा
        templates.add(new Template(
                "ज्येष्ठ नागरिकांचा अमृत महोत्सवी अभीष्टचिंतन",
                "७५ व्या किंवा ६० व्या वाढदिवसानिमित्त आदरयुक्त गौरव पोस्टर",
                "birthday", "FREE", 1080, 1080, null,
                buildCanvas("#312E81", "अमृत महोत्सव अभीष्टचिंतन सोहळा", "#C7D2FE",
                        "कर्तृत्ववान व्यक्तिमत्त्व, आमचे आधारस्तंभ यांना अमृत महोत्सवी वाढदिवसाच्या हार्दिक शुभेच्छा!\\nप्रार्थना आपणास उत्तम आरोग्य लाभो.",
                        "#EEF2FF", "विनम्र अभिवादन: समस्त परिवार", "#312E81", "#6366F1"),
                "अभीष्टचिंतन, अमृत महोत्सव, वाढदिवस, गौरव"
        ));

        // 15. शुभविवाह निमंत्रण
        templates.add(new Template(
                "शुभविवाह मंगल निमंत्रण पत्रिका",
                "पारंपरिक मराठी लग्नासाठी अत्यंत देखणी व शुद्ध देवनागरी पत्रिका",
                "wedding", "PRO", 1080, 1080, null,
                buildCanvas("#581C87", "|| शुभविवाह ||\\nसप्रेम निमंत्रण", "#E9D5FF",
                        "चि. प्रसाद (सुपुत्र श्री. सुरेश जोशी)\\nआणि\\nचि.सौ.कां. सायली (सुपुत्री श्री. प्रकाश कुलकर्णी)\\nयांचा शुभविवाह सोहळा संपन्न होत आहे.",
                        "#FAF5FF", "लग्न मुहूर्त: दुपारी १२ वाजून २४ मिनिटे", "#581C87", "#A855F7"),
                "लग्न, विवाह, पत्रिका, निमंत्रण"
        ));

        // 16. साखरपुडा सोहळा
        templates.add(new Template(
                "साखरपुडा सोहळा सस्नेह निमंत्रण",
                "वाङ्निश्चय व रिंग सेरेमनीसाठी खास सोहळा निमंत्रण पत्रिका",
                "wedding", "FREE", 1080, 1080, null,
                buildCanvas("#134E4A", "|| वाङ्निश्चय सोहळा ||", "#99F6E4",
                        "दोन मनांचे आणि दोन कुटुंबांचे अतूट मिलन!\\nआमच्या साखरपुडा सोहळ्यास आपली उपस्थिती प्रार्थनीय आहे.",
                        "#F0FDFA", "स्थळ: मंगल कार्यालय, पुणे", "#134E4A", "#14B8A6"),
                "साखरपुडा, लग्न, आमंत्रण, सोहळा"
        ));

        // 17. Instagram प्रेरक पोस्ट
        templates.add(new Template(
                "Instagram प्रेरक सुविचार - यशाची गुरुकिल्ली",
                "सोशल मीडियासाठी दररोज वापरता येणारे सुंदर व्हिज्युअल कोट्स",
                "social", "FREE", 1080, 1080, null,
                buildCanvas("#111827", "स्वप्न मोठी बघा, कष्ट प्रामाणिक करा!", "#38BDF8",
                        "संकटांवर अशी मात करा की, विजयाचा आवाज साऱ्या जगाला ऐकू गेला पाहिजे!\\nसकारात्मक विचार, जिद्द आणि सातत्य हेच यशाचे रहस्य आहे.",
                        "#F9FAFB", "@MarathiDesignStudio | फॉलो करा", "#111827", "#38BDF8"),
                "सुविचार, इंस्टाग्राम, सोशल मीडिया, प्रेरणा"
        ));

        // 18. WhatsApp Status
        templates.add(new Template(
                "WhatsApp Status - शुभ सकाळ मंगलमय विचार",
                "सकाळच्या ताज्या प्रसंगासाठी सकारात्मक देवनागरी स्टेटस",
                "social", "FREE", 1080, 1080, null,
                buildCanvas("#14532D", "|| शुभ प्रभात ||", "#BBF7D0",
                        "सकाळची नवी किरणे आपल्या जीवनात नवा आनंद, नवे यश आणि आरोग्य घेऊन येवोत!\\nआपला आजचा दिवस अतिशय आनंदात जावो.",
                        "#F0FDF4", "आनंदी रहा, हसत रहा!", "#14532D", "#22C55E"),
                "व्हॉट्सॲप, स्टेटस, शुभ सकाळ, प्रेरणा"
        ));

        // 19. शाळा प्रवेश सुरू
        templates.add(new Template(
                "शाळा व महाविद्यालय नवीन शैक्षणिक प्रवेश सुरू",
                "शैक्षणिक संस्था, कोचिंग क्लासेस व अकॅडमीसाठी जाहिरात बॅनर",
                "education", "FREE", 1080, 1080, null,
                buildCanvas("#1E3A8A", "नवीन शैक्षणिक वर्षासाठी प्रवेश सुरू!", "#BFDBFE",
                        "दर्जेदार शिक्षण, अनुभवी शिक्षक वर्ग, डिजिटल क्लासरूम्स आणि क्रीडा सुविधा!\\nइयत्ता १ ली ते १० वी प्रवेश मर्यादित जागा.",
                        "#EFF6FF", "आजच आपला प्रवेश निश्चित करा | संपर्क करा", "#1E3A8A", "#2563EB"),
                "शिक्षण, शाळा, प्रवेश, क्लासेस, अकॅडमी"
        ));

        // 20. स्पर्धा परीक्षा बॅच
        templates.add(new Template(
                "MPSC व स्पर्धा परीक्षा नवीन फाउंडेशन बॅच",
                "स्पर्धा परीक्षा मार्गदर्शनासाठी व्यावसायिक व ठळक डिझाईन",
                "education", "PRO", 1080, 1080, null,
                buildCanvas("#3B0764", "MPSC राज्यसेवा / पोलीस भरती", "#F5D0FE",
                        "अधिकारी होण्याचे स्वप्न आता सत्यात उतरा!\\nतज्ज्ञ मार्गदर्शकांचे लेक्चर्स, टेस्ट सिरीज व परिपूर्ण नोट्स.",
                        "#FAF5FF", "डेमो लेक्चर्ससाठी नोंदणी करा", "#3B0764", "#C026D3"),
                "स्पर्धा परीक्षा, MPSC, भरती, शिक्षण"
        ));

        // 21. संत तुकाराम महाराज सुविचार
        templates.add(new Template(
                "संत तुकाराम महाराज - वृक्षवल्ली आम्हा सोयरी",
                "निसर्ग व अध्यात्माची शिकवण देणारे संतांचे विचार पोस्टर",
                "suvichar", "FREE", 1080, 1080, null,
                buildCanvas("#292524", "वृक्षवल्ली आम्हा सोयरी वनचरे", "#FDE047",
                        "पक्षीही सुस्वरे आळविती!\\nनिसर्गाचे संवर्धन करूया आणि भावी पिढीसाठी हिरवेगार महाराष्ट्र घडवूया.",
                        "#FAFAF9", "संत तुकाराम महाराज विचार", "#292524", "#EAB308"),
                "सुविचार, संत, तुकाराम महाराज, निसर्ग, अभंग"
        ));

        // 22. स्वामी विवेकानंद विचार
        templates.add(new Template(
                "स्वामी विवेकानंद - उठा, जागे व्हा आणि ध्येय गाठा!",
                "युवकांना ऊर्जा आणि आत्मविश्वास देणारा सुविचार",
                "suvichar", "FREE", 1080, 1080, null,
                buildCanvas("#1C1917", "उठा, जागे व्हा!", "#F97316",
                        "आणि जोपर्यंत ध्येय प्राप्त होत नाही,\\nतोपर्यंत थांबू नका!\\nस्वतःवर विश्वास ठेवा, विश्वातील सर्व शक्ती तुमच्यातच आहे.",
                        "#F5F5F4", "स्वामी विवेकानंद विचार", "#1C1917", "#EA580C"),
                "सुविचार, स्वामी विवेकानंद, प्रेरणा, युवा"
        ));

        if (templateRepository.count() == 0) {
            templateRepository.saveAll(templates);
        }

        // Additional Bilingual & English Templates
        List<Template> bilingualTemplates = new ArrayList<>();

        // 23. GRAND OPENING — New Store Launch (Bilingual)
        bilingualTemplates.add(new Template(
                "GRAND OPENING — New Store Launch (Bilingual)",
                "Modern bilingual grand opening banner with English headline and Marathi invitation details",
                "business", "FREE", 1080, 1080, null,
                buildCanvas("#0F172A", "GRAND OPENING\\n॥ भव्य शुभारंभ सोहळा ॥", "#F59E0B",
                        "Join us for the grand inauguration of our flagship showroom!\\nविशेष उद्घाटन सवलत व आकर्षक भेटवस्तू. All are cordially invited.",
                        "#F8FAFC", "DATE: 15 NOVEMBER | TIME: 10:00 AM ONWARDS", "#0F172A", "#EAB308"),
                "Grand Opening, शुभारंभ, उद्घाटन, Store, English, Bilingual"
        ));

        // 24. MEGA FESTIVAL SALE (Bilingual)
        bilingualTemplates.add(new Template(
                "MEGA FESTIVAL SALE — Up to 50% Off (Bilingual)",
                "High-impact discount sale poster with bold English typography and Marathi offer highlights",
                "offers", "PRO", 1080, 1080, null,
                buildCanvas("#7F1D1D", "MEGA FESTIVAL SALE\\n💥 थेट ५०% महाबचत सवलत 💥", "#FDE047",
                        "Exclusive festive discounts across all designer apparel & accessories!\\nएकावर एक मोफत ऑफर मर्यादित कालावधीसाठी.",
                        "#FEF2F2", "LIMITED TIME OFFER | VISIT STORE TODAY", "#7F1D1D", "#EF4444"),
                "Mega Sale, 50% Off, सवलत, ऑफर, English, Marathi, Bilingual"
        ));

        // 25. LUXURY REAL ESTATE (Bilingual)
        bilingualTemplates.add(new Template(
                "LUXURY HOMES & VILLAS — Prime Location (Bilingual)",
                "Premium real estate marketing flyer with English headline and Marathi amenities description",
                "business", "PRO", 1080, 1080, null,
                buildCanvas("#1E1B4B", "LUXURY 2 & 3 BHK RESIDENCES", "#38BDF8",
                        "आपले स्वप्नातील घर आता पुण्यात!\\nModern Clubhouse, Swimming Pool, 24x7 Security & Lush Green Landscaping.",
                        "#F0F9FF", "BOOKING OPEN: CALL +91 98XXXXXXXX", "#1E1B4B", "#0284C7"),
                "Real Estate, Luxury Homes, 2 BHK, पुणे, फ्लॅट, English"
        ));

        // 26. WEDDING INVITATION — Save The Date (Bilingual)
        bilingualTemplates.add(new Template(
                "WEDDING INVITATION — Save The Date (Bilingual)",
                "Elegant royal wedding announcement card blending English elegance with Devanagari tradition",
                "wedding", "FREE", 1080, 1080, null,
                buildCanvas("#450A0A", "SAVE THE DATE\\n॥ शुभ विवाह ॥", "#FCD34D",
                        "Cordially invite you and your family to celebrate the auspicious wedding ceremony.\\nआपली कृपाभिलाषी उपस्थिती प्रार्थनीय आहे.",
                        "#FFFBEB", "RECEPTION & CEREMONY DETAILS INSIDE", "#450A0A", "#D97706"),
                "Wedding, Save The Date, शुभ विवाह, निमंत्रण, Bilingual"
        ));

        // 27. FITNESS & GYM — New Year Transformation (English)
        bilingualTemplates.add(new Template(
                "FITNESS REVOLUTION 2026 — Gym & Health Club (English)",
                "Dynamic fitness and personal training advertisement poster for gyms and wellness studios",
                "social", "FREE", 1080, 1080, null,
                buildCanvas("#18181B", "FITNESS REVOLUTION 2026", "#22C55E",
                        "Transform your body with certified trainers, modern equipment, and personalized diet plans.\\nJoin today and get 3 months free!",
                        "#F4F4F5", "DAILY 6:00 AM - 10:00 PM | CALL TO JOIN", "#18181B", "#16A34A"),
                "Fitness, Gym, Workout, Health, English, Social"
        ));

        // 28. INSTAGRAM STORY — Daily Motivation & Success (Bilingual)
        bilingualTemplates.add(new Template(
                "DAILY MOTIVATION — Success Starts Today (Bilingual)",
                "Inspirational Instagram story and WhatsApp status graphic with bilingual thought",
                "social", "FREE", 1080, 1080, null,
                buildCanvas("#111827", "SUCCESS STARTS TODAY\\nध्येय गाठण्यासाठी प्रयत्न हवेत!", "#F59E0B",
                        "Hard work and dedication always pave the way to greatness.\\nकष्टाला पर्याय नाही आणि सातत्याला तोड नाही.",
                        "#F9FAFB", "DAILY THOUGHT & MOTIVATION", "#111827", "#F59E0B"),
                "Motivation, Instagram Story, WhatsApp Status, सुविचार, English"
        ));

        templateRepository.saveAll(bilingualTemplates);
    }
}
