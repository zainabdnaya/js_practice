// class Dog {
//     name: string;
//     constructor(data: string) {
//         this.name = data;
//     }
// }
// let dog = new Dog('Rover')
// if (dog instanceof Dog) {
//     console.log(`${dog.name} is a dog`)
// }

let str: any = 'This is a String'
let strLength = (str as string).length
console.log(strLength);