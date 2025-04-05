import { Button } from '@/components/ui/button';
import { Mic } from 'lucide-react';
import { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import SpeechRecognition, {
  useSpeechRecognition,
} from 'react-speech-recognition';

interface ChatInput {
  message: string;
}
export function ChatBox() {
  const { handleSubmit } = useForm<ChatInput>();
  const [textInput, setTextInput] = useState('');

  const { transcript, listening, browserSupportsSpeechRecognition } =
    useSpeechRecognition();

  useEffect(() => {
    if (transcript) {
      setTextInput(transcript);
    }
  }, [transcript]);

  const onSubmit: SubmitHandler<ChatInput> = (data) => {
    console.log('Tin nhắn đã gửi đi:', data.message);
  };

  const clickMicrophone = () => {
    if (browserSupportsSpeechRecognition) {
      if (listening) {
        SpeechRecognition.stopListening();
      } else {
        SpeechRecognition.startListening();
      }
    }
  };
  return (
    <div className='h-[calc(100vh-4rem)] flex flex-col justify-center items-center '>
      <h1 className='text-2xl font-medium m-4'>What can I help with?</h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className='flex flex-col border-2 min-w-xl max-w-4xl rounded-lg p-4 shadow-lg'
      >
        <textarea
          className='w-full top-0 left-0  h-auto min-h-[3rem] resize-none focus:outline-none'
          placeholder='Ask anything'
          value={textInput}
          onChange={(e) => setTextInput(e.target.value)}
        />
        <p className='text-sm text-gray-500'>
          Speech Recognition: {listening ? 'on' : 'off'}
        </p>
        <div className='flex justify-between items-center'>
          <fieldset disabled={browserSupportsSpeechRecognition}>
            <Mic onClick={clickMicrophone} className='cursor-pointer' />
          </fieldset>
          <Button
            className='self-end'
            type='submit'
            disabled={!textInput.trim()}
          >
            Send
          </Button>
        </div>
      </form>
    </div>
  );
}
