
    interface ASPAdapterInterface{
        res: ServerResponseInterface
        req: ClientRequestInterface        
        sess: ASPSessionInterface
        appvar: ASPApplicationInterface
        serv : ServerInterface
        listaTudo() : Object
    }
    interface ServerInterface{
        timeout(seconds?: number): number
        createObject(progID: string): any
        execute(path: string)
        getLastError(): Object
        mapPath(path : string): string
        transfer(path: string)
        urlEncode(url: string): string
    }

    interface ASPSessionInterface{
        get(key?: string): any 
        set(key: string, value: any)
        sessionID(): string
        timeout(minutes?: number) : number        
        LCID(code)
        Abandon()
        remove(key: string)
        removeAll()
    }

    interface ASPApplicationInterface{
        get(key?: string): any 
        set(key: string, value: any)        
        Lock()        
        Unlock()
        remove(key: string)
        removeAll()
    }

   
    interface ClientRequestInterface{
        getCookies(key?: string): Array<Object> | Object | string
        getForm(key?: string): Array<Object> | Object | string
        getServerVariables(key?: string): Array<Object> | Object | string
        getQueryString(key?: string): Array<Object> | Object | string
        url(): string
        method(): string
        hostname(): string
        user(): string
        ip(): string
        ua(): IUAParser.UAParser

    }

    interface ServerResponseInterface{
        buffer(buffer:Boolean)
        charset(charsetname : string)
        expires(minutes:number)
        write(data: string | number | Object)
        binaryWrite(value: any)
        json(value: string | number | Object | Date)
        status(code: number, message?: string)
        error(code: number, message?: string | number | Object)
        end(value?: string )
        setCookie(key: string, value: string, options?:Object)
        setHeader(name:string, value: string)
        sendFile(path: string)
        clear()
        flush()
        redirect(url: string)
    }





