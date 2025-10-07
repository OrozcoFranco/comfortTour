// import { recomendarHandler } from "./mcp.server";

// export async function generarRecomendacionesMCP(prompt: string): Promise<string> {
//   const result = await recomendarHandler({ prompt }, {});

//   if (!result?.content || !Array.isArray(result.content)) {
//     throw new Error("El resultado del MCP no tiene el formato esperado.");
//   }

//   return result.content.map((c: any) => c.text).join("\n");
// }

import { recomendarHandler } from "./mcp.server";

/**
 * Genera recomendaciones usando el MCP y las resume para que no sean demasiado largas
 */
export async function generarRecomendacionesMCP(prompt: string): Promise<string> {
  // Llamamos al handler con el prompt
  const result = await recomendarHandler({ prompt }, {});

  if (!result?.content || !Array.isArray(result.content)) {
    throw new Error("El resultado del MCP no tiene el formato esperado.");
  }

  // Unimos todo el texto
  const textoCompleto = result.content.map((c: any) => c.text).join("\n");

  // --- Resumimos: máximo 5 líneas ---
  const lineas = textoCompleto
    .split("\n")
    .map((l) => l.trim())
    .filter((l) => l.length > 0)
    .slice(0, 5); // máximo 5 líneas

  // Retornamos el texto resumido
  return lineas.join("\n");
}
