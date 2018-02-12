+++
date = "2018-01-26T13:50:46+02:00"
tags = ["blockchain", "crypto", "invest", "tech"]
title = "Blockchain làm việc như thế nào (Phần 1)"
description = "Nếu bạn muốn biết công nghệ blockchain là gì? nó làm việc như thế nào? và những tác động tiềm tàng của nó? mà không có bất kỳ thuật ngữ kỹ thuật nào, thì đây là bài viết dành cho bạn"
image = "/img/how_blockchain_work_1.jpeg"
+++

*Bài viết được dịch từ: [medium.com](https://medium.com/blockchain-review/how-does-the-blockchain-work-for-dummies-explained-simply-9f94d386e093)*

![blockchain ABC và 123](https://cdn-images-1.medium.com/max/720/1*FruX92C_kTF9GZi_gsHANA.jpeg)

*Blockchain ABC và 123*

Nếu bạn thực sự muốn tham gia vào thế giới thế giới blockchain và tiền kỹ thuật số, thì tôi khuyến khích bạn bắt đầu cuộc hành trình của mình bằng cách đọc 2 sách trắng (white paper) sau:

[Bitcoin: Một hệ thống tiền điện tử ngang hàng](https://bitcoin.org/bitcoin.pdf)

và

[Ethererum: Một nền tảng ứng dụng phân tán và hợp đồng thông minh thế hệ tiếp theo.](https://github.com/ethereum/wiki/wiki/White-Paper)

> Nếu bạn giống như nhiều người đang hỏi những câu  hỏi như: **"Tôi có một ý tưởng và tôi muốn biết dự án của mình có phù hợp với một blockchain hay không?" hoặc "Tôi đang muốn đầu tư và tôi muốn biết liệu token này hay token kia sẽ tăng giá trị hay không"**. Hãy đọc 2 sách trắng phía trên một lần nữa, cộng thêm bài viết dưới đây:

[Làm thế nào để thuê một lập trình viên blockchain](http://https://medium.com/@zachpiester/how-to-find-and-hire-a-blockchain-ethereum-and-hyperledger-developer-9d642c93e0e1)

Blockchain là một chủ đề nóng trong thời gian qua, nhưng với nhiều người, công nghệ này vẫn là một khái niệm khó nắm bắt. Khái niệm này sẽ trở nên đơn giản khi bạn hiểu được kiến trúc và những lý thuyết của nền kinh tế kĩ thuật số. Tại khoảnh khắc bạn hiểu ra, thế giới sẽ không bao giờ trông giống như trước đây nữa.

Nếu bạn muốn biết công nghệ blockchain là gì? nó làm việc như thế nào? và những tác động tiềm tàng của nó? mà không có bất kỳ thuật ngữ kỹ thuật nào, thì đây là bài viết dành cho bạn.

## Tóm tắt một giao dịch tiền tệ

Thông thường, khi thực hiện một giao dịch tiền tệ hoặc bắt kỳ thứ gì có giá trị, các cá nhân và doanh nghiệp thường dựa vào các trung gian như ngân hàng hoặc chính phủ để đảm bảo tính tin cậy và chắc chắn. Các trung gian thực hiện một loạt các nhiệm vụ quan trọng giúp xây dựng sự tin cậy trong quá trình giao dịch như xác thực và lưu trữ hồ sơ.

Sự cần thiết của các trung gian đặc biệt hiệu quả khi thực hiện một giao dịch kỹ thuật số. Bởi vì các tài sản kỹ thuật số như tiền, cổ phiếu và tài sản trí tuệ về bản chất là các tệp tin, chúng rất dễ sao chép. Điều này tạo ra cái được biết đến như là vấn đề chi tiêu gấp đôi (double spending problem) (hành vi chi tiêu cùng một đơn vị giá trị nhiều lần) vấn đề cho đến nay vẫn ngăn chặn việc giao dịch ngang hàng các tài sản kỹ thuật số.

Nhưng nếu có một cách để tiến hành các giao dịch này, mà không cần các trung gian thì sao? Vâng, Một công nghệ đã tồn tại để giúp cho điều này có thể thực hiện được đó chính là blockchain. Nhưng trước khi đi sâu vào cơ chế hoạt động của công nghệ cách mạng này, chúng ta hãy tìm hiểu một chút về bối cảnh.

## Blockchain vs Bitcoin - Mối liên hệ giữa chúng?

Bitcoin xuất hiện lần đầu tiên năm 2008 trong một sách trắng được viết bởi một cá nhân hoặc một nhóm người sử dụng biệt danh Satoshi Nakamoto. Sách trắng mô tả chi tiết một hệ thống tiền điện tử ngang hàng đột phá được gọi là Bitcoin cho phép các thanh toán trực tuyến (online payments) được chuyển trực tiếp mà không cần thông qua trung gian.

![how the blockchain transfers value](https://cdn-images-1.medium.com/max/720/0*oCGnf1hsNrDv8wdE.)

*Cách Blockchain chuyển giá trị (thông qua techliberation.com)*

Trong khi hệ thống thanh toán bitcoin được đề xuất là thú vị và sáng tạo, thì cơ chế về cách nó làm việc thực sự là một cuộc cách mạng. Một thời gian ngắn sau khi phát hành sách trắng, nó trở nên rõ ràng rằng công nghệ đột phá không phải là bản thân tiền kỹ thuật số, mà là công nghệ đằng sau nó: blockchain.

Mặc dù thường được gắn liền với Bitcoin, nhưng công nghệ blockchain còn có nhiều ứng dụng khác. Bitcoin là ứng dụng đầu tiên và được biết đến nhiều nhất. Trong thực thế, Bitcoin chỉ là một trong số hàng nghìn ứng dụng sử dụng công nghệ blockchain.

>**"Blockchain và Bitcoin cũng giống như internet và email. Một hệ thống điện tử lớn, trên đó bạn có thể xây dựng các ứng dụng. Và tiền kỹ thuật số chỉ là một trong số đó" Sally Davies, phóng viên công nghệ tại FT** 

Một ví dụ về sự phát triển và ứng dụng rộng rãi của blockchain, ngoài tiền kỹ thuật số, là sự phát triển của blockchain công cộng Ethereum, là một cách cách để thực hiện các hợp đồng thông minh.

## Cái gì bên dưới blockchain?

Hiểu đơn giản, một blockchain là một loại sổ cái phân phối (distributed ledger) hoặc một cơ sở dữ liệu phân tán (decentralized database) nó liên tục cập nhật các bản ghi kỹ thuật số/điện tử của những người sở hữu. Thay vì có một quản trị viên trung tâm giống như một cơ sở dữ liệu truyền thống (các ngân hàng, chính phủ, kế toán viên), một sổ cái phân phối có một mạng các cơ sở dữ liệu nhân bản, được đồng bộ hóa thông qua Internet và công khai với mọi người trong mạng. Các mạng blockchain có thể là mạng riêng tư (private) với các thành viên bị hạn chế tương tự một mạng intranet, hay công cộng (public) giống như mạng Internet, mà bất kỳ ai cũng có thể truy cập.

Khi một giao dịch kỹ thuật số được thực hiện, nó được nhóm lại trong một block (khối) được bảo vệ bằng thuật toán cùng với các giao dich khác đã xảy ra trong vòng 10 phút gần đây và gửi tới toàn bộ mạng. Các thợ đào (các thành viên trong mạng với các máy tính có cấu hình cao) sẽ xác nhận các giao dịch bằng cách giải quyết các vấn đề mã hóa phức tạp. Thợ đào đầu tiên giải quyết các vấn đề và xác nhận block sẽ nhận được phần thưởng. (Trong mạng blockchain của Bitcoin, một thợ đào sẽ nhận được phần thưởng là Bitcoin).

Khi một block đã được xác nhận nó sẽ được timespamp và thêm vào một chuỗi tuyến tính theo trình tự thời gian. Các block mới của các giao dịch đã được xác nhận sẽ được liên kết với các block cũ, tạo thành một chuỗi các block, cái cho thấy mọi giao dịch trong lịch sử của blockchain đó. Toàn bộ chuỗi sẽ được cập nhật tới tất cả các sổ cái trong mạng, cho phép mỗi thành viên có khả năng chứng minh ai sở hữu cái gì vào bất kỳ thời điểm nào.

>**"Một blockchain là một máy tính ma thuật, mà bất kỳ ai cũng có thể tải lên các chương trình và để các chương trình tự thực thi, nơi mà các trạng thái (states) hiện tại và trước đó của tất cả các chương trình luôn luôn được công khai, mang lại sự đảm bảo về tính bảo mật của nền kinh tế mật mã (crypto), các chương trình đang chạy trên chuỗi sẽ tiếp tục thực thi chính xác cách mà giao thức blockchain đã chỉ định." Vitalik Buterin - Sáng lập Ethereum**

Tính chất phân tán, mở và mã hóa của blockchain cho phép mọi người tin tưởng nhau và giao dịch ngang hàng, nó cũng làm cho các trung gian trở lên không cần thiết. Điều này cũng mang lại những lợi ích chưa từng có về bảo mật. Các vấn đề an ninh ảnh hưởng lớn tới các trung gian như các ngân hàng sẽ không thể xảy ra trên blockchain. Ví dụ, nếu một ai đó muốn hack vào một block cụ thể trong một blockchain, hacker sẽ không thể chỉ hack vào block đó mà phải hack toàn bộ các block trên blockchain đó. Và hacker cũng cần làm điều đó với tất cả các sổ cái trong mạng blockchain đó, với với số lượng có thể lên tới hàng triệu, cùng lúc.

## Blockchain sẽ thay đổi Internet và nền kinh tế toàn cầu?

Không có gì phải bàn cãi về điều đó. Blockchain là một công nghệ đột phá, sẽ thay đổi thế giới mà chúng ta đã biết. Nó không chỉ thay đổi cách chúng ta sử dụng Internet mà còn là một cuộc cách mạng cho nền kinh tế toàn cầu.

Bằng cách số hóa các tài sản, blockchain đang thúc đẩy sự thay đổi cơ bản từ Internet của thông tin, nơi chúng ta có thể ngay lập tức xem, trao đổi và kết nối thông tin thành Internet của giá trị, nơi chúng ta có thể trao đổi các tài sản ngay lập tức. Một nền kinh tế toàn cầu mới với việc trao đổi tức thời giá trị, nơi các trung gian lớn (các ngân hàng, chính phủ, ...) không còn đóng vai trò chính nữa. Một nền kinh tế nơi sự tin tưởng được thành lập không bởi các trung gian trung tâm, mà là thông qua sự đồng thuận và những đoạn mẵ (code) phức tạp.

>**"Công nghệ có tác động lớn nhất trong vài thập kỷ tới đã xuất hiện. Và nó không phải phải là mạng xã hội. Nó cũng không phải là big data. Cũng không phải là robotics. Nó thậm chí không phải là AI. Bạn sẽ ngạc nhiên khi biết rằng nó là công nghệ bên dưới những đồng tiền kỹ thuật số như Bitcoin. Và nó được gọi là blockchain" Don Tapscott**

Blockchain có rất nhiều ứng dụng ngoài những thứ chúng ta đã thấy như tiền kỹ thuật số & chuyển tiền. Từ bầu cử điện tử, hợp đồng thông minh và các tài sản được số hóa cho tới quản lý hồ sơ bệnh án và bằng chứng của việc sở hữu nội dung số.

Blockchain sẽ làm thay đổi hàng trăm nghành công nghiệp đang dựa trên các trung gian, bao gồm ngân hàng, tài chính, học viện, bất động sản, bảo hiểm, luật pháp, chăm sóc sức khỏe, các khu vực công và còn nhiều thứ khác nữa. Điều này dẫn tới kết quả là nhiều việc làm mất đi và sự chuyển đổi hoàn toàn trong toàn bộ các nghành công nghiệp. Nhưng nhìn chung việc loại bỏ các trung gian sẽ đem lại nhiều lợi ích hơn. Các ngân hàng và chính phủ là một ví dụ, nó thường cản trở công việc kinh doanh vì phải tốn thời gian xử lý các giao dịch và các yêu cầu về quy định. Blockchain sẽ cho phép mọi người và các doanh nghiệp tăng cường thương mại thường xuyên và hiệu quả hơn, đẩy mạnh thương mại trong nước và quốc tế. Công nghệ blockchain cũng sẽ loại bỏ các chi phí trung gian đắt đỏ cái đã trở thành một gánh nặng cho mỗi cá nhân và doanh nghiệp, đặc biệt trong lĩnh vực chuyển tiền.

Những ảnh hưởng tiềm tàng của công nghệ blockchain đối với xã hội và nền kinh tế toàn cầu là rất lớn. Với danh sách ngày càng tăng các ứng dụng trong thế giới thực, công nghệ blockchain hứa hẹn sẽ có tác động lớn. Và điều này mới chỉ bắt đầu.







