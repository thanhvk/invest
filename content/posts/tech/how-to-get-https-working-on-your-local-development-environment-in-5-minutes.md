+++
date = "2018-04-10T13:59:46+02:00"
tags = ["https, openSSL"]
title = "Làm thế nào để HTTPS làm việc trên local trong 5 phút?"
description = "Chúng tôi đã quyết định bảo mật các endpoint AWS Elastic Load Balancer với HTTPS và tôi rơi vào tình huống"
keywords = "openSSL, certificate, https, localhost, SSL"
image = "/img/http-to-https-Image.png"
draft = false
+++

*Bài viết được dịch từ: [medium.freecodecamp.org](https://medium.freecodecamp.org/how-to-get-https-working-on-your-local-development-environment-in-5-minutes-7af615770eec)*

![](https://cdn-images-1.medium.com/max/800/1*8XwjYNPlrj0paEvIjn0Dcw.png)

Ngày nay, hầu như bất kỳ trang web nào bạn nghé thăm đều được bảo mật bằng HTTPS. Nếu bạn vẫn chưa làm, thì hãy làm điều đó. Bảo mật server của bạn với HTTPS cũng có nghĩa là bạn không thể gửi các request tới server này từ một server không được bảo mật bằng HTTPS. Điều này đặt ra một vấn đề cho các lập trình viên những người sử dụng một môi trường phát triển local bởi vì tất cả chúng đều chạy trên <code>http://localhost</code>.

Trong trường hợp của mình, chúng tôi đã quyết định bảo mật các endpoint AWS Elastic Load Balancer với HTTPS. Tôi rơi vào tình huống là các request từ môi trường phát triển trên local của mình tới các enpoint này bị từ chối.

Google search, tôi đã tìm ra nhiều bài viết với hướng dẫn chi tiết cách thức triển khai HTTPS trên <code>localhost</code>. Nhưng không có hướng dẫn nào làm việc ngay cả khi tôi đã làm theo một cách cẩn thận. Chrome luôn luôn ném ra một lỗi <code>NET::ERR_CERT_COMMON_NAME_INVALID</code>.

![](https://cdn-images-1.medium.com/max/800/1*cQyGAORXHxsrhs5KRRBOgQ.png)

## Vấn đề
Tất cả các hướng dẫn tôi tìm thấy chỉ đúng vào thời điểm viết.

Sau khi Googling, tôi khám phá ra lý do chứng chỉ local của tôi bị từ chối là vì [Chrome không còn hỗ trợ commonName trong các chứng chỉ](https://groups.google.com/a/chromium.org/forum/m/#!topic/security-dev/IGT2fLJrAeo), mà yêu cầu một subjectAltName từ tháng 01/2017.

## Giải pháp 
Chúng ta sẽ sử dụng OpenSSL để tạo ra tất cả các chứng chỉ cần thiết.

### Bước 1: chứng chỉ root SSL
Đây là bước đầu tiên để tạo một chứng chỉ Root Secure Sockets Layer (SSL). Chứng chỉ root này có thể được sử dụng để ký cho bất kỳ chứng chỉ nào bạn tạo cho mỗi domain khác nhau. Nếu bạn chưa quen với hệ sinh thái SSL, [đây](https://support.dnsimple.com/articles/what-is-ssl-root-certificate/) là một bài viết hay giới thiệu về các chứng chỉ Root SSL.

Tạo ra một khóa RSA-2048 và lưu nó trong tệp tin <code>rootCA.key</code>. Tệp tin này sẽ được sử dụng như khóa để tạo ra chứng chỉ Root SSL. Bạn sẽ được nhắc nhập pass phrase cái bạn sẽ cần nhập mỗi lần sử dụng khóa này để tạo chứng chỉ.

```bash
openssl genrsa -des3 -out rootCA.key 2048
```

Bạn có thể sử dụng khóa đã tạo để tạo một chứng chỉ Root SSL mới. Lưu nó trong một tệp tin là <code>rootCA.pem</code>. Chứng chỉ này sẽ có hiệu lực trong 1,024 ngày. Bạn có thể thay đổi nó thành số ngày bạn muốn. Bạn cũng có thể điền các thông tin không bắt buộc khác.

```bash
openssl req -x509 -new -nodes -key rootCA.key -sha256 -days 1024 -out rootCA.pem
```

![](https://cdn-images-1.medium.com/max/800/1*76xehIse7mPGF094ojiBBw.png)

### Bước 2: Tin tưởng chứng chỉ root SSL
Trước khi có thể sử dụng chứng chỉ Root SSL để bắt đầu cấp các chứng chỉ domain, còn có một bước nữa. Bạn cần nói với Mac tin tưởng chứng chỉ root của bạn và vì thế tất cả các chứng chỉ được cấp bởi nó cũng được tin tưởng.

Mở Keychain Access trên Mac và tới Certificates trong System keychain của bạn. Khi đó, import <code>rootCA.pem</code> sử dụng File > Import Items. Click đúp và chứng chỉ đã import và thay đổi: "When using this certificate" chọn **Always Trút** trong phần Trust.

Chứng chỉ của bạn sẽ trông giống như dưới đây nếu bạn làm đúng theo hướng dẫn.

![](https://cdn-images-1.medium.com/max/800/1*NWwMb0yV9ClHDj87Kug9Ng.png)

### Bước 3: chứng chỉ domain SSL
Chứng chỉ root SSL giờ có thể được sử dụng để cấp các chứng chỉ cho môi trường phát triển local của bạn được đặt tại <code>localhost</code>.

Tạo một tệp tin cấu hình OpenSSL <code>server.csr.cnf</code> để bạn có thể import các thiết lập khi tạo một chứng chỉ thay vì nhập từ command line.

```bash
[req]
default_bits = 2048
prompt = no
default_md = sha256
distinguished_name = dn

[dn]
C=US
ST=RandomState
L=RandomCity
O=RandomOrganization
OU=RandomOrganizationUnit
emailAddress=hello@example.com
CN = localhost
```

Tạo một tệp tin <code>v3.ext</code> để tạo một [chứng chỉ X509 v3](https://en.wikipedia.org/wiki/X.509). Chú ý cách chúng ta chỉ định <code>subjectAltName</code> ở đây:

```bash
authorityKeyIdentifier=keyid,issuer
basicConstraints=CA:FALSE
keyUsage = digitalSignature, nonRepudiation, keyEncipherment, dataEncipherment
subjectAltName = @alt_names

[alt_names]
DNS.1 = localhost
```

Tạo một khóa chứng chỉ cho <code>localhost</code> sử dụng các thiết lập cấu hình được lưu trữ trong <code>server.csr.cnf</code>. Khóa này sẽ được lưu trữ trong <code>server.key</code>.

```bash
openssl req -new -sha256 -nodes -out server.csr -newkey rsa:2048 -keyout server.key -config <( cat server.csr.cnf )
```

Yêu cầu ký chứng chỉ được cấp thông qua chứng chỉ root SSL chúng ta đã tạo trước đó để tạo một chứng chỉ domain cho <code>localhost</code>. Đầu ra là một chứng chỉ gọi là <code>server.crt</code>.

```bash
openssl x509 -req -in server.csr -CA rootCA.pem -CAkey rootCA.key -CAcreateserial -out server.crt -days 500 -sha256 -extfile v3.ext
```

![](https://cdn-images-1.medium.com/max/800/1*kulsSyc0-ylsevP5eIlktA.png)

## Sử dụng chứng chỉ SSL của bạn
Bây giờ bạn đã sẵn sàng để bảo vệ <code>localhost</code> với HTTPS. Chuyển các tệp tin <code>server.key</code> và <code>server.crt</code> tới vị trí có thể truy cập trên serer của bạn và đính kèm chúng khi khởi động server.

Trong một ứng dụng Express, đây là cách bạn làm điều đó. Đảm bảo chỉ áp dụng cho môi trường local. **Không sử dụng cho môi trường production**.

```javascript
var path = require('path')
var fs = require('fs')
var express = require('express')
var https = require('https')

var certOptions = {
  key: fs.readFileSync(path.resolve('build/cert/server.key')),
  cert: fs.readFileSync(path.resolve('build/cert/server.crt'))
}

var app = express()

var server = https.createServer(certOptions, app).listen(443)
```

![](https://cdn-images-1.medium.com/max/800/1*89r7TnYG49V3zMoUnfOP7Q.png)

Tôi hi vọng rằng bạn sẽ thấy bài viết này hữu ích. Nếu bạn cảm thấy không thoải mái với việc chạy các lệnh ở trong bài viết này. Thì tôi đã tạo một script giúp bạn tạo các chứng chỉ nhanh chóng. Bạn có xem chi tiết trên [GiHub repo](https://github.com/dakshshah96/local-cert-generator/). 
