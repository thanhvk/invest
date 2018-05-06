+++
date = "2018-05-05T13:59:46+02:00"
tags = ["es6", "javascript"]
title = "Các mẹo và thủ thuật hữu ích với ECMAScript 2015 (ES6)"
description = "ES6 đã ra mắt được một vài năm, và nhiều tính năng mới có thể được sử dụng theo những cách thông minh hơn"
keywords = "es6, ECMAScript 2015, javascript"
image = "/img/es6-tips-tricks.jpg"
draft = false
+++

*Bài viết được dịch từ: [medium.freecodecamp.org](https://medium.freecodecamp.org/check-out-these-useful-ecmascript-2015-es6-tips-and-tricks-6db105590377)*

![](https://cdn-images-1.medium.com/max/800/1*W5vbBi1Nah40KGMRIE1GJw.jpeg)
<figcaption>Ảnh của [Glenn Carstens-Peters](https://unsplash.com/photos/npxXWgQ33ZQ?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText) trên [Unsplash](https://unsplash.com/search/photos/computer?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText)</figcaption>

{{% tocsection %}}

<!-- TOC orderedList:false -->

- [1. Bắt buộc phải truyền các tham số](#1-bắt-buộc-phải-truyền-các-tham-số)
- [2. Phương thức "reduce"](#2-phương-thức-reduce)
    - [2.1 Sử dụng reduce để thực hiện "đồng thời" cả map và filter](#21-sử-dụng-reduce-để-thực-hiện-đồng-thời-cả-map-và-filter)
    - [2.2 Sử dụng reduce thay thế cho map hoặc filter](#22-sử-dụng-reduce-thay-thế-cho-map-hoặc-filter)
    - [2.3 Sử dụng reduce để kiểm tra sự cân bằng của các dấu ngoặc tròn](#23-sử-dụng-reduce-để-kiểm-tra-sự-cân-bằng-của-các-dấu-ngoặc-tròn)
    - [2.4 Đếm các phần tử lặp lại trong mảng (chuyển mảng -> đối tượng)](#24-đếm-các-phần-tử-lặp-lại-trong-mảng-chuyển-mảng---đối-tượng)
- [3. Object destructuring](#3-object-destructuring)
    - [3.1 Loại bỏ những thuộc tính không mong muốn](#31-loại-bỏ-những-thuộc-tính-không-mong-muốn)
    - [3.2 Destructure các đối tượng lồng nhau trong các tham số của hàm](#32-destructure-các-đối-tượng-lồng-nhau-trong-các-tham-số-của-hàm)
    - [3.3 Merge các đối tượng](#33-merge-các-đối-tượng)
- [4. Sets](#4-sets)
    - [4.1 Loại bỏ các phần tử giống nhau trong mảng với Sets](#41-loại-bỏ-các-phần-tử-giống-nhau-trong-mảng-với-sets)
    - [4.2 Sử dụng các phương thức của mảng](#42-sử-dụng-các-phương-thức-của-mảng)
- [5. Array destructuring](#5-array-destructuring)
    - [5.1 Đảo giá trị](#51-đảo-giá-trị)
    - [5.2 Nhận và gán nhiều giá trị từ một hàm](#52-nhận-và-gán-nhiều-giá-trị-từ-một-hàm)

<!-- /TOC -->

{{% /tocsection %}}

EcmaScript 2015 (hay còn gọi là ES6) đã ra mắt được một vài năm, và nhiều tính năng mới có thể được sử dụng theo những cách thông minh hơn. Tôi muốn liệt kê và thảo luận một vài trong số chúng, và hi vọng bạn sẽ thấy chúng hữu ích.

## 1. Bắt buộc phải truyền các tham số
ES6 cung cấp tính năng [default parameter](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Default_parameters) cho phép bạn thiết lập giá trị mặc định để sử dụng nếu hàm được gọi mà không có tham số.

Trong ví dụ dưới đây, chúng ta thiết lập hàm <code>required()</code> như giá trị mặc định cho cả 2 tham số <code>a</code> và <code>b</code>. Điều này có nghĩa là nếu <code>a</code> hoặc <code>b</code> không được truyền, hàm <code>required()</code> sẽ được gọi và bạn sẽ nhận được một lỗi.

![](https://cdn-images-1.medium.com/max/800/1*GDQLCTD24t-cWsFAKYKTZA.png)

```javascript
const required = () => {throw new Error('Missing parameter')};

//The below function will trow an error if either "a" or "b" is missing.
const add = (a = required(), b = required()) => a + b;

add(1, 2) //3
add(1) // Error: Missing parameter.
```

## 2. Phương thức "reduce"
Phương thức reduce của mảng cực kỳ linh hoạt. Nó thường được sử dụng để chuyển một mảng các phần tử thành một giá trị duy nhất. **Nhưng bạn có thể làm nhiều hơn với nó.**

### 2.1 Sử dụng reduce để thực hiện "đồng thời" cả map và filter
Giả sử bạn có một danh sách các phần tử, và muốn cập nhật mỗi phần tử (sử dụng [map](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map)), sau đó lọc ra chỉ một vài phần tử (sử dụng [filter](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter)). Nhưng như vậy có nghĩa là bạn sẽ lặp qua danh sách 2 lần!

Trong ví dụ dưới đây, chúng ta muốn gấp đôi giá trị của mỗi phần tử trong mảng và chọn ra chỉ những phần tử lớn hơn 50. Chú ý, cách chúng ta có thể sử dụng phương thức reduce để gấp đôi giá trị (map) và sau đó lọc các phần tử lớn hơn 50 (filter). Nó khá hiệu quả.

![](https://cdn-images-1.medium.com/max/800/1*DKa24KZTYwjQQottonDfQw.png)

```javascript
const numbers = [10, 20, 30, 40];

const doubledOver50 = numbers.reduce((finalList, num) => {
  
  num = num * 2; //double each number (i.e. map)
  
  //filter number > 50
  if (num > 50) {
    finalList.push(num);
  }
  return finalList;
}, []);

doubledOver50; // [60, 80]
```

### 2.2 Sử dụng reduce thay thế cho map hoặc filter
Nếu bạn xem ví dụ trên cẩn thận, bạn sẽ thấy rằng reduce có thể được sử dụng để thay thế cho filter hay map!

### 2.3 Sử dụng reduce để kiểm tra sự cân bằng của các dấu ngoặc tròn
Đây là một ví dụ về tính linh hoạt của phương thức reduce. Cung cấp một chuỗi với các dấu ngoặc tròn, chúng ta muốn biết chúng có cân bằng hay không? cụ thể là số ngoặc mở "(" và đóng ")" phải bằng nhau, và theo đúng thứ tự "(" đứng trước ")".

Chúng ta có thể dễ dàng làm điều đó với reduce như dưới đây. Khởi tạo biến <code>counter</code> với giá trị <code>0</code>. Tăng 1 mỗi khi bắt gặp <code>(</code> và giảm 1 mỗi khi gặp <code>)</code>. Nếu chúng cân bằng, thì counter sẽ kết thúc là <code>0</code>.

![](https://cdn-images-1.medium.com/max/800/1*baf58ASRZH9UPGIaBagVCA.png)

```javascript
//Returns 0 if balanced.
const isParensBalanced = (str) => {
  return str.split('').reduce((counter, char) => {
    if(counter < 0) { //matched ")" before "("
      return counter;
    } else if(char === '(') {
      return ++counter;
    } else if(char === ')') {
      return --counter;
    }  else { //matched some other char
      return counter;
    }
    
  }, 0); //<-- starting value of the counter
}

isParensBalanced('(())') // 0 <-- balanced
isParensBalanced('(asdfds)') //0 <-- balanced

isParensBalanced('(()') // 1 <-- not balanced
isParensBalanced(')(') // -1 <-- not balanced
```

### 2.4 Đếm các phần tử lặp lại trong mảng (chuyển mảng -> đối tượng)
Nhiều khi bạn muốn đếm các phần tử xuất hiện nhiều lần trong mảng hay chuyển một mảng thành một đối tượng. Bạn có thể sử dụng reduce.

Trong ví dụ dưới đây, chúng ta muốn đếm xem có bao nhiêu chiếc xe mỗi loại và đặt kết quả vào một đối tượng.

![](https://cdn-images-1.medium.com/max/800/1*R6ceptEoeXUYx1cqoiHDSg.png)

```javascript
var cars = ['BMW','Benz', 'Benz', 'Tesla', 'BMW', 'Toyota'];

var carsObj = cars.reduce(function (obj, name) { 
   obj[name] = obj[name] ? ++obj[name] : 1;
  return obj;
}, {});

carsObj; // => { BMW: 2, Benz: 2, Tesla: 1, Toyota: 1 }
```

Có nhiều thứ bạn có thể làm với reduce, và tôi khuyến khích bạn đọc các ví dụ được liệt kêt trên [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce).

## 3. Object destructuring
### 3.1 Loại bỏ những thuộc tính không mong muốn
Đôi khi bạn muốn loại bỏ những thuộc tính không muốn -- có thể là chúng chứa thông tin nhạy cảm hoặc chỉ là quá lớn. Thay vì lặp qua toàn bộ đối tượng để loại bỏ chúng, chúng ta chỉ cần trích xuất các thuộc tính tới các biến và giữ lại những thuộc tính hữu ích trong **rest** parameter.

Ở ví dụ dưới đây, chúng ta muốn loại bỏ các thuộc tính <code>_internal</code> và <code>tooBig</code>. Chúng ta có thể gán chúng vào các biến <code>_internal</code> và <code>tooBig</code> và lưu trữ phần còn lại trong một **rest parameter** <code>cleanObject</code> để sử dụng sau.

![](https://cdn-images-1.medium.com/max/1000/1*BagKQv3nhzKC3suIETTCwQ.png)

```javascript
let {_internal, tooBig, ...cleanObject} = {el1: '1', _internal:"secret", tooBig:{}, el2: '2', el3: '3'};

console.log(cleanObject); // {el1: '1', el2: '2', el3: '3'}
```

### 3.2 Destructure các đối tượng lồng nhau trong các tham số của hàm
Trong ví dụ dưới đây, thuộc tính <code>engine</code> lồng trong đối tượng <code>car</code>. Nếu chúng ta muốn, giả sử thuộc tính là <code>vin</code> của <code>engine</code>, chúng ta có thể dễ dàng destructure như bên dưới:

![](https://cdn-images-1.medium.com/max/800/1*1ZjcqOtS442u996e8B0O_Q.png)

```javascript
var car = {
  model: 'bmw 2018',
  engine: {
    v6: true,
    turbo: true,
    vin: 12345
  }
}

const modelAndVIN = ({model, engine: {vin}}) => {
  console.log(`model: ${model} vin: ${vin}`);
}

modelAndVIN(car); // => model: bmw 2018  vin: 12345
```

### 3.3 Merge các đối tượng
ES6 đi kèm với spread operator (biểu thị bằng ba dấu chấm). Nó thường sử dụng để deconstruct các giá trị của mảng, nhưng bạn cũng có thể sử dụng nó trên các đối tượng.

Ở ví dụ dưới dây, chúng ta sử dụng spread operator để spread trong một đối tượng mới. Các key trong đối tượng thứ 2 sẽ ghi đè các key trong đối tượng thứ nhất.

Trong ví dụ bên dưới, các key <code>b và c</code> từ <code>object2</code> sẽ ghi đè các key cùng tên trong <code>object1</code>.

![](https://cdn-images-1.medium.com/max/800/1*xXitJC0raR68f-HD50rQgQ.png)

```javascript
let object1 = { a:1, b:2,c:3 }
let object2 = { b:30, c:40, d:50}
let merged = {…object1, …object2} //spread and re-add into merged
console.log(merged) // {a:1, b:30, c:40, d:50}
```

## 4. Sets
### 4.1 Loại bỏ các phần tử giống nhau trong mảng với Sets
Trong ES6 bạn có thể dễ dàng loại bỏ các phần tử giống nhau sử dụng Sets, vì Sets chỉ cho phép lưu trữ các giá trị duy nhất.

![](https://cdn-images-1.medium.com/max/800/1*tTOMEVwgZg3VCmY-Fl2KTg.png)

```javascript
let arr = [1, 1, 2, 2, 3, 3];
let deduped = [...new Set(arr)] // [1, 2, 3]
```

### 4.2 Sử dụng các phương thức của mảng
Chuyển một Sets thành một mảng khá đơn giản với spread operator (<code>...</code>). Và bạn có thể sử dụng tất cả các phương thức của mảng trên Sets!

Giả sử chúng ta có một Sets như bên dưới và muốn lọc ra những phần tử lớn hơn 3.

![](https://cdn-images-1.medium.com/max/800/1*DVpt3WyYS9uiDk7VFzoXvA.png)

```javascript
let mySet = new Set([1,2, 3, 4, 5]);

var filtered = [...mySet].filter((x) => x > 3) // [4, 5]
```

## 5. Array destructuring
### 5.1 Đảo giá trị
![](https://cdn-images-1.medium.com/max/800/1*2ClNm34s6Uo3r4L5bZ6RVw.png)

```javascript
let param1 = 1;
let param2 = 2;

//swap and assign param1 & param2 each others values
[param1, param2] = [param2, param1];

console.log(param1) // 2
console.log(param2) // 1
```

### 5.2 Nhận và gán nhiều giá trị từ một hàm
Trong ví dụ bên dưới chúng ta lấy một bài viết (post) tại <code>/post</code> và các bình luận liên quan tại <code>/comments</code>. Chúng ta sử dụng <code>aync/await</code>, và hàm trả lại kết quả trong một mảng. Sử dụng destructuring, chúng ta có thể gán kết quả trực tiếp tới các biến tương ứng.

![](https://cdn-images-1.medium.com/max/800/1*uQeSYcomoMpdbxYMwSPfCQ.png)

```javascript
async function getFullPost(){
  return await Promise.all([
    fetch('/post'),
    fetch('/comments')
  ]);
}

const [post, comments] = getFullPost();
```