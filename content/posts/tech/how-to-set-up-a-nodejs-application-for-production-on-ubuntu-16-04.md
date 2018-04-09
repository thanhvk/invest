+++
date = "2018-04-07T13:59:46+02:00"
tags = ["nodejs", "nginx"]
title = "Làm thế nào để thiết lập ứng dụng Node.js cho production trên Ubuntu 16.04"
description = "Trong hướng dẫn này, chúng ta sẽ thiết lập môi trường production trên một server Ubuntu 16.04"
keywords = "nodejs, nginx"
image = "/img/ubuntu-nodejs-nginx.jpg"
draft = false
+++

*Bài viết được dịch từ: [digitalocean.com](https://www.digitalocean.com/community/tutorials/how-to-set-up-a-node-js-application-for-production-on-ubuntu-16-04)*

## Giới thiệu
Node.js là một môi trường runtime JavaScript mã nguồn mở giúp dễ dàng xây dựng các ứng dụng mạng và server. Nền tảng này chạy trên Linux, OS X, FreeBSD và Windows. Các ứng dụng Node.js có thể chạy từ dòng lệnh, nhưng chúng ta sẽ tập trung vào việc chạy chúng như một dịch vụ, vì chúng có thể tự động khởi động lại khi hệ thộng khởi động hoặc gặp lỗi, và có thể được sử dụng an toàn trong môi trường production.

Trong hướng dẫn này, chúng ta sẽ thiết lập môi trường production trên một server Ubuntu 16.04. Server này sẽ chạy ứng dựng Node.js được quản lý bởi PM2, và cung cấp cho người dùng truy cập bảo mật tới ứng dụng thông qua một Nginx reverse proxy. Nginx server sẽ cung cấp HTTPS, sử dụng một chứng chỉ miễn phí được cung cấp bởi Let's Encrypt.

## Điều kiện bắt buộc
Hướng dẫn này giả sử rằng:

- Một server Ubuntu 16.04, đã được cấu hình với một non-root user với quyền <code>sudo</code>, như đã được mô tả trong [hướng dẫn thiết lập một server cho Ubuntu 16.04](https://www.digitalocean.com/community/tutorials/initial-server-setup-with-ubuntu-16-04).
- Một domain name được trỏ tới IP public của server, như [Làm thế nào thế nào để thiết lập một Host name với DigitalOcean]. Bài hướng dẫn này sẽ sử dụng **example.com**.
- Đã cài đặt Nginx, đã được hướng dẫn trong [Làm thế nào cài đặt Nginx trên Ubuntu 16.04](https://www.digitalocean.com/community/tutorials/how-to-install-nginx-on-ubuntu-16-04)
- Đã cấu hình Nginx với SSL sử dụng chứng chỉ Let's Encrypt. [Cách bảo mật Nginx với Let's Encrypt trên Ubuntu 16.04] sẽ hướng dẫn bạn làm việc này.

Khi bạn đã hoàn tất các điều kiện trên chúng ta sẽ có một server cài Nginx tại địa chỉ **https://example.com**.

Hãy bắt đầu bằng cách cài đặt Node.js trên server của bạn.

## Cài đặt Node.js
Chúng ta sẽ cài đặt phiên bản mới nhất của Node.js, sử dụng gói [NodeSource](https://github.com/nodesource/distributions).

Đầu tiên bạn cần cài đặt NodeSource PPA để có thể truy cập tới các nội dung của nó. Đảm bảo rằng bạn đang ở thư mục home của mình, và sử dụng <code>curl</code> để lấy script cài đặt cho Node.js 6.x.

```bash
cd ~
curl -sL https://deb.nodesource.com/setup_6.x -o nodesource_setup.sh
```

Bạn có thể xem nội dung của script với <code>nano</code> (hoặc với trình soạn thảo yêu thích của mình):

```bash
nano nodesource_setup.sh
```

Và chạy script với <code>sudo</code>

```bash
sudo bash nodesource_setup.sh
```

PPA sẽ được thêm vào cấu hình của bạn và cache package ở local sẽ tự động cập nhật. Sau khi chạy script thiết lập từ nodesource, bạn có thể cài đặt package Node.js theo cùng cách đã làm ở phía trên:

```bash
sudo apt-get install nodejs
```

Package <code>nodejs</code> chứa <code>nodejs</code> binary cũng như <code>npm</code>. Tuy nhiên, để một vài package <code>npm</code> làm việc (chẳng hạn những yêu cầu biên dịch code từ mã nguồn), bạn sẽ cần cài đặt package <code>build-essential</code>.

```bash
sudo apt-get install build-essential
```

Node.js đã được cài đặt, và sẵn sàng chạy một ứng dụng! Tiếp theo hãy viết một ứng dụng Node.js.

>**Chú ý:** Khi cài đặt từ NodeSource PPA, các thực thi Node.js gọi là <code>nodejs</code> thay vì <code>node</code>.

## Tạo một ứng dụng Node.js
Chúng ta sẽ viết một ứng dụng *Hellow World* chỉ đơn giản trả lại "Hello World" tới mọi HTTP request. Đây là một ứng dụng mẫu giúp bạn thiết lập Node.js, bạn có thể thay thế với ứng dụng của mình -- chỉ cần đảm bảo rằng bạn sửa ứng dụng của mình lắng nghe trên địa chỉ IP và cổng thích hợp.

### Hellow World
Đầu tiên, tạo và mở ứng dụng Node.js để chỉnh sửa. Trong hướng dẫn này, chúng ta sẽ sử dụng <code>nano</code> để chỉnh sửa ứng dụng mẫu gọi là <code>hello.js</code>:

```bash
cd ~
nano hello.js
```

Chèn đoạn code dưới đây vào tệp tin. Nếu bạn muốn, bạn có thể thay thế cổng <code>8080</code> (đảm bảo sử dụng một cổng không phải là cho admin, ví dụ 1024 hoặc lớn hơn):

```bash
#!/usr/bin/env nodejs
var http = require('http');
http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.end('Hello World\n');
}).listen(8080, 'localhost');
console.log('Server running at http://localhost:8080/');
```
<figcaption>hello.js</figcaption>

Bây giờ hãy lưu lại và thoát.

Ứng dụng Node.js đơn giản lắng nghe trên địa chỉ (<code>localhost</code>) và cổng (<code>8080</code>), và trả lại "Hello World" với mã HTTP thành công 200. Khi lắng nghe trên **localhost**, các client ngoài mạng nội bộ sẽ không thể kết nối tới ứng dụng của chúng ta.

### Kiểm tra ứng dụng
Để kiểm tra ứng dụng, đánh dấu <code>hello.js</code> có thể thực thi:

```bash
chmod +x ./hello.js
```

Và chạy:

```bash
./hello.js
```

``` bash 
Output
Server running at http://localhost:8080/
```

> **Chú ý:** Chạy một ứng dụng Node.js theo cách này sẽ block các lệnh khác cho đến khi ngừng ứng dụng bằng cách nhấn **Ctrl-C**.

Theo trình tự để kiểm tra ứng dụng, mở một terminal khác trên server của bạn và kết nối tới **localhost** với lệnh <code>curl</code>:

```bash
curl http://localhost:8080
```

Nếu thấy kết quả như bên dưới, có nghĩa là ứng dụng đang làm việc và lắng nghe trên đúng địa chỉ và cổng:

```bash
Output
Hello World
```

Nếu bạn không thấy kết quả như mong muốn, đảm bảo rằng ứng dụng Node.js đang chạy và đã cấu hình để lắng nghe trên địa chỉ và cổng mong đợi.

Khi bạn đảm bảo nó làm việc, ngừng ứng dụng bằng cách nhấn **Ctrl+C.**

## Cài đặt PM2
Bây giờ chúng ta sẽ cài đặt PM2, nó là một trình quản lý process cho các ứng dụng Node.js. PM2 cung cấp một cách dễ dàng để quản lý và [daemonize](http://software.clapper.org/daemonize/) các ứng dụng (chạy các ứng dụng trong background như một dịch vụ).

Chúng ta sẽ sử dụng <code>npm</code>, một trình quản lý package cho các mô-đun của Node, nó đã được cài đặt cùng với Node.js, để cài đặt PM2 trên server. Sử dụng lệnh:

```bash
sudo npm install -g pm2
```

Tùy chọn <code>-g</code> nói với <code>npm</code> cài đặt mô-đun toàn cục (globally), để nó có sẵn trên toàn hệ thống.

## Quản lý ứng dụng với PM2
PM2 rất đơn giản và dễ sử dụng. Chúng ta sẽ đề cập một vài cách sử dụng cơ bản của PM2.

### Khởi động ứng dụng
Lệnh đầu tiên bạn muốn sử dụng là <code>pm2 start</code> để chạy ứng dụng của bạn <code>hello.js</code>, trong background:

```bash
pm2 start hello.js
```

Lệnh này cũng thêm ứng dụng của bạn tới danh sách các process của PM2, cái sẽ được in ra màn hình mỗi khi khởi động ứng dụng:

```bash
Output
[PM2] Spawning PM2 daemon
[PM2] PM2 Successfully daemonized
[PM2] Starting hello.js in fork_mode (1 instance)
[PM2] Done.
┌──────────┬────┬──────┬──────┬────────┬─────────┬────────┬─────────────┬──────────┐
│ App name │ id │ mode │ pid  │ status │ restart │ uptime │ memory      │ watching │
├──────────┼────┼──────┼──────┼────────┼─────────┼────────┼─────────────┼──────────┤
│ hello    │ 0  │ fork │ 3524 │ online │ 0       │ 0s     │ 21.566 MB   │ disabled │
└──────────┴────┴──────┴──────┴────────┴─────────┴────────┴─────────────┴──────────┘
 Use `pm2 show <id|name>` to get more details about an app
```

Như bạn có thể thấy, PM2 tự động gán một **App name** (dựa trên tên tập tên không có phần mở rộng <code>.js</code>) và một PM2 **id**. PM2 cũng hiển thị các thông tin khác chẳng hạn như **PID** của process, trạng thái hiện tại của nó và bộ nhớ sử dụng.

Các ứng dụng đang chạy với PM2 sẽ tự động khởi động lại nếu ứng dụng crashes hay killed, nhưng cần thực hiện thêm một bước để ứng dụng chạy lúc hệ thống khởi động (boot hay reboot). May mắn, PM2 cung cấp một cách dễ dàng để làm điều này, đó là lệnh <code>starup</code>.

Lệnh <code>startup</code> sẽ tạo và cấu hình một script khởi động để chạy PM2 và quản lý các process trên server khi khởi động:

```bash
pm2 startup systemd
```

Dòng cuối cùng của kết quả được in ra sẽ bao gồm một lệnh mà bạn phải chạy với quyền superuser:

```bash
Output
[PM2] Init System found: systemd
[PM2] You have to run this command as root. Execute the following command:
sudo env PATH=$PATH:/usr/bin /usr/lib/node_modules/pm2/bin/pm2 startup systemd -u sammy --hp /home/sammy
```

Chạy lệnh đã được tạo ra (dòng cuối cùng ở trên, nhưng với username thay vì <code>sammy</code>) để thiết lập PM2 khởi động cùng hệ thống:

```bash
sudo env PATH=$PATH:/usr/bin /usr/lib/node_modules/pm2/bin/pm2 startup systemd -u sammy --hp /home/sammy
```

Lệnh này sẽ tạo ra một **unit** systemd chạy <code>pm2</code> cho người dùng của bạn khi khởi động hệ thống. Bạn có thể kiểm tra trạng thái của systemd unit với <code>systemctl</code>:

```bash
systemctl status pm2-sammy
```

Để biết tổng quan về hệ thống, đọc [Những thành phần quan trọng của hệ thống: Làm việc với các Service, Unit và Journal](https://www.digitalocean.com/community/tutorials/systemd-essentials-working-with-services-units-and-the-journal).

### Các cách sử dụng khác (Không bắt buộc)
PM2 cung cấp nhiều lệnh cho phép bạn quản lý hoặc tìm kiếm thông tin về các ứng dụng của bạn. Chú ý rằng chạy lệnh <code>pm2</code> mà không có bất kỳ tham số nào sẽ hiển thị trang help, bao gồm ví dụ sử dụng, nó sẽ chi tiết hơn hướng dẫn này.

Dừng một ứng dụng với lệnh này (chỉ định <code>App name</code> hoặc <code>id</code>):

```bash
pm2 stop app_name_or_id
```

Khởi động một ứng dụng với lệnh này (chỉ định <code>App name</code> hoặc <code>id</code>):

```bash
pm2 restart app_name_or_id
```

Danh sách các ứng dụng đang được quản lý bởi PM2 cũng có thể được liệt kê vói lệnh <code>list</code>:

```bash
pm2 list
```

Nhiều thông tin hơn về một ứng dụng cụ thể có thể được tìm thấy bằng cách sử dụng lệnh <code>info</code> (chỉ định <code>App name</code> hoặc <code>id</code>):

```bash
pm2 info example
```

Theo dõi một PM2 process có thể thực hiện với lệnh <code>monit</code>. Lệnh này sẽ hiển thị các trạng thái của ứng dụng, CPU, và bộ nhớ sử dụng:

```bash
pm2 monit
```

Bây giờ ứng dụng Node.js của bạn đã chạy, và được quản lý bởi PM2, hãy thiết lập reverse proxy.

## Thiết lập Nginx như một Reverse Proxy Server
Bây giờ ứng dụng của bạn đã chạy và lắng nghe trên **localhost**, bạn cần thiết lập một cách để người dùng của bạn có thể truy cập tới nó. Chúng ta sẽ thiết lập Nginx web server như một reverse proxy cho mục đích này.

![](/img/node_diagram.png)

Trong phần điều kiện bắt buộc, chúng ta đã thiết lập cấu hình Nginx trong file <code>/etc/nginx/sites-available/default</code>. Mở file để chỉnh sửa:

```bash
sudo nano /etc/nginx/sites-available/default
```

Trong khối <code>server</code> bạn đã có sẵn một khối <code>location /</code>. Thay thế nội dung của khối với cấu hình sau. Nếu ứng dụng của bạn lắng nghe ở một cổng khác, cập nhật với cổng bạn sử dụng.

```bash
. . .
    location / {
        proxy_pass http://localhost:8080;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```
<figcaption>/etc/nginx/sites-available/default</figcaption>

Các cấu hình server respond các request tại root của nó. Giả sử server đã sẵn sàng tại <code>example.com</code>, truy cập <code>https://example.com/</code> thông qua trình duyệt web sẽ gửi request tới <code>hello.js</code>, lắng nghe trên cổng <code>8080</code> tại **localhost**.

Bạn có thể thêm các khối <code>location</code> tới cùng khối <code>server</code> để cung cấp truy cập tới các ứng dụng khác trên cùng server. Ví dụ, nếu bạn đang chạy một ứng dụng Node.js khác trên cổng 8081, bạn có thể thêm khối <code>location</code> để cho phép truy cập tới nó thông qua <code>http://example.com/app2</code>:

```bash
location /app2 {
        proxy_pass http://localhost:8081;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
```
<figcaption>/etc/nginx/sites-available/default - Không bắt buộc</figcaption>

Khi bạn đã hoàn thành việc thêm các khối <code>location</code> cho các ứng dụng của mình, lưu và thoát.

Đảm bảo không có bất kỳ lỗi cú pháp nào bằng cách ngõ:

```bash
sudo nginx -t
```

Tiếp theo, khởi động Nginx:

```bash 
sudo systemctl restart nginx
```

Giả sử rằng ứng dụng Node.js của bạn đang chạy, nó và Nginx đã cấu hình chính xác, bạn sẽ có khả năng truy cập tới ứng dụng của bạn thông qua Nginx reverse proxy. Thử bằng cách truy cập tới URL của server (là địa chỉ IP public hoặc domain name).

## Kết luận
Chúc mừng! Bây giờ ứng dụng Node.js của bạn đang chạy đằng sau một Nginx reverse proxy trên server Ubuntu 16.04. Thiết lập reverse proxy đủ linh hoạt để cung cấp cho người dùng của bạn truy cập tới các ứng dụng khác hay các nội dung web tĩnh bạn muốn chia sẻ. Chúc may mắn với việc phát triển Node.js của bạn.