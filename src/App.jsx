import { useState, useEffect, useCallback, useMemo, createContext, useContext } from "react";
import { Search, Filter, ChevronRight, ChevronDown, Globe, MapPin, Award, Phone, Mail, ExternalLink, Menu, X, Check, Star, Leaf, ArrowRight, ArrowLeft, Calendar, BookOpen, Shield, Users, TrendingUp, Send, Eye, Clock, Package, Anchor, CreditCard, Building, Upload, Plus, Minus, Info, CheckCircle, AlertCircle, ChevronUp, BarChart3, Wheat } from "lucide-react";

// ===== LANGUAGE CONTEXT =====
const LangContext = createContext();
const useLang = () => useContext(LangContext);
const t = (lang, ar, en) => lang === "ar" ? ar : en;

// ===== SEED DATA =====
const exporters = [
  {
    id: 1, slug: "delta-gold-citrus",
    nameEn: "Delta Gold Citrus", nameAr: "دلتا جولد للموالح",
    govEn: "Ismailia", govAr: "الإسماعيلية", est: 1998, verified: true, featured: true,
    bioEn: "Premium Valencia and Navel oranges from the heart of Ismailia's citrus belt. Exporting to over 25 countries across Europe, Russia, and the Gulf with full traceability and cold chain management.",
    bioAr: "برتقال فالنسيا وأبو سرة فاخر من قلب حزام موالح الإسماعيلية. نصدّر إلى أكثر من 25 دولة في أوروبا وروسيا والخليج مع تتبّع كامل وسلسلة تبريد متكاملة.",
    cropsEn: ["Citrus"], cropsAr: ["موالح"], varieties: ["Valencia", "Navel", "Mandarin", "Lemon"],
    certs: ["GLOBALG.A.P.", "HACCP", "ISO 22000"],
    marketsEn: ["EU", "Russia", "Gulf"], marketsAr: ["الاتحاد الأوروبي", "روسيا", "الخليج"], volume: ">10,000",
    email: "export@deltagold.eg", phone: "+201001234567", whatsapp: "201001234567",
    capacity: { area: 2500, production: 45000, export: 32000, packhouses: 3, coldStorage: true, iqf: false, staff: 180 },
    portsEn: ["Alexandria", "Damietta"], portsAr: ["الإسكندرية", "دمياط"],
    incoterms: ["FOB", "CIF", "CFR"],
    payment: ["LC at Sight", "TT in Advance"], currencies: ["USD", "EUR"],
    months: [0,0,0,0,0,0,0,0,0,1,2,2]
  },
  {
    id: 2, slug: "nile-valley-fresh",
    nameEn: "Nile Valley Fresh Produce", nameAr: "وادي النيل للحاصلات الطازجة",
    govEn: "Beheira", govAr: "البحيرة", est: 2007, verified: true, featured: true,
    bioEn: "Leading exporter of premium potatoes and onions from Beheira to major European retail chains. BRC Grade AA certified with dedicated quality control laboratory.",
    bioAr: "أكبر مُصدّر بطاطس وبصل فاخر من البحيرة إلى سلاسل التجزئة الأوروبية الكبرى. حاصلون على شهادة BRC درجة AA مع معمل رقابة جودة مخصص.",
    cropsEn: ["Potatoes", "Onions & Garlic"], cropsAr: ["بطاطس", "بصل وثوم"],
    varieties: ["Spunta", "Hermes", "Lady Rosetta", "Red Onion", "White Onion"],
    certs: ["GLOBALG.A.P.", "BRC GS", "HACCP"],
    marketsEn: ["EU", "UK", "Gulf"], marketsAr: ["الاتحاد الأوروبي", "المملكة المتحدة", "الخليج"], volume: ">10,000",
    email: "sales@nilevalley.eg", phone: "+201112345678", whatsapp: "201112345678",
    capacity: { area: 4000, production: 60000, export: 42000, packhouses: 4, coldStorage: true, iqf: false, staff: 250 },
    portsEn: ["Alexandria", "Damietta"], portsAr: ["الإسكندرية", "دمياط"],
    incoterms: ["FOB", "CIF"],
    payment: ["LC at Sight", "LC 30-60 Days", "TT in Advance"], currencies: ["USD", "EUR", "GBP"],
    months: [2,2,2,1,1,0,0,0,0,0,1,2]
  },
  {
    id: 3, slug: "nubaria-agro",
    nameEn: "Nubaria Agro Exports", nameAr: "النوبارية للصادرات الزراعية",
    govEn: "Nubaria", govAr: "النوبارية", est: 2012, verified: true, featured: true,
    bioEn: "Grapes and strawberries from reclaimed desert land with full product traceability. Our vertically integrated operation covers cultivation, packing, and cold chain logistics.",
    bioAr: "عنب وفراولة من أراضٍ مستصلحة مع تتبّع كامل للمنتج. عملياتنا المتكاملة رأسياً تغطي الزراعة والتعبئة واللوجستيات المبرّدة.",
    cropsEn: ["Grapes", "Strawberries"], cropsAr: ["عنب", "فراولة"],
    varieties: ["Flame Seedless", "Crimson", "Superior", "Festival Strawberry"],
    certs: ["GLOBALG.A.P.", "HACCP", "ISO 22000"],
    marketsEn: ["EU", "UK", "Gulf", "Asia"], marketsAr: ["الاتحاد الأوروبي", "المملكة المتحدة", "الخليج", "آسيا"], volume: "2,000–10,000",
    email: "info@nubariaagro.com", phone: "+201223456789", whatsapp: "201223456789",
    capacity: { area: 1800, production: 18000, export: 12000, packhouses: 2, coldStorage: true, iqf: false, staff: 120 },
    portsEn: ["Alexandria"], portsAr: ["الإسكندرية"],
    incoterms: ["FOB", "CIF", "CFR"],
    payment: ["LC at Sight", "TT in Advance"], currencies: ["USD", "EUR"],
    months: [0,0,0,0,2,2,2,1,0,0,1,1]
  },
  {
    id: 4, slug: "luxor-date-house",
    nameEn: "Luxor Date House", nameAr: "بيت تمور الأقصر",
    govEn: "Luxor", govAr: "الأقصر", est: 2015, verified: true, featured: true,
    bioEn: "Hand-picked Medjool, Siwy, and Sukkari dates from Upper Egypt's finest palm groves. Organic EU certified with traditional harvesting methods meeting modern quality standards.",
    bioAr: "تمور مجدول وسيوي وسكري مقطوفة يدوياً من أفضل نخيل صعيد مصر. حاصلون على شهادة عضوية أوروبية مع طرق حصاد تقليدية تلبي معايير الجودة الحديثة.",
    cropsEn: ["Dates"], cropsAr: ["تمور"],
    varieties: ["Medjool", "Siwy", "Sukkari", "Barhi"],
    certs: ["Organic EU", "HACCP", "ISO 22000"],
    marketsEn: ["EU", "Gulf", "Asia", "Americas"], marketsAr: ["الاتحاد الأوروبي", "الخليج", "آسيا", "الأمريكتان"], volume: "500–2,000",
    email: "dates@luxordatehouse.com", phone: "+201098765432", whatsapp: "201098765432",
    capacity: { area: 800, production: 3500, export: 2200, packhouses: 1, coldStorage: true, iqf: false, staff: 65 },
    portsEn: ["Sokhna", "Alexandria"], portsAr: ["السخنة", "الإسكندرية"],
    incoterms: ["FOB", "EXW", "DAP"],
    payment: ["TT in Advance", "LC at Sight"], currencies: ["USD", "EUR", "AED"],
    months: [0,0,0,0,0,0,0,1,2,2,2,1]
  },
  {
    id: 5, slug: "alex-frozen-foods",
    nameEn: "Alexandria Frozen Foods", nameAr: "الإسكندرية للأغذية المجمدة",
    govEn: "Alexandria", govAr: "الإسكندرية", est: 2005, verified: true, featured: true,
    bioEn: "IQF frozen vegetables and herbs from a BRC-certified facility. Supplying European food service and retail with consistent quality year-round.",
    bioAr: "خضروات وأعشاب مجمدة IQF من منشأة معتمدة BRC. نورّد لقطاع الخدمات الغذائية والتجزئة الأوروبية بجودة ثابتة على مدار العام.",
    cropsEn: ["Frozen Vegetables", "Fresh Herbs"], cropsAr: ["خضروات مجمدة", "أعشاب طازجة"],
    varieties: ["Green Beans", "Broccoli", "Mixed Vegetables", "Basil", "Mint", "Dill"],
    certs: ["BRC GS", "HACCP", "ISO 22000"],
    marketsEn: ["EU", "UK", "Americas"], marketsAr: ["الاتحاد الأوروبي", "المملكة المتحدة", "الأمريكتان"], volume: "2,000–10,000",
    email: "export@alexfrozen.com", phone: "+201234567890", whatsapp: "201234567890",
    capacity: { area: 1200, production: 15000, export: 11000, packhouses: 2, coldStorage: true, iqf: true, staff: 200 },
    portsEn: ["Alexandria"], portsAr: ["الإسكندرية"],
    incoterms: ["FOB", "CIF"],
    payment: ["LC at Sight", "LC 30-60 Days"], currencies: ["USD", "EUR", "GBP"],
    months: [2,2,2,2,2,2,2,2,2,2,2,2]
  },
  {
    id: 6, slug: "minya-citrus",
    nameEn: "Minya Citrus Co.", nameAr: "المنيا للموالح",
    govEn: "Minya", govAr: "المنيا", est: 2010, verified: true, featured: false,
    bioEn: "Fresh citrus from Upper Egypt's expanding agricultural frontier. Specializing in Valencia oranges, Navel, and premium lemons for Gulf and Eastern European markets.",
    bioAr: "موالح طازجة من الحدود الزراعية المتوسعة في صعيد مصر. متخصصون في برتقال فالنسيا وأبو سرة والليمون الفاخر لأسواق الخليج وشرق أوروبا.",
    cropsEn: ["Citrus"], cropsAr: ["موالح"],
    varieties: ["Valencia", "Navel", "Lemon"],
    certs: ["GLOBALG.A.P.", "HACCP"],
    marketsEn: ["Gulf", "Russia", "EU"], marketsAr: ["الخليج", "روسيا", "الاتحاد الأوروبي"], volume: "2,000–10,000",
    email: "info@minyacitrus.com", phone: "+201155566677", whatsapp: "201155566677",
    capacity: { area: 1500, production: 20000, export: 14000, packhouses: 2, coldStorage: true, iqf: false, staff: 95 },
    portsEn: ["Alexandria", "Sokhna"], portsAr: ["الإسكندرية", "السخنة"],
    incoterms: ["FOB", "CFR"],
    payment: ["LC at Sight", "TT in Advance"], currencies: ["USD", "EUR"],
    months: [0,0,0,0,0,0,0,0,0,1,2,2]
  },
  {
    id: 7, slug: "upper-egypt-agro",
    nameEn: "Upper Egypt Agro", nameAr: "صعيد مصر للزراعة",
    govEn: "Assiut", govAr: "أسيوط", est: 2014, verified: true, featured: false,
    bioEn: "Organic onions, garlic, and medicinal & aromatic herbs from the fertile lands of Assiut. EU Organic certified with a focus on chamomile, basil, and calendula for European pharmaceutical and food industries.",
    bioAr: "بصل وثوم عضوي ونباتات طبية وعطرية من أراضي أسيوط الخصبة. حاصلون على شهادة عضوية أوروبية مع تركيز على البابونج والريحان والأقحوان لصناعات الأدوية والأغذية الأوروبية.",
    cropsEn: ["Onions & Garlic", "Medicinal Plants"], cropsAr: ["بصل وثوم", "نباتات طبية وعطرية"],
    varieties: ["Red Onion", "Garlic", "Chamomile", "Basil", "Calendula", "Peppermint"],
    certs: ["ISO 22000", "HACCP", "Organic EU"],
    marketsEn: ["EU", "Gulf", "Asia"], marketsAr: ["الاتحاد الأوروبي", "الخليج", "آسيا"], volume: "500–2,000",
    email: "export@upperegyptagro.com", phone: "+201099887766", whatsapp: "201099887766",
    capacity: { area: 600, production: 4500, export: 2800, packhouses: 1, coldStorage: true, iqf: false, staff: 55 },
    portsEn: ["Alexandria", "Sokhna"], portsAr: ["الإسكندرية", "السخنة"],
    incoterms: ["FOB", "EXW"],
    payment: ["TT in Advance", "LC at Sight"], currencies: ["USD", "EUR"],
    months: [1,1,2,2,2,2,1,0,0,0,1,1]
  },
  {
    id: 8, slug: "sharqia-berry",
    nameEn: "Sharqia Berry Farms", nameAr: "مزارع الشرقية للفراولة",
    govEn: "Sharqia", govAr: "الشرقية", est: 2018, verified: true, featured: false,
    bioEn: "Fresh and IQF frozen strawberries from Egypt's strawberry capital. SMETA audited with ethical labor practices and full supply chain transparency.",
    bioAr: "فراولة طازجة ومجمدة IQF من عاصمة الفراولة المصرية. خضعنا لتدقيق SMETA مع ممارسات عمل أخلاقية وشفافية كاملة في سلسلة التوريد.",
    cropsEn: ["Strawberries"], cropsAr: ["فراولة"],
    varieties: ["Festival", "Fortuna", "Florida Beauty"],
    certs: ["GLOBALG.A.P.", "BRC GS", "SMETA"],
    marketsEn: ["EU", "UK", "Gulf"], marketsAr: ["الاتحاد الأوروبي", "المملكة المتحدة", "الخليج"], volume: "2,000–10,000",
    email: "sales@sharqiaberry.com", phone: "+201277788899", whatsapp: "201277788899",
    capacity: { area: 900, production: 12000, export: 8500, packhouses: 2, coldStorage: true, iqf: true, staff: 140 },
    portsEn: ["Alexandria", "Damietta"], portsAr: ["الإسكندرية", "دمياط"],
    incoterms: ["FOB", "CIF"],
    payment: ["LC at Sight", "TT in Advance", "LC 30-60 Days"], currencies: ["USD", "EUR", "GBP"],
    months: [2,2,2,1,0,0,0,0,0,0,1,2]
  }
];

const cropCategories = [
  { id: "citrus", en: "Citrus", ar: "موالح", descEn: "Valencia, Navel, Mandarin, Lemon, Grapefruit", descAr: "فالنسيا، أبو سرة، يوسفي، ليمون، جريب فروت", icon: "🍊" },
  { id: "potatoes", en: "Potatoes", ar: "بطاطس", descEn: "Spunta, Hermes, Lady Rosetta", descAr: "سبونتا، هيرميس، ليدي روزيتا", icon: "🥔" },
  { id: "onions-garlic", en: "Onions & Garlic", ar: "بصل وثوم", descEn: "Red onion, white onion, fresh & dried garlic", descAr: "بصل أحمر وأبيض، ثوم طازج ومجفف", icon: "🧅" },
  { id: "grapes", en: "Grapes", ar: "عنب", descEn: "Flame, Crimson, Superior seedless", descAr: "فليم، كريمزون، سوبيريور بدون بذور", icon: "🍇" },
  { id: "strawberries", en: "Strawberries", ar: "فراولة", descEn: "Fresh & IQF frozen", descAr: "طازجة ومجمدة IQF", icon: "🍓" },
  { id: "dates", en: "Dates", ar: "تمور", descEn: "Medjool, Siwy, Sukkari, Barhi", descAr: "مجدول، سيوي، سكري، برحي", icon: "🌴" },
  { id: "herbs", en: "Fresh Herbs", ar: "أعشاب طازجة", descEn: "Basil, mint, parsley, dill", descAr: "ريحان، نعناع، بقدونس، شبت", icon: "🌿" },
  { id: "frozen", en: "Frozen Vegetables", ar: "خضروات مجمدة", descEn: "Green beans, broccoli, mixed veg IQF", descAr: "فاصوليا خضراء، بروكلي، خضروات مشكلة", icon: "❄️" },
  { id: "sweet-potato", en: "Sweet Potatoes", ar: "بطاطا حلوة", descEn: "Beauregard, Bellevue — 2nd largest export to EU", descAr: "بيوريجارد، بيلفيو — ثاني أكبر صادرات لأوروبا", icon: "🍠" },
  { id: "medicinal", en: "Medicinal Plants", ar: "نباتات طبية وعطرية", descEn: "Chamomile, calendula, peppermint", descAr: "بابونج، أقحوان، نعناع فلفلي", icon: "💐" },
  { id: "mango", en: "Mangoes", ar: "مانجو", descEn: "Naomi, Keitt, Kent, Shelly", descAr: "ناعومي، كيت، كنت، شيلي", icon: "🥭" },
  { id: "pomegranate", en: "Pomegranates", ar: "رمان", descEn: "Wonderful, Baladi — rich in antioxidants", descAr: "وندرفول، بلدي — غني بمضادات الأكسدة", icon: "🫐" },
  { id: "other-citrus", en: "Mandarin & Lemon", ar: "يوسفي وليمون", descEn: "Murcott, Clementine, Adalia Lemon", descAr: "موركوت، كليمنتين، ليمون أضاليا", icon: "🍋" },
  { id: "peppers", en: "Peppers", ar: "فلفل", descEn: "Sweet bell peppers, hot chili peppers", descAr: "فلفل ألوان، فلفل حار", icon: "🌶️" },
  { id: "artichoke", en: "Artichokes", ar: "خرشوف", descEn: "Green & purple artichokes for EU markets", descAr: "خرشوف أخضر وبنفسجي لأسواق أوروبا", icon: "🌻" },
  { id: "carrots", en: "Carrots", ar: "جزر", descEn: "Hydro-cooled premium carrots", descAr: "جزر مبرّد بالماء عالي الجودة", icon: "🥕" },
];

const calendarData = [
  { en: "Valencia Oranges", ar: "برتقال فالنسيا", cat: "citrus", m: [1,2,2,2,1,0,0,0,0,0,0,1] },
  { en: "Navel Oranges", ar: "برتقال أبو سرة", cat: "citrus", m: [2,2,2,1,0,0,0,0,0,0,1,2] },
  { en: "Potatoes", ar: "بطاطس", cat: "potatoes", m: [2,2,2,2,2,1,0,0,0,1,1,2] },
  { en: "Red Onions", ar: "بصل أحمر", cat: "onions-garlic", m: [0,0,2,2,2,2,2,1,0,0,0,0] },
  { en: "Garlic", ar: "ثوم", cat: "onions-garlic", m: [0,0,0,1,2,2,2,1,0,0,0,0] },
  { en: "Table Grapes", ar: "عنب مائدة", cat: "grapes", m: [0,0,0,0,1,2,2,2,1,0,0,0] },
  { en: "Strawberries", ar: "فراولة", cat: "strawberries", m: [2,2,2,1,0,0,0,0,0,0,1,2] },
  { en: "Dates", ar: "تمور", cat: "dates", m: [0,0,0,0,0,0,0,1,2,2,2,1] },
  { en: "Basil", ar: "ريحان", cat: "herbs", m: [1,1,2,2,2,2,2,2,2,1,1,1] },
  { en: "Chamomile", ar: "بابونج", cat: "medicinal", m: [0,0,2,2,2,1,0,0,0,0,0,0] },
  { en: "Green Beans IQF", ar: "فاصوليا خضراء مجمدة", cat: "frozen", m: [2,2,2,2,2,2,2,2,2,2,2,2] },
  { en: "Sweet Potatoes", ar: "بطاطا حلوة", cat: "sweet-potato", m: [0,0,0,0,0,0,1,2,2,2,2,2] },
  { en: "Mandarin (Murcott)", ar: "يوسفي موركوت", cat: "other-citrus", m: [2,2,1,0,0,0,0,0,0,0,1,2] },
  { en: "Clementine", ar: "كليمنتين", cat: "other-citrus", m: [1,0,0,0,0,0,0,0,0,1,2,2] },
  { en: "Lemon (Adalia)", ar: "ليمون أضاليا", cat: "other-citrus", m: [2,2,2,1,1,0,0,0,0,1,2,2] },
  { en: "Mango (Naomi/Keitt)", ar: "مانجو ناعومي / كيت", cat: "mango", m: [0,0,0,0,0,0,1,2,2,1,0,0] },
  { en: "Pomegranate", ar: "رمان", cat: "pomegranate", m: [0,0,0,0,0,0,0,0,2,2,2,1] },
  { en: "Artichoke", ar: "خرشوف", cat: "artichoke", m: [2,2,1,0,0,0,0,0,0,0,0,2] },
  { en: "Sweet Pepper", ar: "فلفل ألوان", cat: "peppers", m: [2,2,2,2,1,0,0,0,0,1,2,2] },
  { en: "Hot Chili Pepper", ar: "فلفل حار", cat: "peppers", m: [2,2,2,2,2,1,0,0,0,1,2,2] },
  { en: "Carrots", ar: "جزر", cat: "carrots", m: [2,2,2,1,0,0,0,0,0,0,1,2] },
  { en: "Green Beans (Fresh)", ar: "فاصوليا خضراء طازجة", cat: "herbs", m: [2,2,2,1,0,0,0,0,0,1,2,2] },
  { en: "Spring Onion", ar: "بصل أخضر", cat: "onions-garlic", m: [2,2,2,1,0,0,0,0,0,0,1,2] },
  { en: "Peppermint", ar: "نعناع فلفلي", cat: "medicinal", m: [1,1,2,2,2,2,2,2,1,1,1,1] },
  { en: "Guava", ar: "جوافة", cat: "mango", m: [1,0,0,0,0,0,0,0,0,2,2,2] },
  { en: "Watermelon", ar: "بطيخ", cat: "grapes", m: [0,0,0,0,2,2,2,2,1,0,0,0] },
  { en: "Peach", ar: "خوخ", cat: "grapes", m: [0,0,0,0,0,2,2,1,0,0,0,0] },
  { en: "Tomatoes (Cherry)", ar: "طماطم شيري", cat: "frozen", m: [2,2,2,2,1,0,0,0,0,1,2,2] },
  { en: "Cauliflower", ar: "قرنبيط", cat: "frozen", m: [2,2,2,1,0,0,0,0,0,0,1,2] },
  { en: "Grapefruit", ar: "جريب فروت", cat: "citrus", m: [2,2,1,0,0,0,0,0,0,0,1,2] },
  { en: "Cumin", ar: "كمون", cat: "medicinal", m: [0,0,0,1,2,2,1,0,0,0,0,0] },
  { en: "Marjoram", ar: "بردقوش", cat: "medicinal", m: [1,1,2,2,2,2,2,1,1,1,1,1] },
];

const monthsEn = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
const monthsAr = ["يناير","فبراير","مارس","أبريل","مايو","يونيو","يوليو","أغسطس","سبتمبر","أكتوبر","نوفمبر","ديسمبر"];

