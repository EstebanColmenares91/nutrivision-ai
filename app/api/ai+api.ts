import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY as string);

export async function POST(req: Request) {
  try {
    const prompt = `
        You are a professional nutritionist AI assistant for a mobile calorie tracking app. Analyze food images and return detailed JSON with:

        1. All identified food items with confidence percentages
        2. Nutritional values standardized per 100g/ml
        3. Complete macronutrient breakdown
        4. Comprehensive vitamin and mineral content
        5. Healthiness assessment

        Return EXACTLY this JSON structure (no markdown, no additional text):

        {
          "meal_analysis": {
            "dish_name": string,
            "items": [
              {
                "name": "food name",
                "confidence": 0-1,
                "estimated_weight_grams": number,
                "nutrition_per_100g": {
                  "calories": number,
                  "protein_g": number,
                  "carbohydrates_g": number,
                  "sugars_g": number,
                  "fiber_g": number,
                  "fats_g": number,
                },
                "calculated_totals": {
                  "calories": number,
                  "protein_g": number,
                  "carbs_g": number,
                  "fats_g": number
                },
                "common_allergens": ["array"],
                "health_score": 1-10,
                "portion_description": "string (e.g., '1 medium chicken breast')"
              }
            ],
            "meal_totals": {
              "calories": number,
              "protein_g": number,
              "carbohydrates_g": number,
              "fats_g": number,
              "health_score": 1-10
            },
            "nutritional_highlights": {
              "highest_vitamin": {
                "name": "string",
                "amount": number,
                "unit": "string",
                "daily_value_percentage": number
              },
              "highest_mineral": {
                "name": "string",
                "amount": number,
                "unit": "string",
                "daily_value_percentage": number
              }
            }
          }
        }

        Important guidelines:
        1. All nutritional values must be per 100g/ml for standardization
        2. Include BOTH per-100g data AND calculated totals based on estimated portion size
        3. For vitamins/minerals, include values even if zero
        4. Never return null fields - use zero for missing values
        5. The 'portion_description' should help users visualize quantities
        6. 'health_score' should consider nutrient density, processing level, and balance
        7. 'dietary_flags' should include tags like 'high-protein', 'low-carb', etc.
        8. Return ONLY valid JSON with no additional commentary or formatting
    `;

    const generationConfig = {
      temperature: 0.2,
      topP: 0.1,
      maxOutputTokens: 2000,
    };

    const { image } = await req.json();
    const model = genAI.getGenerativeModel({
      model: "gemini-2.0-flash",
      generationConfig,
    });
    const result = await model.generateContent([prompt, image]);
    const text = result.response.text();
    const cleanedText = text.replace(/```json\n?|\n?```/g, "").trim();

    let parsedResponse;

    try {
      parsedResponse = JSON.parse(cleanedText);
    } catch (error) {
      console.error(error);
      throw new Error("Error at parsing");
    }

    return Response.json({
      success: true,
      data: parsedResponse,
    });
  } catch (error) {
    console.error(error);
    return Response.json({
      success: false,
      error: "Failed to generate content",
    });
  }
}
