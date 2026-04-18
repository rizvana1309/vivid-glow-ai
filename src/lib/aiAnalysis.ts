import { supabase } from "@/integrations/supabase/client";

export type AnalysisType = "skin" | "hair" | "styling" | "ornament" | "dress";

function fileToBase64(file: File): Promise<{ base64: string; mimeType: string }> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const dataUrl = reader.result as string;
      const [, base64 = ""] = dataUrl.split(",");
      resolve({ base64, mimeType: file.type || "image/jpeg" });
    };
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(file);
  });
}

export async function analyzeImage<T>(type: AnalysisType, file: File): Promise<T> {
  const { base64, mimeType } = await fileToBase64(file);
  const { data, error } = await supabase.functions.invoke("analyze-image", {
    body: { type, imageBase64: base64, mimeType },
  });
  if (error) {
    const msg = (error as any)?.context?.error || error.message || "Analysis failed";
    throw new Error(msg);
  }
  if ((data as any)?.error) throw new Error((data as any).error);
  return (data as any).result as T;
}
