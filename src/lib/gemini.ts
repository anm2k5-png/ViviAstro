import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

export interface BirthData {
  name: string;
  birthDate: string;
  birthTime: string;
  birthPlace: string;
  language?: string;
  latitude?: number;
  longitude?: number;
}

export interface PlanetDetail {
  sign: string;
  degree: string;
  interpretation: string;
}

export interface HouseDetail {
  number: number;
  sign: string;
  theme: string;
  interpretation: string;
}

export interface AstrologyAnalysis {
  sunSign: string;
  moonSign: string;
  risingSign: string;
  element: string;
  mode: string;
  chartRuler: string;
  planets: {
    sun: PlanetDetail;
    moon: PlanetDetail;
    mercury: PlanetDetail;
    venus: PlanetDetail;
    mars: PlanetDetail;
    jupiter: PlanetDetail;
    saturn: PlanetDetail;
    uranus: PlanetDetail;
    neptune: PlanetDetail;
    pluto: PlanetDetail;
  };
  houses: HouseDetail[];
  aspectPatterns: string[];
  summary: string;
  detailedAnalysis: string;
  keyTraits: string[];
  luckyElements: {
    color: string;
    number: number;
    stone: string;
  };
  chartImageUrl?: string;
}

export async function analyzeBirthChart(data: BirthData): Promise<AstrologyAnalysis> {
  const textPrompt = `
    Analyze the astrological birth chart for the following individual using the principles of "The Secret Language of Astrology" and the "17 Symbols" framework:
    Name: ${data.name}
    Birth Date: ${data.birthDate}
    Birth Time: ${data.birthTime}
    Birth Place: ${data.birthPlace}
    Coordinates: ${data.latitude && data.longitude ? `${data.latitude}, ${data.longitude}` : "Not provided"}
    Language: ${data.language || "English"}

    Please provide the analysis in ${data.language || "English"}.

    Please provide:
    1. Sun Sign, Moon Sign, and Rising Sign (Ascendant).
    2. The dominant Element (Fire, Water, Earth, or Air) and the dominant Mode (Cardinal, Fixed, or Mutable).
    3. The Chart Ruler (the planet that rules the Ascendant sign).
    4. Detailed positions and interpretations for ALL planets:
       - Sun: The Self & Core Identity
       - Moon: Emotions & Soul
       - Mercury: Communication & Mind
       - Venus: Love & Values
       - Mars: Action & Desire
       - Jupiter: Expansion & Growth
       - Saturn: Structure & Limitation
       - Uranus: Innovation & Change
       - Neptune: Dreams & Intuition
       - Pluto: Transformation & Power
       
       For each planet, provide:
       - Sign (e.g., "Libra")
       - Degree (e.g., "15° 24'")
       - A brief interpretation (1-2 sentences) relevant to its theme.
    5. Detailed information for the 12 Astrological Houses:
       - House Number (1-12)
       - Sign on the cusp of the house
       - The core theme of the house (e.g., "1st House: Self & Appearance", "2nd House: Values & Finances")
       - A brief interpretation of what this placement means for the individual.
    6. Identify any major Aspect Patterns present (e.g., Grand Trine, T-Square, Grand Cross, Kite, Stellium).
    7. A brief summary (2-3 sentences).
    8. A detailed analysis of their personality, career, and relationships.
    9. 5 key personality traits using keywords from traditional astrology (e.g., "Initiating" for Cardinal, "Stable" for Earth).
    10. Lucky color, lucky number, and lucky stone.

    Return the data in a structured JSON format.
  `;

  const planetSchema = {
    type: Type.OBJECT,
    properties: {
      sign: { type: Type.STRING },
      degree: { type: Type.STRING },
      interpretation: { type: Type.STRING }
    },
    required: ["sign", "degree", "interpretation"]
  };

  const houseSchema = {
    type: Type.OBJECT,
    properties: {
      number: { type: Type.INTEGER },
      sign: { type: Type.STRING },
      theme: { type: Type.STRING },
      interpretation: { type: Type.STRING }
    },
    required: ["number", "sign", "theme", "interpretation"]
  };

  // Run text analysis and image generation in parallel
  const [textResponse, imageResponse] = await Promise.all([
    ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: textPrompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            sunSign: { type: Type.STRING },
            moonSign: { type: Type.STRING },
            risingSign: { type: Type.STRING },
            element: { type: Type.STRING },
            mode: { type: Type.STRING },
            chartRuler: { type: Type.STRING },
            planets: {
              type: Type.OBJECT,
              properties: {
                sun: planetSchema,
                moon: planetSchema,
                mercury: planetSchema,
                venus: planetSchema,
                mars: planetSchema,
                jupiter: planetSchema,
                saturn: planetSchema,
                uranus: planetSchema,
                neptune: planetSchema,
                pluto: planetSchema
              },
              required: ["sun", "moon", "mercury", "venus", "mars", "jupiter", "saturn", "uranus", "neptune", "pluto"]
            },
            houses: {
              type: Type.ARRAY,
              items: houseSchema
            },
            aspectPatterns: {
              type: Type.ARRAY,
              items: { type: Type.STRING }
            },
            summary: { type: Type.STRING },
            detailedAnalysis: { type: Type.STRING },
            keyTraits: {
              type: Type.ARRAY,
              items: { type: Type.STRING }
            },
            luckyElements: {
              type: Type.OBJECT,
              properties: {
                color: { type: Type.STRING },
                number: { type: Type.NUMBER },
                stone: { type: Type.STRING }
              },
              required: ["color", "number", "stone"]
            }
          },
          required: ["sunSign", "moonSign", "risingSign", "element", "mode", "chartRuler", "planets", "houses", "aspectPatterns", "summary", "detailedAnalysis", "keyTraits", "luckyElements"]
        }
      }
    }),
    ai.models.generateContent({
      model: "gemini-2.5-flash-image",
      contents: `An artistic and mystical astrological natal chart for ${data.name}, born on ${data.birthDate} at ${data.birthTime} in ${data.birthPlace}. The style should be elegant, cosmic, and ethereal, featuring a circular zodiac wheel with intricate celestial symbols, planetary alignments, and constellations. Use a deep midnight blue background with shimmering gold and silver accents. High resolution, professional digital art style.`,
    })
  ]);

  const analysis: AstrologyAnalysis = JSON.parse(textResponse.text || "{}");

  // Extract image from response
  for (const part of imageResponse.candidates?.[0]?.content?.parts || []) {
    if (part.inlineData) {
      analysis.chartImageUrl = `data:image/png;base64,${part.inlineData.data}`;
      break;
    }
  }

  return analysis;
}
