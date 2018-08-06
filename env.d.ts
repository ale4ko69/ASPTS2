
/// <reference path="aspts/ts/lASPTS.ts" />


declare class Enviroment implements ASPTS.EnviromentInterface{
    production: boolean
    connectionstring: string
    // adicionar aqui outros..
}

declare var env: Enviroment
        
