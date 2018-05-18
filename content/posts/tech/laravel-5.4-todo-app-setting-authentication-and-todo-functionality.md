+++
date = "2018-05-12T13:59:46+02:00"
tags = ["laravel"]
title = "Laravel 5.4 ToDo App: Thiết lập Authentication và ToDo Functionality"
description = "Ở bài trước, tôi đã tạo ra bộ khung của ứng dụng ToDo. Trong phần này, tôi sẽ thêm phần xác thực cho người dùng"
keywords = "laravel, symfony, php, php framework, mvc, web app"
image = "/img/Creating-ToDo-Application-in-Laravel-Banner-Part-2.jpg"
draft = false
+++

*Bài viết được dịch từ: [cloudways.com](https://www.cloudways.com/blog/laravel-5-4-todo-app-setting-authentication-functionality/)*

{{% tocsection %}}
<!-- TOC -->

- [Giới thiệu](#giới-thiệu)
- [Tạo xác thực người dùng sử dụng Artisan](#tạo-xác-thực-người-dùng-sử-dụng-artisan)
    - [Chỉnh sửa Register View của Auth](#chỉnh-sửa-register-view-của-auth)
    - [Chỉnh sửa <code>RegisterController</code> của <code>auth</code>](#chỉnh-sửa-coderegistercontrollercode-của-codeauthcode)
    - [Đăng ký người dùng đầu tiên.](#đăng-ký-người-dùng-đầu-tiên)
- [Cập nhật ToDo Controller](#cập-nhật-todo-controller)
    - [Thêm Auth Middleware trong Controller](#thêm-auth-middleware-trong-controller)
    - [Cập nhập phương thức index()](#cập-nhập-phương-thức-index)
    - [Tạo phương thức Validation](#tạo-phương-thức-validation)
    - [Update phương thức create()](#update-phương-thức-create)
    - [Cập nhật phương thức store()](#cập-nhật-phương-thức-store)
    - [Cập nhật phương thức show()](#cập-nhật-phương-thức-show)
    - [Cập nhật phương thức edit()](#cập-nhật-phương-thức-edit)
    - [Cập nhật phương thức update()](#cập-nhật-phương-thức-update)
    - [Cập nhật phương thức destroy()](#cập-nhật-phương-thức-destroy)
- [Tạo View cho Controller](#tạo-view-cho-controller)
    - [Tạo Dashboard View](#tạo-dashboard-view)
    - [Tạo Todo View](#tạo-todo-view)
    - [Tạo Todo Add và Edit Form View](#tạo-todo-add-và-edit-form-view)
- [Tạo các ToDo Route](#tạo-các-todo-route)
    - [Cập nhật Register và Login Route](#cập-nhật-register-và-login-route)
- [Làm việc với ứng dụng ToDo](#làm-việc-với-ứng-dụng-todo)
- [Tổng kết phần 2](#tổng-kết-phần-2)
- [Cái tôi sẽ thảo luận trong phần cuối](#cái-tôi-sẽ-thảo-luận-trong-phần-cuối)
- [Tham khảo](#tham-khảo)

<!-- /TOC -->
{{% /tocsection %}}

## Giới thiệu
Ở bài trước của loạt bài viết về Laravel 5.4, tôi đã tạo ra bộ khung của ứng dụng ToDo. Bộ khung này bao gồm database, migration table, model và controller.

Trong phần này, tôi sẽ thêm phần xác thực cho người dùng. Nó sẽ bao gồm tạo và sửa đổi Auth cho người dùng theo bảng <code>users</code>. Quá trình này cũng sẽ bao gồm tạo và chỉnh sửa các view. Cuối cùng tôi sẽ thiết lập các route cho ứng dụng và sau đó kiểm tra các chức năng của nó.

![](https://www.cloudways.com/blog/wp-content/uploads/Creating-ToDo-Application-in-Laravel-Banner-Part-2.jpg)

Bạn có thể tải ứng dụng hoàn chỉnh từ [GitHub](https://github.com/ahmedkhan847/todoapplaravel) hoặc xem [demo](http://phpstack-21306-71265-194074.cloudwaysapps.com/login) của ứng dụng.

Các bài viết trong loạt bài này:

1. Phần 1 -- [Tạo ứng dụng ToDo trong Laravel 5.4: Migrating Table, Controllers & Models](/posts/tech/creating-todo-application-in-laravel-5.4-migrating-table-creating-controllers-models/)

2. Phần 2 -- Laravel 5.4 ToDo App: Thiết lập Authentication và ToDo Functionality

3. Phần 3 -- [Giới thiệu về Laravel dusk: kiểm thử ứng dụng Todo](/posts/tech/introduction-to-laravel-dusk-testing-todo-app/)

## Tạo xác thực người dùng sử dụng Artisan
Tôi sẽ bắt đầu tạo xác thực cho người dùng sử dụng Artisan với lệnh:

```bash	
php p artisan make:auth
```

![](https://www.cloudways.com/blog/wp-content/uploads/image13-21.png)

Khi lệnh trên kết thúc bạn sẽ thấy rằng thư mục <code>auth</code> đã được tạo bên trong 2 thư mục <code>controllers</code> và <code>views</code>. Các lệnh Artisan của Laravel tạo các controller khác nhau cho xác thực và cũng tạo các view cho login, register và forget password. Bạn có thể kiểm tra login view bằng cách nhập địa chỉ http://localhost/todoapp/public/login. Khi trang web tải xong, bạn sẽ thấy login form.

![](https://www.cloudways.com/blog/wp-content/uploads/image10-35.png)

Với registration form, nhập url http://localhost/todoapp/public/register.

![](https://www.cloudways.com/blog/wp-content/uploads/image03-111.png)

Chú ý rằng register view có ít trường hơn so với <code>User</code> model của chúng ta. Tôi sẽ chỉnh sửa register form để phản ánh các thay đổi. Bạn cũng sẽ nhận thấy rằng các liên kết Login và Register đã tự động được thêm vào menu.

![](https://www.cloudways.com/blog/wp-content/uploads/image06-73-768x34.png)

Bởi mặc định, <code>User</code> model đã xây dựng sẵn xác thực. Tuy nhiên, nếu muốn, bạn có thể dễ dàng thêm thành phần xác thực mình chọn. Để làm điều này, mở tệp tin <code>auth.php</code> (ở trong thư mục <code>config</code>). Sau đó tìm đoạn code sau:

```php
'providers' => [

'users' => [

'driver' => 'eloquent',

'model' => App\User::class,

],

// 'users' => [

//     'driver' => 'database',

//     'table' => 'users',

// ],

],
```

Để thay đổi authentication model, tìm dòng <code>'model' => App\User::class</code> và thay đổi <code>App\User::class</code> thành model class mà bạn muốn sử dụng để xác thực người dùng.

Bây giờ tôi sẽ chỉnh sửa Auth register view

### Chỉnh sửa Register View của Auth
Tới thư mục <code>resources/views/auth</code> và mở tệp tin <code>register.blade.php</code>. Thay code có sẵn với đoạn code sau:

```php
@extends('layouts.app')

@section('content')
<div class="container">
    <div class="row">
        <div class="col-md-8 col-md-offset-2">
            <div class="panel panel-default">
                <div class="panel-heading">Register</div>
                <div class="panel-body">
                    <form class="form-horizontal" role="form" enctype="multipart/form-data" method="POST" action="{{ url('/register') }}">
                        {{ csrf_field() }}

                        <div class="form-group{{ $errors->has('name') ? ' has-error' : '' }}">
                            <label for="name" class="col-md-4 control-label">Name</label>

                            <div class="col-md-6">
                                <input id="name" type="text" class="form-control" name="name" value="{{ old('name') }}" required autofocus>

                                @if ($errors->has('name'))
                                    <span class="help-block">
                                        <strong>{{ $errors->first('name') }}</strong>
                                    </span>
                                @endif
                            </div>
                        </div>

                        <div class="form-group{{ $errors->has('email') ? ' has-error' : '' }}">
                            <label for="email" class="col-md-4 control-label">E-Mail Address</label>

                            <div class="col-md-6">
                                <input id="email" type="email" class="form-control" name="email" value="{{ old('email') }}" required>

                                @if ($errors->has('email'))
                                    <span class="help-block">
                                        <strong>{{ $errors->first('email') }}</strong>
                                    </span>
                                @endif
                            </div>
                        </div>

                        <div class="form-group{{ $errors->has('password') ? ' has-error' : '' }}">
                            <label for="password" class="col-md-4 control-label">Password</label>

                            <div class="col-md-6">
                                <input id="password" type="password" class="form-control" name="password" required>

                                @if ($errors->has('password'))
                                    <span class="help-block">
                                        <strong>{{ $errors->first('password') }}</strong>
                                    </span>
                                @endif
                            </div>
                        </div>

                        <div class="form-group">
                            <label for="password-confirm" class="col-md-4 control-label">Confirm Password</label>

                            <div class="col-md-6">
                                <input id="password-confirm" type="password" class="form-control" name="password_confirmation" required>
                            </div>
                        </div>

                        <div class="form-group">
                            <label for="userimage" class="col-md-4 control-label">Image</label>

                            <div class="col-md-6">
                                <input id="userimage" type="file" class="form-control" name="userimage" required>
                                @if ($errors->has('userimage'))
                                    <span class="help-block">
                                        <strong>{{ $errors->first('userimage') }}</strong>
                                    </span>
                                @endif
                            </div>
                        </div>

                        <div class="form-group">
                            <div class="col-md-6 col-md-offset-4">
                                <button type="submit" class="btn btn-primary">
                                    Register
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</div>
@endsection
```

Giờ, hãy reload lại trình duyệt. Bạn sẽ thấy một trường mới là **image** được thêm vào form.

![](https://www.cloudways.com/blog/wp-content/uploads/image12-25.png)

Tiếp theo, hãy chỉnh sửa <code>RegisterController</code> của <code>auth</code> để xử lý reqeust.

### Chỉnh sửa <code>RegisterController</code> của <code>auth</code>
Di chuyển tới thư mục <code>Controllers/Auth</code> và mở tệp tin <code>RegisterController.php</code>. Tìm phương thức <code>validator()</code> và thêm một rule mới cho image:

```php
'userimage' => 'required|image'
```

Phương thức mới <code>validator()</code> sẽ như thế này:

```php
protected function validator(array $data)
{
    return Validator::make($data, [
        'name' => 'required|max:255',
        'email' => 'required|email|max:255|unique:users',
        'password' => 'required|min:6|confirmed',
        'userimage' => 'required|image'
    ]);
}
```

Bây giờ tôi sẽ chỉnh sửa phương thức <code>create()</code> để có thể upload ảnh tới thư mục <code>userimages</code> và lưu đường dẫn tới database. Đầu tiên, thêm dòng này trước class:

```php
use Illuminate\Support\Facades\Storage;
```

Tiếp theo, cập nhật phương thức <code>create()</code> với đoạn code sau:

```php
protected function create(array $data)
{
    $path = Storage::putFile('userimages',$data['userimage']);
    return User::create([
        'name' => $data['name'],
        'email' => $data['email'],
        'password' => bcrypt($data['password']),
        'userimage' => $path
    ]);
}
```

Những gì đoạn code trên làm, là bất cứ khi nào một request hợp lệ tới phương thức <code>create()</code>, image sẽ được lưu sử dụng phương thức <code>Storage::putFile</code>, nó sẽ tự động cung cấp tên cho tệp tin đã upload. Tiếp theo, nó sẽ mã hóa password với Laravel helper <code>bcrypt()</code> và sau đó lưu vào database.

Bây giờ tôi sẽ đăng ký một người dùng mới để test. Nhưng, trước hết tôi sẽ thay đổi thư mục lưu trữ image mặc định thành thư mục <code>public</code>. Để làm điều này mở tệp tin <code>filesystem.php</code> và thay đổi giá trị <code>default</code> từ <code>local</code> thành <code>public</code> và sau đó lưu nó lại.

Bây giờ, tôi liên kết storage với thư mục <code>public</code> để tôi có thể xem ảnh trên trang. Để làm điều này chạy lệnh:

```php
php artisan storage:link
```

### Đăng ký người dùng đầu tiên.

![](https://www.cloudways.com/blog/wp-content/uploads/image14-18.png)

Khi bấm nút **Register**, một người dùng mới sẽ được đăng ký mà không có bất kỳ lỗi nào. Người dùng này sẽ được đăng nhập và chuyển tới trang dashboard.

![](https://www.cloudways.com/blog/wp-content/uploads/image00-133-768x107.png)

## Cập nhật ToDo Controller
Bây giờ hãy cập nhật <code>TodoController</code> (đã được tạo trong bước cài đặt). Di chuyển tới thư mục <code>Controllers</code> và mở tệp tin <code>TodoController.php</code>. Khi tệp tin được mở, bạn sẽ thấy rằng tất cả các phương thức đang rỗng.

Đầu tiên tôi sẽ thêm auth middleware vào <code>TodoController</code> để chỉ những người dùng đã được xác thực mới có thể vào trang này. Tôi sẽ bắt đầu bằng việc thêm Auth và Validator namespace ở phía trên cùng của tập tin:

```php
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Auth;
```

Trong tất cả các phương thức bên trong controller này, tôi sẽ định nghĩa các view cái sẽ được gọi khi một phương thức cụ thể chạy. Các view này sẽ được tạo sau khi cập nhật <code>TodoController</code>.

### Thêm Auth Middleware trong Controller
Tôi sẽ tạo phương thức <code>__construct()</code> bên trong <code>TodoController</code> và định nghĩa middleware vì rằng middleware có thể áp dụng trên tất cả các phương thức.

```php
public function __construct()
{
    $this->middleware('auth');
}
```

### Cập nhập phương thức index()
Phương thức <code>index()</code> sẽ lấy tất cả todo item của một người dùng. Phương thức <code>index()</code> đã được cập nhật sẽ trông như thế này:

```php
public function index()
{
    $result = Auth::user()->todo()->get();
    if(!$result->isEmpty()){
        return view('todo.dashboard',['todos'=>$result,'image'=>Auth::user()->userimage]);
    }else{
        return view('todo.dashboard',['todos'=>false,'image'=>Auth::user()->userimage]);
    }
}
```

Ở đoạn code trên tôi đã sử dụng các hàm trong <code>User</code> model và lấy tất cả todo item của người dùng đang đăng nhập sử dụng <code>Auth::user()->todo()->get()</code>. Sau đó, tôi kiểm tra kết quả có là một mảng rỗng hay không. Cuối cùng, tôi trả về tất cả dữ liệu cho <code>dashboard</code> view (lưu trữ bên trong thư mục <code>view/todo</code>).

### Tạo phương thức Validation
Bây giờ, tôi sẽ tạo một phương thức protected validation, nó sẽ kiểm tra các trường trong form và đảm bảo không có trường nào rỗng. Để làm điều này, tạo một phương thức <code>protected</code> trong controller và đặt tên nó là <code>validator()</code>. Nó sẽ nhận một mảng các giá trị để xác thực như các tham số.

```php
protected function validator(array $request)
{
    return Validator::make($request, [
        'todo' => 'required',
        'description' => 'required',
        'category' => 'required'
    ]);
}
```

Phương thức phía trên xác nhận rằng các trường todo, description và category không rỗng khi request được submitted.

### Update phương thức create()
Tôi sẽ cập nhật phương thức <code>create()</code> để nó trả lại một form cho việc thêm một todo mới.

```php
public function create()
{
    return view('todo.addtodo');
}
```

### Cập nhật phương thức store()
Tiếp theo, tôi sẽ làm việc trên phương thức <code>store</code>, cái lưu trữ các todo mới.

```php
public function store(Request $request)
{
    $this->validator($request->all())->validate();
    if(Auth::user()->todo()->Create($request->all())){
        return $this->index();
    }
}
```

Phương thức này sẽ kiểm tra tất cả các trường là hợp lệ và không rỗng. Sau đó, nó lưu dữ liệu trong bảng <code>Todo</code>, tương ứng với người dùng đang đăng nhập.

### Cập nhật phương thức show()
Đây là phương thức hiển thị một todo của người dùng.

```php
public function show(Todo $todo)
{
    return view('todo.todo',['todo' => $todo]);
}
```

### Cập nhật phương thức edit()
Phương thức này sẽ trả lại form cho việc chỉnh sửa một todo.

```php
public function edit(Todo $todo)
{
    return view('todo.edittodo',['todo' => $todo]);
}
```

### Cập nhật phương thức update()
Phương thwucs này sẽ kiểm trả các trường không rỗng và cập nhật todo.

```php
public function update(Request $request, Todo $todo)
{
    $this->validator($request->all())->validate();
    if($todo->fill($request->all())->save()){
        return $this->show($todo);
    }
}
```

### Cập nhật phương thức destroy()
Đây là phương thức sẽ xóa todo.

```php
public function destroy(Todo $todo)
{
    if($todo->delete()){
        return back();
    }
}
```

Sau khi cập nhật tất cả các phương thức đã đề cập ở trên, <code>ToDoController</code> sẽ trông như thế này:

```php
<?php
namespace App\Http\Controllers;
use App\Todo;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Auth;
class TodoController extends Controller
{
    /**
* Constructor.
*
* @return void
*/
    public function __construct()
    {
        $this->middleware('auth');
    }
    /**
* Display a listing of the resource.
*
* @return \Illuminate\Http\Response
*/
    public function index()
    {
        //
        $result = Auth::user()->todo()->get();
        if(!$result->isEmpty()){
            return view('todo.dashboard',['todos'=>$result,'image'=>Auth::user()->userimage]);
        }else{
            return view('todo.dashboard',['todos'=>false,'image'=>Auth::user()->userimage]);
        }
    }
    /**
* Get a validator for an incoming Todo request.
*
* @param  array  $request
* @return \Illuminate\Contracts\Validation\Validator
*/
    protected function validator(array $request)
    {
        return Validator::make($request, [
            'todo' => 'required',
            'description' => 'required',
            'category' => 'required'
        ]);
    }
    /**
* Show the form for creating a new resource.
*
* @return \Illuminate\Http\Response
*/
    public function create()
    {
        return view('todo.addtodo');
    }
    /**
* Store a newly created resource in storage.
*
* @param  \Illuminate\Http\Request  $request
* @return \Illuminate\Http\Response
*/
    public function store(Request $request)
    {
        $this->validator($request->all())->validate();
        if(Auth::user()->todo()->Create($request->all())){
            return $this->index();
        }
    }
    /**
* Display the specified resource.
*
* @param  \App\Todo  $todo
* @return \Illuminate\Http\Response
*/
    public function show(Todo $todo)
    {
        return view('todo.todo',['todo' => $todo]);
    }
    /**
* Show the form for editing the specified resource.
*
* @param  \App\Todo  $todo
* @return \Illuminate\Http\Response
*/
    public function edit(Todo $todo)
    {
        return view('todo.edittodo',['todo' => $todo]);
    }
    /**
* Update the specified resource in storage.
*
* @param  \Illuminate\Http\Request  $request
* @param  \App\Todo  $todo
* @return \Illuminate\Http\Response
*/
    public function update(Request $request, Todo $todo)
    {
        $this->validator($request->all())->validate();
        if($todo->fill($request->all())->save()){
            return $this->show($todo);
        }
    }
    /**
* Remove the specified resource from storage.
*
* @param  \App\Todo  $todo
* @return \Illuminate\Http\Response
*/
    public function destroy(Todo $todo)
    {
        if($todo->delete()){
            return back();
        }
    }
}
```

## Tạo View cho Controller
Bây giờ hãy di chuyển tới thư mục <code>views</code>, tạo một thư mục mới là <code>todo</code>. Tôi sẽ mở dụng layout từ <code>app.blade.php</code> cái đi cùng với <code>Auth</code> đã được tạo trước đó.

Đầu tiên tôi sẽ cập nhật menu chính, vì tôi có thể thay đổi tiêu đề trên mọi trang và thêm một mục mới trên menu là <code>Add Todo</code>. Hãy tới thư mục <code>layouts</code> và mở tệp tin <code>app.blade.php</code>. Hãy thay thế thẻ <code>title</code> bên trong thẻ <code>head</code>

```php
<title>@yield('title')</title>
```

Tôi cũng thêm CSS và JS của bootstrap trong thẻ <code>head</code>

```php
<!-- Latest compiled and minified CSS -->

<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous">

<!-- Optional theme -->

<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap-theme.min.css" integrity="sha384-rHyoN1iRsVXV4nD0JutlnGaslCJuC7uwjduW9SVrLvRYooPp2bWYgmgJQIXwl/Sp" crossorigin="anonymous">

<!-- Scripts -->

<script type="text/javascript" src="https://code.jquery.com/jquery-2.1.1.min.js"></script>

<!-- Latest compiled and minified JavaScript -->

<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js" integrity="sha384-Tc5IQib027qvyjSMfHjOMaLkfuWVxZxUPnCJA7l2mCWNIpG9mGCD8wGNIcPD7Txa" crossorigin="anonymous"></script>
```

Bây giờ tìm đoạn code này:

```php
<a class="navbar-brand" href="{{ url('/') }}">

{{ config('app.name', 'Laravel') }}

</a>
```

và thay thế với:

```php
<a class="navbar-brand" href="{{ url('/todo') }}">
 Home
</a>
```

Tiếp theo tìm đoạn code sau:

```php
@else

<li class="dropdown">

<a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-expanded="false">

{{ Auth::user()->name }} <span class="caret"></span>

</a>

<ul class="dropdown-menu" role="menu">

<li>

<a href="{{ route('logout') }}"

onclick="event.preventDefault();

document.getElementById('logout-form').submit();">

Logout

</a>

<form id="logout-form" action="{{ route('logout') }}" method="POST" style="display: none;">

{{ csrf_field() }}

</form>

</li>

</ul>

</li>

@endif
```

Thêm đoạn code này sau <code>@esle</code>:

```php
<li>
   <a href="{{ url('/todo/create') }}">Add Todo</a>
</li>
```

Template chính đã được update.

### Tạo Dashboard View
Trong thư mục <code>todo</code>, tạo một tệp tin mới và đặt tên nó là <code>dashboard.blade.php</code>. Mở tệp tin và paste đoạn code sau:

```php
@extends('layouts.app')
@section('title', 'Home ')
@section('content')
 <div class="row">
      <div class="col-md-9">
    <ul class="list-group">
    @if($todos != false)
          @foreach ($todos as $todo)

    <li class="list-group-item"><a class="secondary-content" href="{{url('/todo/'.$todo->id)}}"><span class="glyphicon glyphicon-triangle-right"></span></a><a class="secondary-content" href="{{url('/todo/'.$todo->id).'/edit'}}"><span class="glyphicon glyphicon-pencil"></span></a><a href="#" class="secondary-content" onclick="event.preventDefault();
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

Đây là một template đơn giản sẽ hiển thị danh sách tất cả todo với ảnh mà người dùng cung cấp ở phía bên phải. Danh sách cũng sẽ có các icon cho view, edit và delete một todo cụ thể.

### Tạo Todo View
Tạo một tệp tin mới bên trong thư mục <code>todo</code> và đặt tên nó là <code>todo.blade.php</code>. Paste đoạn code với nội dung như dưới đây:

```php
@extends('layouts.app')
@section('title', title_case($todo->todo))
@section('content')
<div class="row">
        <div class="col-md-6">
           <div class="panel panel-primary">
              <div class="panel-heading"><h3>{{title_case($todo->todo)}} <a href="{{url('/todo/'.$todo->id).'/edit'}}" class="btn btn-warning btn-group-sm pull-right ">Edit</a></h3>
              </div>
                  <div class="panel-body">
                    {{$todo->description}}
                  </div>
              <div class="panel-footer"><strong>Category:</strong> {{$todo->category}}</div>    
              </div>
               
        </div>
      </div>
            
@endsection
```

### Tạo Todo Add và Edit Form View
Tạo một tệp tin mới bên trong thư mục <code>todo</code> và đặt tên là <code>addtodo.blade.php</code> với nội dung như sau:

```php
@extends('layouts.app')

@section('title', 'Add New Todo')

@section('content')
         <div class="row">
            <div class="col-m-6">
              <form class="form-horizontal" method="post" action="{{url('/todo')}}">
                {{ csrf_field() }}
  <div class="form-group">
    <label for="todo" class="col-sm-2 control-label">Todo</label>
    <div class="col-md-5">
      <input type="text" class="form-control" id="todo" name="todo" placeholder="todo" value="{{ old('todo') }}">
      @if ($errors->has('todo'))
                                    <span class="help-block">
                                        <strong>{{ $errors->first('todo') }}</strong>
                                    </span>
     @endif
    </div>
  </div>
  <div class="form-group">
    <label for="category" class="col-sm-2 control-label">Category</label>
    <div class="col-md-5">
      <input type="text" class="form-control" id="category" name="category" placeholder="category" value="{{ old('category') }}">
      @if ($errors->has('category'))
                                    <span class="help-block">
                                        <strong>{{ $errors->first('category') }}</strong>
                                    </span>
     @endif
    </div>
  </div>
  <div class="form-group">
    <label for="category" class="col-sm-2 control-label">Description</label>
    <div class="col-md-5">
      <textarea class="form-control" id="description" name="description" placeholder="category" value="{{ old('description') }}"></textarea>
      @if ($errors->has('description'))
                                    <span class="help-block">
                                        <strong>{{ $errors->first('description') }}</strong>
                                    </span>
     @endif
    </div>
  </div>
  <div class="form-group">
    <div class="col-sm-offset-2 col-md-5">
      <button type="submit" class="btn btn-default">Add</button>
    </div>
  </div>
</form>
    </div>
  </div>
@endsection
```

Bây giờ, tạo một tệp tin khác là <code>edittodo.blade.php</code> với nội dung như sau:

```php
@extends('layouts.app')

@section('title', 'Edit')

@section('content')
         <div class="row">
            <div class="col-m-6">
                
              <form class="form-horizontal" method="post" action="{{url('/todo/'.$todo->id)}}">
                {{ csrf_field() }}
                {{ method_field('PUT') }}
  <div class="form-group">
    <label for="todo" class="col-sm-2 control-label">Todo</label>
    <div class="col-md-5">
      <input type="text" class="form-control" id="todo" name="todo" placeholder="todo" value="{{$todo->todo}}">
       @if ($errors->has('todo'))
                                    <span class="help-block">
                                        <strong>{{ $errors->first('todo') }}</strong>
                                    </span>
     @endif
    </div>
  </div>
  <div class="form-group">
    <label for="category" class="col-sm-2 control-label">Category</label>
    <div class="col-md-5">
      <input type="text" class="form-control" id="category" name="category" placeholder="category" value="{{$todo->category}}">
     @if ($errors->has('category'))
                                    <span class="help-block">
                                        <strong>{{ $errors->first('category') }}</strong>
                                    </span>
     @endif
    </div>
  </div>
  <div class="form-group">
    <label for="category" class="col-sm-2 control-label">Description</label>
    <div class="col-md-5">
      <textarea class="form-control" id="description" name="description" placeholder="description">{{$todo->description}}</textarea>
     @if ($errors->has('description'))
                                    <span class="help-block">
                                        <strong>{{ $errors->first('description') }}</strong>
                                    </span>
     @endif
    </div>
  </div>
  <div class="form-group">
    <div class="col-sm-offset-2 col-md-5">
      <button type="submit" class="btn btn-default">Update</button>
    </div>
  </div>
</form>

    </div>
  </div>
@endsection
```

Giờ chúng ta đã tạo tất cả các view cần thiết, tiếp theo hãy tạo các route trong tệp tin <code>web.php</code>.

## Tạo các ToDo Route
Di chuyển tới thư mục <code>routes</code> và mở tệp tin <code>web.php</code>. Hiện tại, nội dung tệp tin sẽ như thế này:

```php
Route::get('/', function () {
    return view('welcome');
});
Auth::routes();
Route::get('/home', 'HomeController@index');
```

Tôi cần một root route (cái sẽ chuyển đến trang login) và 2 resource route (một cho auth và một cho todo) trong <code>web.php</code>. Giờ hãy thay thế code trong <code>web.php</code> với đoạn code sau:

```php
Route::get('/', function () {
    return redirect('/login');
});
Auth::routes();
Route::resource('todo','TodoController');
```

### Cập nhật Register và Login Route
Trong <code>Register</code> và <code>Login</code> route thay thế dòng 

```php
protected $redirectTo = '/home';
```

Với 

```php
protected $redirectTo = '/todo';
```

Bây giờ bất cứ khi nào người dùng đăng ký hay đăng nhập, anh ta/ cô ta sẽ tự động được chuyển đến trang dashboard.

## Làm việc với ứng dụng ToDo
Ứng dụng giờ đã hoàn tất!

Bây giờ tôi sẽ kiểm tra tất cả các chức năng của ứng dụng. Để bắt đầu, tôi sẽ thử đăng nhập với tài khoản mà tôi đã đăng ký. Sau khi đăng nhập thành công tôi sẽ được chuyển đến trang dashboard, hiện tại nó chưa có bất kỳ todo item nào:

![](https://www.cloudways.com/blog/wp-content/uploads/image04-100-768x223.png)

Bây giờ tôi sẽ thêm một todo item mới. Để làm điều này, click **Add Todo** trong menu hay liên kết **click here** trong dashboard. View sẽ được chuyển tới Add todo form.

![](https://www.cloudways.com/blog/wp-content/uploads/image08-41.png)

Điền vào tất cả các trường:

![](https://www.cloudways.com/blog/wp-content/uploads/image15-18.png)

Todo item mới sẽ được thêm khi tôi click nút **Add**.

![](https://www.cloudways.com/blog/wp-content/uploads/image09-39-768x190.png)

Bây giờ click nút **play** để xem chi tiết todo.

![](https://www.cloudways.com/blog/wp-content/uploads/image02-115.png)

Click nút **Edit** để chỉnh sửa todo item được chọn.

![](https://www.cloudways.com/blog/wp-content/uploads/image07-57.png)

Nếu thử cập nhật một giá trị mà không thêm trường description.

![](https://www.cloudways.com/blog/wp-content/uploads/image01-123.png)

Form sẽ hiển thị một lỗi là **The description field is required.**

## Tổng kết phần 2
Trong phần này tôi đã tạo một hệ thống xác thực cho người dùng. Sau đó tôi đã cập nhật hệ thống xác thực để đáp ứng các yêu cẩu của người dùng. Cập nhật <code>Login</code> và <code>Register controller</code>, cùng với <code>TodoController</code> để nó có thể thực hiện tất cả các thao tác CRUD. Tôi cũng đã tạo tất cả các view cho todo, cùng với việc chỉnh sửa <code>Register</code> view của auth để nó có thể nhận ảnh của người dùng.

Toàn bộ code của ứng dụng đã có trên [Github repo](https://github.com/ahmedkhan847/todoapplaravel).

## Cái tôi sẽ thảo luận trong phần cuối
Trong phần cuối của loạt bài này, tôi sẽ kiểm thử ứng dụng todo sử dụng Laravel Dusk.

## Tham khảo
Link bài viết gốc https://www.cloudways.com/blog/laravel-5-4-todo-app-setting-authentication-functionality/

