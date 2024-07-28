export abstract class Model {

    private baseURL: string;

    constructor(baseURL: string) {
        this.baseURL = baseURL;

        if (this.baseURL.endsWith('/')) {
            this.baseURL = this.baseURL.slice(0, -1);
        }
    }

    public async request(method: 'POST' | 'GET' | 'PUT' | 'DELETE' = 'GET', endpoint: string, body?: any): Promise<any> {
        const url = `${this.baseURL}/${endpoint}`

        const response = await fetch(url, {
            method: method,
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        });

        if (!response.ok) {
            return await response.json();
        }

        return await response.json();
    }
}