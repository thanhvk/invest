+++
date = "2018-04-11T13:59:46+02:00"
tags = ["react", "nodejs", "express"]
title = "Làm thế nào để create-react-app làm việc với Node.js back-end API"
description = "Trong ví dụ ngắn này, tôi sẽ chỉ cho bạn làm thế nào để ứng dụng <code>create-react-app</code> làm việc với Node.js và Express Back-end"
keywords = "React, NodeJS, Express, API"
image = "/img/react_and_nodejs.jpeg"
draft = false
+++

*Bài viết được dịch từ: [medium.freecodecamp.org](https://medium.freecodecamp.org/how-to-make-create-react-app-work-with-a-node-backend-api-7c5c48acb1b0)*

![](https://cdn-images-1.medium.com/max/2000/1*eo3-wlU7ny1XYqPk4i2Blw.jpeg)
<figcaption>Ảnh của [Sebastien Gabriel](https://unsplash.com/photos/5rAcUaCtMzk?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText) trên [Unsplash](https://unsplash.com/?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText)</figcaption>

Đây là một câu hỏi rất phổ biến với các lập trình viên khi bắt đầu với React, và cũng là câu hỏi của tôi khi bắt đầu làm việc với React và Node.js. Trong ví dụ ngắn này, tôi sẽ chỉ cho bạn làm thế nào để ứng dụng <code>create-react-app</code> làm việc với Node.js và Express Back-end.

## create-react-app
Tạo một dự án sử dụng <code>create-react-app</code>.

```bash
create-react-app example-create-react-app-express
```

Tạo một thư mục <code>/client</code> trong thư mục <code>example-create-react-app-express</code> và di chuyển tất cả code mẫu React được tạo bởi <code>create-react-app</code> tới <code>client</code>

```bash
cd example-create-react-app-express
mkdir client
```

## Node Express Server
Tạo một tệp tin <code>package.json</code> trong thư mục gốc (<code>example-create-react-app-expess</code>) và copy nội dụng dưới đây:

```json
{
  "name": "example-create-react-app-express",
  "version": "1.0.0",
  "scripts": {
    "client": "cd client && yarn start",
    "server": "nodemon server.js",
    "dev": "concurrently --kill-others-on-fail \"yarn server\" \"yarn client\""
  },
  "dependencies": {
    "express": "^4.16.2"
  },
  "devDependencies": {
    "concurrently": "^3.5.0"
  }
}
```

Lưu ý tôi sử dụng <code>concurrently</code> để chạy ứng dụng React và Server tại cùng thời điểm. Cờ <code>-kill-others-on-fail</code> sẽ tắt các tiến trình khác nếu một trong số chúng thoát với mã trạng thái bằng 0.

Cài đặt <code>nodemon</code> toàn cục và các dependency:

```bash
npm i nodemon -g
yarn
```

Tạo một tệp tin <code>server.js</code> và copy nội dung sau:

```javascript
const express = require('express');

const app = express();
const port = process.env.PORT || 5000;

app.get('/api/hello', (req, res) => {
  res.send({ express: 'Hello From Express' });
});

app.listen(port, () => console.log(`Listening on port ${port}`));
```

Đây là một server Expess đơn giản chạy trên cổng 5000 và có một API <code>GET /api/hello</code>.

Đến đây bạn có thể chạy Express server với lệnh sau (vẫn ở trong thư mục gốc): 

```bash
node server.js
```

Giờ hãy điều hướng tới <code>http://localhost:5000/api/hello</code> và bạn sẽ thấy như dưới đây:

![](https://cdn-images-1.medium.com/max/800/1*56OO1twlnktOQbC8lXD8Jg.jpeg)


## Ứng dụng React
Bây giờ chuyển qua thư mục <code>client</code> nơi chứa ứng dụng React.

Thêm dòng sau tới tệp tin <code>package.json</code> đã được tạo bởi <code>create-react-app</code>.

```json
"proxy": "http://localhost:5000/"
```

Để có thể sử dụng Express back-end server với một dự án được tạo bằng <code>create-react-app</code> chúng ta cần sử dụng proxy. Câu lệnh này nói với Web-pack server ủy thác các request API của chúng ta đến API server, hiện tại Express server đang chạy trên <code>localhost:5000</code>.

Bây giờ chỉnh sửa <code>/client/src/App.js</code> để gọi tới Express API Back-end.

```javascript
import React, { Component } from 'react';

import logo from './logo.svg';

import './App.css';

class App extends Component {
  state = {
    response: ''
  };

  componentDidMount() {
    this.callApi()
      .then(res => this.setState({ response: res.express }))
      .catch(err => console.log(err));
  }

  callApi = async () => {
    const response = await fetch('/api/hello');
    const body = await response.json();

    if (response.status !== 200) throw Error(body.message);

    return body;
  };

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">{this.state.response}</p>
      </div>
    );
  }
}

export default App;
```

Chúng ta tạo một phương thức <code>callApi</code> để tương tác với Express API Back-end, sau đó chúng ta gọi phương thức này trong <code>componentDitMount</code> và cuối cùng thiết lập trạng thái để API response, là *Hellow From Express*.

Chú ý chúng ta không sử dụng một URL đầy đủ <code>http://localhost:5000/api/hello</code> để gọi tới API, thậm chí ứng dụng React đang chạy trên một cổng khác (3000). Điều này bởi vì dòng <code>proxy</code> chúng ta đã thêm vào tệp tin <code>package.json</code> trước đó.

## Chạy ứng dụng
Từ thư mục gốc của dự án chạy lệnh sau:

```bash
yarn dev
```

Lệnh này sẽ chạy ứng dụng React và server tại cùng thời điểm.

Bây giờ điều hướng tới <code>http://localhost:3000</code> và bạn sẽ thấy ứng dụng React hiển thị tin nhắn tới từ Express back-end server của chúng ta. Tuyệt!

![](https://cdn-images-1.medium.com/max/800/1*XFZUG8ZlxkjNpiELSVD7xw.jpeg)

## Cấu trúc dự án
Đây là cấu trúc dự án khi hoàn thành:

![](https://cdn-images-1.medium.com/max/800/1*vNsl0hQUZJjLvzexhhpYgw.jpeg)

Toàn bộ code trên [GitHub repository](https://github.com/esausilva/example-create-react-app-express).