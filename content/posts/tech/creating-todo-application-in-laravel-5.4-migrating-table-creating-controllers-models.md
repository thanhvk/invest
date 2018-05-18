+++
date = "2018-05-12T13:59:46+02:00"
tags = ["laravel"]
title = "Tạo ứng dụng ToDo trong Laravel 5.4: Migrating Table, Controllers & Models"
description = "Trong ứng dụng này, tôi sẽ đề cập nhiều khái niệm của Laravel bao gồm Migrations, Authentication, FileSystem và Eloquent ORM"
keywords = "laravel, symfony, php, php framework, mvc, web app"
image = "/img/Creating-ToDo-Application-in-Laravel-Banner.jpg"
draft = false
+++

*Bài viết được dịch từ: [cloudways.com](https://www.cloudways.com/blog/create-todo-app-laravel-5-4/)*

{{% tocsection %}}

<!-- TOC -->

- [Giới thiệu](#giới-thiệu)
- [Cái tôi sẽ tạo là gì?](#cái-tôi-sẽ-tạo-là-gì)
- [Tạo dự án Laravel](#tạo-dự-án-laravel)
- [Tạo Database](#tạo-database)
- [Tạo các table cho Migration](#tạo-các-table-cho-migration)
- [Migrating các bảng sử dụng Artisan](#migrating-các-bảng-sử-dụng-artisan)
- [Tạo các Model và Controller](#tạo-các-model-và-controller)
- [Chỉnh sửa các model](#chỉnh-sửa-các-model)
    - [<code>Todo</code> model](#codetodocode-model)
    - [<code>User</code> model](#codeusercode-model)
- [Tổng kết phần 1](#tổng-kết-phần-1)
- [Cái tôi sẽ làm trong phần tiếp theo?](#cái-tôi-sẽ-làm-trong-phần-tiếp-theo)
- [Tham khảo](#tham-khảo)

<!-- /TOC -->

{{% /tocsection %}}

## Giới thiệu
**Chú ý:** Loạt bài viết này giả sử rằng bạn đã có kiến thức về MVC và cách Laravel triển khai khái niệm này. Nếu bạn muốn tìm hiểu về chủ đề này, hãy đọc loạt bài viết của tôi về MVC trong Laravel bắt đầu từ [cài đặt Laravel 5.4](https://www.cloudways.com/blog/install-laravel-5-4-localhost/).

Trong loạt bài này, tôi sẽ tạo một ứng dụng hoàn chỉnh sử dụng Laravel 5.4. Trong ứng dụng này, sẽ đề cập đến nhiều khái niệm của Laravel bao gồm Migrations, Authentication, FileSystem và Eloquent ORM.

Các bài viết trong loạt bài này:

1. Phần 1 -- Tạo ứng dụng ToDo trong Laravel 5.4: Migrating Table, Controllers & Models

2. Phần 2 -- [Laravel 5.4 ToDo App: Thiết lập Authentication và ToDo Functionality](/posts/tech/laravel-5.4-todo-app-setting-authentication-and-todo-functionality/)

3. Phần 3 -- [Giới thiệu về Laravel dusk: kiểm thử ứng dụng Todo](/posts/tech/introduction-to-laravel-dusk-testing-todo-app/)

## Cái tôi sẽ tạo là gì?
Tôi sẽ tạo một ứng dụng ToDo với các chức năng sau:

- Xác thực người dùng với đăng nhập và đăng ký

- Chỉ người dùng đã được xác thực có thể thực hiện các hành động CRUD (Create, Read, Update, Delete)

Hãy bắt đầu với việc tạo một ứng dụng Laravel với tên **todoapp**

![](/img/Creating-ToDo-Application-in-Laravel-Banner.jpg)

## Tạo dự án Laravel
Để tạo một dự án Laravel với tên **todoapp**, chạy lệnh sau:

```bash
composer create-project laravel/laravel todoapp
```

![](https://www.cloudways.com/blog/wp-content/uploads/image04-95.png)

## Tạo Database
Tiếp theo, tôi sẽ tạo một database với tên **todoapp** trên server.

![](https://www.cloudways.com/blog/wp-content/uploads/image03-105.png)

Sau khi tạo database, tôi sẽ cấu hình tệp tin <code>.env</code> cho database.

Mở thư mục của dự án, sau đó mở tệp tin <code>.env</code> trong trình soạn thảo. Thêm thông tin cài đặt cho database như sau:

```bash
DB_CONNECTION=mysql

DB_HOST=127.0.0.1

DB_PORT=3306

DB_DATABASE=todoapp

DB_USERNAME=root

DB_PASSWORD=
```

Bây giờ database đã sẵn sàng để sử dụng. Tiếp theo tôi sẽ tạo các migration table và sau đó migrate chúng.

## Tạo các table cho Migration
Mặc định Laravel đã tạo sẵn 2 migration table (một là <code>Users</code> và một cho <code>Password_resets</code>). Tôi sẽ chỉnh sửa bảng <code>Users</code> và tạo một migration table mới là **Todo**.

Đầu tiên chỉnh sửa bảng <code>Users</code>. Mở tệp tin <code>{{timestamp}}_create_users_table.php</code> trong thư mục <code>database/migrations</code>. Tại thời điểm này phương thức <code>up()</code> sẽ trông như dưới đây:

```php
public function up()
{
    Schema::create('users', function (Blueprint $table) {
        $table->increments('id');
        $table->string('name');
        $table->string('email')->unique();
        $table->string('password',255);
        $table->rememberToken();
        $table->timestamps();
    });
}
```

Bây giờ hãy thêm một vài trường. Một cho userimage và trường thứ hai cho API key của nó.

Trước khi tiếp tục hãy tìm hiểu cái mà 2 phương thức <code>up()</code> và <code>down()</code> làm trong tệp tin migration. Trong <code>up()</code>, tôi sẽ định nghĩa schema (lược đồ) cho bảng, và thêm các cột mới,... Trong <code>down()</code>, tôi sẽ làm các hành động đảo ngược (reverse) chẳng hạn như drop (xóa) bảng hay đảo ngược về các thay đổi trước đó.

Bây giờ tôi sẽ chỉnh sửa phương thức <code>up()</code>:

```php
public function up()
{
    Schema::create('users', function (Blueprint $table) {
        $table->increments('id');
        $table->string('name');
        $table->string('email')->unique();
        $table->string('password');
        $table->string('userimage');
        $table->string('api_key')->nullable()->unique();
        $table->rememberToken();
        $table->timestamps();
    });
}
```

Việc chỉnh sửa bảng <code>users</code> đã hoàn tất, tiếp theo tôi sẽ tạo một migration table mới cho Todo bằng cách chạy lệnh sau trong thư mục <code>todoapp</code>:

```bash
php artisan make:migration create_todo_table
```

![](https://www.cloudways.com/blog/wp-content/uploads/image00-125.png)

Khi lệnh trên kết thúc, một tệp tin migration sẽ được tạo. Tôi sẽ tạo một scheme trong phương thức <code>up()</code> của tệp tin này.

```php
public function up()
{
    Schema::create('todo', function (Blueprint $table) {
        $table->increments('id');
        $table->string('todo');
        $table->string('description');
        $table->string('category');
        $table->integer('user_id')->unsigned();
        $table->timestamps();
        $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
    });
}
```

Trong bảng <code>todo</code>, tôi đã tạo một primary key (khóa chính),
một cột todo và một cột description. Tôi cũng tạo một cột category và tạo một foreign key (khóa ngoài) trên <code>user_id</code> nó sẽ ánh xạ tới <code>id</code> của một người dùng trong bảng <code>users</code>. Cuối cùng, tôi cũng tạo 2 cột timestamps sử dụng phương thức <code>timestamps()</code>. Hai cột này sẽ tự động cập nhật bất cứ khi nào một <code>todo</code> được thêm hay thay đổi.

## Migrating các bảng sử dụng Artisan
Hiện tại chúng ta đã tạo tất cả các migration cần thiết cho các bảng, tôi sẽ thực thi migration với một lệnh duy nhất:

```bash
php artisan migrate
```

![](https://www.cloudways.com/blog/wp-content/uploads/image05-75.png)

Khi lệnh hoàn tất, tất cả các bảng sẽ được tạo trong database:

![](https://www.cloudways.com/blog/wp-content/uploads/image02-110-768x148.png)

*Chú ý:*

*Nếu lệnh trên thất bại và bạn nhận được lỗi <code>Specified key was too long</code>, có thể là bạn đang sử dụng một phiên bản MySQL cũ hơn 5.7. Trong trường hợp này, bạn cần định nghĩa <code>default string length</code> trong tệp tin <code>AppServiceProvider.php</code> (lưu trữ trong thư mục <code>app/Providers</code>). Mở tệp tin và thêm dòng code sau vào trước khai báo class.* 

```php
use Illuminate\Support\Facades\Schema;
```

*Và trong phương thức <code>boot()</code> của class, thêm dòng code sau:*

```php
Schema::defaultStringLength(191);
```

*Bây giờ, thử chạy lại lệnh. Nó sẽ làm việc. Để biết rõ hơn tham khảo [laravel-news.com](https://laravel-news.com/laravel-5-4-key-too-long-error)*

## Tạo các Model và Controller
Bây giờ tôi đã có các bảng trong database. Tiếp theo tôi sẽ tạo các model cho các bảng. Model cho bảng <code>Users</code> đi kèm với cài đặt mặc định của Laravel. Model và controler cho bảng todo sẽ được tạo với một lệnh duy nhất:

```bash
php artisan make:controller TodoController --resource --model=Todo
```

Khi lệnh trên thực thi, nó sẽ hỏi bạn nếu <code>Todo</code> model chưa tồn tại. Khi bạn nhập <code>yes</code>, nó sẽ tạo model và [liên kết nó với controller](https://www.cloudways.com/blog/controllers-middleware-laravel-5-4/#bindmodel).

![](https://www.cloudways.com/blog/wp-content/uploads/image01-118.png)

Khi lệnh kết thúc, controller và model đã sẵn sàng để sử dụng.

## Chỉnh sửa các model
### <code>Todo</code> model

Hãy bắt đầu thêm các cột fillable vào <code>Todo</code> model. Mở tệp tin <code>Todo.php</code> (trong thư mục <code>app</code>). Thêm dòng sau bên trong class:

```php
protected $table = 'todo';

protected $fillable = ['todo','category','user_id','description'];
```

Đến đây <code>Todo</code> model sẽ trông như thế này:

```php
<?php
namespace App;
use Illuminate\Database\Eloquent\Model;
class Todo extends Model
{
    protected $table = 'todo';
    protected $fillable = ['todo','category','user_id','description'];
}
```

### <code>User</code> model
Tiếp theo, tôi sẽ chỉnh sửa <code>Users</code> model và thêm cột user_image vào trong fillable của nó. Ngoài ra, tôi sẽ định nghĩa quan hệ với <code>Todo</code> model. Mở tệp tin <code>User.php</code> và thực hiện các thay đổi sau:

- Đầu tiên, thêm <code>user_image</code> bên trong mảng <code>$fillable</code>.

- Thứ hai, tạo một phương thức <code>public todo()</code>, nó sẽ tạo quan hệ một - nhiều với với bảng <code>todo</code>.

```php
public function todo()
{
     return $this->hasMany('App\Todo');
}
```

Phương thức <code>hasMany()</code> định nghĩa quan hệ một - nhiều trong Eloquent.

Tại điểm này, tệp tin <code>User.php</code> mới sẽ trông như thế này:

```php
<?php
namespace App;
use Illuminate\Notifications\Notifiable;
use Illuminate\Foundation\Auth\User as Authenticatable;
class User extends Authenticatable
{
    use Notifiable;
    /**
    * The attributes that are mass assignable.
    *
    * @var array
    */
    protected $fillable = [
        'name', 'email', 'password','userimage'
    ];
    /**
    * The attributes that should be hidden for arrays.
    *
    * @var array
    */
    protected $hidden = [
        'password', 'remember_token',
    ];
    /*
    * Get Todo of User
    *
    */
    public function todo()
    {
        return $this->hasMany('App\Todo');
    }
}
```

## Tổng kết phần 1
Trong phần này, tôi đã tạo một ứng dụng Laravel mới, với database, migration table cho <code>todo</code> và chỉnh sửa <code>users</code> migration table. Tiếp theo tôi đã migrate tất cả [các bảng trong database](https://www.cloudways.com/blog/how-to-create-alter-and-drop-table-in-mysql/) sử dụng Artisan (giao diện dòng lệnh của Laravel). Sau đó tạo và chỉnh sửa các controller và model liên quan.

## Cái tôi sẽ làm trong phần tiếp theo?
Trong phần tiếp theo, tôi sẽ tạo authentication cho người dùng sử dụng Artisan và chỉnh sửa nó cho ứng dụng todo. Tôi cũng sẽ chỉnh sửa <code>TodoController</code> và thiết lập nó để [thực hiện CRUD](https://www.cloudways.com/blog/execute-crud-in-mysql-php/). Tôi cũng sẽ tạo các views, và chỉnh sửa các item của todo. 

## Tham khảo
Link bài viết gốc https://www.cloudways.com/blog/create-todo-app-laravel-5-4/

Bài liên quan [Laravel vs Symfony - Cuộc chiến của các framework](posts/tech/laravel-vs-symfony-clash-of-the-frameworks/)
