import { DEFAULT_API } from "../constants.js"

class API{
    constructor({host, port, path}){
        this.uri = `http://${host || DEFAULT_API.host}:${port || DEFAULT_API.port}/${path || DEFAULT_API.path}/`
    }

    async fetch(path, params = null){
        return await fetch(this.uri + path + "?" + Object.entries(params).reduce((result, current) => result + current[0] + "=" + current[1] + "&", "").slice(0, -1))
    }

    async fetchJSON(path, params = null){
        return await (await this.fetchAPI(path, params)).json()
    }
}

export default API