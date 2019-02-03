+++
date = "2018-10-28T13:59:46+02:00"
tags = ["oop", "java"]
title = "OOP: Polymorphism (P4)"
description = "Polymorphism là một tính năng mạnh mẽ trong OOP để tách giao diện (interface) và triển khai (implementation)"
keywords = "oop, composition, inheritance, polymorphism, java, abstract, interface, jdk, single inheritance, multiple inheritance"
image = "/img/OOP_PolymorphismMonster.png"
draft = false
+++

*Bài viết được dịch từ: [ntu.edu.sg](http://www.ntu.edu.sg/home/ehchua/programming/java/j3b_oopinheritancepolymorphism.html)*

<mark>*Một số thuật ngữ trong bài sẽ giữ nguyên tiếng anh, phần dịch tiếng việt chỉ mang tính tham khảo.*</mark>

## Các bài viết trong loạt bài này

[OOP: Composition (P1)](/posts/tech/oop-composition-p1)

[OOP: Inheritance (P2)](/posts/tech/oop-inheritance-p2)

[OOP: Composition vs Inheritance (P3)](/posts/tech/oop-composition-vs-inheritance-p3)

OOP: Polymorphism (P4)

[OOP: Abstract classes & Interfaces](/posts/tech/oop-abstract-classes-interfaces-p5-end)

## 4. Polymorphism
Từ *đa hình (polymorphism)* có nghĩa là *nhiều hình thức (many forms)*. Nó xuất phát từ tiếng Hy Lạp *"poly"* có nghĩa là  nhiều và *"morphos"* có nghĩa là hình thức. Ví dụ, trong hóa học, carbon thể hiện tính đa hình vì nó có thể được tìm thấy dưới nhiều hình thức: than chì và kim cương. Nhưng, *mỗi hình thức có các thuộc tính riêng* (và cả giá).

### 4.1 Khả năng thay thế
Một subclass sở hữu tất cả các thuộc tính và phương thức thuộc superclass của nó (vì subclass kế thừa tất cả các thuộc tính và phương thức từ superclass của nó). Điều này có nghĩa là một subclass có thể làm mọi thứ mà superclass của nó có thể làm. Kết quả là, chúng ta có thể *thay thế (substitute)* một instance của subclass khi một instance của superclass được mong đợi, và mọi thứ sẽ làm việc tốt. Điều này được gọi là *khả năng thay thế (substitutability)*.

![](http://www.ntu.edu.sg/home/ehchua/programming/java/images/OOP_PolymorphismCircleCylinder.png)

Trong ví dụ ở [phần 2](/posts/tech/oop-inheritance-p2) về <code>Circle</code> và <code>Cylinder</code>: <code>Cylinder</code> là một subclass của <code>Circle</code>. Chúng ta có thể nói rằng <code>Cylinder</code> *"là một (is-a)"* <code>Circle</code> (thực tế *"là nhiều hơn một (is-more-than-a)"* <code>Circle</code>). Subclass-superclass thể hiện một mối quan hệ gọi là *"is-a"*

**Circle.java**

```java
// The superclass Circle
public class Circle {
   // private instance variable
   private double radius;
   // Constructor
   public Circle(double radius) {
      this.radius = radius;
   }
   // Getter
   public double getRadius() {
      return this.radius;
   }
   // Return the area of this circle
   public double getArea() {
      return radius * radius * Math.PI;
   }
   // Describe itself
   public String toString() {
      return "Circle[radius=" + radius + "]";
   }
}
```

**Cylinder.java**

```java
// The subclass Cylinder
public class Cylinder extends Circle {
   // private instance variable
   private double height;
   // Constructor
   public Cylinder(double height, double radius) {
      super(radius);
      this.height = height;
   }
   // Getter
   public double getHeight() {
      return this.height;
   }
   // Return the volume of this cylinder
   public double getVolumne() {
      return super.getArea() * height;
   }
   // Override the inherited method to return the surface area
   @Override
   public double getArea() {
      return 2.0 * Math.PI * getRadius() * height;
   }
   // Override the inherited method to describe itself
   @Override
   public String toString() {
      return "Cylinder[height=" + height + "," + super.toString() + "]";
   }
}
```

Thông qua *khả năng thay thế (substitutability)*, chúng ta có thể tạo một instance của <code>Cylinder</code>, và gán nó tới một tham chiếu của <code>Circle</code> (superclass của nó), như dưới đây:

```java
// Substitute a subclass instance to a superclass reference
Circle c1 = new Cylinder(1.1, 2.2);
```

Bạn có thể gọi tất cả các phương thức đã được định nghĩa trong <code>Circle</code> trên <code>c1</code> (cái thực sự đang là một <code>Cylinder</code> object) ví dụ:

```java
// Invoke superclass Circle's methods
c1.getRadius();
```

Điều này có thể, vì một instance của subclass sở hữu tất cả các thuộc tính và phương trong superclass của nó.

Tuy nhiên, bạn không thể gọi các phương thức được định nghĩa trong <code>Cylinder</code> ví dụ:

```java
// CANNOT invoke method in Cylinder as it is a Circle reference!
c1.getHeight();  // compilation error
c1.getVolume();  // compilation error
```

Bởi vì <code>c1</code> tham chiếu tới class <code>Circle</code>, nó không biết về các phương thức được định nghĩa trong subclass <code>Cylinder</code>.

<code>c1</code> là một tham chiếu tới class <code>Circle</code>, nhưng giữ một instance của subclass <code>Cylinder</code>. Tuy nhiên, <code>c1</code> vẫn *giữ nguyên các thuộc tính và phương thức của nó*. Trong ví dụ này subclass <code>Cylinder</code> ghi đè các phương thức <code>getArea()</code> và <code>toString()</code>. Nên <code>c1.getArea()</code> hay <code>c1.toString()</code> gọi các phiên bản đã được ghi đè trong subclass <code>Cylinder</code>, thay vì các phiên bản đã được định nghĩa trong <code>Circle</code>.
Điều này xảy ra bởi vì <code>c1</code> thực tế giữ một instance của <code>Cylinder</code> bên trong.

```java
c1.toString();  // Run the overridden version!
c1.getArea();   // Run the overridden version!
```

**Tổng kết**

1. Một instance của subclass có thể được gán (thay thế) bằng một tham chiếu của superclass.
2. Khi thay thế, chúng ta có thể gọi các phương thức được định nghĩa trong superclass nhưng không thể gọi các phương thức được định nghĩa trong subclass.
3. Tuy nhiên, nếu subclass ghi đè các phương thức được kế thừa từ superclass, các phiên bản của subclass (đã được ghi đè) sẽ được gọi.

### 4.2 Polymorphism Ví dụ 1: <code>Shape</code> và các subclass của nó
Polymorphism là một tính năng rất mạnh mẽ trong OOP để *tách giao diện (interface) và triển khai (implementation)* nó cho phép các lập trình viên lập trình tại mức giao diện trong thiết kế của một hệ thống phức tạp.

Xem xét ví dụ sau. Giả sử chương trình của chúng ta sử dụng nhiều loại hình, chẳng hạn như hình tam giác, hình chữ nhật, ... Chúng ta nên thiết kết một superclass là <code>Shape</code>, cái định nghĩa các giao diện (interface) hay hành vi chung của tất cả các hình. Ví dụ, tất cả các hình sẽ có một phương thức gọi là <code>getArea()</code>, phương thức trả lại diện tích của một hình cụ thể. Class <code>shape</code> có thể được viết như sau:

![](http://www.ntu.edu.sg/home/ehchua/programming/java/images/OOP_PolymorphismShape.png)

**Superclass <code>Shape.java</code>**

```java
/*
 * Superclass Shape maintain the common properties of all shapes
 */
public class Shape {
   // Private member variable
   private String color;
   
   // Constructor
   public Shape (String color) {
      this.color = color;
   }
   
   @Override
   public String toString() {
      return "Shape[color=" + color + "]";
   }
   
   // All shapes must have a method called getArea().
   public double getArea() {
      // We have a problem here!
      // We need to return some value to compile the program.
      System.err.println("Shape unknown! Cannot compute area!");
      return 0;
   }
}
```

Lưu ý rằng chúng ta có một vấn đề khi viết phương thức <code>getArea()</code> trong class <code>Shape</code>, bởi vì diện tích không thể tính toán được trừ khi có một hình thực sự. Chúng ta sẽ in ra một thông báo lỗi. Ở phần sau, tôi sẽ chỉ cho bạn thấy cách giải quyết vấn đề này.

Chúng ta có thể tạo ra các subclass như <code>Triange</code> và <code>Rectangle</code> từ superclass <code>Shape</code>.

**Subclass <code>Rectangle.java</code>**

```java
/*
 * The Rectangle class, subclass of Shape
 */
public class Rectangle extends Shape {
   // Private member variables
   private int length;
   private int width;
   
   // Constructor
   public Rectangle(String color, int length, int width) {
      super(color);
      this.length = length;
      this.width = width;
   }
   
   @Override
   public String toString() {
      return "Rectangle[length=" + length + ",width=" + width + "," + super.toString() + "]";
   }
   
   // Override the inherited getArea() to provide the proper implementation
   @Override
   public double getArea() {
      return length*width;
   }
}
```

**Subclass <code>Triangle.java</code>**

```java
/* 
 * The Triangle class, subclass of Shape
 */
public class Triangle extends Shape {
   // Private member variables
   private int base;
   private int height;
   
   // Constructor
   public Triangle(String color, int base, int height) {
      super(color);
      this.base = base;
      this.height = height;
   }
   
   @Override
   public String toString() {
      return "Triangle[base=" + base + ",height=" + height + "," + super.toString() + "]";
   }
   
   // Override the inherited getArea() to provide the proper implementation
   @Override
   public double getArea() {
      return 0.5*base*height;
   }
}
```

Các subclass nghi đè phương thức <code>getArea()</code> được kế thừa từ superclass, và cung cấp các triển khai thích hợp cho <code>getArea()</code>.

**Test driver (<code>TestShape.java</code>)**

Trong ứng dụng, chúng ta có thể tạo ra các tham chiếu của <code>Shape</code> và gán cho chúng các instance của subclass, như sau:

```java
/*
 * A test driver for Shape and its subclasses
 */
public class TestShape {
   public static void main(String[] args) {
      Shape s1 = new Rectangle("red", 4, 5);  // Upcast
      System.out.println(s1);  // Run Rectangle's toString()
      System.out.println("Area is " + s1.getArea());  // Run Rectangle's getArea()
      
      Shape s2 = new Triangle("blue", 4, 5);  // Upcast
      System.out.println(s2);  // Run Triangle's toString()
      System.out.println("Area is " + s2.getArea());  // Run Triangle's getArea()
   }
}
```

Kết quả như sau:

```bash
Rectangle[length=4,width=5,Shape[color=red]]
Area is 20.0
Triangle[base=4,height=5,Shape[color=blue]]
Area is 10.0
```

Vẻ đẹp của đoạn code này là *tất cả các tham chiếu đều từ superclass (lập trình ở mức giao diện)*. Bạn có thể khởi tạo các instance khác nhau của subclass, và code vẫn làm việc. Bạn có thể mở rộng chương trình dễ dàng bằng cách thêm nhiều subclass hơn, như <code>Circle, Square,</code>...

Tuy nhiên, định nghĩa class <code>Shape</code> có một vấn đề, nếu ai đó khởi tạo một object <code>Shape</code> và gọi phương thức <code>getArea()</code> từ object <code>Shape</code>, chương trình sẽ bị lỗi.

```java
public class TestShape {
   public static void main(String[] args) {
      // Constructing a Shape instance poses problem!
      Shape s3 = new Shape("green");
      System.out.println(s3);
      System.out.println("Area is " + s3.getArea());  // Invalid output
   }
}
```

Điều này là bởi vì class <code>Shape</code> cung cấp giao diện chung cho tất cả các subclass của nó, cái sẽ cung cấp các thực thi thực sự. Chúng ta không muốn bất kỳ ai khởi tạo một instance của <code>Shape</code>. Vấn đề này có thể được giải quyết bằng cách sử dụng astract class.

### 4.3 Polymorphism Ví dụ 2: <code>Monster</code> và các subclass của nó
![](http://www.ntu.edu.sg/home/ehchua/programming/java/images/OOP_PolymorphismMonster.png)

Polymorphism là một tính năng rất mạnh mẽ trong OOP để *tách giao diện (interface) và triển khai (implementation)* nó cho phép các lập trình viên lập trình tại mức giao diện trong thiết kế của một hệ thống phức tạp. Ví dụ, trong các ứng dụng game, chúng ta có nhiều kiểu quái vật có thể tấn công. Chúng ta nên định nghĩa một superclass gọi là <code>Monter</code> và một phương thức <code>attack()</code> bên trong nó. Các subclass sẽ cung cấp các thực thi thực sự. Trong chương trình chính, chúng ta khai báo các tham chiếu của superclass, nhưng gán cho chúng instance của subclass (4.1 Khả năng thay thế) và gọi các phương thức được định nghĩa trong superclass.

**Superclass <code>Monster.java</code>**

```java
/*
 * The superclass Monster defines the expected common behaviors for its subclasses.
 */
public class Monster {
   // private instance variable
   private String name;

   // Constructor
   public Monster(String name) {
      this.name = name;
   }

   // Define common behavior for all its subclasses
   public String attack() {
      return "!^_&^$@+%$* I don't know how to attack!";
      // We have a problem here!
      // We need to return a String; else, compilation error!
   }
}
```

**Subclass <code>FireMonster.java</code>**

```java
public class FireMonster extends Monster {
   // Constructor
   public FireMonster(String name) {
      super(name);
   }
   // Subclass provides actual implementation
   @Override public String attack() {
      return "Attack with fire!"; 
   }
}
```

**Subclass <code>WaterMonster.java</code>**

```java
public class WaterMonster extends Monster {
   // Constructor
   public WaterMonster(String name) {
      super(name);
   }
   // Subclass provides actual implementation
   @Override public String attack() {
      return "Attack with water!";
   }
}
```

**Subclass <code>StoneMonster.java</code>**

```java
public class StoneMonster extends Monster {
   // Constructor
   public StoneMonster(String name) {
      super(name);
   }
   // Subclass provides actual implementation
   @Override public String attack() {
      return "Attack with stones!";
   }
}
```

**Test Driver <code>TestMonster.java</code>**

```java
public class TestMonster {
   public static void main(String[] args) {
      // Program at the "interface" defined in the superclass.
      // Declare instances of the superclass, substituted by subclasses.
      Monster m1 = new FireMonster("r2u2");   // upcast
      Monster m2 = new WaterMonster("u2r2");  // upcast
      Monster m3 = new StoneMonster("r2r2");  // upcast

      // Invoke the actual implementation
      System.out.println(m1.attack());  // Run FireMonster's attack()
      System.out.println(m2.attack());  // Run WaterMonster's attack()
      System.out.println(m3.attack());  // Run StoneMonster's attack()

      // m1 dies, generate a new instance and re-assign to m1.
      m1 = new StoneMonster("a2b2");  // upcast
      System.out.println(m1.attack());  // Run StoneMonster's attack()

      // We have a problem here!!!
      Monster m4 = new Monster("u2u2");
      System.out.println(m4.attack());  // garbage!!!
   }
}
```

### 4.4 Upcasting & Downcasting
**Upcasting một instance của subclass thành một tham chiếu của superclass**

Việc thay thế một instance của subclass cho superclass của nó gọi là *"upcasting"*. Bởi vì, trong một sơ đồ class UML, subclass thường được vẽ bên dưới các superclass của nó. Upcasting *luôn luôn an toàn* vì một instance của subclass sở hữu tất cả các thuộc tính và phương thức trong superclass của nó và có thể làm bất cứ điều gì mà superclass của nó có thể làm. Trình biên dịch sẽ kiểm tra tính hợp lệ của upcasting và báo lỗi "incompatible types" nếu không hợp lệ. Ví dụ:

```java
Circle c1 = new Cylinder(1.1, 2.2);  // Compiler checks to ensure that R-value is a subclass of L-value.
Circle c2 = new String();            // Compilation error: incompatible types
```

**Downcasting một tham chiếu thành class gốc của nó**

Bạn có thể chuyển một tham chiếu của superclass thành một tham chiếu của subclass. Điều này gọi là *"downcasting"*. Ví dụ:

```java
Circle c1 = new Cylinder(1.1, 2.2);  // upcast is safe
Cylinder cy1 = (Cylinder) c1;        // downcast needs the casting operator
```

Downcasting không phải lúc nào cũng an toàn, và có thể ném ra một ngoại lệ <code>ClassCastException</code> nếu instance downcasting không thuộc về subclass trong thời gian chạy. Một instance của subclass có thể được thay thế với superclass của nó, nhưng ngược lại thì không đúng.

**Ví dụ khác về Upcasting và Downcasting**

![](http://www.ntu.edu.sg/home/ehchua/programming/java/images/OOP_PolymorphismABC.png)

```java
public class A {
   public A() {  // Constructor
      System.out.println("Constructed A");
   }
   public String toString() {
      return "This is A";
   }
}
```

```java
public class B extends A {
   public B() {  // Constructor
      super();
      System.out.println("Constructed B");
   }
   @Override
   public String toString() {
      return "This is B";
   }
}
```

```java
public class C extends B {
   public C() {  // Constructor
      super();
      System.out.println("Constructed C");
   }
   @Override
   public String toString() {
      return "This is C";
   }
}
```

Chương trình sau kiểm tra upcasting và downcasting của các class ở trên:

```java
public class TestCasting {
   public static void main(String[] args) {
      A a1 = new C();   // upcast
      System.out.println(a1);  // run C's toString()
      B b1 = (B)a1;     // downcast okay
      C c1 = (C)b1;     // downcast okay

      A a2 = new B();  // upcast
      System.out.println(a2);  // run B's toString()
      B b2 = (B)a2;    // downcast okay
      C c2 = (C)a2;    // compilation okay, but runtime error ClassCastException
   }
}
```

### 4.5 Toán tử <code>instanceof</code>

Java cung cấp một toán tử nhị phân gọi là <code>instanceof</code> cái trả lại <code>true</code> nếu một object là một instance của một class cụ thể. Cú pháp sẽ như sau:

```java
anObject instanceof aClass
```

```java
Circle c1 = new Circle();
System.out.println(c1 instanceof Circle);  // true
 
if (c1 instanceof Circle) { ...... }
```

Một instance của subclass cũng là một instance của superclass của nó. Ví dụ:

```java
Circle c1 = new Circle(1.1);
Cylinder cy1 = new Cylinder(2.2, 3.3);
System.out.println(c1 instanceof Circle);    // true
System.out.println(c1 instanceof Cylinder);  // false
System.out.println(cy1 instanceof Cylinder); // true
System.out.println(cy1 instanceof Circle);   // true
 
Circle c2 = new Cylinder(4.4, 5.5);
System.out.println(c2 instanceof Circle);    // true
System.out.println(c2 instanceof Cylinder);  // true
```

**Casting Operator**

Trình biên dịch có thể không phát hiện được lỗi trong câu lệnh upcasting và downcasting, nó chỉ được phát hiện trong thời gian chạy. Ví dụ:

```java
Circle c1 = new Circle(5);
Point p1 = new Point();
 
c1 = p1;          // compilation error: incompatible types (Point is not a subclass of Circle)
c1 = (Circle)p1;  // runtime error: java.lang.ClassCastException: Point cannot be casted to Circle
```

### 4.6 Tổng kết Polymorphism
1. Một instance của subclass sở hữu tất cả các thuộc tính và phương thức trong superclass của nó. Khi một instance của superclass được mong đợi, nó có thể thay thế bởi một instance của subclass. Nói cách khác, một tham chiếu tới một class có thể giữ một instance của class đó hoặc một instance của một trong các subclass của nó - nó gọi là khả năng thay thế.

2. Nếu một instance của subclass được gán tới một tham chiếu của superclass, bạn chỉ có thể gọi các phương thức định nghĩa trong superclass. Bạn không thể gọi các phương thức được định nghĩa trong subclass.

3. Tuy nhiên, thay thế một instance vẫn giữ nguyên các phương thức đã được ghi đè và các biến được che dấu. Nếu subclass ghi đè các phương thức trong superclass, phiên bản của subclass sẽ được thực thi, thay vì phiên bản của superclass.



