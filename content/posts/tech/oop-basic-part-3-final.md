+++
date = "2018-02-13T13:59:46+02:00"
tags = ["oop", "java"]
title = "OOP cơ bản - Hàm khởi tạo (end)"
description = ""
image = "/img/OOP_Objects_3.png"
draft = false
+++


## Constructors

Một hàm *Khởi tạo* (Contructor function) giống như một phương thức đặc biệt có *có tên phương thức giống với tên class*. Trong class Circle ở trên, chúng ta định nghĩa ba phiên bản của hàm khởi tạo Circle(......) . Một hàm khởi tạo được sử dụng để *xây dựng và khởi tạo* tất cả các biến thành viên. Để xây dựng một instance mới của một lớp học, bạn cần sử dụng toán tử "new", sau đó gọi một trong các hàm khởi tạo. Ví dụ,

```java
Circle c1 = new Circle();
Circle c2 = new Circle(2.0);
Circle c3 = new Circle(3.0, "red");
```

Một hàm khởi tạo khác với một phương thức thông thường ở các điểm sau:

- Tên của phương thức constructor giống với tên lớp. Theo quy ước của classname, nó bắt đầu với một chữ hoa (thay vì chữ thường cho các phương pháp thông thường).
- Constructor không có kiểu trả về. Nó hiển nhiên trở lại void . Không có câu lệnh return được cho phép bên trong thân của nhà xây dựng.
- Constructor chỉ có thể được gọi thông qua toán tử " new ". Nó chỉ có thể được sử dụng *một lần* để khởi tạo các thể hiện được xây dựng. Một khi một cá thể được xây dựng, bạn không thể gọi constructor nữa.
- Các nhà xây dựng không được kế thừa (sẽ được giải thích sau).

**Default Constructor**: Một constructor không có tham số được gọi là constructor mặc định . Nó khởi tạo các biến thành viên thành giá trị mặc định. Ví dụ, Circle() trong ví dụ trên khởi tạo radius các thành viên radius và color cho giá trị mặc định của chúng.

## Method Overloading (Revisit)

Phương pháp quá tải có nghĩa là tên *cùng một phương thức* có thể có *các cài đặt khác nhau* (các phiên bản). Tuy nhiên, các cài đặt khác nhau phải được phân biệt bằng danh sách các tham số của chúng (số lượng các tham số, hoặc loại thông số, hoặc thứ tự của chúng).

**Ví dụ**: Phương thức average() có 3 phiên bản, với các danh sách tham số khác nhau. Người gọi có thể gọi phiên bản đã chọn bằng cách cung cấp các đối số phù hợp.

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
**Quá tải Lớp Constructor Lớp Circle**

Thi công, giống như một phương pháp thông thường, cũng có thể bị quá tải. Lớp Circle phía trên có ba phiên bản quá tải của các nhà xây dựng khác biệt theo danh sách tham số của chúng, như sau:

```java
Circle()
Circle(double r)
Circle(double r, String c)
```

Tùy thuộc vào danh sách các đối số thực tế được sử dụng khi gọi phương thức, phương thức kết hợp sẽ được gọi. Nếu danh sách đối số của bạn không khớp với bất kỳ một trong các phương pháp, bạn sẽ nhận được một lỗi biên dịch.

## public vs. private - Access Control Modifiers

Một điều chỉnh kiểm soát truy cập có thể được sử dụng để kiểm soát khả năng hiển thị của một lớp, hoặc một biến thành viên hoặc một phương thức thành viên trong một lớp. Chúng ta bắt đầu với hai điều chỉnh kiểm soát truy cập sau đây:

1. public : Lớp / biến / phương pháp có thể truy cập và có sẵn cho tất cả các đối tượng khác trong hệ thống.
2. private : Lớp / biến / phương pháp có thể truy cập và chỉ có trong lớp này .

Ví dụ, trong định nghĩa Circle ở trên, radius biến thành viên được khai báo là private . Do đó, radius có thể truy cập bên trong lớp Circle , nhưng không trong lớp TestCircle . Nói cách khác, bạn không thể sử dụng " c1.radius " để tham khảo radius của c1 trong TestCircle .

- Hãy thử chèn tuyên bố " System.out.println(c1.radius) " trong TestCircle và quan sát thông báo lỗi.
- Hãy thử thay đổi radius thành public trong lớp Circle , và chạy lại câu lệnh trên.

