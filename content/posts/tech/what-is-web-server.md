+++
date = "2018-04-28T13:59:46+02:00"
tags = ["web"]
title = "Web server là gì?"
description = "Trong bài viết này chúng ta sẽ tìm hiểu web server là gì? chúng làm việc như thế nào? và tại sao chúng lại quan trọng?"
keywords = ""
image = "/img/http_request_response.png"
draft = false
+++

*Bài viết được dịch từ: [developer.mozilla.org](https://developer.mozilla.org/en-US/docs/Learn/Common_questions/What_is_a_web_server)*

Trong bài viết này chúng ta sẽ tìm hiểu web server là gì? chúng làm việc như thế nào? và tại sao chúng lại quan trọng?

**Yêu cầu:** Bạn nên biết cách [mạng Internet làm việc như thế nào](https://developer.mozilla.org/en-US/docs/Learn/Common_questions/How_does_the_Internet_work), và hiểu [sự khác nhau giữa trang web, web site, web server và search engine](https://developer.mozilla.org/en-US/docs/Learn/Common_questions/How_does_the_Internet_work).

**Mục tiêu:** Bạn sẽ học web server là gì và đạt được một hiểu biết chung về cách nó làm việc.

## Tóm lược
"Web server" có thể là phần cứng hoặc phần mềm, hoặc cả hai làm việc cùng nhau.

1. **Ở khía cạnh phần cứng**, một web server là một máy tính lưu trữ các tệp tin của một website (ví dụ: các tài liệu HTML, các tệp tin ảnh, CSS và các tệp tin JavaScript). Nó kết nối với mạng Internet và hỗ trợ trao đổi dữ liệu vật lý với các thiết bị kêt nối tới web.

2. **Ở khía cạnh phần mềm**, một web server bao gồm một số phần mềm kiểm soát cách người dùng truy cập các tệp tin được lưu trữ, ở mức tối thiểu là một *HTTP server*. Một HTTP server là một phần mềm hiểu được các URL (các địa chỉ web) và HTTP (giao thức trình duyệt của bạn sử dụng để xem các trang web).

Ở mức cơ bản nhất, bất cứ khi nào một trình duyệt cần một tệp tin được lưu trữ trên một web server, trình duyệt request (yêu cầu) tệp tin đó thông qua HTTP. Khi một request tới đúng web server (phần cứng), *HTTP server (phần mềm)* chấp nhận request, tìm tài liệu được yêu cầu, và gửi nó tới trình duyệt, cũng thông qua HTTP (nếu không tìm thấy một response [404](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/404) sẽ được trả lại).

![](https://techmaster.vn/fileman/Uploads/users/188/web-server.jpg)

Để xuất bản một website, bạn cần một static hoặc dynamic web server.

Một **static web server**, hay stack, bao gồm một máy tính (phần cứng) với một HTTP server (phần mềm). Chúng ta gọi nó là "static" bởi vì server gửi các tệp tin nó lưu trữ "nguyên vẹn" (as-is) tới trình duyệt của bạn.

Một **dynamic web server** bao gồm một static web server cộng với các phần mềm mở rộng, phổ biến nhất là một *application server (máy chủ ứng dụng)* và một *database*. Chúng ta gọi nó là "dynamic" bởi vì application server cập nhật các file được lưu trữ trước khi gửi chúng tới tình duyệt của bạn thông qua HTTP server.

Ví dụ, để tạo ra các trang web mà bạn nhìn thấy trong trình duyệt, application server có thể điền một HTML template với nội dung lấy từ database. Các site giống như MDN hay Wikipedia có hàng nghìn trang web, nhưng chúng không phải là các tài liệu HTML thực sự, mà chỉ là vài HTML template và một database khổng lồ. Thiết lập này làm cho nó dễ dàng hơn và nhanh hơn để bảo dưỡng và phân phối nội dụng.

## Tìm hiểu sâu hơn
Để lấy một trang web, trình duyệt của bạn gửi một request tới web server, nó sẽ tìm kiếm tệp tin được yêu cầu trên ổ đĩa. Khi tìm thấy tệp tin, server đọc nó, xử lý nếu cần, và gửi nó tới trình duyệt. Hãy xem xét các bước này chi tiết hơn.

### Lưu trữ các tệp tin (Hosting files)
Đầu tiên, một web server phải lưu trữ các tệp tin của website, đó là các tài liệu HTML và các tài nguyên liên quan đến nó, bao gồm các ảnh, tệp tin CSS, JavaScript, fonts và videos.

Về mặt kỹ thuật, bạn có thể lưu trữ tất cả các tệp tin trên máy tính của mình, nhưng có nhiều lợi ích hơn khi lưu trữ chúng trên một server riêng biệt:

- luôn luôn sẵn sàng (up and running)

- luôn luôn kết nối tới mạng Internet

- có một địa chỉ IP cố định

- được bảo dưỡng bởi nhà cung cấp

Vì tất cả những lý do này, tìm một nhà cung cấp máy chủ (hosting provider) tốt là một phần quan trọng trong việc xây dựng website của bạn. Tìm hiễu kỹ dịch vụ mà các công ty cung cấp và chọn một cái phù hợp với nhu cầu và ngân sách của bạn (có khá nhiều lựa chọn từ miễn phí cho tới hàng ngàn dollar một tháng). Bạn có thể tìm hiểu chi tiết hơn trong [bài viết này](https://developer.mozilla.org/en-US/docs/Learn/Common_questions/How_much_does_it_cost#Hosting).

Khi bạn đã chọn được một nhà cung cấp web hosting, bạn cần [upload các file của bạn tới web server của mình](https://developer.mozilla.org/en-US/docs/Learn/Upload_files_to_a_web_server).

### Giao tiếp thông qua HTTP
Thứ hai, một web server hỗ trợ HTTP (Giao thức truyền phát siêu văn bản - Hypertext Transfer Protocol). Như tên gọi, HTTP là cách truyền các siêu văn bản - hypertext (ví dụ: các tài liệu web) giữa hai máy tính.

Một giao thức là một tập hợp các quy tắc để kết nối giữa hai máy tính. HTTP là một giao thức textual, stateless.

**Textual**

Tất cả các lệnh là văn bản thuần túy (plain-text) và con người có thể đọc được.

**Stateless**

Cả server và client đều không nhớ các kết nối trước đó. Ví dụ, nếu chỉ có HTTP, một server không thể nhớ mật khẩu bạn đã nhập hoặc bước nào bạn đã làm trong một giao dịch. Bạn cần một application server cho những nhiệm vụ như vậy. (Chúng tôi sẽ đề cập đến công nghệ này trong một bài viết khác).

HTTP cung cấp các quy tắc rõ ràng, về cách client và server giao tiếp với nhau. Chúng ta sẽ nói về HTTP trong [một bài viết khác](https://developer.mozilla.org/en-US/docs/Web/HTTP). Bây giờ, bạn chỉ cần biết những thứ này:

- Chỉ *client* có thể tạo các HTTP request tới *các server*. Các server chỉ có thể *đáp trả* HTTP request của *client*.

- Khi yêu cầu một tệp tin thông qua HTTP, client phải cung cấp URL của tệp tin.

- Web server *phải trả lời mọi* HTTP request, ít nhất với một thông điệp lỗi (error message).

![](https://techmaster.vn/fileman/Uploads/users/188/mdn-404.jpg)

Trên một web server, HTTP server chịu trách nhiệm xử lý và trả lời các request đến.

1. Khi nhận một request, một HTTP server sẽ kiểm tra xem URL được yêu cầu có khớp với một file hiện có không.

2. Nếu có, web server gửi nội dung tệp tin cho trình duyệt. Nếu không, một application server sẽ tạo ra file cần thiết.

3. Nếu không thể xử lý, web server trả lại một thông điệp lỗi tới trình duyệt, phổ biến nhất là "404 Not Found". (Đó là lỗi khá phổ biến, cái mà nhiều nhà thiết kế web dành khá nhiều thời gian để thiết kế [các trang 404 error](http://www.404notfound.fr/)).

## Nội dung static vs dynamic
Nói chung, một server có thể phục vụ cả nội dung static hoặc dynamic. "Static" có nghĩa là "được phục vụ nguyên vẹn" (served as-is). Các static website là cách dễ dàng nhất để thiết lập, vì thế chúng tôi gợi ý bạn tạo một static site trước tiên.

"Dynamic" có nghĩa là server xử lý nội dung hoặc thậm chí tạo ra chúng với dữ liệu từ database. Giải pháp này linh hoạt hơn, nhưng stack kỹ thuật khó hơn, làm cho việc xây dựng website trở lên phức tạp hơn.

Lấy ví dụ trang web bạn đang đọc hiện nay. Một web server lưu trữ (hosting) nó, có một application server lấy nội dung bài viết từ một database, định dạng nó, đẩy nó vào trong HTTP template, và gửi kết quả cho bạn. Trong trường hợp này, application server được gọi là [Kuma](https://developer.mozilla.org/en-US/docs/MDN/Kuma) và được xây dựng với [Python](https://www.python.org/) (sử dụng framework [Django](https://www.djangoproject.com/)). Mozilla team xây dựng Kuma cho nhu cầu riêng của MDN, nhưng nhiều ứng dụng tương tự được xây dựng trên nhiều công nghệ khác.

Có rất nhiều application server và thật khó để gợi ý cụ thể. Một vài application server phục vụ các loại website cụ thể như: blogs, wikis, hay e-shop, ... được gọi là CMSs (các hệ quản trị nội dung - content management systems). Nếu bạn đang xây dựng một dynamic website, dành thời gian chọn một công cụ phù hợp với nhu cầu của bạn. Trừ khi bạn muốn học cách lập trình web server (một điều rất thú vị), bạn không cần tạo ra một application server của riêng mình. Điều đó chỉ là phát minh lại bánh xe.

## Bước tiếp theo
Bây giờ khi đã quen thuộc với web server, bạn có thể:

- đọc [bao nhiêu chi phí để làm điều gì đó trên web](https://developer.mozilla.org/en-US/docs/Learn/Common_questions/How_much_does_it_cost).

- học nhiều hơn về [các phần mềm bạn cần để tạo một website](https://developer.mozilla.org/en-US/docs/Learn/Common_questions/What_software_do_I_need).

- làm một vài thứ thực tế như [làm thế nào để upload các file tới một web server](https://developer.mozilla.org/en-US/docs/Learn/Common_questions/Upload_files_to_a_web_server).
