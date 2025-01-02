import { logTranslationLoad } from "../debug";

logTranslationLoad("translations/uk.js");

// Log the module initialization
console.log("Initializing uk.js module");

// At the top of the file
console.log("Loading Ukrainian translations...");

// Force translations to be available in both dev and prod
const translations = {
  landing: {
    mainTitle: "Перетворіть Вашу Посмішку Сьогодні",
    mainSubtitle: "Отримайте індивідуальний план лікування за 3 простих кроки",
    findSolution: "Знайти Ідеальне Рішення",
    consultation: "Безкоштовна консультація",
    noObligation: "Без зобов'язань",
    stats: {
      patients: {
        number: "1000+",
        label: "Задоволених Пацієнтів",
      },
      experience: {
        number: "15+",
        label: "Років Досвіду",
      },
      rating: {
        number: "4.9/5",
        label: "Рейтинг Пацієнтів",
      },
    },
    benefits: {
      title: "Чому Обирають Нас?",
      items: {
        prices: {
          title: "Доступні Ціни",
          description: "Якісна стоматологічна допомога за розумною ціною",
          icon: "💰",
        },
        equipment: {
          title: "Сучасне Обладнання",
          description:
            "Використовуємо передові технології для найкращих результатів",
          icon: "🔧",
        },
        doctors: {
          title: "Досвідчені Лікарі",
          description: "Професійна допомога від кваліфікованих спеціалістів",
          icon: "👨‍⚕️",
        },
      },
    },
    specialOffer: {
      title: "Спеціальна Пропозиція: Безкоштовна Перша Консультація",
      button: "Підібрати Послугу",
    },
  },
  guidance: {
    title: "Підбір послуги",
    questions: {
      pain: "Чи турбує вас зубний біль?",
      bleeding: "Чи є кровоточивість ясен?",
      aesthetic: "Вас цікавить естетична стоматологія?",
      preventive: "Бажаєте профілактичний огляд?",
    },
    options: {
      yes: "Так",
      no: "Ні",
    },
    submit: "Отримати рекомендацію",
    back: "Назад",
    loading: "Підбираємо найкращу послугу...",
    error: "Помилка при отриманні рекомендації. Спробуйте ще раз.",
  },
  appointment: {
    title: "Запис на прийом",
    form: {
      name: "Ім'я",
      phone: "Телефон",
      date: "Оберіть дату",
      time: "Оберіть час",
      service: "Оберіть послугу",
      submit: "Записатися",
    },
    success: "Дякуємо за запис! Ми зв'яжемося з вами найближчим часом.",
    error: "Помилка при записі. Будь ласка, спробуйте ще раз.",
    loading: "Обробка запису...",
    noSlots: "Немає вільних слотів на цю дату",
    services: {
      consultation: "Консультація",
      cleaning: "Професійна чистка",
      filling: "Пломбування",
      whitening: "Відбілювання",
      treatment: "Лікування карієсу",
      extraction: "Видалення зуба",
    },
  },
  common: {
    required: "Обов'язкове поле",
    invalidPhone: "Невірний формат телефону",
    back: "Назад",
    next: "Далі",
    loading: "Завантаження...",
  },
};

// Debug point 1: Initial load
console.log("[DEBUG] uk.js - Initial load:", {
  time: new Date().toISOString(),
  environment: import.meta.env.MODE,
  hasTranslations: !!translations,
  mainTitle: translations.landing.mainTitle
});

export const ukTranslations = translations;

// Debug point 2: After export
console.log("[DEBUG] uk.js - After export:", {
  time: new Date().toISOString(),
  hasExport: !!ukTranslations,
  mainTitle: ukTranslations.landing.mainTitle,
});
