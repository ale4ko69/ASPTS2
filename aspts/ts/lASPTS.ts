/// <reference path="../tstypes/asp/index.d.ts" />
/// <reference path="../tstypes/ua-parser-js/index.d.ts" />
/// <reference path="includes.d.ts" />
/// <reference path="ASPTSInterface.d.ts" />

namespace ASPTS {
  export interface EnviromentInterface {
    production: boolean 
}

  export class ASPAdapter implements ASPAdapterInterface {
    // receber variaveis de ambiente.
    env: EnviromentInterface;

    res: ClientResponse;
    req: ClientRequest;

    sess: ASPSession;
    appvar: ASPApplication;
    serv: ASPServer;
    constructor(env: EnviromentInterface) {
      this.env = env;
      this.serv = new ASPServer();
      this.appvar = new ASPApplication();
      this.sess = new ASPSession();
      this.res = new ClientResponse();
      this.req = new ClientRequest();
    }

    listaTudo() {
      if (!this.env.production) {
        const method = this.req.method();
        const hostname = this.req.hostname();
        const ip = this.req.ip();
        const appvars = this.appvar.get();
        const sessvars = this.sess.get();
        const id = this.sess.sessionID();
        const servervar = this.req.getServerVariables();
        const querystring = this.req.getQueryString();
        const cookies = this.req.getCookies();
        const formvar = this.req.getForm();
        const uadata = this.req.ua().getResult();

        const saida = {
          id: id,
          env: this.env,
          method: method,
          host: hostname,
          ip: ip,
          query: querystring,
          uadata: uadata,
          cookies: cookies,
          form: formvar,
          serverVariables: servervar,
          sessionVariables: sessvars,
          applicationVariables: appvars
        };

        return saida;
      }
      return { msg: "Função não autorizada em ambiente de produção" };
    }
  }

  export class ASPApplication implements ASPApplication {
    constructor() {}

    get(key?: string) {
      const dic = {};
      for (let index = 1; index <= Application.Contents().Count(); index++) {
        const chave = Application.Contents.Key(index);
        const element = Application.Contents.Item(index);
        dic[chave] = element;
      }

      if (key) {
        return dic[key];
      }

      return dic;
    }

    set(key: string, value: any) {
      // TODO
    }

    Lock() {
      Application.Lock();
    }

    Unlock() {
      Application.Unlock();
    }
    remove(key: string) {
      //   Application.Remove(key)
    }
    removeAll() {
      //  Application.RemoveAll()
    }
  }

  export class ASPSession implements ASPSessionInterface {
    constructor() {
      this.LCID("1033");
    }

    get(key?: string) {
      const dic = {};
      for (let index = 1; index <= Session.Contents().Count(); index++) {
        const chave = Session.Contents.Key(index);
        const element = Session.Contents.Item(index);
        dic[chave] = element;
      }

      if (key) {
        return dic[key];
      }

      return dic;
      //return Session(key)
    }
    set(key: string, value: any) {
      // TODO RESOLVER PROBLEMA SET VARIAVEL
    }

    sessionID() {
      return Session.SessionID;
    }

    timeout(minutes?: number) {
      if (typeof minutes !== "undefined") {
        Session.Timeout = minutes;
      }
      return Session.Timeout;
    }
    LCID(code) {
      Session.LCID = code;
    }

    Abandon() {
      Session.Abandon();
    }

    remove(key: string) {
      //  Session.Remove(key)
    }

    removeAll() {
      // Session.RemoveAll()
    }
  }

  export class ASPServer implements ServerInterface {
    constructor() {}

    timeout(seconds?: number) {
      if (typeof seconds !== "undefined") {
        Server.ScriptTimeout = seconds;
      }
      return Server.ScriptTimeout;
    }

    createObject(progID: string) {
      if (typeof progID !== "undefined") {
        try {
          var obj = Server.CreateObject(progID);
          return obj;
        } catch (error) {
          throw error;
        }
      }
      return null;
    }

    execute(path: string) {
      if (typeof path !== "undefined") {
        Server.Execute(path);
      }
    }
    getLastError() {
      let e = Server.GetLastError();

      const result = {};

      if (e.ASPCode()) {
        result["ASPCode"] = "" + e.ASPCode().toString();
      }

      if (e.ASPDescription())
        result["ASPDescription"] = e.ASPDescription().toString();

      if (e.Number()) {
        result["Number"] = e.Number().toString(16);
      }

      if (e.Source()) {
        result["Source"] = e.Source().toString();
      }

      if (e.Category()) result["Category"] = e.Category().toString();

      if (e.Description()) {
        result["Description"] = e.Description().toString();
      }

      if (e.File()) {
        result["File"] = e.File().toString();
      }

      if (e.Line()) {
        result["Line"] = e.Line().toString(0);
      }

      if (e.Column()) {
        result["Column"] = e.Column();
      }
      return result;
    }

    mapPath(path: string) {
      return Server.MapPath(path);
    }

    transfer(path: string) {
      Server.Transfer(path);
    }

    urlEncode(url: string) {
      return Server.URLEncode(url);
    }
  }

