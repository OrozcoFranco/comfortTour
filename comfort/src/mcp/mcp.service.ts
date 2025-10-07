import { Injectable, OnModuleInit } from "@nestjs/common";
import { startMcpServer } from "./mcp.server";
import { generarRecomendacionesMCP } from "./google.connector";
import { CreateFormDto } from "../user/dto/createForm.dto";

@Injectable()
export class McpService implements OnModuleInit {
  private mcpServer: any;

  async onModuleInit() {
    this.mcpServer = await startMcpServer();
  }

  async generarRecomendaciones(dto: CreateFormDto): Promise<string> {
    // Categorías predefinidas
    const categorias = ["gastronomía", "cultura", "aventura", "naturaleza", "vino"];

    // Construimos prompt usando los campos de dto
    const prompt = `
Genera un itinerario de viaje para ${dto.stay} días en ${dto.city}.
Intereses: ${dto.interests.join(", ")}.
Presupuesto: ${dto.budget}.
Utiliza únicamente estas categorías: ${categorias.join(", ")}.
Haz recomendaciones muy cortas, máximo 2-3 líneas cada una.
No escribas explicaciones largas ni párrafos.
Formato: lista numerada de 3-5 recomendaciones.
`;

    // Llamamos al MCP
    return await generarRecomendacionesMCP(prompt);
  }

}
