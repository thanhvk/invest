+++
date = "2018-10-26T13:59:46+02:00"
tags = ["oop", "java"]
title = "OOP: Composition vs Inheritance (P3)"
description = "Sử dụng composition nếu có thể, trước khi xem xét inheritance. Chỉ sử dụng inheritance nếu có quan hệ phân cấp rõ ràng giữa các class."
keywords = "oop, composition, inheritance, polymorphism, java, abstract, interface, jdk, single inheritance, multiple inheritance"
image = "/img/OOP_PointLineSub.png"
draft = false
+++

*Bài viết được dịch từ: [ntu.edu.sg](http://www.ntu.edu.sg/home/ehchua/programming/java/j3b_oopinheritancepolymorphism.html)*

<mark>*Một số thuật ngữ trong bài sẽ giữ nguyên tiếng anh, phần dịch tiếng việt chỉ mang tính tham khảo.*</mark>

## Các bài viết trong loạt bài này
[OOP: Composition (P1)](/posts/tech/oop-composition-vs-inheritance-p1)

[OOP: Inheritance (P2)](/posts/tech/oop-composition-vs-inheritance-p2)

OOP: Composition vs Inheritance (P3)

[OOP: Polymorphism (P4)](/posts/tech/oop-polymorphism-p4)

[OOP: Abstract classes & Interfaces](/posts/tech/oop-abstract-classes-interfaces-p5-end)

## 3. Composition vs Inheritance
### 3.1 "Một đường thẳng được tạo thành từ 2 điểm" vs "Một đường thẳng là một điểm mở rộng từ một điểm khác"

Nhớ lại rằng có 2 cách để tái sử dụng các class có sẵn là: *composition* và *inheritance*. Chúng ta đã thấy rằng một class <code>Line</code> có thể được tạo thành bằng cách kết hợp (composition) class <code>Point</code> - "Một đường thẳng được tạo thành từ 2 điểm" trong ví dụ về composition ở [phần 1](/posts/tech/oop-composition-vs-inheritance-p1).

Một đường thẳng cũng có thể được tạo thành bằng cách sử dụng kế thừa (inheritance) từ class <code>Point</code> - "Một đường thẳng là một điểm mở rộng từ một điểm khác". Hãy gọi subclass này là <code>LineSub</code> (để phân biệt với class <code>Line</code> sử dụng composition)

![](http://www.ntu.edu.sg/home/ehchua/programming/java/images/OOP_PointLineSub.png)

**Superclass <code>Point</code>**

Như ở phần trước.

**Subclass <code>LineSub.java</code>**

```java
/* 
 * The LineSub class, subclass of Point.
 * It inherits the begin point from the superclass, and adds an end point.
 */
public class LineSub extends Point {  // Inherited the begin point
   // Private instance variables
   Point end;   // Declare end as instance of Point
 
   // Constructors
   public LineSub(int x1, int y1, int x2, int y2) {
      super(x1, y1);
      this.end = new Point(x2, y2);   // Construct Point instances
   }
   public LineSub(Point begin, Point end) {
      super(begin.getX(), begin.getY());  // Need to construct super
      this.end = end;
   }

   // Getters and Setters 
   public Point getBegin() {
      return this;   // upcast to Point (polymorphism)
   }
   public Point getEnd() {
      return end;
   }
   public void setBegin(Point begin) {
      super.setX(begin.getX());
      super.setY(begin.getY());
   }
   public void setEnd(Point end) {
      this.end = end;
   }
 
   // Other Get and Set methods
   public int getBeginX() {
      return super.getX();  // inherited, super is optional
   }
   public void setBeginX(int x) {
      super.setX(x);        // inherited, super is optional
   }
   public int getBeginY() {
      return super.getY();
   }
   public void setBeginY(int y) {
      super.setY(y);
   }
   public int[] getBeginXY() {
      return super.getXY();
   }
   public void setBeginXY(int x, int y) {
      super.setXY(x, y);
   }
   public int getEndX() {
      return end.getX();
   }
   public void setEndX(int x) {
      end.setX(x);
   }
   public int getEndY() {
      return end.getY();
   }
   public void setEndY(int y) {
      end.setY(y);
   }
   public int[] getEndXY() {
      return end.getXY();
   }
   public void setEndXY(int x, int y) {
      end.setXY(x, y);
   }
 
   // Describe itself
   public String toString() {
      return "LineSub[begin=" + super.toString() + ",end=" + end + "]";
   }
 
   // Return the length of this Line
   public double getLength() {
      return super.distance(end);
   }
}
```

**Test Driver (TestLineSub.java)**

```java
/*
 * Test Driver for the LineSub class
 */
public class TestLineSub {
   public static void main(String[] args) {
      // Test constructors and toString()
      LineSub l1 = new LineSub(1, 2, 3, 4);
      System.out.println(l1);  // toString()
      LineSub l2 = new LineSub(new Point(5,6), new Point(7,8));
      System.out.println(l2);

      // Test Setters and Getters
      l1.setBegin(new Point(11, 12));
      l1.setEnd(new Point(13, 14));
      System.out.println(l1);  // toString()
      System.out.println("begin is: " + l1.getBegin());
      System.out.println("end is: " + l1.getEnd());

      l1.setBeginX(21);
      l1.setBeginY(22);
      l1.setEndX(23);
      l1.setEndY(24);
      System.out.println(l1);
      System.out.println(l1);  // toString()
      System.out.println("begin's x is: " + l1.getBeginX());
      System.out.println("begin's y is: " + l1.getBeginY());
      System.out.println("end's x is: " + l1.getEndX());
      System.out.println("end's y is: " + l1.getEndY());

      l1.setBeginXY(31, 32);
      l1.setEndXY(33, 34);
      System.out.println(l1);  // toString()
      System.out.println("begin's x is: " + l1.getBeginXY()[0]);
      System.out.println("begin's y is: " + l1.getBeginXY()[1]);
      System.out.println("end's x is: " + l1.getEndXY()[0]);
      System.out.println("end's y is: " + l1.getEndXY()[1]);

      // Test getLength()
      System.out.printf("length is: %.2f%n", l1.getLength());
   }
}
```

Lưu ý: test driver này tương tự code đã được sử dụng cho composition, ngoại trừ tên class.

Nghiên cứu cả 2 phiên bản của class <code>Line</code> (<code>Line</code> và <code>LineSub</code>). Tôi cho rằng dễ dàng để nói rằng "Một đường thẳng được tạo thành từ 2 điểm" hơn "Một đường thẳng là một điểm mở rộng từ một điểm khác".

**Quy tắc: ** sử dụng composition nếu có thể, trước khi xem xét inheritance. Chỉ sử dụng inheritance nếu có quan hệ phân cấp (thứ bậc) rõ ràng giữa các class.



