
import { GoogleGenAI, Type } from "@google/genai";

const getAI = () => new GoogleGenAI({ apiKey: process.env.API_KEY });

export async function analyzePlantImage(base64Image: string) {
  const ai = getAI();
  const model = 'gemini-3-flash-preview';

  const prompt = `Analyze this plant leaf image for identification and disease classification.
  1. Identify the specific plant species/name based on leaf characteristics.
  2. Determine the health condition (disease name or 'Healthy').
  3. Detect if the leaf is dried or withered.
  4. Provide 3-4 specific plant care tips for this species.
  5. Confidence score (0-1).
  6. Actionable advice.
  7. A short inspiring plant quotation.

  Return as valid JSON.`;

  try {
    const response = await ai.models.generateContent({
      model,
      contents: {
        parts: [
          { inlineData: { data: base64Image, mimeType: 'image/jpeg' } },
          { text: prompt }
        ]
      },
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            plantName: { type: Type.STRING },
            condition: { type: Type.STRING },
            isDried: { type: Type.BOOLEAN },
            confidence: { type: Type.NUMBER },
            advice: { type: Type.STRING },
            quotation: { type: Type.STRING },
            careTips: { 
              type: Type.ARRAY,
              items: { type: Type.STRING }
            }
          },
          required: ["plantName", "condition", "isDried", "confidence", "advice", "quotation", "careTips"]
        }
      }
    });

    const result = JSON.parse(response.text || '{}');
    return result;
  } catch (error) {
    console.error("Gemini Analysis Error:", error);
    throw error;
  }
}

export async function askPlantExpert(query: string, history: any[] = []) {
  const ai = getAI();
  const chat = ai.chats.create({
    model: 'gemini-3-flash-preview',
    config: {
      systemInstruction: 'You are an expert agronomist and botanist. Provide helpful, accurate, and concise advice about plant care, identification, and disease management. If the user asks about something unrelated to plants, politely steer the conversation back to agriculture and botany.',
    }
  });

  const response = await chat.sendMessage({ message: query });
  return response.text;
}
