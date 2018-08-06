# ASPTS2 - Exemplo de API JSON - Typescript em Classic ASP
Este projeto é um exemplo de como utilizar Typescript para criar API's JSON em um ambiente antigo onde só está disponível um servidor IIS com ASP Classíc.
A idéia é possibilitar o uso dos frameworks de front-end mais recentes como Angular ou React nestes ambientes.

# Instalação 
* npm install -g typescript
* npm install copyfiles -g

# Compilar 
* npm run build


# Executar

Iniciar IIS Express na pasta **dist** gerada no processo de build

test.asp

ou
endereco/default.asp?c={{Controller}}a={{Action}}

exemplo: http://localhost:11117/default.asp?c=testsql&a=devhelp

# Deploy
| Apenas copiar a pasta dist para o servidor destino
| CUIDADO os arquivos estão em extensão .js. Podem ser baixados pelo cliente. 

## 
## Rotas Disponíveis  - Exemplos úteis para desenvolvimento e testes

  
    
### Referencias
* http://gago.io/blog/typescript-classicasp-why-not/
* https://github.com/bysanches/ASPTypeScriptSample
