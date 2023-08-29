import { Command } from './command.js';

export class KeysCommand extends Command {
    protected _hasUndo: boolean = false;

    public execute(): void {
        const keys = this._cookieParser.getAllKeys();
        this._callback(null, keys);
    }
    
    public undo(): void {
        throw new Error('Undo not supported');
    }
}
