+++
date = "2018-02-24T13:59:46+02:00"
tags = ["web"]
title = "5 tính năng HTML và CSS mới được mong đợi trong năm 2018"
description = "Chúng tôi sẽ tóm tắt ngắn gọn về 5 tính năng HTML và CSS mới thực sự thú vị mà gần đây đã được thêm vào các ngôn ngữ này"
keywords = ""
image = "/img/photo-1450044804117-534ccd6e6a3a.jpg"
draft = false
+++

*Bài viết được dịch từ: [dzone.com](https://dzone.com/articles/5-exciting-new-html-and-css-features-to-look-forwa)*

HTML và CSS luôn phát triển, cung cấp cho các lập trình viên front-end và các nhà thiết kế web nhiều khả năng mới. Hôm nay, chúng ta hãy cùng xem 5 tính năng HTML và CSS mới thật sự thú vị để tạo các trang web tốt hơn trong năm 2018.

## Native &lt;dialog&gt; Element

Được phát hành cùng với HTML 5.2 spec vào 12&#47;2017, phần tử <code>&lt;dialog&gt;</code> cung cấp khả năng tạo các hộp thoại bằng HTML thuần.

Các trình duyệt hỗ trợ <code>&lt;dialog&gt;</code> tại thời điểm viết bài (01&#47;2018): [Chrome, Chrome mobile](https://caniuse.com/#search=dialog)

```html
<dialog>  
  <h2>Your title</h2>
  <p>Your content...</p>
</dialog>
```

## CSS Scroll Snap Points

CSS Scroll Snap là một mô-đun mới của CSS giới thiệu các vị trí scroll snap. Chúng xác định các vị trí cụ thể mà scrollport của một container có thể kết thúc sau khi một thao tác cuộn đã hoàn thành. 

Tính năng này [chưa được triển khai](https://caniuse.com/#feat=css-snappoints) trong hầu hết các trình duyệt.

```css
img {
    /* Specifies that the center of each photo
       should align with the center of the scroll
       container in the X axis when snapping */
    scroll-snap-align: center none;
}
.photoGallery {
    width: 500px;
    overflow-x: auto;
    overflow-y: hidden;
    white-space: nowrap;
    /* Requires that the scroll position always be
       at a snap position when the scrolling
       operation completes. */
    scroll-snap-type: x mandatory;
}
```

```html
<div class="photoGallery">
    <img src="img1.jpg">
    <img src="img2.jpg">
    <img src="img3.jpg">
    <img src="img4.jpg">
    <img src="img5.jpg">
</div>
```

Trong ví dụ trên, một loạt hình ảnh được sắp xếp trong một container cuộn được sử dụng để xây dựng một thư viện ảnh (photo gallery). 

Hiện tại nó vẫn ở trạng thái [nháp](https://drafts.csswg.org/css-scroll-snap/), hãy đọc để biết thêm thông tin về chức năng mới thú vị này.

## Inline CSS trong &lt;body&gt;

HTML 5.2 spec cho phép tạo style inline CSS trong body như một cách hợp lệ. Không phải là tính năng mới thú vị nhất, nhưng điều này có thể thực sự hữu ích trong một số trường hợp.

```html
<body>  
    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
    <style>
        p { color: #069; }
    </style>
    <p>Vestibulum interdum pellentesque massa</p>
</body>
```

## Các biến

Các [CSS preprocessor](https://www.catswhocode.com/blog/8-css-preprocessors-to-speed-up-development-time) đã có các biến trong một thời gian dài. Tuy nhiên, tôi rất vui mừng về ý tưởng các biến có sẵn trong CSS. 

Các biến CSS đã triển khai khá tốt và sẽ hoạt động hoàn hảo trong hầu [hết các trình duyệt](https://caniuse.com/#feat=css-variables). 
Bạn có thể đọc thêm thông tin trên [W3C](https://drafts.csswg.org/css-variables/). 

Bây giờ, đây là một ví dụ, tự giải thích về cách sử dụng các biến trong CSS:

```css
:root {
  --main-color: #069;
}
h1, h2, h3 { color: var(--main-color); }  
a { color: var(--main-color); text-decoration:underline }
```

## Support Queries

Như đã thấy với các tính năng đã được giới thiệu ở phía trên, khả năng tương thích của trình duyệt vẫn luôn là vấn đề lớn khi sử dụng các tính năng CSS mới. 

Tính năng <code>@supports</code> cung cấp cho các lập trình viên một cách để đưa ra các [rule](https://www.w3schools.com/css/css_syntax.asp) dựa trên việc một thuộc tính cụ thể có được hỗ trợ trong CSS hay không. 

<code>@supports</code> hiện [được hỗ trợ](https://caniuse.com/#feat=css-featurequeries) bởi tất cả các trình duyệt ngoại trừ Internet Explorer 11.

```css
@supports (mix-blend-mode: overlay) {
  .example {
    mix-blend-mode: overlay;
  }
}
```

Để hiểu rõ hơn tính năng này, tôi khuyên bạn nên đọc [bài viết thú vị này](https://www.sitepoint.com/an-introduction-to-css-supports-rule-feature-queries/).

## Đọc thêm

[https://www.w3.org/TR/css-scroll-snap-1/#examples](https://www.w3.org/TR/css-scroll-snap-1/#examples)

[https://css-tricks.com/introducing-css-scroll-snap-points/](https://css-tricks.com/introducing-css-scroll-snap-points/)

[https://webdesign.tutsplus.com/tutorials/how-to-scroll-snap-using-css--cms-30333](https://webdesign.tutsplus.com/tutorials/how-to-scroll-snap-using-css--cms-30333)
