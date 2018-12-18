import { TryParseFloat } from "../Helpers/Parsers";
import { Draw } from "../canvas/Draw";

let l1 = 100,
    l2 = 100,
    edit = false,
    select1 = true,
    select2 = true;

export function setMode() {
    edit = !edit;
}
export function getMode() {
    return edit;
}
export function setSelect1() {
    select1 = !select1;
    Draw();
}
export function setSelect2() {
    select2 = !select2;
    Draw();
}
export function getSelect1() {
    return select1;
}
export function getSelect2() {
    return select2;
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