Mặt khác, phương thức getRadius() được khai báo public trong lớp Circle . Do đó, nó có thể được gọi trong lớp TestCircle .

**Ký hiệu UML:** Trong sơ đồ lớp UML , public thành viên public được ký hiệu là " + "; trong khi private thành viên private có " - ".

Thêm các điều chỉnh kiểm soát truy cập sẽ được thảo luận sau.

## Information Hiding and Encapsulation

Một lớp đóng gói tên, các thuộc tính tĩnh và các hành vi động vào một "hộp 3 ngăn." Một khi lớp được xác định, bạn có thể đóng dấu "hộp" và đặt "hộp" lên giá để người khác sử dụng và sử dụng lại. Bất cứ ai cũng có thể nhặt "chiếc hộp" và sử dụng nó trong ứng dụng của họ. Điều này không thể thực hiện bằng ngôn ngữ lập trình truyền thống như C, vì các thuộc tính tĩnh (hoặc các biến) được phân tán trên toàn bộ chương trình và các tệp tiêu đề. Bạn không thể "cắt" ra một phần của chương trình C, cắm vào một chương trình khác và mong đợi chương trình chạy mà không có thay đổi lớn.

Các biến thành viên của một lớp thường bị ẩn khỏi từ bên ngoài (ví dụ các lớp khác), với điều chỉnh kiểm soát truy cập private . Truy cập vào các biến thành viên được cung cấp thông qua public phương pháp đánh giá viên, ví dụ, getRadius() và getColor() .

Điều này làm theo nguyên tắc *ẩn thông tin*. Đó là, các đối tượng giao tiếp với nhau bằng cách sử dụng các giao diện được xác định rõ (các phương thức công cộng). Các đối tượng không được phép biết các chi tiết thực hiện của người khác. Các chi tiết thực hiện được ẩn hoặc đóng gói trong lớp. Ẩn thông tin tạo điều kiện tái sử dụng lớp học.

**Quy tắc chung:** Đừng biến bất kỳ biến public , trừ khi bạn có lý do chính đáng.

## The public Getters and Setters for private Variables

Để cho phép các lớp khác đọc giá trị của một biến private nói xxx , chúng ta cung cấp *phương thức get* (hoặc *phương thức getter* hoặc *accessor*) gọi là getXxx() . Phương thức get không cần phải phơi bày dữ liệu ở định dạng thô. Nó có thể xử lý dữ liệu và giới hạn xem dữ liệu mà những người khác sẽ thấy. Các getters sẽ không sửa đổi biến.

Để cho phép các lớp khác *sửa đổi* giá trị của một biến private nói xxx , chúng ta cung cấp một *phương thức set* (hoặc *phương thức setter* hoặc *mutator*) gọi là setXxx() . Phương thức đặt có thể cung cấp xác nhận dữ liệu (chẳng hạn như kiểm tra phạm vi) hoặc chuyển đổi dữ liệu thô thành biểu diễn bên trong.

Ví dụ, trong lớp Circle của chúng ta, các radius và color được khai báo private . Có nghĩa là chúng chỉ có thể truy cập được trong lớp Circle và không thể nhìn thấy trong bất kỳ lớp nào khác, chẳng hạn như lớp TestCircle . Bạn không thể truy cập trực tiếp đến radius và color của lớp nhân viên TestCircle thông qua c1.radius hoặc c1.color . Lớp Circle cung cấp hai phương thức truy cập công cộng, cụ thể là getRadius() và getColor() . Những phương pháp này được tuyên bố public . Lớp TestCircle có thể gọi các phương thức accessor công cộng này để lấy ra radius và color của một đối tượng Circle , thông qua c1.getRadius() và c1.getColor() .

Không có cách nào bạn có thể thay đổi radius hoặc color của một đối tượng Circle , sau khi được xây dựng trong lớp TestCircle . Bạn không thể đưa ra các câu lệnh như c1.radius = 5.0 để thay đổi radius ví dụ c1 , vì radius được tuyên bố là private trong lớp Circle và không hiển thị đối với các lớp khác bao gồm TestCircle .

Nếu nhà thiết kế của lớp Circle cho phép thay đổi radius và color sau khi một đối tượng Circle được xây dựng, anh ta phải cung cấp các phương thức thiết lập thích hợp (hoặc các phương thức setter hoặc mutator)

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

