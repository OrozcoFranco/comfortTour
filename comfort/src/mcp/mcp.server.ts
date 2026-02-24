//McpServer es una clase para crear el servidor de MCP 
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
// con esto nos podemos conectar con gemini
import { GoogleGenerativeAI } from "@google/generative-ai";

export let recomendarHandler: any; // exportamos el handler para usarlo desde el service

//startMcpServer crea una instancia del servidor con el nombre y version 
export async function startMcpServer() {
  const server = new McpServer({
    name: "comfort-tour-mcp",
    version: "1.0.0",
  });

  // creamos un cliente de Google Generative AI con la api-key que esta en el .env
  const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY!);

  // SEleccionamos el modelo
  const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

  // Definimos la tool(herramienta) "recomendar" y exportamos el handler al archivo google.connector.ts
  recomendarHandler = async (args: any, extra: any) => {
    const prompt = args.prompt ?? "Dame 3 recomendaciones básicas para Mendoza";
    const result = await model.generateContent(prompt);
    const text = result.response.text();

    return {
      content: [
        {
          type: "text",
          text,
        },
      ],
    };
  };

  server.tool(
    "recomendar",
    { prompt: { type: "string" } },
    recomendarHandler
  );

  return server;
}
