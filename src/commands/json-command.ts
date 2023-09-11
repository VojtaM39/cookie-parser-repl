import clipboard from 'clipboardy';
import { Command } from './command.js';

export class JsonCommand extends Command {
    protected _hasUndo: boolean = false;

    public execute(): void {
        const cookieMap = this._cookieParser.getState();
        const cookieObject = Object.entries(cookieMap).map(([name, value]) => ({ name, value }));

        clipboard.writeSync(JSON.stringify(cookieObject));
        this._callback(null, 'JSON copied to clipboard');
    }

    public undo(): void {
        throw new Error('Undo not supported');
    }
}

