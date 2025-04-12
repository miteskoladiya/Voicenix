import axios from "axios";
import OpenAI from "openai"
import { CoachingOptions } from "./Options";
import { PollyClient, SynthesizeSpeechCommand } from "@aws-sdk/client-polly";

export const getToken=async()=>{
    const result=await axios.get('/api/getToken')

    return result.data;
}


const openai = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.NEXT_PUBLIC_AI_OPENROUTER,
  dangerouslyAllowBrowser: true,
});

export const AIModel = async (topic, coachingOptions, lastTwoConversation) => {
  try {
    const option = CoachingOptions.find((item) => item.name === coachingOptions);

    if (!option) {
      console.warn('No matching coaching option found for:', coachingOptions);
      return 'No coaching option found.';
    }

    const PROMPT = (option.prompt || '').replace('{user_topic}', topic);

    const completion = await openai.chat.completions.create({
      model: "openai/gpt-3.5-turbo",
      messages: [
        { role: 'assistant', content: PROMPT },
        ...lastTwoConversation,
      ],
    });

    console.log("✅ Full AI Completion Response:", completion);

    const message = completion?.choices?.[0]?.message?.content;

    if (!message) {
      console.error("❌ AI response did not return a valid message.");
      return 'Something went wrong: No response from the AI.';
    }

    return message;
  } catch (error) {
    console.error("🔥 Error in AIModel:", error);
    return 'Error generating AI response.';
  }
};

export const AIModelToGenerateFeedbackAndNotes = async ( coachingOptions, conversion) => {
  try {
    const option = CoachingOptions.find((item) => item.name === coachingOptions);

    const PROMPT = (option.summeryPrompt);

    const completion = await openai.chat.completions.create({
      model: "openai/gpt-3.5-turbo",
      messages: [
        ...conversion,
        { role: 'assistant', content: PROMPT },
      ],
    });

    console.log("✅ Full AI Completion Response:", completion);

    const message = completion?.choices?.[0]?.message?.content;

    if (!message) {
      console.error("❌ AI response did not return a valid message.");
      return 'Something went wrong: No response from the AI.';
    }

    return message;
  } catch (error) {
    console.error("🔥 Error in AIModel:", error);
    return 'Error generating AI response.';
  }
};


export const ConvertTextToSpeech=async(text,expertName)=>{
      const pollyClient= new PollyClient({
        region:'us-east-1',
        credentials:{
          accessKeyId:process.env.NEXT_PUBLIC_AWS_ACCESS_KEY_ID,
          secretAccessKey:process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY
        }
      })

      const command=new SynthesizeSpeechCommand({
        Text:text,
        OutputFormat:'mp3',
        VoiceId:expertName
      })

      try{
        const {AudioStream}=await pollyClient.send(command);

        const audioArrayBuffer=await AudioStream.transformToByteArray();
        const audioBlob=new Blob([audioArrayBuffer],{type:'audio/mp3'});

        const audioUrl=URL.createObjectURL(audioBlob);

        return audioUrl;
      }catch(e)
      {
        console.log(e);

      }
}

