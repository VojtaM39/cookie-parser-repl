import { CompleterResult } from 'readline';
// @ts-ignore
import { parse } from 'shell-quote';
import { CookieParser } from './cookie-parser.js';
import { COMMAND_TYPE } from './constants.js';
import { Command } from './commands/command.js';

export const completer = (line: string, cookieParser: CookieParser): CompleterResult => {
    const splitLine = line.split(' ');

    // Autocomplete for command name
    if (splitLine.length === 1) {
        return [getAutocompleteFromValues(line, Object.values(COMMAND_TYPE)), line];
    }

    // For set command only second word can be a key
    const isWritingSetCookieKey = splitLine[0] === COMMAND_TYPE.SET && splitLine.length === 2;
    // For remove command we can define a list of keys to remove
    const isWritingRemoveCookieKey = splitLine[0] === COMMAND_TYPE.REMOVE && splitLine.length >= 2;

    if (isWritingSetCookieKey || isWritingRemoveCookieKey) {
        const currentWord = splitLine[splitLine.length - 1];
        return [getAutocompleteFromValues(currentWord, cookieParser.getAllKeys()), currentWord];
    }

    return [[], line];
}

const getAutocompleteFromValues = (current: string, values: string[]): string[] => {
    return values.filter((value) => value.startsWith(current));
};
