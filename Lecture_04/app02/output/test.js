var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _Student1_name;
class Student1 {
    constructor(name, gpa) {
        _Student1_name.set(this, void 0);
        __classPrivateFieldSet(this, _Student1_name, name, "f");
        this.gpa = gpa;
    }
    get gpa() {
        return this._gpa;
    }
    set gpa(gpa) {
        this._gpa = gpa;
    }
    get name() {
        return __classPrivateFieldGet(this, _Student1_name, "f");
    }
}
_Student1_name = new WeakMap();
var DAYS;
(function (DAYS) {
    DAYS[DAYS["MONDAY"] = 0] = "MONDAY";
    DAYS[DAYS["TUESDAY"] = 1] = "TUESDAY";
    DAYS[DAYS["WEDNESDAY"] = 2] = "WEDNESDAY";
    DAYS[DAYS["THURSDAY"] = 3] = "THURSDAY";
    DAYS[DAYS["FRIDAY"] = 4] = "FRIDAY";
    DAYS[DAYS["SATURDAY"] = 5] = "SATURDAY";
    DAYS[DAYS["SUNDAY"] = 6] = "SUNDAY";
})(DAYS || (DAYS = {}));
let jack = new Student1("Jack", 4.0);
console.log("Student is", jack.name, "has gpa", jack.gpa);
let day = DAYS.THURSDAY;
console.log(DAYS[day]);
