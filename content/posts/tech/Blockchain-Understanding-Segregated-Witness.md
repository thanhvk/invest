+++
date = "2018-03-06T13:59:46+02:00"
tags = []
title = "Blockchain 101: Tìm hiểu về SegWit"
description = "SegWit (viết tắt của Segregated Witness) là một nâng cấp giao thức của Bitcoin"
keywords = "Segwit, Segregated Witness, Bitcoin, Blockchain"
image = "/img/segwit-feature.jpg"
draft = true
+++

*Bài viết được dịch từ: [segwit.org](https://segwit.org/understanding-segregated-witness-905cc712c692)*

SegWit (viết tắt của Segregated Witness) là một nâng cấp giao thức của Bitcoin. Không phải tất cả mọi người, đều hiểu được nâng cấp giao thức này thực sự làm gì, vì vậy trong bài này, tôi muốn giải thích cho các bạn Segwit là gì.

![Segwit](/img/segwit-logo.jpg)

## Bitcoin giống như một sổ cái toàn cầu (Global Ledger)

Để hiểu Segwit, trước tiên chúng ta phải hiểu một chút về Bitcoin. 

Nếu bạn nghĩ Bitcoin là một sổ cái toàn cầu (global ledger), một giao dịch Bitcoin giống như một tấm séc. Là chủ sở hữu của một khoản tiền, bạn có thể viết một tấm séc để chuyển tiền cho người khác. 

Và giống như một tấm séc, giao dịch Bitcoin cũng có chữ ký. Thay vì một chữ ký vật lý, bạn tạo ra một chữ ký số bằng khóa riêng của mình (private key). 

Điều thú vị là, trong khi một chữ ký trên một tấm séc vật lý có thể chiếm 10% tấm séc, thì một chữ ký số trong bitcoin chiếm hơn 50% tấm séc kĩ thuật số. 

Tương tự, một block của Bitcoin giống như một hộp đựng các tấm séc hoặc các giao dịch đã được ký. Giống như những chiếc hộp vật lý trong thế giới thực, các block của Bitcoin có giới hạn về số lượng giao dịch mà chúng có thể chứa. 

Hiện tại, các hộp có kích thước tiêu chuần là 1MB. Bạn có thể đặt một vài tấm séc vào hộp và trông nó gần như trống không, nhưng bạn không bao giờ có thể đặt vào hộp nhiều séc hơn số lượng mà nó có thể chứa.

Để giữ sự thống nhất cho sổ cái và chống gian lận, mọi người có thể kiểm tra sổ cái bằng cách kiểm tra các hộp đựng séc này (các  block). Một bản sao của hộp đựng séc sẽ được gửi cho bất cứ ai muốn kiểm tra sổ cái. 

Nếu trong quá trình kiểm tra những hộp đựng séc này, ai đó tìm ra một trong số những tấm séc bị vượt mức (nghĩa là người viết séc không có đủ tiền trong tài khoản của họ để thực hiện giao dịch), họ sẽ từ chối toàn bộ hộp. 

Điều này rất quan trọng bởi vì, nếu không, mọi người có thể viết các séc lỗi. Chúng ta cũng cần phải làm việc này thường xuyên để mọi người có thể có ý thức về số tiền họ có, vì vậy các hộp đựng séc được cho tất cả mọi người (mỗi nút trên hệ thống) để kiểm tra thường xuyên - trung bình khoảng 10 phút một.

## Bối cảnh cuộc tranh luận mở rộng (scaling)

Bởi vì có một giới hạn cho kích thước hộp (block), vì vậy số séc được kiểm tra cũng sẽ bị giới hạn tương ứng với kích thước hộp. Điều đó cũng có nghĩa là số lượng các giao dịch của Bitcoin bị giới hạn. Cuộc tranh luận mở rộng (scaling) đang diễn ra trong vài năm qua của Bitcoin thực sự là làm thế nào để có thể tăng số lượng giao dịch thông qua hệ thống. 

Có hai giải pháp được đưa ra. Thứ nhất là làm cho kích thước hộp lớn hơn. Thứ hai là tạo ra một loại séc mới và chỉ cung cấp những chiếc hộp lớn hơn cho những ai chấp nhận chúng.

## Làm cho chiếc hộp lớn hơn

Một nhóm muốn loại bỏ các hộp hiện tại và làm hộp lớn hơn. Điều này thật tuyệt nếu mọi người buộc phải sử dụng hộp lớn hơn, nhưng có một số vấn đề với ý tưởng này. 

Nếu một số người tiếp tục sử dụng hộp nhỏ hơn, điều này sẽ gây ra sự khác biệt trong sổ cái và tạo ra hai sổ cái khác nhau. Thêm vào đó, ngay cả khi tất cả mọi người đều sử dụng hộp lớn hơn, rất nhiều người kiểm tra sổ cái sẽ không nhận được hộp lớn hơn để kiểm tra xem các séc có hợp lệ hay không. 10 phút là quá ít để nhận và kiểm tra hộp với một số người. 

Lợi thế chính của giải pháp này là nó tương đối đơn giản. Không cần phải lo lắng về việc kiểm tra những séc kiểu mới và mọi thứ có thể hoạt động như trước. 

Bitcoin Cash sử dụng giải pháp này bằng cách nâng giới hạn kích thước block từ 1MB lên 8MB.

## Thay đổi séc

Giải pháp thứ hai là giới thiệu một kiểu séc mới. Chúng ta vẫn có thể làm hộp lớn hơn, nhưng chỉ dành cho những người muốn chúng. Giải pháp này sẽ cắt bỏ phần chữ ký của séc cho tất cả những người không chấp nhận các hộp lớn hơn. 

Nhớ rằng chữ ký chiếm khoảng 50% giao dịch? SegWit cắt giảm séc còn một nửa và gửi tất cả mọi thứ trừ chữ ký cho tất cả mọi người chấp nhận hộp cũ, nhỏ hơn. Chúng tôi gửi các hộp lớn hơn cho những người chấp nhận hộp mới, lớn hơn. 

Với việc séc bằng một nửa kích thước cho các hộp nhỏ hơn, chúng ta có thể làm tăng gấp đôi số lượng séc trong các hộp nhỏ hơn. Bất cứ ai nhận được hộp lớn hơn có thể kiểm tra mọi thứ trong hộp như bình thường và bất cứ ai nhận hộp nhỏ hơn vẫn có thể kiểm tra mà không phải lo lắng về việc nhận được chữ ký kịp thời. 

Bởi vì vẫn phục vụ những người không sử dụng hộp mới hơn, lớn hơn, SegWit có thể *tương thích ngược*. Điều đó có nghĩa là mọi người sẽ có cùng một bản sao của sổ cái dù họ có sử dụng loại hộp nào. 

Hạn chế chính của SegWit là tất cả mọi người sẽ phải quen với kiểu séc mới trước khi chúng ta thấy được lợi ích. Nó cũng phức tạp hơn một chút so với giải pháp tăng kích thước hộp. Ngoài ra, tất cả mọi người nhận được séc kiểu mới nhưng sử dụng một hộp cũ sẽ không thể kiểm tra các chữ ký vì họ sẽ không nhận được chúng. 

Bitcoin đang sử dụng giải pháp "tạo ra loại séc mới".

## Tổng kết

Bitcoin là một sổ cái phân phối, và nó giúp suy nghĩ về các giao dịch và khối như những tấm séc và những chiếc hộp. Bitcoin Cash đang tiêu chuẩn hóa trên một hộp lớn hơn cho tất cả mọi người trong khi SegWit đang sử dụng hộp lớn hơn cho một số trong khi vẫn có chỗ cho những người không muốn sử dụng hộp lớn hơn với các loại séc mới.

## Đọc thêm
[https://www.coindesk.com/information/what-is-segwit/](https://www.coindesk.com/information/what-is-segwit/)
[https://www.reddit.com/r/Bitcoin/comments/5dkkto/what_is_segwit/](https://www.reddit.com/r/Bitcoin/comments/5dkkto/what_is_segwit/)
[https://blockgeeks.com/guides/what-is-segwit/](https://blockgeeks.com/guides/what-is-segwit/)
[https://www.cryptocompare.com/coins/guides/what-is-segwit/](https://www.cryptocompare.com/coins/guides/what-is-segwit/)
[https://www.investopedia.com/terms/s/segwit-segregated-witness.asp](https://www.investopedia.com/terms/s/segwit-segregated-witness.asp)
[https://www.quora.com/What-is-SegWit](https://www.quora.com/What-is-SegWit)


