function Pet(name, age) {
  this.name = name;
  this.age = age;
}
Pet.prototype.getAge = function () {
  return this.age;
};
Pet.prototype.getName = function () {
  return this.name;
};
function Dog(name, age, sound) {
  Pet.call(this, name, age);
  this.sound = sound;
}
function Snake(name, age, len) {
  Pet.call(this, name, age);
  this.len = len;
}
function inherite(Parent, Child) {
  Child.prototype = Object.create(Parent.prototype);
  Child.prototype.constructor = Child; // 여기를 주석하면 Dog는 짖지 못함.
}
inherite(Pet, Dog);
inherite(Pet, Snake);
Dog.prototype.hello = function () {
  return this.sound;
};
Snake.prototype.getLength = function () {
  return this.len;
};

const pet1 = new Pet("choco", 3);
const pet2 = new Dog("rora", 5, "mung mung");
const pet3 = new Snake("kyakya", 8, 28);
if (pet2.constructor === Dog) {
  console.log(pet2.hello());
} else {
  console.log("개가 아닙니다.");
}
if (pet3.constructor === Snake) {
  console.log("길이가", pet3.getLength(), "입니다.");
} else {
  console.log("뱀이 아닙니다.");
}
