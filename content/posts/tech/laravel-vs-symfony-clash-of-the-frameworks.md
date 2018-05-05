+++
date = "2018-04-29T13:59:46+02:00"
tags = ["laravel"]
title = "Laravel vs Symfony - Cuộc chiến của các framework"
description = "Laravel và Symfony rõ ràng là 2 PHP framework hàng đầu. Nhưng cái nào tốt hơn?"
keywords = "laravel, symfony, php, php framework"
image = "/img/laravel-vs-symfony.png"
draft = false
+++

*Bài viết được dịch từ: [merixstudio.com](https://www.merixstudio.com/blog/laravel-vs-symfony-clash-frameworks/)*

{{% tocsection %}}

<!-- TOC -->

1. [Giới thiệu](#giới-thiệu)
2. [Ngôn ngữ lập trình](#ngôn-ngữ-lập-trình)
3. [Core](#core)
4. [Truy cập Database](#truy-cập-database)
    1. [Migrations](#migrations)
    2. [Truy cập dữ liệu](#truy-cập-dữ-liệu)
5. [Service Container](#service-container)
6. [Template engine](#template-engine)
7. [Middleware](#middleware)
8. [Forms và validators](#forms-và-validators)
9. [Cache và performance](#cache-và-performance)
10. [Các công cụ debug và development](#các-công-cụ-debug-và-development)
11. [Phần mềm bên thứ 3](#phần-mềm-bên-thứ-3)
12. [Admin panel](#admin-panel)
13. [Các mô-đun](#các-mô-đun)
    1. [Search engine](#search-engine)
    2. [External Drive (Ổ đĩa ngoài)](#external-drive-ổ-đĩa-ngoài)
    3. [Sentry](#sentry)
14. [Laravel vs Symfony - cái nào tốt hơn?](#laravel-vs-symfony---cái-nào-tốt-hơn)

<!-- /TOC -->

{{% /tocsection %}}

## Giới thiệu

Laravel và Symfony rõ ràng là 2 PHP framework hàng đầu. Nhưng cái nào tốt hơn? Để tìm ra câu trả lời, tôi sẽ cho bạn thấy đâu là điểm mạnh và điểm yếu của chúng, cũng như nói về lý do tại sao tôi thích framework này hơn framework kia.

Ngoài việc thảo luận về **[ưu và nhược điểm của Laravel](https://www.merixstudio.com/blog/laravel-5-tutorial/) và Symfony,** Tôi cũng mô tả **những trường hợp cụ thể mà framework "yếu hơn" làm việc tốt hơn**. Để đưa ra quyết định trong quá trình so sánh các framework này, tôi sẽ nhấn mạnh những phần khác biệt nhất và đánh giá những lợi thế của Laravel và Symfony. 

## Ngôn ngữ lập trình
Bạn có thể nghĩ rằng, khi mà **cả hai framework cùng sử dụng PHP** thì không có điểm khác biệt đáng kể nào giữa chúng. Nhưng hãy để tôi chỉ cho bạn thấy.

**Symfony đang sử dụng cái mà tôi gọi là "common PHP"**. Điều đó có nghĩa là nó được viết chỉ sử dụng code phổ quát, vì thế bạn có thể chỉnh sửa cú pháp thành bất kỳ ngôn ngữ nào (Ví dụ Java hay C#) và nó vẫn làm việc. Mọi ngôn ngữ lập trình đều có một vài cấu trúc làm cho nó có lợi thế hơn so với các ngôn ngữ khác. Không sử dụng những cấu trúc này là một sai lầm lớn. PHP là một ví dụ, nó có các phương thức và đặc điểm ma thuật. **Laravel là một trường hợp khác, nó sử dụng các đặc điểm và phương thức ma thuật một cách thường xuyên.** Vì thế mà code không chỉ ngắn hơn và ít bị lặp lại mà còn dễ dàng hơn để hiểu và thay đổi hành vi của các ứng dụng.

Đó là lý do vì sao ở trận này Laravel là người chiến thắng.

![](https://media.merixstudio.com/uploads/laravel_vs_symfony_1_-_0.png)

## Core
Một điểm nữa là cả Laravel và Symfony đều sử dụng chung một core. **Cả hai framework đều dựa trên một tập hợp các thư viện được gọi là "Symfony Components"**. Nhưng một lần nữa, điều này không có nghĩa là chúng giống nhau. Laravel bổ sung thêm các component của riêng mình dựa trên cái mà thư viện Symfony cung cấp, thêm các bản vá và các chức năng còn thiếu.

Mặc dù Laravel bổ sung thêm một vài bản vá, nhưng ở vòng này hai framework hòa nhau.

![](https://media.merixstudio.com/uploads/laravel_vs_symfony_2-1.png)

## Truy cập Database
Một điểm khác biệt lớn là **cách các framework này truy cập database**. Symfony sử dụng [Doctrine](http://www.doctrine-project.org/), trong khi Laravel sử dụng [Eloquent](https://laravel.com/docs/5.4/eloquent).

### Migrations
Trong Doctrine migration **được tạo tự động cho bạn**, tất cả những gì bạn cần làm là định nghĩa model. Trong Eloquent, **bạn phải tạo chúng thủ công, nhưng không cần định nghĩa các trường trong model.**

Tôi nghĩ rằng ở điểm này các framework là tương đương nhau.

![](https://media.merixstudio.com/uploads/laravel_vs_symfony_3-2.png)

### Truy cập dữ liệu
Trong Doctrine mỗi khi bạn muốn truy cập dữ liệu, **bạn cần tạo một repository function**. Vì không có cách dễ dàng nào để truy cập vào các cấu trúc phức tạp, các repository của bạn có thể phát triển khá lớn.

Trong Laravel việc truy cập dữ liệu linh hoạt hơn, nhưng **bạn có thể cần một số kiến thức về SQL** vì hầu hết các function dựa trên các câu lệnh SQL tương ứng. 

Một trong những lợi thế lớn nhất của Laravel là **khả năng xử lý nhiều tình huống**. Có nhiều trường hợp trong Doctrine khi một function có vẻ hợp lý sẽ kết thúc với một lỗi. Eloquent là một trường hợp khác nó được thiết kế để **chấp nhận mọi thứ**. Ngay cả những request vô nghĩa nhất cũng sẽ được phân tích và biến thành SQL hợp lệ và có thể dự đoán được. Đây là cách bạn có thể tạo ra các truy vấn phức tạp mà không có rủi ro. Với điều đó, Larave đã ghi điểm.

![](https://media.merixstudio.com/uploads/laravel_vs_symfony_4-2.png)

## Service Container
Một trong những ý tưởng hay nhất khi nói tới Symfony, đồng thời cũng là một trong những triển khai tồi tệ nhất của nó là **service container**. Nó là một cách để truy cập một service từ một service khác bằng cách sử dụng các injection. Ví dụ, nếu code của bạn yêu cầu bạn gửi một email, bạn có thể chỉ định (thông qua các tệp tin cấu hình - config files) hàm khởi tạo của class nhận service gửi email như một tham số của nó.

Điều này dường như là một ý tưởng khá hay, vậy thì điều gì sai? Vấn đề đầu tiên là **các service chỉ có thể cấu hình để tiêm**. Điều đó có nghĩa là bạn định nghĩa mọi thứ được coi là các service bên ngoài như một service. Điều này không chỉ phá vỡ định nghĩa của các service như là "các function hoặc tập hợp của các function, có thể được tái sử dụng bởi các client khác nhau cho những mục đích khác nhau", mà còn tạo ra một mớ hỗn độn trong các tệp tin cấu hình.

Một vấn đề khác là **không phải tất cả mọi thứ đều có thể được đăng ký như một service**, vì thế bạn không thể truy cập các service khác từ mọi nơi. Trong khi làm việc với Symfony, tôi thường bắt gặp một vấn đề khi tạo các function "toString" trong các thực thể của mình, vì nó thỉnh thoảng yêu cầu truy cập tới translator. Chỉ có một cách duy nhất để giải quyết vấn đề này đó là hack kernel (nhân) để truy cập tới service container. **Giải pháp này không chỉ làm cho code trông xấu, mà còn có thể gây ra rắc rối cho tôi trong tương lai.**

Laravel là một trường hợp khác, nó đã giải quyết vấn đề này theo cách khác. Thay vì tạo một số tập tin cấu hình và đăng ký mọi thứ như các service, nó **tận dụng lợi thế của lập trình hướng đối tượng và PHP Type Hinting**. Nếu bạn muốn truy cập bất kỳ service nào, tất cả những gì bạn phải làm là đặt interface của service đó như một tham số của function được gọi. Khi function được gọi sử dụng phương thức <code>App::call()</code>, Laravel sẽ tự dộng cung cấp cho bạn chính xác các service như là các tham số của function đó.

Một cách khác để truy cập các service trong Laravel là thông qua việc sử dụng **App::make()** hay **các hàm resolve()**. Cảm ơn khả năng truy cập tới các service từ biến toàn cục (global variable) , **bạn có thể sử dụng bất kỳ service bạn cần ở mọi nơi bạn muốn**. Với điều đó - người chiến thắng là Laravel!

![](https://media.merixstudio.com/uploads/laravel_vs_symfony_5-2.png)

## Template engine
Template engine là một điểm khác biệt nữa giữa Symfony và Laravel. Symfony sử dụng [Twig](https://twig.sensiolabs.org/), trong khi Laravel sử dụng [Blade](https://laravel.com/docs/5.4/blade).

Twig có  một số lợi thế đáng kể, đó là cộng đồng lớn hơn, code trông đẹp hơn, và một loạt các từ khóa được bổ sung bởi các extension khác nhau. **Mặc dù vậy, nhưng tại sao tôi vẫn coi Blade tốt hơn Twig?**

Lợi thế đầu tiên của Blade là **tính tái sử dụng của code**. Nếu bạn tạo một function bạn sẽ sử dụng được cả ở template và controller, trong Twig bạn sẽ cần định nghĩa nó 2 lần. Lý do là trong các template bạn không thể sử dụng các PHP function và ngược lại. 

Blade là một trường hợp khác, bạn có thể **sử dụng trực tiếp các PHP function**, điều đó có nghĩa là bất kỳ cái gì bạn định nghĩa để sử dụng trong controller, thì cũng có thể sử dụng trong template. Thậm chí bạn còn có thể load các service trực tiếp trong template sử dụng **@inject directive**. Lợi thế thứ hai của Blade là **cách nó làm việc với các frontend framework hay thư viện**. Ví dụ, nếu bạn muốn sử dụng Angular sẽ có vấn đề với các dấu ngoặc nhọn và bạn sẽ cần thêm các khoảng trắng. Giải pháp của Twig sẽ như thế này:

```twig
{{ '{{myModelName}}' }}
```

Với Blade bạn có 3 cách khác nhau để giải quyết vấn đề này:

```blade
@{{myModelName}}



@verbatim

    You can put any code here eg. {{myModelName}}, {{myModelName2}}

    <script>

        //Even some javascript

    </script>

@endverbatim
 


// Call this before using templates

Blade::setContentTags('<%', '%>'); 

//This is in template

{{ variableFromAngular }}

<% variableFromBlade %>
```

Tôi cho rằng 2 lợi thế này đã đủ để cân bằng những nhược điểm như code trông xấu và cộng đồng nhỏ hơn - Và chúng ta có một trận hòa.

![](https://media.merixstudio.com/uploads/laravel_vs_symfony_6-3.png)

## Middleware
**Cả Laravel và Symfony đều hỗ trợ middleware,** nhưng theo những cách khác nhau.

**Laravel sử dụng decorator pattern.** Bạn tạo một function hỗ trợ gọi tầng tiếp theo của middleware. Trước và sau khi gọi, nó có thể làm mọi thứ bạn muốn. **Symfony, là một trường hợp khác nó dựa trên observer pattern (bạn thêm các listener tới trước và sau các event).** Mỗi giải pháp đều có ưu và nhược điểm. Trong Laravel bạn sẽ kiểm soát tốt hơn cái gì đang xảy ra với request của mình. Trong Symfony, bạn có thể tạo middleware từ bất kỳ đâu trong ứng dụng của mình. Với lý do này, cả hai framework hòa nhau.

![](https://media.merixstudio.com/uploads/laravel_vs_symfony_7-4.png)

## Forms và validators
Form validation là một sự khác biệt lớn giữa Symfony và Laravel. **Trong Laravel validation có thể được thực hiện theo một trong hai cách là trong form hay thông qua manual validation của một request trong khi đó với Symfony bạn chỉ có thể validate model.**

Chính vì vậy, với Symfony rất khó để validate cùng một đối tượng theo nhiều cách (Ví dụ dựa trên quyền hạn). Trong Laravel bạn có thể cần thêm cùng một validation logic tới tất cả form để tạo mới hay chỉnh sửa một đối tượng.

Một thứ khác nữa là **validation tùy chỉnh**. Nếu bạn muốn sử dụng một quy tắc validation không có sẵn trong framework hay một validiation nâng cao hơn (chẳng hạn như "StartDate < EndDate"), trong Laravel bạn có thể sử dụng cái được gọi là [After Validation Hook](https://laravel.com/docs/5.3/validation#manually-creating-validators). Trong Symfony bạn cần tạo một Validator mới hoàn toàn (2 tệp tin phụ).

Còn có một vấn đề nữa - **đặt tên**. Trong Symfony, các quy tắc validation được gọi là **các Assertion**. Từ định nghĩa, Asserton là "một câu lệnh dự đoán sẽ luôn luôn đúng tại một điểm trong code. Đánh giá assertion là false tại thời gian chạy thường dẫn tới assertion failure, cái thường là những nguyên nhân chương trình bị crash." Điều này có nghĩa là các Asstert thường là một cách kiểm tra các bug trong code của các chương trình, không phải cho những dữ liệu không đúng mà người dùng nhập - chúng ta không muốn bất kỳ thứ gì crash nếu người dùng nhập sai. Cái tên gây hiểu nhầm này là một thứ mà tôi cho là một nhược điểm của Symfony.

Dựa trên việc code ngắn hơn, có thể sử dụng trong nhiều trường hợp hơn, và dễ dàng triển khai, người chiến thắng của vòng đấu này là Laravel.

![](https://media.merixstudio.com/uploads/laravel_vs_symfony_8-4.png)

## Cache và performance
**Caching dữ liệu hiện nay được coi là điều bắt buộc. Nhưng nếu không thì sao?** Cả Symfony và Laravel đều đang caching các view của chúng, nhưng chỉ có Symfony là đang caching mã nguồn bởi mặc định. Điều thú vị ở đây là **Laravel làm việc nhanh hơn ngay cả khi Symfony sử dụng cache**. Bởi vì performance boost, tôi chưa bao giờ cần sử dụng cache trong Laravel. Cả Laravel và Symfony đều hỗ trợ APC, Memcached, Redis và tệp tin dựa trên cache.

Tôi đã chọn **các website có dung lượng tương tự mà tôi đã phát triển với mỗi framework và so sánh thời gian tải**. Với Laravel trung bình khoảng 60ms, sau đó tôi clear cache của nó và thời gian tải là 75ms. Với Symfony, thời gian tải trung bình khoảng 250ms và sau khi clear cache nó lên tới tận 2s.

Điều này cho thấy **Laravel vượt trội về performance**. Vì Laravel nhanh hơn và không yêu cầu nhiều cache như Symfony, tối nghĩ nó cũng chiến thắng ở vòng này.

![](https://media.merixstudio.com/uploads/laravel_vs_symfony_9-4.png)

## Các công cụ debug và development
Debug là điều bắt buộc cho mọi ứng dụng. Một IDE hỗ trợ tốt các công cụ debugging và profiling sẽ giúp bạn tìm ra các vấn đề trong code nhanh hơn. **Khi nói đến IDE, Symfony được hỗ trợ tốt hơn nhiều.** Hỗ trợ cho Laravel rất khiêm tốn, nhưng nó có một thư viện được gọi là **laravel-ide-helper** cái lấp đầy hầu hết các lỗ hổng.

Bây giờ hãy xem xét các công cụ debugging. **Symfony có một panel rất tiên tiến** cho thấy hầu hết các vấn đề, cũng như các chi tiết của profilling. **Laravel chỉ có duy nhất một panel đơn giản** có khả năng hiển thị các exception và làm một số thứ profiling cơ bản. Với điều đó, người chiến thắng ở vòng này rõ rằng là Symfony.

![](https://media.merixstudio.com/uploads/laravel_vs_symfony_9-5.png)

## Phần mềm bên thứ 3
Đến đây có vẻ như Laravel vượt trội so với Symfony. **Vâng, nhưng có một trường hợp mà Symfony là người chiến thắng một cách rõ ràng - Tôi đang nói về làm việc với phần mềm của bên thứ 3.** Có một vài team lớn dành thời gian của họ để tạo ra các package cho Symfony. Một điểm quan trọng về các team này là công việc của họ được đề cập trong tài liệu hướng dẫn chính thức của Symfony và các package của họ được sử dụng khá phổ biến. Có lẽ mọi lập trình viên Symfony đều biết **Sonata** hay **Liiplmagine** là gì. Các team ít được biết đến hơn là **FOS** và **KnpLabs**.

Các package của bên thứ 3 có thể giúp cho quá trình phát triển với Symfony nhanh hơn tại một vài điểm, nhưng có một vấn đề bạn nên xem xét. Nếu bạn biết về **quy tắc KISS** và lý do **tại sao tốt hơn là tạo ra những thứ nhỏ hơn**, thì bạn đã biết cái tôi sẽ nói tới.

Tất cả các thư viện của bên thứ 3 đều rất lớn và cung cấp cho các lập trình viên nhiều khả năng. Tuy nhiên, chúng cũng có nhiều bug. **Là một lập trình viên Symfony, tôi nhận thấy bản thân mình dành hơn 50% thời gian để sửa/làm việc với các lỗi và vấn đề trong các thư viện này** thay vì tập trung vào code của mình. Chất lượng code thấp của các thư viện này, cũng như thiếu sự tái cấu trúc (refactor), làm cho chúng khá khó để làm việc. 

Khi đến với cộng đồng bên thứ 3 của Laravel, không thể phủ nhận là nó cũng khá lớn, nhưng tôi tìm thấy rất nhiều package được tạo bởi các team nhỏ hay thậm chí là một lập trình viên. Điều đó có nghĩa là **một package ở trong top 10 hôm qua, có thể chết vào ngày mai.** Có nhiều thư viện đang làm chung một thứ, vì thế bạn có rất nhiều lựa chọn. Tuy nhiên bạn không thể dựa trên bất kỳ tiêu chuẩn nào và cũng không chắc rằng các package này làm việc tốt với nhau. **Cách tốt nhất trong hầu hết các trường hợp là tự viết code cho mình.**

Một điểm khác biệt nữa giữa Laravel và Symfony là **cách các lập trình viên có được các package**. Laravel có cơ sở dữ liệu package của riêng mình. Symfony không có công cụ như vậy, vì thế bạn sẽ cần sử dụng Google. Nhưng như tôi đã nói, nhiều package phổ biến đã được đề cập trong tài liệu hướng dẫn. Đây là lý do tại sao Symfony là người chiến thắng trong vòng này.

![](https://media.merixstudio.com/uploads/laravel_vs_symfony_9-6.png)

## Admin panel
Admin panel là bắt buộc với các website hiện nay. **Symfony có một admin panel đã được chuẩn hóa và rất tiên tiến - Sonata.** Còn **Laravel có một vài package có thể được sử dụng như một admin panel**. Cho đến nay tôi mới chỉ thử nghiệm 2 package trong số chúng và kết luận rằng nên tự viết admin panel của riêng mình hơn là sử dụng các package. Có thể có một admin panel tốt cho Laravel, nhưng tôi vẫn chưa tìm ra. Vì vậy, ở vòng này người thắng cuộc là Symfony.

![](https://media.merixstudio.com/uploads/laravel_vs_symfony_9-7.png)

## Các mô-đun
Có khá nhiều thư viện và mô-đun bên ngoài được sử dụng phổ biến với framework. Một vài trong số chúng được hỗ trợ tốt, một số khác thì không. Trong phần này, tôi sẽ đề cập một vài thư viện và mô-đun phổ biến nhất.

### Search engine
Sử dụng Elasticsearch hay Solr gần như trở thành bắt buộc trên các website hiện đại. Cả Symfony và Laravel hỗ trợ chúng bằng cách sử dụng các package của bên thứ 3. **FOSElastica** và **KnpBundles** cho Symfony, **laravel-elasticsearch** và **laravel-solarium** cho Laravel. Không có gì phải bàn cãi - hai framework hòa nhau.

![](https://media.merixstudio.com/uploads/laravel_vs_symfony_10-8.png)

### External Drive (Ổ đĩa ngoài)
Một vài website có thể cần sử dụng nhiều hơn dung lượng mà một host có thể cung cấp. Giải pháp thường sử dụng trong trường hợp này là sử dụng Amazon S3 hay một hệ thống cloud khác. Symfony xử lý external driver bằng cách **sử dụng package của bên thứ 3 dựa trên gaufrette (13 adapters)**, trong khi Laravel xử lý chúng băng cách **sử dụng các thư viện của nó dựa trên flysystem (20 adaters)**. Điều thú vị là, một trong những adapter của flysystem có thể xử lý gaulfrette tốt. Với điều này Laravel là người chiến thắng.

![](https://media.merixstudio.com/uploads/laravel_vs_symfony_11-8.png)

### Sentry
Debugging là khó nếu chúng ta không biết đâu là nguyên nhân của vấn đề (hay nó xảy ra khi nào) - đó là lý do sentry khá phổ biến. **Symfony truy cập tới sentry bằng cách sử dụng sentry-symfony, trong khi Laravel sử dụng laravel-raven.** Ở trận đấu này 2 framework hòa nhau.

![](https://media.merixstudio.com/uploads/laravel_vs_symfony_12-8.png)

## Laravel vs Symfony - cái nào tốt hơn?
Điểm số cuối cùng là **12:9 nghiêng về Laravel.** Điều này có nghĩa là Laravel người chiến thắng? Tôi không nghĩ vậy.

![](https://media.merixstudio.com/uploads/laravel_vs_symfony_winner_(article).png)

Mặc dù trong hầu hết các trường hợp tôi sẽ chọn Laravel là framework tốt nhất, nhưng cũng có một vài trường hợp cụ thể Symfony tốt hơn. Với cách tư duy như vậy, **bạn nên chọn framework dựa trên các yêu cầu của dự án thay vì ưu thế của framework này so với cái còn lại.** Nhưng nếu bạn vẫn không chắc chắn nên chọn framework nào, thì hãy chọn Laravel.