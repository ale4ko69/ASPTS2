/// <reference path="controllers/mainController.ts" />
/// <reference path="../aspts/ts/lASPTS.ts" />
/// <reference path="../env.d.ts" />



function main() {
  
  const app = new ASPTS.ASPAdapter(env);    
  const mainCtrl = new MainController(app);
  mainCtrl.run();
  
  
}
