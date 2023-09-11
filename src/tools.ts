import { CompleterResult } from 'readline';
// @ts-ignore
import { parse } from 'shell-quote';
import { CookieParser } from './cookie-parser.js';
import { COMMAND_TYPE } from './constants.js';

export const completer = (line: string, cookieParser: CookieParser): CompleterResult => {
    const splitLine = line.split(' ');

    // Autocomplete for command name
    if (splitLine.length === 1) {
        return [getAutocompleteFromValues(line, Object.values(COMMAND_TYPE)), line];
    }

    // For set command only second word can be a key
    const isWritingSingleCookieKey = [COMMAND_TYPE.SET, COMMAND_TYPE.VALUE].includes(splitLine[0]) && splitLine.length == 2;
    // For remove command we can define a list of keys to remove
    const isWritingRemoveCookieKey = [COMMAND_TYPE.REMOVE, COMMAND_TYPE.KEEP].includes(splitLine[0]) && splitLine.length >= 2;

    if (isWritingSingleCookieKey || isWritingRemoveCookieKey) {
        const currentWord = splitLine[splitLine.length - 1];
        return [getAutocompleteFromValues(currentWord, cookieParser.getAllKeys()), currentWord];
    }

    return [[], line];
}

const getAutocompleteFromValues = (current: string, values: string[]): string[] => {
    return values.filter((value) => value.startsWith(current));
};