// ===== SEO CONTENT PER EXPORTER =====
const exporterSEO = {
  1: {
    whyEn: "Delta Gold Citrus has been a trusted name in Egyptian citrus exports since 1998. With 2,500 feddans of prime farmland in Ismailia — Egypt's citrus heartland — and 3 modern packhouses equipped with optical grading technology, we deliver consistent quality to over 25 countries. Our vertically integrated operation means full traceability from grove to container.",
    whyAr: "دلتا جولد للموالح اسم موثوق في تصدير الموالح المصرية منذ 1998. مع 2,500 فدان من أجود الأراضي الزراعية في الإسماعيلية — قلب حزام الموالح المصري — و3 محطات فرز حديثة مجهزة بتقنية الفرز البصري، نقدم جودة ثابتة لأكثر من 25 دولة. عملياتنا المتكاملة رأسياً تعني تتبعاً كاملاً من البستان إلى الحاوية.",
    spotlightsEn: [
      { product: "Valencia Oranges", text: "Our flagship export — available October through March. High juice content (50%+), ideal for both fresh consumption and juice processing. Sizes 48-88, packed in 15kg open-top cartons or 10kg telescopic boxes." },
      { product: "Navel Oranges", text: "Premium eating orange, seedless with easy-peel skin. Peak season December–February. Popular in EU retail chains. Available in 4kg, 7kg, and 15kg packaging options." },
      { product: "Mandarin (Murcott)", text: "Sweet, easy-to-peel mandarin variety. Season: January–March. Growing demand in UK and Scandinavian markets. MOQ: 1 container (20 tons)." }
    ],
    spotlightsAr: [
      { product: "برتقال فالنسيا", text: "منتجنا الرئيسي للتصدير — متاح من أكتوبر إلى مارس. محتوى عصير عالي (أكثر من 50%)، مثالي للاستهلاك الطازج وعصر العصائر. الأحجام 48-88، معبأ في كراتين 15 كجم مفتوحة أو صناديق 10 كجم تلسكوبية." },
      { product: "برتقال أبو سرة", text: "برتقال مائدة فاخر، بدون بذور مع قشرة سهلة التقشير. ذروة الموسم ديسمبر–فبراير. مطلوب في سلاسل التجزئة الأوروبية. متاح في عبوات 4 و7 و15 كجم." },
      { product: "يوسفي موركوت", text: "صنف يوسفي حلو وسهل التقشير. الموسم: يناير–مارس. طلب متزايد في أسواق بريطانيا والدول الاسكندنافية. الحد الأدنى للطلب: حاوية واحدة (20 طن)." }
    ],
    caseStudy: { titleEn: "How We Supplied 5,000 Tons to a Dutch Retail Chain", titleAr: "كيف ورّدنا 5,000 طن لسلسلة تجزئة هولندية", textEn: "In the 2024-25 season, Delta Gold secured a contract with a major Dutch retail chain for weekly shipments of 200 tons of Valencia oranges over 6 months. Key success factors: GLOBALG.A.P. certification, consistent sizing via optical graders, and reliable 5-day transit from Alexandria to Rotterdam.", textAr: "في موسم 2024-25، حصلت دلتا جولد على عقد مع سلسلة تجزئة هولندية كبرى لشحنات أسبوعية بـ 200 طن من برتقال فالنسيا على مدار 6 أشهر. عوامل النجاح: شهادة GLOBALG.A.P.، أحجام ثابتة بالفرز البصري، وعبور موثوق 5 أيام من الإسكندرية إلى روتردام." },
    faqEn: [
      { q: "What is your minimum order quantity?", a: "1 full container (20-22 tons for citrus). Mixed containers available for first orders." },
      { q: "What certifications do you hold?", a: "GLOBALG.A.P., HACCP, and ISO 22000. All certificates renewed annually and available for verification." },
      { q: "What are your payment terms?", a: "LC at Sight for new customers. TT in advance for repeat customers with established relationship." },
      { q: "How quickly can you ship?", a: "3-5 days from order confirmation to vessel loading at Alexandria port. Transit to Rotterdam: 5-7 days." }
    ],
    faqAr: [
      { q: "ما الحد الأدنى للطلب؟", a: "حاوية كاملة واحدة (20-22 طن للموالح). حاويات مشتركة متاحة للطلبات الأولى." },
      { q: "ما الشهادات الحاصلين عليها؟", a: "GLOBALG.A.P. و HACCP و ISO 22000. جميع الشهادات تُجدد سنوياً ومتاحة للتحقق." },
      { q: "ما شروط الدفع؟", a: "اعتماد مستندي بالاطلاع للعملاء الجدد. تحويل بنكي مقدم للعملاء المتكررين." },
      { q: "ما سرعة الشحن؟", a: "3-5 أيام من تأكيد الطلب إلى التحميل على السفينة في ميناء الإسكندرية. العبور إلى روتردام: 5-7 أيام." }
    ]
  },
  7: {
    whyEn: "Upper Egypt Agro brings the untapped potential of Assiut's fertile lands to international markets. Specializing in organic onions, garlic, and medicinal herbs — particularly chamomile and basil — we serve European pharmaceutical and food industries with EU Organic certified produce. Our location in Upper Egypt means lower production costs and a unique terroir for aromatic plants.",
    whyAr: "صعيد مصر للزراعة تقدم الإمكانات غير المستغلة لأراضي أسيوط الخصبة للأسواق الدولية. متخصصون في البصل والثوم العضوي والأعشاب الطبية — خاصة البابونج والريحان — نخدم صناعات الأدوية والأغذية الأوروبية بمنتجات حاصلة على شهادة عضوية أوروبية. موقعنا في صعيد مصر يعني تكاليف إنتاج أقل وخصائص فريدة للنباتات العطرية.",
    spotlightsEn: [
      { product: "Organic Chamomile", text: "German chamomile (Matricaria chamomilla) grown organically in Assiut's dry climate — ideal for high essential oil content. Available as dried flowers or cut & sifted. EU Organic certified. Peak harvest: March–May." },
      { product: "Red Onions", text: "Sweet, mild red onions from Upper Egypt. 60-80mm caliber, available March–August. Packed in 25kg mesh bags. Perfect for European retail and food service." }
    ],
    spotlightsAr: [
      { product: "بابونج عضوي", text: "بابونج ألماني (Matricaria chamomilla) مزروع عضوياً في مناخ أسيوط الجاف — مثالي لمحتوى زيت عطري عالي. متاح كزهور مجففة أو مقطعة ومنخولة. حاصل على شهادة عضوية أوروبية. ذروة الحصاد: مارس–مايو." },
      { product: "بصل أحمر", text: "بصل أحمر حلو ومعتدل من صعيد مصر. عيار 60-80 مم، متاح مارس–أغسطس. معبأ في شبك 25 كجم. مثالي لتجارة التجزئة والخدمات الغذائية الأوروبية." }
    ],
    caseStudy: { titleEn: "Supplying Organic Chamomile to a German Pharmaceutical Company", titleAr: "توريد بابونج عضوي لشركة أدوية ألمانية", textEn: "In 2025, Upper Egypt Agro signed a 3-year contract with a German pharmaceutical company for 50 tons of organic chamomile annually. The partnership started with a trial shipment of 5 tons that exceeded quality expectations with essential oil content of 0.8% — above the 0.4% EU Pharmacopoeia minimum.", textAr: "في 2025، وقّعت صعيد مصر للزراعة عقداً لمدة 3 سنوات مع شركة أدوية ألمانية لتوريد 50 طن من البابونج العضوي سنوياً. بدأت الشراكة بشحنة تجريبية 5 أطنان تجاوزت توقعات الجودة بمحتوى زيت عطري 0.8% — أعلى من الحد الأدنى لدستور الأدوية الأوروبي 0.4%." },
    faqEn: [
      { q: "Are your products organic certified?", a: "Yes — EU Organic certified. Annual inspection by an accredited body. Certificate available on request." },
      { q: "What medicinal herbs do you export?", a: "Chamomile, basil, calendula, peppermint, and marjoram. All grown organically in Assiut, Upper Egypt." },
      { q: "What is the MOQ for dried herbs?", a: "5 tons minimum per herb variety. Mixed containers available." },
      { q: "Can you supply to pharmaceutical grade?", a: "Yes — we comply with EU Pharmacopoeia standards. CoA (Certificate of Analysis) provided with every shipment." }
    ],
    faqAr: [
      { q: "هل منتجاتكم معتمدة عضوياً؟", a: "نعم — حاصلون على شهادة عضوية أوروبية. فحص سنوي من جهة معتمدة. الشهادة متاحة عند الطلب." },
      { q: "ما الأعشاب الطبية التي تصدرونها؟", a: "بابونج، ريحان، أقحوان، نعناع فلفلي، وبردقوش. كلها مزروعة عضوياً في أسيوط." },
      { q: "ما الحد الأدنى للطلب للأعشاب المجففة؟", a: "5 أطنان كحد أدنى لكل صنف. حاويات مشتركة متاحة." },
      { q: "هل تورّدون بدرجة صيدلانية؟", a: "نعم — نلتزم بمعايير دستور الأدوية الأوروبي. شهادة تحليل (CoA) مرفقة مع كل شحنة." }
    ]
  }
};

// ===== EXPORTER BLOG POSTS =====
const exporterBlogPosts = [
  { id: 1, exporterId: 1, slug: "valencia-season-2026-open", titleEn: "Valencia Orange Season 2026 is Now Open — Pricing & Availability", titleAr: "موسم برتقال فالنسيا 2026 بدأ — الأسعار والتوافر", date: "2026-06-15", tag: "Season Update", tagAr: "تحديث موسمي",
    contentEn: "We're pleased to announce that our 2026 Valencia orange harvest has begun in our Ismailia farms. This season's crop shows excellent juice content (52% average) and caliber distribution. FOB Alexandria pricing starts at $680/ton for sizes 48-64. First containers available for loading from October 15. Early booking recommended — our Dutch and Russian clients have already secured 40% of the season's allocation. Contact us for a detailed price list and packaging options.",
    contentAr: "يسعدنا أن نعلن بدء حصاد برتقال فالنسيا 2026 في مزارعنا بالإسماعيلية. محصول هذا الموسم يُظهر محتوى عصير ممتاز (52% متوسط) وتوزيع أحجام جيد. الأسعار FOB الإسكندرية تبدأ من 680$/طن للأحجام 48-64. أول الحاويات جاهزة للتحميل من 15 أكتوبر. الحجز المبكر مُوصى به — عملاؤنا الهولنديون والروس حجزوا بالفعل 40% من حصة الموسم." },
  { id: 2, exporterId: 1, slug: "globalg-a-p-renewed-2026", titleEn: "GLOBALG.A.P. Certification Renewed for 2026-2027", titleAr: "تجديد شهادة GLOBALG.A.P. لعام 2026-2027", date: "2026-05-20", tag: "Certification", tagAr: "شهادات",
    contentEn: "Delta Gold Citrus has successfully renewed its GLOBALG.A.P. certification for all 2,500 feddans of citrus orchards in Ismailia. The audit was conducted by SGS Egypt and covered food safety, worker welfare, and environmental management. This marks our 12th consecutive year of GLOBALG.A.P. compliance — a testament to our commitment to international quality standards.",
    contentAr: "جدّدت دلتا جولد للموالح بنجاح شهادة GLOBALG.A.P. لكامل مساحة 2,500 فدان من بساتين الموالح في الإسماعيلية. أجرت التدقيق شركة SGS مصر وشمل سلامة الغذاء ورفاهية العمال والإدارة البيئية. هذا هو العام الثاني عشر على التوالي لامتثالنا لـ GLOBALG.A.P." },
  { id: 3, exporterId: 7, slug: "organic-chamomile-harvest-2026", titleEn: "Organic Chamomile Harvest 2026 — Record Quality from Assiut", titleAr: "حصاد البابونج العضوي 2026 — جودة قياسية من أسيوط", date: "2026-04-10", tag: "Harvest News", tagAr: "أخبار الحصاد",
    contentEn: "Our 2026 chamomile harvest in Assiut has delivered exceptional results. Essential oil content averaged 0.85% — well above the EU Pharmacopoeia minimum of 0.4%. The dry, warm climate of Upper Egypt continues to produce chamomile with superior aromatic properties. We harvested 120 tons of dried flowers this season, with 80 tons already allocated to European pharmaceutical clients. 40 tons remain available for new buyers. All produce is EU Organic certified and tested for pesticide residues (zero detected).",
    contentAr: "حصاد البابونج 2026 في أسيوط حقق نتائج استثنائية. محتوى الزيت العطري بلغ متوسطه 0.85% — أعلى بكثير من الحد الأدنى لدستور الأدوية الأوروبي 0.4%. المناخ الجاف الدافئ في صعيد مصر يستمر في إنتاج بابونج بخصائص عطرية متفوقة. حصدنا 120 طن من الزهور المجففة هذا الموسم، 80 طن منها محجوزة بالفعل لعملاء أدوية أوروبيين. 40 طن متاح للمشترين الجدد." },
  { id: 4, exporterId: 7, slug: "upper-egypt-agro-korean-market", titleEn: "Upper Egypt Agro Enters Korean Market with Organic Herbs", titleAr: "صعيد مصر للزراعة تدخل السوق الكوري بالأعشاب العضوية", date: "2026-03-01", tag: "Market Expansion", tagAr: "توسع في الأسواق",
    contentEn: "We're excited to announce our first shipment of organic basil and peppermint to South Korea. The 10-ton trial order was placed by a leading Korean health food distributor after meeting us at Biofach Nuremberg 2026. This opens a new market corridor for Egyptian organic herbs in East Asia. Korean consumers are increasingly seeking EU Organic certified herbs for traditional medicine and premium food products.",
    contentAr: "يسعدنا أن نعلن عن أول شحنة من الريحان والنعناع الفلفلي العضوي إلى كوريا الجنوبية. الطلب التجريبي 10 أطنان جاء من موزع أغذية صحية كوري رائد بعد لقائنا في معرض Biofach نورنبرغ 2026. هذا يفتح ممراً سوقياً جديداً للأعشاب العضوية المصرية في شرق آسيا." },
  { id: 5, exporterId: 3, slug: "nubaria-grapes-2026-season", titleEn: "Egyptian Flame Seedless Grapes — 2026 Season Preview", titleAr: "عنب فليم سيدلس المصري — نظرة مسبقة لموسم 2026", date: "2026-05-01", tag: "Season Update", tagAr: "تحديث موسمي",
    contentEn: "Nubaria Agro's grape vineyards are showing excellent promise for the 2026 season. Our Flame Seedless and Crimson varieties are on track for harvest beginning late May. This year's crop benefited from ideal winter temperatures and our new precision irrigation system. We expect 20% higher yields compared to 2025. First shipments to EU retail chains will depart Alexandria in early June.",
    contentAr: "كروم العنب في النوبارية للصادرات الزراعية تُظهر نتائج ممتازة لموسم 2026. أصناف فليم سيدلس وكريمزون في طريقها للحصاد بدءاً من أواخر مايو. استفاد محصول هذا العام من درجات حرارة شتوية مثالية ونظام الري الدقيق الجديد. نتوقع عائداً أعلى بنسبة 20% مقارنة بـ 2025." },
];

const certInfo = [
  { name: "GLOBALG.A.P.", descEn: "Good Agricultural Practices — the worldwide standard for farm production covering food safety, sustainability, and worker welfare.", descAr: "الممارسات الزراعية الجيدة — المعيار العالمي للإنتاج الزراعي ويشمل سلامة الغذاء والاستدامة ورفاهية العمال.", color: "#16A34A" },
  { name: "HACCP", descEn: "Hazard Analysis Critical Control Points — systematic preventive approach to food safety.", descAr: "تحليل المخاطر ونقاط التحكم الحرجة — نظام وقائي منهجي لسلامة الغذاء.", color: "#2563EB" },
  { name: "ISO 22000", descEn: "International food safety management system combining HACCP with prerequisite programs.", descAr: "نظام إدارة سلامة الغذاء الدولي الذي يدمج نظام HACCP مع برامج المتطلبات الأساسية.", color: "#7C3AED" },
  { name: "BRC GS", descEn: "British Retail Consortium Global Standard — required by most UK and EU retailers.", descAr: "المعيار العالمي لاتحاد التجزئة البريطاني — مطلوب من معظم تجار التجزئة في المملكة المتحدة والاتحاد الأوروبي.", color: "#DC2626" },
  { name: "Organic EU", descEn: "European Union organic certification — no synthetic pesticides or fertilizers.", descAr: "شهادة الزراعة العضوية الأوروبية — بدون مبيدات أو أسمدة صناعية.", color: "#059669" },
  { name: "SMETA", descEn: "Sedex Members Ethical Trade Audit — covers labor, health & safety, environment.", descAr: "تدقيق التجارة الأخلاقية — يغطي معايير العمل والصحة والسلامة والبيئة.", color: "#D97706" },
  { name: "Fair Trade", descEn: "Ensures fair prices and working conditions for farmers.", descAr: "يضمن أسعاراً عادلة وظروف عمل مناسبة للمزارعين.", color: "#0891B2" },
  { name: "IFS", descEn: "International Featured Standard — food safety and quality standard recognized by GFSI.", descAr: "المعيار الدولي المميز — معيار سلامة وجودة الغذاء المعترف به من GFSI.", color: "#9333EA" },
];

const govs = ["الإسكندرية","أسيوط","أسوان","البحيرة","بني سويف","القاهرة","الدقهلية","دمياط","الفيوم","الغربية","الجيزة","الإسماعيلية","كفر الشيخ","الأقصر","مطروح","المنيا","المنوفية","الوادي الجديد","شمال سيناء","النوبارية","بورسعيد","القليوبية","قنا","البحر الأحمر","الشرقية","سوهاج","جنوب سيناء","السويس"];

// ===== COMPONENTS =====
const CertBadge = ({ cert, small }) => {
  const c = certInfo.find(ci => ci.name === cert);
  return (
    <span style={{ background: (c?.color || "#666") + "15", color: c?.color || "#666", fontSize: small ? 10 : 11, padding: small ? "2px 6px" : "3px 8px", borderRadius: 4, fontWeight: 600, whiteSpace: "nowrap" }}>{cert}</span>
  );
};

const Header = ({ page, setPage }) => {
  const { lang, setLang } = useLang();
  const { currentUser, logout } = useAuth();
  const [open, setOpen] = useState(false);
  const isAr = lang === "ar";
  const ff = isAr ? "Cairo, sans-serif" : "Inter, sans-serif";
  const nav = [
    { key: "home", ar: "الرئيسية", en: "Home" },
    { key: "exporters", ar: "المُصدّرون", en: "Exporters" },
    { key: "calendar", ar: "تقويم المحاصيل", en: "Crop Calendar" },
    { key: "certs", ar: "الشهادات", en: "Certifications" },
    { key: "guide", ar: "دليل المشتري", en: "Buyer's Guide" },
    { key: "insights", ar: "دراسات وأبحاث", en: "Insights" },
  ];
  return (
    <header style={{ background: "#1B5E20", position: "sticky", top: 0, zIndex: 100, boxShadow: "0 2px 12px rgba(0,0,0,0.15)" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 20px", display: "flex", alignItems: "center", justifyContent: "space-between", height: 64, direction: isAr ? "rtl" : "ltr" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, cursor: "pointer" }} onClick={() => setPage("home")}>
          <Wheat size={26} color="#D4A937" />
          <div>
            <div style={{ color: "#fff", fontWeight: 700, fontSize: isAr ? 17 : 15, lineHeight: 1.1, fontFamily: isAr ? "Cairo, sans-serif" : "Inter, sans-serif" }}>{isAr ? "زُرع في مصر" : "Grown in Egypt"}</div>
            <div style={{ color: "#D4A937", fontSize: 10, fontWeight: 600, fontFamily: isAr ? "Inter, sans-serif" : "Cairo, sans-serif" }}>{isAr ? "Grown in Egypt" : "زُرع في مصر"}</div>
          </div>
        </div>
        <nav style={{ display: "flex", gap: 2, alignItems: "center" }} className="dnav">
          {nav.map(n => (
            <button key={n.key} onClick={() => setPage(n.key)} style={{ background: page === n.key ? "rgba(255,255,255,0.15)" : "transparent", color: "#fff", border: "none", padding: "8px 12px", borderRadius: 6, cursor: "pointer", fontSize: 12, fontWeight: page === n.key ? 700 : 400, fontFamily: ff }}>
              {isAr ? n.ar : n.en}
            </button>
          ))}
          <button onClick={() => setLang(isAr ? "en" : "ar")} style={{ background: "rgba(255,255,255,0.1)", color: "#D4A937", border: "none", padding: "6px 12px", borderRadius: 6, cursor: "pointer", fontSize: 12, fontWeight: 700, margin: "0 4px", display: "flex", alignItems: "center", gap: 4 }}>
            <Globe size={14} /> {isAr ? "EN" : "عربي"}
          </button>
          {currentUser ? (
            <>
              <button onClick={() => setPage(currentUser.role === "admin" ? "admin" : "dashboard")} style={{ background: "rgba(255,255,255,0.12)", color: "#fff", border: "1px solid rgba(255,255,255,0.2)", padding: "6px 12px", borderRadius: 6, cursor: "pointer", fontSize: 11, fontWeight: 600, fontFamily: ff, display: "flex", alignItems: "center", gap: 5 }}>
                <Users size={13}/> {currentUser.firstName}
                <span style={{ background: currentUser.role === "admin" ? "#D4A937" : "#4ade80", color: "#1A2E1A", fontSize: 9, padding: "1px 6px", borderRadius: 8, fontWeight: 700 }}>{currentUser.role === "admin" ? "Admin" : currentUser.role === "exporter" ? (isAr ? "مُصدّر" : "Exp.") : (isAr ? "مشتري" : "Buyer")}</span>
              </button>
              <button onClick={logout} style={{ background: "rgba(220,38,38,0.15)", color: "#fca5a5", border: "none", padding: "6px 10px", borderRadius: 6, cursor: "pointer", fontSize: 11, fontWeight: 600, fontFamily: ff }}>
                {isAr ? "خروج" : "Logout"}
              </button>
            </>
          ) : (
            <>
              <button onClick={() => setPage("signin")} style={{ background: "rgba(255,255,255,0.1)", color: "#fff", border: "1px solid rgba(255,255,255,0.2)", padding: "8px 14px", borderRadius: 6, cursor: "pointer", fontSize: 12, fontWeight: 600, fontFamily: ff }}>
                {isAr ? "تسجيل الدخول" : "Sign In"}
              </button>
              <button onClick={() => setPage("join")} style={{ background: "#D4A937", color: "#1A2E1A", border: "none", padding: "8px 16px", borderRadius: 6, cursor: "pointer", fontSize: 12, fontWeight: 700, fontFamily: ff }}>
                {isAr ? "انضم كمُصدّر" : "Join as Exporter"}
              </button>
            </>
          )}
        </nav>
        <button onClick={() => setOpen(!open)} style={{ background: "none", border: "none", color: "#fff", cursor: "pointer", display: "none" }} className="mbtn">{open ? <X size={24}/> : <Menu size={24}/>}</button>
      </div>
      {open && (
        <div style={{ background: "#1B5E20", padding: "8px 20px 16px", borderTop: "1px solid rgba(255,255,255,0.1)", direction: isAr ? "rtl" : "ltr" }}>
          {nav.map(n => (
            <button key={n.key} onClick={() => { setPage(n.key); setOpen(false); }} style={{ display: "block", width: "100%", textAlign: isAr ? "right" : "left", background: page === n.key ? "rgba(255,255,255,0.1)" : "transparent", color: "#fff", border: "none", padding: "10px 14px", borderRadius: 6, cursor: "pointer", fontSize: 14, fontFamily: ff, marginBottom: 2 }}>{isAr ? n.ar : n.en}</button>
          ))}
          <div style={{ display: "flex", gap: 8, marginTop: 8 }}>
            <button onClick={() => setLang(isAr ? "en" : "ar")} style={{ flex: 1, background: "rgba(255,255,255,0.1)", color: "#D4A937", border: "none", padding: "10px", borderRadius: 6, cursor: "pointer", fontSize: 13, fontWeight: 700 }}><Globe size={14} style={{ verticalAlign: "middle", marginBottom: 2 }} /> {isAr ? "English" : "عربي"}</button>
            {currentUser ? (
              <button onClick={() => { setPage(currentUser.role === "admin" ? "admin" : "dashboard"); setOpen(false); }} style={{ flex: 1, background: "rgba(255,255,255,0.15)", color: "#fff", border: "none", padding: "10px", borderRadius: 6, cursor: "pointer", fontSize: 13, fontWeight: 600, fontFamily: ff }}>{currentUser.firstName} ({currentUser.role})</button>
            ) : (
              <button onClick={() => { setPage("signin"); setOpen(false); }} style={{ flex: 1, background: "rgba(255,255,255,0.15)", color: "#fff", border: "1px solid rgba(255,255,255,0.2)", padding: "10px", borderRadius: 6, cursor: "pointer", fontSize: 13, fontWeight: 600, fontFamily: ff }}>{isAr ? "تسجيل الدخول" : "Sign In"}</button>
            )}
          </div>
          {currentUser ? (
            <button onClick={() => { logout(); setOpen(false); }} style={{ display: "block", width: "100%", background: "rgba(220,38,38,0.15)", color: "#fca5a5", border: "none", padding: "10px", borderRadius: 6, cursor: "pointer", fontSize: 13, fontWeight: 600, fontFamily: ff, marginTop: 6 }}>{isAr ? "تسجيل الخروج" : "Logout"}</button>
          ) : (
            <button onClick={() => { setPage("join"); setOpen(false); }} style={{ display: "block", width: "100%", background: "#D4A937", color: "#1A2E1A", border: "none", padding: "10px", borderRadius: 6, cursor: "pointer", fontSize: 13, fontWeight: 700, fontFamily: ff, marginTop: 6 }}>{isAr ? "انضم كمُصدّر" : "Join"}</button>
          )}
        </div>
      )}
      <style>{`@media(max-width:960px){.dnav{display:none!important}.mbtn{display:block!important}}`}</style>
    </header>
  );
};

const Footer = ({ setPage }) => {
  const { lang } = useLang();
  const isAr = lang === "ar";
  return (
    <footer style={{ background: "#1A2E1A", color: "#a3b8a3", padding: "56px 20px 28px", direction: isAr ? "rtl" : "ltr", fontFamily: isAr ? "Cairo, sans-serif" : "Inter, sans-serif" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 36, marginBottom: 36 }}>
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14 }}><Wheat size={20} color="#D4A937" /><span style={{ color: "#fff", fontWeight: 700, fontSize: 15 }}>{isAr ? "زُرع في مصر" : "Grown in Egypt"}</span></div>
          <p style={{ fontSize: 13, lineHeight: 1.7, margin: 0 }}>{isAr ? "الدليل الموثوق لمُصدّري الحاصلات الزراعية المصرية المعتمدين." : "The trusted B2B directory for verified Egyptian agricultural exporters."}</p>
        </div>
        <div>
          <h4 style={{ color: "#D4A937", fontSize: 12, fontWeight: 700, marginBottom: 14, letterSpacing: 1 }}>{isAr ? "استكشف" : "EXPLORE"}</h4>
          {[["exporters",isAr?"المُصدّرون":"Exporters"],["calendar",isAr?"تقويم المحاصيل":"Crop Calendar"],["certs",isAr?"الشهادات":"Certifications"],["guide",isAr?"دليل المشتري":"Buyer's Guide"]].map(([k,l])=>(
            <div key={k}><button onClick={()=>setPage(k)} style={{ background: "none", border: "none", color: "#a3b8a3", cursor: "pointer", fontSize: 13, padding: "3px 0", display: "block", fontFamily: "inherit" }}>{l}</button></div>
          ))}
        </div>
        <div>
          <h4 style={{ color: "#D4A937", fontSize: 12, fontWeight: 700, marginBottom: 14, letterSpacing: 1 }}>{isAr ? "موارد" : "RESOURCES"}</h4>
          {[["insights",isAr?"دراسات وأبحاث":"Insights"],["about",isAr?"عن الزراعة المصرية":"About Egypt"],["join",isAr?"انضم كمُصدّر":"Join as Exporter"]].map(([k,l])=>(
            <div key={k}><button onClick={()=>setPage(k)} style={{ background: "none", border: "none", color: "#a3b8a3", cursor: "pointer", fontSize: 13, padding: "3px 0", display: "block", fontFamily: "inherit" }}>{l}</button></div>
          ))}
        </div>
        <div>
          <h4 style={{ color: "#D4A937", fontSize: 12, fontWeight: 700, marginBottom: 14, letterSpacing: 1 }}>{isAr ? "تواصل" : "CONTACT"}</h4>
          <p style={{ fontSize: 13, margin: "0 0 6px" }}>hello@growninegypt.com</p>
          <p style={{ fontSize: 13, margin: 0 }}>{isAr ? "القاهرة، مصر" : "Cairo, Egypt"}</p>
        </div>
      </div>
      <div style={{ borderTop: "1px solid rgba(255,255,255,0.08)", paddingTop: 20, textAlign: "center", fontSize: 12 }}>© 2026 زُرع في مصر — Grown in Egypt</div>
    </footer>
  );
};

