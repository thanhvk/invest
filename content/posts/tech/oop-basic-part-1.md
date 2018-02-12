+++
date = "2018-01-26T13:50:46+02:00"
tags = ["oop", "java"]
title = "OOP cơ bản (Phần 1)"
description = "Bạn có thể \"lắp ráp\" một phần mềm bằng cách chọn một bộ phận ở đây, một bộ phận ở kia, và mong đợi chương trình chạy?"
image = "/img/OOP_Objects_1.png"
+++

*Bài viết được dịch từ: [ntu.edu.sg](https://www.ntu.edu.sg/home/ehchua/programming/java/J3a_OOPBasics.html)*

## Tại sao lại là OOP?

Giả sử bạn muốn tự lắp cho mình một chiếc máy tính cá nhân, bạn vào một cửa hàng phần cứng và chọn bo mạch chủ, bộ xử lý, RAM, ổ đĩa cứng, vỏ case máy tính, bộ nguồn và lắp chúng lại với nhau. Bạn bật nguồn, và máy chạy. Bạn không cần phải lo lắng CPU là 1 hoặc 6 lõi; bo mạch chủ là 1, 4 hoặc 6 lớp; ổ cứng có 4 tấm hay 6 tấm, đường kính 3 inch hay 5 inch; RAM được sản xuất tại Nhật Bản hay Hàn Quốc, vân vân. Bạn chỉ cần lắp chúng lại với nhau và chờ máy chạy. Tất nhiên, bạn phải đảm bảo rằng các thiết bị phải tương thích với nhau, nghĩa là bạn chọn một ổ cứng IDE chứ không phải là một ổ cứng SCSI, vì bo mạch chủ của bạn chỉ hỗ trợ IDE; bạn phải chọn RAM với tốc độ chính xác, v.v. Tuy nhiên, không khó để thiết lập một chiếc máy tính từ các thành phần phần cứng. 

Tương tự, một chiếc xe được lắp ráp từ các bộ phận khác nhau, chẳng hạn như khung gầm, cửa ra vào, động cơ, bánh xe, phanh và truyền dẫn. Các thành phần có thể tái sử dụng được, ví dụ: bánh xe có thể được sử dụng trong nhiều xe ô tô (có cùng đặc điểm). 

Phần cứng, chẳng hạn như máy tính và ô tô, được lắp ráp từ các bộ phận, những thứ có thể tái sử dụng. 

Còn phần mềm thì như thế nào? Bạn có thể "lắp ráp" một phần mềm bằng cách chọn một bộ phận ở đây, một bộ phận ở kia, và mong đợi chương trình chạy? Câu trả lời rõ ràng KHÔNG! Không giống như phần cứng, rất khó để "lắp ráp" một ứng dụng từ các thành phần phần mềm. Kể từ khi máy tính ra đời 70 năm trước, chúng ta đã viết hàng tấn các chương trình. Tuy nhiên, đối với mỗi ứng dụng mới, chúng ta phải phát minh lại bánh xe và viết chương trình từ đầu! 

Tại sao phải phát minh lại bánh xe? Tại sao phải viết lại code? Bạn có thể viết code tốt hơn các chuyên gia?

## Các ngôn ngữ hướng thủ tục

![](https://www.ntu.edu.sg/home/ehchua/programming/java/images/OOP_CFunction.png)

Các ngôn ngữ lập trình hướng thủ tục (như C, Fortran, Cobol và Pascal) gặp phải một số hạn chế trong việc tạo ra *các thành phần có thể tái sử dụng*: 

1. Các chương trình hướng thủ tục được tạo thành từ các function. Function có *ít khả năng tái sử dụng*. Rất khó để sao chép một function từ một chương trình và sử dụng lại trong một chương trình khác bởi vì function có thể tham chiếu tới các biến toàn cục và các function khác. Nói cách khác, các function không được đóng gói tốt như một đơn vị có thể tái sử dụng được. 
2. Các ngôn ngữ hướng thủ tục không phù hợp với *sự trừu tượng cấp cao* để giải quyết các vấn đề trong cuộc sống thực. Ví dụ, các chương trình C sử dụng các cấu trúc như if-else, for-loop, array, method, pointer, những vấn đề ở cấp độ thấp và khó trừu tượng như hệ thống Quản lý Quan hệ Khách hàng (CRM) hoặc trò chơi bóng đá trên máy tính. 

Các ngôn ngữ hướng thủ tục truyền thống tách biệt cấu trúc dữ liệu (các biến) và các thuật toán (các function).

```
Vào đầu những năm 1970, Bộ Quốc phòng Hoa Kỳ (DoD) đã giao cho một lực lượng đặc biệt nhiệm vụ điều tra lý do tại sao ngân sách CNTT của luôn luôn nằm ngoài tầm kiểm soát; nhưng không đem lại nhiều lợi ích. Kết quả điều tra là: 

1. 80% ngân sách dành cho phần mềm (với 20% còn lại là phần cứng). 
2. Hơn 80% ngân sách cho phần mềm đã được dùng để bảo trì (chỉ còn lại 20% cho phát triển phần mềm mới). 
3. Các thành phần phần cứng có thể tái sử dụng cho các sản phẩm khác nhau, và không ảnh hưởng lẫn nhau. 
4. Phần mềm hướng thủ tục thường không có khả năng chia sẻ và không thể sử dụng lại được. Các lỗi phần mềm có thể ảnh hưởng đến các chương trình khác đang chạy trên máy tính. 

Đội đặc biệt đề xuất làm cho phần mềm hoạt động giống như phần cứng. DoD đã thay thế hơn 450 ngôn ngữ máy tính, được sử dụng để xây dựng các hệ thống của DoD, với một ngôn ngữ hướng đối tượng được gọi là Ada.
```

## Các ngôn ngữ lập trình hướng đối tượng

![](https://www.ntu.edu.sg/home/ehchua/programming/java/images/OOP_Objects.png)

Các ngôn ngữ lập trình hướng đối tượng (OOP) được thiết kế để xử lý những vấn đề đã nêu ở phần trên.

1. Đơn vị cơ bản của OOP là một class(lớp), đóng gói các thuộc tính tĩnh và hoạt phương thức trong một "box(hộp)" và chỉ định giao diện công cộng để sử dụng các box này. Vì các lớp được đóng gói tốt, nên dễ dàng tái sử dụng. Nói cách khác, OOP kết hợp các cấu trúc dữ liệu và các thuật toán của một thực thể phần mềm bên trong cùng một box(hộp). 
2. Ngôn ngữ OOP cho phép trừu tượng cao, để giải quyết các vấn đề trong cuộc sống thực. Các ngôn ngữ thủ tục truyền thống (như C và Pascal) buộc bạn phải suy nghĩ về cấu trúc của máy tính (ví dụ: bit bộ nhớ, byte, mảng, quyết định, vòng lặp) thay vì suy nghĩ về vấn đề bạn đang cố gắng giải quyết. Các ngôn ngữ OOP (như Java, C ++ và C #) cho phép bạn suy nghĩ về vấn đề cần giải quyết và sử dụng các đối tượng phần mềm để biểu diễn và trừu tượng các thực thể của vấn đề để giải quyết vấn đề.

![](https://www.ntu.edu.sg/home/ehchua/programming/java/images/OOP_SoccerGame.png)

Ví dụ: giả sử bạn muốn viết một trò chơi bóng đá trên máy tính (cái mà tôi cho là một ứng dụng phức tạp). Nó khá khó để mô hình các trò chơi theo ngôn ngữ hướng thủ tục. Nhưng bằng cách sử dụng ngôn ngữ OOP, bạn có thể dễ dàng mô hình hóa chương trình cho phù hợp với "những thứ thực tế" xuất hiện trong các trò chơi bóng đá. 

- Player: các thuộc tính bao gồm tên, số, vị trí trên sân...; các hoạt động bao gồm chạy, nhảy, đá banh,...
- Trái bóng
- Sân bóng
- Khán giả
- Thời tiết
 
Quan trọng nhất là một số các class(lớp) này (như Bóng và Khán giả) có thể được sử dụng lại trong một ứng dụng khác, ví dụ: trò chơi bóng rổ trên máy tính, chỉ cần sửa rất ít hoặc không cần sửa đổi.

## Lợi thế của OOP

Các ngôn ngữ hướng thủ tục tập trung vào các function, với function như là đơn vị cơ bản. Trước tiên, bạn cần xác định các function và sau đó suy nghĩ về việc làm thế nào để biểu diễn dữ liệu. Các ngôn ngữ hướng đối tượng tập trung vào các thành phần mà người dùng có thể nhận thức, với các đối tượng như là đơn vị cơ bản. Bạn xác định tất cả các đối tượng bằng cách đặt tất cả các dữ liệu và phương thức mô tả sự tương tác của người dùng với dữ liệu. 

Kỹ thuật hướng đối tượng có nhiều lợi ích: 

- Dễ dàng thiết kế phần mềm như bạn có thể nghĩ trong thực tế chứ không phải là các bit của máy và byte. Bạn đang xử lý các khái niệm cấp cao và trừu tượng. Dễ dàng thiết kế dẫn giúp việc phát triển phần mềm hiệu quả hơn. 
- Dễ bảo trì phần mềm: phần mềm hướng đối tượng dễ hiểu hơn, do đó dễ dàng kiểm tra, gỡ lỗi và bảo trì. 
- Phần mềm có thể tái sử dụng: bạn không cần phải tiếp tục phát minh lại bánh xe và viết lại các chức năng tương tự cho các tình huống khác nhau. Cách nhanh nhất và an toàn nhất để phát triển một ứng dụng mới là sử dụng lại các mã hiện có các mã đã được thử nghiệm và chứng minh đầy đủ.