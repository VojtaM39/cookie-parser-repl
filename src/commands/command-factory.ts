import { COMMAND_TYPE } from '../constants.js';
import { CookieParser } from '../cookie-parser.js';
import { ClearCommand } from './clear-command.js';
import { Command } from './command.js';
import { CopyCommand } from './copy-command.js';
import { GetCommand } from './get-command.js';
import { JsonCommand } from './json-command.js';
import { KeepCommand } from './keep-command.js';
import { KeysCommand } from './keys-command.js';
import { LogCommand } from './log-command.js';
import { RemoveCommand } from './remove-command.js';
import { SetCommand,  } from './set-command.js';
import { UndoCommand } from './undo-command.js';
import { ValueCommand } from './value-comand.js';

export class CommandFactory {
    private static readonly COMMAND_MAPPING = {
        [COMMAND_TYPE.SET]: SetCommand,
        [COMMAND_TYPE.GET]: GetCommand,
        [COMMAND_TYPE.REMOVE]: RemoveCommand,
        [COMMAND_TYPE.UNDO]: UndoCommand,
        [COMMAND_TYPE.CLEAR]: ClearCommand,
        [COMMAND_TYPE.COPY]: CopyCommand,
        [COMMAND_TYPE.LOG]: LogCommand,
        [COMMAND_TYPE.KEEP]: KeepCommand,
        [COMMAND_TYPE.KEYS]: KeysCommand,
        [COMMAND_TYPE.JSON]: JsonCommand,
        [COMMAND_TYPE.VALUE]: ValueCommand
    }

    public static getCommand(
        callback: Function,
        cookieParser: CookieParser,
        args: string[],
        commandStack: Command[],
    ): Command | null {
        const commandName = args[0];
        const commandClass = this.COMMAND_MAPPING[commandName] ?? null;
        if (!commandClass) return null;

        return new commandClass(callback, cookieParser, args.slice(1), commandStack);
    }

}
