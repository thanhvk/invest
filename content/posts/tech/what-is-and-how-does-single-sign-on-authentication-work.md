+++
date = "2018-05-21T13:59:46+02:00"
tags = ["authentication"]
title = "Xác thực Single Sign On là gì và nó hoạt động như thế nào?"
description = "Trong bài viết này bạn sẽ tìm hiểu về xác thực Single Sign On và cách sử dụng nó cho các ứng dụng web của bạn"
keywords = "sso, authentication, authorization, auth, jwt, json web token"
image = "/img/single-sign-on.png"
draft = false
+++

*Bài viết được dịch từ: [auth0.com](https://auth0.com/blog/what-is-and-how-does-single-sign-on-work/)*

Xác thực Single Sign On (SSO) ngày càng trở nên cần thiết hơn bao giờ hết. Ngày nay, hầu hết các trang web đều yêu cầu xác thực để truy cập tới các tính năng và nội dung của nó. Với số lượng các trang web và dịch vụ đang tăng lên, một hệ thống đăng nhập tập trung (centralized login system) trở nên cần thiết. Trong 2 phần của loạt bài này chúng ta sẽ tìm hiểu cách **xác thực SSO (SSO authentication)** được triển khai cho các ứng dụng và ví dụ sử dụng OpenID Connect (trong phần 2).

## Các thuật ngữ
Khái niệm xác thực tập trung hay liên kết danh tính điện tử được biết đến như là *federated identity (liên kết danh tính)*. Các hệ thống federated identity xử lý các vấn đề:

- Xác thực (authentication)
- Phân quyền (authorization)
- Trao đổi thông tin người dùng
- Quản lý người dùng

## Xác thực Single Sign On (SSO)
Sớm hay muộn thì các team phát triển web cũng sẽ phải đối mặt với một vấn đề: bạn đã phát triển một ứng dụng tại domain X và bây giờ bạn muốn phát triển một ứng dụng mới tại domain Y sử dụng các thông tin đăng nhập giống với domain X. Trong thực tế, bạn muốn nhiều hơn thế: nếu người dùng đã đăng nhập vào domain X họ cũng sẽ tự động đăng nhập vào domain Y. Đây là cái SSO giải quyết.

![](https://cdn.auth0.com/blog/sso/non-sso-scenario.png)

Giải pháp cho kịch bản ở trên là **chia sẻ thông tin session** giữa các domain. Tuy nhiên, vì lý do bảo mật, trình duyệt buộc phải tuân theo chính sách *same origin policy*. Nội dung của chính sách này là **chỉ những người tạo ra mới có quyền truy cập** các cookie (hay bất kỳ dữ liệu lưu trữ cục bộ nào). Nói cách khác, domain X không thể truy cập các cookie từ domain Y và ngược lại. Đây chính là vấn đề mà SSO giải quyết: chia sẻ thông tin session trên nhiều domain khác nhau.

![](https://cdn.auth0.com/blog/sso/same-origin-policy-forbids-this.png)

Các giao thức SSO chia sẻ thông tin session theo nhiều cách khác nhau, nhưng những thứ cơ bản thì giống nhau đó là: có một **central domain (domain trung tâm)** để thực hiện xác thực (authentication) và sau đó **session được chia sẻ** với các domain khác theo nhiều cách. Ví dụ, center domain có thể tạo một JSON Web Token đã được ký (được mã hóa sử dụng JWE). Token này có thể được truyền tới client và được sử dụng để xác thực người dùng cho domain hiện tại cũng như bất kỳ domain nào khác. Token có thể truyền tới domain gốc bằng cách điều hướng và chứa tất cả các thông tin cần thiết để xác minh người dùng cho domain đang yêu cầu xác thực. Khi token đã được ký, thì nó không thể bị chỉnh sửa bởi bất kỳ client nào.

![](https://cdn.auth0.com/blog/sso/using-central-auth-domain.png)

Bất cứ khi nào người dùng tới một domain yêu cầu phải xác thực, anh ta hay cô ta sẽ được chuyển đến domain xác thực (authentication domain). Nếu người dùng đã đăng nhập tại domain xác thực, anh ta hay cô ta sẽ ngay lập tức được chuyển hướng trở lại domain gốc với token để xác thực các request tiếp theo.

![](https://cdn.auth0.com/blog/sso/typical-sso-v2.png)

## Các giao thức khác nhau
Nếu bạn đã đọc về SSO online, chắc chắn bạn sẽ biết rằng có rất nhiều cách để triển khai SSO như: OpenID Connect, Facebook Connect. SAML, Microsoft Account (trước kia là Passport),... Lời khuyên của chúng tôi là chọn bất kỳ cái nào mà bạn cảm thấy đơn giản và dễ dàng nhất để thực hiện. Ví dụ, SAML tập trung sâu vào các doanh nghiệp, vì thế trong một số trường hợp nó là lựa chọn hợp lý nhất. Nếu bạn cần kết hợp nhiều hơn một giải pháp, đừng lo lắng: có nhiều framewok cho phép kết hợp nhiều giải pháp SSO khác nhau. Một trong số các framework đó là AuthO.

## Kết luận
Các hệ thống phân tán (decentralized system) ngày càng trở lên phổ biến và xác thực là một khía cạnh quan trọng của tất cả chúng. SSO giải quyết một vấn đề lớn: làm thế nào để quản được số lượng người dùng đang tăng lên trên toàn bộ hệ thống gồm nhiều ứng dụng và dịch vụ. Các framework chẳng hạn như OpenID Connect và các dịch vụ chẳng hạn như Auth0 làm cho việc tích hợp Single Sign On vào các ứng dụng mới hoặc đã có của bạn trở nên dễ dàng hơn nhiều. Nếu bạn đang triển khai xác thực trên một ứng dụng hay dịch vụ mới hãy xem xét tích hợp SSO.

## Tham khảo
Linh bài viết gốc https://auth0.com/blog/what-is-and-how-does-single-sign-on-work/