// ===== PAGES =====
const HomePage = ({ setPage, setSelectedExporter, setCropFilter }) => {
  const { lang } = useLang();
  const isAr = lang === "ar";
  const ff = isAr ? "Cairo, sans-serif" : "Inter, sans-serif";
  const featured = exporters.filter(e => e.featured);
  return (
    <div style={{ fontFamily: ff }}>
      {/* Hero */}
      <section style={{ background: "linear-gradient(135deg, #1B5E20 0%, #2E7D32 50%, #1B5E20 100%)", padding: "90px 20px 72px", direction: isAr ? "rtl" : "ltr" }}>
        <div style={{ maxWidth: 800, margin: "0 auto", textAlign: "center" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(212,169,55,0.15)", padding: "6px 18px", borderRadius: 20, marginBottom: 22 }}>
            <Shield size={14} color="#D4A937" />
            <span style={{ color: "#D4A937", fontSize: 11, fontWeight: 600, letterSpacing: isAr ? 0 : 0.5 }}>{isAr ? "مُصدّرون معتمدون · تواصل مباشر · بدون وسطاء" : "VERIFIED EXPORTERS · DIRECT CONTACT · NO MIDDLEMEN"}</span>
          </div>
          <h1 style={{ color: "#fff", fontSize: "clamp(26px, 5vw, 44px)", fontWeight: 800, lineHeight: 1.3, margin: "0 0 18px" }}>
            {isAr ? "تواصل مباشرة مع مُصدّري الحاصلات الزراعية المعتمدين في مصر" : "Source Directly from Egypt's Verified Agricultural Exporters"}
          </h1>
          <p style={{ color: "rgba(255,255,255,0.8)", fontSize: "clamp(14px, 2vw, 17px)", lineHeight: 1.8, margin: "0 auto 32px", maxWidth: 620 }}>
            {isAr ? "مصر هي المُصدّر الأول عالمياً للبرتقال، ومن أكبر مورّدي البطاطس والبصل والعنب والفراولة والتمور. تواصل مع مُصدّرين معتمدين — بدون وسطاء." : "Egypt is the world's #1 orange exporter and a leading supplier of potatoes, onions, grapes, strawberries, dates, and fresh herbs. Connect with verified exporters — no middlemen."}
          </p>
          <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
            <button onClick={() => setPage("exporters")} style={{ background: "#D4A937", color: "#1A2E1A", border: "none", padding: "14px 30px", borderRadius: 8, cursor: "pointer", fontSize: 15, fontWeight: 700, display: "flex", alignItems: "center", gap: 8, fontFamily: ff }}>
              <Search size={18} /> {isAr ? "ابحث عن مُصدّرين" : "Find Exporters"}
            </button>
            <button onClick={() => setPage("join")} style={{ background: "rgba(255,255,255,0.12)", color: "#fff", border: "1px solid rgba(255,255,255,0.25)", padding: "14px 30px", borderRadius: 8, cursor: "pointer", fontSize: 15, fontWeight: 600, fontFamily: ff }}>
              {isAr ? "انضم كمُصدّر" : "Join as Exporter"}
            </button>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section style={{ background: "#FAF8F3", borderBottom: "1px solid #e8e4dc" }}>
        <div style={{ maxWidth: 1000, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(4, 1fr)", textAlign: "center" }}>
          {[
            { icon: "🏆", value: "#1", ar: "الأول عالمياً في تصدير البرتقال", en: "World's largest orange exporter" },
            { icon: "✓", value: "8+", ar: "مُصدّر معتمد", en: "Verified exporters" },
            { icon: "🌾", value: "10", ar: "فئة من المحاصيل", en: "Crop categories" },
            { icon: "🌍", value: "40+", ar: "سوق وجهة", en: "Destination markets" },
          ].map((s, i) => (
            <div key={i} style={{ padding: "28px 12px", borderLeft: isAr && i < 3 ? "1px solid #e8e4dc" : "none", borderRight: !isAr && i < 3 ? "1px solid #e8e4dc" : "none" }}>
              <div style={{ fontSize: 26 }}>{s.icon}</div>
              <div style={{ fontSize: 30, fontWeight: 800, color: "#1B5E20", margin: "4px 0" }}>{s.value}</div>
              <div style={{ fontSize: 11, color: "#6b7280", fontWeight: 500, fontFamily: ff }}>{isAr ? s.ar : s.en}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Featured */}
      <section style={{ padding: "64px 20px", background: "#fff", direction: isAr ? "rtl" : "ltr" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 42 }}>
            <div style={{ color: "#D4A937", fontSize: 11, fontWeight: 700, letterSpacing: isAr ? 0 : 2, marginBottom: 8 }}>{isAr ? "شركاء موثوقون" : "TRUSTED PARTNERS"}</div>
            <h2 style={{ fontSize: 28, fontWeight: 800, color: "#1A2E1A", margin: 0 }}>{isAr ? "مُصدّرون مميّزون مُعتمدون" : "Featured Verified Exporters"}</h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(330px, 1fr))", gap: 18 }}>
            {featured.map(exp => (
              <div key={exp.id} onClick={() => { setSelectedExporter(exp); setPage("profile"); }}
                style={{ background: "#FAF8F3", borderRadius: 12, padding: 22, cursor: "pointer", border: "1px solid #e8e4dc", transition: "all 0.2s" }}
                onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-3px)"; e.currentTarget.style.boxShadow = "0 8px 28px rgba(27,94,32,0.1)"; }}
                onMouseLeave={e => { e.currentTarget.style.transform = ""; e.currentTarget.style.boxShadow = ""; }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 10 }}>
                  <div>
                    <h3 style={{ fontSize: 16, fontWeight: 700, color: "#1A2E1A", margin: "0 0 2px" }}>{isAr ? exp.nameAr : exp.nameEn}</h3>
                    <span style={{ fontSize: 12, color: "#9ca3af", fontFamily: isAr ? "Inter, sans-serif" : "Cairo, sans-serif" }}>{isAr ? exp.nameEn : exp.nameAr}</span>
                  </div>
                  {exp.verified && <span style={{ background: "#dcfce7", color: "#16a34a", fontSize: 10, padding: "2px 8px", borderRadius: 10, fontWeight: 600, display: "flex", alignItems: "center", gap: 3 }}><Check size={11}/> {isAr ? "معتمد" : "Verified"}</span>}
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 6, color: "#6b7280", fontSize: 12, marginBottom: 10 }}><MapPin size={12}/> {isAr ? exp.govAr : exp.govEn}</div>
                <p style={{ fontSize: 12, color: "#4b5563", lineHeight: 1.6, margin: "0 0 14px", minHeight: 40 }}>{(isAr ? exp.bioAr : exp.bioEn).slice(0, 110)}...</p>
                <div style={{ display: "flex", gap: 5, flexWrap: "wrap", marginBottom: 12 }}>
                  {(isAr ? exp.cropsAr : exp.cropsEn).map(c => <span key={c} style={{ background: "#1B5E20", color: "#fff", fontSize: 10, padding: "2px 8px", borderRadius: 4, fontWeight: 600 }}>{c}</span>)}
                </div>
                <div style={{ display: "flex", gap: 4, flexWrap: "wrap", marginBottom: 12 }}>{exp.certs.map(c => <CertBadge key={c} cert={c} small/>)}</div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontSize: 11, color: "#9ca3af" }}>{isAr ? `تأسست ${exp.est}` : `Est. ${exp.est}`}</span>
                  <span style={{ color: "#1B5E20", fontSize: 12, fontWeight: 600, display: "flex", alignItems: "center", gap: 4 }}>{isAr ? "عرض الملف" : "View Profile"} {isAr ? <ChevronRight size={14} style={{ transform: "scaleX(-1)" }}/> : <ChevronRight size={14}/>}</span>
                </div>
              </div>
            ))}
          </div>
          <div style={{ textAlign: "center", marginTop: 32 }}>
            <button onClick={() => setPage("exporters")} style={{ background: "#1B5E20", color: "#fff", border: "none", padding: "12px 32px", borderRadius: 8, cursor: "pointer", fontSize: 14, fontWeight: 600, fontFamily: ff, display: "inline-flex", alignItems: "center", gap: 8 }}>
              {isAr ? "تصفّح كل المُصدّرين" : "Browse All Exporters"} {isAr ? <ArrowLeft size={16}/> : <ArrowRight size={16}/>}
            </button>
          </div>
        </div>
      </section>

      {/* Browse by Crop */}
      <section style={{ padding: "64px 20px", background: "#FAF8F3", direction: isAr ? "rtl" : "ltr" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 40 }}>
            <h2 style={{ fontSize: 28, fontWeight: 800, color: "#1A2E1A", margin: "0 0 6px" }}>{isAr ? "تصفّح حسب المحصول" : "Browse by Crop"}</h2>
            <p style={{ color: "#6b7280", fontSize: 14, margin: 0 }}>{isAr ? "استكشف أبرز الفئات الزراعية المصرية" : "Explore Egypt's top agricultural export categories"}</p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))", gap: 14 }}>
            {cropCategories.map(cat => (
              <div key={cat.id} onClick={() => { setCropFilter(isAr ? cat.ar : cat.en); setPage("exporters"); }}
                style={{ background: "#fff", borderRadius: 12, padding: 18, cursor: "pointer", border: "1px solid #e8e4dc", transition: "all 0.2s", display: "flex", alignItems: "center", gap: 14 }}
                onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 4px 16px rgba(0,0,0,0.06)"; }}
                onMouseLeave={e => { e.currentTarget.style.transform = ""; e.currentTarget.style.boxShadow = ""; }}>
                <div style={{ fontSize: 32, width: 52, height: 52, display: "flex", alignItems: "center", justifyContent: "center", background: "#f0fdf4", borderRadius: 10, flexShrink: 0 }}>{cat.icon}</div>
                <div>
                  <h3 style={{ fontSize: 14, fontWeight: 700, color: "#1A2E1A", margin: "0 0 3px" }}>{isAr ? cat.ar : cat.en}</h3>
                  <p style={{ fontSize: 11, color: "#6b7280", margin: 0, lineHeight: 1.5 }}>{isAr ? cat.descAr : cat.descEn}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section style={{ padding: "64px 20px", background: "#fff", direction: isAr ? "rtl" : "ltr" }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <h2 style={{ fontSize: 28, fontWeight: 800, color: "#1A2E1A", textAlign: "center", margin: "0 0 42px" }}>{isAr ? "كيف تعمل المنصة" : "How It Works"}</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(230px, 1fr))", gap: 28 }}>
            {[
              { icon: <Search size={26}/>, ar: "ابحث", en: "Search", descAr: "صفِّ النتائج حسب المحصول والمحافظة والشهادات لإيجاد المُصدّر المناسب في ثوانٍ.", descEn: "Filter by crop, governorate, and certifications to find the right exporter in seconds." },
              { icon: <Eye size={26}/>, ar: "قارن", en: "Compare", descAr: "اطّلع على الملفات والشهادات والمواسم وحجم التصدير جنباً إلى جنب.", descEn: "Review profiles, certifications, seasons, and export capacity side by side." },
              { icon: <Send size={26}/>, ar: "أرسل استفساراً", en: "Send Inquiry", descAr: "تواصل مباشرة عبر واتساب أو البريد أو نموذج الاستفسار. لا وسطاء.", descEn: "Contact directly via WhatsApp, email, or the inquiry form. No middlemen." },
            ].map((s, i) => (
              <div key={i} style={{ textAlign: "center", padding: 20 }}>
                <div style={{ width: 60, height: 60, borderRadius: "50%", background: "#1B5E20", color: "#D4A937", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px" }}>{s.icon}</div>
                <h3 style={{ fontSize: 17, fontWeight: 700, color: "#1A2E1A", margin: "0 0 8px" }}>{isAr ? s.ar : s.en}</h3>
                <p style={{ fontSize: 13, color: "#6b7280", lineHeight: 1.7, margin: 0 }}>{isAr ? s.descAr : s.descEn}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust */}
      <section style={{ padding: "56px 20px", background: "linear-gradient(135deg, #1B5E20, #2E7D32)", direction: isAr ? "rtl" : "ltr" }}>
        <div style={{ maxWidth: 700, margin: "0 auto", textAlign: "center" }}>
          <Shield size={36} color="#D4A937" style={{ marginBottom: 14 }}/>
          <h2 style={{ fontSize: 26, fontWeight: 800, color: "#fff", margin: "0 0 20px" }}>{isAr ? "مبنية على التحقّق والثقة" : "Built on Verification"}</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 16, color: "rgba(255,255,255,0.9)", fontSize: 13 }}>
            {[
              { ar: "كل مُصدّر تتم مراجعته يدوياً", en: "Every exporter is manually reviewed" },
              { ar: "الشهادات يتم التحقق منها", en: "Certifications verified with issuers" },
              { ar: "تواصل مباشر — بدون عمولات", en: "Direct contact — no commissions" }
            ].map((item, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 8, justifyContent: "center" }}><Check size={16} color="#D4A937"/> {isAr ? item.ar : item.en}</div>
            ))}
          </div>
          <button onClick={() => setPage("guide")} style={{ background: "#D4A937", color: "#1A2E1A", border: "none", padding: "12px 28px", borderRadius: 8, cursor: "pointer", fontSize: 14, fontWeight: 700, marginTop: 28, fontFamily: ff }}>
            {isAr ? "اقرأ دليل المشتري" : "Read the Buyer's Guide"}
          </button>
        </div>
      </section>
    </div>
  );
};

const ExportersPage = ({ setPage, setSelectedExporter, cropFilter, setCropFilter }) => {
  const { lang } = useLang();
  const isAr = lang === "ar";
  const ff = isAr ? "Cairo, sans-serif" : "Inter, sans-serif";
  const [search, setSearch] = useState("");
  const [certF, setCertF] = useState("");
  const [govF, setGovF] = useState("");

  const filtered = useMemo(() => exporters.filter(e => {
    if (search && !(isAr ? e.nameAr : e.nameEn).toLowerCase().includes(search.toLowerCase()) && !(isAr ? e.nameEn : e.nameAr).includes(search)) return false;
    if (cropFilter && !(isAr ? e.cropsAr : e.cropsEn).includes(cropFilter)) return false;
    if (certF && !e.certs.includes(certF)) return false;
    if (govF && (isAr ? e.govAr : e.govEn) !== govF) return false;
    return true;
  }), [search, cropFilter, certF, govF, isAr]);

  const allCrops = [...new Set(exporters.flatMap(e => isAr ? e.cropsAr : e.cropsEn))];
  const allCerts = [...new Set(exporters.flatMap(e => e.certs))];
  const allGovs = [...new Set(exporters.map(e => isAr ? e.govAr : e.govEn))];

  return (
    <div style={{ background: "#FAF8F3", minHeight: "80vh", fontFamily: ff }}>
      <div style={{ background: "#1B5E20", padding: "36px 20px 28px", direction: isAr ? "rtl" : "ltr" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <h1 style={{ color: "#fff", fontSize: 26, fontWeight: 800, margin: "0 0 14px" }}>{isAr ? "دليل المُصدّرين" : "Exporters Directory"}</h1>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            <div style={{ flex: "1 1 240px", position: "relative" }}>
              <Search size={15} style={{ position: "absolute", [isAr ? "right" : "left"]: 12, top: 12, color: "#9ca3af" }}/>
              <input value={search} onChange={e => setSearch(e.target.value)} placeholder={isAr ? "ابحث باسم الشركة..." : "Search company..."} style={{ width: "100%", padding: isAr ? "10px 36px 10px 10px" : "10px 10px 10px 36px", borderRadius: 8, border: "none", fontSize: 13, boxSizing: "border-box", direction: isAr ? "rtl" : "ltr", fontFamily: ff }}/>
            </div>
            <select value={cropFilter} onChange={e => setCropFilter(e.target.value)} style={{ padding: "10px 12px", borderRadius: 8, border: "none", fontSize: 12, background: "#fff", cursor: "pointer", fontFamily: ff }}>
              <option value="">{isAr ? "كل المحاصيل" : "All Crops"}</option>
              {allCrops.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
            <select value={certF} onChange={e => setCertF(e.target.value)} style={{ padding: "10px 12px", borderRadius: 8, border: "none", fontSize: 12, background: "#fff", cursor: "pointer" }}>
              <option value="">{isAr ? "كل الشهادات" : "All Certifications"}</option>
              {allCerts.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
            <select value={govF} onChange={e => setGovF(e.target.value)} style={{ padding: "10px 12px", borderRadius: 8, border: "none", fontSize: 12, background: "#fff", cursor: "pointer", fontFamily: ff }}>
              <option value="">{isAr ? "كل المحافظات" : "All Governorates"}</option>
              {allGovs.map(g => <option key={g} value={g}>{g}</option>)}
            </select>
          </div>
        </div>
      </div>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "28px 20px", direction: isAr ? "rtl" : "ltr" }}>
        <div style={{ marginBottom: 16, color: "#6b7280", fontSize: 13 }}>
          {isAr ? `${filtered.length} مُصدّر` : `${filtered.length} exporter${filtered.length !== 1 ? "s" : ""} found`}
          {(cropFilter || certF || govF) && <button onClick={() => { setCropFilter(""); setCertF(""); setGovF(""); setSearch(""); }} style={{ background: "none", border: "none", color: "#D4A937", cursor: "pointer", marginRight: isAr ? 12 : 0, marginLeft: isAr ? 0 : 12, fontSize: 12, fontWeight: 600, fontFamily: ff }}>{isAr ? "مسح الفلاتر" : "Clear filters"}</button>}
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))", gap: 16 }}>
          {filtered.map(exp => (
            <div key={exp.id} onClick={() => { setSelectedExporter(exp); setPage("profile"); }}
              style={{ background: "#fff", borderRadius: 12, padding: 22, cursor: "pointer", border: "1px solid #e8e4dc", transition: "all 0.2s" }}
              onMouseEnter={e => { e.currentTarget.style.boxShadow = "0 6px 20px rgba(0,0,0,0.07)"; e.currentTarget.style.transform = "translateY(-2px)"; }}
              onMouseLeave={e => { e.currentTarget.style.boxShadow = ""; e.currentTarget.style.transform = ""; }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 8 }}>
                <div>
                  <h3 style={{ fontSize: 15, fontWeight: 700, color: "#1A2E1A", margin: "0 0 2px" }}>{isAr ? exp.nameAr : exp.nameEn}</h3>
                  <span style={{ fontSize: 12, color: "#9ca3af", fontFamily: isAr ? "Inter" : "Cairo" }}>{isAr ? exp.nameEn : exp.nameAr}</span>
                </div>
                {exp.verified && <span style={{ background: "#dcfce7", color: "#16a34a", fontSize: 10, padding: "2px 8px", borderRadius: 10, fontWeight: 600 }}>✓ {isAr ? "معتمد" : "Verified"}</span>}
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 5, color: "#6b7280", fontSize: 11, marginBottom: 10 }}><MapPin size={11}/> {isAr ? exp.govAr : exp.govEn} · {isAr ? `تأسست ${exp.est}` : `Est. ${exp.est}`}</div>
              <div style={{ display: "flex", gap: 4, flexWrap: "wrap", marginBottom: 10 }}>
                {(isAr ? exp.cropsAr : exp.cropsEn).map(c => <span key={c} style={{ background: "#1B5E20", color: "#fff", fontSize: 10, padding: "2px 8px", borderRadius: 4, fontWeight: 600 }}>{c}</span>)}
              </div>
              <div style={{ display: "flex", gap: 4, flexWrap: "wrap" }}>{exp.certs.map(c => <CertBadge key={c} cert={c} small/>)}</div>
            </div>
          ))}
        </div>
        {filtered.length === 0 && (
          <div style={{ textAlign: "center", padding: "50px 20px", color: "#9ca3af" }}>
            <Search size={40} style={{ marginBottom: 12, opacity: 0.3 }}/>
            <p style={{ fontSize: 15, fontWeight: 600 }}>{isAr ? "لا يوجد مُصدّرون مطابقون" : "No exporters match"}</p>
          </div>
        )}
      </div>
    </div>
  );
};

