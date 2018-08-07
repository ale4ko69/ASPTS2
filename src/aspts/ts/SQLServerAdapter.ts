
/// <reference path="../tstypes/activex-adodb/index.d.ts" />

/// <reference path="lASPTS.ts" />
namespace ASPTS.SQL {
    import ASPAdapter = ASPTS.ASPAdapter;
   

    export class SqlServerAdapter {
        private connectionString: string
        protected app: ASPAdapter
        constructor(connectionString: string, app: ASPAdapter){
            this.connectionString = connectionString
            this.app = app


        }
        // TODO Adicionar paginação aqui    
        query(sql : string ) {
            const conn = this.getConn();
            const rs = this.Execute(sql, conn);
            const campos = []

            for (let index = 0; index < rs.Fields.Count; index++) {
                const element = rs.Fields(index).Name;               
                campos.push(element)      
              }  

              const linhas = [];
    

              while (!rs.EOF) {
                let linha = {};
                for (let index = 0; index < campos.length; index++) {
                  const element=campos[index]
                  // TODO TRATAR OS TIPOS - em especial datas
                  linha[element]=rs(element).Value        
                  //linha[element] = rs(element).Type.toString()
                }  
                linhas.push(linha)
                rs.MoveNext;
              }
              rs.Close();
              conn.Close();
              return {'rows': linhas, 'keys': campos};
        }

    
        protected Execute(query: string, conn: ADODB.Connection): ADODB.Recordset {
            try {
                const rs = <ADODB.Recordset>Server.CreateObject("ADODB.recordset");
                rs.Open(query, conn);
                return rs;    
            } catch (error) {
                this.app.res.error(500,{error: "Falha ao executar query", query: query, details: error})
            }            
        }

        protected getConn(): ADODB.Connection {
            try {
                const conn = <ADODB.Connection> Server.CreateObject("ADODB.Connection");    
                conn.Open(this.connectionString);
                return conn;  
              } catch (error) {
                this.app.res.error(500,{erro:"Erro ao conectar ao banco de dados", connectionstring: this.connectionString})                
              }
            return null

        }
    } 
}
