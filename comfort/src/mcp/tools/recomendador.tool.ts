import { Injectable, UnauthorizedException } from '@nestjs/common';
import type { Context } from '@rekog/mcp-nest';
import { Tool} from '@rekog/mcp-nest';
import { z } from 'zod';

@Injectable()
export class RecomendadorTool {
    @Tool({
        name: 'recomendar-viaje',
        description: 'Genera recomendaciones turísticas según preferencias',
        parameters: z.object({
            city: z.string(),
            interests: z.array(z.string()),
            budget: z.number(),
            stay: z.number(),
            travelchildren: z.boolean(),
            numberOfPeople: z.number()
        })
    })
    async recomendar(params, context: Context) {
        const { city } = params


        return {
            content: [
                {
                    type: 'text',
                    text: `Basado en tus intereses en ${city}, te recomendamos: Museo del Vino, Parque San Martín y bodegas locales.`,
                }
            ]
        };
    }
}