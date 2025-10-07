// import {
//   Controller,
//   Post,
//   Body,
//   Sse,
//   MessageEvent,
// } from "@nestjs/common";
// import { McpService } from "./mcp.service";
// import { CreateFormDto } from "../user/dto/createForm.dto";
// import { Observable, from } from "rxjs";
// import { map } from "rxjs/operators";

// @Controller("mcp")
// export class McpController {
//   constructor(private readonly mcpService: McpService) {}

//   // 👉 Endpoint normal (devuelve el texto completo)
//   @Post("recomendar")
//   async recomendar(
//     @Body() createFormDto: CreateFormDto
//   ): Promise<{ success: boolean; message: string; data: string }> {
//     const recomendaciones = await this.mcpService.generarRecomendaciones(createFormDto);
//     return {
//       success: true,
//       message: "Recomendaciones generadas correctamente",
//       data: recomendaciones,
//     };
//   }

//   // 👉 Endpoint SSE (streaming)
//   @Sse("recomendar-stream")
//   recomendarStream(
//     @Body() createFormDto: CreateFormDto
//   ): Observable<MessageEvent> {
//     return from(this.mcpService.generarRecomendaciones(createFormDto)).pipe(
//       map((recomendaciones) => ({
//         data: recomendaciones,
//       }))
//     );
//   }
// }


// src/mcp/mcp.controller.ts
import {
  Controller,Post,Body,Sse,MessageEvent,
} from "@nestjs/common";
import { McpService } from "./mcp.service";
import { CreateFormDto } from "../user/dto/createForm.dto";
import { Observable, from } from "rxjs";
import { map } from "rxjs/operators";

@Controller("mcp")
export class McpController {
  constructor(private readonly mcpService: McpService) {}

  // Endpoint normal → devuelve todo junto en JSON
  @Post("recomendar")
  async recomendar(
    @Body() createFormDto: CreateFormDto
  ): Promise<{ success: boolean; message: string; data: string }> {
    const recomendaciones = await this.mcpService.generarRecomendaciones(createFormDto);
    return {
      success: true,
      message: "Recomendaciones generadas correctamente",
      data: recomendaciones,
    };
  }

  // Endpoint SSE → devuelve texto completo en un solo evento
  @Sse("recomendar-stream")
  recomendarStream(
    @Body() createFormDto: CreateFormDto
  ): Observable<MessageEvent> {
    return from(this.mcpService.generarRecomendaciones(createFormDto)).pipe(
      map((recomendaciones) => ({
        data: recomendaciones,
      }))
    );
  }
}
