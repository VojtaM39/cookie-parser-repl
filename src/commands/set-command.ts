import { Command } from './command.js';

export class SetCommand extends Command {
    protected _hasUndo: boolean = true;
    private _key: string | undefined = undefined;
    private _value: string | undefined = undefined;

    public execute(): void {
        if (this._args.length < 2) {
            this._callback(null, 'Not enough arguments');
            return;
        }

        this._key = this._args[0];
        this._value = this._cookieParser.getCookieValue(this._key);

        this._cookieParser.setCookie(this._args[0], this._args[1]);
        this._callback(null, 'Cookie set');
    }
    
    public undo(): void {
        if (this._value) {
            this._cookieParser.setCookie(this._key!, this._value);
        } else {
            this._cookieParser.removeCookie(this._key!);
        }
    }
}
