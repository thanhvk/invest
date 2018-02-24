+++
date = "2018-02-24T13:59:46+02:00"
tags = ["oop", "java"]
title = "OOP cơ bản - Hàm khởi tạo (p3 - end)"
description = "Một hàm *khởi tạo* là một phương thức đặc biệt *có tên giống với tên class*"
image = "/img/OOP_Objects_3.png"
draft = false
+++

*Bài viết được dịch từ: [ntu.edu.sg](https://www.ntu.edu.sg/home/ehchua/programming/java/J3a_OOPBasics.html)*

## Constructors

<code>**Circle.java**</code>
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

<code>**TestCircle**</code>
```java
// A Test Driver for the Circle class
public class TestCircle {
   public static void main(String[] args) {
      // Test constructors and toString()
      Circle c1 = new Circle(1.1, "blue");
      System.out.println(c1);  // toString()
      Circle c2 = new Circle(2.2);
      System.out.println(c2);  // toString()
      Circle c3 = new Circle();
      System.out.println(c3);  // toString()

      // Test Setters and Getters
      c1.setRadius(2.2);
      c1.setColor("green");
      System.out.println(c1);  // toString() to inspect the modified instance
      System.out.println("The radius is: " + c1.getRadius());
      System.out.println("The color is: " + c1.getColor());

      // Test getArea() and getCircumference()
      System.out.printf("The area is: %.2f%n", c1.getArea());
      System.out.printf("The circumference is: %.2f%n", c1.getCircumference());
   }
}
```

Một hàm *khởi tạo* (Contructor function) là một phương thức đặc biệt *có tên giống với tên class*. Trong class Circle ở trên, chúng ta định nghĩa ba phiên bản của phương thức khởi tạo Circle(......) . Một phương thức khởi tạo được sử dụng để *xây dựng* và *khởi tạo* tất cả các các biến thành viên. Để xây dựng một instance mới của một class, bạn cần sử dụng toán tử "new", sau đó gọi một trong các phương thức khởi tạo. Ví dụ,

```java
Circle c1 = new Circle();
Circle c2 = new Circle(2.0);
Circle c3 = new Circle(3.0, "red");
```

Một phương thức khởi tạo khác với một hàm thông thường ở các điểm sau:

- Tên của phương thức khởi tạo (constructor) giống với tên class. Theo quy ước đặt tên class, nó bắt đầu với một chữ hoa (thay vì chữ thường với các hàm thông thường).

- phương thức khởi tạo không có kiểu trả về. Nó hiển nhiên trả lại void . Không có câu lệnh return trong thân của phương thức khởi tạo.

- phương thức khởi tạo chỉ có thể được gọi thông qua toán tử "new". Nó chỉ được sử dụng *khi* khởi tạo các instance.

- Các phương thức khởi tạo không được kế thừa (sẽ giải thích sau).

**phương thức khởi tạo mặc định (Default Constructor)**: Một phương thức khởi tạo không có tham số được gọi là phương thức khởi tạo mặc định . Nó khởi tạo các biến thành viên với giá trị mặc định. Ví dụ, Circle() trong ví dụ ở trên khởi tạo các biến thành viên radius và color với giá trị mặc định của chúng.

## Nạp chồng phương thức (Method Overloading)

Nạp chồng phương thức có nghĩa là *cùng một tên phương thức* có thể có *các cách triển khai (phiên bản) khác nhau*. Tuy nhiên, các cách triển khai khác nhau phải được phân biệt bằng danh sách các tham số của chúng (có thể là số lượng các tham số, hoặc kiểu của các thâm số, hoặc thứ tự của chúng).

**Ví dụ**: Phương thức average() có 3 phiên bản, với các danh sách tham số khác nhau. Người gọi có thể gọi phiên bản đã chọn bằng cách cung cấp các tham số phù hợp.

```java
/*
 * Example to illustrate Method Overloading
 */
public class TestMethodOverloading {
   public static int average(int n1, int n2) {          // version A
      System.out.println("Run version A");
      return (n1+n2)/2;
   }
 
   public static double average(double n1, double n2) { // version B
      System.out.println("Run version B");
      return (n1+n2)/2;
   }
 
   public static int average(int n1, int n2, int n3) {  // version C
      System.out.println("Run version C");
      return (n1+n2+n3)/3;
   }

   public static void main(String[] args) {
      System.out.println(average(1, 2));     // Use A
      System.out.println(average(1.0, 2.0)); // Use B
      System.out.println(average(1, 2, 3));  // Use C
      System.out.println(average(1.0, 2));   // Use B - int 2 implicitly casted to double 2.0
      // average(1, 2, 3, 4); // Compilation Error - No matching method
   }
}
```

**Nạp chồng phương thức khởi tạo của class Circle**

phương thức khởi tạo, giống như một phương thức thông thường, cũng có thể bị nạp chồng. Class Circle phía trên có ba phiên bản của phương thức khởi tạo theo danh sách tham số của chúng, như sau:

```java
Circle()
Circle(double r)
Circle(double r, String c)
```

Tùy thuộc vào danh sách các tham số được sử dụng khi gọi phương thức, phương thức khởi tạo phù hợp sẽ được gọi. Nếu danh sách đối số của bạn không khớp với bất kỳ một trong các phương thức nào, bạn sẽ nhận được một lỗi biên dịch.

## public vs. private - Mức truy cập (Access Control Modifiers)

Một *mức truy cập* có thể được sử dụng để *kiểm soát khả năng hiển thị/trông thấy* của một class, hoặc một biến thành viên hoặc một phương thức thành viên trong một class. Chúng ta bắt đầu với hai mức kiểm soát truy cập sau đây:

1. public : class/biến /phương thức có thể truy cập và có sẵn cho *tất cả* các đối tượng khác trong hệ thống.

2. private : class/biến /phương thức có thể truy cập và chỉ có sẵn *trong class này*.

Ví dụ, trong định nghĩa Circle ở trên, biến radius được khai báo là private. Do đó, radius có thể truy cập bên trong class Circle, nhưng không thể truy cập trong class TestCircle. Nói cách khác, bạn không thể sử dụng "c1.radius" để tham chiếu tới radius của c1 trong TestCircle.

- Hãy thử thêm câu lệnh "System.out.println(c1.radius)" trong TestCircle và quan sát thông báo lỗi.

- Hãy thử thay đổi radius thành public trong class Circle , và chạy lại câu lệnh trên.

Mặt khác, phương thức getRadius() được khai báo public trong class Circle. Do đó, nó có thể được gọi trong class TestCircle .

![Class Definition](https://www.ntu.edu.sg/home/ehchua/programming/java/images/OOP_Circle.png)

**Ký hiệu UML:** Trong sơ đồ class UML , các thành viên public được ký hiệu với dấu "+"; trong khi các thành viên private có dấu "-".

Các mức truy cập khác sẽ được thảo luận sau.

## Đóng gói và che giấu thông tin

Một class đóng gói tên, các thuộc tính tĩnh và các hành vi động vào một "hộp 3 ngăn." Khi class đã được định nghĩa, bạn có thể niêm phong "hộp" và đặt "hộp" lên giá để những người khác sử dụng và tái sử dụng. Bất cứ ai cũng có thể lấy "chiếc hộp" và sử dụng nó trong ứng dụng của họ. Điều này không thể thực hiện bằng ngôn ngữ hướng thủ tục truyền thống như C, vì các thuộc tính tĩnh (hoặc các biến) được phân tán trên toàn bộ chương trình và các tệp tiêu đề. Bạn không thể "cắt" ra một phần của chương trình C, cắm vào một chương trình khác và mong đợi chương trình chạy mà không có những thay đổi lớn.

Các biến thành viên của một class thường không thể truy cập từ bên ngoài (ví dụ các class khác), với mức truy cập private. Truy cập vào các biến thành viên được cung cấp thông qua các phương thức public, ví dụ, getRadius() và getColor().

Điều này tuân theo nguyên tắc *che dấu thông tin*. Đó là, các đối tượng giao tiếp với nhau bằng cách sử dụng các giao diện (interface) được định nghĩa rõ (các phương thức công cộng). Các đối tượng không được phép biết các thông tin cụ thể của đối tượng khác. Các thông tin cụ thể được che dấu hoặc đóng gói trong class. Che giấu thông tin giúp dễ dàng tái sử dụng class.

**Quy tắc chung:** Đừng khai bất kỳ biến nào là public, trừ khi bạn có lý do chính đáng.

## Các phương thức public để đọc (Getter) và sửa đổi (Setter) cho các biến private

Để cho phép các class khác đọc giá trị của một biến private là xxx , chúng ta cung cấp *phương thức get* (hoặc *phương thức getter* hoặc *accessor*) gọi là getXxx(). Phương thức get không cần phải cung cấp dữ liệu ở dạng thô. Nó có thể xử lý và giới hạn dữ liệu mà những người khác sẽ thấy. Các getters sẽ không sửa đổi biến.

Để cho phép các class khác *sửa đổi* giá trị của một biến private là xxx, chúng ta cung cấp một *phương thức set* (hoặc *phương thức setter* hoặc *mutator*) gọi là setXxx(). Một phương thức set có thể  cung cấp xác nhận dữ liệu (chẳng hạn như kiểm tra phạm vi) hoặc chuyển đổi dữ liệu thô thành biểu diễn bên trong.

Ví dụ, trong class Circle của chúng ta, radius và color được khai báo private. Có nghĩa là chúng chỉ có thể truy cập được trong class Circle và không thể nhìn thấy trong bất kỳ class nào khác, chẳng hạn như class TestCircle. Bạn không thể truy cập trực tiếp đến radius và color từ class TestCircle thông qua c1.radius hoặc c1.color. Class Circle cung cấp hai phương thức truy cập public là getRadius() và getColor(). Những phương thức này được khai báo public. Class TestCircle có thể gọi các phương thức accessor public này để lấy ra radius và color của class Circle, thông qua c1.getRadius() và c1.getColor().

Không có cách nào có thể thay đổi radius hoặc color của một đối tượng Circle, sau khi nó được khởi trong class TestCircle. Bạn không thể đưa ra các câu lệnh như c1.radius = 5.0 để thay đổi radius, vì radius được khai báo là private trong class Circle và không thể thấy đối với các class khác bao gồm TestCircle .

Nếu người thiết kế class Circle cho phép thay đổi radius và color sau khi một đối tượng Circle được khởi tạo, anh ta phải cung cấp các phương thức thiết lập thích hợp (các setter hoặc mutator)

```java
// Setter for color
public void setColor(String newColor) {
   color = newColor;
}
   
// Setter for radius
public void setRadius(double newRadius) {
   radius = newRadius;
}
```

Với việc thực hiện quy tắc *che giấu thông tin*, người thiết kế của một class có toàn quyền kiểm soát những thứ người dùng của class đó có thể và không thể làm.

## Từ khóa "this"

Bạn có thể sử dụng từ khóa "this" để tham chiếu tới instance *này* bên trong một định nghĩa class.

Một trong những cách sử dụng chính của từ khóa this là để giải quyết sự không rõ ràng.

```java
public class Circle {
   double radius;                 // Member variable called "radius"
   public Circle(double radius) { // Method's argument also called "radius"
      this.radius = radius;
         // "radius = radius" does not make sense!
         // "this.radius" refers to this instance's member variable
         // "radius" resolved to the method's argument.
   }
   ...
}
```

Trong đoạn code trên, có hai định danh được gọi là radius - một biến thành viên của class và tham số của phương thức. Điều này gây ra mâu thuẫn đặt tên. Để tránh xung đột đặt tên, bạn có thể đặt tên cho tham số của phương thức là r thay vì radius. Tuy nhiên, radius có ý nghĩa hơn trong bối cảnh này. Java cung cấp một từ khoá được gọi là this để giải quyết vấn đề xung đột đặt tên. "this.radius" dùng để chỉ biến thành viên; trong khi "radius" để chỉ các tham số của phương thức.

Sử dụng từ khóa "this", các phương thức khởi tạo, getter và setter cho một biến private được gọi là xxx của kiểu T như sau:

```java 
public class Aaa {
   // A private variable named xxx of the type T
   private T xxx;
 
   // Constructor
   public Aaa(T xxx) {
      this.xxx = xxx;
   }
 
   // A getter for variable xxx of type T receives no argument and return a value of type T
   public T getXxx() {
      return xxx;  // or "return this.xxx" for clarity
   }
 
   // A setter for variable xxx of type T receives a parameter of type T and return void
   public void setXxx(T xxx) {
      this.xxx = xxx;
   }
}
```

Đối với một biến boolean xxx, getter lên đặt tên là isXxx() hoặc hasXxx() sẽ có ý nghĩa hơn getXxx(). Setter vẫn setXxx() .

```java
// Private boolean variable
private boolean xxx;
 
// Getter
public boolean isXxx() {
   return xxx;  // or "return this.xxx" for clarity
}
 
// Setter
public void setXxx(boolean xxx) {
   this.xxx = xxx;
}
```

**Thông tin thêm về "this"**

- this.*varName* đề cập đến *varName* của instance này; this.*methodName*(...) gọi *methodName*(...) của instance này.

- Trong một phương thức khởi tạo, chúng ta có thể sử dụng this(...) để gọi *phương thức khởi tạo khác* của class này.

- Bên trong một phương thức, chúng ta có thể sử dụng câu lệnh "return this" để trả lại instance này cho người gọi.

## Phương thức toString()

Mỗi class Java được thiết kế tốt nên có một phương thức public gọi là toString() trả về một chuỗi mô tả của instance này. Bạn có thể gọi phương thức toString() một cách rõ ràng bằng cách gọi *anInstanceName.toString()*, hoặc ngầm định qua println() hoặc toán tử nối chuỗi '+'.

Ví dụ: bao gồm phương thức toString() sau đây trong class Circle của chúng tôi:

```java
// Return a String description of this instance
public String toString() {
   return "Circle[radius=" + radius + ",color=" + color + "]";
}
```

Trong class TestCircle của bạn, bạn có thể có được mô tả về một trường hợp Circle qua:

```java
Circle c1 = new Circle();
System.out.println(c1.toString());   // Explicitly calling toString()
System.out.println(c1);              // Implicit call to c1.toString()
System.out.println("c1 is: " + c1);  // '+' invokes toString() to get a String before concatenation
```

Cú pháp của toString() là:

```java
public String toString() { ...... }
```

## Các hằng số (Constants)

Hằng số là các biến được định nghĩa với từ khóa <code>final</code>. Một hằng số chỉ có thể được chỉ định một lần và giá trị của nó không thể sửa đổi một khi đã được chỉ định. Ví dụ,

```java
public final double X_REFERENCE = 1.234;
 
private final int MAX_ID = 9999;
MAX_ID = 10000;  // error: cannot assign a value to final variable MAX_ID
 
// You need to initialize a final member variable during declaration
private final int SIZE;    // error: variable SIZE might not have been initialized
```

**Quy ước đặt tên hằng số:** Tên hằng số là một danh từ, hoặc một cụm từ danh từ. Tất cả các từ được viết hoa và phân cách bằng dấu '_', ví dụ, X_REFERENCE , MAX_INTEGER và MIN_VALUE.

Chú ý:

1. Một biến <code>final</code> không thể gán lại một giá trị mới.

2. Một instance <code>final</code> không thể gán lại một đối tượng mới.

3. Một class <code>final</code> không thể có class con (hoặc extend).

4. Một phương thức <code>final</code> không thể bị ghi đè.

## Đặt tất cả cùng nhau trong một class Circle đã được sửa đổi

Chúng sẽ gồm các phương thức khởi tạo, getters, setters, toString(), và sử dụng từ khóa "this". Sơ đồ UML cho class Circle như sau:

![Circle](/img/ClassDiagram_Circle.png)

<code>**Circle.java**</code>

```java
/* 
 * The Circle class models a circle with a radius and color.
 */
public class Circle {    // Save as "Circle.java"
   // The public constants
   public static final double DEFAULT_RADIUS = 8.8;
   public static final String DEFAULT_COLOR  = "red";
   
   // The private instance variables
   private double radius;
   private String color;
   
   // The (overloaded) constructors
   public Circle() {                   // 1st (default) Constructor
      this.radius = DEFAULT_RADIUS;
      this.color  = DEFAULT_COLOR;
   }
   public Circle(double radius) {      // 2nd Constructor
      this.radius = radius;
      this.color = DEFAULT_COLOR;
   }
   public Circle(double radius, String color) { // 3rd Constructor
      this.radius = radius;
      this.color = color;
   }
   
   // The public getters and setters for the private variables
   public double getRadius() {
      return this.radius;
   }
   public void setRadius(double radius) {
      this.radius = radius;
   }
   public String getColor() {
      return this.color;
   }
   public void setColor(String color) {
      this.color = color;
   }
 
   // The toString() returns a String description of this instance
   public String toString() {
      return "Circle[radius=" + radius + ", color=" + color + "]";
   }
 
   // Return the area of this Circle
   public double getArea() {
      return radius * radius * Math.PI;
   }
 
   // Return the circumference of this Circle
   public double getCircumference() {
      return 2.0 * radius * Math.PI;
   }
}
```

**Test Driver cho Class Circle**

```java
// A Test Driver for the Circle class
public class TestCircle {
   public static void main(String[] args) {
      // Test constructors and toString()
      Circle c1 = new Circle(1.1, "blue");
      System.out.println(c1);  // toString()
      Circle c2 = new Circle(2.2);
      System.out.println(c2);  // toString()
      Circle c3 = new Circle();
      System.out.println(c3);  // toString()

      // Test Setters and Getters
      c1.setRadius(2.2);
      c1.setColor("green");
      System.out.println(c1);  // toString() to inspect the modified instance
      System.out.println("The radius is: " + c1.getRadius());
      System.out.println("The color is: " + c1.getColor());

      // Test getArea() and getCircumference()
      System.out.printf("The area is: %.2f%n", c1.getArea());
      System.out.printf("The circumference is: %.2f%n", c1.getCircumference());
   }
}
```

Các kết quả mong đợi là:

```
Circle[radius=1.1, color=blue]
Circle[radius=2.2, color=red]
Circle[radius=8.8, color=red]
Circle[radius=2.2, color=green]
Radius is: 2.2
Color is: green
Area is: 15.21
Circumference is: 13.82
```

## Đọc thêm
[https://www.ntu.edu.sg/home/ehchua/programming/java/J3a_OOPBasics.html#zz-3.](https://www.ntu.edu.sg/home/ehchua/programming/java/J3a_OOPBasics.html#zz-3.)