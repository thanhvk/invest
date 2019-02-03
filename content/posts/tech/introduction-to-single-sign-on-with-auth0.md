+++
date = "2018-05-09T13:59:46+02:00"
tags = ["authentication"]
title = "Giới thiệu Single Sign On với Auth0"
description = ""
keywords = "sso, authentication, authorization, auth, jwt, json web token"
image = "/img/"
draft = true
+++

*Bài viết được dịch từ: [auth0.com](https://auth0.com/docs/sso/current/introduction)*

## Single Sign On là gì?
Single Sign On (SSO) xảy ra khi người dùng đăng nhập vào một ứng dụng và sau đó tự động đăng nhập vào các ứng dụng khác, bất kể nền tảng (platform), công nghệ hay domain mà họ đang sử dụng. Vì người dùng chỉ cần đăng nhập một lần duy nhất nên nó được đặt tên là Single Sign On.

Cách đăng nhập vào các sản phẩm của Google như Gmail, YouTube, Google Analytics,... là một ví dụ về SSO. Người dùng chỉ cần đăng nhập vào một trong những sản phẩm của Google, sẽ tự động được đăng nhập vào các sản phẩm còn lại của họ.

Single Sign On thường sử dụng một Center Service, cái phối hợp Single Sing On giữa nhiều ứng dụng. Trong ví dụ của Google, center service này là [Google Accounts](https://accounts.google.com/). Khi người dùng đăng nhập lần đầu, Google Account tạo một cookie, cái gắn liền với người dùng khi họ điều hướng tới dịch vụ khác của Google. Quy trình xử lý sẽ như dưới đây:

1. Người dùng truy cập sản phẩm đầu tiên của Google.
2. Người dùng nhận một cookie được tạo bởi Google Accounts.
3. Người dùng điều hướng tới sản phẩm khác của Google.
4. Người dùng lại được chuyển hướng tới Google Acccounts.
5. Google Accounts thấy rằng người dùng có một cookie liên quan tới xác thực, vì thế nó chuyển hướng người dùng tới sản phẩm đã được yêu cầu.

## Single Log Out là gì?
Single Logout là quá trình bạn kết thúc session cảu mỗi ứng dụng hay dịch vụ mà người dùng đã đăng nhập. Hãy tiếp tục với ví dụ về Google, nếu bạn đăng xuất từ Gmail, bạn cũng sẽ đăng xuất YouTube, Google Analytics,...

Có tối đa 3 tầng session cho một người dùng với SSO.

- Một session từ một Identity Provider chẳng hạn như Google, Facebook hay một SAML Identity Provider cho doanh nghiệp.
- Một session từ Auth0 nếu cờ SSO ở trên được bật.
- Một session được duy trì bởi ứng dụng.

Xem [tài liệu Logout URL](https://auth0.com/docs/logout) để biết thêm thông tin về việc kết thúc 2 session đầu tiên trong danh sách ở trên.

## Tổng quan về cách SSO làm việc với Auth0

## SSO với Native Platform

## Tham khảo
Linh bài viết gốc https://auth0.com/docs/sso/current/introduction
