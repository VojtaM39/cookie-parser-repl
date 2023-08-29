import { Command } from './command.js';

export class ClearCommand extends Command {
    protected _hasUndo: boolean = false;

    public execute(): void {
        process.stdout.write('\u001B[2J\u001B[0;0f');
        this._callback(null);
    }
    
    public undo(): void {
        throw new Error('Undo not supported');
    }
}
