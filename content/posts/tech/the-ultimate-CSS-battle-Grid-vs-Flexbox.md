+++
date = "2018-02-24T13:59:46+02:00"
tags = ["web"]
title = "Kết quả cuối cùng trận đấu: Grid vs Flexbox"
description = "Chúng khác nhau như thế nào? và khi nào thì nên sử dụng cái này mà không phải cái kia?"
keywords = ""
image = "/img/grid-vs-flex-1.jpg"
draft = false
+++

*Bài viết được dịch từ: [hackernoon.com](https://hackernoon.com/the-ultimate-css-battle-grid-vs-flexbox-d40da0449faf)*

CSS Flexbox đã trở nên cực kỳ quen thuộc với các lập trình viên front-end trong vài năm gần đây. Điều này không đáng ngạc nhiên, bởi vì nó giúp chúng ta tạo ra các bố cục động (dynamic layout) và sắp xếp nội dung trong các container dễ dàng hơn rất nhiều. 

Tuy nhiên, có một mô-đun mới gọi là CSS Grid và nó có nhiều khả năng giống như Flexbox. Trong một vài trường hợp nó tốt hơn so với Flexbox, và một số trường hợp khác thì không. 

Điều này có vẻ gây nhầm lẫn cho các lập trình viên. Vì vậy, bài viết này sẽ so sánh hai mô-đun, cả mức độ vi mô và vĩ mô.

## Một chiều vs 2 chiều

Nếu bạn rút ra một bài học từ bài viết này, thì đây là nó:

>Flexbox được tạo ra cho các bố cục một chiều và Grid được tạo ra cho các bố cục hai chiều.

Điều này có nghĩa là nếu bạn đang đặt các item theo một hướng (ví dụ ba nút bên trong header), thì bạn nên sử dụng Flexbox:

![one dimension](/img/grid-vs-flex-3.png)

Nó sẽ linh hoạt hơn CSS Grid. Và cũng dễ dàng hơn để bảo trì và yêu cầu mã ít hơn. 

Tuy nhiên nếu bạn định tạo bố cục theo hai chiều - với cả các hàng và các cột - thì bạn nên sử dụng CSS Grid:

![two dimension](/img/grid-vs-flex-4.png)

Trong trường hợp này, CSS Grid sẽ linh hoạt hơn, làm cho code của bạn đơn giản hơn và dễ bảo trì hơn. 

Tất nhiên bạn có thể kết hợp cả hai. Trong ví dụ ở trên, giải pháp hoàn hảo là sử dụng Grid cho việc bố cục trang, và sau đó dùng Flexbox để sắp xếp nội dung bên trong header. Điều này sẽ cung cấp cho bạn những chức năng tốt nhất của cả hai mô-đun. Và tôi sẽ chỉ cho bạn chính xác cách thực hiện ở cuối bài viết này.

## Content-first vs layout-first

Một khác biệt quan trọng nữa giữa 2 mô-đun là Flexbox tập trung vào **nội dung** trong khi Grid tập trung vào **bố cục***. Điều này có vẻ trừu tượng, vì vậy hãy xem một ví dụ cụ thể, nó sẽ dễ hiểu hơn. 

Chúng ta sẽ sử dụng header. Đây là code HTML cho nó:

```html
<header>
    <div>Home</div>
    <div>Search</div>
    <div>Logout</div>
</header>
```

Trước khi chúng ta style nó với Flexbox, các div này sẽ được xếp chồng lên nhau như thế này:

![menu](/img/grid-vs-flex-2.png)

### Flexbox header

Tuy nhiên, khi chúng ta style nó với <code>display: flex;</code> các item sẽ được đặt trên một dòng.

```css
header {
    display: flex;
}
```

![flex menu initial](/img/grid-vs-flex-5.png)

Để di chuyển nút *logout* sang phía bên phải, chúng ta chỉ cần chọn phần tử đó và style với margin:

```css
header > div:nth-child(3) {
    margin-left: auto;
}
```

Kết quả sẽ như thế này:

![flex menu result](/img/grid-vs-flex-6.png)

Cái tôi muốn bạn để ý ở đây là chúng ta để các item tự quyết định vị trí của mình. Chúng ta không phải xác định trước bất cứ điều gì khác ngoài <code>display: flex;</code>. 

Đây là khác biệt chính giữa Flexbox và Grid, và nó sẽ trở nên rõ ràng hơn khi chúng ta tạo header này bằng cách sử dụng Grid. 

*Mặc dù CSS Grid không được tạo ra cho header một chiều, nhưng vẫn là một ý hay khi làm điều này vì nó dạy cho chúng ta về sự khác biệt cốt lõi giữa Flexbox và Grid.*

### Grid header

Chúng ta có thể tạo header theo nhiều cách khác nhau với CSS Grid. Tôi sẽ sử dụng một cách khá đơn giản, trong đó grid của chúng ta có mười cột.

```html
header {
    display: grid;
    grid-template-columns: repeat(10, 1fr);
}
```

Nó sẽ giống hệt với giải pháp Flexbox.

![grid menu initial](/img/grid-vs-flex-5.png)

Tuy nhiên, chúng ta có thể sử dụng Chrome inspector để kiểm tra các dòng cột:

![grid menu inspect 1](/img/grid-vs-flex-7.png)

Sự khác biệt chính với cách tiếp cận này là chúng ta phải xác định các cột - bố cục - đầu tiên. Chúng ta bắt đầu với việc xác định chiều rộng của các cột, và sau đó chúng ta đặt nội dung vào các ô có sẵn trong grid.

>Cách tiếp cận này buộc chúng ta phải xác định số lượng cột mà chúng ta muốn chia trong header.

Trừ khi thay đổi grid, còn không chúng ta luôn có 10 cột. Một hạn chế mà chúng ta sẽ không phải đối mặt trong Flexbox. 

Để thay đổi *logout* sang phía bên tay phải, chúng ta sẽ đặt nó vào cột thứ mười, như sau:

```css
header > div:nth-child(3) {
    grid-column: 10;
}
```

Dùng Chrome inspector chúng ta sẽ thấy:

![grid menu inspect 2](/img/grid-vs-flex-8.png)

Chúng ta không thể chỉ đơn giản style nó với <code>margin-left: auto;</code> vì nút "logout* đã được đặt trong một ô cụ thể trong bố cục, trong cột thứ ba. Để di chuyển nó, chúng ta phải tìm một ô khác cho nó.

## Kết hợp cả 2

Bây giờ chúng ta hãy xem cách kết hợp cả hai, sát nhập header vào bố cục trang web. Chúng ta sẽ bắt đầu bằng cách xây dựng bố cục trang web.

![menu](/img/grid-vs-flex-9.png)

Đây là HTML:

```html
<div class="container">
  <header>HEADER</header>
  <aside>MENU</aside>
  <main>CONTENT</main>
  <footer>FOOTER</footer>
</div>
```

Đây là CSS:

```css
.container {
    display: grid;    
    grid-template-columns: repeat(12, 1fr);
    grid-template-rows: 50px 350px 50px;
}
```

Chúng ta sẽ đặt các item trên grid như sau:

```css
header {
    grid-column: span 12;
}

aside {
    grid-column: span 2;
}

main {
    grid-column: span 10;
}

footer {
    grid-column: span 12;
}
```

Tiếp theo, chúng ta sẽ chỉ cần thêm style cho header. Chúng ta sẽ biến header - một *item* trong CSS Grid - thành một Flexbox container.

```css
header {
    display: flex;
}
```

Chúng ta có thể thiết lập nút logout sang bên phải:

```css 
header > div:nth-child(3) {
    margin-left: auto;
}
```

Kết quả, chúng ta có một bố cục hoàn hảo sử dụng những tính năng tốt nhất từ ​​cả Grid và Flexbox. Hai container sẽ trông như thế này:

![layout](/img/grid-vs-flex-10.png)

Bây giờ, bạn đã hiểu rõ sự khác biệt nói chung và cụ thể giữa Flexbox và Grid, và biết cách sử dụng chúng cùng với nhau.

## Trình duyệt hỗ trợ

Trước khi kết thúc, tôi cũng cần đề cập đến các trình duyệt hỗ trợ CSS Grid. Vào thời điểm này (25/02/2018), [82.8% lưu lượng website toàn cầu hỗ trợ CSS Grid](https://caniuse.com/#feat=css-grid), và nó đang tăng dần. 

Tôi tin năm 2018 sẽ là năm của CSS Grid. Nó sẽ đột phá, và sẽ trở thành một kỹ năng phải có của các lập trình viên front-end. Giống như những gì đã xảy ra với CSS Flexbox trong vài năm gần đây.

## Đọc thêm
[https://flexboxfroggy.com/](https://flexboxfroggy.com)
[https://scrimba.com/g/gR8PTE](https://scrimba.com/g/gR8PTE)
[https://scrimba.com/g/gflexbox](https://scrimba.com/g/gflexbox)
[https://css-tricks.com/css-grid-replace-flexbox/](https://css-tricks.com/css-grid-replace-flexbox)
[https://css-tricks.com/snippets/css/complete-guide-grid/](https://css-tricks.com/snippets/css/complete-guide-grid)
[https://css-tricks.com/snippets/css/a-guide-to-flexbox/](https://css-tricks.com/snippets/css/a-guide-to-flexbox/)