const ProfilePage = ({ exporter: exp, setPage }) => {
  const { lang } = useLang();
  const isAr = lang === "ar";
  const ff = isAr ? "Cairo, sans-serif" : "Inter, sans-serif";
  const [iqOpen, setIqOpen] = useState(false);
  const [iqSent, setIqSent] = useState(false);
  const [iqForm, setIqForm] = useState({});
  const [iqError, setIqError] = useState("");
  const seo = exporterSEO[exp?.id];
  const expPosts = exporterBlogPosts.filter(p => p.exporterId === exp?.id);
  if (!exp) return <div style={{ padding: 60, textAlign: "center" }}>{isAr ? "اختر مُصدّراً أولاً" : "Select an exporter first"}</div>;

  const Section = ({ title, children }) => (
    <section style={{ background: "#fff", borderRadius: 12, padding: 24, marginBottom: 16, border: "1px solid #e8e4dc" }}>
      <h2 style={{ fontSize: 17, fontWeight: 700, color: "#1A2E1A", margin: "0 0 14px", fontFamily: ff }}>{title}</h2>
      {children}
    </section>
  );

  return (
    <div style={{ background: "#FAF8F3", minHeight: "80vh", fontFamily: ff }}>
      <div style={{ background: "#1B5E20", padding: "28px 20px", direction: isAr ? "rtl" : "ltr" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <button onClick={() => setPage("exporters")} style={{ background: "none", border: "none", color: "rgba(255,255,255,0.7)", cursor: "pointer", fontSize: 12, marginBottom: 14, display: "flex", alignItems: "center", gap: 4, fontFamily: ff }}>
            {isAr ? <ArrowRight size={14}/> : <ArrowLeft size={14}/>} {isAr ? "العودة للدليل" : "Back to Directory"}
          </button>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 14 }}>
            <div>
              <h1 style={{ color: "#fff", fontSize: 26, fontWeight: 800, margin: "0 0 4px" }}>{isAr ? exp.nameAr : exp.nameEn}</h1>
              <div style={{ color: "#D4A937", fontSize: 15, marginBottom: 8, fontFamily: isAr ? "Inter" : "Cairo" }}>{isAr ? exp.nameEn : exp.nameAr}</div>
              <div style={{ display: "flex", gap: 12, color: "rgba(255,255,255,0.8)", fontSize: 12, flexWrap: "wrap" }}>
                <span style={{ display: "flex", alignItems: "center", gap: 4 }}><MapPin size={13}/> {isAr ? exp.govAr : exp.govEn}</span>
                <span style={{ display: "flex", alignItems: "center", gap: 4 }}><Clock size={13}/> {isAr ? `تأسست ${exp.est}` : `Est. ${exp.est}`}</span>
                <span style={{ display: "flex", alignItems: "center", gap: 4 }}><TrendingUp size={13}/> {exp.volume} {isAr ? "طن" : "tons"}</span>
              </div>
            </div>
            {exp.verified && <span style={{ background: "rgba(255,255,255,0.15)", color: "#4ade80", padding: "5px 14px", borderRadius: 18, fontSize: 12, fontWeight: 600, display: "flex", alignItems: "center", gap: 5 }}><CheckCircle size={15}/> {isAr ? "مُصدّر معتمد" : "Verified Exporter"}</span>}
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "28px 20px", display: "grid", gridTemplateColumns: "1fr 320px", gap: 24, direction: isAr ? "rtl" : "ltr" }} className="pGrid">
        <div className="pMain">
          <Section title={isAr ? "نبذة عن الشركة" : "About"}>
            <p style={{ fontSize: 14, color: "#4b5563", lineHeight: 1.8, margin: "0 0 10px" }}>{isAr ? exp.bioAr : exp.bioEn}</p>
            <p style={{ fontSize: 13, color: "#9ca3af", lineHeight: 1.7, margin: 0, direction: isAr ? "ltr" : "rtl", textAlign: isAr ? "left" : "right", fontFamily: isAr ? "Inter" : "Cairo" }}>{isAr ? exp.bioEn : exp.bioAr}</p>
          </Section>

          <Section title={isAr ? "المنتجات والأصناف" : "Products & Varieties"}>
            <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 12 }}>
              {(isAr ? exp.cropsAr : exp.cropsEn).map(c => <span key={c} style={{ background: "#1B5E20", color: "#fff", fontSize: 12, padding: "5px 12px", borderRadius: 6, fontWeight: 600 }}>{c}</span>)}
            </div>
            <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
              {exp.varieties.map(v => <span key={v} style={{ background: "#f3f4f6", color: "#374151", fontSize: 11, padding: "4px 10px", borderRadius: 4 }}>{v}</span>)}
            </div>
          </Section>

          <Section title={isAr ? "الشهادات" : "Certifications"}>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(190px, 1fr))", gap: 10 }}>
              {exp.certs.map(c => {
                const ci = certInfo.find(x => x.name === c);
                return (
                  <div key={c} style={{ padding: 14, borderRadius: 8, border: `1px solid ${ci?.color || "#e5e7eb"}25`, background: `${ci?.color || "#f3f4f6"}06` }}>
                    <div style={{ fontWeight: 700, color: ci?.color || "#374151", fontSize: 13, marginBottom: 4 }}>{c}</div>
                    <div style={{ fontSize: 11, color: "#6b7280", lineHeight: 1.5 }}>{(isAr ? ci?.descAr : ci?.descEn)?.slice(0, 80)}...</div>
                  </div>
                );
              })}
            </div>
          </Section>

          <Section title={isAr ? "القدرات الإنتاجية" : "Production Capacity"}>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(130px, 1fr))", gap: 12 }}>
              {[
                { ar: "المساحة المزروعة", en: "Cultivated Area", v: `${exp.capacity.area.toLocaleString()} ${isAr ? "فدان" : "feddans"}` },
                { ar: "الإنتاج السنوي", en: "Production", v: `${exp.capacity.production.toLocaleString()} ${isAr ? "طن" : "tons"}` },
                { ar: "الطاقة التصديرية", en: "Export Cap.", v: `${exp.capacity.export.toLocaleString()} ${isAr ? "طن" : "tons"}` },
                { ar: "محطات فرز", en: "Packhouses", v: exp.capacity.packhouses },
                { ar: "تبريد", en: "Cold Storage", v: exp.capacity.coldStorage ? (isAr ? "نعم" : "Yes") : (isAr ? "لا" : "No") },
                { ar: "موظفين", en: "Staff", v: exp.capacity.staff },
              ].map((item, i) => (
                <div key={i} style={{ textAlign: "center", padding: 10, background: "#FAF8F3", borderRadius: 8 }}>
                  <div style={{ fontSize: 18, fontWeight: 800, color: "#1B5E20" }}>{item.v}</div>
                  <div style={{ fontSize: 10, color: "#6b7280", marginTop: 3 }}>{isAr ? item.ar : item.en}</div>
                </div>
              ))}
            </div>
          </Section>

          <Section title={isAr ? "بيانات التجارة" : "Trade Information"}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
              <div>
                <h4 style={{ fontSize: 12, fontWeight: 600, color: "#6b7280", margin: "0 0 6px" }}>{isAr ? "الأسواق المستهدفة" : "Target Markets"}</h4>
                <div style={{ display: "flex", gap: 5, flexWrap: "wrap" }}>{(isAr ? exp.marketsAr : exp.marketsEn).map(m => <span key={m} style={{ background: "#dbeafe", color: "#2563eb", fontSize: 11, padding: "3px 8px", borderRadius: 4 }}>{m}</span>)}</div>
              </div>
              <div>
                <h4 style={{ fontSize: 12, fontWeight: 600, color: "#6b7280", margin: "0 0 6px" }}>{isAr ? "موانئ الشحن" : "Shipping Ports"}</h4>
                <div style={{ display: "flex", gap: 5, flexWrap: "wrap" }}>{(isAr ? exp.portsAr : exp.portsEn).map(p => <span key={p} style={{ background: "#f3f4f6", color: "#374151", fontSize: 11, padding: "3px 8px", borderRadius: 4 }}>{p}</span>)}</div>
              </div>
              <div>
                <h4 style={{ fontSize: 12, fontWeight: 600, color: "#6b7280", margin: "0 0 6px" }}>Incoterms</h4>
                <div style={{ display: "flex", gap: 5, flexWrap: "wrap" }}>{exp.incoterms.map(t => <span key={t} style={{ background: "#fef3c7", color: "#92400e", fontSize: 11, padding: "3px 8px", borderRadius: 4, fontWeight: 600 }}>{t}</span>)}</div>
              </div>
              <div>
                <h4 style={{ fontSize: 12, fontWeight: 600, color: "#6b7280", margin: "0 0 6px" }}>{isAr ? "شروط الدفع" : "Payment Terms"}</h4>
                <div style={{ display: "flex", gap: 5, flexWrap: "wrap" }}>{exp.payment.map(p => <span key={p} style={{ background: "#f3f4f6", color: "#374151", fontSize: 11, padding: "3px 8px", borderRadius: 4 }}>{p}</span>)}</div>
              </div>
            </div>
          </Section>

          {/* SEO: Why Choose Us */}
          {seo && (
            <Section title={isAr ? `لماذا تختار ${exp.nameAr}` : `Why Choose ${exp.nameEn}`}>
              <p style={{ fontSize: 14, color: "#4b5563", lineHeight: 1.9, margin: 0 }}>{isAr ? seo.whyAr : seo.whyEn}</p>
            </Section>
          )}

          {/* SEO: Product Spotlights */}
          {seo?.spotlightsEn && (
            <Section title={isAr ? "تسليط الضوء على منتجاتنا" : "Product Spotlights"}>
              {(isAr ? seo.spotlightsAr : seo.spotlightsEn).map((sp, i) => (
                <div key={i} style={{ padding: 14, background: "#FAF8F3", borderRadius: 8, marginBottom: 10, borderRight: isAr ? "3px solid #D4A937" : "none", borderLeft: !isAr ? "3px solid #D4A937" : "none" }}>
                  <h4 style={{ fontSize: 14, fontWeight: 700, color: "#1B5E20", margin: "0 0 5px" }}>{sp.product}</h4>
                  <p style={{ fontSize: 13, color: "#4b5563", lineHeight: 1.7, margin: 0 }}>{sp.text}</p>
                </div>
              ))}
            </Section>
          )}

          {/* SEO: Case Study */}
          {seo?.caseStudy && (
            <Section title={isAr ? "قصة نجاح" : "Success Story"}>
              <div style={{ padding: 16, background: "linear-gradient(135deg, #f0fdf4, #FAF8F3)", borderRadius: 8, border: "1px solid #86efac" }}>
                <h4 style={{ fontSize: 14, fontWeight: 700, color: "#1B5E20", margin: "0 0 8px" }}>{isAr ? seo.caseStudy.titleAr : seo.caseStudy.titleEn}</h4>
                <p style={{ fontSize: 13, color: "#4b5563", lineHeight: 1.8, margin: 0 }}>{isAr ? seo.caseStudy.textAr : seo.caseStudy.textEn}</p>
              </div>
            </Section>
          )}

          {/* SEO: FAQ */}
          {seo?.faqEn && (
            <Section title={isAr ? "أسئلة شائعة" : "Frequently Asked Questions"}>
              {(isAr ? seo.faqAr : seo.faqEn).map((faq, i) => (
                <div key={i} style={{ padding: 12, background: "#f9fafb", borderRadius: 8, marginBottom: 8 }}>
                  <h4 style={{ fontSize: 13, fontWeight: 700, color: "#1A2E1A", margin: "0 0 5px" }}>❓ {faq.q}</h4>
                  <p style={{ fontSize: 12, color: "#4b5563", lineHeight: 1.7, margin: 0 }}>{faq.a}</p>
                </div>
              ))}
            </Section>
          )}

          {/* Exporter Blog/News */}
          {expPosts.length > 0 && (
            <Section title={isAr ? "أخبار ومقالات" : "News & Articles"}>
              {expPosts.map(post => (
                <div key={post.id} style={{ padding: 14, background: "#FAF8F3", borderRadius: 8, marginBottom: 10, cursor: "pointer", border: "1px solid #e8e4dc", transition: "all 0.2s" }}
                  onMouseEnter={e => e.currentTarget.style.borderColor = "#D4A937"}
                  onMouseLeave={e => e.currentTarget.style.borderColor = "#e8e4dc"}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 5 }}>
                    <h4 style={{ fontSize: 14, fontWeight: 700, color: "#1A2E1A", margin: 0, flex: 1 }}>{isAr ? post.titleAr : post.titleEn}</h4>
                    <span style={{ background: "#1B5E20", color: "#fff", fontSize: 9, padding: "2px 7px", borderRadius: 4, fontWeight: 600, whiteSpace: "nowrap", marginRight: isAr ? 0 : 8, marginLeft: isAr ? 8 : 0 }}>{isAr ? post.tagAr : post.tag}</span>
                  </div>
                  <p style={{ fontSize: 12, color: "#6b7280", lineHeight: 1.6, margin: "0 0 5px" }}>{(isAr ? post.contentAr : post.contentEn).slice(0, 160)}...</p>
                  <span style={{ fontSize: 11, color: "#9ca3af" }}>{post.date}</span>
                </div>
              ))}
            </Section>
          )}
        </div>

        {/* Sidebar */}
        <div className="pSide">
          <div style={{ background: "#fff", borderRadius: 12, padding: 22, border: "1px solid #e8e4dc", position: "sticky", top: 80 }}>
            <h3 style={{ fontSize: 15, fontWeight: 700, color: "#1A2E1A", margin: "0 0 14px" }}>{isAr ? "تواصل معنا" : "Contact"}</h3>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              <a href={`mailto:${exp.email}`} style={{ display: "flex", alignItems: "center", gap: 8, color: "#4b5563", textDecoration: "none", fontSize: 12, padding: "9px 12px", background: "#f9fafb", borderRadius: 8 }}><Mail size={15} color="#1B5E20"/> {exp.email}</a>
              <a href={`tel:${exp.phone}`} style={{ display: "flex", alignItems: "center", gap: 8, color: "#4b5563", textDecoration: "none", fontSize: 12, padding: "9px 12px", background: "#f9fafb", borderRadius: 8, direction: "ltr" }}><Phone size={15} color="#1B5E20"/> {exp.phone}</a>
              <a href={`https://wa.me/${exp.whatsapp}`} target="_blank" rel="noopener" style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 6, background: "#25D366", color: "#fff", textDecoration: "none", fontSize: 13, fontWeight: 600, padding: "11px", borderRadius: 8 }}>{isAr ? "واتساب" : "WhatsApp"}</a>
              <button onClick={() => setIqOpen(!iqOpen)} style={{ background: "#D4A937", color: "#1A2E1A", border: "none", padding: "11px", borderRadius: 8, cursor: "pointer", fontSize: 13, fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center", gap: 6, fontFamily: ff }}>
                <Send size={15}/> {isAr ? "إرسال استفسار" : "Send Inquiry"}
              </button>
            </div>
            {iqOpen && !iqSent && (
              <div style={{ marginTop: 14, padding: 14, background: "#FAF8F3", borderRadius: 8 }}>
                <input placeholder={isAr ? "اسم شركتك *" : "Your company *"} value={iqForm.company || ""} onChange={e => setIqForm(p=>({...p,company:e.target.value}))} style={{ width: "100%", padding: "9px", borderRadius: 6, border: "1px solid #d1d5db", marginBottom: 7, fontSize: 12, boxSizing: "border-box", direction: isAr ? "rtl" : "ltr", fontFamily: ff }}/>
                <input placeholder={isAr ? "بريدك الإلكتروني *" : "Your email *"} value={iqForm.email || ""} onChange={e => setIqForm(p=>({...p,email:e.target.value}))} style={{ width: "100%", padding: "9px", borderRadius: 6, border: "1px solid #d1d5db", marginBottom: 7, fontSize: 12, boxSizing: "border-box", direction: "ltr" }}/>
                <select value={iqForm.product || ""} onChange={e => setIqForm(p=>({...p,product:e.target.value}))} style={{ width: "100%", padding: "9px", borderRadius: 6, border: "1px solid #d1d5db", marginBottom: 7, fontSize: 12, background: "#fff", fontFamily: ff }}>
                  <option value="">{isAr ? "المنتج المطلوب... *" : "Product of interest... *"}</option>
                  {(isAr ? exp.cropsAr : exp.cropsEn).map(c => <option key={c} value={c}>{c}</option>)}
                </select>
                <input placeholder={isAr ? "الكمية (طن) *" : "Quantity (tons) *"} value={iqForm.qty || ""} onChange={e => setIqForm(p=>({...p,qty:e.target.value}))} style={{ width: "100%", padding: "9px", borderRadius: 6, border: "1px solid #d1d5db", marginBottom: 7, fontSize: 12, boxSizing: "border-box", direction: "ltr" }}/>
                <textarea placeholder={isAr ? "رسالتك..." : "Your message..."} value={iqForm.msg || ""} onChange={e => setIqForm(p=>({...p,msg:e.target.value}))} rows={3} style={{ width: "100%", padding: "9px", borderRadius: 6, border: "1px solid #d1d5db", marginBottom: 8, fontSize: 12, resize: "vertical", boxSizing: "border-box", direction: isAr ? "rtl" : "ltr", fontFamily: ff }}/>
                {iqError && <p style={{ fontSize: 11, color: "#DC2626", margin: "0 0 8px", fontWeight: 600 }}>{iqError}</p>}
                <button onClick={() => {
                  if (!iqForm.company || !iqForm.email || !iqForm.product || !iqForm.qty) { setIqError(isAr ? "يرجى ملء كل الحقول المطلوبة (*)" : "Please fill all required fields (*)"); return; }
                  if (!iqForm.email.includes("@")) { setIqError(isAr ? "بريد إلكتروني غير صحيح" : "Invalid email address"); return; }
                  setIqSent(true);
                }} style={{ width: "100%", background: "#1B5E20", color: "#fff", border: "none", padding: "10px", borderRadius: 6, cursor: "pointer", fontSize: 13, fontWeight: 600, fontFamily: ff }}>{isAr ? "إرسال الاستفسار" : "Submit Inquiry"}</button>
              </div>
            )}
            {iqSent && <div style={{ marginTop: 14, padding: 14, background: "#dcfce7", borderRadius: 8, textAlign: "center" }}><CheckCircle size={28} color="#16a34a" style={{ marginBottom: 6 }}/><p style={{ color: "#16a34a", fontWeight: 600, margin: 0, fontSize: 13 }}>{isAr ? "تم إرسال الاستفسار بنجاح!" : "Inquiry sent!"}</p></div>}
          </div>
        </div>
      </div>
      <style>{`@media(max-width:800px){.pGrid{grid-template-columns:1fr!important}.pMain,.pSide{grid-column:1/-1}}`}</style>
    </div>
  );
};

