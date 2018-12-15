import { TryParseFloat } from "../Helpers/Parsers";

let l1 = 100,
    l2 = 100,
    edit = false;

export function setMode() {
    edit = !edit;
}
export function getMode() {
    return edit;
}
export function setL1(_l1) {
    l1 = TryParseFloat(_l1, l1);
}
export function setL2(_l2) {
    l2 = TryParseFloat(_l2, l2);
}
export function getL1() {
    return l1;
}
export function getL2() {
    return l2;
}