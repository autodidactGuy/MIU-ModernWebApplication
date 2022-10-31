require ("./instantHello");

let talk=require ("./talk");

const question=require ("./talk/question");

talk.greeting("John");
talk.intro();

const answer=question.ask("What is the meaning of life?");

console.log(answer);