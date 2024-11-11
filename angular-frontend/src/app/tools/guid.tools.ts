import { insert } from "./string.tools"

export function guid() {
    const string = new Date().getTime().toString(16) + Math.random().toString(16).substring(2)
    return insert(string, '-', 8, 12)
}