+++
date = "2018-03-26T13:59:46+02:00"
tags = ["css"]
title = "Làm thế nào để thành thạo CSS Grid trong nháy mắt - p2"
description = "Chúng ta sẽ học cách áp dụng 20% kiến thức học được để xây dựng bố cục responsive của một ứng dụng âm nhạc"
image = "/img/master-css-grid-app-music.gif"
draft = false
+++

*Bài viết được dịch từ: [medium.com](https://medium.com/flexbox-and-grids/how-to-efficiently-master-the-css-grid-in-a-jiffy-585d0c213577)*

![](/img/master-css-grid-app-music.gif)

## Phần 3: Bắt tay vào Code - CSS Grid

Để đơn giản, tôi sẽ sử dụng [Codepen](http://www.codepen.io/). Hãy tạo một dự án, và bắt đầu làm việc.

## Làm thế nào để tạo ra bộ khung cho ứng dụng Catty Music

Sau khi đã tạo một project trên codepen. Chúng ta sẽ tạo một tài liệu <code>html</code> cơ bản:

```html
<body>
   <aside></aside>
   <main></main>
   <footer></footer>
</body>
```

Có mục đích khi chọn cấu trúc này. Bạn sẽ sớm nhận ra điều đó.

Bây giờ style tài liệu.

```css
body {
   display: grid;
   min-height: 100%
}
```

Đoạn code này sẽ biến body thành một <code>grid-container</code>.

Bây giờ chúng ta cần tạo cấu trúc các dòng và cột trong grid.

## Làm thế nào để tạo ra các dòng và các cột cho ứng dụng Catty Music

Tạo các dòng và cột là khá dễ dàng.

Kết quả cuối cùng chúng cần đạt được là:

![](https://cdn-images-1.medium.com/max/900/1*VFkE679czY0Tb49R9GNvyg.png)

Tuy nhiên, ban đầu khi thiết lập grid chúng ta cần 2 dòng và 2 cột.

![](https://cdn-images-1.medium.com/max/900/1*80Qn4c32kqbQzMVh-AcAoQ.png)

### Đây là một vài thứ cần chú ý về thiết lập Grid
**Các cột:**

1. Cột đầu tiên phải có độ rộng cố định là 50px.
2. Cột thứ 2 phải chiếm toàn bộ độ rộng còn lại của dòng.

**Các dòng:**

3. Dòng thứ 2 phải có chiều cao cố định là 100px.
4. Dòng đầu tiên phải chiếm toàn bộ chiều còn lại của grid.

### Giải pháp của một người ít kinh nghiệm
Nếu bạn KHÔNG có kinh nghiệm với CSS, bạn có thể viết như thế này:

```css
body {
   ...   
   grid-template-rows: 100% 100px;
   grid-template-columns: 50px 100%;
}
```

Vấn đề với giải pháp này là bạn đã vô tình tạo ra một grid với chiều rộng là <code>100% + 50px</code> và chiều cao là <code>100% + 100px</code>.

Cái chúng ta muốn là chiều rộng và chiều cao là <code>100%</code>. Vì thế hướng tiếp cần này là sai.

### Giải pháp của người đã có kinh nghiệm

Nếu đã có một vài kinh nghiệm với CSS, bạn có thể làm một vài thứ thông minh hơn như thế này:

```css
body {
   ...
   grid-template-rows: calc(100% - 100px) 100px;
   grid-template-columns: 50px calc(100%-50px)
}
```

Cách này khá thông minh. Nhưng có một vấn đề - nó rất khó để bảo dưỡng.

Ví dụ, nếu vì một lý do nào đó bạn phải thay đổi độ rộng cố định, bạn cũng phải thay đổi định nghĩa <code>calc</code>.

## Giải pháp hiệu quả nhất
May mắn là CSS Grid có một đơn vị mới giúp chúng ta giải quyết vấn đề ở trên một cách dễ dàng đó là đơn vị [factional(fr)](https://medium.com/flexbox-and-grids/the-css-fractional-unit-fr-in-approachable-plain-language-fdc47bd387f7).

Đơn vị <code>fr</code> giải quyết vấn đề tự động phân bố khoảng trống.

Nếu bạn có grid với 3 cột như ở dưới, đơn vị <code>fr</code> sẽ tự động phân bổ các khoảng trống bằng nhau.

![](https://cdn-images-1.medium.com/max/720/1*1TWb0kZ4nn6uvykRLMGtOw.png)

Nếu vì một vài lý do bạn thêm nhiều phần tử hơn - đừng lo lắng. Đơn vị <code>fr</code> sẽ phân bổ lại các khoảng trống bằng nhau.

![](https://cdn-images-1.medium.com/max/720/1*D5ILayU5dx_la2wnyn6ZYw.png)

Cuối cùng, nếu bạn đã có một phần tử với độ rộng cố định, bạn có thể lấy toàn bộ khoảng trống còn lại với đơn vị <code>fr</code>. Như thế này:

```css
body {
   ...
   grid-template-rows: 1fr 100px;
   grid-template-columns: 50px 1fr;
}
```

## Đặt tên và xác định vị trí bởi Grid Areas
Chúng ta đã tạo ra hệ thống grid. Bây giờ là lúc để sử dụng nó.

Mục đích của phần này học cách xác định vị trí các phần tử trong grid sử dụng grid areas.

Nhắc lại một chút, một grid area là bất kỳ khoảng trống được bao bởi 4 grid line.

![](https://cdn-images-1.medium.com/max/900/1*7X_NTZG0ikpVwsaB0qfdAw.png)

### Làm thế nào để sử dụng grid areas?
Nơi hợp lý để bắt đầu là đặt tên grid areas

Hãy để tôi giải thích.

Xem xét khối lệnh dưới đây:

```html
<div class="aside"></div>
<div class="main"></div>
<div class="footer"></div>
```

Bây giờ hãy xem đoạn code này:

```css
.main {
  grid-area: content;
}
.footer {
  grid-area: footer;
}
.aside {
  grid-area: sidebar;
}
```

### Chuyện gì đang xảy ra ở đây
Nếu biết một chút về Javascript, hay bất kỳ ngôn ngữ lập trình nào khác, thì khái niệm về biến sẽ không phải là mới với bạn.

Trong Javascript, chúng ta có  thể nói:

```javascript
var gridArea = "content"
```

Cái chúng ta làm ở phía trên là, lưu chuỗi <code>content</code> vào biến <code>gridArea</code>

Khai báo CSS ở phần trước tương tự như vậy.

Mọi phần tử trong grid có thể được gán tới một vùng trong grid container.

Tuy nhiên, trước khi làm điều đó, chúng ta bắt buộc phải gán mỗi phần tử trong grid với một tên gọi. Giống như các biến trong Javascript.

```css
.main {
  grid-area: content;
}
.footer {
  grid-area: footer;
}
.aside {
  grid-area: sidebar;
}
```

Đoạn code ở trên nói  rằng, class <code>.main</code> có tên là <code>content</code>. Class <code>.footer</code> có tên là <code>footer</code>. Cuối cùng, class <code>.aside</code> có tên là <code>sidebar</code>

### Vị trí Grid area
Một người đàn ông trẻ có một cái bánh nướng. Anh ta có 3 đứa con và phải chia cho mỗi đứa một phần. Ai là người chia bánh thì hợp lý nhất?

Chính người đàn ông đó!

Người đàn ông trẻ cắt bánh và chia cho mỗi đứa trẻ một phần.

![](https://cdn-images-1.medium.com/max/720/1*xN-041OZXzMZvCJ76WRtfQ.jpeg)

Đây là lý do tôi kể câu chuyện này.

Giống như chiếc bánh, toàn bộ khoảng trống trong grid là của ai?

Chính là grid container!

Giống như người đàn ông trẻ, grid container có 3 đứa con <code>.aside</code> <code>.main</code> và <code>.footer</code>. Bây giờ grid container phải chọn cách chia toàn bộ khoảng trống trong grid cho 3 đứa con này.

Và một điều nữa.

Vì tất cả những đứa trẻ đều có tên, người đàn ông trẻ có thể nói: "hey **Brian** đây là phần của con hoặc hey **Emma** của con là phần này."

Dễ dàng để xác định ai sở hữu phần nào của chiếc bánh, bằng cách gán mỗi phần với tên của mỗi người.

Mỗi phần tử trong grid đều đã có tên bằng cách sử dụng thuộc tính <code>grid-area</code>.

Bây giờ, hãy chia bánh!

### Thuộc tính grid-template-areas
Bây giờ grid container phải chia "bánh". Gán mỗi vùng tới mỗi phần tử tương ứng.

Có nhiều cách để làm điều đó, nhưng thuộc tính <code>grid-template-areas</code> là cách dễ dàng nhất để làm đó. nó chính là cái bạn cần biết để làm việc hiệu quả.

### Thuộc tính grid-template-areas làm việc như thế nào?
Hãy xem đoạn code dưới đây:

```css
body {
      grid-template-areas: "sidebar  content"
                           "footer   footer";
  }
```

Cái quái gì vậy?

Thuộc tính <code>grid-template-areas</code> cung cấp một cấu trúc rất trực quan của grid.

Hãy xem lại đoạn code trên một lần nữa:

```css
body {
      grid-template-areas: "sidebar  content"
                           "footer   footer";
  }
```

Bạn có thể thấy toàn bộ giá trị của thuộc tính là tên của các phần tử trong grid!

<code>sidebar</code> <code>content</code> và <code>footer</code> là tên của các phần tử trong grid. Khai báo ở trên gán mỗi vùng trong grid với một phần tử tương ứng.

![](https://cdn-images-1.medium.com/max/900/1*NjMwDa_1b1vHkAbpXI_f7w.png)

Hình ảnh trên sẽ giúp bạn hiểu grid được chia như thế nào.

<code>footer</code> sẽ chiếm toàn bộ dòng bên dưới. <code>sidebar</code> và <code>content</code> sẽ chiếm cột đầu tiên và thứ 2 của dòng bên bên.

Đến đây chúng ta có:

```css
body {
      display: grid;
      grid-template-columns: 40px 1fr;
      grid-template-rows: 1fr 90px;
      grid-template-areas: "sidebar  content"
                           "footer  footer";
  }
```

Kết quả sẽ như dưới đây:

![](https://cdn-images-1.medium.com/max/900/1*LNfazbNhUOy6YBEE7Sr_Uw.png)

<figcaption>Bước 1: <a href="https://codepen.io/ohansemmanuel/pen/bRWrPE">https://codepen.io/ohansemmanuel/pen/bRWrPE</a></figcaption>


