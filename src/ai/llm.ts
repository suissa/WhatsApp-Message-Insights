import axios from "axios";
import { buildPrompt } from "./promptTemplates.js";

export async function generateInsightLLM(context: string, summary: any) {
  const prompt = buildPrompt(context, summary);
  const apiKey = process.env.OPENROUTER_API_KEY;
  const baseUrl = "https://openrouter.ai/api/v1/chat/completions";

  try {
    const { data } = await axios.post(
      baseUrl,
      {
        model: "mistralai/mistral-7b-instruct:free",
        messages: [
          { role: "system", content: "You are a conversation analytics expert specialized in WhatsApp data." },
          { role: "user", content: prompt },
        ],
      },
      { headers: { Authorization: `Bearer ${apiKey}` } }
    );

    return {
      model: "mistralai/mistral-7b-instruct:free",
      text: data.choices?.[0]?.message?.content ?? "No insight generated.",
    };
  } catch (error) {
    console.error("OpenRouter error:", error.message);
    return { model: "local-fallback", text: "Insight not available — fallback model used." };
  }
} 
