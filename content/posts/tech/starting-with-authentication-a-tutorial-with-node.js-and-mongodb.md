+++
date = "2018-05-17T13:59:46+02:00"
tags = ["nodejs", "authentication"]
title = "Bắt đầu với Authentication (sử dụng Node.js và MondoDB)"
description = "Xác thực là một vấn đề quan trọng khi tạo các ứng dựng web động. Bài viết này sẽ làm rõ mọi thứ và cung cấp một hướng dẫn cơ bản"
keywords = "authentication, sessions, cookies, nodejs authentication, mongodb sessions"
image = "/img/authentication.jpg"
draft = false
+++

*Bài viết được dịch từ: [medium.com](https://medium.com/of-all-things-tech-progress/starting-with-authentication-a-tutorial-with-node-js-and-mongodb-25d524ca0359
)*

![](https://cdn-images-1.medium.com/max/2000/0*OJNi5e6O1gHvsN98.)
<figcaption>https://unsplash.com/photos/tGbugCIBaCo</figcaption>

{{% tocsection %}}

<!-- TOC -->

- [Giới thiệu](#giới-thiệu)
- [Xác thực là gì?](#xác-thực-là-gì)
- [Những thứ tôi sẽ sử dụng cho hướng dẫn này](#những-thứ-tôi-sẽ-sử-dụng-cho-hướng-dẫn-này)
    - [Môi trường phát triển](#môi-trường-phát-triển)
    - [Các dependency](#các-dependency)
    - [Cấu trúc](#cấu-trúc)
- [Đăng ký người dùng](#đăng-ký-người-dùng)
    - [Kết nối với MongoDB](#kết-nối-với-mongodb)
    - [Tạo một schema](#tạo-một-schema)
    - [Chèn dữ liệu vào MongoDB](#chèn-dữ-liệu-vào-mongodb)
    - [Hashing và salting](#hashing-và-salting)
- [Sessions và Cookies](#sessions-và-cookies)
    - [Thiết lập Sessions](#thiết-lập-sessions)
    - [Cải tiến ứng dụng](#cải-tiến-ứng-dụng)
- [Tạo custom middleware](#tạo-custom-middleware)
- [Lưu ý về khả năng mở rộng với sessions](#lưu-ý-về-khả-năng-mở-rộng-với-sessions)
- [Tổng kết](#tổng-kết)
- [Kết luận](#kết-luận)
- [Tham khảo](#tham-khảo)

<!-- /TOC -->

{{% /tocsection %}}

[Source trên Github](https://github.com/DDCreationStudios/authenticationIntro)

## Giới thiệu
Xác thực (authentication) là một vấn đề quan trọng khi tạo các ứng dựng web động. Bài viết này sẽ làm rõ mọi thứ và cung cấp một hướng dẫn cơ bản.

> "Với tôi, sự riêng tư và tính bảo mật thật sự quan trọng. Chúng có mối quan hệ ràng buộc với nhau: bạn không thể có sự riêng tư mà không có bảo mật." -- Larry Page

## Xác thực là gì?
Xác thực (authentication) là xác định danh tính người dùng, cung cấp các quyền truy cập và nội dung khác nhau phụ thuộc vào id của họ. Trong hầu hết các trường hợp ứng dụng cung cấp một login form với những thông tin nhất định để xác minh người dùng.

Cần phải hiểu các khái niệm:

- Xác thực (authentication) là gì?
- Phân quyền (authorization) là gì?
- Session là gi?
- Cookie là gì?

## Những thứ tôi sẽ sử dụng cho hướng dẫn này
### Môi trường phát triển
Trong ví dụ này tôi sẽ sử dụng:

- JavaScript
- Node.js
- Express (JS framework)
- MongoDB (Database)
- Yarn (quản lý các package)
- Visual Studio Code 

Về UI tôi sử dụng [template từ w3layouts](https://w3layouts.com/register-login-widget-flat-responsive-widget-template/).

### Các dependency
Các package sẽ sử dụng:

- [body-parser](https://www.npmjs.com/package/body-parser) (parse các request tới server)
- [express](http://expressjs.com/) (làm cho ứng dụng chạy)
- [nodemon](https://github.com/remy/nodemon) (restart khi có thay đổi xảy ra)
- [mongoose](http://mongoosejs.com/docs/) (mô hình hóa object data để đơn giản hóa các tương tác với MongoDB)
- [bcrypt](https://www.npmjs.com/package/bcrypt) (hashing và salting passwords)
- [express session](https://www.npmjs.com/package/express-session) (xử lý sessions)
- [connect-mongo](https://www.npmjs.com/package/connect-mongo) (lưu trữ session trong MongoDB)

### Cấu trúc
Hướng dẫn này sẽ chia làm các phần:

- Đăng ký người dùng (thiết lập các route và database)
- Sessions và Cookies (kết nối chúng tới các login route)
- Tạo custom middleware (cải thiện hiệu năng)

## Đăng ký người dùng 
Tôi sẽ bắt đầu với với một thiết lập express cơ bản, nó chỉ đơn giản là một web server và phục vụ các tệp tin tĩnh (static file). ([xem Github commit này](https://github.com/DDCSLearning/authenticationIntro/commit/97da94b5b6b52c4f2452d92eb0e92a110a97a1f4)).

### Kết nối với MongoDB
- Cài đặt Mongoose
- Cài đặt mongodb
- Thiết lập [mongod](https://docs.mongodb.com/manual/reference/program/mongod/) nếu bạn chưa biết ([đọc bài này](https://treehouse.github.io/installation-guides/mac/mongo-mac.html))
- Đảm bảo mongodb đang chạy cùng với server localhost

### Tạo một schema
MongoDB là một document database, nó lưu trữ JSON như các object. Model/schema mô tả cái mà các đối tượng này chứa.

- tạo một schema theo [tài liệu hướng dẫn](http://mongoosejs.com/docs/guide.html) trong một thư mục riêng
- schema lên mô tả các trường chúng ta có trong form và chỉ định dữ liệu nó mong đợi

Nó sẽ trông như thế này:

```javascript
var mongoose = require('mongoose');
var UserSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true,
    trim: true
  },
  username: {
    type: String,
    unique: true,
    required: true,
    trim: true
  },
  password: {
    type: String,
    required: true,
  },
  passwordConf: {
    type: String,
    required: true,
  }
});
var User = mongoose.model('User', UserSchema);
module.exports = User;
```

### Chèn dữ liệu vào MongoDB
- thêm middleware [body-parser](https://github.com/expressjs/body-parser) để parse body của các request đến server
- tạo POST route cho việc gửi dữ liệu tới server
- lưu trữ các giá trị được điền vào form và lưu trữ vào db với schema
- nó sẽ trông như thế này:

```javascript
if (req.body.email &&
  req.body.username &&
  req.body.password &&
  req.body.passwordConf) {
  var userData = {
    email: req.body.email,
    username: req.body.username,
    password: req.body.password,
    passwordConf: req.body.passwordConf,
  }
  //use schema.create to insert data into the db
  User.create(userData, function (err, user) {
    if (err) {
      return next(err)
    } else {
      return res.redirect('/profile');
    }
  });
}
```

- sử dụng [mongo shell](https://docs.mongodb.com/manual/reference/mongo-shell/) để kiểm tra xem dữ liệu đã được lưu vào databse hay chưa? (nó nên có dữ liệu khi sử dụng <code>db.users.find()</code>)

### Hashing và salting
Hàm mã hóa hash nhận một phần thông tin và trả lại một chuỗi được mã hóa. Các giá trị đã được mã hóa không dễ bị giải mã và đó là lý do tại sao chúng được sử dụng cho password.

Salt là các dữ liệu ngẫu nhiên sẽ được mã hóa cùng với password mà người dùng nhập. (các chuỗi giống nhau khi mã hóa sẽ có kết quả giống nhau, vì vậy chúng ta cần thêm các dữ liệu ngẫu nhiên salt).

Trong ví dụ này chúng ta sẽ sử dụng [bcrypt](https://www.npmjs.com/package/bcrypt).

Tiếp theo:

- cài đặt [bcrypt](https://www.npmjs.com/package/bcrypt) package
- thêm prehook tới mongoose schema của bạn, nó sẽ như thế này:

```javascript
//hashing a password before saving it to the database
UserSchema.pre('save', function (next) {
  var user = this;
  bcrypt.hash(user.password, 10, function (err, hash){
    if (err) {
      return next(err);
    }
    user.password = hash;
    next();
  })
});
```

- kiểm tra với mongod xem password đã được mã hóa hay chưa?

So sánh với [commit](https://github.com/DDCSLearning/authenticationIntro/commit/33ac4662c38f7c3115615983cf60effe2ebbd7ed) này của tôi nếu cần.

*Đến đây, bạn đã hoàn thành 50% toàn bộ ứng dụng và là phần khó nhất! Hãy tiếp tục!*

## Sessions và Cookies
HTTP là một giao thức stateless, điều đó có nghĩa là web server không theo dõi ai đang nghé thăm một trang web. Việc hiển thị nội dung cụ thể cho người dùng đã đăng nhập yêu cần phải theo dõi điều này. Vì thế sessions với một session ID đã được tạo ra. Cookies là các cặp key/value được quản lý bởi trình duyệt. Tương ứng với sessions của server.

### Thiết lập Sessions
- thêm [express sessions](https://www.npmjs.com/package/express-session) package
- thêm session middleware trong ứng dụng của bạn. Nó sẽ như thế này:

```javascript
//use sessions for tracking logins
app.use(session({
  secret: 'work hard',
  resave: true,
  saveUninitialized: false
}));
```

- sử dụng MongoDB để lưu trữ userId trong <code>req.session.userId</code>
- thiết lập login route tương tự cách bạn thiết lập register route (trong login form bạn chỉ có 2 trường username và password)
- xác thực thông tin người dùng nhập với dữ liệu trong database sẽ như thấy:

```javascript
//authenticate input against database
UserSchema.statics.authenticate = function (email, password, callback) {
  User.findOne({ email: email })
    .exec(function (err, user) {
      if (err) {
        return callback(err)
      } else if (!user) {
        var err = new Error('User not found.');
        err.status = 401;
        return callback(err);
      }
      bcrypt.compare(password, user.password, function (err, result) {
        if (result === true) {
          return callback(null, user);
        } else {
          return callback();
        }
      })
    });
}
```

Hãy dành thời gian để hiểu đoạn code này, vì nó là chức năng chính trong toàn bộ quá trình xác thực theo ý kiến của tôi!

*Bây giờ ứng dụng xác thực của bạn đã thực sự làm việc. Chúc mừng!*

So sánh với [commit](https://github.com/DDCSLearning/authenticationIntro/commit/1564715bf713b89bc622adb314577d509eed51ac) này của tôi nếu cần

![](https://cdn-images-1.medium.com/max/2000/0*f3Ypmy-26_j_bU33.)
<figcaption>https://unsplash.com/photos/qCrocisvGwc</figcaption>

### Cải tiến ứng dụng
- điều chỉnh bố cục của bạn cho phù hợp (ẩn form register và cung cấp nút logout khi người dùng đã đăng nhập)
- tạo một middleware để ID của người dùng có sẵn trong HTML
- tạo một logout route để hủy session id và điều hướng đến trang chủ. Nó sẽ như thế này:

```javascript
// GET /logout
router.get('/logout', function(req, res, next) {
  if (req.session) {
    // delete session object
    req.session.destroy(function(err) {
      if(err) {
        return next(err);
      } else {
        return res.redirect('/');
      }
    });
  }
});
```

Có nhiều thứ để làm thêm nhưng logout và hủy session là những thứ quan trọng cho mỗi hệ thống xác thực! Đó là lý do tại sao tôi thêm chúng ở đây.

## Tạo custom middleware
Middleware chạy sau khi nhận một request, và trước khi một response được gửi trở lại. Trong ví dụ này body-parser package được sử dụng như middleware. Nó chuyển đổi các request đến thành định dạng mà các chương trình có thể dễ dàng sử dụng.

Các hàm Middleware có thể nối chuỗi phù hợp với chu trình request/response của ứng dụng. Khi viết custom middleware, <code>next()</code> luôn được gọi tại cuối của middleware để di chuyển đến middleware tiếp theo trong chu trình.

Ví dụ: Tạo một middleware yêu cầu login cho một số trang nhất định.

```javascript
function requiresLogin(req, res, next) {
  if (req.session && req.session.userId) {
    return next();
  } else {
    var err = new Error('You must be logged in to view this page.');
    err.status = 401;
    return next(err);
  }
}
router.get('/profile', mid.requiresLogin, function(req, res, next) {
  //...
});
```

## Lưu ý về khả năng mở rộng với sessions
Hiện tại sessions được lưu trữ trong RAM. Để lưu trữ với dung lượng lớn hơn chúng ta có thể kết nối session store với MongoDB. Tôi sẽ sử dụng [connect-mongo](https://www.npmjs.com/package/connect-mongo) package.

- chỉ cần làm theo tài liệu hướng dẫn như thế này:

```javascript
//use sessions for tracking logins
app.use(session({
  secret: 'work hard',
  resave: true,
  saveUninitialized: false,
  store: new MongoStore({
    mongooseConnection: db
  })
}));
```

- khi kiểm tra với mongo shell bạn sẽ thấy một collection mới là "sessions" được tạo. Khi login hay logout dữ của collection sẽ thay đổi tương ứng.

## Tổng kết
- luôn luôn đảm bảo thông tin xác thực được mã hóa khi truyền từ trình duyệt tới server và ngược lại.
- sử dụng HTTPS
- nhớ rằng đây (với sessions và cookies) chỉ là một trong nhiều cách để xác thực
- có thể xác thực dựa trên token với OAuth hay JSON Web Tokens
- hay với [passport middleware](http://passportjs.org/)

![](https://cdn-images-1.medium.com/max/1600/0*ajO1y80qaXwMT7mX.png)

Xem source code trên [Github](https://github.com/DDCreationStudios/authenticationIntro).

## Kết luận
Đây là cách dễ dàng nhất để triển khai một hệ thống xác thực với Node.js và MongoDB.

Nếu bạn theo dõi Github repo của tôi, bạn sẽ thấy tôi liên tục refactor source code để fix các lỗi và cải thiện nó. Vì thế tôi gợi ý bạn lên xem phiên bản hoàn chỉnh.

## Tham khảo
Linh bài viết gốc https://medium.com/of-all-things-tech-progress/starting-with-authentication-a-tutorial-with-node-js-and-mongodb-25d524ca0359
