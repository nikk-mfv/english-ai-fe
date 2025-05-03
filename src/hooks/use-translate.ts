import { Translate } from "@/services/translate";
import { useState } from "react";
import { toast } from "sonner";

export const useTranslate = () => {
  const [translatedText, setTranslatedText] = useState("");

  const handleTranslate = async (inputText: string) => {
    try {
      const response = await Translate(inputText);
      const translated = response.data[0].translations[0].text;
      
      setTranslatedText(translated);
    } catch (error) {
      console.error("Translation API error:", error);
      toast.error(`Failed translate: ${error}`, {
        position: "bottom-left",
      });
    }
  };
  return { translatedText, setTranslatedText, handleTranslate };
};
