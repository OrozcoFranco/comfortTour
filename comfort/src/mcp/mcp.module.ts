// import { Module } from '@nestjs/common';
import { McpModule, McpTransportType } from '@rekog/mcp-nest';
import { RecomendadorTool } from './tools/recomendador.tool';
import { ConfigService } from '@nestjs/config';
// import { McpController } from './mcp.controller';
// import { McpService } from './mcp.service';

// @Module({
//     imports:[
//         McpModule.forRootAsync({ //configurarion de MCP
//             inject: [ConfigService],
//             useFactory: (config : ConfigService) => ({
//                 name: 'comfort-tour-mcp',
//                 version: '1.0.0',
//                 transport: [McpTransportType.STREAMABLE_HTTP],
//                 auth: {
//                     apiKey: config.get<string>('MCP_API_KEY'),
//                 }
                
//             })
//         })
//     ],
//     providers: [RecomendadorTool, McpService],
//     exports: [RecomendadorTool, McpService],
//     controllers: [McpController]
// })
// export class McpNestModule { }

import { Module } from "@nestjs/common";
import { McpService } from "./mcp.service";
import { McpController } from "./mcp.controller";

@Module({
    controllers: [McpController],
    providers: [McpService],
})
export class AppNestModule { }
