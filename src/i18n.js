import i18n from "i18next";
import Backend from 'i18next-http-backend';
import { initReactI18next } from "react-i18next";

i18n
  .use(Backend)
  .use(initReactI18next)
  .init({
    fallbackLng: 'ru',
    // ns: ['common'],
    backend: {
      loadPath: `${process.env.PUBLIC_URL}/locales/{{lng}}.json`,
    //   addPath: `${process.env.PUBLIC_URL}/locales/add/{{lng}}/{{ns}}`,
    },
    debug: false,
    interpolation: {
      escapeValue: false
    }
  });

  export default i18n;
