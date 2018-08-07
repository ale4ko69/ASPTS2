
<script language="Jscript" runat="server"> 
    //-------- CONSTANTES DE DESENVOLVIMENTO / PADRÕES ----------- //
    var env = {}
    env.production=false
    env.connectionstring="Provider=sqloledb;user id=USER;password=SENHA;Initial Catalog=BANCO;data source=SERVIDOR;"
    
    //var ConnectionString="";
    // disable production mode for testing 
       env.testing=false   
    
    if(!(Request.ServerVariables("SERVER_NAME")=="localhost" || env.testing)) {
        //-------- CONSTANTES DE PRODUÇÃO ----------- //
        env.production=true
        env.connectionstring="Provider=sqloledb;user id=USER;password=SENHA;Initial Catalog=BANCO;data source=SERVIDOR;"
    
    }     
    Session("Teste")= "Teste de sessao"
    Application("TesteApp")="Application"
   
    // teste de cookies
    Response.Cookies("user")("firstname")="John"
    Response.Cookies("user")("lastname")="Smith"
    Response.Cookies("user")("country")="Norway"
    Response.Cookies("user")("age")="25"
</script>