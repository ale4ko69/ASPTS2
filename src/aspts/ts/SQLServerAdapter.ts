
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
        
        query(sql : string, pageSize?: number, page?: number  ) {
            const conn = this.getConn();
            const rs = this.Execute(sql, conn);
            const campos = []
            try {
                let paginacao = false;
                if (pageSize !== undefined && pageSize>0) {
                    rs.PageSize = pageSize;
                    if (page !== undefined && page<=rs.PageCount && page>0) {
                        rs.AbsolutePage= page
                    }  else {
                        rs.AbsolutePage= 1
                        page = 1
                    }
                    paginacao = true
                }
                
                for (let index = 0; index < rs.Fields.Count; index++) {
                    const element = rs.Fields(index).Name;               
                    campos.push(element)      
                  }  
    
                  const linhas = [];
                  
                  let registros = 0
                  while (!rs.EOF && ((paginacao == true && registros < pageSize) || paginacao==false)) {
                    let linha = {};
                    for (let index = 0; index < campos.length; index++) {
                      const element=campos[index]
                      // TODO TRATAR OS TIPOS - em especial datas
                      linha[element]=rs(element).Value        
                      //linha[element] = rs(element).Type.toString()
                    }  
                    linhas.push(linha)
                    registros+=1    
                    rs.MoveNext;
                  }
                  
                  
                  let controla: any =  { 'paginacao': paginacao, 'registros_listados': registros, 'registros_total': rs.RecordCount}
                  if (paginacao) {
                    controla =  { 'paginacao': paginacao,'registros_listados': registros, 'registros_total': rs.RecordCount,
                     'pagina_atual': page , 'total_paginas': rs.PageCount, 'qtd_por_pagina': rs.PageSize}
                  } 
                
                  rs.Close();
                  conn.Close();
                
                  return {'rows': linhas, 'keys': campos, 'pages':  controla};
            } catch (error) {
                this.app.res.error(500,{error: "Falha ao recuperar registros do banco", 
                query: sql, pageSize: pageSize, page: page, details: error})
            }    
           
        }

    
        protected Execute(query: string, conn: ADODB.Connection): ADODB.Recordset {
            try {
                const rs = <ADODB.Recordset>Server.CreateObject("ADODB.recordset");
                rs.CursorLocation=3
                rs.CursorType=3
                rs.Open(query, conn );
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
                this.app.res.error(500,{erro:"Erro ao conectar ao banco de dados", connectionstring: this.connectionString, details: error})                
              }
            return null

        }
    } 
}
