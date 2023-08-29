import { Command } from './command.js';
import { KVPair } from '../types.js';

export class KeepCommand extends Command {
    protected _hasUndo: boolean = true;
    private _removedCookies: KVPair[] = [];

    public execute(): void {
        if (this._args.length < 1) {
            this._callback(null, 'Invalid keep command');
            return;
        }

        const toRemoveKeys = this._cookieParser.getAllKeys().filter((key) => !this._args.includes(key));
        this._removedCookies = toRemoveKeys
            .map((key: string) => ({
                key,
                value: this._cookieParser.getCookieValue(key)!,
            }));

        toRemoveKeys.forEach((key: string) => this._cookieParser.removeCookie(key));
        this._callback(null, `Cookie${this._args.length > 1 ? 's' : ''} removed`);
    }
    
    public undo(): void {
        this._removedCookies.forEach(({ key, value }) => this._cookieParser.setCookie(key, value));
    }
}
