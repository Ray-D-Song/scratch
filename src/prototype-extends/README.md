# 使用原型链实现继承
这也是我非常喜欢的一道题，让人想起一个非常古老的前端框架，(prototype.js)[http://prototypejs.org/]。  
prototype.js 使用原型链实现了一套非常 OOP 的接口：

```js
var Person = Class.create();
Person.prototype = {
  initialize: function(name) {
    this.name = name;
  },
  say: function(message) {
    return this.name + ': ' + message;
  }
};
    
var guy = new Person('Miro');
guy.say('hi');
// -> "Miro: hi"
    
var Pirate = Class.create();
// 使用 Object.extend 方法继承 Person 类
Pirate.prototype = Object.extend(new Person(), {
  // 重写 speak 方法
  say: function(message) {
    return this.name + ': ' + message + ', yarr!';
  }
});
    
var john = new Pirate('Long John');
john.say('ahoy matey');
// -> "Long John: ahoy matey, yarr!"
```