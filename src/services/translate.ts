import axios from "axios";

export function translate(text: string) {
  const targetLanguage = "vi";
  const endpoint = import.meta.env.VITE_TRANSLATE_ENDPOINT;
  return axios({
    method: "POST",
    url: endpoint,
    params: {
      "api-version": "3.0",
      to: targetLanguage,
    },
    data: [
      {
        text,
      },
    ],
    headers: {
      "Ocp-Apim-Subscription-Key": import.meta.env.VITE_TRANSLATE_KEY,
      "Ocp-Apim-Subscription-Region": import.meta.env.VITE_TRANSLATE_REGION,
      "Content-Type": "application/json; charset=utf-8",
    },
  });
}
