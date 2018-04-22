+++
date = "2018-04-21T13:59:46+02:00"
tags = ["react"]
title = "Làm thế nào để tổ chức các ứng dụng React của bạn tốt hơn?"
description = "Và tất cả những điều này xảy bởi vì ứng dụng của bạn đã không được thiết kết tốt ngay từ đầu"
keywords = "react, react native, redux, organize, application"
image = "/img/organize-react.jpg"
draft = false
+++

*Bài viết được dịch từ: [medium.com](https://medium.com/@alexmngn/how-to-better-organize-your-react-applications-2fd3ea1920f1)*

![](https://cdn-images-1.medium.com/max/900/1*HSisLuifMO6KbLfPOKtLow.jpeg)

## Nội dung
<!-- TOC orderedList:true updateOnSave:false -->

1. [Giới thiệu](#giới-thiệu)
2. [Những thách thức khi xây dựng một ứng dụng là gì?](#những-thách-thức-khi-xây-dựng-một-ứng-dụng-là-gì)
3. [Hướng tiếp cận tốt hơn để tổ chức ứng dụng của bạn là gì?](#hướng-tiếp-cận-tốt-hơn-để-tổ-chức-ứng-dụng-của-bạn-là-gì)
    1. [Components](#components)
    2. [Scenes](#scenes)
    3. [Services](#services)
4. [Kết luận](#kết-luận)
5. [Đọc thêm](#đọc-thêm)

<!-- /TOC -->

## Giới thiệu
Tôi đã từng làm việc với rất nhiều dự án React lớn trong một vài năm qua, bắt đầu từ không cho tới vài chục lập trình viên khác, mở rộng các ứng dụng để có thể phục vụ hàng triệu người dùng. Và đôi khi, nếu bạn không bắt đầu với một cấu trúc thư mục tốt, có thể khó để giữ cho code của bạn được tổ chức tốt.

[Nathanael Beisiegel](http://engineering.kapost.com/author/nathanaelbeisiegel/) đã viết một bài khá hay giải thích chiến thuật anh ấy dùng để tổ chức các ứng dụng React lớn, nhưng tôi vẫn chưa hài lòng với hướng tiếp cận của anh ấy. Vì thế, tôi quyết định dành thời gian để tìm ra cách tốt nhất để tổ chức các dự án React của mình trong tương lai.

Chú ý 1: Tôi sử dụng Redux trong tất cả các ví dụ của bài viết này. Nếu bạn không biết Redux là gì, bạn có thể xem [tài liệu ở đây](http://redux.js.org/).

Chú ý 2: Tất cả các ví dụ dựa trên ReactJS, nhưng bạn có thể sử dụng cùng cấu trúc này cho các ứng dụng React-Native.

*Chỉnh sửa 04/2018: Nếu muốn cải thiện cấu trúc codebase, thì bạn cũng có thể muốn đọc một bài viết gần đây của tôi viết về [Tại sao các lập trình viên React nên mô đun hóa các ứng dụng của họ](https://medium.com/@alexmngn/why-react-developers-should-modularize-their-applications-d26d381854c1).*

## Những thách thức khi xây dựng một ứng dụng là gì?
Điều này đã hoặc sẽ xảy ra với hầu hết các lập trình viên trong suốt sự nghiệp của họ:

- Bạn xây dựng một ứng dụng cho một khác hàng với một team gồm vài lập trình viên, mọi thứ làm việc rất tốt.
- Khách hàng của bạn yêu cầu thêm các tính năng mới, tốt thôi, bạn thêm chúng.
- Khách hàng của bạn yêu cầu loại bỏ một vài tính năng và thêm một vài tính năng mới, nó bắt đầu trở nên phức tạp, bạn không để ý đến điều đó, và vẫn làm cho nó hoạt động mặc dù nó không hoàn hảo.
- Bây giờ khách hàng của bạn muốn bạn thay đổi một vài tính năng, loại bỏ một vài cái khác và thêm một số tính năng mới cái không được mong đợi. Đến đây code của bạn bắt đầu trở nên chắp vá. Bạn không thực sự tự tin về nó nhưng nó hoạt động.
- 6 tháng sau, sau khi trải qua một vài lần thay đổi như trên, code của ứng dụng trở nên thực sự phức tạp để đọc và hiểu, mọi thứ giống như món mì spaghetti của Ý.

Cho đến ngày khách hàng của bạn quyết định tạo ra một phiên bản mới cho ứng dụng, với code và tính năng mới. Trong một vài trường hợp, bạn vẫn phải giữ code cũ chạy cùng với code mới, và nó trở nên khó khăn hơn để bảo trì. Và tất cả những điều này xảy bởi vì ứng dụng của bạn đã không được thiết kết tốt ngay từ đầu.

Khi bắt đầu học React, tôi đã tìm thấy một vài bài viết khá hay giải thích cách tạo Todo list hay các game đơn giản. Những bài viết này rất hữu ích để hiểu những khái nhiệm cơ bản của React, nhưng tôi nhanh chóng nhận thấy mình không thể tìm ra cách sử dụng React để xây dựng các ứng dụng thực sự với hàng chục trang và hàng trăm component.

Sau một vài nghiên cứu, tôi đã học được rằng các dự án React boilerplate trên Github đều được cấu trúc tương tự nhau, chúng tổ chức tất các các tệp tin theo kiểu. Điều này có thể khá quen với bạn:

```structure
/src
  /actions
    /notifications.js
      
 /components 
    /Header
    /Footer
    /Notifications
      /index.js
  /containers
    /Home
    /Login
    /Notifications
      /index.js
  /images
    /logo.png
  /reducers 
    /login.js
    /notifications.js
  /styles 
    /app.scss
    /header.scss 
    /home.scss
    /footer.scss
    /notifications.scss
  /utils
  index.js  
```

Cấu trúc thư mục này có thể ổn để xây dựng website hay ứng dụng của bạn, nhưng tôi tin rằng nó không phải là cấu trúc thư mục tốt nhất.

Nếu bạn tổ chức các tệp tin theo kiểu, khi ứng dụng của bạn phát triển, nó thường trở nên khó bảo trì. Theo thời gian bạn sẽ nhận ra điều này, lúc đó thường đã quá muộn và bạn sẽ phải đầu tư nhiều thời gian và tiền bạc để thay đổi mọi thứ, hoặc để hỗ trợ nó trong một vài năm tới.

Điều tốt là với React bạn có thể cấu trúc ứng dụng của mình theo bất kỳ cách nào bạn thích. Bạn không bắt buộc phải tuân theo một cấu trúc thư mục nhất định, React chỉ đơn giản là một thư viện javascript.

## Hướng tiếp cận tốt hơn để tổ chức ứng dụng của bạn là gì?
Trong một vài năm tôi đã làm việc cho một tổ chức tài chính sử dụng Ember như một framework javascript chính để xây dựng tất cả các ứng dụng web mới của họ. Một trong những thứ thú vị về Ember là khả năng cấu trúc dự án bạn theo các tính năng, thay vì kiểu. Và điều này đã thay đổi mọi thứ.

Pods trong Ember khá tốt nhưng vẫn bị giới hạn, và tôi muốn một thứ gì đó linh hoạt hơn. Sau một vài thử nghiệm, cố gắng để tìm ra đâu là cấu trúc tốt nhất, tôi đã tìm ra. Ở đó, tôi quyết định nhóm tất cả các tính năng liên quan với nhau, và lồng chúng trong nhau nếu cần thiết. Đây là cách tôi đang sử dụng:

```structure
/src
  /components 
    /Button 
    /Notifications
      /components
        /ButtonDismiss  
          /images
          /locales
          /specs 
          /index.js
          /styles.scss
      /index.js
      /styles.scss
  /scenes
    /Home 
      /components 
        /ButtonLike
      /services
        /processData
      /index.js
      /styles.scss
    /Sign 
      /components 
        /FormField
      /scenes
        /Login
        /Register 
          /locales
          /specs
          /index.js
          /styles.scss
  /services
    /api
    /geolocation
    /session
      /actions.js
      /index.js
      /reducer.js
    /users
      /actions.js
      /api.js
      /reducer.js
  index.js 
  store.js
```

Mỗi component, scene hay service (một feature) có mọi thứ cần thiết để hoạt động, chẳng hạn như các style (css), image, translation, tập hợp các action cũng như unit hay intergration test. Bạn có thể coi một tính năng giống như một phần code độc lập mà bạn sẽ sử dụng trong ứng dụng (hơi giống *node modules*).

Chúng ta cũng cần tuân theo các quy tắc sau:

- Một component có thể định nghĩa các component hay service bên trong nó. Nhưng không thể sử dụng hay định nghĩa các sence (các trang).
- Một scene (trang) có thể định nghĩa các component, sence hay service bên trong nó.
- Một service có thể định nghĩa các service khác bên trong nó. Nó không thể sử dụng hay định nghĩa các component hoặc scene.
- Các feature lồng nhau chỉ có thể sử dụng từ cha của chúng.

*Chú ý: feature cha có nghĩa là cha, ông, cụ... Bạn không thể sử dụng một feature "ngang hàng", nó không được phép. Bạn sẽ cần di chuyển nó tới feature cha để có thể sử dụng.*

Hãy phân tích cấu trúc này.

### Components
Bạn biết component là gì, nhưng một điều quan trọng là khả năng lồng một component trong một component khác.

Các component được định nghĩa tại mức root của dự án, trong thư mục *components* là toàn cục (global) và có thể được sử dụng ở bất kỳ đâu trong ứng dụng. Nhưng nếu định nghĩa một component mới bên trong component khác (lồng), component mới này chỉ có thể được sử dụng trong cha trực tiếp của nó.

**Tại sao bạn muốn làm điều này?**

Khi bạn phát triển một ứng dụng lớn, một điều thường xuyên xảy ra là bạn cần tạo một component mà bạn biết chắc sẽ không tái sử dụng ở bất cứ đâu, nhưng bạn cần nó. Nếu bạn thêm nó vào mức root của thư mục *components*, số lượng các component tại mức root sẽ rất nhiều. Chắc chắn bạn có thể phân loại chúng, nhưng khi cần dọn dẹp, bạn sẽ không nhớ hết tất cả các component để làm gì và chúng vẫn còn được sử dụng ở những đâu.

Mặc dù, bạn xác định tại mức root chỉ có những component chính của ứng dụng như các button, form field, thumbnail, nhưng vẫn có những component phức tạp như listComments, formComposer với các thành phần con của chúng, lồng các component sẽ giúp việc tìm kiếm cái bạn cần dễ dàng hơn.

Ví dụ:

```structure
/src
  /components
    /Button
      /index.js
    /Notifications 
      /components 
        /ButtonDismiss 
          /index.js
      /actions.js
      /index.js
      /reducer.js
```

- *Button* có thể được sử dụng ở bất kỳ đâu trong ứng của bạn.
- *Notifications* cũng có thể được sử dụng ở bất kỳ đâu. Component này định nghĩa một component *ButtonDismiss*. Bạn không thể sử dụng *ButtonDissmiss* ở bất kỳ đâu ngoài *Notifications* component.
- *ButtonDismiss* sử dụng *Button* bên trong nó, điều này được phép bởi vì *Button* được định nghĩa tại mức root của thư mục *components*.

### Scenes
Một scene là một trang (page) trong ứng dụng của bạn. Bạn có thể thấy một scene giống như bất kỳ component nào khác, nhưng tôi thích chia chúng vào một thư mục riêng.

Nếu bạn sử dụng [React-Router](https://github.com/reactjs/react-router) hay [React Native Rounter](https://github.com/aksonov/react-native-router-flux), bạn có thể import tất cả scenes trong tệp tin <code>index.js</code> chính và thiết lập các route.

Giống như các component các scene cũng có thể lồng trong nhau, và bạn cũng có thể định nghĩa các component hay service trong một scene. Bạn cũng phải nhớ rằng nếu bạn quyết định một thứ gì đó bên trong một scene, bạn chỉ có thể sử dụng nó bên trong thư mục scene đó mà thôi.

Ví dụ:

```structure
/src
  /scenes
    /Home 
      /components
        /ButtonShare
          /index.js
      /index.js
    /Sign
      /components
        /ButtonHelp
          /index.js
      /scenes
        /Login
          /components 
            /Form
              /index.js
            /ButtonFacebookLogin
              /index.js
          /index.js
       
        /Register
          /index.js
      /index.js
```

- *Home* có một component *ButtonShare*, nó chỉ có thể được sử dụng bởi Home scene.
- *Sign* có một component *ButtonHelp*. Component có thể được sử dụng bởi *Login* hay *Register* scene, hay bởi bất kỳ component định nghĩa trong các scenen này.
- *Form* component có thể sử dụng *ButtonHelp*, điều này được cho phép bởi vì *ButtonHelp* được định nghĩa tại thư mục cha  (*Sign*).
- *Register* scene không thể sử dụng bất kỳ component nào được định nghĩa trong *Login*, nhưng nó có thể sử dụng *ButtonHelp*.

### Services
Không phải mọi thứ đều có thể là component, bạn sẽ cần tạo ra các mô đun độc lập có thể được sử dụng bởi các component hay scene (trang).

Bạn có thể coi một service như một mô đun khép kín nơi định nghĩa các business logic chính cho ứng dụng của mình. Nó có thể được chia sẻ giữa nhiều scene hay thậm chí là các ứng dụng, chẳng hạn như một phiên bản web (ReactJS) và native (React-Native) của bạn.

```structure
/src
  /services
    /api
      /services
        /handleError
          /index.js
      /index.js
    /geolocation 
    /session 
      /actions.js
      /index.js
      /reducer.js
```

Tôi khuyên bạn nên tạo các service để quản lý tất cả các request api. Bạn có thể xem chúng như là cầu nối/ bộ điều hợp (adapter) giữa server API và tầng view (các scene và component) trong ứng dụng của mình. Các scene hay component sẽ chỉ gửi (dispatch) các action, đọc store và tự cập nhật dựa trên các thay đổi mới.

## Kết luận
Tôi đã làm việc với cấu trúc thư mục này trong một vài tháng qua trên dự án cá nhân được xây dựng với React-Native, và tôi có thể nói với bạn nó tiết kiệm cho tôi khá nhiều thời gian. Mọi thứ đơn giản hơn rất nhiều khi nhóm tất cả các thực thể liên quan lại với nhau, kết quả là mọi thứ trở nên dễ dàng hơn để làm việc.

Cấu trúc thư mục này là một trong nhiều cách để tổ chức dự án của bạn, hiện nay nó là cách tôi thích và tôi hi vọng nó sẽ giúp bạn cải thiện dự án của mình!

Nếu bạn quan tâm tới các dự án đang hoạt động, tôi có vài dự án trên Github sử dụng cấu trúc thư mục này:

- [https://github.com/alexmngn/react-rock-paper-scissors](https://github.com/alexmngn/react-rock-paper-scissors) (ReactJS)
- [https://github.com/alexmngn/react-native-authentication](https://github.com/alexmngn/react-native-authentication) (React-Native)

## Đọc thêm
- [Why React developers should modularize their applications?](https://medium.com/@alexmngn/why-react-developers-should-modularize-their-applications-d26d381854c1)
- [What are the main differences between ReactJS and React-Native?](https://medium.com/@alexmngn/from-reactjs-to-react-native-what-are-the-main-differences-between-both-d6e8e88ebf24)
- [The essential boilerplate to authenticate users on your React-Native app](https://medium.com/@alexmngn/the-essential-boilerplate-to-authenticate-users-on-your-react-native-app-f7a8e0e04a42)