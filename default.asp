<%@  language="VBScript" codepage="65001" %>
<% Response.ContentType = "text/html; charset=utf-8" %>

<!--#include file="aspts/lib/vb-functions.asp"-->
<!--#include file="env.asp"-->

<script language="Jscript" runat="server" src="aspts/lib/polyfills.js"></script> 
<script language="Jscript" runat="server" src="aspts/lib/json2.js"></script>
<script language="Jscript" runat="server" src="aspts/lib/ua-parser.js"></script>

<script language="Jscript" runat="server" src="aspts/ts/lASPTS.js"></script>
<script language="Jscript" runat="server" src="aspts/ts/SQLServerAdapter.js"></script>

<script language="Jscript" runat="server" src="ts/controllers/testSqlController.js"></script>

<script language="Jscript" runat="server" src="ts/routes/Router.js"></script>
<script language="Jscript" runat="server" src="ts/controllers/mainController.js"></script>
<script language="Jscript" runat="server" src="ts/main.js"></script>

<% main %>