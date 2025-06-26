/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-expressions */
// 考察this指向的面试题

// 间接调用
const name = "window";
let person = {
  name: "person",
  sayName: function () {
    console.log(this.name);
  }
};
function sayName() {
  const sss = person.sayName;
  sss();
  person.sayName();
  (person.sayName)();
  (b = person.sayName)();
}
sayName();


// 定义对象时不产生作用域
// 在对象里定义的箭头函数，不会在对象里查找
// 在对象里定义的函数包括闭包函数，this指向调用方
// 在对象里定义的函数包裹的箭头函数，箭头函数里的this会在上一层函数里
const name = 'window'
const person1 = {
  name: 'person1',
  foo1: function () {
    console.log(this.name)
  },
  foo2: () => console.log(this.name),
  foo3: function () {
    return function () {
      console.log(this.name)
    }
  },
  foo4: function () {
    return () => {
      console.log(this.name)
    }
  }
}
const person2 = { name: 'person2' }

person1.foo1();
person1.foo1.call(person2);

person1.foo2();
person1.foo2.call(person2);

person1.foo3()();
person1.foo3.call(person2)();
person1.foo3().call(person2);

person1.foo4()();
person1.foo4.call(person2)();
person1.foo4().call(person2);



// 在构造函数中定义函数，该函数的上级作用域为构造函数
// 函数里面定义箭头函数，会有在构造函数中找this的值
// 函数返回闭包函数的情况，里面的闭包函数有自己的this，看调用方是谁
// 返回返回箭头函数的情况，箭头函数里面的值为上层作用域的this
const name = 'window'
function Person(name) {
  this.name = name
  this.foo1 = function () {
    console.log(this.name)
  },
    this.foo2 = () => console.log(this.name),
    this.foo3 = function () {
      return function () {
        console.log(this.name)
      }
    },
    this.foo4 = function () {
      return () => {
        console.log(this.name)
      }
    }
}
const person1 = new Person('person1')
const person2 = new Person('person2')

person1.foo1()
person1.foo1.call(person2)

person1.foo2()
person1.foo2.call(person2)

person1.foo3()()
person1.foo3.call(person2)()
person1.foo3().call(person2)

person1.foo4()()
person1.foo4.call(person2)()
person1.foo4().call(person2)


// 注意作用域
const name = 'window'
function Person(name) {
  this.name = name
  this.obj = {
    name: 'obj',
    foo1: function () {
      return function () {
        console.log(this.name)
      }
    },
    foo2: function () {
      return () => {
        console.log(this.name)
      }
    }
  }
}
const person1 = new Person('person1')
const person2 = new Person('person2')

person1.obj.foo1()()
person1.obj.foo1.call(person2)()
person1.obj.foo1().call(person2)
person1.obj.foo2()()
person1.obj.foo2.call(person2)()
person1.obj.foo2().call(person2)