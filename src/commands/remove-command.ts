import { Command } from './command.js';

interface KVPair {
    key: string;
    value: string;
}
export class RemoveCommand extends Command {
    protected _hasUndo: boolean = true;
    private _removedCookies: KVPair[] = [];

    public execute(): void {
        if (this._args.length < 1) {
            this._callback(null, 'Invalid remove command');
            return;
        }

        this._removedCookies = this._args
            .map((key: string) => ({ 
                key, 
                value: this._cookieParser.getCookieValue(key),
            }))
            .filter((kvPair): kvPair is KVPair => !!kvPair.value);

        this._args.forEach((key: string) => this._cookieParser.removeCookie(key));
        this._callback(null, `Cookie${this._args.length > 1 ? 's' : ''} removed`);
    }
    
    public undo(): void {
        this._removedCookies.forEach(({ key, value }) => this._cookieParser.setCookie(key, value));
    }
}
