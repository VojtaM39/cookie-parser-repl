import { Command } from './command.js';

export class ValueCommand extends Command {
    protected _hasUndo: boolean = true;

    public execute(): void {
        if (this._args.length !== 1) {
            this._callback(null, 'Invalid value command');
            return;
        }

        const key = this._args[0];
        this._callback(null, this._cookieParser.getCookieValue(key));
    }

    public undo(): void {
        throw new Error('Undo not supported');
    }
}
