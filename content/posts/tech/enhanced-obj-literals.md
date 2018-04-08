+++
date = "2018-04-05T13:59:46+02:00"
tags = ["JavaScript", "es6"]
title = "JS: Cải tiến object literals"
description = "Các object literal được cải tiến của ES6 có thể làm cho việc tạo object dễ dàng hơn bằng cách thêm syntatic sugar"
keywords = "es6, object literals"
image = "/img/enhanced-object-literals.jpg"
draft = false
+++

*Bài viết được dịch từ: [lucybain.com](http://lucybain.com/blog/2015/enhanced-obj-literals/)*

Đây là một vài syntactic sugar để tạo các object literal. Tôi đã thấy nó khó để đọc trong lần đầu tiên và cần một vài ví dụ trước khi có thể hiểu được điều gì đang xảy ra. Nó có thể hữu ích trong nhiều trường hợp, vì thế chúng ta sẽ xây dựng xây dựng một vài ví dụ với độ phức tạp tăng dần để thấy được cái chúng có thể làm.

## Các object literal thông thường
Trong [vanilla](https://en.wikipedia.org/wiki/Vanilla_software) JS chúng ta tạo các object literal như thế này:

```javascript
var a = 1,
    b = 2,
    c = 3;

var obj = {
    a : a,
    b : b,
    c : c
};

console.log(obj); // logs { "a" : 1, "b" : 2, "c" : 3 }
```

*Có gì sai với cách này?*

Nó làm việc, nhưng khá nhiều thứ lặp lại và rườm rà. Bạn phải cung cấp tên của key, ngay cả khi nó cùng tên với biến.

Hãy viết lại với ES6 object literal:

```javascript
let a = 1,
    b = 2,
    c = 3;

let obj = { a, b, c };

console.log(obj); // logs { "a" : 1, "b" : 2, "c" : 3 }
```

*Cái gì đang xảy ra ở đây?*

Đây là điều tôi đã cảm thấy khi lần đầu thấy <code>let obj = { a, b, c };</code>. Đặc biệt <code>{}</code> là một cách khá phổ biến để tạo hashes (Ruby) hay dictionaries (Python). Cú pháp này chắc chắn ngắn gọn hơn vì vậy chúng ta chỉ cần hiểu được sự kỳ diệu này.

*Nhưng code thực sự là gì?*

Nếu bạn đặt đoạn code ES6 phía trên vào [Babel REPL](https://babeljs.io/repl/) nó sẽ biên dịch ra vanilla JS code như thế này:

```javascript
"use strict";

var a = 1,
    b = 2,
    c = 3;

var obj = { a: a, b: b, c: c };

console.log(obj);
```

*Tôi vẫn chưa thuyết phục được bạn - Đâu là ví dụ cho thấy điều này hữu ích?*

Điều gì sẽ xảy ra nếu bạn thay đổi tên biến thành cái gì đó có ý nghĩa hơn, nhưng lại quyên thay đổi object key? Trong vanilla JS chúng có một số thứ như thế này:

```javascript
var firstPlace = 1,
    secondPlace = 2,
    thirdPlace = 3;

var obj = {
    a : firstPlace,
    b : secondPlace,
    c : thirdPlace
};

console.log(obj); // logs { "a" : 1, "b" : 2, "c" : 3 }
console.log(obj.thirdPlace); // undefined
```

Chúng ta đã sử dụng tên biến tốt hơn, nhưng lại quyên điều đó sau khi tạo object. (Tôi chắc chắn bạn là một dev hoàn hảo người sẽ không bao giờ mắc phải lỗi như thế này. Nhưng tôi thì có, và nó cực kỳ phiền phức khi debug).

Đây là  ví dụ trên với sự trợ giúp của ES6:

```javascript
let firstPlace = 1,
    secondPlace = 2,
    thirdPlace = 3;

let obj = { firstPlace, secondPlace, thirdPlace };

console.log(obj); // logs { "firstPlace" : 1, "secondPlace" : 2, "thirdPlace" : 3 }
console.log(obj.thirdPlace); // logs 3
```

Bạn có thể thấy rằng nó dễ dàng hơn một chút để theo dõi mọi thứ với các object literal đã được cải tiến.

*Ok, vậy đó là những thứ cơ bản. Hãy cho tôi thấy những thứ thú vị hơn!*

Chắc chắn rồi!

## Các key động (Dynamic keys)
Cú pháp mới cũng cho phép tạo các key động dễ dàng hơn. Đây là một ví dụ của phiên bản ES6:

```javascript
let a = 1,
    b = 2,
    c = 3;

let obj = {
    [a+1]: a,
    [b+1]: b,
    [c+1]: c
}

console.log(obj); // logs { "2" : 1, "3" : 2, "4" : 3 }
```

*Nhưng bạn cũng có thể tạo các key động với vanilla JS!*

Đúng chúng ta có thể sử dụng dấu <code>[]</code> để giải quyết vấn đề này:

```javascript
var numbers = [1, 2, 3];
var obj = {};

for (var i = 0; i < numbers.length; i++) {
    obj[numbers[i] + 1] = numbers[i];
}

console.log(obj); // logs { "2" : 1, "3" : 2, "4" : 3 }
```

Bây giờ các key và value có thể động, nhưng hãy xem đoạn code này! Cách mới chắc chắn dễ đọc và viết hơn.

*Ừ, trông khá ổn, hãy làm một vài thứ khác!*

## Các phương thức
Có thể dễ dàng để đặt các phương thức trên các đối tượng trong vainilla JS:

```javascript
var obj = {
    hello: function(name) {
        console.log('hello ' + name);
    }
}

obj.hello('world'); // logs "hello world"
```

Nhưng với các object literal đã được cải tiến chúng ta có thể làm cho code gọn gàng hơn một chút:

```javascript
let obj = {
  hello(name) {
    console.log('hello ' + name);
  }
};

obj.hello('world'); // logs "hello world"
```

*Thật điên rồ! Từ khóa function ở đâu rồi?*

Nó không còn cần thiết nữa! ES6 biết <code>hello</code> là một function vì dấu <code>()</code>.

## Tổng kết
Vậy bạn đã có nó! Các object literal được cải tiến của ES6 có thể làm cho việc tạo object dễ dàng hơn bằng cách thêm syntatic sugar. Nhớ rằng, điều này không thay đổi cách các object làm việc nói chung. Tất cả các ví dụ cũng có thể được viết trong vanilla JS, vì thế nó không thêm chức năng mới. Nhưng nó làm cho việc viết JS dễ dàng hơn nhiều!

## Tài nguyên
- [Maximillian Hoffmann](https://maximilianhoffmann.com/posts/object-based-javascript-in-es6)
- [Mozilla](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Object_initializer)
- [Tổng quan tất cả các tính năng của ES6](https://github.com/lukehoban/es6features#enhanced-object-literals)

