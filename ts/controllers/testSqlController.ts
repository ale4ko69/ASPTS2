

/// <reference path="controllerInterface.d.ts" />
/// <reference path="../../aspts/ts/lASPTS.ts" />
/// <reference path="../../aspts/ts/SQLServerAdapter.ts" />
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

    run(action: string){

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
        const query ="EXEC  [simulador2019].[SP_TESTE]"
        const res = this.sql.query(query)
        this.app.res.json(res)                
    }
}