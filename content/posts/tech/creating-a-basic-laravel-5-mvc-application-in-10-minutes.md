+++
date = "2018-05-01T13:59:46+02:00"
tags = ["laravel"]
title = "Tạo ứng dụng MVC cơ bản với Laravel 5 trong 10 phút"
description = "Một ứng dụng MVC rất giống với trò chơi xếp hình Lego. Và xây dựng ứng dụng MVC với Laravel 5 thật dễ dàng"
keywords = "laravel, symfony, php, php framework, mvc, web app"
image = "/img/mvc_diagram_with_routes_laravel.jpg"
draft = false
+++

*Bài viết được dịch từ: [selftaughtcoders.com](https://selftaughtcoders.com/from-idea-to-launch/lesson-17/laravel-5-mvc-application-in-10-minutes/)*

## Nội dung
<!-- TOC -->

1. [Giới thiệu](#giới-thiệu)
2. [Xây dựng ứng dụng mẫu](#xây-dựng-ứng-dụng-mẫu)
3. [Model](#model)
4. [Controller](#controller)
5. [Các route](#các-route)
6. [Hành động <mark>show</mark> của controller](#hành-động-markshowmark-của-controller)
7. [View](#view)

<!-- /TOC -->

## Giới thiệu
Các ứng dụng Laravel theo mô hình **Model-View-Controller** truyền thống gồm có:

- **Các controller** xử lý các request của người dùng và truy xuất dữ liệu, bằng cách tận dụng các Model.

- **Các model** tương tác với database và truy xuất các thông tin từ đối tượng của bạn.

- **Các view** để hiển thị các trang.

Ngoài ra, **các route** được sử dụng để ánh xạ các URL tới các hành động được chỉ định trong controller, như hình dưới đây:

![](/img/mvc_diagram_with_routes_laravel.jpg)
<figcaption>Vòng đời request trong ứng dụng Laravel 5</figcaption>

Phân tích:

- Một request được tạo -- khi người dùng nhập một URL liên kết với ứng dụng của bạn.

- Một **route** đã được liên kết với URL ánh xạ URL tới một hành động trong controller.

- **Controller** sử dụng các **model** cần thiết để trích xuất thông tin từ database, và sau đó truyển dữ liệu tới view.

- Và **view** hiển trị trang.

Tôi thích nói rằng [một ứng dụng MVC rất giống với trò chơi xếp hình Lego.](https://selftaughtcoders.com/model-view-controller-mvc-web-application/)

Và xây dựng một ứng dụng MVC sử dụng Laravel 5 thật dễ dàng.

## Xây dựng ứng dụng mẫu
Để minh họa, tôi sẽ hướng dẫn bạn xây dựng một ứng dụng Laravel 5 mẫu với tất cả các thành phần MVC -- model, view và controller.

Giả sử bạn muốn xây dựng một ứng dụng quản lý cars (xe hơi)...

## Model
Chúng ta sẽ bắt đầu bằng cách tạo một model, đại diện cho Car.

Laravel có một giao diện dòng lệnh tuyệt vời **Artisan CLI**, cung cấp cho bạn một loạt các lệnh hữu ích để xây dựng ứng dụng của mình.

Hãy mở command line (và kết nối tới máy ảo Homestead của bạn, nếu bạn sử dụng [Laravel Homestead](http://laravel.com/docs/5.1/homestead)), di chuyển tới thư mục chính của ứng dụng, và chạy lệnh sau để tạo một Car model mới:

```bash
$ php artisan make:model Car --migration
```

Tất cả các model được lưu trữ trong thư mục <code>app</code>, vì vậy lệnh trên sẽ tạo ra một tệp tin model <code>app/Car.php</code> với nội dung như sau:

```php
<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Car extends Model
{
    //
}
```

Vì chức năng model có sẵn của Laravel, chỉ tạo một class model rỗng, Laravel sẽ giả sử rằng model này đã liên kết với một bảng <code>cars</code> trong cơ sở dữ liệu.

Và bằng việc cung cấp tùy chọn <code>--migration</code> khi tạo model, Laravel cũng tạo một tệp tin **database migration** để tạo bảng <code>cars</code>. Tệp tin migration được đặt tại <code>[timestamp]_create_cars_table.php</code> và có nội dung như sau:

```php
<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateCarsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('cars', function (Blueprint $table) {
            $table->increments('id');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::drop('cars');
    }
}
```

(Nếu bạn chưa quen với khái niệm database migrations, đọc thêm về cách Laravel sử dụng [database migrations để giúp bạn quản lý database](https://selftaughtcoders.com/from-idea-to-launch/lesson-15/managing-database-with-laravel-5-migrations/) trực tiếp trong ứng dụng. Nó khá tuyệt.)

Tất cả những gì bạn phải làm bây giờ là sử dụng [tài liệu hướng dẫn Schema builder của Laravel](http://laravel.com/docs/5.1/migrations#creating-columns) để hoàn thành tệp tin migration. Bạn cũng có thể định nghĩa thêm một vài cột, giả sử là: make, model, và production date:

```php
Schema::create('cars', function (Blueprint $table) {
    $table->increments('id');
    $table->string('make');
    $table->string('model');
    $table->date('produced_on');
    $table->timestamps();
  });
```

Và sau đó bạn có thể chạy migration để tạo bảng <code>cars</code> sử dụng lệnh sau: 

```bash
$ php artisan migrate
```

Tiếp theo chúng ta sẽ tạo controller.

## Controller
Trong Laravel, một kiểu đối tượng -- chẳng hạn Car, trong trường này -- được gọi là một **resource**.

Bạn có thể tạo một **resource controller** -- một controller xử lý tất cả các request liên quan tới một resouce, sử dụng lệnh:

```bash
$ php artisan make:controller CarController
```

Lệnh này sẽ tạo ra controller <code>app/Http/Controllers/CarController.php</code> với nội dung như sau:

```php
<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;
use App\Http\Controllers\Controller;

class CarController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return Response
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @return Response
     */
    public function store()
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  int  $id
     * @return Response
     */
    public function update($id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return Response
     */
    public function destroy($id)
    {
        //
    }
}
```

Chú ý nó tự động tạo một controller với tất cả các hành động CRUD (Create, Retrieve/Read, Update, Delete) thường gặp.

Bây giờ, chúng ta chỉ cần định nghĩa các route để liên kết các URL với tất cả các hành động trong controller này.

## Các route
Một cách phổ biến là bạn có thể định nghĩa một **resouce route** duy nhất, nó sẽ tạo ra các route cho *tất cả* các hành động trong resouce controller.

Trong tệp tin cấu hình các route -- <code>app/Http/routes.php</code> -- thêm định nghĩa một Car resource route như sau:

```php
Route::resource('cars', 'CarController');
```

Định nghĩa route ở trên sẽ xác định *tất cả* các route liên quan tới Car resource của chúng ta:

![car routes table](/img/car-routes.png)

**Bây giờ, hãy hoàn thành trang Show Car**

## Hành động <mark>show</mark> của controller
Như đã thấy trong bảng route ở phần trước, trang Show Car sẽ có URL tương ứng là <code>http://app.url/cars/{car}</code>. Trong trường hợp này, {car} sẽ là <code>id</code> của một đối tượng car trong database.

Vì thế, URL để xem chiếc xe có <code>id</code> là <code>1</code> sẽ như thế này <code>http://app.url/cars/1</code>.

Để triển khai trang Show Car, trong hành động <code>show</code> của controller, chúng ta cần:

1. Sử dụng <code>Car</code> model để truy xuất đối tượng Car được chỉ định từ database.

2. Tải một view cho trang Show Car, và truyền tới nó đối tượng Car trích xuất từ database.

Đầu tiên, để truy cập tới Car model trong controller, chúng ta cần thêm một câu lệnh <code>use</code> ở phía trên class controller:

```php
use App\Car;

class CarController extends Controller
{
```

Sau đó, chúng ta có thể hoàn thành hành động <code>show</code> với đoạn code sau:

```php
public function show($id)
    {
      $car = Car::find($id);
      return view('cars.show', array('car' => $car));
    }
```

Khi chúng ta nhập URL -- <code>http://app.url/cars/1</code> -- Laravel sẽ lấy <code>1</code> trong URL thông qua biến <code>$id</code> trong hàm <code>show</code>, như ở phía trên.

Và truy xuất đối tượng car sử dụng model <code>Car</code> bằng cách gọi hàm <code>Car::find</code> với tham số <code>$id</code>.

View sẽ được tải sau đó sử dụng hàm <code>view</code> với tham số là tên của view (chúng ta sẽ tạo ở phần tiếp theo) và một mảng dữ liệu được cung cấp cho view.

Cuối cùng, chúng ta cần tạo view.

## View 
Các tệp tin view của Laravel được lưu trữ trong thư mục <code>resoureces/views</code>. Và chúng có thể được tổ chức vào các thư mục con trong thư mục này.

Ở phần trước chúng ta đã truyền vào hàm <code>view</code> một view với tên <code>cars.show</code>. Điều đó nói với Laravel tìm một tệp tin view có tên là <code>show.blade.php</code> được lưu trữ trong một thư mục con là <code>resources/views/cars</code>.

Các tệp tin view của Laravel sử dụng [Blade templating engine](http://laravel.com/docs/5.1/blade), và vì thế nó có phần mở rộng là <code>.blade.php</code>

Vì thế, để hoàn thành trang Show Car này, chúng ta có thể tạo tệp tin view <code>resources/views/cars/show.blade.php</code> với nội dung như sau:

```php
<!DOCTYPE html>
<html>
  <head>
    <title>Car {{ $car->id }}</title>
  </head>
  <body>
    <h1>Car {{ $car->id }}</h1>
    <ul>
      <li>Make: {{ $car->make }}</li>
      <li>Model: {{ $car->model }}</li>
      <li>Produced on: {{ $car->produced_on }}</li>
    </ul>
  </body>
</html>
```

Vì chúng ta đã truyền đối tượng <code>Car</code> cho view -- trong hành động <code>show</code> của controller -- với mảng có key là <code>car</code>, nên chúng ta có thể truy cập nó trong view thông qua một biến cùng tên <code>$car</code>.

Các đối tượng được truy xuất thông qua một model là các instance của class model đó.

Và như bạn có thể thấy, các giá trị của đối tượng <code>Car</code> có thể truy cập sử dụng các tên giống như tên các cột trong bảng <code>cars</code>.

Cuối cùng, bạn sẽ sử dụng cú pháp của Blade để hiển thị thông tin. Ví dụ để hiển thị giá trị make của car:

```php
{{ $car->make }}
```

Câu lệnh này sẽ được biên dịch thành câu lệnh <code>echo</code> của PHP thuần trong background:

```php
<?php echo $car->make; ?>
```

Cú pháp của Blade làm cho việc viết các view nhanh hơn, thú vị hơn rất nhiều và đọc code cũng dễ dàng hơn.


