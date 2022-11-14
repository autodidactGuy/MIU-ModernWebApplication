class Student1{
    #name: string;
    private _gpa!:number;
    get gpa():number{
        return this._gpa
    }
    set gpa(gpa:number){
        this._gpa=gpa;
    }
    get name():string{
        return this.#name;
    }
    constructor(name:string,gpa:number){
        this.#name=name;
        this.gpa=gpa;
    }
}

enum DAYS {
    MONDAY,
    TUESDAY,
    WEDNESDAY,
    THURSDAY,
    FRIDAY,
    SATURDAY,
    SUNDAY
}

let jack:Student1 = new Student1("Jack",4.0);
console.log("Student is",jack.name,"has gpa",jack.gpa);

let day:DAYS=DAYS.THURSDAY;
console.log(DAYS[day]);