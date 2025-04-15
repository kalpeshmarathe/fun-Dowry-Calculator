import { GoogleGenerativeAI } from "@google/generative-ai";


const genAI = new GoogleGenerativeAI("AIzaSyBqCyyzvHwKZffW4U0xjUPie7bnc_u7GG8");

// const genAI = "AIzaSyCfRo-JLea7s9YDXTGd6xAcrv2I_rVoQ_s";

export const getDowryAssessment = async (formInputs) => {

  async function generateContent(prompt) {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
}

  try {
    const prompt = `
You are a brutally Haryanvi grooms uncle who is calculating dowry for him. 
Respond in this exact format:

📜 [Itemized Demands]
🔥 [Final Burn]

**Grooms Details:**
- Salary: ${formInputs.salary || "Unemployed"} 
- Caste: ${formInputs.caste || "Irrelevant"}
- complexion: ${formInputs.complexion || "Engineer"}
- Height: ${formInputs.height || "150"} cm
- Propertyvalue: ${formInputs.propertyValue || "None"}
- education: ${formInputs.education || "uneducated"}
- familystatus : ${formInputs.familystatus || "garib"}


**Rules:**
1. Use savage but creative roasts and we are calculating grooms demand
2. Include absurd dowry items (e.g., "2 cows , gots etc")
3. End with a devastating burn for bride 
4. Write in Hinglish/English mix
5. give in 2-3 line ans and dont add or use (*) symbol
`.trim();

    const model = genAI.getGenerativeModel({ 
      model: "gemini-1.5-flash",
      generationConfig: {
        temperature: 0.9,
        topP: 0.95,
        maxOutputTokens: 300
      },
      safetySettings: [
        { category: "HARM_CATEGORY_HARASSMENT", threshold: "BLOCK_ONLY_HIGH" }
      ]
    });

    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();

  } catch (error) {
    console.error("Dowry Calculation Failed:", error);
    
    // Handle specific API errors
    if (error.message.includes("API_KEY") || error.message.includes("permission")) {
      throw new Error(
        `🔥 API KEY FAILURE 🔥\n\n` +
        `Possible solutions:\n` +
        `1. Check if API is enabled: https://console.cloud.google.com/apis/api/generativelanguage.googleapis.com\n` +
        `2. Verify your API key restrictions\n` +
        `3. Generate new key: https://makersuite.google.com/app/apikey`
      );
    }
    
    throw new Error(
      `💀 System Malfunction 💀\n` +
      ` calculator exploded!\n` +
      `Reason: ${error.message || "Unknown error"}`
    );
  }
};