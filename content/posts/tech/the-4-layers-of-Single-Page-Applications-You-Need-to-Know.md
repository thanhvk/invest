+++
date = "2018-04-14T13:59:46+02:00"
tags = ["web"]
title = "Bốn tầng của các ứng dụng Single Page mà bạn cần biết"
description = "Mọi dự án thành công cần một kiến trúc rõ ràng, cái mà mọi thành viên trong team đều hiểu."
keywords = "single page applications"
image = "/img/4-layers-single-page-applications.png"
draft = false
+++

*Bài viết được dịch từ: [hackernoon.com](https://hackernoon.com/architecting-single-page-applications-b842ea633c2e)*

## Nội dung

<!-- TOC orderedList:true updateOnSave:false -->

1. [Giới thiệu](#giới-thiệu)
2. [Bắt đầu xây dựng ứng dụng](#bắt-đầu-xây-dựng-ứng-dụng)
3. [Các framework hiện nay là declarative](#các-framework-hiện-nay-là-declarative)
4. [State](#state)
5. [Tầng domain](#tầng-domain)
6. [Tầng store](#tầng-store)
7. [Tầng application services](#tầng-application-services)
8. [Tầng view](#tầng-view)
9. [Tổng kết](#tổng-kết)

<!-- /TOC -->

## Giới thiệu
Hãy xây dựng và kiến trúc một ứng dụng React từ đầu, và khám phá domain và các dịch vụ của nó, store, application services và view.

![](https://cdn-images-1.medium.com/max/800/1*5aa2cNrij2fVO0rZTJCZHQ.png)
<figcaption>Bốn tầng của các ứng dụng single page - [Alberto V](https://dribbble.com/AlbertoV)</figcaption>

Mọi dự án thành công cần một kiến trúc rõ ràng, cái mà mọi thành viên trong team đều hiểu.

Tưởng tượng bạn là một thành viên mới. Technical leader thuyết trình về kiến trúc được đề xuất cho ứng dụng mới:

![](https://cdn-images-1.medium.com/max/800/1*6wpX8u_mM8Z1xdZVMFj67w.png)
<figcaption>Bốn tầng của các ứng dụng single page (chi tiết)</figcaption>

Anh ấy nói về các yêu cầu:

*Ứng dụng của chúng ta sẽ hiển thị một danh sách các bài viết. Người dùng có thể thêm, xóa và like các bài viết.*

Và sau đó anh ấy yêu cầu bạn làm nó!

## Bắt đầu xây dựng ứng dụng
Tôi chọn [Create React App](https://github.com/facebook/create-react-app) và [Flow](https://flow.org/) (để kiểm tra kiểu). Vì mục đích ngắn gọn, ứng dụng sẽ không có style.

Như một điều kiện tiên quyết, hãy nói về declarative của các framework hiện đại, và khái niệm state.

## Các framework hiện nay là declarative
React, Angular, Vue là [declarative](https://tylermcginnis.com/imperative-vs-declarative-programming/), nó khuyến khích chúng ta sử dụng các thành phần của lập trình chức năng (functional programming).

Bạn đã bao giờ thấy một quyển sách lật?

> Một quyển sách lật là một quyển sách với một chuỗi các hình ảnh thay đổi dần dần từ trang này đến trang khác, vì thế khi các trang chuyển động với tốc độ nhanh, hình ảnh trở lên sống động.

![](https://cdn-images-1.medium.com/max/800/1*YC8GwZboKkBFfJI8cRzUnQ.jpeg)

Bây giờ hãy kiểm tra một phần định nghĩa về React:

> Thiết kế các view đơn giản cho mỗi state trong ứng dụng của bạn,  React sẽ cập nhật và hiển thị (render) chỉ những component cần thay đổi.

Và một phần của Angular:

> Xây dựng các tính năng nhanh chóng với các template declarative, đơn giản. Mở rộng ngôn ngữ template với các component của bạn.

Nghe khá quen?

Các framework giúp chúng ta xây dựng các ứng dụng gồm các view. Các view biểu diễn state. Nhưng state là gì?

## State
State là bất kỳ dữ liệu nào có thể thay đổi trong ứng dụng.

Bạn ghé thăm một URL, đó là state, tạo một request Ajax để nhận danh sách các movie, đó lại là state, các thông tin lưu trữ trong local storage là state.

State sẽ bao gồm **các đối tượng bất biến (immutable objects)**.

[Kiến trúc bất biến (Immutable architecture)](http://enterprisecraftsmanship.com/2016/05/12/immutable-architecture) có nhiều lợi thế, một trong số đó là ở mức view.

Đây là trích dẫn từ hướng dẫn của React để [tối ưu hóa hiệu năng](https://reactjs.org/docs/optimizing-performance.html).

> Tính bất biến làm cho việc theo dõi các thay đổi trở nên rẻ hơn. Một thay đổi sẽ luôn luôn có kết quả là một đối tượng mới vì thế chúng ta chỉ cần kiểm tra nếu tham chiếu tới đối tượng thay đổi.

## Tầng domain
Domain mô tả state và lưu trữ business logic. Nó đại diện cho phần lõi của ứng dụng và thể hiện ở tầng view. Angular, React, Vue không quan trọng, chúng ta có thể sử dụng domain bất kể framework được sử dụng là gì.

![](https://cdn-images-1.medium.com/max/800/1*iNmdhMwXJ53tv0fyhhpmmw.png)
<figcaption>Tầng domain</figcaption>

Bởi vì chúng ta đang sử dụng kiến trúc bất biến, tầng domain sẽ bao gồm các thực thể và domain services.

Mặc dù gây tranh cãi trong OOP, đặc biệt trong các ứng dụng lớn, nhưng [mô hình anemic domain](https://en.wikipedia.org/wiki/Anemic_domain_model) hoàn toàn chấp nhận được khi làm việc với dữ liệu bất biến.

> [Khóa học](https://www.pluralsight.com/courses/refactoring-anemic-domain-model) này của Valimir Khorikow đã giúp tôi biết được nhiều điều.

Để hiển thị danh sách các bài viết, đầu tiên chúng ta sẽ mô hình hóa thực thể **Article**.

Tất cả các đối tượng kiểu **Article** trong tương lai đều không thay đổi (immutable). Flow sẽ đảm bảo tính không thay đổi ([enforce immutability](https://flow.org/en/docs/react/redux/#typing-redux-state-immutability-a-classtoc-idtoc-typing-redux-state-immutability-hreftoc-typing-redux-state-immutabilitya)) bằng cách biến các thuộc tính là read-only (xem dấu <code>+</code> trước mỗi thuộc tính).

```javascript
// @flow
export type Article = {
  +id: string;
  +likes: number;
  +title: string;
  +author: string;
}
```
<figcaption>Article.js</figcaption>

Bây giờ hãy tạo **articleService** cho ứng dụng của chúng ta, và export nó như một [singleton](https://vi.wikipedia.org/wiki/Singleton_pattern).

Phương thức **createArticle** sẽ cho phép chúng ta tạo các [frozen object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/freeze) của kiểu Article. Mỗi bài viết sẽ có một id duy nhất được tạo tự động và 0 like, và chỉ có tác giả (author) và tiêu đề (title).

> *Phương thức <code>Object.freeze()</code> đóng băng một đối tượng, ngăn việc thêm các thuộc tính mới tới nó.*

Phương thức **createArticle** trả lại một kiểu "may be" **Article**.

> <em>[May be](https://flow.org/en/docs/types/maybe) buộc bạn kiểm tra một đối tượng **Article** có tồn tại trước khi thao tác với nó</em>.

Nếu bất kỳ thuộc tính nào cần thiết để tạo một bài viết là không hợp lệ thì phương thức **createArticle** trả lại null. Một số cho rằng tốt hơn là ném ra một ngoại lệ do người dùng định nghĩa. Nếu chúng ta làm theo cách này mà các tầng cao hơn không triển khai catch, chương trình sẽ bị dừng.

Cuối cùng, các phương thức **isTitleValid** và **isAuthorValid** ngăn **createArticle** làm việc với dữ liệu lỗi.

```javascript
// @flow
import v1 from 'uuid';
import * as R from 'ramda';

import type {Article} from "./Article";
import * as validators from "./Validators";

export type ArticleFields = {
  +title: string;
  +author: string;
}

export type ArticleService = {
  createArticle(articleFields: ArticleFields): ?Article;
  updateLikes(article: Article, likes: number): Article;
  isTitleValid(title: string): boolean;
  isAuthorValid(author: string): boolean;
}

export const createArticle = (articleFields: ArticleFields): ?Article => {
  const {title, author} = articleFields;
  return isTitleValid(title) && isAuthorValid(author) ?
    Object.freeze({
      id: v1(),
      likes: 0,
      title,
      author
    }) :
    null;
};

export const updateLikes = (article: Article, likes: number) =>
  validators.isObject(article) ?
    Object.freeze({
      ...article,
      likes
    }) :
    article;

export const isTitleValid = (title: string) =>
  R.allPass([
    validators.isString,
    validators.isLengthGreaterThen(0)
  ])(title);

export const isAuthorValid = (author: string) =>
  R.allPass([
    validators.isString,
    validators.isLengthGreaterThen(0)
  ])(author);

export const ArticleServiceFactory = () => ({
  createArticle,
  updateLikes,
  isTitleValid,
  isAuthorValid
});

export const articleService = ArticleServiceFactory();
```
<figcaption>ArticleService.js</figcaption>

Kiểm tra tính hợp lệ rất quan trọng trong việc giữ cho dữ liệu ta thống nhất, đặc biệt ở mức domain. Chúng ta có thể viết các dịch vụ **Validator** với code thông thường.

```javascript
// @flow
export const isObject = (toValidate: any) => !!(toValidate && typeof toValidate === 'object');

export const isString = (toValidate: any) => typeof toValidate === 'string';

export const isLengthGreaterThen = (length: number) => (toValidate: string) => toValidate.length > length;
```
<figcaption>Validators.js</figcaption>

Bây giờ chúng ta đã thiết lập xong tầng domain!

Hãy xem cách chúng ta sử dụng **articleService** để thêm bài viết về một cuốn sách yêu thích của mình và cập nhật số like.

```javascript
// @flow
import {articleService} from "../domain/ArticleService";

const article = articleService.createArticle({
  title: '12 rules for life',
  author: 'Jordan Peterson'
});
const incrementedArticle = article ? articleService.updateLikes(article, 4) : null;

console.log('article', article);
/*
   const itWillPrint = {
     id: "92832a9a-ec55-46d7-a34d-870d50f191df",
     likes: 0,
     title: "12 rules for life",
     author: "Jordan Peterson"
   };
 */

console.log('incrementedArticle', incrementedArticle);
/*
   const itWillPrintUpdated = {
     id: "92832a9a-ec55-46d7-a34d-870d50f191df",
     likes: 4,
     title: "12 rules for life",
     author: "Jordan Peterson"
   };
 */
```
<figcaption>domain-demo.js</figcaption>

## Tầng store
Dữ liệu là kết quả từ việc thêm và cập nhật các bài viết đại diện cho state của ứng dụng.

Chúng ta cần một nơi để lưu trữ dữ liệu, store là ứng viên hoàn hảo cho việc này.

![](https://cdn-images-1.medium.com/max/800/1*h8IDykExd_PhCBhKYr9e0Q.png)
<figcaption>Tầng store</figcaption>

State có thể dễ dàng mô hình hóa bởi một mảng các bài viết.

```javascript
// @flow
import type {Article} from "./Article";

export type ArticleState = Article[];
```
<figcaption>ArticleState.js</figcaption>

**ArticleStoreFactory** triển khai publish-subcribe pattern và export **articleStore** như một singleton.

Store lưu trữ các bài viết và thực hiện các thao tác không biến đổi như thêm, xóa và cập nhật trên chúng.

> <em>Nhớ rằng store rằng chỉ thao tác trên các bài viết. Chỉ **articleService,** mới có thể thêm hay cập nhật chúng.</em>

Các bên liên quan có thể subscribe và unsubscribe tới **articleStore.**

**articleStore** lưu trữ một danh sách trong bộ nhớ (memory) tất cả subscriber và sẽ thông báo mỗi khi có thay đổi.

```javascript
// @flow
import {update} from "ramda";

import type {Article} from "../domain/Article";
import type {ArticleState} from "./ArticleState";

export type ArticleStore = {
  addArticle(article: Article): void;
  removeArticle(article: Article): void;
  updateArticle(article: Article): void;
  subscribe(subscriber: Function): Function;
  unsubscribe(subscriber: Function): void;
}

export const addArticle = (articleState: ArticleState, article: Article) => articleState.concat(article);

export const removeArticle = (articleState: ArticleState, article: Article) =>
  articleState.filter((a: Article) => a.id !== article.id);

export const updateArticle = (articleState: ArticleState, article: Article) => {
  const index = articleState.findIndex((a: Article) => a.id === article.id);
  return update(index, article, articleState);
};

export const subscribe = (subscribers: Function[], subscriber: Function) =>
  subscribers.concat(subscriber);

export const unsubscribe = (subscribers: Function[], subscriber: Function) =>
  subscribers.filter((s: Function) => s !== subscriber);

export const notify = (articleState: ArticleState, subscribers: Function[]) =>
  subscribers.forEach((s: Function) => s(articleState));

export const ArticleStoreFactory = (() => {
  let articleState: ArticleState = Object.freeze([]);
  let subscribers: Function[] = Object.freeze([]);

  return {
    addArticle: (article: Article) => {
      articleState = addArticle(articleState, article);
      notify(articleState, subscribers);
    },
    removeArticle: (article: Article) => {
      articleState = removeArticle(articleState, article);
      notify(articleState, subscribers);
    },
    updateArticle: (article: Article) => {
      articleState = updateArticle(articleState, article);
      notify(articleState, subscribers);
    },
    subscribe: (subscriber: Function) => {
      subscribers = subscribe(subscribers, subscriber);
      return subscriber;
    },
    unsubscribe: (subscriber: Function) => {
      subscribers = unsubscribe(subscribers, subscriber);
    }
  }
});

export const articleStore = ArticleStoreFactory();
```
<figcaption>ArticleStore.js</figcaption>

Store của chúng ta chỉ mang tính chất minh họa, cho phép chúng ta hiểu các khái niệm đằng sau nó. Trong thực tế, tôi khuyên bạn sử dung một hệ thống quản lý state như [Redux](https://redux.js.org/), [ngrx](https://github.com/ngrx), [MobX](https://github.com/mobxjs/mobx) hay ít nhất là các [observable data](https://medium.com/bucharestjs/the-developers-guide-to-redux-like-state-management-in-angular-3799f1877bb).

Bây giờ chúng ta đã có thiết lập các tầng domain và store.

Hãy tạo 2 bài viết và 2 subscriber và quan sát cách các subscriber nhận được thông báo thay đổi.

```javascript
// @flow
import type {ArticleState} from "../store/ArticleState";
import {articleService} from "../domain/ArticleService";
import {articleStore} from "../store/ArticleStore";

const article1 = articleService.createArticle({
  title: '12 rules for life',
  author: 'Jordan Peterson'
});

const article2 = articleService.createArticle({
  title: 'The Subtle Art of Not Giving a F.',
  author: 'Mark Manson'
});

if (article1 && article2) {
  const subscriber1 = (articleState: ArticleState) => {
    console.log('subscriber1, articleState changed: ', articleState);
  };

  const subscriber2 = (articleState: ArticleState) => {
    console.log('subscriber2, articleState changed: ', articleState);
  };

  articleStore.subscribe(subscriber1);
  articleStore.subscribe(subscriber2);

  articleStore.addArticle(article1);
  articleStore.addArticle(article2);

  articleStore.unsubscribe(subscriber2);

  const likedArticle2 = articleService.updateLikes(article2, 1);
  articleStore.updateArticle(likedArticle2);

  articleStore.removeArticle(article1);
}
```
<figcaption>store-demo.js</figcaption>

## Tầng application services
Tầng này để làm các loại thao tác với luồng state giống như các request Ajax hoặc state tùy chỉnh.

![](https://cdn-images-1.medium.com/max/800/1*ZVstPN2LBFjdPoRaFq4SEw.png)
<figcaption>Tầng application services</figcaption>

Vì một lý do nào đó, một nhà thiết kế đến và yêu cầu tên của tất cả các tác giả phải viết hoa.

Chúng ta biết yêu cầu này là ngớ ngẩn và không muốn làm ô nhiễm mô hình với nó.

Chúng ta tạo ra một **ArticleUiService** để xử lý tính năng này. Dịch vụ sẽ nhận một phần của trạng thái, tên tác giả và trả lại phiên bản chữ hoa của nó.

```javascript
// @flow
export const displayAuthor = (author: string) => author.toUpperCase();
```

Hãy xem cách sử dụng dịch vụ này:

```javascript
// @flow
import {articleService} from "../domain/ArticleService";
import * as articleUiService from "../services/ArticleUiService";

const article = articleService.createArticle({
  title: '12 rules for life',
  author: 'Jordan Peterson'
});

const authorName = article ?
  articleUiService.displayAuthor(article.author) :
  null;

console.log(authorName);
// It will print JORDAN PETERSON

if (article) {
  console.log(article.author);
  // It will print Jordan Peterson
}
```
<figcaption>app-service-demo.js</figcaption>

## Tầng view
Tầng view bao gồm các container và presentational component.

Các presentational component liên quan tới việc mọi thứ nhìn như thế nào trong khi các container component liên quan tới việc mọi thứ hoạt động như thế nào. Để biết thêm bạn có thể đọc bài viết này của [Dan Abramov](https://medium.com/@dan_abramov/smart-and-dumb-components-7ca2f9a7c7d0).

![](https://cdn-images-1.medium.com/max/800/1*R-6nKbTqru_qsdg8O7PJJg.png)
<figcaption>Tầng view</figcaption>

Hãy xây dựng **App** component, bao gồm **ArticleFormContainer** và **ArticleListContainer.**

```javascript
// @flow
import React, {Component} from 'react';

import './App.css';

import {ArticleFormContainer} from "./components/ArticleFormContainer";
import {ArticleListContainer} from "./components/ArticleListContainer";

type Props = {};

class App extends Component<Props> {
  render() {
    return (
      <div className="App">
        <ArticleFormContainer/>
        <ArticleListContainer/>
      </div>
    );
  }
}

export default App;
```
<figcaption>App.js</figcaption>

Bây giờ hãy tạo **ArticleFormContainer**. 

> *Hãy xem thư viện [Ramda](http://ramdajs.com/) và cách các phương thức của nó cải tiến tính declarative của code.*

Form nhận dữ liệu của người dùng và truyền tới **articleService**. Service tạo một **Article** từ dữ liệu và thêm nó tới **ArticleStore** để các thành phần khác sử dụng. Tất cả đặt trong phương thức **submitForm**.

```javascript
// @flow
import React, {Component} from 'react';
import * as R from 'ramda';

import type {ArticleService} from "../domain/ArticleService";
import type {ArticleStore} from "../store/ArticleStore";
import {articleService} from "../domain/ArticleService";
import {articleStore} from "../store/ArticleStore";
import {ArticleFormComponent} from "./ArticleFormComponent";

type Props = {};

type FormField = {
  value: string;
  valid: boolean;
}

export type FormData = {
  articleTitle: FormField;
  articleAuthor: FormField;
};

export class ArticleFormContainer extends Component<Props, FormData> {
  articleStore: ArticleStore;
  articleService: ArticleService;

  constructor(props: Props) {
    super(props);

    this.state = {
      articleTitle: {
        value: '',
        valid: true
      },
      articleAuthor: {
        value: '',
        valid: true
      }
    };

    this.articleStore = articleStore;
    this.articleService = articleService;
  }

  changeArticleTitle(event: Event) {
    this.setState(
      R.assocPath(
        ['articleTitle', 'value'],
        R.path(['target', 'value'], event)
      )
    );
  }

  changeArticleAuthor(event: Event) {
    this.setState(
      R.assocPath(
        ['articleAuthor', 'value'],
        R.path(['target', 'value'], event)
      )
    );
  }

  submitForm(event: Event) {
    const articleTitle = R.path(['target', 'articleTitle', 'value'], event);
    const articleAuthor = R.path(['target', 'articleAuthor', 'value'], event);

    const isTitleValid = this.articleService.isTitleValid(articleTitle);
    const isAuthorValid = this.articleService.isAuthorValid(articleAuthor);

    if (isTitleValid && isAuthorValid) {
      const newArticle = this.articleService.createArticle({
        title: articleTitle,
        author: articleAuthor
      });
      if (newArticle) {
        this.articleStore.addArticle(newArticle);
      }
      this.clearForm();
    } else {
      this.markInvalid(isTitleValid, isAuthorValid);
    }
  };

  clearForm() {
    this.setState((state) => {
      return R.pipe(
        R.assocPath(['articleTitle', 'valid'], true),
        R.assocPath(['articleTitle', 'value'], ''),
        R.assocPath(['articleAuthor', 'valid'], true),
        R.assocPath(['articleAuthor', 'value'], '')
      )(state);
    });
  }

  markInvalid(isTitleValid: boolean, isAuthorValid: boolean) {
    this.setState((state) => {
      return R.pipe(
        R.assocPath(['articleTitle', 'valid'], isTitleValid),
        R.assocPath(['articleAuthor', 'valid'], isAuthorValid)
      )(state);
    });
  }

  render() {
    return (
      <ArticleFormComponent
        formData={this.state}
        submitForm={this.submitForm.bind(this)}
        changeArticleTitle={(event) => this.changeArticleTitle(event)}
        changeArticleAuthor={(event) => this.changeArticleAuthor(event)}
      />
    )
  }
}
```
<figcaption>ArticleFormContainer.js</figcaption>

Chú ý rằng **ArticleFormContainer** trả lại một form thực sự, cái mà người dùng nhìn thấy là **ArticleFormComponent**. Component này hiển thị dữ liệu được truyền tới bởi container và phát ra các event như **changeArticleTitle, changeArticleAuthor,** và **submitForm.**.

```javascript
// @flow
import React from 'react';

import type {FormData} from './ArticleFormContainer';

type Props = {
  formData: FormData;
  changeArticleTitle: Function;
  changeArticleAuthor: Function;
  submitForm: Function;
}

export const ArticleFormComponent = (props: Props) => {
  const {
    formData,
    changeArticleTitle,
    changeArticleAuthor,
    submitForm
  } = props;

  const onSubmit = (submitHandler) => (event) => {
    event.preventDefault();
    submitHandler(event);
  };

  return (
    <form
      noValidate
      onSubmit={onSubmit(submitForm)}
    >
      <div>
        <label htmlFor="article-title">Title</label>
        <input
          type="text"
          id="article-title"
          name="articleTitle"
          autoComplete="off"
          value={formData.articleTitle.value}
          onChange={changeArticleTitle}
        />
        {!formData.articleTitle.valid && (<p>Please fill in the title</p>)}
      </div>
      <div>
        <label htmlFor="article-author">Author</label>
        <input
          type="text"
          id="article-author"
          name="articleAuthor"
          autoComplete="off"
          value={formData.articleAuthor.value}
          onChange={changeArticleAuthor}
        />
        {!formData.articleAuthor.valid && (<p>Please fill in the author</p>)}
      </div>
      <button
        type="submit"
        value="Submit"
      >
        Create article
      </button>
    </form>
  )
};
```
<figcaption>ArticleFormComponent.js</figcaption>

Bây giờ chúng ta có một form để tạo các bài viết, giờ là lúc liệt kê chúng. **ArticleListContainer** subscribe tới **ArticleStore**, nhận tất cả bài viết và hiển thị **ArticleListComponent**.

```javascript
// @flow
import * as React from 'react'

import type {Article} from "../domain/Article";
import type {ArticleStore} from "../store/ArticleStore";
import {articleStore} from "../store/ArticleStore";
import {ArticleListComponent} from "./ArticleListComponent";

type State = {
  articles: Article[]
}

type Props = {};

export class ArticleListContainer extends React.Component<Props, State> {
  subscriber: Function;
  articleStore: ArticleStore;

  constructor(props: Props) {
    super(props);
    this.articleStore = articleStore;
    this.state = {
      articles: []
    };
    this.subscriber = this.articleStore.subscribe((articles: Article[]) => {
      this.setState({articles});
    });
  }

  componentWillUnmount() {
    this.articleStore.unsubscribe(this.subscriber);
  }

  render() {
    return <ArticleListComponent {...this.state}/>;
  }
}
```
<figcaption>ArticleListContainer.js</figcaption>

**ArticleListComponent** là presentational component. Nó nhận các bài viết thông qua props và hiển thị thành phần **ArticleContainer**.

```javascript
// @flow
import React from 'react';

import type {Article} from "../domain/Article";
import {ArticleContainer} from "./ArticleContainer";

type Props = {
  articles: Article[]
}

export const ArticleListComponent = (props: Props) => {
  const {articles} = props;
  return (
    <div>
      {
        articles.map((article: Article, index) => (
          <ArticleContainer
            article={article}
            key={index}
          />
        ))
      }
    </div>
  )
};
```
<figcaption>ArticleListComponent.js</figcaption>

**ArticleContainer** truyền dữ liệu tới **ArticleComponent**. Nó cũng triển khai các phương thức **likeArticle** và **removeArticle**.

Phương thức **likeArticle** cập nhật số like, bằng cách thay thế bài viết bên trong store với một bản copy đã được cập nhật.

Phương thức **removeArticle** xóa các bài viết trong store.

```javascript
// @flow
import React, {Component} from 'react';

import type {Article} from "../domain/Article";
import type {ArticleService} from "../domain/ArticleService";
import type {ArticleStore} from "../store/ArticleStore";
import {articleService} from "../domain/ArticleService";
import {articleStore} from "../store/ArticleStore";
import {ArticleComponent} from "./ArticleComponent";

type Props = {
  article: Article;
};

export class ArticleContainer extends Component<Props> {
  articleStore: ArticleStore;
  articleService: ArticleService;

  constructor(props: Props) {
    super(props);

    this.articleStore = articleStore;
    this.articleService = articleService;
  }

  likeArticle(article: Article) {
    const updatedArticle = this.articleService.updateLikes(article, article.likes + 1);
    this.articleStore.updateArticle(updatedArticle);
  }

  removeArticle(article: Article) {
    this.articleStore.removeArticle(article);
  }

  render() {
    return (
      <div>
        <ArticleComponent
          article={this.props.article}
          likeArticle={(article: Article) => this.likeArticle(article)}
          deleteArticle={(article: Article) => this.removeArticle(article)}
        />
      </div>
    )
  }
}
```
<figcaption>ArticleContainer.js</figcaption>

**ArticleContainer** truyền bài viết tới **ArticleComponent** để hiển thị nó. Nó cũng xác nhận container component khi nút thích hoặc xóa được click, bằng cách thực hiện các hàm callback tương ứng.

*Bạn có nhớ yêu cầu tên tác giả phải viết hoa?*

**ArticleComponent** sử dụng **ArticleUiService** từ tầng application để thay đổi một phần state từ giá trị gốc thành chuỗi viết hoa.

```javascript
// @flow
import React from 'react';

import type {Article} from "../domain/Article";
import * as articleUiService from "../services/ArticleUiService";

type Props = {
  article: Article;
  likeArticle: Function;
  deleteArticle: Function;
}

export const ArticleComponent = (props: Props) => {
  const {
    article,
    likeArticle,
    deleteArticle
  } = props;

  return (
    <div>
      <h3>{article.title}</h3>
      <p>{articleUiService.displayAuthor(article.author)}</p>
      <p>{article.likes}</p>
      <button
        type="button"
        onClick={() => likeArticle(article)}
      >
        Like
      </button>
      <button
        type="button"
        onClick={() => deleteArticle(article)}
      >
        Delete
      </button>
    </div>
  );
};
```
<figcaption>ArticleComponent.js</figcaption>

## Tổng kết
Chúng đã xây dựng một ứng dụng React hoàn chỉnh và mạnh mẽ, với kiến trúc được định nghĩa rõ ràng. Mọi người tham gia vào team có thể đọc bài viết này và cảm thấy dễ dàng để tiếp tục làm việc.

Bạn có thể xem demo [tại đây](https://intojs.github.io/architecting-single-page-applications/) và GitHub repo [ở đây](https://github.com/intojs/architecting-single-page-applications).


















 

