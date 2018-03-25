+++
date = "2018-03-24T13:59:46+02:00"
tags = ["css"]
title = "Làm thế nào để thành thạo CSS Grid trong nháy mắt - p1"
description = "Trong bốn phần của bài viết này, tôi sẽ chỉ cho bạn 20% cần thiết để có thể làm được 80% những gì bạn có thể làm với CSS Grid layout."
keywords = "CSS Grid, CSS Flexbox"
image = "/img/master-css-grid.png"
draft = false
+++

*Bài viết được dịch từ: [medium.com](https://medium.com/flexbox-and-grids/how-to-efficiently-master-the-css-grid-in-a-jiffy-585d0c213577)*

## Giới thiệu

Đây KHÔNG phải là một bài viết để học "mọi thứ" về css grid.

Bài viết này hướng đến những người muốn có kết quả nhanh chóng và hiệu quả.

Trong bốn phần của bài viết này, tôi sẽ chỉ cho bạn 20% cần thiết để có thể làm được 80% những gì bạn có thể làm với CSS Grid layout.

## Tại sao chỉ 20%?

> Với một lập trình viên, lười biếng là một đức tính tốt.

> Larry Wall

Bất cứ khi nào, một lập trình viên tìm kiếm sự hiệu quả - sự lười biếng sẽ giúp anh ta.

CSS Grid layout rất phức tạp. Theo ý kiến của tôi, nó phức tạp hơn Flexbox. (**tôi đã mất vài tuần để tìm hiểu flexbox**)

Không hẳn bởi vì nó "khó" mà do CSS Grid có tới 18 thuộc tính mới cộng với những khái niệm mà bạn chưa bao giờ nghe tới trước đó.

Vậy, bạn cần biết tất cả những thuộc tính mới này ngay bây giờ? Ngay lập tức?

Không, bạn không cần!

Bạn chỉ cần học một vài thuộc tính cần thiết ngay lúc này để tạo ra kết quả mong muốn. Những thuộc tính khác có thể học sau. Đó là định nghĩa về "hiệu quả" của tôi.

## CSS Grid layout là gì?

Nếu bạn mới học bố cục trong CSS, CSS Grid có thể khá xa lạ với bạn.

Bạn đã nghe nói tới Flexbox chưa?

Tôi thích coi CSS Grid như là một người anh (hoặc cha) của Flexbox.

Xử lý các bố cục trong CSS được coi là một công việc khó khăn và không hấp dẫn. Flexbox đã mang tới một chút không khí trong lành - nhưng CSS Grid thậm chí còn tốt hơn.

## Cái chúng ta sẽ xây dựng

Chúng ta sẽ học cách áp dụng 20% kiến thức để xây dựng bố cục responsive của một ứng dụng âm nhạc

![](https://cdn-images-1.medium.com/max/900/1*ripUP4LuXPQ851Zlq79bWQ.gif)

## Phần 1: 10% bạn cần biết - Các thuật ngữ cơ bản

### Grid Container là gì?

Mỗi bố cục các trang web hoặc ứng dụng bạn tạo ra (hoặc thấy) về bản chất là những chiếc hộp được đặt trong những đường ranh giới xác định.

![](https://cdn-images-1.medium.com/max/720/1*uFGh3Vo2i9MneYvjqJNhRw.gif)

Hiểu đơn giản, grid chỉ là "những được kẻ". Những đường kẻ ngang và dọc xác định vị trí của các phần tử được thiết kế khác nhau.

Bạn sẽ quen với grid nếu bạn đã sử dụng các phần mềm thiết kế như photoshop hoặc sketch.

Trong bối cảnh của CSS Grid layout, một Grid container là phần tử cha chứa tất cả các phần tử nằm trong grid. Grid container xác định vị trí ban đầu của các đường kẻ trong grid, cả dọc và ngang. 

### Grid Line là gì?

Giả sử bạn có một bố cục như thế này:

![](https://cdn-images-1.medium.com/max/900/1*xcID2GAZoYqhb4LYjN6Qug.png)

Bố cục bao gồm một grid container với các phần tử ở bên trong

![](https://cdn-images-1.medium.com/max/900/1*9K74dULhLERm5_3a37Byqw.png)

Grid lines chính là những đường kẻ ngang và dọc phân chia grid thành các ô.

### Grid Cell là gì?

Grid cell là đơn vị nhỏ nhất trong grid layout. Bất kỳ khoảng chống nào được xác định bởi 4 đường grid line.

![](https://cdn-images-1.medium.com/max/900/1*7X_NTZG0ikpVwsaB0qfdAw.png)

### Grid Area

Một grid area có thể giống như một grid cell (giống như ở phần trước). Hoạc cũng có thể trải rộng trên nhiểu hoặc tất cả grid cell trong grid.

Trong hình vẽ dưới đây, grid area trải rộng trên 4 ô.

![](https://cdn-images-1.medium.com/max/900/1*_4ZnWO3zlt82VMHQ_3VNXA.png)

### Grid Track

Một grid track có thể xem như một tên gọi cho các cột và các dòng. Nó là khoảng trống giữa 2 grid line bất kỳ.

Hình dưới đây là ví dụ về grid tracks

![](https://cdn-images-1.medium.com/max/360/1*-tby4L7UaQavuy6uc0H1LQ.png)

