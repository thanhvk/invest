+++
date = "2018-03-15T13:59:46+02:00"
tags = ["javascript"]
title = "JavaScript: từ callbacks tới async/await"
description = ""
keywords = ""
image = "/img/javascript-from-callbacks-to-async-await-1cc090ddad99.jpg"
draft = true
+++

*Bài viết được dịch từ: [medium.freecodecamp.org](https://medium.freecodecamp.org/javascript-from-callbacks-to-async-await-1cc090ddad99)*

![javascript-from-callbacks-to-async-await-1cc090ddad992](/img/javascript-from-callbacks-to-async-await-1cc090ddad992.jpeg)
<caption>[Thomas Kelley](https://unsplash.com/@thkelley)</caption>

JavaScript là đồng bộ. Điều này có nghĩa là nó sẽ thực thi mã lệnh của bạn theo thứ tự sau khi [hoiting](https://scotch.io/tutorials/understanding-hoisting-in-javascript). Trước khi mã thực thi, các khai báo <code>var</code> và <code>function</code> được "hoisted" lên phía trên cùng của phạm vi của chúng. 

Đây là ví dụ về mã đồng bộ:

```javascript
console.log('1')
console.log('2')
console.log('3')
```

Mã này chắc chắn sẽ ghi lại "1 2 3". 

Các yêu cầu không đồng bộ sẽ đợi một bộ đếm thời gian kết thúc hoặc một yêu cầu để đáp ứng trong khi phần còn lại của mã tiếp tục thực hiện. Sau đó, khi thời gian đúng thì [callback](https://developer.mozilla.org/en-US/docs/Glossary/Callback_function) sẽ đưa ra các yêu cầu không đồng bộ này vào hành động. 

Đây là một ví dụ về một mã không đồng bộ:

```javascript
console.log('1')

setTimeout(function afterTwoSeconds() {
  console.log('2')
}, 2000)

console.log('3')
```

Điều này thực sự sẽ đăng nhập "1 3 2", vì "2" là trên một <code>setTimeout</code> mà sẽ chỉ thực hiện, bằng ví dụ này, sau hai giây. Ứng dụng của bạn không treo chờ hai giây để kết thúc. Thay vào đó, nó sẽ tiếp tục thực hiện phần còn lại của mã và khi thời gian chờ kết thúc, nó sẽ trở lại sauTwoSeconds. 

Bạn có thể hỏi "Tại sao lại hữu ích?" Hoặc "Làm thế nào để tôi nhận mã async của tôi để trở thành đồng bộ?". Hy vọng rằng tôi có thể cho bạn thấy những câu trả lời.

## Vấn đề

Hãy nói mục tiêu của chúng tôi là tìm kiếm một người dùng GitHub và nhận được tất cả các kho của người dùng đó. Điều là chúng ta không biết tên chính xác của người dùng. Vì vậy, chúng ta phải liệt kê tất cả người dùng có tên tương tự và các kho của họ. 

Không cần phải siêu ưa thích, một cái gì đó như thế này

![javascript-from-callbacks-to-async-await-1cc090ddad993](/img/javascript-from-callbacks-to-async-await-1cc090ddad993.png)

Trong những ví dụ này, mã yêu cầu sẽ sử dụng XHR ([XMLHttpRequest](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest)). Bạn có thể thay thế nó bằng jQuery <code>$.ajax</code> hoặc gần đây hơn được gọi là phương pháp tiếp cận được gọi là <code>fetch</code>. Cả hai sẽ cho bạn những lời hứa hẹn tiếp cận ra khỏi cổng. 

Nó sẽ được thay đổi một chút tùy thuộc vào cách tiếp cận của bạn nhưng như là một starter:

```javascript
// url argument can be something like 'https://api.github.com/users/daspinola/repos'

function request(url) {
  const xhr = new XMLHttpRequest();
  xhr.timeout = 2000;
  xhr.onreadystatechange = function(e) {
    if (xhr.readyState === 4) {
      if (xhr.status === 200) {
       // Code here for the server answer when successful
      } else {
       // Code here for the server answer when not successful
      }
    }
  }
  xhr.ontimeout = function () {
    // Well, it took to long do some code here to handle that
  }
  xhr.open('get', url, true)
  xhr.send();
}
```

Hãy nhớ rằng trong những ví dụ này phần quan trọng không phải là kết quả cuối cùng của mã. Thay vào đó, mục tiêu của bạn cần phải hiểu được sự khác biệt của cách tiếp cận và cách bạn có thể tận dụng chúng để phát triển.

## Callback

Bạn có thể lưu một tham chiếu của một hàm trong một biến khi sử dụng JavaScript. Sau đó, bạn có thể sử dụng chúng như các đối số của một hàm khác để thực thi sau đó. Đây là "callback" của chúng tôi. 

Một ví dụ sẽ là:

```javascript
// Execute the function "doThis" with another function as parameter, in this case "andThenThis". doThis will execute whatever code it has and when it finishes it should have "andThenThis" being executed.

doThis(andThenThis)

// Inside of "doThis" it's referenced as "callback" which is just a variable that is holding the reference to this function
function andThenThis() {
  console.log('and then this')
}

// You can name it whatever you want, "callback" is common approach
function doThis(callback) {
  console.log('this first')
  
  // the '()' is when you are telling your code to execute the function reference else it will just log the reference
  callback()
}
```

Sử dụng <code>callback</code> để giải quyết vấn đề của chúng tôi cho phép chúng tôi làm một cái gì đó như thế này với function <code>request</code> mà chúng tôi đã xác định trước đó:

```javascript
function request(url, callback) {
  const xhr = new XMLHttpRequest();
  xhr.timeout = 2000;
  xhr.onreadystatechange = function(e) {
    if (xhr.readyState === 4) {
      if (xhr.status === 200) {
       callback(null, xhr.response)
      } else {
       callback(xhr.status, null)
      }
    }
  }
  xhr.ontimeout = function () {
   console.log('Timeout')
  }
  xhr.open('get', url, true)
  xhr.send();
}
```

Chức năng của chúng tôi cho yêu cầu sẽ chấp nhận <code>callback</code> để khi <code>request</code> được thực hiện, nó sẽ được gọi trong trường hợp có lỗi và trong trường hợp thành công.

```javascript
const userGet = `https://api.github.com/search/users?page=1&q=daspinola&type=Users`
request(userGet, function handleUsersList(error, users) {
  if (error) throw error
  const list = JSON.parse(users).items
  list.forEach(function(user) {
    request(user.repos_url, function handleReposList(err, repos) {
      if (err) throw err
      // Handle the repositories list here
    })
  })
})
```

Giải quyết vấn đề này: 

- Chúng tôi yêu cầu lấy kho của người dùng 

- Sau khi yêu cầu hoàn tất chúng tôi sử dụng <code>handleUsersList</code> callback

- Nếu không có lỗi thì chúng ta sẽ phân tích phản hồi của máy chủ của chúng ta thành một đối tượng sử dụng <code>JSON.parse</code> 

- Sau đó chúng tôi lặp lại danh sách người dùng của chúng tôi vì nó có thể có nhiều hơn một Đối với mỗi người dùng chúng tôi yêu cầu danh sách kho của họ. Chúng tôi sẽ sử dụng url trả lại cho mỗi người dùng trong phản hồi đầu tiên của chúng tôi Chúng tôi gọi <code>repos_urlas url</code> cho các yêu cầu tiếp theo của chúng tôi hoặc từ lần phản hồi đầu tiên 

- Khi yêu cầu hoàn thành gọi lại, chúng tôi sẽ gọi Điều này sẽ xử lý lỗi của nó hoặc phản hồi với danh sách các kho cho người dùng đó

**Lưu ý**: Gửi lỗi đầu tiên là thông số là một thực tế phổ biến đặc biệt là khi sử dụng Node.js.

Something like this:

```javascript
try {
  request(userGet, handleUsersList)
} catch (e) {
  console.error('Request boom! ', e)
}
function handleUsersList(error, users) {
  if (error) throw error
  const list = JSON.parse(users).items
  list.forEach(function(user) {
    request(user.repos_url, handleReposList)
  })
}
function handleReposList(err, repos) {
  if (err) throw err
  
  // Handle the repositories list here
  console.log('My very few repos', repos)
}
```

Điều này kết thúc lên có vấn đề như đua và các vấn đề xử lý lỗi. Đua xe sẽ xảy ra khi bạn không kiểm soát người dùng nào sẽ nhận được đầu tiên. Chúng tôi yêu cầu thông tin cho tất cả trong trường hợp có nhiều hơn một. Chúng tôi không xem xét đơn đặt hàng. Ví dụ: người dùng 10 có thể đến đầu tiên và người dùng cuối cùng 2. Chúng ta có một giải pháp khả thi sau trong bài báo. 

Vấn đề chính với callbacks là bảo trì và dễ đọc có thể trở thành một nỗi đau. Nó đã được sắp xếp và mã không khó. Đây được gọi là **callback hell** mà có thể tránh được với cách tiếp cận tiếp theo của chúng tôi.

![](https://cdn-images-1.medium.com/max/1600/1*3cMX1FwfBO6W5VnVcvxaWw.png)
Hình ảnh chụp từ [đây](https://medium.com/@sagish/node-with-benefits-using-coffeescript-in-your-stack-e9754bf58668)

## Promies

Hứa hẹn bạn có thể làm cho mã của bạn dễ đọc hơn. Nhà phát triển mới có thể đến cơ sở mã và xem trình tự thực hiện rõ ràng đối với mã của bạn. 

Để tạo ra một lời hứa bạn có thể sử dụng:

```javascript
const myPromise = new Promise(function(resolve, reject) {
  
  // code here
  
  if (codeIsFine) {
    resolve('fine')
  } else {
    reject('error')
  }
})
myPromise
  .then(function whenOk(response) {
    console.log(response)
    return response
  })
  .catch(function notOk(err) {
    console.error(err)
  })
```

Hãy để chúng tôi phân hủy nó: 

- Một promise được khởi tạo với một <code>function</code> <code>resolve</code> và <code>rejects</code> các câu lệnh 

- Đặt mã async của bạn bên trong hàm <code>resolve</code> của <code>Promise</code> khi mọi thứ xảy ra như mong muốn, ngược lại là <code>reject</code>

- Khi một <code>resolve</code> được tìm thấy phương thức <code>.then</code> sẽ thực thi cho rằng Promise. Khi một <code>reject</code> được tìm thấy <code>.catch</code> sẽ được kích hoạt

Những điều cần ghi nhớ:

- <code>resolve</code> và <code>reject</code> chỉ chấp nhận một tham số <code>resolve('yey', 'works')</code> sẽ chỉ gửi 'yey' đến hàm callback <code>.then</code>

- Nếu bạn chuỗi nhiều <code>.then</code> Bạn nên luôn luôn thêm một <code>return</code> vào cuối callbacks tương ứng của họ. Khác họ sẽ thực hiện cùng một lúc

- Khi một từ <code>reject</code> bắt nếu bạn có một chuỗi <code>.then</code> tới i. Nó vẫn sẽ thực <code>.then</code> đó. Bạn có thể xem <code>.then</code> như là một "luôn luôn thực hiện"

- Với một chuỗi trên <code>.then</code> đó nếu một lỗi xảy ra trên một trong những đầu tiên Nó sẽ bỏ qua <code>.then</code> cho đến khi nó tìm thấy một <code>.catch</code>

- Khi chờ đợi <code>resolve</code> hoặc <code>reject</code> xảy ra **resolved**, **rejected**

- Một khi nó ở trong trạng thái được <code>resolved</code> hoặc <code>rejected</code>. Nó không thể thay đổi

**Lưu ý**: Bạn có thể tạo ra các promise mà không có chức năng tại thời điểm khai báo. Cách mà tôi chỉ ra nó chỉ là một cách phổ biến để làm điều đó.

"Lý thuyết, lý thuyết, lý thuyết ... Tôi bối rối" bạn có thể nói. 

Hãy sử dụng ví dụ yêu cầu của chúng tôi với một lời hứa để làm rõ mọi việc:

```javascript
function request(url) {
  return new Promise(function (resolve, reject) {
    const xhr = new XMLHttpRequest();
    xhr.timeout = 2000;
    xhr.onreadystatechange = function(e) {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          resolve(xhr.response)
        } else {
          reject(xhr.status)
        }
      }
    }
    xhr.ontimeout = function () {
      reject('timeout')
    }
    xhr.open('get', url, true)
    xhr.send();
  })
}
```

Trong trường hợp này khi bạn thực hiện <code>request</code> nó sẽ trả về một cái gì đó như thế này:

![](https://cdn-images-1.medium.com/max/1600/1*whumsNXyynNP7n4WZLZTZg.png)

```javascript
const userGet = `https://api.github.com/search/users?page=1&q=daspinola&type=Users`
const myPromise = request(userGet)
console.log('will be pending when logged', myPromise)
myPromise
  .then(function handleUsersList(users) {
    console.log('when resolve is found it comes here with the response, in this case users ', users)
    const list = JSON.parse(users).items
    return Promise.all(list.map(function(user) {
      return request(user.repos_url)
    }))
  })
  .then(function handleReposList(repos) {
    console.log('All users repos in an array', repos)
  })
  .catch(function handleErrors(error) {
    console.log('when a reject is executed it will come here ignoring the then statement ', error)
  })
```

Đây là cách chúng tôi giải quyết đua xe và một số vấn đề xử lý lỗi. Mã vẫn còn hơi phức tạp. Nhưng nó là một cách để cho bạn thấy rằng cách tiếp cận này cũng có thể tạo ra các vấn đề dễ đọc. 

Một sửa chữa nhanh chóng sẽ được tách riêng callbacks như sau:

```javascript
const userGet = `https://api.github.com/search/users?page=1&q=daspinola&type=Users`
const userRequest = request(userGet)
// Just by reading this part out loud you have a good idea of what the code does
userRequest
  .then(handleUsersList)
  .then(repoRequest)
  .then(handleReposList)
  .catch(handleErrors)
function handleUsersList(users) {
  return JSON.parse(users).items
}
function repoRequest(users) {
  return Promise.all(users.map(function(user) {
    return request(user.repos_url)
  }))
}
function handleReposList(repos) {
  console.log('All users repos in an array', repos)
}
function handleErrors(error) {
  console.error('Something went wrong ', error)
}
```

Bằng cách nhìn vào những gì <code>userRequest</code> đang đợi theo thứ tự với <code>.then</code> bạn có thể có được một cảm giác về những gì chúng tôi mong đợi của khối mã này. Mọi thứ đều ít nhiều tách biệt theo trách nhiệm. 

Đây là "scratching the surface" của những gì Promises được. Để có một cái nhìn sâu sắc về cách họ làm việc tôi không thể khuyên bạn nên đủ [bài báo này](https://pouchdb.com/2015/05/18/we-have-a-problem-with-promises.html).

## Generators

## Async/Await

## Giải pháp

Bạn có thể xem [code](https://codepen.io/daspinola/pen/EvOEKB) hoàn thành mục tiêu ban đầu của chúng tôi bằng cách sử dụng async / await trong đoạn mã này. 

Một điều tốt để làm là để thử nó cho mình trong các hình thức khác nhau được tham chiếu trong bài viết này.

## Kết luận

## Đọc thêm
[https://pouchdb.com/2015/05/18/we-have-a-problem-with-promises.html](https://pouchdb.com/2015/05/18/we-have-a-problem-with-promises.html)

[https://codeburst.io/generators-in-javascript-1a7f9f884439](https://codeburst.io/generators-in-javascript-1a7f9f884439)

[https://contourline.wordpress.com/2017/07/26/mixing-asyncawait-promises-and-callbacks/#comments](https://contourline.wordpress.com/2017/07/26/mixing-asyncawait-promises-and-callbacks/#comments)

[https://ponyfoo.com/articles/understanding-javascript-async-await](https://ponyfoo.com/articles/understanding-javascript-async-await)

[http://chrisbuttery.com/articles/synchronous-asynchronous-javascript-with-es6-generators/](http://chrisbuttery.com/articles/synchronous-asynchronous-javascript-with-es6-generators/)

[https://medium.com/codebuddies/getting-to-know-asynchronous-javascript-callbacks-promises-and-async-await-17e0673281ee](https://medium.com/codebuddies/getting-to-know-asynchronous-javascript-callbacks-promises-and-async-await-17e0673281ee)

[https://blog.hellojs.org/asynchronous-javascript-from-callback-hell-to-async-and-await-9b9ceb63c8e8](https://blog.hellojs.org/asynchronous-javascript-from-callback-hell-to-async-and-await-9b9ceb63c8e8)
