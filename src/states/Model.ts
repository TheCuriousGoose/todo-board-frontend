export abstract class Model {

    private baseURL: string;

    constructor(baseURL: string) {
        this.baseURL = baseURL;

        if (this.baseURL.endsWith('/')) {
            this.baseURL = this.baseURL.slice(0, -1);
        }
    }

    public async request(method: 'POST' | 'GET' | 'PUT' | 'DESTROY' = 'GET', endpoint: string, body?: any): Promise<any> {
        const url = `${this.baseURL}/${endpoint}`

        const response = await fetch(url, {
            method: method,
            body: body
        });

        if (!response.ok) {
            throw new Error('Something went wrong while executing the request');
        }

        return await response.json();
    }
}