Với việc thực hiện đúng các *thông tin ẩn*, nhà thiết kế của một lớp học có toàn quyền kiểm soát những gì người dùng của lớp có thể và không thể làm.

## Keyword "this"

Bạn có thể sử dụng từ khóa " this " để tham khảo ví dụ này bên trong một định nghĩa lớp.

Một trong những cách sử dụng chính của từ khóa this là để giải quyết sự mơ hồ.

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

Trong các mã trên, có hai định danh được gọi là radius - một biến thành viên của lớp và đối số của phương pháp. Điều này gây ra mâu thuẫn đặt tên. Để tránh xung đột đặt tên, bạn có thể đặt tên cho đối số của phương thức r thay vì radius . Tuy nhiên, radius là xấp xỉ và có ý nghĩa hơn trong bối cảnh này. Java cung cấp một từ khoá được gọi là this để giải quyết xung đột đặt tên này. " this.radius " dùng để chỉ biến thành viên; trong khi " radius " giải quyết các đối số của phương pháp.

Sử dụng từ khóa " this ", các phương thức xây dựng, getter và setter cho một biến private được gọi là xxx của kiểu T như sau:

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

Đối với một biến boolean xxx , getter sẽ được đặt tên isXxx() hoặc hasXxx() , có ý nghĩa hơn getXxx() . Bộ setter vẫn setXxx() .

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

- this. varName this. varName đề cập đến varName của trường hợp này; this. methodName (...) this. methodName (...) gọi methodName (...) của cá thể này.
- Trong một constructor, chúng ta có thể sử dụng this(...) để gọi constructor khác của lớp này.
- Bên trong một phương pháp, chúng ta có thể sử dụng câu lệnh " return this " để trả lại trường hợp này cho người gọi.

## Method toString()

Mỗi lớp Java được thiết kế tốt phải có một phương pháp public gọi toString() trả về một mô tả string của trường hợp this . Bạn có thể gọi phương thức toString() một cách rõ ràng bằng cách gọi phương thức *anInstanceName .toString()*, hoặc ngầm định qua println() hoặc toán tử nối String concatenation operator '+' . Đó là, chạy println(*anInstance*) gọi phương thức toString() của thể hiện đó một cách ngầm ẩn.

Ví dụ: bao gồm phương thức toString() sau đây trong lớp Circle của chúng tôi:

```java
// Return a String description of this instance
public String toString() {
   return "Circle[radius=" + radius + ",color=" + color + "]";
}
```

Trong lớp TestCircle của bạn, bạn có thể có được mô tả về một trường hợp Circle qua:

```java
Circle c1 = new Circle();
System.out.println(c1.toString());   // Explicitly calling toString()
System.out.println(c1);              // Implicit call to c1.toString()
System.out.println("c1 is: " + c1);  // '+' invokes toString() to get a String before concatenation
```

Chữ ký của toString() là:

```java
public String toString() { ...... }
```

## Constants (final)

Hằng số là các biến được định nghĩa với sửa đổi final . Một biến final chỉ có thể được chỉ định một lần và giá trị của nó không thể được sửa đổi một khi được chỉ định. Ví dụ,

```java
public final double X_REFERENCE = 1.234;
 
private final int MAX_ID = 9999;
MAX_ID = 10000;  // error: cannot assign a value to final variable MAX_ID
 
// You need to initialize a final member variable during declaration
private final int SIZE;    // error: variable SIZE might not have been initialized
```

**Constant Naming Convention:** Một tên liên tục là một danh từ, hoặc một cụm từ danh từ gồm nhiều từ. Tất cả các từ được viết hoa bằng dấu hoa ' _ ', ví dụ, X_REFERENCE , MAX_INTEGER và MIN_VALUE .

Ghi chú nâng cao:

1. Một biến nguyên thủy final không thể được gán lại một giá trị mới.
2. Một ví dụ final không thể được gán lại một đối tượng mới.
3. Một lớp học final không thể được phân lớp phụ (hoặc mở rộng).
4. Không thể bỏ qua phương pháp final .

## Putting Them Together in the Revised Circle Class

Chúng ta sẽ bao gồm các nhà xây dựng, getters, setters, toString() , và sử dụng từ khóa " this ". Sơ đồ lớp cho lớp Circle cuối cùng như sau:

![Circle](https://www.ntu.edu.sg/home/ehchua/programming/java/images/ClassDiagram_Circle.png)

**Circle.java**

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

**Một Driver Kiểm tra cho Class Circle**

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