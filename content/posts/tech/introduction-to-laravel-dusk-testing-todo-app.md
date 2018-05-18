+++
date = "2018-05-17T13:59:46+02:00"
tags = ["laravel"]
title = "Giới thiệu Laravel Dusk: Testing Todo App"
description = "Hôm nay, tôi sẽ kiểm thử ứng dụng với Laravel Dusk. Bắt đầu với việc giới thiệu tổng quan về Laravel Dusk, cách bạn thiết lập Laravel Dusk và sau đó là quá trình kiểm thử ứng dụng Todo"
keywords = "laravel, symfony, php, php framework, mvc, web app"
image = "/img/Browser-testing-with-Laravel-DUsk-Banner.jpg"
draft = false
+++

*Bài viết được dịch từ: [cloudways.com](https://www.cloudways.com/blog/laravel-dusk-testing-todo-app/)*

{{% tocsection %}}
<!-- TOC -->

- [Giới thiệu](#giới-thiệu)
- [Laravel Dusk là gì?](#laravel-dusk-là-gì)
- [Cài đặt Laravel Dusk](#cài-đặt-laravel-dusk)
- [Tạo các test case cho ứng dụng Todo](#tạo-các-test-case-cho-ứng-dụng-todo)
    - [User Register Test](#user-register-test)
    - [Tạo một Todo test mới](#tạo-một-todo-test-mới)
    - [View Todo Test](#view-todo-test)
    - [Edit Todo Test](#edit-todo-test)
    - [Delete Todo Test](#delete-todo-test)
    - [Logout Test](#logout-test)
    - [Login Test](#login-test)
- [Chạy test case](#chạy-test-case)
- [Kết luận](#kết-luận)
- [Tham khảo](#tham-khảo)

<!-- /TOC -->
{{% /tocsection %}}

## Giới thiệu
Trong phần trước của loạt bài viết này, tôi đã hoàn thành ứng dụng Todo. Hôm nay, tôi sẽ kiểm thử ứng dụng với Laravel Dusk. Bắt đầu với việc giới thiệu tổng quan về Laravel Dusk, cách bạn thiết lập Laravel Dusk và sau đó là quá trình kiểm thử ứng dụng Todo.

![](https://www.cloudways.com/blog/wp-content/uploads/Browser-testing-with-Laravel-DUsk-Banner.jpg)

Các bài viết trong loạt bài này:

1. Phần 1 -- [Tạo ứng dụng ToDo trong Laravel 5.4: Migrating Table, Controllers & Models](/posts/tech/creating-todo-application-in-laravel-5.4-migrating-table-creating-controllers-models/)

2. Phần 2 -- [Laravel 5.4 ToDo App: Thiết lập Authentication và ToDo Functionality](/posts/tech/laravel-5.4-todo-app-setting-authentication-and-todo-functionality/)

3. Phần 3 -- Giới thiệu về Laravel dusk: kiểm thử ứng dụng Todo]

## Laravel Dusk là gì?
Laravel Dusk là một browser automation testing tool được giới thiệu trong Laravel 5.4. Nó là công cụ hoàn hảo để kiểm thử các ứng dụng và API trong trình duyệt. Nó sử dụng ChromeDriver là mặc định nhưng bạn cũng có thể sử dụng bất kỳ driver Selenium tương thích.

## Cài đặt Laravel Dusk
Tải Laravel Dusk package bằng cách chạy lệnh sau:

```bash
composer require laravel/dusk
```
![](https://www.cloudways.com/blog/wp-content/uploads/image00-135.png)

Khi tải package hoàn tất, tôi sẽ cần đăng ký nó bên trong phương thức <code>register</code> của <code>AppServiceProvider</code>. Để làm điều này, tới thư mục <code>app/Providers</code> và mở tệp tin <code>AppServiceProvider.php</code>. Và thêm dòng code này trước phần khai báo class:

```php
use Laravel\Dusk\DuskServiceProvider;
```

Tiếp theo, trong phương thức <code>register()</code>, paste đoạn code sau:

```php
public function register()
{
    if ($this->app->environment('local', 'testing')) {
        $this->app->register(DuskServiceProvider::class);
    }
}
```

Đến đây, <code>AppServiceProvider</code> sẽ trông như thế này:

```php
<?php
namespace App\Providers;
use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\Schema;
use Laravel\Dusk\DuskServiceProvider;
class AppServiceProvider extends ServiceProvider
{
    /**
* Bootstrap any application services.
*
* @return void
*/
    public function boot()
    {
        //
        Schema::defaultStringLength(191);
    }
    /**
* Register any application services.
*
* @return void
*/
    public function register()
    {
        if ($this->app->environment('local', 'testing')) {
            $this->app->register(DuskServiceProvider::class);
        }
    }
}
```

Bây giờ, chạy lệnh sau để cài đặt Laravel Dusk:

```php
php artisan dusk:install
```

![](https://www.cloudways.com/blog/wp-content/uploads/image01-125.png)

Khi lệnh trên hoàn tất, thư mục <code>Browser</code> sẽ được tạo bên trong thư mục <code>test</code> (nó cũng có một tệp tin <code>Example Test</code>). Trong thư mục này, tôi sẽ tạo tất cả các test case cho browser automation.

Tiếp theo, tôi sẽ mô tả quá trình testing ứng dụng Todo app.

## Tạo các test case cho ứng dụng Todo 
Tôi sẽ sử dụng trình duyệt mặc định (Chrome) để cho các test case.

Đầu tiên, chạy lệnh sau để tạo một tệp tin <code>Test</code> mới:

```bash
php artisan dusk:make TodoTest
```

Khi lệnh trên hoàn thành, nó sẽ tạo ra một tệp tin <code>TodoTest</code> bên trong thư mục <code>Browser</code>. Tệp tin này sẽ chứa một test case mẫu <code>testExample()</code>. Hãy xóa phương thức này.

Trước khi bắt đầu thêm các phương thức cho các test case, mở tệp tin <code>.env</code> và gán URL đầy đủ của ứng dụng vào <code>APP_URL</code>.

```php
APP_URL=http://localhost/todoapplaravel/public
```

Bây giờ, hãy bắt đầu viết các test case.

### User Register Test
Tôi sẽ bắt đầu bằng cách tạo một test function để test quá trình đăng ký của người dùng và kiểm tra xem người dùng đã được chuyển đến trang dashboard chưa.

Bên trong class <code>TodoTest</code>, tạo một function mới với tên <code>testRegister()</code> với nội dung như sau:

```php
public function testRegister()
{
    $this->browse(function ($browser) {
        $browser->visit('register')
            ->type('name', 'Tayor Otwell')
            ->type('email', 'taylor@laravel.com')
            ->type('password', 'ahmedkhan')
            ->type('password_confirmation', 'ahmedkhan')
            ->attach('userimage', 'C:\images\taylor.jpg')
            ->press('Register')
            ->assertPathIs('/todoapplaravel/public/todo');
    });
}
```

Trong đoạn code trên, tôi đã gọi phương thức <code>browse</code> cùng với <code>$browser</code> instance, nó sẽ được truyền tự động bởi Dusk và được sử dụng để tạo <code>assertion</code> cho ứng dụng. Đầu tiên, tôi sử dụng phương thức <code>visit()</code> để mở trang đăng ký. Sau đó, trong phương thức <code>type</code>, tôi định nghĩa dữ liệu của người dùng như <code>name</code> và giá trị của nó,... Tôi sử dụng phương thức <code>attach</code> để đính kèm file ảnh của người dùng với tên trường tương ứng. Tiếp theo, tôi sử dụng phương thức <code>press</code> (sử dụng để nhấn button trên trang web). Trong trường hợp này là nút <code>Register</code>. Cuối cùng tôi kiểm tra người dùng có được chuyển đến trang dashboard hay không (<code>/todoapplaravel/public/todo</code>) bằng cách sử dụng phương thức <code>assertPathIs</code>.

### Tạo một Todo test mới
Bây giờ, tạo phương thức mới <code>testCreateTodo()</code> với nội dung như sau:

```php
public function testCreateTodo()
{
    $this->browse(function ($browser) {
        $browser->visit('todo')
            ->clickLink('Add Todo')
            ->type('todo', 'Testing it With Dusk')
            ->type('category', 'dusk')
            ->type('description', 'This is created with dusk')
            ->press('Add')
            ->assertPathIs('/todoapplaravel/public/todo');
    });
}
```

Sau khi chuyển đến trang dashboard (<code>todo</code>), tôi sử dụng phương thức <code>clickLink</code> để click vào <code>add todo</code> vì nó là một link không phải là một button. Tiếp theo tôi thêm các giá trị đầu vào của todo. Khi hoàn thành, tôi nhấn <code>Add</code> button. Tiếp theo, tôi kiểm tra xem nó có được chuyển đến trang dashboard hay không. Nếu không kết quả của test case sẽ là fail.

### View Todo Test
Trước khi tạo test này, tôi cần chỉnh sửa tệp tin <code>dashboard.php</code>. Tôi sẽ thêm <code>id</code> cho tất cả các icon để tôi có thể click vào chúng sử dụng automation testing. Để làm điều này tới thư mục <code>resources/views/todo</code> và mở tệp tin <code>dashboard.php</code>. Bây giờ thay thế code trong tệp tin này với đoạn code sau:

```php
@extends('layouts.app')
@section('title', 'Home ')
@section('content')
 <div class="row">
      <div class="col-md-9">
    <ul class="list-group">
    @if($todos != false)
          @foreach ($todos as $todo)

    <li class="list-group-item"><a id="view{{$todo->id}}" class="secondary-content" href="{{url('/todo/'.$todo->id)}}"><span class="glyphicon glyphicon-triangle-right"></span></a><a id="edit{{$todo->id}}" class="secondary-content" href="{{url('/todo/'.$todo->id).'/edit'}}"><span class="glyphicon glyphicon-pencil"></span></a><a id="delete{{$todo->id}}" href="#" class="secondary-content" onclick="event.preventDefault();
                                            document.getElementById('delete-form').submit();"><span class="glyphicon glyphicon-trash"></span></a><form id="delete-form" action="{{url('/todo/'.$todo->id)}}" method="POST" style="display: none;">
                         {{ method_field('DELETE') }}{{ csrf_field() }}
                            </form> {{$todo->todo}} 
                                            </li>

@endforeach
@else
<li class="list-group-item"> No Todo added yet <a href="{{ url('/todo/create') }}"> click here</a> to add new todo. </li>
@endif
    </ul>
    </div>

      <div class="col-md-3">
          <img class="img-responsive img-circle" src="{{asset('storage/'.$image)}}">
      </div>
    </div>
@endsection
```

Ở đoạn code trên, tôi cung cấp một <code>id</code> cho các icon view, edit & delete. Ví dụ: <code>id="view{{$todo->id}}”</code> cho view, <code>id="edit{{$todo->id}}"</code> cho edit và <code>id="delete{{$todo->id}}"</code> cho delete.

Bây giờ, tôi sẽ tạo todo test cho view. Để làm điều này, mở tệp tin <code>TodoTest.php</code> và thêm một phương thức mới <code>testViewTodo()</code> với nội dung như sau:

```php
public function testViewTodo()
{
    $this->browse(function ($browser) {
        $browser->visit('todo')
            ->assertVisible('#view1')
            ->visit(
            $browser->attribute('#view1', 'href')
        )
            ->assertPathIs('/todoapplaravel/public/todo/1')
            ->clickLink('Edit')
            ->type('description', 'Testing it with dusk again')
            ->press('Update')
            ->assertPathIs('/todoapplaravel/public/todo/1');
    });
}
```

Ở đoạn code trên, đầu tiên tôi mở trang <code>todo</code> (dashboard) và sau đó kiểm tra id <code>#view1</code> có tồn tại hay không? Sau đó, mở link này sử dụng phương thức <code>visit</code>. Bên trong phương thức này, tôi định nghĩa thuộc tính để click sử dụng phương thức <code>attribute</code>. Tiếp theo, tôi kiểm tra đường dẫn. Nếu nó hợp lệ, tôi sẽ gọi phương thức <code>clickLink</code> để click vào <code>Edit</code> link. Sau đó, tôi chỉnh sửa <code>description</code> sử dụng phương thức <code>type</code> và nhấn nút <code>Update</code> sử dụng phương thức <code>press</code>. Sau đó, tôi kiểm tra đường dẫn một lần nữa để xem nó điều hướng trở lại cùng todo hay không sử dụng phương thức <code>assertPathis</code>.

### Edit Todo Test
Bây giờ, tạo một function mới <code>testEditTodo</code> với nội dung như sau:

```php
public function testEditTodo()
{
    $this->browse(function ($browser) {
        $browser->visit('todo')
            ->assertVisible('#edit1')
            ->visit(
            $browser->attribute('#edit1', 'href')
        )
            ->type('description', 'Testing it with dusk again')
            ->press('Update')
            ->assertPathIs('/todoapplaravel/public/todo/1');
    });
}
```

Ở đoạn code trên, đầu tiên tôi chuyển đến dashboard sau đó click <code>edit</code> icon, cập nhập todo description và sau đó kiểm tra đường dẫn có phải vẫn là của todo đó hay không?

### Delete Todo Test
Bây giờ, tạo một function mới với tên <code>testDeleteTodo</code> có nội dung như sau:

```php
public function testDeleteTodo()
{
    $this->browse(function ($browser) {
        $browser->visit('todo')
            ->assertVisible('#delete1')
            ->visit(
            $browser->attribute('#delete1', 'href')
        )
            ->assertPathIs('/todoapplaravel/public/todo');
    });
}
```

### Logout Test
Tạo một function mới là <code>testLogout()</code> với nội dung như sau:

```php
public function testLogout()
{
    $this->browse(function ($browser) {
        $browser->visit('todo')
            ->clickLink('Logout')
            ->assertPathIs('/todoapplaravel/public/login');
    });
}
```

### Login Test
Tạo function <code>testLogin()</code> với nội dung:

```php
public function testLogin()
{
    $this->browse(function ($browser) {
        $browser->visit('login')
            ->type('email', 'tessa@cloudways.com')
            ->type('password', 'ahmedkhan')
            ->press('Login')
            ->assertPathIs('/todoapplaravel/public/todo');
    });
}
```

Đến đây, tất cả tất cả test case cho ứng dụng Todo đã được tạo. <code>TodoTest</code> hoàn chỉnh sẽ trông như thế này:

```php
<?php

namespace Tests\Browser;

use Tests\DuskTestCase;

use Illuminate\Foundation\Testing\DatabaseMigrations;

class TodoTest extends DuskTestCase

{

    /**

    * Register test.

    *

    * @return void

    */

   public function testRegister()

   {

       $this->browse(function ($browser) {

           $browser->visit('register')

                   ->type('name', 'Tayor Otwell')

                   ->type('email', 'taylor@laravel.com')

                   ->type('password', 'ahmedkhan')

                   ->type('password_confirmation', 'ahmedkhan')

                   ->attach('userimage', 'C:\Users\ahmed.khan\Downloads\CreatingToDoApplicationinLaravel5.4CreatingAuthToDoViewsRoutesandModifyingController\images\taylor.jpg')

                   ->press('Register')

                   ->assertPathIs('/todoapplaravel/public/todo');

       });

   }

  /**

    * Create Todo test.

    *

    * @return void

    */

   public function testCreateTodo()

   {

       $this->browse(function ($browser) {

           $browser->visit('todo')

                   ->clickLink('Add Todo')

                   ->type('todo', 'Testing it With Dusk')

                   ->type('category', 'dusk')

                   ->type('description', 'This is created with dusk')

                   ->press('Add')

                   ->assertPathIs('/todoapplaravel/public/todo');

       });

   }

   /**

    * View and Edit Todo Test.

    *

    * @return void

    */

   public function testViewTodo()

   {

       $this->browse(function ($browser) {

           $browser->visit('todo')

                   ->assertVisible('#view1')

                   ->visit(

                       $browser->attribute('#view1', 'href')

                   )

                   ->assertPathIs('/todoapplaravel/public/todo/1')

                   ->clickLink('Edit')

                   ->type('description', 'Testing it with dusk again')

                   ->press('Update')

                   ->assertPathIs('/todoapplaravel/public/todo/1');

       });

   }

   /**

    * Edit todo test.

    *

    * @return void

    */

   public function testEditTodo()

   {

       $this->browse(function ($browser) {

           $browser->visit('todo')

                   ->assertVisible('#edit1')

                   ->visit(

                       $browser->attribute('#edit1', 'href')

                   )

                   ->type('description', 'Testing it with dusk again')

                   ->press('Update')

                   ->assertPathIs('/todoapplaravel/public/todo/1');

       });

   }

   /**

    * Delete Todo test.

    *

    * @return void

    */

   public function testDeleteTodo()

   {

       $this->browse(function ($browser) {

           $browser->visit('todo')

                   ->assertVisible('#delete1')

                   ->visit(

                       $browser->attribute('#delete1', 'href')

                   )

                   ->assertPathIs('/todoapplaravel/public/todo');

       });

   }

   /*

    * Logout test.

    *

    * @return void

    */

   public function testLogout()

   {

       $this->browse(function ($browser) {

           $browser->visit('todo')

                   ->clickLink('Logout')

                   ->assertPathIs('/todoapplaravel/public/login');

       });

   }

   /**

    * Login test.

    *

    * @return void

    */

   public function testLogin()

   {

       $this->browse(function ($browser) {

           $browser->visit('login')

                   ->type('email', 'tessa@cloudways.com')

                   ->type('password', 'ahmedkhan')

                   ->press('Login')

                   ->assertPathIs('/todoapplaravel/public/todo');

       });

   }

}
```

Test case này đã được thêm vào [todo app Laravel repo](https://github.com/ahmedkhan847/todoapplaravel) trên Github.

## Chạy test case
Để chạy các automation test sử dụng lệnh sau:

```bash
php artisan dusk
```

Quá trình testing sẽ diễn ra như sau:

![](http://www.cloudways.com/blog/wp-content/uploads/laraveldusk.gif)

## Kết luận
Trong loạt bài viết này tôi đã bắt đầu với việc thiết lập [migration tables, controller và models](/posts/tech/creating-todo-application-in-laravel-5.4-migrating-table-creating-controllers-models/). Sau đó tôi tạo [Hệ thống xác thực người dùng các view và các chức năng](/posts/tech/laravel-5.4-todo-app-setting-authentication-and-todo-functionality/). Đây là phần cuối của loạt bài này, tôi đã thực hiện testing ứng dụng Todo sử dụng Laravel Dusk.

## Tham khảo
Linh bài viết gốc https://www.cloudways.com/blog/laravel-dusk-testing-todo-app/
