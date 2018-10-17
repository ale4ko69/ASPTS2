/// <reference path="controllerInterface.d.ts" />
/// <reference path="../../aspts/ts/lASPTS.ts" />
/// <reference path="../../aspts/ts/SQLServerAdapter.ts" />
/// <reference path="../../aspts/tstypes/is/index.d.ts" />
enum testSqlActionsEnum {
    lista = 'lista',
    devhelp = 'devhelp'
}
class testSqlController implements Controller {
    private app: ASPTS.ASPAdapter
    private sql: ASPTS.SQL.SqlServerAdapter
    constructor(app: ASPTS.ASPAdapter) {
        this.app = app; 
        this.sql =  new ASPTS.SQL.SqlServerAdapter(env.connectionstring, app)       
    }

    run(action: string, version: string){

        switch (action) {
            case testSqlActionsEnum.lista:
                this.lista(action)                
                break;
            case testSqlActionsEnum.devhelp:
                this.devhelp()
                break;
        
            default:
                this.app.res.error(404, {error:"ação não localizada"})
                break;
        }

    }

    private devhelp(){
        const all = this.app.listaTudo()       
        this.app.res.json(all)
    }
    private lista(action: string){
        this.app.req.body
        const query ="EXEC	[SR2625].[simulador2019].[SP_TESTE]		@AM_REF = 201810,	@NU_GRUPO = 1"
        

        const qtd_por_pagina =  String(this.app.req.getQueryString("page_size")).toLowerCase()
        let pagina_atual =  String(this.app.req.getQueryString("page_number")).toLowerCase()
        let res = {}
        if (qtd_por_pagina === "undefined") {
        // sem paginação
            res = this.sql.query(query)        
        
        } else {
            if (pagina_atual === "undefined") {
                pagina_atual = "1"
            }    
            res = this.sql.query(query,parseInt(qtd_por_pagina),parseInt(pagina_atual))        
        }
        
        
        this.app.res.json(res)                
    }
}