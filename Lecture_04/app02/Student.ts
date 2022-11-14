export class Student{
    id: number;
    private name:string;
    #gpa: number;
    set gpa(gpa){this.#gpa=gpa;}
    get gpa():number { return this.#gpa;}
    getName(): string {return this.name; }
    constructor(id:number,name:string,gpa:number){
        this.gpa=gpa;
        this.id=id;
        this.name=name;
    }
}