const CalendarPage = ({ setPage, setCropFilter }) => {
  const { lang } = useLang();
  const isAr = lang === "ar";
  const ff = isAr ? "Cairo, sans-serif" : "Inter, sans-serif";
  const [catF, setCatF] = useState("");
  const data = catF ? calendarData.filter(c => c.cat === catF) : calendarData;
  const months = isAr ? monthsAr : monthsEn;
  return (
    <div style={{ background: "#FAF8F3", minHeight: "80vh", fontFamily: ff }}>
      <div style={{ background: "#1B5E20", padding: "36px 20px", direction: isAr ? "rtl" : "ltr" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <h1 style={{ color: "#fff", fontSize: 26, fontWeight: 800, margin: "0 0 6px" }}>{isAr ? "تقويم المحاصيل المصرية" : "Egyptian Crop Calendar"}</h1>
          <p style={{ color: "rgba(255,255,255,0.7)", fontSize: 13, margin: 0 }}>{isAr ? "مواسم الحصاد والتصدير لأهم المحاصيل الزراعية المصرية" : "Harvest and export seasons for Egypt's major crops"}</p>
        </div>
      </div>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "28px 20px", direction: isAr ? "rtl" : "ltr" }}>
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 20 }}>
          <button onClick={() => setCatF("")} style={{ background: !catF ? "#1B5E20" : "#fff", color: !catF ? "#fff" : "#374151", border: "1px solid #e5e7eb", padding: "5px 14px", borderRadius: 18, cursor: "pointer", fontSize: 12, fontFamily: ff }}>{isAr ? "الكل" : "All"}</button>
          {cropCategories.map(cat => (
            <button key={cat.id} onClick={() => setCatF(cat.id)} style={{ background: catF === cat.id ? "#1B5E20" : "#fff", color: catF === cat.id ? "#fff" : "#374151", border: "1px solid #e5e7eb", padding: "5px 14px", borderRadius: 18, cursor: "pointer", fontSize: 12, fontFamily: ff }}>{cat.icon} {isAr ? cat.ar : cat.en}</button>
          ))}
        </div>
        <div style={{ display: "flex", gap: 10, marginBottom: 16, fontSize: 11, color: "#6b7280" }}>
          <span style={{ display: "flex", alignItems: "center", gap: 4 }}><span style={{ width: 12, height: 12, background: "#16a34a", borderRadius: 3, display: "inline-block" }}/> {isAr ? "ذروة الموسم" : "Peak"}</span>
          <span style={{ display: "flex", alignItems: "center", gap: 4 }}><span style={{ width: 12, height: 12, background: "#86efac", borderRadius: 3, display: "inline-block" }}/> {isAr ? "متاح" : "Available"}</span>
          <span style={{ display: "flex", alignItems: "center", gap: 4 }}><span style={{ width: 12, height: 12, background: "#f3f4f6", borderRadius: 3, display: "inline-block" }}/> {isAr ? "خارج الموسم" : "Off season"}</span>
        </div>
        <div style={{ background: "#fff", borderRadius: 12, border: "1px solid #e8e4dc", overflow: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 700 }}>
            <thead>
              <tr style={{ background: "#1B5E20" }}>
                <th style={{ textAlign: isAr ? "right" : "left", padding: "10px 14px", color: "#fff", fontSize: 12, fontWeight: 600, position: "sticky", [isAr ? "right" : "left"]: 0, background: "#1B5E20", zIndex: 2, fontFamily: ff }}>{isAr ? "المحصول" : "Crop"}</th>
                {months.map(m => <th key={m} style={{ padding: "10px 6px", color: "#D4A937", fontSize: 11, fontWeight: 600, textAlign: "center", fontFamily: ff }}>{m}</th>)}
                <th style={{ padding: "10px", color: "#fff", fontSize: 11, textAlign: "center" }}>{isAr ? "بحث" : "Find"}</th>
              </tr>
            </thead>
            <tbody>
              {data.map((crop, i) => (
                <tr key={i} style={{ borderBottom: "1px solid #f3f4f6" }}>
                  <td style={{ padding: "8px 14px", fontWeight: 600, fontSize: 12, color: "#1A2E1A", position: "sticky", [isAr ? "right" : "left"]: 0, background: "#fff", zIndex: 1, fontFamily: ff }}>
                    {isAr ? crop.ar : crop.en}
                    <div style={{ fontSize: 10, color: "#9ca3af", fontFamily: isAr ? "Inter" : "Cairo" }}>{isAr ? crop.en : crop.ar}</div>
                  </td>
                  {crop.m.map((m, j) => (
                    <td key={j} style={{ padding: 3, textAlign: "center" }}>
                      <div style={{ width: "100%", height: 26, borderRadius: 4, background: m === 2 ? "#16a34a" : m === 1 ? "#86efac" : "#f9fafb" }}/>
                    </td>
                  ))}
                  <td style={{ padding: 3, textAlign: "center" }}>
                    <button onClick={() => {
                      const cat = cropCategories.find(c => c.id === crop.cat);
                      if (cat) { setCropFilter(isAr ? cat.ar : cat.en); setPage("exporters"); }
                    }} style={{ background: "#1B5E20", color: "#fff", border: "none", padding: "3px 8px", borderRadius: 4, cursor: "pointer", fontSize: 10, fontWeight: 600 }}>→</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

const CertsPage = () => {
  const { lang } = useLang();
  const isAr = lang === "ar";
  return (
    <div style={{ background: "#FAF8F3", minHeight: "80vh", fontFamily: isAr ? "Cairo" : "Inter" }}>
      <div style={{ background: "#1B5E20", padding: "36px 20px", direction: isAr ? "rtl" : "ltr" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <h1 style={{ color: "#fff", fontSize: 26, fontWeight: 800, margin: "0 0 6px" }}>{isAr ? "دليل الشهادات" : "Certifications Guide"}</h1>
          <p style={{ color: "rgba(255,255,255,0.7)", fontSize: 13, margin: 0 }}>{isAr ? "تعرّف على شهادات الجودة والسلامة المعتمدة دولياً" : "Quality and safety certifications for Egyptian exporters"}</p>
        </div>
      </div>
      <div style={{ maxWidth: 1000, margin: "0 auto", padding: "28px 20px", direction: isAr ? "rtl" : "ltr" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 16 }}>
          {certInfo.map(cert => (
            <div key={cert.name} style={{ background: "#fff", borderRadius: 12, padding: 22, border: `1px solid ${cert.color}20`, [isAr ? "borderRight" : "borderLeft"]: `4px solid ${cert.color}` }}>
              <h3 style={{ fontSize: 17, fontWeight: 700, color: cert.color, margin: "0 0 8px" }}>{cert.name}</h3>
              <p style={{ fontSize: 13, color: "#4b5563", lineHeight: 1.7, margin: 0 }}>{isAr ? cert.descAr : cert.descEn}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const GuidePage = () => {
  const { lang } = useLang();
  const isAr = lang === "ar";
  const steps = [
    { ar: "تقييم المُصدّر", en: "Evaluate the Exporter", descAr: "تحقق من الشهادات وسجل التصدير والأسواق المستهدفة. ابحث عن مُصدّرين معتمدين بشهادة GLOBALG.A.P. أو BRC نشطة. اطلب ملف الشركة وسجلات التصدير الحديثة.", descEn: "Check certifications, export history, and target markets. Look for verified exporters with active GLOBALG.A.P. or BRC certification. Request their company profile and recent export records." },
    { ar: "طلب عينات", en: "Request Samples", descAr: "معظم المُصدّرين المصريين يرسلون عينات بكل سرور. حدّد الصنف والدرجة والتغليف المطلوب. خصص 7-14 يوماً للتسليم عبر الشحن الجوي.", descEn: "Most exporters are happy to send samples. Specify variety, grade, and packaging. Allow 7–14 days for air freight delivery." },
    { ar: "فهم شروط التسليم (Incoterms)", en: "Understand Incoterms", descAr: "FOB هو الأكثر شيوعاً — أنت تتحمل الشحن من الميناء المصري. CIF يعني أن المُصدّر يتحمل التوصيل لميناءك. CFR مشابه لكن بدون تأمين.", descEn: "FOB is most common — you handle shipping from the Egyptian port. CIF means the exporter handles delivery to your port. CFR is similar but without insurance." },
    { ar: "شروط الدفع", en: "Payment Terms", descAr: "الاعتماد المستندي بالاطلاع (LC at Sight) هو الأكثر أماناً للطرفين ومعيار التعاملات الأولى. التحويل البنكي المقدم شائع في العلاقات المستقرة.", descEn: "Letter of Credit at sight is most secure for both parties and standard for first transactions. TT in advance is common for established relationships." },
    { ar: "الشحن واللوجستيات", en: "Shipping & Logistics", descAr: "الموانئ الرئيسية: الإسكندرية (المتوسط)، دمياط، بورسعيد، السخنة (البحر الأحمر للخليج/آسيا). وقت العبور لأوروبا: 5-8 أيام. للخليج: 3-5 أيام.", descEn: "Major ports: Alexandria (Mediterranean), Damietta, Port Said, Sokhna (Red Sea for Gulf/Asia). Transit to Europe: 5–8 days. To Gulf: 3–5 days." },
    { ar: "الفحص والجودة", en: "Inspection & Quality", descAr: "فحص ما قبل الشحن بواسطة SGS أو Bureau Veritas أو Cotecna هو المعيار. شهادات الصحة النباتية تصدر من الإدارة المركزية للحجر الزراعي (CAPQ).", descEn: "Pre-shipment inspection by SGS, Bureau Veritas, or Cotecna is standard. Phytosanitary certificates issued by CAPQ." },
  ];
  return (
    <div style={{ background: "#FAF8F3", minHeight: "80vh", fontFamily: isAr ? "Cairo" : "Inter" }}>
      <div style={{ background: "#1B5E20", padding: "36px 20px", direction: isAr ? "rtl" : "ltr" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <h1 style={{ color: "#fff", fontSize: 26, fontWeight: 800, margin: "0 0 6px" }}>{isAr ? "دليل المشتري" : "Buyer's Guide"}</h1>
          <p style={{ color: "rgba(255,255,255,0.7)", fontSize: 13, margin: 0 }}>{isAr ? "كل ما تحتاج معرفته عن الاستيراد من مُصدّري الحاصلات الزراعية المصرية" : "Everything about sourcing from Egyptian agricultural exporters"}</p>
        </div>
      </div>
      <div style={{ maxWidth: 800, margin: "0 auto", padding: "28px 20px", direction: isAr ? "rtl" : "ltr" }}>
        {steps.map((s, i) => (
          <div key={i} style={{ background: "#fff", borderRadius: 12, padding: 22, marginBottom: 14, border: "1px solid #e8e4dc" }}>
            <h3 style={{ fontSize: 16, fontWeight: 700, color: "#1B5E20", margin: "0 0 8px" }}>{i + 1}. {isAr ? s.ar : s.en}</h3>
            <p style={{ fontSize: 13, color: "#4b5563", lineHeight: 1.8, margin: 0 }}>{isAr ? s.descAr : s.descEn}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

const InsightsPage = () => {
  const { lang } = useLang();
  const isAr = lang === "ar";
  const articles = [
    { ar: "دور التجارة الإلكترونية في تطوير الصادرات الزراعية المصرية", en: "The Role of E-Commerce in Developing Egyptian Agricultural Exports", descAr: "دراسة معمّقة تحلل كيف يمكن لمنصات التجارة الرقمية تعزيز تنافسية الصادرات الزراعية المصرية.", descEn: "An in-depth study on how digital trade platforms can boost Egypt's agricultural export competitiveness.", tag: isAr ? "بحث" : "Research" },
    { ar: "الصادرات المصرية من الموالح: الاتجاهات والتوقعات 2024–2030", en: "Egyptian Citrus Exports: Trends & Outlook 2024–2030", descAr: "تحليل إحصائي لنمو صادرات الموالح المصرية والحصة السوقية والأسواق الناشئة.", descEn: "Statistical analysis of Egypt's citrus export growth and emerging markets.", tag: isAr ? "تحليل" : "Analysis" },
    { ar: "التحول الرقمي في الزراعة المصرية", en: "Digital Transformation in Egyptian Agriculture", descAr: "كيف يتبنى المُصدّرون الزراعيون المصريون التجارة الإلكترونية والتسويق الرقمي.", descEn: "How Egyptian agricultural exporters are adopting e-commerce and digital marketing.", tag: isAr ? "رؤى" : "Insights" },
  ];
  return (
    <div style={{ background: "#FAF8F3", minHeight: "80vh", fontFamily: isAr ? "Cairo" : "Inter" }}>
      <div style={{ background: "#1B5E20", padding: "36px 20px", direction: isAr ? "rtl" : "ltr" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <h1 style={{ color: "#fff", fontSize: 26, fontWeight: 800, margin: "0 0 6px" }}>{isAr ? "دراسات وأبحاث" : "Research & Insights"}</h1>
        </div>
      </div>
      <div style={{ maxWidth: 1000, margin: "0 auto", padding: "28px 20px", direction: isAr ? "rtl" : "ltr" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 18 }}>
          {articles.map((a, i) => (
            <div key={i} style={{ background: "#fff", borderRadius: 12, overflow: "hidden", border: "1px solid #e8e4dc" }}>
              <div style={{ height: 140, background: "linear-gradient(135deg, #1B5E20, #2E7D32)", display: "flex", alignItems: "center", justifyContent: "center" }}><BarChart3 size={40} color="rgba(255,255,255,0.25)"/></div>
              <div style={{ padding: 18 }}>
                <div style={{ display: "flex", gap: 6, marginBottom: 8 }}>
                  <span style={{ background: "#D4A937", color: "#1A2E1A", fontSize: 10, padding: "2px 8px", borderRadius: 4, fontWeight: 600 }}>{a.tag}</span>
                  <span style={{ color: "#9ca3af", fontSize: 11 }}>2026</span>
                </div>
                <h3 style={{ fontSize: 15, fontWeight: 700, color: "#1A2E1A", margin: "0 0 6px", lineHeight: 1.4 }}>{isAr ? a.ar : a.en}</h3>
                <p style={{ fontSize: 12, color: "#6b7280", lineHeight: 1.6, margin: 0 }}>{isAr ? a.descAr : a.descEn}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const JoinPage = ({ submitApp }) => {
  const { lang } = useLang();
  const { currentUser } = useAuth();
  const isAr = lang === "ar";
  const ff = isAr ? "Cairo, sans-serif" : "Inter, sans-serif";
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({});
  const [done, setDone] = useState(false);
  const up = (k, v) => setForm(p => ({ ...p, [k]: v }));

  const handleSubmit = () => {
    if (submitApp) submitApp(form);
    setDone(true);
  };

  if (done) return (
    <div style={{ background: "#FAF8F3", minHeight: "80vh", display: "flex", alignItems: "center", justifyContent: "center", padding: 40, fontFamily: ff, direction: isAr ? "rtl" : "ltr" }}>
      <div style={{ textAlign: "center", maxWidth: 500 }}>
        <div style={{ width: 80, height: 80, borderRadius: "50%", background: "#fef3c7", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px" }}><Clock size={40} color="#D97706"/></div>
        <h2 style={{ fontSize: 26, fontWeight: 800, color: "#1A2E1A", margin: "0 0 12px" }}>{isAr ? "تم إرسال طلبك بنجاح!" : "Application Submitted!"}</h2>
        <div style={{ background: "#fef3c7", border: "1px solid #fde68a", borderRadius: 10, padding: 18, marginBottom: 20 }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, marginBottom: 8 }}>
            <Clock size={18} color="#D97706"/>
            <span style={{ fontSize: 15, fontWeight: 700, color: "#92400E" }}>{isAr ? "في انتظار موافقة الإدارة" : "Pending Admin Approval"}</span>
          </div>
          <p style={{ fontSize: 13, color: "#92400E", lineHeight: 1.7, margin: 0 }}>{isAr ? "سيقوم فريق التحقق بمراجعة بياناتك خلال 48 ساعة عمل. سيصلك إشعار على بريدك الإلكتروني عند الموافقة." : "Our verification team will review your application within 48 business hours. You'll receive an email notification upon approval."}</p>
        </div>
        <div style={{ background: "#fff", borderRadius: 10, padding: 18, border: "1px solid #e8e4dc", textAlign: isAr ? "right" : "left" }}>
          <h4 style={{ fontSize: 14, fontWeight: 700, color: "#1A2E1A", margin: "0 0 10px" }}>{isAr ? "ماذا يحدث بعد ذلك؟" : "What happens next?"}</h4>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {[
              { ar: "فريق التحقق يراجع بياناتك ومستنداتك", en: "Our team reviews your data and documents", icon: "1️⃣" },
              { ar: "عند الموافقة، ملفك يظهر في الدليل للمشترين", en: "Once approved, your profile goes live in the directory", icon: "2️⃣" },
              { ar: "تبدأ في استقبال استفسارات من مشترين دوليين", en: "You start receiving inquiries from international buyers", icon: "3️⃣" },
            ].map((s, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 13, color: "#4b5563" }}><span style={{ fontSize: 18 }}>{s.icon}</span> {isAr ? s.ar : s.en}</div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const Input = ({ label, req, placeholder, field, type = "text" }) => (
    <div style={{ marginBottom: 14 }}>
      <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: "#374151", marginBottom: 5, fontFamily: ff }}>{label} {req && <span style={{ color: "#DC2626" }}>*</span>}</label>
      <input type={type} placeholder={placeholder} value={form[field] || ""} onChange={e => up(field, e.target.value)} style={{ width: "100%", padding: "9px 12px", borderRadius: 8, border: "1px solid #d1d5db", fontSize: 13, boxSizing: "border-box", direction: type === "tel" || type === "url" || type === "email" ? "ltr" : isAr ? "rtl" : "ltr", fontFamily: ff }}/>
    </div>
  );

  const stepLabels = isAr ? ["بيانات الشركة", "المنتجات والتصدير", "بيانات التواصل", "مراجعة وإرسال"] : ["Company Details", "Products & Export", "Contact Info", "Review & Submit"];

  return (
    <div style={{ background: "#FAF8F3", minHeight: "80vh", fontFamily: ff }}>
      <div style={{ background: "#1B5E20", padding: "36px 20px", direction: isAr ? "rtl" : "ltr" }}>
        <div style={{ maxWidth: 700, margin: "0 auto" }}>
          <h1 style={{ color: "#fff", fontSize: 26, fontWeight: 800, margin: "0 0 6px" }}>{isAr ? "انضم كمُصدّر" : "Join as Exporter"}</h1>
          <p style={{ color: "rgba(255,255,255,0.7)", fontSize: 13, margin: 0 }}>{isAr ? "سجّل شركتك في 3 دقائق — أكمل ملفك لاحقاً" : "Register in 3 minutes — complete your profile later"}</p>
        </div>
      </div>
      <div style={{ maxWidth: 650, margin: "0 auto", padding: "28px 20px", direction: isAr ? "rtl" : "ltr" }}>
        <div style={{ display: "flex", gap: 4, marginBottom: 28 }}>
          {stepLabels.map((s, i) => (
            <div key={i} style={{ flex: 1, textAlign: "center" }}>
              <div style={{ height: 4, borderRadius: 2, background: step > i + 1 ? "#1B5E20" : step === i + 1 ? "#D4A937" : "#e5e7eb", marginBottom: 6, transition: "background 0.3s" }}/>
              <span style={{ fontSize: 10, color: step >= i + 1 ? "#1B5E20" : "#9ca3af", fontWeight: step === i + 1 ? 700 : 400 }}>{s}</span>
            </div>
          ))}
        </div>

        <div style={{ background: "#fff", borderRadius: 12, padding: 28, border: "1px solid #e8e4dc" }}>
          {step === 1 && <>
            <h2 style={{ fontSize: 18, fontWeight: 700, color: "#1A2E1A", margin: "0 0 20px" }}>{isAr ? "الخطوة 1: بيانات الشركة" : "Step 1: Company Details"}</h2>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0 14px" }}>
              <Input label={isAr ? "اسم الشركة بالعربية" : "Company Name (Arabic)"} req placeholder="مثال: شركة الدلتا للموالح" field="nameAr"/>
              <Input label={isAr ? "اسم الشركة بالإنجليزية" : "Company Name (English)"} req placeholder="Delta Citrus Co." field="nameEn"/>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0 14px" }}>
              <div style={{ marginBottom: 14 }}>
                <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: "#374151", marginBottom: 5, fontFamily: ff }}>{isAr ? "المحافظة" : "Governorate"} <span style={{ color: "#DC2626" }}>*</span></label>
                <select value={form.gov || ""} onChange={e => up("gov", e.target.value)} style={{ width: "100%", padding: "9px 12px", borderRadius: 8, border: "1px solid #d1d5db", fontSize: 13, background: "#fff", fontFamily: ff }}><option value="">{isAr ? "اختر..." : "Select..."}</option>{govs.map(g => <option key={g}>{g}</option>)}</select>
              </div>
              <Input label={isAr ? "المدينة" : "City"} req field="city"/>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0 14px" }}>
              <Input label={isAr ? "سنة التأسيس" : "Year Established"} req field="est" type="number"/>
              <div style={{ marginBottom: 14 }}>
                <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: "#374151", marginBottom: 5, fontFamily: ff }}>{isAr ? "الشكل القانوني" : "Legal Type"} <span style={{ color: "#DC2626" }}>*</span></label>
                <select value={form.legal || ""} onChange={e => up("legal", e.target.value)} style={{ width: "100%", padding: "9px 12px", borderRadius: 8, border: "1px solid #d1d5db", fontSize: 13, background: "#fff", fontFamily: ff }}>
                  <option value="">{isAr ? "اختر..." : "Select..."}</option>
                  {(isAr ? ["ذات مسؤولية محدودة","مساهمة","فردية","تضامن","توصية بسيطة"] : ["LLC","Joint Stock","Sole Proprietorship","Partnership","Limited Partnership"]).map(o => <option key={o}>{o}</option>)}
                </select>
              </div>
            </div>
            <Input label={isAr ? "رقم السجل التجاري" : "Commercial Registration #"} req field="crn"/>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0 14px" }}>
              <Input label={isAr ? "رقم البطاقة الضريبية" : "Tax Card #"} req field="tax"/>
              <Input label={isAr ? "رقم بطاقة المُصدّر (GOEIC)" : "GOEIC Exporter Card #"} req field="goeic"/>
            </div>
            <Input label={isAr ? "الموقع الإلكتروني" : "Website"} placeholder="https://..." field="website" type="url"/>
          </>}

          {step === 2 && <>
            <h2 style={{ fontSize: 18, fontWeight: 700, color: "#1A2E1A", margin: "0 0 20px" }}>{isAr ? "الخطوة 2: المنتجات والتصدير" : "Step 2: Products & Export"}</h2>
            <div style={{ marginBottom: 14 }}>
              <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: "#374151", marginBottom: 8, fontFamily: ff }}>{isAr ? "فئات المحاصيل التي تصدّرها" : "Crop Categories"} <span style={{ color: "#DC2626" }}>*</span></label>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))", gap: 6 }}>
                {cropCategories.map(cat => {
                  const sel = (form.crops || []).includes(isAr ? cat.ar : cat.en);
                  return <button key={cat.id} onClick={() => { const val = isAr ? cat.ar : cat.en; const prev = form.crops || []; up("crops", sel ? prev.filter(c => c !== val) : [...prev, val]); }} style={{ display: "flex", alignItems: "center", gap: 6, padding: "8px 12px", borderRadius: 8, border: sel ? "2px solid #1B5E20" : "1px solid #d1d5db", background: sel ? "#dcfce7" : "#fff", cursor: "pointer", fontSize: 12, fontWeight: sel ? 600 : 400, fontFamily: ff }}><span style={{ fontSize: 18 }}>{cat.icon}</span> {isAr ? cat.ar : cat.en}</button>;
                })}
              </div>
            </div>
            <Input label={isAr ? "الأصناف التفصيلية" : "Specific Varieties"} placeholder={isAr ? "فالنسيا، أبو سرة، سبونتا..." : "Valencia, Navel, Spunta..."} field="varieties"/>
            <div style={{ marginBottom: 14 }}>
              <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: "#374151", marginBottom: 8, fontFamily: ff }}>{isAr ? "حجم التصدير السنوي" : "Annual Export Volume"} <span style={{ color: "#DC2626" }}>*</span></label>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 6 }}>
                {(isAr ? ["أقل من 500 طن","500–2,000 طن","2,000–10,000 طن","أكثر من 10,000 طن"] : ["< 500 tons","500–2,000 tons","2,000–10,000 tons","> 10,000 tons"]).map(v => (
                  <button key={v} onClick={() => up("volume", v)} style={{ padding: "8px 12px", borderRadius: 8, border: form.volume === v ? "2px solid #1B5E20" : "1px solid #d1d5db", background: form.volume === v ? "#dcfce7" : "#fff", cursor: "pointer", fontSize: 12, fontFamily: ff }}>{v}</button>
                ))}
              </div>
            </div>
            <Input label={isAr ? "سنوات الخبرة في التصدير" : "Years of Export Experience"} req field="exp" type="number"/>
          </>}

          {step === 3 && <>
            <h2 style={{ fontSize: 18, fontWeight: 700, color: "#1A2E1A", margin: "0 0 20px" }}>{isAr ? "الخطوة 3: بيانات التواصل" : "Step 3: Contact Info"}</h2>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0 14px" }}>
              <Input label={isAr ? "اسم مسؤول التواصل" : "Contact Person"} req field="contactName"/>
              <Input label={isAr ? "المسمى الوظيفي" : "Job Title"} req placeholder={isAr ? "مدير التصدير" : "Export Manager"} field="jobTitle"/>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0 14px" }}>
              <Input label={isAr ? "رقم الموبايل / واتساب" : "Mobile / WhatsApp"} req placeholder="+20 1XX XXX XXXX" field="mobile" type="tel"/>
              <Input label={isAr ? "الهاتف الأرضي" : "Landline"} field="landline" type="tel"/>
            </div>
            <Input label={isAr ? "البريد الإلكتروني التجاري" : "Business Email"} req placeholder="export@company.com" field="bizEmail" type="email"/>
            <div style={{ marginBottom: 14 }}>
              <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: "#374151", marginBottom: 8, fontFamily: ff }}>{isAr ? "لغات التواصل" : "Languages Spoken"} <span style={{ color: "#DC2626" }}>*</span></label>
              <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                {(isAr ? ["عربي","إنجليزي","فرنسي","إيطالي","روسي","ألماني","إسباني","صيني"] : ["Arabic","English","French","Italian","Russian","German","Spanish","Chinese"]).map(l => {
                  const sel = (form.langs || []).includes(l);
                  return <button key={l} onClick={() => { const prev = form.langs || []; up("langs", sel ? prev.filter(x => x !== l) : [...prev, l]); }} style={{ padding: "5px 12px", borderRadius: 18, border: sel ? "2px solid #1B5E20" : "1px solid #d1d5db", background: sel ? "#dcfce7" : "#fff", cursor: "pointer", fontSize: 12, fontFamily: ff }}>{l}</button>;
                })}
              </div>
            </div>
          </>}

          {step === 4 && <>
            <h2 style={{ fontSize: 18, fontWeight: 700, color: "#1A2E1A", margin: "0 0 20px" }}>{isAr ? "الخطوة 4: مراجعة وإرسال" : "Step 4: Review & Submit"}</h2>
            <div style={{ background: "#f0fdf4", borderRadius: 8, padding: 16, marginBottom: 16, border: "1px solid #86efac" }}>
              <h4 style={{ fontSize: 14, fontWeight: 700, color: "#1B5E20", margin: "0 0 10px" }}>{isAr ? "ملخص بياناتك" : "Your Application Summary"}</h4>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, fontSize: 13, color: "#374151" }}>
                {form.nameAr && <div><strong>{isAr ? "الشركة:" : "Company:"}</strong> {form.nameAr} / {form.nameEn}</div>}
                {form.gov && <div><strong>{isAr ? "المحافظة:" : "Gov.:"}</strong> {form.gov}</div>}
                {form.crops && <div><strong>{isAr ? "المحاصيل:" : "Crops:"}</strong> {(form.crops || []).join(", ")}</div>}
                {form.volume && <div><strong>{isAr ? "حجم التصدير:" : "Volume:"}</strong> {form.volume}</div>}
                {form.contactName && <div><strong>{isAr ? "مسؤول التواصل:" : "Contact:"}</strong> {form.contactName}</div>}
                {form.mobile && <div><strong>{isAr ? "الموبايل:" : "Mobile:"}</strong> {form.mobile}</div>}
                {form.bizEmail && <div><strong>{isAr ? "البريد:" : "Email:"}</strong> {form.bizEmail}</div>}
              </div>
            </div>
            <div style={{ background: "#fef3c7", borderRadius: 8, padding: 14, marginBottom: 16, border: "1px solid #fde68a", fontSize: 13, color: "#92400E", display: "flex", alignItems: "flex-start", gap: 8 }}>
              <Info size={18} style={{ flexShrink: 0, marginTop: 2 }}/>
              <div>{isAr ? "بعد الإرسال، سيراجع فريق الإدارة بياناتك خلال 48 ساعة عمل. ستصلك رسالة على بريدك الإلكتروني بنتيجة المراجعة. لن يظهر ملفك للمشترين إلا بعد الموافقة." : "After submission, our team will review your application within 48 business hours. You'll receive an email notification with the result. Your profile won't be visible to buyers until approved."}</div>
            </div>
            <label style={{ display: "flex", alignItems: "flex-start", gap: 8, cursor: "pointer", fontSize: 12, color: "#4b5563", fontFamily: ff, marginBottom: 8 }}>
              <input type="checkbox" checked={form.terms || false} onChange={e => up("terms", e.target.checked)} style={{ marginTop: 2 }}/>
              {isAr ? <>أوافق على <span style={{ color: "#1B5E20", fontWeight: 600 }}>الشروط والأحكام</span> و<span style={{ color: "#1B5E20", fontWeight: 600 }}>سياسة الخصوصية</span> <span style={{ color: "#DC2626" }}>*</span></> : <>I agree to the <span style={{ color: "#1B5E20", fontWeight: 600 }}>Terms & Conditions</span> and <span style={{ color: "#1B5E20", fontWeight: 600 }}>Privacy Policy</span> <span style={{ color: "#DC2626" }}>*</span></>}
            </label>
            {!form.terms && <p style={{ fontSize: 11, color: "#DC2626", margin: "4px 0 0" }}>{isAr ? "يجب الموافقة على الشروط للمتابعة" : "You must accept the terms to proceed"}</p>}
          </>}

          <div style={{ display: "flex", justifyContent: "space-between", marginTop: 28, paddingTop: 18, borderTop: "1px solid #f3f4f6" }}>
            {step > 1 ? <button onClick={() => setStep(step - 1)} style={{ background: "#f3f4f6", color: "#374151", border: "none", padding: "9px 20px", borderRadius: 8, cursor: "pointer", fontSize: 13, fontWeight: 600, fontFamily: ff, display: "flex", alignItems: "center", gap: 5 }}>{isAr ? <ArrowRight size={15}/> : <ArrowLeft size={15}/>} {isAr ? "السابق" : "Back"}</button> : <div/>}
            {step < 4 ? <button onClick={() => setStep(step + 1)} style={{ background: "#1B5E20", color: "#fff", border: "none", padding: "9px 24px", borderRadius: 8, cursor: "pointer", fontSize: 13, fontWeight: 600, fontFamily: ff, display: "flex", alignItems: "center", gap: 5 }}>{isAr ? "التالي" : "Next"} {isAr ? <ArrowLeft size={15}/> : <ArrowRight size={15}/>}</button>
            : <button onClick={() => { if (!form.terms) return; handleSubmit(); }} style={{ background: form.terms ? "#D4A937" : "#e5e7eb", color: form.terms ? "#1A2E1A" : "#9ca3af", border: "none", padding: "9px 24px", borderRadius: 8, cursor: form.terms ? "pointer" : "not-allowed", fontSize: 13, fontWeight: 700, fontFamily: ff, display: "flex", alignItems: "center", gap: 5 }}><CheckCircle size={15}/> {isAr ? "إرسال الطلب للمراجعة" : "Submit for Review"}</button>}
          </div>
        </div>
      </div>
    </div>
  );
};

// ===== SEED INQUIRIES =====
const sampleInquiries = [
  { id: 1, buyerName: "Van Dijk Fresh BV", buyerEmail: "procurement@vandijkfresh.nl", country: "Netherlands", product: "Valencia Oranges", quantity: "200 tons", date: "2026-06-10", status: "new", exporterId: 1 },
  { id: 2, buyerName: "Gulf Food Trading LLC", buyerEmail: "import@gulffood.ae", country: "UAE", product: "Red Onions", quantity: "500 tons", date: "2026-06-08", status: "in-progress", exporterId: 2 },
  { id: 3, buyerName: "Tesco Produce", buyerEmail: "sourcing@tesco.co.uk", country: "UK", product: "Strawberries IQF", quantity: "100 tons", date: "2026-06-05", status: "closed", exporterId: 8 },
  { id: 4, buyerName: "Carrefour Egypt Imports", buyerEmail: "agri@carrefour.fr", country: "France", product: "Table Grapes", quantity: "300 tons", date: "2026-06-12", status: "new", exporterId: 3 },
  { id: 5, buyerName: "Herbex GmbH", buyerEmail: "buy@herbex.de", country: "Germany", product: "Chamomile Dried", quantity: "50 tons", date: "2026-06-14", status: "new", exporterId: 7 },
  { id: 6, buyerName: "Moscow Fresh", buyerEmail: "import@moscowfresh.ru", country: "Russia", product: "Navel Oranges", quantity: "1000 tons", date: "2026-06-01", status: "in-progress", exporterId: 6 },
];

// ===== ABOUT EGYPTIAN AGRICULTURE =====
const AboutPage = () => {
  const { lang } = useLang();
  const isAr = lang === "ar";
  const ff = isAr ? "Cairo, sans-serif" : "Inter, sans-serif";
  const sections = [
    { ar: "لماذا مصر؟", en: "Why Egypt?", descAr: "تتمتع مصر بموقع جغرافي استراتيجي بين ثلاث قارات، مع مناخ متنوع يسمح بالإنتاج الزراعي على مدار العام. نهر النيل ودلتاه الخصبة يوفران مياه ري مستدامة لأكثر من 9 ملايين فدان من الأراضي الزراعية. البنية التحتية اللوجستية المتطورة — 7 موانئ تجارية رئيسية على البحر المتوسط والبحر الأحمر — تضمن وصول المنتجات الطازجة لأوروبا في 5 أيام وللخليج في 3 أيام فقط.", descEn: "Egypt sits at the crossroads of three continents with a diverse climate enabling year-round agricultural production. The Nile River and its fertile Delta provide sustainable irrigation for over 9 million feddans of farmland. World-class logistics infrastructure — 7 major commercial ports on the Mediterranean and Red Sea — ensures fresh produce reaches Europe in 5 days and the Gulf in just 3 days.", icon: "🌍" },
    { ar: "القطاع الزراعي بالأرقام", en: "Agriculture in Numbers", descAr: "يساهم القطاع الزراعي بنحو 11.3% من الناتج المحلي الإجمالي ويوظف أكثر من 25% من القوى العاملة المصرية. بلغت قيمة الصادرات الزراعية المصرية أكثر من 3.2 مليار دولار سنوياً، مع نمو مستمر بمعدل 8-12% سنوياً. مصر هي المُصدّر الأول عالمياً للبرتقال، ومن أكبر 5 مصدّرين للبطاطس والبصل والفراولة.", descEn: "Agriculture contributes approximately 11.3% of GDP and employs over 25% of Egypt's workforce. Egyptian agricultural exports exceed $3.2 billion annually, growing at 8-12% per year. Egypt is the world's #1 orange exporter and ranks among the top 5 global exporters of potatoes, onions, and strawberries.", icon: "📊" },
    { ar: "المحافظات الزراعية الرئيسية", en: "Key Agricultural Governorates", descAr: "الدلتا (البحيرة، الدقهلية، الغربية): بطاطس، أرز، خضروات. الإسماعيلية والشرقية: موالح، فراولة، مانجو. الصعيد (المنيا، أسيوط، الأقصر): تمور، موالح، نباتات طبية وعطرية. النوبارية والأراضي المستصلحة: عنب، زيتون، خوخ. الفيوم وبني سويف: خضروات، أعشاب طازجة.", descEn: "The Delta (Beheira, Dakahlia, Gharbia): potatoes, rice, vegetables. Ismailia & Sharqia: citrus, strawberries, mangoes. Upper Egypt (Minya, Assiut, Luxor): dates, citrus, medicinal plants. Nubaria & reclaimed lands: grapes, olives, stone fruits. Fayoum & Beni Suef: vegetables, fresh herbs.", icon: "🗺️" },
    { ar: "الموانئ وسلاسل التوريد", en: "Ports & Supply Chain", descAr: "الإسكندرية: الميناء الأكبر — يستقبل 60% من الصادرات الزراعية المتجهة لأوروبا. دمياط وبورسعيد: ممرات رئيسية لشمال أوروبا وروسيا. السخنة وشرق بورسعيد: بوابة الخليج وآسيا عبر قناة السويس. جميع الموانئ مجهزة بمرافق تبريد ومنشآت فحص نباتي معتمدة دولياً.", descEn: "Alexandria: the largest port handling 60% of agricultural exports to Europe. Damietta & Port Said: key corridors to Northern Europe and Russia. Sokhna & East Port Said: gateway to the Gulf and Asia via the Suez Canal. All ports are equipped with cold chain facilities and internationally accredited phytosanitary inspection.", icon: "🚢" },
    { ar: "الاتفاقيات التجارية", en: "Trade Agreements", descAr: "تستفيد مصر من اتفاقيات تجارية تفضيلية مع الاتحاد الأوروبي (شهادة EUR.1 لإعفاء جمركي)، ودول الخليج (منطقة التجارة العربية الحرة الكبرى — GAFTA)، وأفريقيا (اتفاقية التجارة الحرة القارية — AfCFTA)، وتركيا واتفاقيات ثنائية مع أكثر من 50 دولة.", descEn: "Egypt benefits from preferential trade agreements with the EU (EUR.1 certificate for tariff exemption), Gulf states (Greater Arab Free Trade Area — GAFTA), Africa (African Continental Free Trade Area — AfCFTA), Turkey, and bilateral agreements with 50+ countries.", icon: "🤝" },
    { ar: "رؤية مصر 2030 والزراعة", en: "Egypt Vision 2030 & Agriculture", descAr: "تستهدف رؤية مصر 2030 زيادة الصادرات الزراعية بنسبة 20% واستصلاح 1.5 مليون فدان جديد. مشروعات قومية كبرى مثل الدلتا الجديدة (2.2 مليون فدان) ومشروع توشكى في جنوب الوادي تفتح آفاقاً جديدة للإنتاج التصديري. التحول الرقمي في القطاع الزراعي يشمل منصات التجارة الإلكترونية وأنظمة التتبع الذكية.", descEn: "Egypt Vision 2030 targets a 20% increase in agricultural exports and reclamation of 1.5 million new feddans. Major national projects like the New Delta (2.2 million feddans) and Toshka in the south open new frontiers for export-grade production. Digital transformation includes e-commerce platforms and smart traceability systems.", icon: "🚀" },
  ];
  return (
    <div style={{ background: "#FAF8F3", minHeight: "80vh", fontFamily: ff }}>
      <div style={{ background: "linear-gradient(135deg, #1B5E20, #2E7D32)", padding: "48px 20px", direction: isAr ? "rtl" : "ltr" }}>
        <div style={{ maxWidth: 800, margin: "0 auto", textAlign: "center" }}>
          <h1 style={{ color: "#fff", fontSize: 30, fontWeight: 800, margin: "0 0 10px" }}>{isAr ? "عن الزراعة المصرية" : "About Egyptian Agriculture"}</h1>
          <p style={{ color: "rgba(255,255,255,0.8)", fontSize: 15, margin: 0, lineHeight: 1.7 }}>{isAr ? "لماذا يختار المستوردون حول العالم مصر كمصدر رئيسي للحاصلات الزراعية الطازجة" : "Why importers worldwide choose Egypt as a primary source for fresh agricultural produce"}</p>
        </div>
      </div>
      <div style={{ maxWidth: 900, margin: "0 auto", padding: "32px 20px", direction: isAr ? "rtl" : "ltr" }}>
        {sections.map((s, i) => (
          <div key={i} style={{ background: "#fff", borderRadius: 12, padding: 28, marginBottom: 18, border: "1px solid #e8e4dc", display: "flex", gap: 20, alignItems: "flex-start" }}
            className="aboutCard">
            <div style={{ fontSize: 36, width: 56, height: 56, display: "flex", alignItems: "center", justifyContent: "center", background: "#f0fdf4", borderRadius: 12, flexShrink: 0 }}>{s.icon}</div>
            <div style={{ flex: 1 }}>
              <h3 style={{ fontSize: 19, fontWeight: 700, color: "#1B5E20", margin: "0 0 10px" }}>{isAr ? s.ar : s.en}</h3>
              <p style={{ fontSize: 14, color: "#4b5563", lineHeight: 1.9, margin: 0 }}>{isAr ? s.descAr : s.descEn}</p>
            </div>
          </div>
        ))}
      </div>
      <style>{`@media(max-width:600px){.aboutCard{flex-direction:column!important;align-items:center!important;text-align:center}}`}</style>
    </div>
  );
};

// ===== ADMIN DASHBOARD =====
const AdminDashboard = ({ setPage, setSelectedExporter, users, addUser, updateUserRole, deleteUser, exporterApps, approveExporterApp, rejectExporterApp }) => {
  const { lang } = useLang();
  const isAr = lang === "ar";
  const ff = isAr ? "Cairo, sans-serif" : "Inter, sans-serif";
  const [tab, setTab] = useState("pending");
  const [expData, setExpData] = useState(exporters.map(e => ({ ...e, status: e.verified ? "approved" : "pending", completion: e.verified ? 85 : 45 })));
  const [notes, setNotes] = useState({});

  const pending = expData.filter(e => e.status === "pending");
  const approved = expData.filter(e => e.status === "approved");
  const allInquiries = sampleInquiries;
  const newInq = allInquiries.filter(i => i.status === "new").length;

  const updateStatus = (id, status) => setExpData(prev => prev.map(e => e.id === id ? { ...e, status, verified: status === "approved" } : e));
  const toggleFeatured = (id) => setExpData(prev => prev.map(e => e.id === id ? { ...e, featured: !e.featured } : e));

  const statCards = [
    { ar: "إجمالي المُصدّرين", en: "Total Exporters", val: expData.length, color: "#1B5E20" },
    { ar: "في انتظار الموافقة", en: "Pending", val: pending.length, color: "#D97706" },
    { ar: "مُعتمدون", en: "Approved", val: approved.length, color: "#16A34A" },
    { ar: "استفسارات جديدة", en: "New Inquiries", val: newInq, color: "#2563EB" },
  ];

  const pendingApps = (exporterApps || []).filter(a => a.status === "pending");

  const tabs = [
    { key: "apps", ar: "طلبات جديدة", en: "New Applications", count: pendingApps.length },
    { key: "pending", ar: "في الانتظار", en: "Pending", count: pending.length },
    { key: "all", ar: "كل المُصدّرين", en: "All Exporters", count: expData.length },
    { key: "inquiries", ar: "الاستفسارات", en: "Inquiries", count: allInquiries.length },
    { key: "users", ar: "إدارة المستخدمين", en: "User Management", count: users?.length || 0 },
  ];

  return (
    <div style={{ background: "#FAF8F3", minHeight: "80vh", fontFamily: ff }}>
      <div style={{ background: "#1B5E20", padding: "32px 20px", direction: isAr ? "rtl" : "ltr" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
            <div>
              <h1 style={{ color: "#fff", fontSize: 24, fontWeight: 800, margin: "0 0 4px" }}>{isAr ? "لوحة تحكم الأدمن" : "Admin Dashboard"}</h1>
              <p style={{ color: "rgba(255,255,255,0.7)", fontSize: 13, margin: 0 }}>{isAr ? "إدارة المُصدّرين والاستفسارات والمحتوى" : "Manage exporters, inquiries, and content"}</p>
            </div>
            <span style={{ background: "rgba(255,255,255,0.15)", color: "#D4A937", padding: "6px 14px", borderRadius: 8, fontSize: 12, fontWeight: 600 }}>Admin</span>
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "24px 20px", direction: isAr ? "rtl" : "ltr" }}>
        {/* Stats */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 14, marginBottom: 24 }}>
          {statCards.map((s, i) => (
            <div key={i} style={{ background: "#fff", borderRadius: 10, padding: 20, border: "1px solid #e8e4dc", textAlign: "center" }}>
              <div style={{ fontSize: 28, fontWeight: 800, color: s.color }}>{s.val}</div>
              <div style={{ fontSize: 12, color: "#6b7280", marginTop: 4 }}>{isAr ? s.ar : s.en}</div>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div style={{ display: "flex", gap: 4, marginBottom: 20 }}>
          {tabs.map(t => (
            <button key={t.key} onClick={() => setTab(t.key)} style={{ padding: "8px 18px", borderRadius: 8, border: "none", cursor: "pointer", fontSize: 13, fontWeight: tab === t.key ? 700 : 400, background: tab === t.key ? "#1B5E20" : "#fff", color: tab === t.key ? "#fff" : "#374151", fontFamily: ff, display: "flex", alignItems: "center", gap: 6 }}>
              {isAr ? t.ar : t.en} <span style={{ background: tab === t.key ? "rgba(255,255,255,0.2)" : "#f3f4f6", padding: "1px 8px", borderRadius: 10, fontSize: 11 }}>{t.count}</span>
            </button>
          ))}
        </div>

        {/* Pending Tab */}
        {tab === "pending" && (
          <div>
            {pending.length === 0 && <div style={{ background: "#fff", borderRadius: 10, padding: 40, textAlign: "center", color: "#9ca3af", border: "1px solid #e8e4dc" }}><CheckCircle size={36} style={{ marginBottom: 8, opacity: 0.3 }}/><p style={{ fontWeight: 600, margin: 0 }}>{isAr ? "لا توجد طلبات معلّقة" : "No pending requests"}</p></div>}
            {pending.map(exp => (
              <div key={exp.id} style={{ background: "#fff", borderRadius: 10, padding: 20, marginBottom: 12, border: "1px solid #e8e4dc", borderRight: isAr ? "4px solid #D97706" : "none", borderLeft: !isAr ? "4px solid #D97706" : "none" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 12 }}>
                  <div>
                    <h3 style={{ fontSize: 16, fontWeight: 700, color: "#1A2E1A", margin: "0 0 4px" }}>{isAr ? exp.nameAr : exp.nameEn}</h3>
                    <div style={{ fontSize: 12, color: "#6b7280", display: "flex", gap: 10 }}>
                      <span><MapPin size={12} style={{ verticalAlign: "middle" }}/> {isAr ? exp.govAr : exp.govEn}</span>
                      <span>{isAr ? `اكتمال الملف: ${exp.completion}%` : `Profile: ${exp.completion}%`}</span>
                    </div>
                  </div>
                  <div style={{ display: "flex", gap: 8 }}>
                    <button onClick={() => updateStatus(exp.id, "approved")} style={{ background: "#16A34A", color: "#fff", border: "none", padding: "8px 18px", borderRadius: 6, cursor: "pointer", fontSize: 12, fontWeight: 600, fontFamily: ff }}><Check size={14} style={{ verticalAlign: "middle" }}/> {isAr ? "موافقة" : "Approve"}</button>
                    <button onClick={() => updateStatus(exp.id, "rejected")} style={{ background: "#fff", color: "#DC2626", border: "1px solid #DC2626", padding: "8px 18px", borderRadius: 6, cursor: "pointer", fontSize: 12, fontWeight: 600, fontFamily: ff }}>{isAr ? "رفض" : "Reject"}</button>
                  </div>
                </div>
                <div style={{ marginTop: 10 }}>
                  <input placeholder={isAr ? "ملاحظات الأدمن (اختياري)..." : "Admin notes (optional)..."} value={notes[exp.id] || ""} onChange={e => setNotes(p => ({...p, [exp.id]: e.target.value}))} style={{ width: "100%", padding: "8px 12px", borderRadius: 6, border: "1px solid #e5e7eb", fontSize: 12, boxSizing: "border-box", direction: isAr ? "rtl" : "ltr", fontFamily: ff }}/>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* All Exporters Tab */}
        {tab === "all" && (
          <div style={{ background: "#fff", borderRadius: 10, border: "1px solid #e8e4dc", overflow: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 700 }}>
              <thead>
                <tr style={{ background: "#f9fafb" }}>
                  <th style={{ textAlign: isAr ? "right" : "left", padding: "10px 14px", fontSize: 12, color: "#6b7280", fontWeight: 600, fontFamily: ff }}>{isAr ? "الشركة" : "Company"}</th>
                  <th style={{ padding: "10px", fontSize: 12, color: "#6b7280", fontWeight: 600 }}>{isAr ? "المحافظة" : "Gov."}</th>
                  <th style={{ padding: "10px", fontSize: 12, color: "#6b7280", fontWeight: 600 }}>{isAr ? "الحالة" : "Status"}</th>
                  <th style={{ padding: "10px", fontSize: 12, color: "#6b7280", fontWeight: 600 }}>{isAr ? "اكتمال" : "Compl."}</th>
                  <th style={{ padding: "10px", fontSize: 12, color: "#6b7280", fontWeight: 600 }}>{isAr ? "مميز" : "Featured"}</th>
                  <th style={{ padding: "10px", fontSize: 12, color: "#6b7280", fontWeight: 600 }}>{isAr ? "إجراء" : "Action"}</th>
                </tr>
              </thead>
              <tbody>
                {expData.map(exp => (
                  <tr key={exp.id} style={{ borderTop: "1px solid #f3f4f6" }}>
                    <td style={{ padding: "10px 14px" }}>
                      <div style={{ fontWeight: 600, fontSize: 13, color: "#1A2E1A" }}>{isAr ? exp.nameAr : exp.nameEn}</div>
                      <div style={{ fontSize: 11, color: "#9ca3af" }}>{isAr ? exp.nameEn : exp.nameAr}</div>
                    </td>
                    <td style={{ padding: "10px", fontSize: 12, color: "#6b7280", textAlign: "center" }}>{isAr ? exp.govAr : exp.govEn}</td>
                    <td style={{ padding: "10px", textAlign: "center" }}>
                      <span style={{ fontSize: 11, padding: "2px 10px", borderRadius: 10, fontWeight: 600, background: exp.status === "approved" ? "#dcfce7" : exp.status === "pending" ? "#fef3c7" : "#fecaca", color: exp.status === "approved" ? "#16a34a" : exp.status === "pending" ? "#d97706" : "#dc2626" }}>{exp.status === "approved" ? (isAr ? "معتمد" : "Approved") : exp.status === "pending" ? (isAr ? "معلّق" : "Pending") : (isAr ? "مرفوض" : "Rejected")}</span>
                    </td>
                    <td style={{ padding: "10px", textAlign: "center" }}>
                      <div style={{ width: 40, height: 6, background: "#e5e7eb", borderRadius: 3, margin: "0 auto" }}><div style={{ width: `${exp.completion}%`, height: "100%", background: exp.completion >= 80 ? "#16a34a" : exp.completion >= 50 ? "#d97706" : "#dc2626", borderRadius: 3 }}/></div>
                      <span style={{ fontSize: 10, color: "#9ca3af" }}>{exp.completion}%</span>
                    </td>
                    <td style={{ padding: "10px", textAlign: "center" }}>
                      <button onClick={() => toggleFeatured(exp.id)} style={{ background: exp.featured ? "#D4A937" : "#f3f4f6", color: exp.featured ? "#1A2E1A" : "#9ca3af", border: "none", padding: "4px 10px", borderRadius: 4, cursor: "pointer", fontSize: 11, fontWeight: 600 }}>{exp.featured ? "★" : "☆"}</button>
                    </td>
                    <td style={{ padding: "10px", textAlign: "center" }}>
                      <button onClick={() => { setSelectedExporter(exp); setPage("profile"); }} style={{ background: "none", border: "none", color: "#1B5E20", cursor: "pointer", fontSize: 12, fontWeight: 600, fontFamily: ff }}>{isAr ? "عرض" : "View"}</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Inquiries Tab */}
        {tab === "inquiries" && (
          <div>
            {allInquiries.map(inq => {
              const exp = exporters.find(e => e.id === inq.exporterId);
              return (
                <div key={inq.id} style={{ background: "#fff", borderRadius: 10, padding: 18, marginBottom: 10, border: "1px solid #e8e4dc", borderRight: isAr ? `4px solid ${inq.status === "new" ? "#2563EB" : inq.status === "in-progress" ? "#D97706" : "#16A34A"}` : "none", borderLeft: !isAr ? `4px solid ${inq.status === "new" ? "#2563EB" : inq.status === "in-progress" ? "#D97706" : "#16A34A"}` : "none" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 8 }}>
                    <div>
                      <h4 style={{ fontSize: 14, fontWeight: 700, color: "#1A2E1A", margin: "0 0 4px" }}>{inq.buyerName} <span style={{ fontWeight: 400, color: "#9ca3af", fontSize: 12 }}>({inq.country})</span></h4>
                      <div style={{ fontSize: 12, color: "#6b7280" }}>{isAr ? "المنتج:" : "Product:"} {inq.product} · {isAr ? "الكمية:" : "Qty:"} {inq.quantity}</div>
                      <div style={{ fontSize: 11, color: "#9ca3af", marginTop: 4 }}>{isAr ? "إلى:" : "To:"} {exp ? (isAr ? exp.nameAr : exp.nameEn) : "—"} · {inq.date}</div>
                    </div>
                    <span style={{ fontSize: 11, padding: "3px 10px", borderRadius: 10, fontWeight: 600, background: inq.status === "new" ? "#dbeafe" : inq.status === "in-progress" ? "#fef3c7" : "#dcfce7", color: inq.status === "new" ? "#2563eb" : inq.status === "in-progress" ? "#d97706" : "#16a34a" }}>{inq.status === "new" ? (isAr ? "جديد" : "New") : inq.status === "in-progress" ? (isAr ? "قيد التنفيذ" : "In Progress") : (isAr ? "مغلق" : "Closed")}</span>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* New Applications Tab */}
        {tab === "apps" && (
          <div>
            {pendingApps.length === 0 && <div style={{ background: "#fff", borderRadius: 10, padding: 40, textAlign: "center", color: "#9ca3af", border: "1px solid #e8e4dc" }}><CheckCircle size={36} style={{ marginBottom: 8, opacity: 0.3 }}/><p style={{ fontWeight: 600, margin: 0 }}>{isAr ? "لا توجد طلبات جديدة" : "No new applications"}</p></div>}
            {(exporterApps || []).map(app => (
              <div key={app.id} style={{ background: "#fff", borderRadius: 10, padding: 20, marginBottom: 12, border: "1px solid #e8e4dc", borderRight: isAr ? `4px solid ${app.status === "pending" ? "#D97706" : app.status === "approved" ? "#16A34A" : "#DC2626"}` : "none", borderLeft: !isAr ? `4px solid ${app.status === "pending" ? "#D97706" : app.status === "approved" ? "#16A34A" : "#DC2626"}` : "none" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 12 }}>
                  <div>
                    <h3 style={{ fontSize: 16, fontWeight: 700, color: "#1A2E1A", margin: "0 0 4px" }}>{app.nameAr || app.nameEn || (isAr ? "مُصدّر جديد" : "New Exporter")}</h3>
                    <div style={{ fontSize: 12, color: "#6b7280", display: "flex", gap: 10, flexWrap: "wrap" }}>
                      <span><Mail size={12} style={{ verticalAlign: "middle" }}/> {app.userEmail}</span>
                      <span><Clock size={12} style={{ verticalAlign: "middle" }}/> {app.submittedAt}</span>
                      {app.gov && <span><MapPin size={12} style={{ verticalAlign: "middle" }}/> {app.gov}</span>}
                    </div>
                    {app.crops && <div style={{ marginTop: 6, display: "flex", gap: 4, flexWrap: "wrap" }}>{(Array.isArray(app.crops) ? app.crops : []).map(c => <span key={c} style={{ background: "#1B5E20", color: "#fff", fontSize: 10, padding: "2px 6px", borderRadius: 4, fontWeight: 600 }}>{c}</span>)}</div>}
                    <span style={{ display: "inline-block", marginTop: 6, fontSize: 11, padding: "2px 10px", borderRadius: 10, fontWeight: 600, background: app.status === "pending" ? "#fef3c7" : app.status === "approved" ? "#dcfce7" : "#fecaca", color: app.status === "pending" ? "#d97706" : app.status === "approved" ? "#16a34a" : "#dc2626" }}>{app.status === "pending" ? (isAr ? "معلّق" : "Pending") : app.status === "approved" ? (isAr ? "تمت الموافقة" : "Approved") : (isAr ? "مرفوض" : "Rejected")}</span>
                  </div>
                  {app.status === "pending" && (
                    <div style={{ display: "flex", gap: 8 }}>
                      <button onClick={() => approveExporterApp(app.id)} style={{ background: "#16A34A", color: "#fff", border: "none", padding: "8px 18px", borderRadius: 6, cursor: "pointer", fontSize: 12, fontWeight: 600, fontFamily: ff, display: "flex", alignItems: "center", gap: 4 }}><Check size={14}/> {isAr ? "موافقة" : "Approve"}</button>
                      <button onClick={() => rejectExporterApp(app.id, isAr ? "يرجى استكمال البيانات" : "Please complete your data")} style={{ background: "#fff", color: "#DC2626", border: "1px solid #DC2626", padding: "8px 18px", borderRadius: 6, cursor: "pointer", fontSize: 12, fontWeight: 600, fontFamily: ff }}>{isAr ? "رفض" : "Reject"}</button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* User Management Tab */}
        {tab === "users" && (
          <div>
            <div style={{ background: "#fff", borderRadius: 10, padding: 20, border: "1px solid #e8e4dc", marginBottom: 16 }}>
              <h3 style={{ fontSize: 16, fontWeight: 700, color: "#1A2E1A", margin: "0 0 14px" }}>{isAr ? "إضافة مستخدم جديد" : "Add New User"}</h3>
              <UserAddForm addUser={addUser} isAr={isAr} ff={ff}/>
            </div>
            <div style={{ background: "#fff", borderRadius: 10, border: "1px solid #e8e4dc", overflow: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 600 }}>
                <thead>
                  <tr style={{ background: "#f9fafb" }}>
                    <th style={{ textAlign: isAr ? "right" : "left", padding: "10px 14px", fontSize: 12, color: "#6b7280", fontWeight: 600, fontFamily: ff }}>{isAr ? "المستخدم" : "User"}</th>
                    <th style={{ padding: "10px", fontSize: 12, color: "#6b7280", fontWeight: 600 }}>{isAr ? "البريد" : "Email"}</th>
                    <th style={{ padding: "10px", fontSize: 12, color: "#6b7280", fontWeight: 600 }}>{isAr ? "الدور" : "Role"}</th>
                    <th style={{ padding: "10px", fontSize: 12, color: "#6b7280", fontWeight: 600 }}>{isAr ? "التاريخ" : "Created"}</th>
                    <th style={{ padding: "10px", fontSize: 12, color: "#6b7280", fontWeight: 600 }}>{isAr ? "إجراء" : "Action"}</th>
                  </tr>
                </thead>
                <tbody>
                  {(users || []).map(u => (
                    <tr key={u.id} style={{ borderTop: "1px solid #f3f4f6" }}>
                      <td style={{ padding: "10px 14px", fontSize: 13, fontWeight: 600, color: "#1A2E1A" }}>{u.firstName} {u.lastName}</td>
                      <td style={{ padding: "10px", fontSize: 12, color: "#6b7280", direction: "ltr" }}>{u.email}</td>
                      <td style={{ padding: "10px", textAlign: "center" }}>
                        <select value={u.role} onChange={e => updateUserRole(u.id, e.target.value)} style={{ padding: "4px 8px", borderRadius: 6, border: "1px solid #d1d5db", fontSize: 11, fontWeight: 600, background: u.role === "admin" ? "#fef3c7" : u.role === "exporter" ? "#dcfce7" : "#dbeafe", cursor: "pointer" }}>
                          <option value="admin">Admin</option>
                          <option value="exporter">{isAr ? "مُصدّر" : "Exporter"}</option>
                          <option value="buyer">{isAr ? "مشتري" : "Buyer"}</option>
                        </select>
                      </td>
                      <td style={{ padding: "10px", fontSize: 11, color: "#9ca3af", textAlign: "center" }}>{u.createdAt}</td>
                      <td style={{ padding: "10px", textAlign: "center" }}>
                        <button onClick={() => deleteUser(u.id)} disabled={u.role === "admin" && users.filter(x => x.role === "admin").length <= 1} style={{ background: "none", border: "none", color: "#DC2626", cursor: "pointer", fontSize: 11, fontWeight: 600, opacity: (u.role === "admin" && users.filter(x => x.role === "admin").length <= 1) ? 0.3 : 1 }}>{isAr ? "حذف" : "Delete"}</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// User Add Form sub-component
const UserAddForm = ({ addUser, isAr, ff }) => {
  const [f, setF] = useState({ email: "", firstName: "", lastName: "", role: "exporter", password: "" });
  const [msg, setMsg] = useState("");
  const handleAdd = () => {
    if (!f.email || !f.firstName || !f.password) { setMsg(isAr ? "أكمل كل الحقول المطلوبة" : "Fill all required fields"); return; }
    const result = addUser(f);
    if (result.success) { setMsg(isAr ? "✅ تم إضافة المستخدم بنجاح" : "✅ User added successfully"); setF({ email: "", firstName: "", lastName: "", role: "exporter", password: "" }); }
    else if (result.error === "exists") { setMsg(isAr ? "❌ هذا البريد مسجّل بالفعل" : "❌ Email already registered"); }
  };
  return (
    <div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8, marginBottom: 8 }}>
        <input placeholder={isAr ? "الاسم الأول *" : "First name *"} value={f.firstName} onChange={e => setF(p => ({...p, firstName: e.target.value}))} style={{ padding: "8px 10px", borderRadius: 6, border: "1px solid #d1d5db", fontSize: 12, fontFamily: ff }}/>
        <input placeholder={isAr ? "الاسم الأخير" : "Last name"} value={f.lastName} onChange={e => setF(p => ({...p, lastName: e.target.value}))} style={{ padding: "8px 10px", borderRadius: 6, border: "1px solid #d1d5db", fontSize: 12 }}/>
        <select value={f.role} onChange={e => setF(p => ({...p, role: e.target.value}))} style={{ padding: "8px 10px", borderRadius: 6, border: "1px solid #d1d5db", fontSize: 12, fontFamily: ff }}>
          <option value="admin">Admin</option>
          <option value="exporter">{isAr ? "مُصدّر" : "Exporter"}</option>
          <option value="buyer">{isAr ? "مشتري" : "Buyer"}</option>
        </select>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr auto", gap: 8 }}>
        <input placeholder={isAr ? "البريد الإلكتروني *" : "Email *"} type="email" value={f.email} onChange={e => setF(p => ({...p, email: e.target.value}))} style={{ padding: "8px 10px", borderRadius: 6, border: "1px solid #d1d5db", fontSize: 12, direction: "ltr" }}/>
        <input placeholder={isAr ? "كلمة المرور *" : "Password *"} type="password" value={f.password} onChange={e => setF(p => ({...p, password: e.target.value}))} style={{ padding: "8px 10px", borderRadius: 6, border: "1px solid #d1d5db", fontSize: 12, direction: "ltr" }}/>
        <button onClick={handleAdd} style={{ background: "#1B5E20", color: "#fff", border: "none", padding: "8px 18px", borderRadius: 6, cursor: "pointer", fontSize: 12, fontWeight: 700, fontFamily: ff, whiteSpace: "nowrap" }}>{isAr ? "إضافة" : "Add"}</button>
      </div>
      {msg && <p style={{ fontSize: 12, marginTop: 8, color: msg.includes("✅") ? "#16a34a" : "#dc2626", fontWeight: 600 }}>{msg}</p>}
    </div>
  );
};
const ExporterDashboard = ({ setPage, myApp }) => {
  const { lang } = useLang();
  const { currentUser } = useAuth();
  const isAr = lang === "ar";
  const ff = isAr ? "Cairo, sans-serif" : "Inter, sans-serif";
  const [tab, setTab] = useState("overview");
  const myExporter = exporters[6];
  const myInquiries = sampleInquiries.filter(i => i.exporterId === myExporter.id);
  const appStatus = myApp?.status || (currentUser?.exporterApproved ? "approved" : "pending");
  const completion = 72;

  const statusConfig = {
    pending: { bg: "#fef3c7", border: "#fde68a", color: "#92400E", icon: <Clock size={22} color="#D97706"/>, ar: "طلبك قيد المراجعة — سيتم إخطارك عند الموافقة", en: "Your application is under review — you'll be notified upon approval", label: isAr ? "في الانتظار" : "Pending" },
    approved: { bg: "#dcfce7", border: "#86efac", color: "#166534", icon: <CheckCircle size={22} color="#16A34A"/>, ar: "تم اعتماد ملفك — أنت ظاهر للمشترين الدوليين الآن", en: "Your profile is approved — you're now visible to international buyers", label: isAr ? "معتمد" : "Approved" },
    rejected: { bg: "#fecaca", border: "#fca5a5", color: "#991B1B", icon: <AlertCircle size={22} color="#DC2626"/>, ar: "تم رفض طلبك — راجع الملاحظات وأعد التقديم", en: "Your application was rejected — review notes and resubmit", label: isAr ? "مرفوض" : "Rejected" },
  };
  const st = statusConfig[appStatus] || statusConfig.pending;

  const checklist = [
    { ar: "شعار الشركة", en: "Company Logo", done: true },
    { ar: "النبذة بالعربي", en: "Arabic Bio", done: true },
    { ar: "النبذة بالإنجليزي", en: "English Bio", done: true },
    { ar: "الشهادات", en: "Certifications", done: true },
    { ar: "صور المنتجات", en: "Product Photos", done: false },
    { ar: "القدرات الإنتاجية", en: "Production Capacity", done: true },
    { ar: "الأسواق والموانئ", en: "Markets & Ports", done: true },
    { ar: "مستندات التوثيق", en: "Verification Docs", done: false },
    { ar: "عملاء مرجعيون", en: "Reference Clients", done: false },
  ];
  const doneTasks = checklist.filter(c => c.done).length;

  const tabs = [
    { key: "overview", ar: "نظرة عامة", en: "Overview" },
    { key: "inquiries", ar: "الاستفسارات", en: "Inquiries" },
    { key: "profile", ar: "تعديل الملف", en: "Edit Profile" },
    { key: "verification", ar: "التوثيق", en: "Verification" },
  ];

  return (
    <div style={{ background: "#FAF8F3", minHeight: "80vh", fontFamily: ff }}>
      <div style={{ background: "#1B5E20", padding: "32px 20px", direction: isAr ? "rtl" : "ltr" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <h1 style={{ color: "#fff", fontSize: 22, fontWeight: 800, margin: "0 0 4px" }}>{isAr ? `مرحباً، ${myExporter.nameAr}` : `Welcome, ${myExporter.nameEn}`}</h1>
          <p style={{ color: "rgba(255,255,255,0.7)", fontSize: 13, margin: 0 }}>{isAr ? "لوحة تحكم المُصدّر — أدر ملفك واستفساراتك" : "Exporter Dashboard — Manage your profile and inquiries"}</p>
        </div>
      </div>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "24px 20px", direction: isAr ? "rtl" : "ltr" }}>
        {/* Status Banner */}
        <div style={{ background: st.bg, border: `1px solid ${st.border}`, borderRadius: 10, padding: 18, marginBottom: 20, display: "flex", alignItems: "center", gap: 14 }}>
          {st.icon}
          <div style={{ flex: 1 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 2 }}>
              <span style={{ fontSize: 14, fontWeight: 700, color: st.color }}>{isAr ? "حالة الطلب:" : "Application Status:"}</span>
              <span style={{ fontSize: 12, fontWeight: 700, color: st.color, background: "rgba(255,255,255,0.5)", padding: "2px 10px", borderRadius: 10 }}>{st.label}</span>
            </div>
            <p style={{ fontSize: 13, color: st.color, margin: 0, lineHeight: 1.5 }}>{isAr ? st.ar : st.en}</p>
            {myApp?.rejectReason && <p style={{ fontSize: 12, color: st.color, margin: "6px 0 0", fontWeight: 600 }}>{isAr ? "سبب الرفض: " : "Reason: "}{myApp.rejectReason}</p>}
          </div>
        </div>

        {appStatus === "pending" && (
          <div style={{ background: "#fff", borderRadius: 10, padding: 24, border: "1px solid #e8e4dc", marginBottom: 20, textAlign: "center" }}>
            <Clock size={40} color="#D97706" style={{ marginBottom: 12, opacity: 0.6 }}/>
            <h3 style={{ fontSize: 18, fontWeight: 700, color: "#1A2E1A", margin: "0 0 8px" }}>{isAr ? "ملفك في انتظار الموافقة" : "Your profile is awaiting approval"}</h3>
            <p style={{ fontSize: 13, color: "#6b7280", lineHeight: 1.7, maxWidth: 500, margin: "0 auto" }}>{isAr ? "بمجرد موافقة فريق الإدارة على طلبك، ستتمكن من تعديل ملفك واستقبال استفسارات من المشترين الدوليين. عادةً ما تستغرق المراجعة 48 ساعة عمل." : "Once the admin team approves your application, you'll be able to edit your profile and receive inquiries from international buyers. Review typically takes 48 business hours."}</p>
          </div>
        )}

        {appStatus !== "pending" && <>
        {/* Completion Bar */}
        <div style={{ background: "#fff", borderRadius: 10, padding: 20, border: "1px solid #e8e4dc", marginBottom: 20 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
            <span style={{ fontSize: 14, fontWeight: 700, color: "#1A2E1A" }}>{isAr ? "اكتمال الملف" : "Profile Completion"}</span>
            <span style={{ fontSize: 22, fontWeight: 800, color: completion >= 80 ? "#16a34a" : "#d97706" }}>{completion}%</span>
          </div>
          <div style={{ width: "100%", height: 8, background: "#e5e7eb", borderRadius: 4 }}>
            <div style={{ width: `${completion}%`, height: "100%", background: completion >= 80 ? "#16a34a" : "#D4A937", borderRadius: 4, transition: "width 0.5s" }}/>
          </div>
          <div style={{ marginTop: 12, display: "flex", flexWrap: "wrap", gap: 8 }}>
            {checklist.map((c, i) => (
              <span key={i} style={{ fontSize: 11, padding: "3px 10px", borderRadius: 12, background: c.done ? "#dcfce7" : "#fef3c7", color: c.done ? "#16a34a" : "#d97706", fontWeight: 500, display: "flex", alignItems: "center", gap: 4 }}>
                {c.done ? <Check size={11}/> : <AlertCircle size={11}/>} {isAr ? c.ar : c.en}
              </span>
            ))}
          </div>
        </div>

        {/* Tabs */}
        <div style={{ display: "flex", gap: 4, marginBottom: 20 }}>
          {tabs.map(t => (
            <button key={t.key} onClick={() => setTab(t.key)} style={{ padding: "8px 16px", borderRadius: 8, border: "none", cursor: "pointer", fontSize: 12, fontWeight: tab === t.key ? 700 : 400, background: tab === t.key ? "#1B5E20" : "#fff", color: tab === t.key ? "#fff" : "#374151", fontFamily: ff }}>{isAr ? t.ar : t.en}</button>
          ))}
        </div>

        {/* Overview */}
        {tab === "overview" && (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 14 }}>
            {[
              { ar: "مشاهدات الملف", en: "Profile Views", val: 347, icon: <Eye size={20}/>, color: "#2563EB" },
              { ar: "إجمالي الاستفسارات", en: "Total Inquiries", val: myInquiries.length, icon: <Mail size={20}/>, color: "#16A34A" },
              { ar: "استفسارات جديدة", en: "New Inquiries", val: myInquiries.filter(i => i.status === "new").length, icon: <AlertCircle size={20}/>, color: "#D97706" },
              { ar: "الشهادات النشطة", en: "Active Certs", val: myExporter.certs.length, icon: <Shield size={20}/>, color: "#7C3AED" },
            ].map((s, i) => (
              <div key={i} style={{ background: "#fff", borderRadius: 10, padding: 20, border: "1px solid #e8e4dc", display: "flex", alignItems: "center", gap: 14 }}>
                <div style={{ width: 44, height: 44, borderRadius: 10, background: s.color + "12", color: s.color, display: "flex", alignItems: "center", justifyContent: "center" }}>{s.icon}</div>
                <div>
                  <div style={{ fontSize: 24, fontWeight: 800, color: "#1A2E1A" }}>{s.val}</div>
                  <div style={{ fontSize: 11, color: "#6b7280" }}>{isAr ? s.ar : s.en}</div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Inquiries */}
        {tab === "inquiries" && (
          <div>
            {myInquiries.length === 0 && <div style={{ background: "#fff", borderRadius: 10, padding: 40, textAlign: "center", color: "#9ca3af", border: "1px solid #e8e4dc" }}><Mail size={36} style={{ marginBottom: 8, opacity: 0.3 }}/><p style={{ fontWeight: 600, margin: 0 }}>{isAr ? "لا توجد استفسارات بعد" : "No inquiries yet"}</p></div>}
            {myInquiries.map(inq => (
              <div key={inq.id} style={{ background: "#fff", borderRadius: 10, padding: 18, marginBottom: 10, border: "1px solid #e8e4dc" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 8 }}>
                  <div>
                    <h4 style={{ fontSize: 14, fontWeight: 700, margin: "0 0 4px" }}>{inq.buyerName}</h4>
                    <div style={{ fontSize: 12, color: "#6b7280" }}>{inq.country} · {inq.product} · {inq.quantity}</div>
                    <div style={{ fontSize: 11, color: "#9ca3af", marginTop: 4 }}>{inq.date}</div>
                  </div>
                  <span style={{ fontSize: 11, padding: "3px 10px", borderRadius: 10, fontWeight: 600, background: inq.status === "new" ? "#dbeafe" : "#dcfce7", color: inq.status === "new" ? "#2563eb" : "#16a34a" }}>{inq.status === "new" ? (isAr ? "جديد" : "New") : (isAr ? "تم الرد" : "Replied")}</span>
                </div>
                <div style={{ marginTop: 10, display: "flex", gap: 8 }}>
                  <a href={`mailto:${inq.buyerEmail}`} style={{ background: "#1B5E20", color: "#fff", textDecoration: "none", padding: "6px 14px", borderRadius: 6, fontSize: 12, fontWeight: 600, fontFamily: ff }}>{isAr ? "رد بالإيميل" : "Reply via Email"}</a>
                  <a href={`https://wa.me/?text=Hello ${inq.buyerName}`} target="_blank" rel="noopener" style={{ background: "#25D366", color: "#fff", textDecoration: "none", padding: "6px 14px", borderRadius: 6, fontSize: 12, fontWeight: 600 }}>WhatsApp</a>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Edit Profile */}
        {tab === "profile" && (
          <div style={{ background: "#fff", borderRadius: 10, padding: 28, border: "1px solid #e8e4dc" }}>
            <h3 style={{ fontSize: 17, fontWeight: 700, color: "#1A2E1A", margin: "0 0 16px" }}>{isAr ? "تعديل الملف التعريفي" : "Edit Profile"}</h3>
            <div style={{ marginBottom: 14 }}>
              <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: "#374151", marginBottom: 5, fontFamily: ff }}>{isAr ? "نبذة بالعربي" : "Arabic Bio"}</label>
              <textarea defaultValue={myExporter.bioAr} rows={4} style={{ width: "100%", padding: "10px", borderRadius: 8, border: "1px solid #d1d5db", fontSize: 13, direction: "rtl", fontFamily: "Cairo, sans-serif", boxSizing: "border-box", resize: "vertical" }}/>
            </div>
            <div style={{ marginBottom: 14 }}>
              <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: "#374151", marginBottom: 5, fontFamily: ff }}>{isAr ? "نبذة بالإنجليزي" : "English Bio"}</label>
              <textarea defaultValue={myExporter.bioEn} rows={4} style={{ width: "100%", padding: "10px", borderRadius: 8, border: "1px solid #d1d5db", fontSize: 13, direction: "ltr", fontFamily: "Inter, sans-serif", boxSizing: "border-box", resize: "vertical" }}/>
            </div>
            <div style={{ marginBottom: 14 }}>
              <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: "#374151", marginBottom: 5, fontFamily: ff }}>{isAr ? "رفع شعار الشركة" : "Upload Company Logo"}</label>
              <div style={{ border: "2px dashed #d1d5db", borderRadius: 8, padding: 28, textAlign: "center", color: "#9ca3af", cursor: "pointer" }}>
                <Upload size={28} style={{ marginBottom: 6, opacity: 0.5 }}/>
                <p style={{ margin: 0, fontSize: 13 }}>{isAr ? "اسحب الملف هنا أو اضغط للرفع" : "Drag & drop or click to upload"}</p>
                <p style={{ margin: "4px 0 0", fontSize: 11 }}>PNG, 500×500px min</p>
              </div>
            </div>
            <button style={{ background: "#1B5E20", color: "#fff", border: "none", padding: "10px 28px", borderRadius: 8, cursor: "pointer", fontSize: 14, fontWeight: 700, fontFamily: ff }}>{isAr ? "حفظ التعديلات" : "Save Changes"}</button>
          </div>
        )}

        {/* Verification */}
        {tab === "verification" && (
          <div style={{ background: "#fff", borderRadius: 10, padding: 28, border: "1px solid #e8e4dc" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20 }}>
              <Shield size={24} color="#D4A937"/>
              <div>
                <h3 style={{ fontSize: 17, fontWeight: 700, color: "#1A2E1A", margin: 0 }}>{isAr ? "التوثيق الرسمي" : "Official Verification"}</h3>
                <p style={{ fontSize: 12, color: "#6b7280", margin: 0 }}>{isAr ? "ارفع مستنداتك للحصول على شارة \"مُصدّر معتمد ✓\"" : "Upload documents to earn the \"Verified ✓\" badge"}</p>
              </div>
            </div>
            {[
              { ar: "السجل التجاري", en: "Commercial Registration", req: true, uploaded: true },
              { ar: "البطاقة الضريبية", en: "Tax Card", req: true, uploaded: true },
              { ar: "بطاقة المُصدّر GOEIC", en: "GOEIC Exporter Card", req: true, uploaded: false },
              { ar: "ترخيص وزارة الزراعة", en: "Ministry of Agriculture License", req: false, uploaded: false },
              { ar: "خطاب مرجعي من البنك", en: "Bank Reference Letter", req: false, uploaded: false },
              { ar: "بطاقة الرقم القومي", en: "National ID", req: true, uploaded: true },
            ].map((doc, i) => (
              <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 0", borderBottom: i < 5 ? "1px solid #f3f4f6" : "none" }}>
                <div>
                  <span style={{ fontSize: 13, fontWeight: 600, color: "#1A2E1A" }}>{isAr ? doc.ar : doc.en}</span>
                  {doc.req && <span style={{ fontSize: 10, color: "#DC2626", marginRight: isAr ? 6 : 0, marginLeft: isAr ? 0 : 6 }}>*</span>}
                </div>
                {doc.uploaded ? (
                  <span style={{ fontSize: 11, color: "#16a34a", fontWeight: 600, display: "flex", alignItems: "center", gap: 4 }}><CheckCircle size={14}/> {isAr ? "تم الرفع" : "Uploaded"}</span>
                ) : (
                  <button style={{ background: "#f3f4f6", color: "#374151", border: "none", padding: "5px 14px", borderRadius: 6, cursor: "pointer", fontSize: 11, fontWeight: 600, fontFamily: ff, display: "flex", alignItems: "center", gap: 4 }}><Upload size={12}/> {isAr ? "رفع" : "Upload"}</button>
                )}
              </div>
            ))}
          </div>
        )}
        </>}
      </div>
    </div>
  );
};

const SignInPage = ({ setPage }) => {
  const { lang } = useLang();
  const { login, signup, currentUser } = useAuth();
  const isAr = lang === "ar";
  const ff = isAr ? "Cairo, sans-serif" : "Inter, sans-serif";
  const [tab, setTab] = useState("signin");
  const [form, setForm] = useState({});
  const [showPw, setShowPw] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const up = (k, v) => { setForm(p => ({ ...p, [k]: v })); setError(""); };

  // If already logged in, redirect
  useEffect(() => {
    if (currentUser) {
      setPage(currentUser.role === "admin" ? "admin" : "dashboard");
    }
  }, [currentUser]);

  const handleLogin = () => {
    if (!form.email || !form.password) { setError(isAr ? "أدخل البريد وكلمة المرور" : "Enter email and password"); return; }
    const result = login(form.email, form.password);
    if (result.success) {
      setPage(result.user.role === "admin" ? "admin" : "dashboard");
    } else {
      setError(isAr ? "البريد أو كلمة المرور غير صحيحة" : "Invalid email or password");
    }
  };

  const handleSignup = () => {
    if (!form.role) { setError(isAr ? "اختر نوع الحساب" : "Select account type"); return; }
    if (!form.firstName || !form.lastName) { setError(isAr ? "أدخل اسمك الأول والأخير" : "Enter first and last name"); return; }
    if (!form.email) { setError(isAr ? "أدخل بريدك الإلكتروني" : "Enter your email"); return; }
    if (!form.password || form.password.length < 8) { setError(isAr ? "كلمة المرور 8 أحرف على الأقل" : "Password must be 8+ characters"); return; }
    if (form.password !== form.confirmPw) { setError(isAr ? "كلمتا المرور غير متطابقتين" : "Passwords don't match"); return; }
    if (!form.terms) { setError(isAr ? "يجب الموافقة على الشروط" : "Accept terms to continue"); return; }

    const result = signup({ email: form.email, password: form.password, firstName: form.firstName, lastName: form.lastName, role: form.role, phone: form.phone || "" });
    if (result.success) {
      if (form.role === "exporter") { setPage("join"); }
      else { setPage("home"); }
    } else if (result.error === "exists") {
      setError(isAr ? "هذا البريد مسجّل بالفعل — سجّل دخولك" : "Email already registered — sign in instead");
    }
  };

  if (success) return (
    <div style={{ background: "#FAF8F3", minHeight: "80vh", display: "flex", alignItems: "center", justifyContent: "center", padding: 40, fontFamily: ff, direction: isAr ? "rtl" : "ltr" }}>
      <div style={{ textAlign: "center", maxWidth: 420 }}>
        <div style={{ width: 72, height: 72, borderRadius: "50%", background: "#dcfce7", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px" }}><CheckCircle size={36} color="#16a34a"/></div>
        <h2 style={{ fontSize: 24, fontWeight: 800, color: "#1A2E1A", margin: "0 0 10px" }}>{tab === "signin" ? (isAr ? "تم تسجيل الدخول بنجاح!" : "Signed In Successfully!") : (isAr ? "تم إنشاء الحساب بنجاح!" : "Account Created!")}</h2>
        <p style={{ fontSize: 14, color: "#6b7280", lineHeight: 1.7, marginBottom: 20 }}>{tab === "signin" ? (isAr ? "مرحباً بك مرة أخرى" : "Welcome back!") : (isAr ? "يمكنك الآن تسجيل الدخول" : "You can now sign in")}</p>
        <div style={{ display: "flex", gap: 10, justifyContent: "center", flexWrap: "wrap" }}>
          <button onClick={() => setPage("dashboard")} style={{ background: "#1B5E20", color: "#fff", border: "none", padding: "10px 24px", borderRadius: 8, cursor: "pointer", fontSize: 13, fontWeight: 600, fontFamily: ff }}>{isAr ? "لوحة تحكم المُصدّر" : "Exporter Dashboard"}</button>
          <button onClick={() => setPage("admin")} style={{ background: "#D4A937", color: "#1A2E1A", border: "none", padding: "10px 24px", borderRadius: 8, cursor: "pointer", fontSize: 13, fontWeight: 600, fontFamily: ff }}>{isAr ? "لوحة تحكم الأدمن" : "Admin Dashboard"}</button>
        </div>
      </div>
    </div>
  );

  return (
    <div style={{ background: "#FAF8F3", minHeight: "80vh", fontFamily: ff, direction: isAr ? "rtl" : "ltr" }}>
      <div style={{ background: "#1B5E20", padding: "48px 20px 0" }}>
        <div style={{ maxWidth: 440, margin: "0 auto", textAlign: "center" }}>
          <Wheat size={36} color="#D4A937" style={{ marginBottom: 12 }}/>
          <h1 style={{ color: "#fff", fontSize: 24, fontWeight: 800, margin: "0 0 24px" }}>{isAr ? "زُرع في مصر" : "Grown in Egypt"}</h1>
          {/* Tabs */}
          <div style={{ display: "flex", background: "rgba(255,255,255,0.1)", borderRadius: "10px 10px 0 0", overflow: "hidden" }}>
            <button onClick={() => { setTab("signin"); setForm({}); }} style={{ flex: 1, padding: "14px", border: "none", cursor: "pointer", fontSize: 14, fontWeight: 700, fontFamily: ff, background: tab === "signin" ? "#FAF8F3" : "transparent", color: tab === "signin" ? "#1B5E20" : "rgba(255,255,255,0.7)", borderRadius: tab === "signin" ? "10px 10px 0 0" : 0, transition: "all 0.2s" }}>
              {isAr ? "تسجيل الدخول" : "Sign In"}
            </button>
            <button onClick={() => { setTab("signup"); setForm({}); }} style={{ flex: 1, padding: "14px", border: "none", cursor: "pointer", fontSize: 14, fontWeight: 700, fontFamily: ff, background: tab === "signup" ? "#FAF8F3" : "transparent", color: tab === "signup" ? "#1B5E20" : "rgba(255,255,255,0.7)", borderRadius: tab === "signup" ? "10px 10px 0 0" : 0, transition: "all 0.2s" }}>
              {isAr ? "إنشاء حساب" : "Sign Up"}
            </button>
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 440, margin: "0 auto", padding: "0 20px 40px" }}>
        <div style={{ background: "#fff", borderRadius: "0 0 12px 12px", padding: 28, border: "1px solid #e8e4dc", borderTop: "none" }}>

          {tab === "signin" && <>
            <p style={{ fontSize: 13, color: "#6b7280", margin: "0 0 20px", textAlign: "center" }}>{isAr ? "سجّل دخولك لإدارة ملفك أو الوصول للوحة التحكم" : "Sign in to manage your profile or access the dashboard"}</p>
            <div style={{ marginBottom: 14 }}>
              <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: "#374151", marginBottom: 5, fontFamily: ff }}>{isAr ? "البريد الإلكتروني" : "Email"}</label>
              <input type="email" placeholder={isAr ? "أدخل بريدك الإلكتروني" : "Enter your email"} value={form.email || ""} onChange={e => up("email", e.target.value)} style={{ width: "100%", padding: "11px 14px", borderRadius: 8, border: "1px solid #d1d5db", fontSize: 14, boxSizing: "border-box", direction: "ltr", fontFamily: "Inter, sans-serif" }}/>
            </div>
            <div style={{ marginBottom: 6 }}>
              <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: "#374151", marginBottom: 5, fontFamily: ff }}>{isAr ? "كلمة المرور" : "Password"}</label>
              <div style={{ position: "relative" }}>
                <input type={showPw ? "text" : "password"} placeholder={isAr ? "أدخل كلمة المرور" : "Enter your password"} value={form.password || ""} onChange={e => up("password", e.target.value)} style={{ width: "100%", padding: "11px 40px 11px 14px", borderRadius: 8, border: "1px solid #d1d5db", fontSize: 14, boxSizing: "border-box", direction: "ltr", fontFamily: "Inter, sans-serif" }}/>
                <button onClick={() => setShowPw(!showPw)} style={{ position: "absolute", [isAr ? "left" : "right"]: 10, top: 10, background: "none", border: "none", cursor: "pointer", color: "#9ca3af", fontSize: 12 }}>{showPw ? (isAr ? "إخفاء" : "Hide") : (isAr ? "إظهار" : "Show")}</button>
              </div>
            </div>
            <div style={{ textAlign: isAr ? "left" : "right", marginBottom: 20 }}>
              <button style={{ background: "none", border: "none", color: "#1B5E20", fontSize: 12, cursor: "pointer", fontWeight: 600, fontFamily: ff }}>{isAr ? "نسيت كلمة المرور؟" : "Forgot password?"}</button>
            </div>
            <button onClick={handleLogin} style={{ width: "100%", background: "#1B5E20", color: "#fff", border: "none", padding: "12px", borderRadius: 8, cursor: "pointer", fontSize: 15, fontWeight: 700, fontFamily: ff, marginBottom: 16 }}>
              {isAr ? "تسجيل الدخول" : "Sign In"}
            </button>
            {error && <p style={{ textAlign: "center", fontSize: 13, color: "#DC2626", fontWeight: 600, margin: "0 0 12px", background: "#fecaca", padding: "8px 14px", borderRadius: 6 }}>{error}</p>}
            <p style={{ textAlign: "center", fontSize: 13, color: "#6b7280", margin: 0 }}>
              {isAr ? "ليس لديك حساب؟ " : "Don't have an account? "}
              <button onClick={() => setTab("signup")} style={{ background: "none", border: "none", color: "#D4A937", fontWeight: 700, cursor: "pointer", fontSize: 13, fontFamily: ff }}>{isAr ? "أنشئ حساباً" : "Sign Up"}</button>
            </p>
          </>}

          {tab === "signup" && <>
            <p style={{ fontSize: 13, color: "#6b7280", margin: "0 0 20px", textAlign: "center" }}>{isAr ? "أنشئ حسابك — مُصدّر أو مشتري" : "Create your account — exporter or buyer"}</p>
            <div style={{ marginBottom: 14 }}>
              <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: "#374151", marginBottom: 5, fontFamily: ff }}>{isAr ? "نوع الحساب" : "Account Type"} <span style={{ color: "#DC2626" }}>*</span></label>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
                {[
                  { val: "exporter", ar: "مُصدّر", en: "Exporter", icon: "🌾", descAr: "أعرض منتجاتي وأستقبل استفسارات", descEn: "List products & receive inquiries" },
                  { val: "buyer", ar: "مشتري", en: "Buyer", icon: "🛒", descAr: "أبحث عن مُصدّرين وأتواصل معهم", descEn: "Find exporters & send inquiries" }
                ].map(opt => (
                  <button key={opt.val} onClick={() => up("role", opt.val)} style={{ padding: "14px 12px", borderRadius: 10, border: form.role === opt.val ? "2px solid #1B5E20" : "1px solid #d1d5db", background: form.role === opt.val ? "#dcfce7" : "#fff", cursor: "pointer", textAlign: "center", transition: "all 0.2s" }}>
                    <div style={{ fontSize: 24, marginBottom: 4 }}>{opt.icon}</div>
                    <div style={{ fontSize: 13, fontWeight: 700, color: "#1A2E1A", fontFamily: ff }}>{isAr ? opt.ar : opt.en}</div>
                    <div style={{ fontSize: 10, color: "#6b7280", marginTop: 2, fontFamily: ff }}>{isAr ? opt.descAr : opt.descEn}</div>
                  </button>
                ))}
              </div>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0 12px" }}>
              <div style={{ marginBottom: 14 }}>
                <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: "#374151", marginBottom: 5, fontFamily: ff }}>{isAr ? "الاسم الأول" : "First Name"} <span style={{ color: "#DC2626" }}>*</span></label>
                <input value={form.firstName || ""} onChange={e => up("firstName", e.target.value)} style={{ width: "100%", padding: "11px 14px", borderRadius: 8, border: "1px solid #d1d5db", fontSize: 14, boxSizing: "border-box", fontFamily: ff, direction: isAr ? "rtl" : "ltr" }}/>
              </div>
              <div style={{ marginBottom: 14 }}>
                <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: "#374151", marginBottom: 5, fontFamily: ff }}>{isAr ? "الاسم الأخير" : "Last Name"} <span style={{ color: "#DC2626" }}>*</span></label>
                <input value={form.lastName || ""} onChange={e => up("lastName", e.target.value)} style={{ width: "100%", padding: "11px 14px", borderRadius: 8, border: "1px solid #d1d5db", fontSize: 14, boxSizing: "border-box", fontFamily: ff, direction: isAr ? "rtl" : "ltr" }}/>
              </div>
            </div>
            <div style={{ marginBottom: 14 }}>
              <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: "#374151", marginBottom: 5, fontFamily: ff }}>{isAr ? "البريد الإلكتروني" : "Email"} <span style={{ color: "#DC2626" }}>*</span></label>
              <input type="email" placeholder={isAr ? "أدخل بريدك الإلكتروني" : "Enter your email"} value={form.email || ""} onChange={e => up("email", e.target.value)} style={{ width: "100%", padding: "11px 14px", borderRadius: 8, border: "1px solid #d1d5db", fontSize: 14, boxSizing: "border-box", direction: "ltr", fontFamily: "Inter" }}/>
            </div>
            <div style={{ marginBottom: 14 }}>
              <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: "#374151", marginBottom: 5, fontFamily: ff }}>{isAr ? "رقم الموبايل" : "Mobile Number"}</label>
              <input type="tel" placeholder="+20 1XX XXX XXXX" value={form.phone || ""} onChange={e => up("phone", e.target.value)} style={{ width: "100%", padding: "11px 14px", borderRadius: 8, border: "1px solid #d1d5db", fontSize: 14, boxSizing: "border-box", direction: "ltr", fontFamily: "Inter" }}/>
            </div>
            <div style={{ marginBottom: 14 }}>
              <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: "#374151", marginBottom: 5, fontFamily: ff }}>{isAr ? "كلمة المرور" : "Password"} <span style={{ color: "#DC2626" }}>*</span></label>
              <input type="password" placeholder={isAr ? "8 أحرف على الأقل" : "Min 8 characters"} value={form.password || ""} onChange={e => up("password", e.target.value)} style={{ width: "100%", padding: "11px 14px", borderRadius: 8, border: "1px solid #d1d5db", fontSize: 14, boxSizing: "border-box", direction: "ltr", fontFamily: "Inter" }}/>
            </div>
            <div style={{ marginBottom: 14 }}>
              <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: "#374151", marginBottom: 5, fontFamily: ff }}>{isAr ? "تأكيد كلمة المرور" : "Confirm Password"} <span style={{ color: "#DC2626" }}>*</span></label>
              <input type="password" value={form.confirmPw || ""} onChange={e => up("confirmPw", e.target.value)} style={{ width: "100%", padding: "11px 14px", borderRadius: 8, border: "1px solid #d1d5db", fontSize: 14, boxSizing: "border-box", direction: "ltr", fontFamily: "Inter" }}/>
            </div>
            <div style={{ marginBottom: 18 }}>
              <label style={{ display: "flex", alignItems: "flex-start", gap: 8, cursor: "pointer", fontSize: 12, color: "#4b5563", fontFamily: ff }}>
                <input type="checkbox" checked={form.terms || false} onChange={e => up("terms", e.target.checked)} style={{ marginTop: 2 }}/>
                {isAr ? <>أوافق على <span style={{ color: "#1B5E20", fontWeight: 600 }}>الشروط والأحكام</span> و<span style={{ color: "#1B5E20", fontWeight: 600 }}>سياسة الخصوصية</span></> : <>I agree to the <span style={{ color: "#1B5E20", fontWeight: 600 }}>Terms</span> and <span style={{ color: "#1B5E20", fontWeight: 600 }}>Privacy Policy</span></>}
              </label>
            </div>
            {error && <p style={{ fontSize: 13, color: "#DC2626", fontWeight: 600, margin: "0 0 12px", background: "#fecaca", padding: "8px 14px", borderRadius: 6 }}>{error}</p>}
            <button onClick={handleSignup} style={{ width: "100%", background: "#D4A937", color: "#1A2E1A", border: "none", padding: "12px", borderRadius: 8, cursor: "pointer", fontSize: 15, fontWeight: 700, fontFamily: ff, marginBottom: 16 }}>
              {form.role === "exporter" ? (isAr ? "التالي: بيانات الشركة" : "Next: Company Details") : (isAr ? "إنشاء الحساب" : "Create Account")}
            </button>
            <p style={{ textAlign: "center", fontSize: 13, color: "#6b7280", margin: 0 }}>
              {isAr ? "لديك حساب بالفعل؟ " : "Already have an account? "}
              <button onClick={() => setTab("signin")} style={{ background: "none", border: "none", color: "#D4A937", fontWeight: 700, cursor: "pointer", fontSize: 13, fontFamily: ff }}>{isAr ? "سجّل دخولك" : "Sign In"}</button>
            </p>
          </>}
        </div>
      </div>
    </div>
  );
};

// ===== AUTH CONTEXT =====
const AuthContext = createContext();
const useAuth = () => useContext(AuthContext);

// ===== MAIN APP =====
export default function App() {
  const [lang, setLang] = useState("ar");
  const [page, setPage] = useState("home");
  const [selectedExporter, setSelectedExporter] = useState(null);
  const [cropFilter, setCropFilter] = useState("");
  const [currentUser, setCurrentUser] = useState(null);
  const [exporterApps, setExporterApps] = useState([]);
  const [users, setUsers] = useState([
    { id: 1, email: "a7md.imn@gmail.com", password: "Randa@1995", firstName: "Ahmed", lastName: "Admin", role: "admin", phone: "", createdAt: "2026-06-01" },
  ]);

  useEffect(() => { window.scrollTo(0, 0); }, [page]);

  const signup = (userData) => {
    if (users.find(u => u.email.toLowerCase() === userData.email.toLowerCase())) {
      return { success: false, error: "exists" };
    }
    const newUser = { ...userData, id: users.length + 1, role: userData.role || "buyer", createdAt: new Date().toISOString().slice(0, 10) };
    setUsers(prev => [...prev, newUser]);
    setCurrentUser(newUser);
    return { success: true, user: newUser };
  };

  const login = (email, password) => {
    const user = users.find(u => u.email.toLowerCase() === email.toLowerCase() && u.password === password);
    if (user) { setCurrentUser(user); return { success: true, user }; }
    return { success: false, error: "invalid" };
  };

  const logout = () => { setCurrentUser(null); setPage("home"); };

  const addUser = (userData) => {
    if (!currentUser || currentUser.role !== "admin") return { success: false, error: "unauthorized" };
    if (users.find(u => u.email.toLowerCase() === userData.email.toLowerCase())) return { success: false, error: "exists" };
    const newUser = { ...userData, id: users.length + 1, createdAt: new Date().toISOString().slice(0, 10) };
    setUsers(prev => [...prev, newUser]);
    return { success: true };
  };

  const updateUserRole = (userId, newRole) => {
    if (!currentUser || currentUser.role !== "admin") return;
    setUsers(prev => prev.map(u => u.id === userId ? { ...u, role: newRole } : u));
  };

  const deleteUser = (userId) => {
    if (!currentUser || currentUser.role !== "admin") return;
    if (userId === currentUser.id) return; // can't delete yourself
    setUsers(prev => prev.filter(u => u.id !== userId));
  };

  const submitExporterApp = (appData) => {
    const app = { ...appData, id: Date.now(), userId: currentUser?.id, userEmail: currentUser?.email, status: "pending", submittedAt: new Date().toISOString().slice(0, 10), completion: 25 };
    setExporterApps(prev => [...prev, app]);
    return app;
  };

  const approveExporterApp = (appId) => {
    if (!currentUser || currentUser.role !== "admin") return;
    setExporterApps(prev => prev.map(a => a.id === appId ? { ...a, status: "approved" } : a));
    const app = exporterApps.find(a => a.id === appId);
    if (app) setUsers(prev => prev.map(u => u.id === app.userId ? { ...u, role: "exporter", exporterApproved: true } : u));
  };

  const rejectExporterApp = (appId, reason) => {
    if (!currentUser || currentUser.role !== "admin") return;
    setExporterApps(prev => prev.map(a => a.id === appId ? { ...a, status: "rejected", rejectReason: reason || "" } : a));
  };

  const getMyApp = () => exporterApps.find(a => a.userId === currentUser?.id);

  const renderPage = () => {
    switch (page) {
      case "home": return <HomePage setPage={setPage} setSelectedExporter={setSelectedExporter} setCropFilter={setCropFilter}/>;
      case "exporters": return <ExportersPage setPage={setPage} setSelectedExporter={setSelectedExporter} cropFilter={cropFilter} setCropFilter={setCropFilter}/>;
      case "profile": return <ProfilePage exporter={selectedExporter} setPage={setPage}/>;
      case "calendar": return <CalendarPage setPage={setPage} setCropFilter={setCropFilter}/>;
      case "certs": return <CertsPage/>;
      case "guide": return <GuidePage/>;
      case "insights": return <InsightsPage/>;
      case "about": return <AboutPage/>;
      case "admin": return currentUser?.role === "admin" ? <AdminDashboard setPage={setPage} setSelectedExporter={setSelectedExporter} users={users} addUser={addUser} updateUserRole={updateUserRole} deleteUser={deleteUser} exporterApps={exporterApps} approveExporterApp={approveExporterApp} rejectExporterApp={rejectExporterApp}/> : <SignInPage setPage={setPage}/>;
      case "dashboard": return currentUser ? <ExporterDashboard setPage={setPage} myApp={getMyApp()}/> : <SignInPage setPage={setPage}/>;
      case "signin": return <SignInPage setPage={setPage}/>;
      case "join": return currentUser ? <JoinPage submitApp={submitExporterApp}/> : <SignInPage setPage={setPage}/>;
      default: return <HomePage setPage={setPage} setSelectedExporter={setSelectedExporter} setCropFilter={setCropFilter}/>;
    }
  };

  return (
    <AuthContext.Provider value={{ currentUser, login, signup, logout, users, exporterApps }}>
    <LangContext.Provider value={{ lang, setLang }}>
      <div style={{ fontFamily: lang === "ar" ? "'Cairo', sans-serif" : "'Inter', sans-serif", color: "#1A2E1A", minHeight: "100vh", background: "#FAF8F3" }}>
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Cairo:wght@400;600;700;800&display=swap" rel="stylesheet"/>
        <Header page={page} setPage={setPage}/>
        {renderPage()}
        <Footer setPage={setPage}/>
      </div>
    </LangContext.Provider>
    </AuthContext.Provider>
  );
}
