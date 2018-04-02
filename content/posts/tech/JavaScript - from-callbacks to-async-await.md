+++
date = "2018-04-01T13:59:46+02:00"
tags = ["javascript"]
title = "JavaScript: từ callbacks tới async/await"
description = "Mục tiêu của bạn là phải hiểu được sự khác biệt của các cách tiếp cận và cách bạn có thể tận dụng chúng cho công việc của mình"
keywords = ""
image = "/img/javascript-from-callbacks-to-async-await-1cc090ddad99.jpg"
draft = false
+++

*Bài viết được dịch từ: [medium.freecodecamp.org](https://medium.freecodecamp.org/javascript-from-callbacks-to-async-await-1cc090ddad99)*

![javascript-from-callbacks-to-async-await-1cc090ddad992](/img/javascript-from-callbacks-to-async-await-1cc090ddad992.jpeg)
<figcaption>[Thomas Kelley](https://unsplash.com/@thkelley)</figcaption>

JavaScript là đồng bộ. Điều này có nghĩa là nó sẽ thực thi code của bạn theo thứ tự sau khi [hoiting](https://scotch.io/tutorials/understanding-hoisting-in-javascript). Trước khi code thực thi, các khai báo <code>var</code> và <code>function</code> được "đẩy" lên phía trên cùng scope (phạm vi) của chúng. 

Đây là ví dụ về code đồng bộ:

```javascript
console.log('1')
console.log('2')
console.log('3')
```

Đoạn code này chắc này chắc chắn sẽ in ra "1 2 3". 

Các request bất đồng bộ sẽ chờ timer kết thúc (setTimeout) hoặc request được đáp trả, trong khi phần còn lại của code tiếp tục được thực thi. Sau đó, khi đến thời điểm [callback](https://developer.mozilla.org/en-US/docs/Glossary/Callback_function) sẽ đưa các request bất đồng bộ vào hoạt động. 

Đây là một ví dụ về code bất đồng bộ:

```javascript
console.log('1')

setTimeout(function afterTwoSeconds() {
  console.log('2')
}, 2000)

console.log('3')
```

Đoạn code trên sẽ in ra "1 3 2", trong đó "2" ở trong hàm <code>setTimeout</code>, cái sẽ chỉ thực thi sau 2 giây. Ứng dụng của bạn sẽ không chờ cho đến khi 2 giây kết thúc. Thay vào đó nó sẽ tiếp tục thực thi phần còn lại của code và khi timeout kết thúc nó sẽ quay trở lại để thực thi hàm <code>afterTwoSeconds</code>.

Bạn có thể hỏi "Tại sao điều này lại hữu ích?" hay "Làm thế nào tôi biến code bất đồng bộ (async) thành đồng bộ (sync)?". Hi vọng rằng tôi sẽ cho bạn thấy câu trả lời.

## Vấn đề
Mục tiêu của chúng ta là tìm kiếm một người dùng GitHub và lấy tất cả các repo (kho) của người đó. Và bởi vì chúng ta không biết chính xác tên người dùng. Vì thế chúng ta liệt kê tất cả người dùng có tên tương tự nhau và các repo tương ứng. Như thế này:

![javascript-from-callbacks-to-async-await-1cc090ddad993](/img/javascript-from-callbacks-to-async-await-1cc090ddad993.png)

Trong những ví dụ này, chúng ta sẽ sử dụng XHR ([XMLHttpRequest](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest)). Bạn có thể thay thế nó với jQuery <code>$.ajax</code> hoặc một hướng tiếp cập tự nhiên hơn gọi là <code>fetch</code>. Tất cả sẽ cho bạn các promise ở đầu ra.

Đoạn code dưới đây sẽ thay đổi một chút phụ thuộc và hướng tiếp cận của bạn, nhưng bắt đầu sẽ như thế này:

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

Hãy nhớ rằng, trong những ví dụ này phần quan trọng không phải là kết quả cuối cùng của code. Thay vào đó, mục tiêu của bạn là phải hiểu được sự khác biệt của các cách tiếp cận và cách bạn có thể tận dụng chúng cho công việc của mình.

## Callback
Bạn có thể lưu một hàm trong một biến khi sử dụng JavaScript. Sau đó, sử dụng chúng như các tham số của một hàm khác để thực thi sau đó. Đây chính là "callback". 

Một ví dụ sẽ là:

```javascript
// Thực thi hàm "doThis" với tham số là một hàm khác, trong trường hợp này là "andThenThis". doThis sẽ thực thi ở bất kỳ đau trong code và khi nó kết thúc hàm "andThenThis" sẽ được thực thi.

doThis(andThenThis)

// Bên trong "doThis" nó được tham chiếu như "callback", cái chỉ là một biến lưu giữ tham chiếu tới hàm này.

function andThenThis() {
  console.log('and then this')
}

// Bạn có thể sử dụng bất cứ tên nào bạn muốn, nhưng "callback" được sử dụng phổ biến nhất.

function doThis(callback) {
  console.log('this first');
  callback()
}
```

Sử dụng <code>callback</code> cho phép chúng ta làm một số thứ với hàm <code>request</code> đã định nghĩa trước đó:

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

Hàm request sẽ có thêm một tham số <code>callback</code>, và khi một <code>request</code> được tạo nó sẽ được gọi trong cả 2 trường hợp lỗi hoặc thành công.

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

Phân tích:

- Chúng tạo một request để lấy danh sách người dùng
- Sau khi request hoàn thành chúng ta sử dụng hàm callback <code>handleUserList</code>
- Nếu không có lỗi chúng ta sẽ phân tích kết quả trả về từ server sử dụng <code>JSON.parse</code>
- Sau đó lặp qua danh sách người dùng khi nó lớn hơn 1. Với mỗi người dùng chúng ta yêu cầu danh sách các repo của họ. Chúng ta sẽ sử dụng url là giá trị của <code>repos_url</code> trong mỗi đối tượng <code>user</code>. 
- Khi request hoàn thành callback sẽ được gọi. Nó sẽ xử lý lỗi hoặc kết quả trả về là danh sách các repo.

**Lưu ý**: Sử dụng <code>err</code> như là tham số đầu tiên của callback là một quy ước khá phổ biến, đặc biệt khi sử dụng Node.js.

Một hướng tiếp cần "hoàn chỉnh" và dễ đọc hơn sẽ có một vài hàm xử lý lỗi. Chúng ta cũng tách callback ra khỏi hàm request. Giống như thế này:

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
  
  // Xử lý danh sách repo ở đây
  console.log('My very few repos', repos)
}
```

Đoạn code này có vấn đề là bạn không thể điều khiển thứ tự nhận danh sách repo của người dùng. Chúng ta đang yêu cầu thông tin cho tất cả người dùng trong trường hợp có nhiều hơn 1. Và không thể quyết định được thứ tự sẽ nhận. Ví dụ, danh sách repo của người dùng thứ 10 có thể nhận được đầu tiên và người dùng thứ 2 thì nhận được cuối cùng. Có một giải pháp khả thi cho vấn đề này sẽ được đề cập ở phần sau.

Vấn đề chính với callbacks là việc bảo trì và tính dễ đọc. Đây được gọi là **callback hell**, cái có thể tránh được với cách tiếp cận ở phần tiếp theo.

![](https://cdn-images-1.medium.com/max/1600/1*3cMX1FwfBO6W5VnVcvxaWw.png)
<figcaption>Hình ảnh lấy từ [đây](https://medium.com/@sagish/node-with-benefits-using-coffeescript-in-your-stack-e9754bf58668)</figcaption>

## Promies
Promises có thể làm cho code của bạn dễ đọc hơn. Một lập trình viên mới có thể xem code base và thấy rõ thứ tự thực thi của code.

Để tạo một promise bạn có thể sử dụng:

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

Hãy phân tích đoạn code trên:

- Một promise được khởi tạo với hàm với 2 tham số <code>resolve</code> và <code>reject</code>
- Đặt code bất đồng bộ bên trong hàm <code>Promise</code>. Gọi hàm <code>resolve</code> khi mọi thứ hoạt động như mong muốn. Ngược lại gọi <code>reject</code>
- Khi một <code>resolve</code> được tìm thấy phương thức <code>.then</code> được thực thi. Khi một <code>reject</code> được tìm thấy <code>.catch</code> được kích hoạt.

Những điều cần ghi nhớ:

- <code>resolve</code> và <code>reject</code> chỉ chấp nhận một tham số. <code>resolve('yey', 'works')</code> sẽ chỉ gửi 'yey' tới <code>.then</code>
- Nếu nối chuỗi nhiều <code>.then</code>. Bạn nên thêm một <code>return</code> tại cuối mỗi callback tương ứng với chúng.
- Khi một <code>reject</code> xảy ra <code>catch</code> sẽ được thực thi, nếu bạn có một <code>.then</code> đã được nối đằng sau <code>catch</code>. Nó sẽ vẫn thực thi <code>.then</code> đó.
- Với một chuỗi <code>.then</code> nếu lỗi xảy ra trên hàm đầu tiên. Nó sẽ bỏ qua chuỗi <code>.then</code> đằng sau cho đến khi tìm thấy một <code>.catch</code>
- Một promise có 3 trạng thái
  - **pending** khi nó đang chờ <code>resolve</code> hoặc <code>reject</code> xảy ra
  - **resolved**
  - **rejected**
- Khi trong trạng thái <code>resolved</code> hoặc <code>rejected</code>. Nó không thể thay đổi.

**Lưu ý:** Bạn có thể tạo ra các promise mà không cần thực thi ngay tại thời điểm khai báo.  

Hãy sử dụng ví dụ request với một promise để minh họa

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

Trong trường hợp này khi bạn thực thi <code>request</code> nó sẽ trả về như thế này:

![](https://cdn-images-1.medium.com/max/1600/1*whumsNXyynNP7n4WZLZTZg.png)
<figcaption>Một promise đang chờ resolved hoặc rejected</figcaption>

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

Đây là cách chúng ta xử lý thứ tự kết quả trả về và một vài vấn đề xử lý lỗi. Code vẫn còn hơi phức tạp. Nhưng đó là một cách để cho bạn thấy rằng cách tiếp cận này cũng có thể tạo ra các vấn đề gây khó đọc. 

Chúng ta có thể sửa nhanh để tách các callback ra như thế này:

```javascript
const userGet = `https://api.github.com/search/users?page=1&q=daspinola&type=Users`

const userRequest = request(userGet)

// Chỉ cần đọc phần này bạn sẽ hiểu đoạn code này đang làm gì
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

Bằng cách nhìn vào  chuỗi <code>.then</code> đằng sau <code>userRequest</code> bạn có thể biết được cái chúng ta mong đợi từ đoạn code này. Mọi thứ đều có nhiệm vụ riêng. 

Đây chỉ là "bề nổi" về Promises. Để có một cái nhìn sâu sắc về cách chúng làm việc tôi khuyên bạn nên đọc thêm [bài viết này](https://pouchdb.com/2015/05/18/we-have-a-problem-with-promises.html).

## Generators
Một hướng tiếp cận khác là sử dụng generators. Phần này hơi nâng cao một chút vì thế nếu mới bắt đầu có thể thoải mái bỏ qua phần này.

Generators cho phép bạn viết code bất đồng bộ giống như đồng bộ.

Chúng được biểu diễn bằng dấu <code>*</code> trong một hàm như thế này:

```javascript
function* foo() {
  yield 1
  const args = yield 2
  console.log(args)
}
var fooIterator = foo()

console.log(fooIterator.next().value) // will log 1
console.log(fooIterator.next().value) // will log 2

fooIterator.next('aParam') // will log the console.log inside the generator 'aParam'
```

Thay vì trả lại với câu lệnh <code>return</code>, generators có một câu lệnh <code>yield</code>. Nó dừng thực thi hàm cho đến khi một phương thức <code>.next</code> được gọi. Tương tự với <code>.then</code> của promise chỉ thực thi khi resoled được trả lại.

Hàm request của chúng ta sẽ trông như thế này:

```javascript
function request(url) {
  return function(callback) {
    const xhr = new XMLHttpRequest();
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
      console.log('timeout')
    }
    xhr.open('get', url, true)
    xhr.send()
  }
}
```

Chúng ta muốn <code>url</code> như một tham số. Nhưng thay vì thực thi request ngay lập tức, chúng ta chỉ muốn khi có một callback để xử lý kết quả trả về (response).

<code>generator</code> sẽ như thế này:

```javascript
function* list() {
  const userGet = `https://api.github.com/search/users?page=1&q=daspinola&type=Users`
 
  const users = yield request(userGet)
  
  yield
  
  for (let i = 0; i<=users.length; i++) {
    yield request(users[i].repos_url)
  }
}
```

Nó sẽ:

- Chờ cho đến khi <code>request</code> được chuẩn bị
- Chấp nhận một tham số <code>url</code> và trả lại <code>function</code> với tham số là một <code>callback</code>
- Nhận <code>users</code> để gửi tới <code>.next</code> tiếp theo
- Lặp qua <code>users</code>
- Chờ <code>.next</code> cho mỗi <code>users</code>
- Trả lại hàm callback tương ứng với chúng

Đoạn code để thực thi sẽ như thế này:

```javascript
try {
  const iterator = list()
  iterator.next().value(function handleUsersList(err, users) {
    if (err) throw err
    const list = JSON.parse(users).items
    
    // send the list of users for the iterator
    iterator.next(list)
    
    list.forEach(function(user) {
      iterator.next().value(function userRepos(error, repos) {
        if (error) throw repos

        // Handle each individual user repo here
        console.log(user, JSON.parse(repos))
      })
    })
  })  
} catch (e) {
  console.error(e)
}
```

Bạn sẽ thấy đoạn code này có những vấn đề tương tự callback hell.

Giống như [async/await](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function), một trình biên dịch được khuyến khích. Bởi vì nó không được hỗ trợ trong các trình duyệt cũ.

Ngoài ra, theo kinh nghiệm của tôi generators không phổ biến. Vì thế có thể phát sinh nhầm lẫm trong code base được bảo dưỡng bởi nhiều lập trình viên khác nhau.

Cách generators làm việc có thể được tìm thấy trong bài viết [này](https://codeburst.io/generators-in-javascript-1a7f9f884439) và đây là một [tài nguyên khác](http://chrisbuttery.com/articles/synchronous-asynchronous-javascript-with-es6-generators/).

## Async/Await
Phương thức này giống như pha trộn generators với promises. Bạn chỉ cần khai báo function nào là <code>async</code>. Và phần nào trong code sẽ có <code>await</code> để <code>promise</code> kết thúc.

```javascript
sumTwentyAfterTwoSeconds(10)
  .then(result => console.log('after 2 seconds', result))

async function sumTwentyAfterTwoSeconds(value) {
  const remainder = afterTwoSeconds(20)
  return value + await remainder
}

function afterTwoSeconds(value) {
  return new Promise(resolve => {
    setTimeout(() => { resolve(value) }, 2000);
  });
}
```

Trong kịch bản này:

- Chúng ta có <code>sumTwentyAfterTwoSeconds</code> là một hàm async
- Chúng ta chờ <code>resolve</code> hoặc <code>reject</code> cho hàm promise <code>afterTwoSeconds</code>
- Nó sẽ chỉ kết thúc trong <code>.then</code> khi <code>await</code> kết thúc.

Áp dụng vào hàm <code>request</code> chúng ta sẽ để nó như một <code>promise</code> đã thấy trước đó:

```javascript
function request(url) {
  return new Promise(function(resolve, reject) {
    const xhr = new XMLHttpRequest();
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
    xhr.send()
  })
}
```

Chúng ta tạo hàm <code>async</code> với các <code>await</code> như thế này:

```javascript
async function list() {
  const userGet = `https://api.github.com/search/users?page=1&q=daspinola&type=Users`
  
  const users = await request(userGet)
  const usersList = JSON.parse(users).items
  
  usersList.forEach(async function (user) {
    const repos = await request(user.repos_url)
    
    handleRepoList(user, repos)
  })
}
function handleRepoList(user, repos) {
  const userRepos = JSON.parse(repos)
  
  // Handle each individual user repo here
  console.log(user, userRepos)
}
```

Bây giờ chúng ta có một hàm async <code>list</code>, cái sẽ xử lý các request. Một hàm async là cần thiết trong <code>forEach</code> vì chúng ta có danh sách <code>repos</code> của mỗi người dùng.

Chúng ta gọi hàm <code>list</code>:

```javascript
list()
  .catch(e => console.error(e))
```

Phương pháp này và promises là những phương pháp yêu thích của tôi vì chúng dễ đọc và dễ thay đổi. Bạn có thể đọc nhiều hơn về async/await ở [đây](https://davidwalsh.name/async-await).

Một nhược điểm của việc sử dụng async/await là chúng không được hỗ trợ trong các trình duyệt cũ ở phía front-end. Ở phía back-end bạn phải sử dụng Node 8 trở lên.

Bạn có thể sử dụng một trình biên dịch như [babel](https://babeljs.io/) để giải quyết vấn đề này.

## Giải pháp
Bạn có thể xem source code sử dụng async/await ở [đây](https://codepen.io/daspinola/pen/EvOEKB).

Bạn cũng có thể tự thử những cách khác nhau đã được đề cập trong bài viết này.

## Kết luận
Tùy thuộc vào từng tình huống mà bạn có thể sử dụng:

- async/await
- callbacks
- hỗn hợp

Nó phụ thuộc vào mục đích của bạn. Và cái nào sẽ dễ hiểu với những người khác và với chính bạn trong tương lai để có thể dễ dàng bảo trì code.

## Đọc thêm
[https://pouchdb.com/2015/05/18/we-have-a-problem-with-promises.html](https://pouchdb.com/2015/05/18/we-have-a-problem-with-promises.html)

[https://codeburst.io/generators-in-javascript-1a7f9f884439](https://codeburst.io/generators-in-javascript-1a7f9f884439)

[https://contourline.wordpress.com/2017/07/26/mixing-asyncawait-promises-and-callbacks/#comments](https://contourline.wordpress.com/2017/07/26/mixing-asyncawait-promises-and-callbacks/#comments)

[https://ponyfoo.com/articles/understanding-javascript-async-await](https://ponyfoo.com/articles/understanding-javascript-async-await)

[http://chrisbuttery.com/articles/synchronous-asynchronous-javascript-with-es6-generators/](http://chrisbuttery.com/articles/synchronous-asynchronous-javascript-with-es6-generators/)

[https://medium.com/codebuddies/getting-to-know-asynchronous-javascript-callbacks-promises-and-async-await-17e0673281ee](https://medium.com/codebuddies/getting-to-know-asynchronous-javascript-callbacks-promises-and-async-await-17e0673281ee)

[https://blog.hellojs.org/asynchronous-javascript-from-callback-hell-to-async-and-await-9b9ceb63c8e8](https://blog.hellojs.org/asynchronous-javascript-from-callback-hell-to-async-and-await-9b9ceb63c8e8)
