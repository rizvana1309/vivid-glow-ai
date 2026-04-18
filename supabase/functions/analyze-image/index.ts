// Real AI image analysis via Lovable AI Gateway (Gemini vision).
// Uses tool calling to return strict JSON shaped per analysis type.

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

type AnalysisType = "skin" | "hair" | "styling" | "ornament" | "dress";

const SCHEMAS: Record<AnalysisType, { name: string; description: string; parameters: any; system: string; user: string }> = {
  skin: {
    name: "return_skin_analysis",
    description: "Return a detailed skin analysis from the photo.",
    system:
      "You are a board-certified dermatology AI. Analyze ONLY what you can actually see in the user's selfie. Be specific and personalized to this exact face. Never refuse — give a best-effort visual assessment.",
    user: "Analyze this face photo and return the structured skin analysis. Tailor every field to what is visible in THIS image.",
    parameters: {
      type: "object",
      properties: {
        skinTone: { type: "string", description: "Fair / Wheatish / Medium / Dusky / Deep" },
        undertone: { type: "string", enum: ["Warm", "Cool", "Neutral"] },
        skinType: { type: "string", enum: ["Dry", "Oily", "Combination", "Normal", "Sensitive"] },
        issues: { type: "array", items: { type: "string" }, description: "Visible issues e.g. acne, pigmentation, dark circles, redness" },
        scores: {
          type: "object",
          properties: {
            hydration: { type: "number" },
            clarity: { type: "number" },
            elasticity: { type: "number" },
            overall: { type: "number" },
          },
          required: ["hydration", "clarity", "elasticity", "overall"],
        },
        recommendations: {
          type: "object",
          properties: {
            serum: { type: "string" },
            moisturizer: { type: "string" },
            foundation: { type: "string" },
            compact: { type: "string" },
            lipstick: { type: "array", items: { type: "string" } },
            blush: { type: "array", items: { type: "string" } },
            sunscreen: { type: "string" },
          },
          required: ["serum", "moisturizer", "foundation", "compact", "lipstick", "blush", "sunscreen"],
        },
        routine: { type: "array", items: { type: "string" } },
      },
      required: ["skinTone", "undertone", "skinType", "issues", "scores", "recommendations", "routine"],
    },
  },
  hair: {
    name: "return_hair_analysis",
    description: "Return a detailed hair analysis from the photo.",
    system: "You are a trichology AI. Analyze ONLY the hair visible in the photo and personalize all fields.",
    user: "Analyze the hair in this photo and return the structured hair analysis.",
    parameters: {
      type: "object",
      properties: {
        hairType: { type: "string", enum: ["Straight", "Wavy", "Curly", "Coily"] },
        density: { type: "string", enum: ["Low", "Medium", "High"] },
        frizzLevel: { type: "string" },
        issues: { type: "array", items: { type: "string" } },
        healthScore: { type: "number" },
        recommendations: {
          type: "object",
          properties: {
            shampoo: { type: "string" },
            conditioner: { type: "string" },
            serum: { type: "string" },
            oil: { type: "string" },
            mask: { type: "string" },
          },
          required: ["shampoo", "conditioner", "serum", "oil", "mask"],
        },
        routine: { type: "array", items: { type: "string" } },
      },
      required: ["hairType", "density", "frizzLevel", "issues", "healthScore", "recommendations", "routine"],
    },
  },
  styling: {
    name: "return_styling_analysis",
    description: "Return body shape and styling recommendations.",
    system: "You are a fashion stylist AI. Analyze the body proportions and skin tone visible in the photo.",
    user: "Analyze this full-body photo and return the styling analysis.",
    parameters: {
      type: "object",
      properties: {
        bodyShape: { type: "string", enum: ["Pear", "Apple", "Hourglass", "Rectangle", "Triangle", "Inverted Triangle"] },
        heightProportion: { type: "string" },
        bestColors: { type: "array", items: { type: "string" } },
        suggestions: {
          type: "object",
          properties: {
            outfitTypes: { type: "array", items: { type: "string" } },
            sleeveType: { type: "string" },
            neckDesign: { type: "string" },
            pantStyle: { type: "string" },
            kurtiStyle: { type: "string" },
            westernOutfits: { type: "array", items: { type: "string" } },
            occasions: {
              type: "object",
              properties: {
                casual: { type: "string" },
                formal: { type: "string" },
                party: { type: "string" },
                ethnic: { type: "string" },
              },
              required: ["casual", "formal", "party", "ethnic"],
            },
          },
          required: ["outfitTypes", "sleeveType", "neckDesign", "pantStyle", "kurtiStyle", "westernOutfits", "occasions"],
        },
      },
      required: ["bodyShape", "heightProportion", "bestColors", "suggestions"],
    },
  },
  ornament: {
    name: "return_ornament_analysis",
    description: "Return jewelry recommendations based on face shape and undertone.",
    system: "You are a jewelry stylist AI. Read the face shape and undertone from the photo and recommend ornaments.",
    user: "Analyze this face photo and return ornament recommendations.",
    parameters: {
      type: "object",
      properties: {
        faceShape: { type: "string", enum: ["Oval", "Round", "Square", "Heart", "Oblong", "Diamond"] },
        metalSuggestion: { type: "string", enum: ["Gold", "Silver", "Platinum", "Rose Gold"] },
        roseGold: { type: "string" },
        recommendations: {
          type: "object",
          properties: {
            necklace: { type: "string" },
            earrings: { type: "string" },
            noseRing: { type: "string" },
            bangles: { type: "string" },
            style: { type: "string" },
          },
          required: ["necklace", "earrings", "noseRing", "bangles", "style"],
        },
        matchReason: { type: "string" },
      },
      required: ["faceShape", "metalSuggestion", "roseGold", "recommendations", "matchReason"],
    },
  },
  dress: {
    name: "return_dress_analysis",
    description: "Return outfit-pairing recommendations from a clothing photo.",
    system: "You are a fashion color theorist AI. Identify the garment in the photo and recommend pairings.",
    user: "Analyze this clothing/dress photo and return the dress matcher analysis.",
    parameters: {
      type: "object",
      properties: {
        color: { type: "string" },
        pattern: { type: "string" },
        fabric: { type: "string" },
        style: { type: "string" },
        matchScore: { type: "number" },
        recommendations: {
          type: "object",
          properties: {
            pant: { type: "string" },
            dupatta: { type: "string" },
            footwear: { type: "string" },
            handbag: { type: "string" },
            doNotPair: { type: "array", items: { type: "string" } },
          },
          required: ["pant", "dupatta", "footwear", "handbag", "doNotPair"],
        },
        colorClash: { type: "boolean" },
        verdict: { type: "string" },
      },
      required: ["color", "pattern", "fabric", "style", "matchScore", "recommendations", "colorClash", "verdict"],
    },
  },
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const { type, imageBase64, mimeType } = await req.json();
    if (!type || !imageBase64) {
      return new Response(JSON.stringify({ error: "type and imageBase64 are required" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
    const schema = SCHEMAS[type as AnalysisType];
    if (!schema) {
      return new Response(JSON.stringify({ error: `Unknown analysis type: ${type}` }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      return new Response(JSON.stringify({ error: "LOVABLE_API_KEY is not configured" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const dataUrl = `data:${mimeType || "image/jpeg"};base64,${imageBase64}`;

    const aiResp = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          { role: "system", content: schema.system },
          {
            role: "user",
            content: [
              { type: "text", text: schema.user },
              { type: "image_url", image_url: { url: dataUrl } },
            ],
          },
        ],
        tools: [
          {
            type: "function",
            function: {
              name: schema.name,
              description: schema.description,
              parameters: schema.parameters,
            },
          },
        ],
        tool_choice: { type: "function", function: { name: schema.name } },
      }),
    });

    if (!aiResp.ok) {
      const errText = await aiResp.text();
      console.error("AI gateway error:", aiResp.status, errText);
      if (aiResp.status === 429) {
        return new Response(JSON.stringify({ error: "Rate limit exceeded. Please try again shortly." }), {
          status: 429,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (aiResp.status === 402) {
        return new Response(JSON.stringify({ error: "AI credits exhausted. Add funds in Lovable workspace." }), {
          status: 402,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      return new Response(JSON.stringify({ error: `AI gateway error: ${aiResp.status}` }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const data = await aiResp.json();
    const toolCall = data?.choices?.[0]?.message?.tool_calls?.[0];
    const argsStr = toolCall?.function?.arguments;
    if (!argsStr) {
      console.error("No tool call returned:", JSON.stringify(data));
      return new Response(JSON.stringify({ error: "AI did not return structured analysis" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const result = JSON.parse(argsStr);
    return new Response(JSON.stringify({ result }), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("analyze-image error:", e);
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
