/// <reference path="controllerInterface.d.ts" />
/// <reference path="../routes/Router.ts" />
enum MainActions {}
class MainController implements Controller {
  private app: ASPTS.ASPAdapter;
  private router: Router;
  constructor(app: ASPTS.ASPAdapter) {
    this.app = app;
    this.router = new Router(app);
  }

  autenticaUsuario() {
    // TODO implementar logica de autenticação
    var autenticado = true;
    if (!autenticado) {
      this.app.res.error(403, {
        erro: "Usuário não autorizado a acessar esse recurso"
      });
    }
  }

  verificaManutencao() {
    // TODO implementar logica de verificao de manutençao
    var manutencao = false;
    if (manutencao) {
      this.app.res.error(503, { erro: "Sistema em manutenção" });
    }
  }

  PostOnly() {
    if (this.app.env.production) {        
      if (this.app.req.method() == 'GET') {
        this.app.res.error(403, { erro: "Metodo não autorizado" });        
      }
    }
  }

  run() {
    this.PostOnly() 
    this. verificaManutencao();  
    this.autenticaUsuario();
    this.router.Route();
  }
}
