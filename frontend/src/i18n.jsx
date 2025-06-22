import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Your translations
const resources = {
    ru: {
        translation: {
        createLesson: "Создать урок",
        create: "Создать",
        approved: "Утверждено",
        pending: "Ожидает утверждения",
        declined: "Отклнено",
        lessonName: "Название урока",
        duration: "Длительность",
        textPlaceholder: "Введите текст",
        noLessons: "Пока нету созданных уроков",
        home: "На главную",
        biology: "Биология",
        chemistry: "Химия",
        module: "Модуль",
        unit: "Юнит",
        addobject: "Добавить объект",
        createLessonTitle: "Форма для создания урока",
        chooseLessonParent: "Выберите раздел",
        chooseLessonParams: "Выберите параметры",
        order: "Введите номер",
        videoLink: "Введите ссылку на видео урока",
        createLessonContent: "Создайте контент урока на разных языках",
        imageLink: "Введите ссылку на картинку",
        objects: "Контенты",
        noobjects: "Контент еще не был создан",
        preview: "Предватительный просмотр",
        asdraft: "Сохранить как черновик",
        draft: "Черновик",
        back: "Назад",
        lesson: "Урок",
        minutes: "минут",
        reject: "Отклнонить",
        approve: "Одобрить",
        topic: "Тема",
        }
    },
    uz: {
        translation: {
        createLesson: "Dars yaratish",
        create: "Yaratish",
        approved: "Tasdiqlandi",
        pending: "Tasdiqlanishni kutmoqda",
        declined: "Rad etildi",
        lessonName: "Dars nomi",
        duration: "Darsni vaqti",
        textPlaceholder: "Tekst kiriting",
        noLessons: "Hali darslar yaratilmagan",
        home: "Bosh saxifaga",
        biology: "Biologiya",
        chemistry: "Kimyo",
        module: "Modul",
        unit: "Unit",
        addobject: "Obyekt qo'shish",
        createLessonTitle: "Dars yaratilshi uchun forma",
        chooseLessonParent: "Darsni joylashuvini tanlang",
        chooseLessonParams: "Darsni parametrlarini tanlang",
        order: "Darsni navbati",
        videoLink: "Darsni videosiga link kiriting",
        createLessonContent: "Har-hil tilda darsni kontentini yarating",
        imageLink: "Rasmga ling kiriting",
        objects: "Kontentlar",
        noobjects: "Hali kontent yaratilmagan",
        preview: "Oldindan ko'rish",
        asdraft: "Yubormasdan saqlash",
        draft: "Tugatilmagan",
        back: "Ortga",
        lesson: "Dars",
        minutes: "minut",
        reject: "Rad etish",
        approve: "Darsni chop etish",
        topic: "Mavzu",
        }
    }
};

i18n
  .use(LanguageDetector) // auto detect user language
  .use(initReactI18next) // pass i18n to react-i18next
  .init({
    resources,
    lng: "ru",
    fallbackLng: 'ru',
    interpolation: {
      escapeValue: false // react already escapes
    }
  });

export default i18n;
