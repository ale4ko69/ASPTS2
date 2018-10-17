/// <reference path="../tstypes/ua-parser-js/index.d.ts" />

// includes - funcoes importadas que precisam ser declaradas para serem reconhecidas no Typescript
declare var UAParser: any | IUAParser.UAParser
declare function setSession(key: string, val: any): void;
declare function ToVBDate(jsDate: Date): any;       
declare var console: any 