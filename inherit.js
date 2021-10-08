// 组合继承
function Person(nickname, age) {
  this.nickname = nickname;
  this.age = age;
}

Person.nickname = "Person";

function Student(nickname, age) {
  Person.call(this, nickname, age);
}

Student.prototype = Object.create(Person.prototype);
Student.prototype.constructor = Student;

for (let [k, v] of Object.entries(Person)) {
  Student[k] = v;
}

// 圣杯继承
const inherit = (function () {
  function Fn() {}
  return function (Target, Origin) {
    Fn.prototype = Origin.prototype;
    Target.prototype = new Fn();
    Target.prototype.constructor = Target;
    Target.prototype.extends = Origin.prototype;
  };
})();
