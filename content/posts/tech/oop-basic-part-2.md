+++
date = "2018-01-30T13:50:46+02:00"
tags = ["oop", "java"]
title = "OOP cơ bản - OOP trong Java (p2)"
description = "Một *class* là một bản thiết kế, bản mẫu, hoặc nguyên mẫu để định nghĩa và mô tả *các thuộc tính tĩnh (static attributes)* và *các hành vi động (dynamic behavior)* chung của tất cả các đối tượng cùng loại"
image = "/img/OOP_Objects_2.jpg"
+++

*Bài viết được dịch từ: [ntu.edu.sg](https://www.ntu.edu.sg/home/ehchua/programming/java/J3a_OOPBasics.html)*

## Class & Instances 

Trong Java, một class là *một định nghĩa của các đối tượng cùng loại*. Nói cách khác, một *class* là một bản thiết kế, bản mẫu, hoặc nguyên mẫu để định nghĩa và mô tả *các thuộc tính tĩnh (static attributes)* và *các hành vi động (dynamic behavior)* chung của tất cả các đối tượng cùng loại.

Một *instance* là *một trường hợp cụ thể của một class*. Tất cả các instance của một lớp có các thuộc tính tương tự như đã được mô tả trong class. Ví dụ: bạn có thể định nghĩa một class " Student " và tạo ba instance của " Student " cho " Peter ", " Paul " và " Pauline ".

Thuật ngữ *"object (đối tượng)"* thường dùng để chỉ *instance*. Nhưng nó cũng có thể được dùng để chỉ một class.

## Một Class giống như một chiếc hộp 3 ngăn đóng gói dữ liệu và các hoạt động

![A class is a 3-compartment box](https://www.ntu.edu.sg/home/ehchua/programming/java/images/OOP_ThreeCompartment.png)

Một lớp học có thể được hình dung như cái một hộp 3 ngăn, gồm:

1. *Tên (Name)* (hoặc nhận dạng): xác định class.

2. *Các biến (Variables)* (hoặc thuộc tính, trạng thái, trường): chứa các *thuộc tính tĩnh (static attributes)* của class.

3. *Các phương thức (Methods)* (hoặc các hành vi, chức năng, hoạt động): chứa *các hành vi động (dynamic behaviors)* của class.

Nói cách khác, một class bao gồm các thuộc tính tĩnh (dữ liệu) và các hành vi động (các thao tác trên dữ liệu) trong một hộp.

Hình dưới đây là một số ví dụ về class:

![Example of classes](https://www.ntu.edu.sg/home/ehchua/programming/java/images/OOP_ClassExamples.png)

Hình dưới đây là 2 instance của class Student, "paul" và "peter".

![Two instances - paul and peter - of the class Student](https://www.ntu.edu.sg/home/ehchua/programming/java/images/OOP_InstanceExamples.png)

**Sơ đồ ngôn ngữ mô hình hoá thống nhất (UML - Unified Modeling Language) Class và Instance:** Các sơ đồ class ở trên được vẽ theo các ký hiệu UML. Một class được biểu diễn như là một chiếc hộp 3 ngăn, chứa tên (name), các biến (variables) và phương thức (methods) tương ứng. Tên class được in đậm và căn giữa. Một instance cũng được biểu diễn như một chiếc hộp 3 ngăn, với tên instance như sau <span style="text-decoration:  underline; font-style: italic">instanceName : Classname</span> và gạch dưới.

**Tóm tắt**

1. Một class là một thực thể phần mềm được định nghĩa bởi lập trình viên, có tính trừu tượng, độc lập, có thể tái sử dụng bắt chước những thứ trong thực tế.

2. Một class là một chiếc hộp 3 ngăn chứa tên (name), các biến (variables) và các phương thức (methods).

3. Một class đóng gói các cấu trúc dữ liệu (trong các biến) và các thuật toán (trong các phương thức). Các giá trị của các biến tạo thành *trạng thái (state)* của class. Các phương thức tạo thành các *hành vi (behaviors)* của class.

4. Một instance là một trường hợp cụ thế của class.

## Định nghĩa Class trong Java

Trong Java, chúng ta sử dụng từ khoá class để định nghĩa một class. Ví dụ:

```java
public class Circle {        // class name
   double radius;            // variables
   String color;
   
   double getRadius() { ...... }  // methods
   double getArea() { ...... }
}
```

```java 
public class SoccerPlayer {  // class name
   int number;               // variables
   String name;
   int x, y;
   
   void run() { ...... }     // methods
   void kickBall() { ...... } 
}
```

Cú pháp để định nghĩa class trong Java là:

```java
[AccessControlModifier] class ClassName {
   // Class body contains members (variables and methods)
   ......
}
```

Chúng ta sẽ tìm hiểu về *điều khiển truy cập (access control modifier)*, chẳng hạn như public và private, sau.

**Quy ước đặt tên Class (Class Naming Convention)**: Tên class nên là một danh từ hoặc một cụm danh từ. Tất cả các từ sẽ viết hoa chữ cái đầu tiên (camel-case). Sử dụng danh từ *số ít* cho tên class. Chọn tên class có ý nghĩa và tự mô tả. Ví dụ, SoccerPlayer, HttpProxyServer, FileInputStream, PrintStream và SocketFactory .

## Tạo các Instance của một Class

Để tạo *một instance của một class*, bạn phải:

1. **Khai báo** tên instance của một lớp cụ thể.
2. **Khởi tạo** instance (tức là phân bổ bộ nhớ cho instance và khởi tạo instance) sử dụng toán tử "new".

Ví dụ: giả sử rằng chúng ta có một lớp gọi là Circle , chúng ta có thể tạo các instance của Circle như sau:

```java
// Declare 3 instances of the class Circle, c1, c2, and c3
Circle c1, c2, c3;  // They hold a special value called null
// Construct the instances via new operator
c1 = new Circle();
c2 = new Circle(2.0);
c3 = new Circle(3.0, "red");
 
// You can Declare and Construct in the same statement
Circle c4 = new Circle();
```

Khi một instance được khai báo nhưng không được khởi tạo, nó giữ một giá trị đặc biệt gọi là null.

## Toán tử (.)

*Các biến* và *các phương thức* thuộc một class được gọi là *các biến thành viên* và *các phương thức thành viên*. Để tham chiếu một biến hoặc phương thức thành viên, bạn phải:

1. Xác định instance mà bạn quan tâm, và sau đó,

2. Sử dụng *toán tử (.)* để tham chiếu biến hoặc phương thức thành viên mong muốn.
 
Ví dụ, giả sử rằng chúng ta có một lớp gọi là Circle , với hai biến thành viên (radius và color) và hai phương thức thành viên (getRadius() và getArea()). Chúng ta đã tạo ra ba instance của class Circle, cụ thể là c1 , c2 và c3 .Để gọi phương thức getArea(), trước hết phải xác định instance bạn quan tâm, ở đây là c2, sau đó sử dụng *toán tử (.)* , theo mẫu c2.getArea().

Ví dụ,

```java
// Suppose that the class Circle has variables radius and color,
//  and methods getArea() and getRadius().
// Declare and construct instances c1 and c2 of the class Circle
Circle c1 = new Circle ();
Circle c2 = new Circle ();
// Invoke member methods for the instance c1 via dot operator
System.out.println(c1.getArea());
System.out.println(c1.getRadius());
// Reference member variables for instance c2 via dot operator
c2.radius = 5.0;
c2.color = "blue";

```

Gọi getArea() mà không có tên instance là vô nghĩa, vì bán kính là không xác định (có thể có nhiều instance của Circle - mỗi instance sẽ có bán kính khác nhau). Thay vào đó, c1.getArea() và c2.getArea() có thể tạo ra những kết quả khác nhau.

Nói chung, giả sử có một class được gọi là *AClass* với một biến thành viên là *aVariable* và một phương thức thành viên là *aMethod()*. Một instance là *anInstance* được khởi tạo cho *AClass*. Bạn sử dụng *anInstance.aVariable* và *anInstance.aMethod()*.

## Các biến thành viên

Một biến thành viên có một tên (hoặc định danh), một kiểu dữ liệu (type) và giữ một *giá trị* của kiểu dữ liệu mà nó được khai báo.

**Quy ước đặt tên biến**: Tên biến nên là một danh từ hoặc một cụm danh từ. Từ đầu tiên viết thường và các từ còn lại viết hoa chữ cái đầu tiên (camel-case), ví dụ, fontSize, roomNumber, xMax, yMin và xTopLeft .

Cú pháp để định nghĩa biến trong Java là:

```
[AccessControlModifier] type variableName [= initialValue];
[AccessControlModifier] type variableName-1 [= initialValue-1] [, type variableName-2 [= initialValue-2]] ... ;
```

Ví dụ,

```java
private double radius;
public int length = 1, width = 1;
```

## Các phương thức thành viên

Một phương thức:

1. nhận các tham số,
2. thực hiện các thao tác được định nghĩa trong thân phương thức, và
3. trả về một phần của kết quả (hoặc void).

Cú pháp khai báo phương thức trong Java như sau:

```java
[AccessControlModifier] returnType methodName ([parameterList]) {
   // method body or implementation
   ......
}
```

Ví dụ:

```java
// Return the area of this Circle instance
public double getArea() {
   return radius * radius * Math.PI;
}
```

**Quy ước đặt tên phương thức:** Tên phương thức nên là một động từ, hoặc cụm động từ. Từ đầu tiên viết thường và các từ còn lại viết hoa chữ cái đầu tiên (camel-case). Ví dụ, getArea(), setRadius(), getParameterValues(), hasNext().

**Tên biến vs tên phương thức vs tên class:** Tên biến là danh từ, biểu thị một thuộc tính; trong khi tên phương thức là một động từ, biểu thị một hành động. Chúng có cùng một quy ước đặt tên (từ đầu tiên viết thường và các từ còn lại viết hoa chữ cái đầu tiên). Tuy nhiên, bạn có thể dễ dàng phân biệt chúng từ ngữ cảnh. Phương thức lấy các đối số trong dấu ngoặc đơn (có thể là không có đối số với dấu ngoặc đơn rỗng), còn các biến thì không có dấu ngoặc đơn. Trong bài viết này, các phương thức được biểu thị bằng một cặp ngoặc đơn, ví dụ, println(), getArea().

Mặt khác, tên class là một danh từ hoặc cụm danh từ với các từ viết hoa chữ cái đầu tiên.

## Đặt tất cả cùng nhau: Một ví dụ về OOP

![Class Definition](https://www.ntu.edu.sg/home/ehchua/programming/java/images/OOP_Circle.png)

![Instance](https://www.ntu.edu.sg/home/ehchua/programming/java/images/OOP_Circle.png)

Một class Circle được định nghĩa như trong sơ đồ. Nó chứa hai biến thành viên private : radius (kiểu double) và color (kiểu String); và ba phương thức thành viên public : getRadius(), getColor() và getArea().

Ba instance của Circle là c1 , c2 , và c3 , sẽ được khởi tạo với các dữ liệu tương ứng của chúng, như trong sơ đồ phía trên.

Các source code file Circle.java như sau:

```java
/*
 * The Circle class models a circle with a radius and color.
 */
public class Circle {    // Save as "Circle.java"
   // Private instance variables
   private double radius;
   private String color;
   
   // Constructors (overloaded)
   public Circle() {                   // 1st Constructor
      radius = 1.0;
      color = "red";
   }
   public Circle(double r) {           // 2nd Constructor
      radius = r;
      color = "red";
   }
   public Circle(double r, String c) { // 3rd Constructor
      radius = r;
      color = c;
   }
   
   // Public methods
   public double getRadius() {
      return radius;
   }
   public String getColor() {
      return color;
   }
   public double getArea() {
      return radius * radius * Math.PI;
   }
}
```

Biên dịch " Circle.java " thành " Circle.class ".

Lưu ý rằng class Circle không có phương thức main(). Vì thế, nó không phải là một chương trình độc lập và không thể tự chạy. Điều đó có nghĩa là Class Circle là một khối - được sử dụng trong các chương trình khác.

**TestCircle.java**

Bây giờ chúng ta sẽ viết một Class khác gọi là TestCircle, sử dụng class Circle. Class TestCircle có một phương thức main() và có thể thực thi.

```java
/*
 * A Test Driver for the "Circle" class
 */
public class TestCircle {    // Save as "TestCircle.java"
   public static void main(String[] args) {   // Program entry point
      // Declare and Construct an instance of the Circle class called c1
      Circle c1 = new Circle(2.0, "blue");  // Use 3rd constructor
      System.out.println("The radius is: " + c1.getRadius());  // use dot operator to invoke member methods
      System.out.println("The color is: " + c1.getColor());
      System.out.printf("The area is: %.2f%n", c1.getArea());
   
      // Declare and Construct another instance of the Circle class called c2
      Circle c2 = new Circle(2.0);  // Use 2nd constructor
      System.out.println("The radius is: " + c2.getRadius());
      System.out.println("The color is: " + c2.getColor());
      System.out.printf("The area is: %.2f%n", c2.getArea());
   
      // Declare and Construct yet another instance of the Circle class called c3
      Circle c3 = new Circle();  // Use 1st constructor
      System.out.println("The radius is: " + c3.getRadius());
      System.out.println("The color is: " + c3.getColor());
      System.out.printf("The area is: %.2f%n", c3.getArea());
   }
}
```

Biên dịch TestCircle.java thành TestCircle.class .

Chạy TestCircle và nghiên cứu kết quả:

```
The radius is: 2.0
The color is: blue
The area is: 12.57
The radius is: 2.0
The color is: red
The area is: 12.57
The radius is: 1.0
The color is: red
The area is: 3.14
```