  export class ClientRequest implements ClientRequestInterface {
    parser: IUAParser.UAParser;
    constructor() {
      this.parser = <IUAParser.UAParser>new UAParser();
      const UAstring = <string>this.getServerVariables("HTTP_USER_AGENT");
      this.parser.setUA(UAstring);
    }
    body() {
      var a = Request.TotalBytes;
      return Request.BinaryRead(a);
    }
    getCookies(key?: string) {
      const dic = {};

      for (let index = 1; index <= Request.Cookies.Count(); index++) {
        const chave = Request.Cookies.Key(index);
        let element = {};

        // if Request.Cookies(x).HasKeys then
        //  for each y in Request.Cookies(x)
        //    response.write(x & ":" & y & "=" & Request.Cookies(x)(y))
        //    response.write("<br>")
        //  next
        //  else
        //  Response.Write(x & "=" & Request.Cookies(x) & "<br>")
        //  end if
        if (Request.Cookies.Item(chave).Count() > 0) {
          const dicty = {};
          for (
            let indexy = 1;
            indexy <= Request.Cookies.Item(chave).Count();
            indexy++
          ) {
            const chavey = Request.Cookies.Item(chave).Key(indexy);
            const valuey = Request.Cookies.Item(chave).Item(indexy);
            dicty[chavey] = valuey;
          }
          element = dicty;
        } else {
          element = Request.Cookies.Item(chave)();
        }

        dic[chave] = element;
      }

      if (key) {
        return dic[key];
      }
      return dic;
    }

    getForm(key?: string) {
      return this.getSummary(Request.Form());
    }
    getServerVariables(key?: string) {
      var serverVariables = this.getSummary(Request.ServerVariables());

      if (key) {
        return serverVariables[key];
      }
      return serverVariables;
    }
    getQueryString(key?: string) {
      var querystringvalues = this.getSummary(Request.QueryString());

      if (key) {
        return querystringvalues[key];
      }
      return querystringvalues;
    }

    private getSummary(dic: ASP.IVariantDictionary | ASP.IRequestDictionary) {
      let result = {};

      for (let i = 1; i <= dic.Count(); i++) {
        const chave = dic.Key(i);
        if (dic.Item(chave).Count() <= 1) {
          result[chave] = dic.Item(chave)();
        } else {
          const lista = [];

          for (let index = 1; index <= dic.Item(dic.Key(i)).Count(); index++) {
            const element = dic.Item(dic.Key(i))(index);
            lista.push(element);
          }
          result[dic.Key(i)] = lista;
        }
      }
      return result;
    }

    url() {
      return this.getServerVariables("URL");
    }

    method() {
      return this.getServerVariables("REQUEST_METHOD");
    }

    hostname() {
      return this.getServerVariables("HTTP_HOST");
    }

    user() {
      return this.getServerVariables("AUTH_USER");
    }

    ip() {
      return this.getServerVariables("LOCAL_ADDR");
    }

    servername() {
      return this.getServerVariables("SERVER_NAME");
    }

    ua() {
      const UAstring = <string>this.getServerVariables("HTTP_USER_AGENT");
      this.parser.setUA(UAstring);
      return <IUAParser.UAParser>this.parser;
    }
  }

  export class ClientResponse implements ServerResponseInterface {
    constructor() {}

    buffer(buffer: boolean) {
      Response.Buffer = buffer;
    }

    charset(charsetname: string) {
      Response.Charset = charsetname;
    }
    expires(minutes: number) {
      Response.Expires = minutes;
    }

    write(data: string | number | Object) {
      Response.Write(data);
    }
    binaryWrite(value: any) {
      Response.BinaryWrite(value);
    }

    json(value: string | number | Object | Date) {
      try {
        Response.Clear();
        Response.ContentType = "application/json";
        const json = JSON.stringify(value);
        Response.Write(json);
        this.status(200);
        Response.End();
      } catch (error) {
        const msg = {
          msg: "Ocorreu uma falha ao converter o objeto para JSON"
        };
        this.error(500, msg);
      }
    }

    status(code: number, message?: string) {
      // TODO ADICIONAR OUTROS STATUS CODE AQUI
      if (typeof message === "undefined") {
        switch (code) {
          case 200:
            message = "OK";
            break;
          case 204:
            message = "No Content";
            break;
          case 206:
            message = "Partial Content";
            break;

          case 400:
            message = "Bad Request";

          case 401:
            message = "Unauthorized";

          case 403:
            message = "Forbidden";

          case 404:
            message = "Not Found";

          case 405:
            message = "Method Not Allowed";

          case 429:
            message = "Too Many Requests";

          case 500:
            message = "Internal Server Error";

          case 501:
            message = "Not Implemented";
            break;

          case 503:
            message = "Service Unavailable";
            break;

          default:
            message = "";
            break;
        }
      }
      const msg = " ${code} ${message}";
      Response.Status = msg;
    }
    error(code: number, message?: Object | number | Object) {
      Response.Clear();
      this.status(500);
      Response.ContentType = "application/json";
      if (typeof message !== "undefined") {
        const message = { msg: "Ocorreu uma falha interna do servidor" };
      }

      Response.Write(JSON.stringify(message));
      Response.End();
    }
    end(value?: string) {
      if (typeof value !== "undefined") {
        Response.Write(value);
      }
      Response.End();
    }

    setCookie(key: string, value: string, options?: Object) {
      this.error(501);
    }
    setHeader(name: string, value: string) {
      this.error(501);
    }

    sendFile(path: string) {
      this.error(501);
    }
    clear() {
      Response.Clear();
    }
    flush() {
      Response.Flush();
    }
    redirect(url: string) {
      Response.Redirect(url);
    }
  }
}
