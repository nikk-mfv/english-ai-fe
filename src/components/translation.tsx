import { useEffect, useState } from "react";
import { Languages, Volume2, CirclePlus } from "lucide-react";
import { useTranslate } from "@/hooks/use-translate";
import { CreateVocabPopover } from "@/containers/vocabulary/create-vocab-popover";
import { useGetVocabulary } from "@/hooks/use-vocabulary";
import { IVocabulary } from "@/services/vocab";

export const Translation = () => {
  const [selection, setSelection] = useState<string>();
  const [position, setPosition] = useState<Record<string, number>>();
  const [editText, setEditText] = useState<string>("");
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isPopoverVisible, setIsPopOverVisible] = useState(false);

  function onSelectStart() {
    setSelection(undefined);
  }

  function onMouseUp() {
    const activeSelection = document.getSelection();

    if (!activeSelection) return;
    const text = activeSelection.toString();

    if (!text) {
      setSelection(undefined);
      return;
    }

    const rect = activeSelection.getRangeAt(0).getBoundingClientRect();

    setSelection(text);
    setPosition({
      x: rect.x + rect.width / 2 - 40,
      y: rect.y + window.scrollY - 40,
      width: rect.width,
      height: rect.height,
    });
  }


  const handleSpeech = () => {
    if (!editText) return;

    const value = new SpeechSynthesisUtterance(editText);
    if (window.speechSynthesis.speaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    } else {
      window.speechSynthesis.speak(value);
      setIsSpeaking(true);
      value.onend = () => {
        setIsSpeaking(false);
      };
    }
  };

  useEffect(() => {
    document.addEventListener("selectstart", onSelectStart);
    document.addEventListener("mouseup", onMouseUp);

    return () => {
      document.removeEventListener("selectstart", onSelectStart);
      document.removeEventListener("mouseup", onMouseUp);
    };
  }, []);

  const { translatedText, setTranslatedText, handleTranslate } = useTranslate();

  const openModal = () => {
    setEditText(selection || "");
    setTranslatedText("");

    const modal = document.getElementById("my_modal_1") as HTMLDialogElement;
    modal.showModal();
    handleTranslate(selection || "");
  };

  const closeModal = () => {
    setIsPopOverVisible(false);
  };

  const onTranslateClick = async () => {
    await handleTranslate(editText);
  };

  const { setVocabulary } = useGetVocabulary();
  const handleAddMoreVocabulary = async (vocabulary: IVocabulary) => {
    setVocabulary((old) => [vocabulary, ...old]);

    setIsPopOverVisible(false);
  };

  const handleSave = () => {
    setIsPopOverVisible(true);

    const modal = document.getElementById("my_modal_1") as HTMLDialogElement;
    if (modal) {
      modal.close();
    }

  };
  return (
    <div>
      {selection && position && (
        <p
          className="absolute top-0 w-[80px] h-[30px] bg-black text-white rounded m-0 z-50"
          style={{
            transform: `translate3d(${position.x}px, ${position.y}px,0)`,
          }}
        >
          <button
            onClick={openModal}
            className="w-full h-full flex justify-between items-center px-1 cursor-pointer"
          >
            <Languages className="w-4 h-4" />{" "}
            <span className="text-xs">Translate</span>
          </button>
        </p>
      )}

      {/* Modal */}
      <dialog id="my_modal_1" className="modal">
        <div className="modal-box" role="dialog">
          <div className="flex justify-between items-center">
            <h1 className="font-bold text-lg">Translate</h1>
            <button
              type="button"
              onClick={handleSave}
              className="btn btn-sm flex items-center gap-1 px-3 py-1 bg-green-500 text-white rounded border-b-4 border-green-700 hover:bg-green-600 transition"
            >
              <CirclePlus className="w-4 h-4" />
              Save
            </button>{" "}
          </div>
          <label className="text-sm text-gray-600">Original Text:</label>
          <button
            type="button"
            onClick={handleSpeech}
            className="btn btn-sm btn-ghost border-none shadow-none bg-transparent"
          >
            <Volume2 className={isSpeaking ? "text-blue-500" : "text-black"} />
          </button>
          <input
            type="text"
            className="input input-bordered w-full my-2"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
          />

          <label className="text-sm text-gray-600">Translated Text:</label>
          <p className="py-2">{translatedText}</p>

          <div className="modal-action">
            <form method="dialog" className="flex gap-2">
              <button className="btn">Close</button>
              <button
                type="button"
                onClick={onTranslateClick}
                className="btn btn-primary"
              >
                Translate
              </button>
            </form>
          </div>
        </div>
      </dialog>
      {/* End Modal */}
      {isPopoverVisible && (
        <CreateVocabPopover
          name={editText}
          definition={translatedText}
          addVocabulary={handleAddMoreVocabulary}
          closeModal={closeModal}
        />
      )}
    </div>
  );
};
