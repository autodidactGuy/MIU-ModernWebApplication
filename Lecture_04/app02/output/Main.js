import { DE_Student } from "./DE_Student.js";
let jack1 = new DE_Student(123, "jack", 3.0);
console.log(jack1.id);
console.log(jack1.gpa);
console.log(jack1.getName());
console.log(jack1['course']);
console.log("can you program?", jack1["canProgram"]);
if (jack1["canProgram"]) {
    jack1["program"]();
}
else {
    console.log(jack1.getName(), "don't worry you will learn after this course.");
}
