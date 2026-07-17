export const CATEGORIES = [
  {
    id: "TMG",
    label: { ru: "ТМГ", uz: "TMG", en: "TMG" },
    fields: [
      { key: "power", type: "text",
        label: { ru: "Мощность", uz: "Quvvat", en: "Power" } },
      { key: "voltageClass", type: "text",
        label: { ru: "Класс напряжения", uz: "Kuchlanish sinfi", en: "Voltage class" } },
      { key: "windingMaterial", type: "select",
        label: { ru: "Материал обмоток", uz: "O'ram materiali", en: "Winding material" },
        options: [
          { value: "copper", label: { ru: "Медь", uz: "Mis", en: "Copper" } },
          { value: "aluminum", label: { ru: "Алюминий", uz: "Alyuminiy", en: "Aluminum" } },
        ] },
      { key: "coolingType", type: "select",
        label: { ru: "Тип охлаждения и исполнения", uz: "Sovutish va ijro turi", en: "Cooling / design type" },
        options: [
          { value: "dry", label: { ru: "Сухой", uz: "Quruq", en: "Dry" } },
          { value: "oil", label: { ru: "Масляный", uz: "Moyli", en: "Oil" } },
        ] },
      { key: "lossLevel", type: "text",
        label: { ru: "Уровень потерь", uz: "Yo'qotish darajasi", en: "Loss level" } },
    ],
  },
  {
    id: "KTP",
    label: { ru: "КТП", uz: "KTP", en: "KTP" },
    fields: [
      { key: "placementType", type: "select",
        label: { ru: "Тип исполнения и размещения", uz: "Bajarilish va joylashuv turi", en: "Design & placement type" },
        options: [
          { value: "through", label: { ru: "Проходной", uz: "O'tuvchi", en: "Through" } },
          { value: "dead-end", label: { ru: "Тупиковый", uz: "Tupik", en: "Dead-end" } },
        ] },
      { key: "cableType", type: "text",
        label: { ru: "Тип ввода и вывода кабелей", uz: "Kabel kirish-chiqish turi", en: "Cable entry/exit type" } },
      { key: "switchgear", type: "text",
        label: { ru: "Комплектация коммутационными аппаратами", uz: "Kommutatsiya apparatlari", en: "Switching equipment" } },
      { key: "climateCategory", type: "text",
        label: { ru: "Климатическое исполнение и категория размещения", uz: "Iqlim ijrosi va joylashuv toifasi", en: "Climate design & placement category" } },
    ],
  },
  {
    id: "RU",
    label: { ru: "РУ", uz: "RU", en: "RU" },
    fields: [
      { key: "avr", type: "select",
        label: { ru: "АВР (Автоматический ввод резерва)", uz: "AVR", en: "Automatic reserve transfer (ATS)" },
        options: [
          { value: "yes", label: { ru: "Есть", uz: "Bor", en: "Yes" } },
          { value: "no", label: { ru: "Нет", uz: "Yo'q", en: "No" } },
        ] },
      { key: "meteringUnit", type: "text",
        label: { ru: "Узел учета электроэнергии", uz: "Elektr hisobga olish tuguni", en: "Metering unit" } },
      { key: "ukrm", type: "text",
        label: { ru: "Узел компенсации реактивной мощности (УКРМ)", uz: "Reaktiv quvvat kompensatsiyasi (UKRM)", en: "Reactive power compensation (UKRM)" } },
      { key: "safety", type: "text",
        label: { ru: "Безопасность (защита от дурака)", uz: "Xavfsizlik", en: "Safety (fool-proofing)" } },
    ],
  },
];

export function getCategory(id) {
  return CATEGORIES.find((c) => c.id === id);
}

export function optionLabel(field, value, lang) {
  const opt = field?.options?.find((o) => o.value === value);
  return opt ? opt.label[lang] : value;
}