export const DEFAULT_LANGUAGE = "uk";

// Debug log when this module is loaded
console.log('[DEBUG] Loading language config:', {
  defaultLang: DEFAULT_LANGUAGE,
  env: process.env.VITE_LANGUAGE,
  meta: import.meta.env.VITE_LANGUAGE,
});

export const CONTENT = {
  uk: {
    landing: {
      title: "Перетворіть Вашу Посмішку Сьогодні",
      subtitle: "Отримайте індивідуальний план лікування за 3 простих кроки",
      cta: "Знайти Ідеальне Рішення",
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
    },
    guidance: {
      title: "Що вас найбільше турбує у вашій посмішці?",
      backToHome: "← Назад",
      step: "Крок",
      of: "з",
      options: {
        pain: "Біль або Дискомфорт",
        missing: "Відсутні або Пошкоджені Зуби",
        appearance: "Зовнішній Вигляд",
        crooked: "Криві Зуби",
        preventive: "Профілактичний Догляд"
      }
    }
  }
};

// Verify content is loaded
if (!CONTENT.uk?.landing?.title) {
  console.error('[ERROR] Ukrainian content not loaded correctly');
}
