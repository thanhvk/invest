+++
date = "2018-10-13T13:59:46+02:00"
tags = ["oop", "java"]
title = "OOP: Composition (P1)"
description = "Với composition còn được biết đến như aggregation, bạn định nghĩa một class mới, gồm các lớp hiện có"
keywords = "oop, composition, inheritance, polymorphism, java, abstract, interface, jdk, single inheritance, multiple inheritance"
image = "/img/OOP_BookClass.png"
draft = false
+++

*Bài viết được dịch từ: [ntu.edu.sg](http://www.ntu.edu.sg/home/ehchua/programming/java/j3b_oopinheritancepolymorphism.html)*

<mark>*Một số thuật ngữ trong bài sẽ giữ nguyên tiếng anh, phần dịch tiếng việt chỉ mang tính tham khảo.*</mark>

## Các bài viết trong loạt bài này

OOP: Composition (P1)

[OOP: Inheritance (P2)](/posts/tech/oop-composition-vs-inheritance-p2)

[OOP: Composition vs Inheritance (P3)](/posts/tech/oop-composition-vs-inheritance-p3)

[OOP: Polymorphism (P4)](/posts/tech/oop-polymorphism-p4)

[OOP: Abstract classes & Interfaces](/posts/tech/oop-abstract-classes-interfaces-p5-end)

Có 2 cách để *tái sử dụng* các class có sẵn là *composition (kết hợp)* và *inheritance (kế thừa)*. Với *composition* (còn được biết đến như *aggregation*), bạn định nghĩa một class mới, gồm các lớp hiện có. Với *inheritance* bạn định nghĩa một lớp mới dựa trên một lớp hiện có, với các chỉnh sửa hoặc mở rộng.

## 1. Composition
### 1.1 Composition VD 1: Class <code>Author</code> và <code>Book</code>
**Hãy bắt đầu với class <code>Author</code>**

![](http://www.ntu.edu.sg/home/ehchua/programming/java/images/OOP_AuthorClass.png)

Class <code>Author</code> gồm có:

- 3 thuộc tính <code>private</code>: name (String), email (String) và gender (char với giá trị là 'm' hoặc 'f').

- Một hàm khởi tạo với 3 tham số là: name, email, gender.

- Các phương thức public getter/setter: getName(), getEmail(), setEmail() và getGender(). (Không có setter cho name và gender vì các thuộc tính này không được thiết kế để thay đổi).

- Một phương thức toString() trả lại một chuỗi *"name (gender) at email"* VD: *John (m) at john@somewhere.com.*

**Class Author (Author.java)**

```java
/* 
 * The Author class model a book's author.
 */
public class Author {
   // The private instance variables
   private String name;
   private String email;
   private char gender;   // 'm' or 'f'
 
   // The constructor
   public Author(String name, String email, char gender) {
      this.name = name;
      this.email = email;
      this.gender = gender;
   }
 
   // The public getters and setters for the private instance variables.
   // No setter for name and gender as they are not designed to be changed.
   public String getName() {
      return name;
   }
   public char getGender() {
      return gender;
   }
   public String getEmail() {
      return email;
   }
   public void setEmail(String email) {
      this.email = email;
   }
 
   // The toString() describes itself
   public String toString() {
      return name + " (" + gender + ") at " + email;
   }
}
```

**Test Driver cho class Author (TestAuthor.java)**

```java
/*
 * A test driver for the Author class.
 */
public class TestAuthor {
   public static void main(String[] args) {
      // Test constructor and toString()
      Author ahTeck = new Author("Tan Ah Teck", "teck@nowhere.com", 'm');
      System.out.println(ahTeck);  // toString()

      // Test Setters and Getters
      ahTeck.setEmail("teck@somewhere.com");
      System.out.println(ahTeck);  // toString()
      System.out.println("name is: " + ahTeck.getName());
      System.out.println("gender is: " + ahTeck.getGender());
      System.out.println("email is: " + ahTeck.getEmail());
   }
}
```

**Một quyển sách (Book) được viết bởi một tác giả (Author)**

![](http://www.ntu.edu.sg/home/ehchua/programming/java/images/OOP_BookClass.png)

Hãy thiết kế class Book. Giả sử một quyển sách được viết bởi một tác giả duy nhất. Class Book sẽ chứa:

- 4 thuộc tính private: name (String), author (một *instance* của class Author - đã được tạo trước đó), price (double) và qty (int).

- Các phương thức public getter và setter: getName(), getAuthor(), getPrice(), setPrice(), getQty(), setQty().

- Một phương thức toString() trả lại chuỗi "'book-name' by author-name (gender) at email". Bạn có thể tái sử dụng phương thức toString() của class Author, cái trả lại chuỗi "author-name (gender) at email".

**Class Book (Book.java)**

```java
/*
 * The Book class models a book with one (and only one) author.
 */
public class Book {
   // The private instance variables
   private String name;
   private Author author;
   private double price;
   private int qty;
 
   // Constructor
   public Book(String name, Author author, double price, int qty) {
      this.name = name;
      this.author = author;
      this.price = price;
      this.qty = qty;
   }
 
   // Getters and Setters
   public String getName() {
      return name;
   }
   public Author getAuthor() {
      return author;  // return member author, which is an instance of the class Author
   }
   public double getPrice() {
      return price;
   }
   public void setPrice(double price) {
      this.price = price;
   }
   public int getQty() {
      return qty;
   }
   public void setQty(int qty) {
      this.qty = qty;
   }
 
   // The toString() describes itself
   public String toString() {
      return "'" + name + "' by " + author;  // author.toString()
   }
}
```

**Test Driver cho class Book (TestBook.java)**

```java
/*
 * A test driver program for the Book class.
 */
public class TestBook {
   public static void main(String[] args) {
      // We need an Author instance to create a Book instance
      Author ahTeck = new Author("Tan Ah Teck", "ahTeck@somewhere.com", 'm');
      System.out.println(ahTeck);  // Author's toString()

      // Test Book's constructor and toString()
      Book dummyBook = new Book("Java for dummies", ahTeck, 9.99, 99);
      System.out.println(dummyBook);  // Book's toString()

      // Test Setters and Getters
      dummyBook.setPrice(8.88);
      dummyBook.setQty(88);
      System.out.println(dummyBook);  // Book's toString()
      System.out.println("name is: " + dummyBook.getName());
      System.out.println("price is: " + dummyBook.getPrice());
      System.out.println("qty is: " + dummyBook.getQty());
      System.out.println("author is: " + dummyBook.getAuthor());  // invoke Author's toString()
      System.out.println("author's name is: " + dummyBook.getAuthor().getName());
      System.out.println("author's email is: " + dummyBook.getAuthor().getEmail());
      System.out.println("author's gender is: " + dummyBook.getAuthor().getGender());

      // Using an anonymous Author instance to create a Book instance
      Book moreDummyBook = new Book("Java for more dummies",
            new Author("Peter Lee", "peter@nowhere.com", 'm'), // an anonymous Author's instance
            19.99, 8);
      System.out.println(moreDummyBook);  // Book's toString()
   }
}
```

### 1.2 Composition VD 2: Class <code>Point</code> và <code> Line</code>

![](http://www.ntu.edu.sg/home/ehchua/programming/java/images/ClassDiagram_Point.png)

Giả sử chúng ta đã có một class <code>Point</code>, được định nghĩa như trên. Và cần một class mới gọi là <code>Line</code>, chúng ta có thể thiết kế class <code>Line</code> bằng cách tái sử dụng class <code>Point</code> thông qua *composition*. "Một đường thẳng (line) tạo thành bởi 2 điểm (point)" hay "Một đường thẳng có 2 điểm". Composition thể hiện mối quan hệ *"has-a"*.

![](http://www.ntu.edu.sg/home/ehchua/programming/java/images/OOP_CompositionLinePointDetails.png)

**Chú thích**: Trong UML, composition được biểu diễn là một đường thẳng với một đầu hình thoi. 

**Class <code>Line</code> sử dụng Composition (Line.java)**

```java
/* 
 * A Line composes of two Points - a begin point and an end point.
 */
public class Line {
   // The private instance variables
   Point begin, end;   // Object members - instances of the Point class
 
   // Constructors
   public Line(int x1, int y1, int x2, int y2) {
      begin = new Point(x1, y1);  // Construct the instances declared
      end   = new Point(x2, y2);
   }
   public Line(Point begin, Point end) {
      this.begin = begin;  // The caller constructed the instances
      this.end   = end;
   }
 
   // The public getter and setter for the private instance variables
   public Point getBegin() {
      return begin;
   }
   public Point getEnd() {
      return end;
   }
   public void setBegin(Point begin) {
      this.begin = begin;
   }
   public void setEnd(Point end) {
      this.end = end;
   }
 
   public int getBeginX() {
      return begin.getX();  // Point's getX()
   }
   public void setBeginX(int x) {
      begin.setX(x);  // Point's setX()
   }
   public int getBeginY() {
      return begin.getY();  // Point's getY()
   }
   public void setBeginY(int y) {
      begin.setY(y);  // Point's setY()
   }
   public int[] getBeginXY() {
      return begin.getXY();  // Point's getXY()
   }
   public void setBeginXY(int x, int y) {
      begin.setXY(x, y);  // Point's setXY()
   }
   public int getEndX() {
      return end.getX();  // Point's getX()
   }
   public void setEndX(int x) {
      end.setX(x);  // Point's setX()
   }
   public int getEndY() {
      return end.getY();  // Point's getY()
   }
   public void setEndY(int y) {
      end.setY(y);  // Point's setY()
   }
   public int[] getEndXY() {
      return end.getXY();  // Point's getXY()
   }
   public void setEndXY(int x, int y) {
      end.setXY(x, y);  // Point's setXY()
   }
 
   // The toString() describe itself
   public String toString() {
      return "Line[begin=" + begin + ",end=" + end + "]";
            // Invoke begin.toString() and end.toString()
   }
 
   public double getLength() {
      return begin.distance(end);  // Point's distance()
   }
}
```

**Test Driver cho Class <code>Line</code> (TestLine.java)**

```java
/*
 * A Test Driver for the Line class.
 */
public class TestLine {
   public static void main(String[] args) {
      // Test constructor and toString()
      Line l1 = new Line(1, 2, 3, 4);
      System.out.println(l1);  // Line's toString()
      Line l2 = new Line(new Point(5,6), new Point(7,8));  // anonymous Point's instances
      System.out.println(l2);  // Line's toString()

      // Test Setters and Getters
      l1.setBegin(new Point(11, 12));
      l1.setEnd(new Point(13, 14));
      System.out.println(l1);  // Line's toString()
      System.out.println("begin is: " + l1.getBegin());  // Point's toString()
      System.out.println("end is: " + l1.getEnd());  // Point's toString()

      l1.setBeginX(21);
      l1.setBeginY(22);
      l1.setEndX(23);
      l1.setEndY(24);
      System.out.println(l1);  // Line's toString()
      System.out.println("begin's x is: " + l1.getBeginX());
      System.out.println("begin's y is: " + l1.getBeginY());
      System.out.println("end's x is: " + l1.getEndX());
      System.out.println("end's y is: " + l1.getEndY());

      l1.setBeginXY(31, 32);
      l1.setEndXY(33, 34);
      System.out.println(l1);  // Line's toString()
      System.out.println("begin's x is: " + l1.getBeginXY()[0]);
      System.out.println("begin's y is: " + l1.getBeginXY()[1]);
      System.out.println("end's x is: " + l1.getEndXY()[0]);
      System.out.println("end's y is: " + l1.getEndXY()[1]);

      // Test getLength()
      System.out.printf("length is: %.2f%n", l1.getLength());
   }
}
```

### 1.3 Composition VD 3: Class <code>Point</code> và <code> Circle</code>

Giả sử chúng ta đã có một class <code>Point</code>, như bên dưới:

![](http://www.ntu.edu.sg/home/ehchua/programming/java/images/ClassDiagram_Point.png)

Một class <code>Circle</code> được thiết kế như bên dưới:

![](http://www.ntu.edu.sg/home/ehchua/programming/java/images/ClassDiagram_CirclePoint.png)

Nó gồm có:

- 2 biến <code>private</code>: radius (double) và center (một instance của class <code>Point</code>).
- các constructor (hàm khởi tạo).
- Các phương thức getCenterX(), setCenterX(), getCenterY(), setCenterY(), getCenterXY(), setCenterXY(),...
- Một phương thức toString() trả lại một chuỗi mô tả instance này với nội dung "Circle[center=(x,y),radius=r]. Bạn nên tái sử dụng toString() của class <code>Point</code> để in "(x,y)".
- Một phương thức distance(another: Circle) trả lại khoảng cách từ tâm của hình tròn này tới tâm của một hình tròn khác (một instance khác của Circle).

**Class Circle (Circle.java)**

```java
/* 
 * The Circle class composes a Point (as its center) and a radius.
 */
public class Circle {
   // The private member variables
   private Point center;  // Declare an instance of the Point class
   private double radius;
 
   // Constructors
   public Circle() {
      this.center = new Point(); // Construct a Point at (0,0)
      this.radius = 1.0;
   }
   public Circle(int xCenter, int yCenter, double radius) {
      center = new Point(xCenter, yCenter); // Construct a Point at (xCenter,yCenter)
      this.radius = radius;
   }
   public Circle(Point center, double radius) {
      this.center = center;  // The caller constructed an Point instance
      this.radius = radius;
   }
 
   // Getters and Setters
   public double getRadius() {
      return this.radius;
   }
   public void setRadius(double radius) {
      this.radius = radius;
   }
   public Point getCenter() {
      return this.center;  // return a Point instance
   }
   public void setCenter(Point center) {
      this.center = center;
   }
 
   public int getCenterX() {
      return center.getX();  // Point's getX()
   }
   public void setCenterX(int x) {
      center.setX(x);  // Point's setX()
   }
   public int getCenterY() {
      return center.getY();  // Point's getY()
   }
   public void setCenterY(int y) {
      center.setY(y);  // Point's setY()
   }
   public int[] getCenterXY() {
      return center.getXY();  // Point's getXY()
   }
   public void setCenterXY(int x, int y) {
      center.setXY(x, y);  // Point's setXY()
   }
 
   public String toString() {
      return "Circle[center=" + center + ",radius=" + radius + "]";  // invoke center.toString()
   }
 
   public double getArea() {
      return Math.PI * radius * radius;
   }
 
   public double getCircumference() {
      return 2.0 * Math.PI * radius;
   }
 
   // Return the distance from the center of this instance to the center of
   // the given Circle instance called another.
   public double distance(Circle another) {
      return center.distance(another.center);  // Invoke distance() of the Point class
   }
}
```

**Test Driver cho class Circle (TestCircle.java)**

```java
/*
 * A test driver for the Circle class.
 */
public class TestCircle {
   public static void main(String[] args) {
      // Test Constructors and toString()
      Circle c1 = new Circle();
      System.out.println(c1);  // Circle's toString()
      Circle c2 = new Circle(1, 2, 3.3);
      System.out.println(c2);  // Circle's toString()
      Circle c3 = new Circle(new Point(4, 5), 6.6);   // an anonymous Point instance
      System.out.println(c3);  // Circle's toString()

      // Test Setters and Getters
      c1.setCenter(new Point(11, 12));
      c1.setRadius(13.3);
      System.out.println(c1);  // Circle's toString()
      System.out.println("center is: " + c1.getCenter());  // Point's toString()
      System.out.println("radius is: " + c1.getRadius());

      c1.setCenterX(21);
      c1.setCenterY(22);
      System.out.println(c1);  // Circle's toString()
      System.out.println("center's x is: " + c1.getCenterX());
      System.out.println("center's y is: " + c1.getCenterY());
      c1.setCenterXY(31, 32);
      System.out.println(c1);  // Circle's toString()
      System.out.println("center's x is: " + c1.getCenterXY()[0]);
      System.out.println("center's y is: " + c1.getCenterXY()[1]);

      // Test getArea() and getCircumference()
      System.out.printf("area is: %.2f%n", c1.getArea());
      System.out.printf("circumference is: %.2f%n", c1.getCircumference());

      // Test distance()
      System.out.printf("distance is: %.2f%n", c1.distance(c2));
      System.out.printf("distance is: %.2f%n", c2.distance(c1));
   }
}
```








