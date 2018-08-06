/// <reference path="../../aspts/tstypes/asp/index.d.ts" />
/// <reference path="../../aspts/ts/lASPTS.ts" />
/// <reference path="testSqlController.ts" />


// rotas de exemplo listando variaveis do servidor ASP
enum RoutesEnum {   
    testeRoute = "teste",
    testSQLRoute = "testsql"
    
}

class Router {
    app: ASPTS.ASPAdapter
    
    constructor(app: ASPTS.ASPAdapter) {
        this.app = app
    }

    Route(){
        const controller = String(this.app.req.getQueryString("c")).toLowerCase()
        const action = String(this.app.req.getQueryString("a")).toLowerCase()
        switch (controller) {
            case RoutesEnum.testeRoute:   
                this.app.res.json({route: RoutesEnum.testeRoute, action: action})
                break;
            
            case RoutesEnum.testSQLRoute:   
                const testSQLctr = new testSqlController(this.app)
                testSQLctr.run(action)                
                break;
                
            default:
                this.app.res.error(404, {error:"Rota não localizada"})
                break;
        }
    
}


}

