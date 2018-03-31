+++
date = "2018-03-31T13:59:46+02:00"
tags = ["css grid"]
title = "Làm thế nào để thành thạo CSS Grid trong nháy mắt - p3 (hết)"
description = "Bạn sẽ học được kỹ năng vô giá khi kết hợp CSS Grid với Flexbox"
image = "/img/master-css-grid-responsive.gif"
draft = false
+++

*Bài viết được dịch từ: [medium.com](https://medium.com/flexbox-and-grids/how-to-efficiently-master-the-css-grid-in-a-jiffy-585d0c213577)*

## Làm cho bố cục responsive - Định nghĩa lại Grid areas với Media Queries

![](/img/master-css-grid-responsive.gif)
<figcaption><a href="https://dribbble.com/msenyil">Muharrem Senyil</a></figcaption>

Các Grid area mà bạn đã tạo trong grid container có thể thay đổi tùy theo kích thước màn hình của người sử dụng.

Dưới đây là hình ảnh ứng dụng trên màn hình điện thoại.

![](https://cdn-images-1.medium.com/max/900/1*Gd8H2uQF3-TVi4lq7g1UAw.png)

Chúng ta sẽ refactor lại code theo hướng tiếp cận mobile first.

Mobile first đơn giản là làm cho style mặc định của bạn là dành cho các thiết di động. Sau đó bạn sẽ tạo ra các thay đổi cho các màn hình lớn hơn thông qua các media query.

Đặt một phần code hiện nay trong một định nghĩa media query. Như dưới đây:

```css
@media only screen and (min-width: 600px) {
    body {
        grid-template-columns: 50px 1fr;
        grid-template-areas: "sidebar  content"
                             "footer   footer";
         }
}
```

Bạn sẽ để đoạn code mặc định bên ngoài media query

```css
body {
    display: grid;
    grid-template-rows: 1fr 100px;
}
```

Tại sao chúng ta đặt <code>grid-template-rows: 1fr 100px;</code> bên ngoài media query?

Bởi vì cả màn hình di động và desktop chúng ta đều có 2 dòng.

Tuy nhiên, trên màn hình desktop. Sidebar là 50px trong định nghĩa <code>grid-template-columns</code>. Còn trên các thiết bị di động sidebar không tồn tại.

Vì thế, chúng ta sẽ định nghĩa lại khai báo <code>grid-template-columns</code> cho di động.

Bây giờ với các thiết bị di động chúng ta sẽ sử dụng style này là mặc định:

```css
body {
   grid-template-areas: "content"
                        "footer" 
```

Khá đơn giản phải không? Hãy để tôi giải thích.

## Dòng chảy (hướng) của Grid
Đoạn code cho di động như thế này:

```css
body {
   grid-template-areas: "content"
                        "footer"
```

Bởi mặc định, một grid sẽ sắp xếp các phần tử trên các dòng.

Vì thế khai báo ở phía trên sẽ sắp xếp <code>content</code> trên một dòng và <code>footer</code> trên một dòng khác.

Dưới đây là kết quả - sidebar sẽ ẩn trên màn hình di động:

![](https://cdn-images-1.medium.com/max/900/1*WeVXg_bAwa5UKqdZHiwQ7w.gif)
<figcaption>BƯỚC 2: <a href="https://codepen.io/ohansemmanuel/pen/qjVvjJ?editors=1100">https://codepen.io/ohansemmanuel/pen/qjVvjJ?editors=1100</a></figcaption>

## Thêm nội dung vào trong Grid
Khi kết thúc phần này chúng ta sẽ có một bố cục ứng dụng âm nhạc hoàn chỉnh. Bây giờ hãy tập trung và việc sắp xếp nội dung trong grid.

### 1. Sidebar
Sidebar bao gồm 8 icon cách đều nhau dọc theo toàn bộ chiều dài của sidebar.

Hãy chèn các icon vào sidebar:

```html
<div class="aside">
      <i class="fa fa-bars"></i>
      <i class="fa fa-home"></i>
      <i class="fa fa-search"></i>
      <i class="fa fa-volume-up"></i>
      <i class="fa fa-user"></i>
      <i class="fa fa-spotify"></i>
      <i class="fa fa-cog"></i>
      <i class="fa fa-soundcloud"></i>
</div>
``` 

Kết quả sẽ như thế này:
![](https://cdn-images-1.medium.com/max/900/1*DY1tA49VLEOy0I5Fb_HmlQ.png)
<figcaption><a href="https://codepen.io/ohansemmanuel/pen/BZmbza"></a>https://codepen.io/ohansemmanuel/pen/BZmbza</figcaption>

Các icon cũng sẽ ẩn trên màn hình di động. Và chỉ hiển thị trên các màn hình lớn hơn. Đây là hướng tiếp cận mobile first.

```css
.aside i {
  display: none;
}
@media only screen and (min-width:600px) {
  .aside i {
    display: block;
  }
```

### Sắp xếp các icon
Các thẻ <code>i</code> là các phần tử inline -- điều đó giải thích tại sao 2 icon lại hiển thị cạnh nhau trên một dòng.

Hãy sắp xếp chúng.

>Các phần tử con của grid container cũng có thể trở thành các grid container. Tại sao không?

### Bước 1: Biến Sidebar thành một Grid Container
Điều này sẽ cung các tính năng căn chỉnh của grid.

Khi sidebar chỉ hiển thị trên các màn hình lớn hơn, đừng quên đặt nó trong media query.

```css
@media only screen and (min-width:600px) {
  .aside {
     display: grid; 
  }
  
  .aside i {
    border: 1px solid red;
  }
}
```

Tôi thêm border cho mỗi icon - để chúng ta dễ phân biệt.

![](https://cdn-images-1.medium.com/max/900/1*QcpsRWdU5Q01YC-C2Et11w.png)

Chuyện gì đang xảy ra ở đây?

Chúng ta KHÔNG thiết lập bất kỳ dòng hay cột trong sidebar. Nhưng chúng ta thấy các icon được sắp xếp khá tốt. Grid tự động thiết lập điều đó.

Đây là vị trí mặc định của các item trong một grid -- trên cùng một dòng. 

Một grid cũng có thể sắp xếp các phần tử sử dụng <code>justify-items</code> hay <code>align-items</code>.

<code>justify-items</code> sẽ sắp xếp các phần tử theo chiều ngang.

<code>align-items</code> sẽ sắp xếp các phần tử theo chiều dọc.

Áp dụng điều này cho sidebar, và chúng ta có một bổ cục các icon hoàn hảo:

```css
.aside {
     ...
     justify-items: center;
     align-items: center;
  }
```

Bạn vẫn cảm thấy khó hiểu, hãy xem video dưới đây:

<iframe width="659" height="370" src="https://www.youtube.com/embed/pN2rGbEfNw8" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>

Bây giờ chúng ta đã một bố cục hoàn hảo dành cho các icon trong sidebar.

![](https://cdn-images-1.medium.com/max/900/1*gwdH9pKxjMw7MnO8vPmTgw.png)
<figcaption><a href="https://codepen.io/ohansemmanuel/pen/MorYJq?editors=1100">https://codepen.io/ohansemmanuel/pen/MorYJq?editors=1100</a></figcaption>


<code>justify-items</code> hay <code>align-items</code> có thể có các giá trị:

- stretch
- start
- end
- center

Nếu đã từng làm việc với Flexbox, bạn sẽ quen với chúng.

Chúng ta sẽ thêm nhiều nội dung hơn vào thiết kế hiện tại.

Thêm 2 thẻ <code>div</code> vào <code>main section</code>:

```html
<div class="main">
  <div class="main__header"></div> 
  <div class="main__body"></div>
</div>
```

1. <code>main__header</code> sẽ như thế này:
![](https://cdn-images-1.medium.com/max/900/1*K2ikIxNuiWo8tfY-5RvBXg.png)

2. <code>main__body</code> sẽ như thế này:
![](https://cdn-images-1.medium.com/max/900/1*hc80JsuD3IsxxwrAijFWzQ.png)

Trong phần này chúng ta sẽ tập trung vào <code>main__header</code>

Đầu tiên, thêm đoạn code <code>html</code> này:

```html
<div class="main__header">
      <div class="img">
          <img src="http://bit.ly/2sc2NJd"/>
      </div> 
      <section class="details"> 
          <div>
              <p>CattyBoard Top 100 Single Charts (11.06.36)</p>
              <p class="sm--hide">Unknown Artist</p>
              <p class="sm--hide">2016 . Charts . 100 songs</p>
          </div>
          <div> 
               <i class="fa fa-play"> &nbsp;Play all</i>
               <i class="fa fa-plus"> &nbsp;Add to</i>
               <i class="fa fa-ellipsis-h">&nbsp;&nbsp;More</i>
          </div>
      </section>
</div>
```

Chú ý cấu trúc của tài liệu

<code>main__header</code> có hai con trực tiếp. Một <code>div</code> chứa một hình ảnh và <code>section</code> chứa thông tin chi tiết của album.

Kết quả của đoạn code trên khá xấu xí:

![](https://cdn-images-1.medium.com/max/720/1*uhNqMg2RUv_bo5371BrOfQ.png)

Hãy làm cho nó đẹp hơn.

Cái chúng ta cần là một grid với các phần tử được sắp xếp phù hợp.

Hãy sử dụng những kiến thức về grid areas

Đầu tiên, định nghĩa grid area:

```css
.main__header > .img {
  grid-area: img;
}
.main__header > .details {
  grid-area: dtls;
}
```

<code>div</code> chứa hình ảnh được đặt tên là <code>img</code>. Phần chứa thông tin chi tiết của album được đặt tên là <code>dtls</code>.

Bây giờ, định nghĩa grid:

```css
.main__header {
  display: grid;
  grid-template-areas: "img"
                       "dtls"; 
}
```

<code>.main__header</code> trở thành một grid container, có 2 phần tử xếp chồng lên nhau đầu tiên là <code>img</code> tiếp theo là <code>dtls</code>. Bởi vì chúng ta đang theo hướng tiếp cận mobile first.

Tại thời điểm này, không có nhiều thay đổi.

![](https://cdn-images-1.medium.com/max/720/1*h60PmaHUtZAMZrC5xrRtbA.png)

Đây không phải là cái chúng ta muốn trên di động.

Với màn hình di động, các phần tử nên được căn giữa.

```css
@media screen and (max-width: 600px) {
  .main__header {
    justify-items: center;
  } 
}
```

Kết quả sẽ như dưới đây:

![](https://cdn-images-1.medium.com/max/720/1*9Yi3TudvNbbTdYtDBsqL1w.png)

Tiếp theo hãy làm cho text trong <code>.details</code> căn giữa:

```css
@media screen and (max-width: 600px) {
  .main__header > .details {
    text-align: center;
  }  
}
```

![](https://cdn-images-1.medium.com/max/720/1*Dj_iJrYWYA4lpQdxuzx4Cw.png)

Đã khá gần với mục tiêu chỉ cần thêm một vài điều chỉnh.

Đoạn text *Unknown Artist* và *2016 . Charts . 100 songs* nên ẩn trên di động. Ảnh cũng nên nhỏ hơn.

```css
@media screen and (max-width: 600px) {
  .sm--hide {
    display: none;
  } 
  .img > img {
    width: 150px
  }
}
```

Class <code>.sm--hide</code> sẽ ẩn trên di động. Chỉ cần thêm class tới phần tử mong muốn. Như thế này:

```html
<p class="sm--hide">Unknown Artist</p>
<p class="sm--hide">2016 . Charts . 100 songs</p>
```

Và chúng ta có:

![](https://cdn-images-1.medium.com/max/720/1*3EldPliJB9kqZmu9B1UaRg.png)

Màn hình di động đã xong. Giờ hãy thêm style cho những màn hình lớn hơn.

Với màn hình lớn hơn, chúng ta cần một grid 2 cột. Style sẽ như thế này:

```css
@media only screen and (min-width:600px) {
   .main__header {
    grid-template-columns: 250px 1fr;
    grid-template-areas: "img dtls"
  } 
}
```

Grid đã được định nghĩa lại với 2 cột. Một có độ rộng cố định là 250px và cột kia chiếm toàn bộ khoảng trống còn lại.

![](https://cdn-images-1.medium.com/max/720/1*iFRIMSqQYAl2AhHBgsCjdw.gif)
<figcaption><a href="https://codepen.io/ohansemmanuel/pen/gReOQJ?editors=1100">https://codepen.io/ohansemmanuel/pen/gReOQJ?editors=1100</a></figcaption>

## Phần 4: Kết hợp CSS Grid với Flexbox
Trong phần này bạn sẽ học cách sử dụng Flexbox và Grid cùng nhau.

Hai module này đã thay đổi cách xử lý bố cục trong CSS. Và cách hiệu quả nhất là sử dụng cả 2 module cùng nhau.

Hãy đi vào chi tiết.

Với phần hiển thị thông tin chi tiết của album chúng ta sẽ sử dụng flexbox.

![](https://cdn-images-1.medium.com/max/900/1*hc80JsuD3IsxxwrAijFWzQ.png)

### Làm sao để biết chỗ nào sẽ sử dụng Flexbox?
Quy tắc chung là sử dụng Grid cho bố cục toàn bộ trang, còn Flexbox dành cho UI bên trong các phần tử con.

Một phần tử con có thể là một flex container. Một phần tử con của flex container cũng có thể là một grid container.

Tôi giả sử rằng bạn đã biết về [flexbox](https://medium.freecodecamp.org/understanding-flexbox-everything-you-need-to-know-b4013d4dc9af).

Hãy sửa <code>.main__body</code> thành:

```html
<div class="main__body">
    <div>
            <p>1. One Dance</p>
            <p>Crake feat CatKid &amp; Cyla</p>
            <p>2:54</p>
            <p><span>CATTY CLOUD SYNC</span></p>
    </div>
    <div>
            <p>2. Panda</p>
            <p>Cattee</p>
            <p>4:06</p>
            <p><span>CATTY CLOUD SYNC</span></p>
    </div>
    <div>
            <p>3. Can't Stop the Feeling!</p>
            <p>Catin Cimberlake</p>
            <p>3:56</p>
            <p><span>CATTY CLOUD SYNC</span></p>
        </div>
        <div>
            <p>4. Work From Home</p>
            <p>Cat Harmony feat Colla</p>
            <p>3:34</p>
            <p><span>CATTY CLOUD SYNC</span></p>
        </div>
</div>
```

Đây là cái chúng ta có:

![](https://cdn-images-1.medium.com/max/720/1*lz7cE6DLCPeX-S6bwCVRJw.gif)

<code>main__body</code> là một phần tử của grid. Chúng ta có thể biến nó thành flex container nếu điều đó hữu ích.

Trong trường hợp của chúng ta, mỗi thẻ <code>div</code> là con trực tiếp của <code>main__body</code> cần trở thành một flex container. Chúng chứa tên bài hát, nghệ sĩ, thời gian và "catty cloud sync".

```css
.main__body > div {
  display:flex;
}
```

Bây giờ chia chiều rộng cho các phần tử con:

```css
.main__body > div p {
  flex: 0 0 25%;
}
```

![](https://cdn-images-1.medium.com/max/720/1*F7_nB62n6q9TV9aDJJ23tA.png)
<figcaption><a href="https://codepen.io/ohansemmanuel/full/pwLEBL/">https://codepen.io/ohansemmanuel/full/pwLEBL/</a></figcaption>

Bạn sẽ đồng ý với tôi rằng tại thời điểm này, các yếu tố cần thiết cho bố cục đã hoàn thành.

Tuy nhiên, tôi đã thực hiện một vài thay đổi. Bạn có thể xem kết quả cuối cùng ở [đây](https://codepen.io/ohansemmanuel/full/QgxEqz/).

Bạn sẽ nhận thấy rằng tôi vẫn để trống footer. Đó là bài tập cho bạn. Lời khuyên của tôi là sử dụng flexbox. Nó sẽ giúp bạn hiểu cách cả hai module này làm việc cùng nhau. 

Với một vài thuộc tính của grid, bạn đã xây dựng một bố cục thực sự. Khá ấn tượng. Bạn cũng học được kỹ năng vô giá khi kết hợp CSS Grid với Flexbox.