+++
date = "2018-03-13T13:59:46+02:00"
tags = ["javascript"]
title = "JavaScript: map vs forEach"
description = "Đâu là sự khác biệt giữa map và forEach trong JavaScript"
keywords = "javascript, map, forEach, map vs forEach"
image = "/img/"
draft = true
+++

*Bài viết được dịch từ: [codeburst.io](https://codeburst.io/javascript-map-vs-foreach-f38111822c0f)*

Nếu đã làm việc với JavaScript một thời gian, có lẽ bạn sẽ thấy hai phương thức tương tự <code>Array.prototype.map()</code> và <code>Array.prototype.forEach()</code>.

Vậy, đâu là sự khác biệt giữa chúng?

## Định nghĩa map & forEach

Trước hết hãy xem xét các định nghĩa trên MDN:

- <code>forEach()</code> - thực hiện một function một lần cho mỗi phần tử mảng. 

- <code>map()</code> - tạo một mảng mới với các kết quả từ việc gọi một function trên mỗi phần tử của mảng gốc.

Điều này có nghĩa là gì? 

Vâng, phương thức <code>forEach()</code> không trả lại bất cứ thứ gì. Nó chỉ đơn giản gọi một function trên mỗi phần tử trong mảng. Hàm callback này được phép thay đổi mảng gốc. 

Trong khi đó, phương thức <code>map()</code> cũng sẽ gọi một function trên mỗi phần tử trong mảng đó. Sự khác biệt là map() sử dụng các giá trị trả về và trả về một mảng mới có cùng kích thước.

## Code Examples

Xem xét các mảng dưới đây. Nếu chúng ta muốn tăng gấp đôi mỗi phần tử trong mảng, chúng ta có thể sử dụng <code>map</code> hoặc <code>forEach</code>.

```javascript
let arr = [1, 2, 3, 4, 5];
```

***ForEach***

Lưu ý rằng bạn sẽ không bao giờ <code>return</code> từ một function <code>forEach</code> vì các giá trị trả lại sẽ bị bỏ đi:

```javascript
arr.forEach((num, index) => {
    return arr[index] = num * 2;
});
```

***Kết quả***

```javascript
// arr = [2, 4, 6, 8, 10]
```

***Map***

```javascript
let doubled = arr.map(num => {
    return num * 2;
});
```

***Kết quả***

```javascript
// doubled = [2, 4, 6, 8, 10]
```

## Tốc độ

**jsPerf** là ​​một trang web tuyệt vời để kiểm tra tốc độ của các phương thức và chức năng JavasScript khác nhau.

Đây là kết quả của bài kiểm tra <code>forEach()</code> vs <code>map()</code> của tôi:

![](https://cdn-images-1.medium.com/max/800/1*aVOlJ0l02ymgVrQ8axIBrQ.png)

Như bạn thấy, trên máy của tôi <code>forEach()</code> đã chậm hơn khoảng 70% so với <code>map()</code>. Trình duyệt của bạn có thể khác. Bạn có thể kiểm tra ở đây:

[https://jsperf.com/map-vs-foreach-speed-test](https://jsperf.com/map-vs-foreach-speed-test)

## Chức năng

Điều quan trọng là phải hiểu rằng sử dụng <code>map()</code> có thể thích hợp hơn nếu bạn thích lập trình chức năng (functional programming). 

Điều này là do <code>forEach()</code> ảnh hưởng và thay đổi mảng gốc của chúng ta, trong khi <code>map()</code> trả về một Array hoàn toàn mới - do đó không thay đổi mảng gốc.

## Cái nào tốt hơn?

Điều đó phụ thuộc vào những gì bạn đang cố gắng giải quyết. 

<code>forEach()</code> có thể thích hợp hơn khi bạn không cố gắng thay đổi dữ liệu trong mảng của mình, nhưng thay vì chỉ muốn **làm điều gì đó** với nó - như lưu nó vào cơ sở dữ liệu hoặc in ra:

```javascript
let arr = ['a', 'b', 'c', 'd'];

arr.forEach((letter) => {
    console.log(letter);
});

// a
// b
// c
// d
```

Và <code>map()</code> có thể thích hợp hơn khi thay đổi dữ liệu. Nó không chỉ nhanh hơn mà còn trả về một Array mới. Điều này có nghĩa là chúng ta có thể làm những điều thú vị như nối chuỗi với các phương thức khác (map(), filter(), reduce(),...)

```javascript
let arr = [1, 2, 3, 4, 5];

let arr2 = arr.map(num => num * 2).filter(num => num > 5);

// arr2 = [6, 8, 10]
```

Những gì chúng ta làm ở trên là duyệt qua các phần tử trong mảng <code>arr</code> và nhân mỗi phần tử trong mảng với <code>2</code>. Sau đó, chúng ta lọc qua <code>array</code> và chỉ lưu các phần tử lớn hơn <code>5</code>. Mảng <code>arr2</code> có giá trị <code>[6 , 8,10]</code>. 

Nếu bạn muốn tìm hiểu thêm về nối chuỗi <code>map</code>, <code>reduce</code> và <code>filter</code>, hãy đọc bài viết này: [**JavaScript: Tìm hiểu về nối chuỗi map, filter và reduce**](https://codeburst.io/javascript-learn-to-chain-map-filter-and-reduce-acd2d0562cd4).

## Kết luận

- Bất cứ điều gì bạn có thể làm với <code>forEach()</code> thì bạn cũng có thể làm với <code>map()</code>, và ngược lại. 

- <code>map()</code> phân bổ bộ nhớ và lưu các giá trị <code>return</code>. <code>forEach()</code> luôn luôn trả về <code>undefined</code>. 

- <code>forEach()</code> sẽ cho phép một hàm callback để biến đổi mảng hiện tại. <code>map()</code> thay vì trả lại một mảng mới.
