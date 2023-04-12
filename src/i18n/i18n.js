import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import CustomBackend from "./CustomBackend";
import LanguageDetector from "i18next-browser-languagedetector";

const corsProxy = "https://corsproxy.io/?";

i18n
  .use(CustomBackend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    defaultLanguage: "en",
    otherLanguages: ["pl"],
    fallbackLng: "en",
    debug: true,
    saveMissing: true,

    backend: {
      loadPath: `${corsProxy}https://api.poeditor.com/v2/terms/list`,
      addPath: `${corsProxy}https://api.poeditor.com/v2/terms/add`,
      crossDomain: true,
      parse: (data) => {
        const parsedData = JSON.parse(data);
        const terms = parsedData.result.terms.reduce((acc, item) => {
          acc[item.term] = item.translation.content || item.term;

          return acc;
        }, {});

        return terms;
      },
      parsePayload: (namespace, key) => {
        if (key === "_t") return;

        const data = [
          {
            term: key,
          },
        ];
        const payload = {
          api_token: process.env.REACT_APP_POEDITOR_TOKEN,
          data: JSON.stringify(data),
          id: process.env.REACT_APP_POEDITOR_APP_ID,
        };

        return payload;
      },
      parseLoadPayload: ({ lng }) => {
        const payload = {
          api_token: process.env.REACT_APP_POEDITOR_TOKEN,
          language: lng,
          id: process.env.REACT_APP_POEDITOR_APP_ID,
        };

        return payload;
      },
    },

    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },
  });

export default i18n;
