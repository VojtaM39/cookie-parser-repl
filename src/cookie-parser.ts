import { Context } from 'vm';

export class CookieParser {
    private _cookieMap: Record<string, string>;

    constructor(initialCookieString: string, context: Context) {
        this._cookieMap = this._parseStringCookie(initialCookieString);

        context.set = this.setCookie.bind(this);
        context.remove = this.removeCookie.bind(this);
    }

    public getCookieString(): string {
        return Object.entries(this._cookieMap).map(([key, value]) => `${key}=${value}`).join('; ');
    }

    public setCookie(key: string, value: string): void {
        this._cookieMap[key] = value;
    }

    public removeCookie(key: string): void {
        delete this._cookieMap[key];
    }

    public getAllKeys(): string[] {
        return Object.keys(this._cookieMap);
    }

    public getState(): Record<string, string> {
        return this._cookieMap;
    }

    private _parseStringCookie (cookieString: string): Record<string, string> { 
        const cookieMap: Record<string, string> = {};

        cookieString.split(';').forEach((cookie) => {
            const [key, value] = cookie.split('=');
            if (key && value) cookieMap[key.trim()] = value.trim();
        });

        return cookieMap;
    }
};
