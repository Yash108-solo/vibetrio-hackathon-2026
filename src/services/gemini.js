import { GoogleGenerativeAI } from '@google/generative-ai';

const apiKey = import.meta.env.VITE_GEMINI_API_KEY || '';
const genAI = apiKey ? new GoogleGenerativeAI(apiKey) : null;

/**
 * Generate AI content with Gemini
 * @param {string} prompt 
 * @param {string} systemInstruction 
 * @returns {Promise<string>}
 */
export async function generateAIResponse(prompt, systemInstruction = '') {
  if (!apiKey || !genAI) {
    return "⚠️ Gemini API key is missing. Please create a `.env` file with `VITE_GEMINI_API_KEY=your_key` in the project root.";
  }

  try {
    const model = genAI.getGenerativeModel({
      model: 'gemini-1.5-flash',
      systemInstruction: systemInstruction || undefined
    });

    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error("Gemini API Error:", error);
    return `Error generating response: ${error.message}`;
  }
}
