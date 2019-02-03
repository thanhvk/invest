+++
date = "2018-12-27T13:59:46+02:00"
tags = ["oop", "java"]
title = "OOP: Abstract classes & Interfaces (P5 - end)"
description = "Đâu là thiết kế tốt hơn: interface hay abstract superclass? Không có câu trả lời rõ rằng cho câu hỏi này"
keywords = "oop, composition, inheritance, polymorphism, java, abstract, interface, jdk, single inheritance, multiple inheritance"
image = "/img/OOP_UMLSuperclass.png"
draft = false
+++

*Bài viết được dịch từ: [ntu.edu.sg](http://www.ntu.edu.sg/home/ehchua/programming/java/j3b_oopinheritancepolymorphism.html)*

<mark>*Một số thuật ngữ trong bài sẽ giữ nguyên tiếng anh, phần dịch tiếng việt chỉ mang tính tham khảo.*</mark>

## Các bài viết trong loạt bài này

[OOP: Composition (P1)](/posts/tech/oop-composition-p1)

[OOP: Inheritance (P2)](/posts/tech/oop-inheritance-p2)

[OOP: Composition vs Inheritance (P3)](/posts/tech/oop-composition-vs-inheritance-p3)

[OOP: Polymorphism (P4)](/posts/tech/oop-polymorphism-p4)

OOP: Abstract classes & Interfaces (P5 - end)

## 5. Abstract Classes & Interfaces
### 5.1 abstract method và abstract class

Trong những ví dụ ở [phần 4](/posts/tech/oop-polymorphism-p4) về <code>Shape</code> và <code>Monster</code>, chúng ta đã gặp vấn đề khi tạo các instance của <code>Shape</code> và <code>Monster</code> và chạy phương thức <code>getArea()</code> hay <code>attack()</code>. Điều này có thể được giải quyết thông qua <code>abstract</code> method và <code>abstract</code> class.

Một <code>abstract</code> method là một phương thức chỉ có chữ ký (tên phương thức, danh sách các tham số và kiểu trả về) mà không có phần thực thi (như thân của phương thức). Bạn sử dụng từ khóa <code>abstract</code> để khai báo một abstract method.

Ví dụ, trong class <code>Shape</code>, chúng ta khai báo các phương thức <code>abstract</code> getArea(), draw(),... như sau:

```java
abstract public class Shape {
   ......
   ......
   abstract public double getArea();
   abstract public double getPerimeter();
   abstract public void draw();
}
```

Thực thi các phương thức này là KHÔNG thể trong class <code>Shape</code>, vì nó không phải là một hình cụ thể. Việc triển khai các <code>abstract</code> methods sẽ được cung cấp sau khi một hình cụ thể được khai báo. Các phương thức <code>abstract</code> không thể gọi vì chúng không có triển khai.

![](http://www.ntu.edu.sg/home/ehchua/programming/java/images/OOP_PolymorphismAbstractShape.png)

Một class chứa một hoặc nhiều <code>abtract</code> method được gọi là <code>abstract</code> class. Một <code>abtract</code> class phải được khai báo với một class-modifier <code>abstract</code>. Một class <code>abstract</code> KHÔNG THỂ được khởi tạo, vì định nghĩa của nó không hoàn chỉnh.

**Biểu diễn UML:** <code>abstract</code> class và method biểu diễn dưới dạng chữ *in nghiêng*.

### 5.2 Abstract Class Ví dụ 1: Shape và các subclass của nó

Hãy viết lại class <code>Shape</code> thành một <code>abstract</code> class, chứa một phương thức <code>abstract</code> getArea() như sau:

**<code>abstract</code> superclass <code>Shape.java</code>**

```java
/*
 * This abstract superclass Shape contains an abstract method
 * getArea(), to be implemented by its subclasses.
 */
abstract public class Shape {
   // Private member variable
   private String color;
   
   // Constructor
   public Shape (String color) {
      this.color = color;
   }
   
   @Override
   public String toString() {
      return "Shape of color=\"" + color + "\"";
   }
   
   // All Shape subclasses must implement a method called getArea()
   abstract public double getArea();
}
```

Một <code>abstract</code> class là *không hoàn chỉnh* trong định nghĩa của nó, vì triển khai các phương thức của nó bị thiếu. Chính vì thế, một <code>abstract</code> class *không thể khởi tạo*. Nói cách khác, bạn không thể tạo các instance từ một <code>abstract</code> class (ngược lại, bạn sẽ có một instance không hoàn chỉnh với các phương thức thiếu phần thân).

Đặc điểm này của <code>abstract</code> class giải quyết các vấn đề ở phần trước. Nói cách khác, bạn có thể tạo các instance của subclass như <code>Triangle</code> và <code>Rectangle</code>, và upcasting chúng thành <code>Shape</code> (để lập trình và hoạt động ở mức giao diện), nhưng bạn không thể tạo các instance của <code>Shape</code>, giúp tránh được vấn đề mà chúng ta đã gặp phải. Ví dụ:

```java
public class TestShape {
   public static void main(String[] args) {
      Shape s1 = new Rectangle("red", 4, 5);
      System.out.println(s1);
      System.out.println("Area is " + s1.getArea());
      
      Shape s2 = new Triangle("blue", 4, 5);
      System.out.println(s2);
      System.out.println("Area is " + s2.getArea());
      
      // Cannot create instance of an abstract class
      Shape s3 = new Shape("green");   // Compilation Error!!
   }
}
```

Tóm lại, một <code>abstract</code> class cung cấp *một bản mẫu để phát triển thêm nữa*. Một <code>abstract</code> class cung cấp một interface chung nhất (hay protocol, hay contract, hay understanding, hay naming convention) cho tất cả các subclass của nó. Ví trong <code>abstract</code> class <code>Shape</code>, bạn có thể định nghĩa các phương thức chẳng hạn như <code>getArea()</code> và <code>draw()</code>. Việc không triển khai có thể vì hình cụ thể (chữ nhật hay tam giác,...) chưa được biết. Tuy nhiên, bằng cách chỉ định chữ ký của các <code>abstract</code> method, tất cả các subclass *buộc phải* sử dụng chữ ký của các phương thức này. Các subclass có thể cung cấp các triển khai thích hợp.

Cùng với polymorphism, bạn có thể upcast các instance của subclass thành <code>Shape</code>, và lập trình ở mức <code>Shape</code> hay còn gọi là lập trình ở mức giao diện (interface). Việc tách giao diện (interface) và triển khai (implementation) cho phép thiết kế phần mềm tốt hơn, và dễ dàng mở rộng. Ví dụ, <code>Shape</code> định nghĩa một phương thức gọi là <code>getArea()</code>, phương thức mà mọi subclass của <code>Shape</code> phải cung cấp triển khai chính xác. Bạn có thể gọi <code>getArea()</code> từ bất kỳ subclass nào của <code>Shape</code>, diện tích chính xác sẽ được tính toán. Thêm nữa ứng dụng của bạn có thể dễ dàng mở rộng để thêm các hình mới (như hình tròn hay hình vuông) bằng cách khai báo thêm subclass.

**[Quy tắc ngón tay cái](https://www.voatiengviet.com/a/words-and-idioms-33-rule-of-thumb-to-rule-the-roost-86393557/917313.html):** Lập trình ở mức giao diện, không ở mức triển khai (Tạo một tham chiếu của superclass, thay thế với các instance subclass của nó; và chỉ gọi các phương thức được định nghĩa trong superclass).

Lưu ý:

- Một phương thức <code>abstract</code> không thể khai báo <code>final</code>, vì phương thức <code>final</code> không thể ghi đè. Phương thức <code>abstract</code> phải được ghi đè trong các subclass trước khi có thể sử dụng.

- Một phương thức <code>abstract</code> không thể khai báo <code>private</code> (nó sẽ tạo ra lỗi biên dịch). Vì phương thức <code>private</code> không thể thấy trong các subclass và vì thế không thể ghi đè.

### 5.3 Abstract class Ví dụ 2: Monster
Chúng ta sẽ định nghĩa một superclass <code>Monster</code> như một <code>abstract</code> class, chứa một phương thức <code>abstract</code> là <code>attack()</code>. <code>Astract</code> class không thể khởi tạo (hay không thể tạo các instance).

```java
/*
 * The abstract superclass Monster defines the expected common behaviors,
 * via abstract methods.
 */
abstract public class Monster {
   private String name;  // private instance variable

   public Monster(String name) {  // constructor
      this.name = name;
   }

   // Define common behavior for all its subclasses
   abstract public String attack();
}
```

### 5.4 Interface 
Một <code>interface</code> trong Java là một *abstract supperclass 100%* nó định nghĩa một tập hợp các phương thức mà các subclass của nó phải hỗ trợ. Một <code>interface</code> chỉ chứa các public *abstract method* (các phương thức với chữ ký và không được triển khai) và có thể là *các hằng số (constant)* (các biến <code>public static final</code>). Bạn phải sử dụng từ khóa "<code>interface</code>" để định nghĩa một <code>interface</code> (thay vì từ khóa "class" cho các class thông thường). Từ khóa <code>public</code> và <code>abstract</code> không cần thiết cho các phương thức <code>abstract</code> vì chúng là bắt buộc.

(JDK 8 giới thiệu các phương thức <code>default</code> và <code>static</code> trong interface. JDK 9 giới thiệu các phương thức <code>private</code> trong interface. Chúng nằm ngoài phạm vi của bài viết này).

Tương tự một abstract superclass, một <code>interface</code> không thể được khởi tạo. Bạn phải tạo một "subclass", cái triển khai interface, và cung cấp các triển khai thực sự của tất cả các phương thức <code>abstract</code> trong interface.

Không giống một class thông thường, sử dụng từ khóa "extends" để khai báo một subclass. Với interface, chúng ta sử dụng từ khóa "implements" để khai báo một subclass.

Một interface là một *contract (hợp đồng)* cho cái mà các class có thể làm. Tuy  nhiên, nó không chỉ định cách các class sẽ làm như thế nào.

Một interface cung cấp một *mẫu*, một *giao thức*, một *chuẩn*, một *hợp đồng*, một *đặc điểm kỹ thuật*, một *bộ quy tắc*, một *giao diện*, cho các đối tượng triển khai nó. 

Trong Java abstract class và interface được sử dụng để tách *giao diện* khỏi các triển khai của nó, cho phép lập trình viên lập trình tại mức *giao diện* thay vì nhiều *triển khai* khác nhau.

**Interface Naming Convention:** Sử dụng một tính từ (thường kết thúc bằng "able") gồm một hoặc nhiều từ. Mỗi từ nên viết hoa chữ cái đầu tiên. Ví dụ <code>Serializable</code>, <code>Extenalizable</code>, <code>Movable</code>, <code>Clonable</code>, <code>Runnable,</code>...

### 5.5 Interface Ví dụ 1: Shape Interface và các triển khai của nó.

Chúng ta có thể viết lại abstract superclass <code>Shape</code> thành một <code>interface</code>, chỉ chứa các abstract method như sau:

![](http://www.ntu.edu.sg/home/ehchua/programming/java/images/OOP_InterfaceShape.png)

**Biểu diễn bằng UML:** Các abstract class, interface và abstract method được biểu diễn bằng chữ in nghiêng. Các triển khai của interface được biểu diễn bằng mũi tên nét đứt dẫn từ các subclass tới interface.

```java
/*
 * The interface Shape specifies the behaviors
 * of this implementations subclasses.
 */
public interface Shape {  // Use keyword "interface" instead of "class"
   // List of public abstract methods to be implemented by its subclasses
   // All methods in interface are "public abstract".
   // "protected", "private" and "package" methods are NOT allowed.
   double getArea();
}
```

```java
// The subclass Rectangle needs to implement all the abstract methods in Shape
public class Rectangle implements Shape {  // using keyword "implements" instead of "extends"
   // Private member variables
   private int length;
   private int width;

   // Constructor
   public Rectangle(int length, int width) {
      this.length = length;
      this.width = width;
   }

   @Override
   public String toString() {
      return "Rectangle[length=" + length + ",width=" + width + "]";
   }

   // Need to implement all the abstract methods defined in the interface
   @Override
   public double getArea() {
      return length * width;
   }
}
```

```java
// The subclass Triangle need to implement all the abstract methods in Shape
public class Triangle implements Shape {
   // Private member variables
   private int base;
   private int height;

   // Constructor
   public Triangle(int base, int height) {
      this.base = base;
      this.height = height;
   }

   @Override
   public String toString() {
      return "Triangle[base=" + base + ",height=" + height + "]";
   }

   // Need to implement all the abstract methods defined in the interface
   @Override
   public double getArea() {
      return 0.5 * base * height;
   }
}
```

Một test driver như dưới đây:

```java
public class TestShape {
   public static void main(String[] args) {
      Shape s1 = new Rectangle(1, 2);  // upcast
      System.out.println(s1);
      System.out.println("Area is " + s1.getArea());

      Shape s2 = new Triangle(3, 4);  // upcast
      System.out.println(s2);
      System.out.println("Area is " + s2.getArea());

      // Cannot create instance of an interface
      //Shape s3 = new Shape("green");   // Compilation Error!!
   }
}
```

### 5.5 Interface VD 2: Movable Interface và các triển khai của nó

Giả sử ứng dụng của chúng ta có nhiều đối tượng có thể di chuyển. Chúng ta có thể định nghĩa một interface gọi là <code>Movable</code>, chứa chữ ký (signature) của nhiều phương thức di chuyển khác nhau.

![](http://www.ntu.edu.sg/home/ehchua/programming/java/images/OOP_InterfaceMovable.png)

**Interface <code>Moveable.java</code>**

```java
/*
 * The Movable interface defines a list of public abstract methods
 * to be implemented by its subclasses
 */
public interface Movable {  // use keyword "interface" (instead of "class") to define an interface
   // An interface defines a list of public abstract methods to be implemented by the subclasses
   public void moveUp();    // "public" and "abstract" optional
   public void moveDown();
   public void moveLeft();
   public void moveRight();
}
```

Tương tự một <code>abstract</code> class, một <code>interface</code> không thể được khởi tạo; bởi vì nó không hoàn chỉnh (phần thân của các phương thức <code>abstract</code> bị thiếu). Để sử dụng một <code>interface</code> bạn phải sử dụng các subsclass và cung cấp các triển khai tới tất cả các phương thức <code>abstract</code> đã được khai báo trong <code>interface</code>. Các subsclasses giờ đã hoàn thiện và có thể được khởi tạo.

**<code>MovablePoint.java</code>**

Để khai báo các subclass từ một <code>interface</code>, chúng ta sẽ sử dụng từ khóa "implements" thay vì "extends" khi khai báo các subclass từ một class thông thường hay <code>abstract</code> class. Điều quan trọng cần lưu ý là subclass triển khai một <code>interface</code> cần phải ghi đè "tất cả" các phương thức abstract đã được định nghĩa trong interface; ngược lại subclass không thể biên dịch. Ví dụ:

```java
// The subclass MovablePoint needs to implement all the abstract methods
// defined in the interface Movable
public class MovablePoint implements Movable {
   // Private member variables
   private int x, y;   // (x, y) coordinates of the point
      
   // Constructor
   public MovablePoint(int x, int y) {
      this.x = x;
      this.y = y;
   }
 
   @Override
   public String toString() {
      return "(" + x + "," + y + ")";
   }

   // Need to implement all the abstract methods defined in the interface Movable
   @Override
   public void moveUp() {
      y--;
   }
   @Override
   public void moveDown() {
      y++;
   }
   @Override
   public void moveLeft() {
      x--;
   }
   @Override
   public void moveRight() {
      x++;
   }
}
```

Các class khác trong ứng dụng có thể triển khai tương tự interface <code>Movable</code> và cung cấp các triển khai của riêng chúng cho các phương thức <code>abstract</code> đã được định nghĩa trong interface <code>Movable</code>.

**<code>TestMovable.java</code>**

Chúng ta cũng có thể upcast các instance của subclass thành interface <code>Movable</code>, thông qua polymorphism tương tự một <code>abstract</code> class.

```java
public class TestMovable {
   public static void main(String[] args) {
      MovablePoint p1 = new MovablePoint(1, 2);  // upcast
      System.out.println(p1);
      p1.moveDown();
      System.out.println(p1);
      p1.moveRight();
      System.out.println(p1);
      
      // Test Polymorphism
      Movable p2 = new MovablePoint(3, 4);  // upcast
      p2.moveUp();
      System.out.println(p2);
      MovablePoint p3 = (MovablePoint)p2;   // downcast
      System.out.println(p3);
   }
}
```

### 5.7 Triển khai nhiều Interface

Như đã đề cập, Java hỗ trợ *đơn kế thừa (single inheritance)*. Có nghĩa là một subclass chỉ có thể kế thừa từ một và chỉ một superclass. Java không hỗ trợ *đa kế thừa (multiple inheritance)* để tránh xung đột khi kế thừa các thuộc tính từ nhiều superclass. 

Tuy nhiên, một subclass có thể triển khai nhiều hơn một interface. Điều này được cho phép trong Java vì <code>interface</code> chỉ định nghĩa các phương thức <code>abstract</code> mà không không có các triển khai thực sự và ít có khả năng dẫn đến xung đột khi kế thừa các thuộc tính từ nhiều <code>inteface</code>. Ví dụ:

```java
public class Circle extends Shape implements Movable, Adjustable { 
          // extends one superclass but implements multiple interfaces
   .......
}
```

### 5.8 Cú pháp khai báo <code>interface</code>

Cú pháp để khai báo interface là:
```java
[public|protected|package] interface interfaceName
[extends superInterfaceName] {
   // constants
   static final ...;

   // public abstract methods' signature
   ...
}
```

Tất cả các phương thức trong một interface sẽ là <code>public</code> và <code>abstract</code> (bởi mặc định). Bạn không thể sử dụng các access modifier khác như <code>private</code>, <code>protected</code> và <code>default</code> hay các modifier như <code>static</code>, <code>final</code>.

Tất cả các trường phải là <code>public</code>, <code>static</code>, và <code>final</code> (mặc định).

Một interface có thể "extends" từ một super-interface.

**Biểu diễn UML:** UML sử dụng mũi tên liền liên kết subclass tới một abstract superclass, và mũi tên nét đứt để liên kết với một interface như hình phía dưới. Abstract class và abstract method được biểu thị bằng chữ nghiêng.

![](http://www.ntu.edu.sg/home/ehchua/programming/java/images/OOP_UMLSuperclass.png)

### 5.9 Tại sao lại cần <code>interface</code>?

Thứ nhất, một interface là một *contract (bản hợp đồng)* (hay một giao thức, một sự hiểu biết chung) về những thứ mà class có thể làm. Khi một class triển khai một interface cụ thể, nó phải cung cấp các triển khai cho tất cả các phương thức abstract đã được khai báo trong interface. Interface định nghĩa một tập hợp các hành vi phổ biến. Các class triển khai interface chấp nhận các hành vi này và cung cấp các triển khai của riêng chúng cho các hành vi này. Điều này cho phép bạn lập trình ở mức interface thay vì các triển khai thực sự. Một trong những cách sử dụng chính của interface là cung cấp *communication contract (hợp đồng giao tiếp - cách thức giao tiếp)* giữa 2 đối tượng. Nếu bạn biết một class triển khai một interface, thì bạn sẽ biết rằng class chứa các triển khai cụ thể của các phương thức đã được khai báo trong interface đó, và bạn được đảm bảo khả năng gọi các phương thức đó một cách an toàn. Nói cách khác, 2 đối tượng có thể giao tiếp với nhau dựa trên hợp đồng đã được định nghĩa trong interface, thay vì các triển khai cụ thể của chúng.

Thứ hai, Java không hỗ trợ đa kế thừa (như C++). Đa kế thừa cho phép bạn tạo ra một subclass từ nhiều hơn một superclass trực tiếp. Nó cũng đặt ra một vấn đề nếu 2 superclass trực tiếp có các xung đột trong việc triển khai các phương thức cùng tên (Phiên bản triển khai nào sẽ được sử dụng trong subclass?). Tuy nhiên, đa kế thừa có vai trò của riêng nó. Java có thể thực hiện đa kế thừa bằng cách cho phép bạn "triển khai" nhiều hơn một interface. Vì các interface chỉ chứa các phương thức abstract mà không phải là các triển khai thực sự, nên sẽ không có xung đột giữa nhiều interface. (Interface có thể có các constant nhưng không được khuyến khích. Nếu một subclass triển khai 2 interface có xung đột về các constant, trình biên dịch sẽ báo lỗi).

### 5.10 Interface vs Abstract Superclass

Đâu là thiết kế tốt hơn: interface hay abstract superclass? Không có câu trả lời rõ rằng cho câu hỏi này.

Sử dụng abstract superclass nếu có một hệ thống phân cấp class rõ ràng. Abstract class có thể chứa các triển khai thông thường (chẳng hạn như các biến và phương thức). Ngược lại, interface không thể chứa bất kỳ triển khai nào, mà chỉ đơn thuần là định nghĩa các hành vi.