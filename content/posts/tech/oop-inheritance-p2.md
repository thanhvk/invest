+++
date = "2018-10-25T13:59:46+02:00"
tags = ["oop", "java"]
title = "OOP: Inheritance (P2)"
description = "Trong OOP, chúng ta thường tổ chức các class thành hệ thống phân cấp để tránh trùng lặp và giảm thiểu sự dư thừa"
keywords = "oop, composition, inheritance, polymorphism, java, abstract, interface, jdk, single inheritance, multiple inheritance"
image = "/img/OOP_InheritanceExamples.png"
draft = false
+++

*Bài viết được dịch từ: [ntu.edu.sg](http://www.ntu.edu.sg/home/ehchua/programming/java/j3b_oopinheritancepolymorphism.html)*

<mark>*Một số thuật ngữ trong bài sẽ giữ nguyên tiếng anh, phần dịch tiếng việt chỉ mang tính tham khảo.*</mark>

## Các bài viết trong loạt bài này
[OOP: Composition (P1)](/posts/tech/oop-composition-vs-inheritance-p1)

OOP: Inheritance (P2)

[OOP: Composition vs Inheritance (P3)](/posts/tech/oop-composition-vs-inheritance-p3)

[OOP: Polymorphism (P4)](/posts/tech/oop-polymorphism-p4)

[OOP: Abstract classes & Interfaces](/posts/tech/oop-abstract-classes-interfaces-p5-end)

## 2. Inheritance (Kế thừa)
Trong OOP, chúng ta thường tổ chức các class thành hệ thống phân cấp *để tránh trùng lặp và giảm thiểu sự dư thừa*. Các class có thứ bậc thấp hơn kế thừa tất cả các biến (các thuộc tính tĩnh - static attributes) và các phương thức (các hành vi động - dynamic behaviors) từ các class có thứ bậc cao hơn. Class có thứ bậc thấp hơn gọi là *subclass (class con)* (hay *derived, child, extended class*). Class có thứ bậc cao hơn gọi là *superclass (class cha)* (hay *base, parent class*). Bằng cách đặt tất cả các biến và phương thức chung nhất vào các superclass (class cha), và đặt các biến và phương thức riêng biệt vào các subclass (class con), sự *dư thừa* có thể giảm thiểu đáng kể hoặc được loại bỏ hoàn toàn vì các biến và phương thức chung nhất không cần khai báo lại trong tất cả các class con nữa. Ví dụ:

![](http://www.ntu.edu.sg/home/ehchua/programming/java/images/OOP_InheritanceExamples.png)

Một subclass kế thừa tất cả các biến và phương thức từ các superclass của nó, bao gồm cha trực tiếp và tất cả các class tổ tiên. Cần lưu ý một subclass không phải là một "subset (tập con)" của một superclass. Ngược lại, subclass là một "superset" của một superclass. Vì một subclass kế thừa tất cả các biến và phương thức của superclass, ngoài ra nó còn mở rộng superclass bằng cách thêm các biến và phương thức của riêng mình.

Trong Java, bạn định nghĩa một subclass sử dụng từ khóa "extends" ví dụ:

```Java
class Goalkeeper extends SoccerPlayer {......}
class MyApplet extends java.applet.Applet {.....}
class Cylinder extends Circle {......}
```

![](http://www.ntu.edu.sg/home/ehchua/programming/java/images/OOP_UMLSuperSubClass.png)

**Biểu diễn bằng UML:** trong UML kế thừa được biểu thị bằng một mũi tên từ subclass tới superclass. Theo quy ước, superclass được vẽ phía trên của các subclass của nó.

## 2.1 Inheritance Ví dụ 1: class <code>Circle</code> và <code>Cylinder</code>
![](http://www.ntu.edu.sg/home/ehchua/programming/java/images/OOP_CircleCylinder.png)

Trong ví dụ này chúng ta tạo ra một subclass gọi là <code>Cylinder</code> từ superclass <code>Circle</code>, đã tạo trong [phần 1](/posts/tech/oop-composition-vs-inheritance/). Điều quan trọng cần lưu ý là chúng ta tái sử dụng class <code>Circle</code>. Tính tái sử dụng là một trong những thuộc tính quan trọng nhất của OOP. (Tại sao cần phát minh lại bánh xe? - Why reinvent the wheels?). Class <code>Cylinder</code> kế thừa tất cả các biến (radius và color) và các phương thức (getRadius(), getArea(),...) từ superclass <code>Circle</code>. Nó cũng định nghĩa thêm một biến height, 2 phương thức public - getHeight() và getVolume() và hàm khởi tạo của riêng mình.

**Circle.java**

```java
public class Circle {
   // private instance variables
   private double radius;
   private String color;

   // Constructors
   public Circle() {
      this.radius = 1.0;
      this.color = "red";
   }
   public Circle(double radius) {
      this.radius = radius;
      this.color = "red";
   }
   public Circle(double radius, String color) {
      this.radius = radius;
      this.color = color;
   }

   // Getters and Setters
   public double getRadius() {
      return this.radius;
   }
   public String getColor() {
      return this.color;
   }
   public void setRadius(double radius) {
      this.radius = radius;
   }
   public void setColor(String color) {
      this.color = color;
   }

   // Describle itself
   public String toString() {
      return "Circle[radius=" + radius + ",color=" + color + "]";
   }

   // Return the area of this Circle
   public double getArea() {
      return radius * radius * Math.PI;
   }
}
```

**Cylinder.java**

```java
/*
 * A Cylinder is a Circle plus a height.
 */
public class Cylinder extends Circle {
   // private instance variable
   private double height;
   
   // Constructors
   public Cylinder() {
      super();  // invoke superclass' constructor Circle()
      this.height = 1.0;
   }
   public Cylinder(double height) {
      super();  // invoke superclass' constructor Circle()
      this.height = height;
   }
   public Cylinder(double height, double radius) {
      super(radius);  // invoke superclass' constructor Circle(radius)
      this.height = height;
   }
   public Cylinder(double height, double radius, String color) {
      super(radius, color);  // invoke superclass' constructor Circle(radius, color)
      this.height = height;
   }
   
   // Getter and Setter
   public double getHeight() {
      return this.height;
   }
   public void setHeight(double height) {
      this.height = height;
   }

   // Return the volume of this Cylinder
   public double getVolume() {
      return getArea()*height;   // Use Circle's getArea()
   }

   // Describle itself
   public String toString() {
      return "This is a Cylinder";  // to be refined later
   }
}
```

**Test Drive cho class <code>Cylinder</code> (TestCylinder.java)**

```java
/*
 * A test driver for the Cylinder class.
 */
public class TestCylinder {
   public static void main(String[] args) {
      Cylinder cy1 = new Cylinder();
      System.out.println("Radius is " + cy1.getRadius()
         + " Height is " + cy1.getHeight()
         + " Color is " + cy1.getColor()
         + " Base area is " + cy1.getArea()
         + " Volume is " + cy1.getVolume());
   
      Cylinder cy2 = new Cylinder(5.0, 2.0);
      System.out.println("Radius is " + cy2.getRadius()
         + " Height is " + cy2.getHeight()
         + " Color is " + cy2.getColor()
         + " Base area is " + cy2.getArea()
         + " Volume is " + cy2.getVolume());
   }
}
```

Đặt <code>Cylinder.java</code> và <code>TestCylinder.java</code> trong cùng thư mục với <code>Circle.java</code> (vì chúng ta tái sử dụng class <code>Circle</code>). Biên dịch và chạy chương trình. Kết quả mong muốn sẽ như sau:

```bash
Radius is 1.0 Height is 1.0 Color is red Base area is 3.141592653589793 Volume is 3.141592653589793
Radius is 5.0 Height is 2.0 Color is red Base area is 78.53981633974483 Volume is 157.07963267948966
```

### 2.2 Method overriding & Variable hiding
Một subclass kế thừa tất cả các biến và phương thức từ các superclass của nó (cha trực tiếp và tất cả các tổ tiên). Nó có thể sử dụng các phương thức và biến như vốn có. Hoặc có thể ghi đè các phương thức (method overriding) bằng cách tạo ra phiên bản của riêng mình, hay che dấu một biến (variable hiding) được kế thừa bằng cách định nghĩa một biến với tên tương tự.

Ví dụ, phương thức được kế thừa getArea() trong <code>Cylinder</code> tính toán diện tích của cylinder (hình trụ). Giả sử chúng ta quyết định ghi đè getArea() để tính toán diện tích của hình trụ trong subclass <code>Cylinder</code>. Dưới đây là các thay đổi:

```java
public class Cylinder extends Circle {
   ......
   // Override the getArea() method inherited from superclass Circle
   @Override
   public double getArea() {
      return 2*Math.PI*getRadius()*height + 2*super.getArea();
   }
   // Need to change the getVolume() as well
   public double getVolume() {
      return super.getArea()*height;   // use superclass' getArea()
   }
   // Override the inherited toString()
   @Override
   public String toString() {
      return "Cylinder[" + super.toString() + ",height=" + height + "]";   
   }
}
```

Nếu getArea() được gọi từ <code>Circle</code> nó tính toán diện tích của circle (hình tròn). Nếu được gọi từ <code>Cylinder</code>, nó tính toán diện tích của cylinder (hình trụ) sử dụng phiên bản đã được ghi đè. Chú ý bạn phải sử dụng phương thức public getRadius() để lấy radius của <code>Circle</code>, vì radius được khai báo private và vì thế không thể truy cập từ các class khác, bao gồm subclass <code>Cylinder</code>.

Nhưng nếu bạn ghi đè getArea() trong <code>Cylinder</code>, getVolume() (=getArea()*height) không còn đúng nữa, vì phương thức đã ghi đè getArea() sẽ được sử dụng trong <code>Cylinder</code>. Bạn có thể xử lý vấn đề này bằng cách sử dụng super.getArea() để sử dụng phiên bản getArea() của superclass. Lưu ý, super.getArea() chỉ có thể sử dụng trong định nghĩa subclass, và không thể sử dụng từ một instance ví dụ c1.super.getArea(), nó sẽ phá vỡ quy tắc che dấu và đóng gói thông tin.

### 2.3 Annotation @Override (JDK 1.5)
"@override" được biết như *annotation* (được giới thiệu trong JDK 1.5), nó yêu cầu trình biên dịch kiểm trả xem liệu có một phương thức trong superclass được ghi đè hay không. Điều này rất hữu ích nếu bạn viết sai tên của phương thức được ghi đè. Ví dụ, giả sử bạn muốn ghi đè phương thức toString() trong một subclass. Nếu @Override không được sử dụng và toString() viết sai thành TOString(), nó sẽ được coi là một phương thức mới trong subclass, thay vì ghi đè. Nếu @Override được sử dụng, trình biên dịch sẽ báo hiệu lỗi.

@Override annotation không bắt buộc, nhưng thường phải có.

Các annotation không phải là các cấu trúc lập trình. Chúng không ảnh hưởng đến kết quả của chương trình. Chúng chỉ được sử dụng bởi trình biên dịch, bị loại bỏ sau khi biên dịch và không được sử dụng trong thời gian chạy.

### 2.4 Từ khóa "super"
Bên trong định nghĩa class, bạn có thể sử dụng từ khóa <code>this</code> để tham chiếu tới chính *instance* này. Tương tự, từ khóa <code>super</code> tham chiếu tới superclass, có thể là cha trực tiếp hoặc tổ tiên của nó.

Từ khóa <code>super</code> cho phép subclass truy cập các phương thức và biến trong định nghĩa subclass. Ví dụ, <code>super()</code> và <code>super(argumentList)</code> có thể được sử dụng để gọi hàm khởi tạo của superclass. Nếu subclass ghi đè một phương thức được kế thừa từ superclass của nó, chẳng hạn getArea(), bạn có thể sử dụng super.getArea() để gọi phiên bản của superclass bên trong định nghĩa subclass. Tương tự, nếu subclass của bạn che dấu một biến của superclass, bạn có thể sử dụng <code>super.variableName</code> để gọi tới biến đã được che dấu trong định nghĩa subclass.

### 2.5 Hàm khởi tạo
Subclass kế thừa tất cả các biến và phương thức từ các superclass của nó. Tuy nhiên, subclass không kế thừa hàm khởi tạo của các superclass. Mỗi class trong Java định nghĩa hàm khởi tạo của riêng nó.

Trong thân của một hàm khởi tạo, bạn có thể sử dụng <code>super(args)</code> để gọi một hàm khởi của superclass trực tiếp của nó. Nếu nó không được sử dụng trong hàm khởi tạo, trình biên dịch của Java tự động chèn một câu lệnh <code>super()</code> để gọi hàm khởi tạo của superclass trực tiếp của nó. Điều này xuất phát từ thực tế là cha mẹ phải có trước khi con cái có thể được sinh ra. Bạn cần khởi tạo các superclass trước khi có thể khởi tạo subclass.

### 2.6 Hàm khởi tạo không tham số
Nếu không có hàm khởi tạo được định nghĩa trong một class, trình biên dịch Java tự động tạo một *hàm khỏi tạo không có tham số (no-arg constructor)* như bên dưới:

```java
// If no constructor is defined in a class, compiler inserts this no-arg constructor 
public ClassName () {  
   super();   // call the superclass' no-arg constructor
}
```

Cần lưu ý:

- Hàm khởi tạo không tham số sẽ không tự động được chèn vào class, nếu một (hoặc nhiều) hàm khởi tạo đã được định nghĩa. Nói cách khác bạn cần định nghĩa hàm không tham số nếu các hàm khởi tạo khác đã được định nghĩa.
- Nếu superclass trực tiếp không có một hàm khởi tạo mặc định (định nghĩa một vài hàm khởi tạo nhưng không định nghĩa một hàm khởi tạo không tham số), trình biên dịch sẽ báo lỗi khi <code>super()</code> được gọi. Chú ý rằng trình biên dịch của Java tự động chèn <code>super()</code> như câu lệnh đầu tiên trong một hàm khởi tạo nếu chưa có <code>super(args)</code> được khai báo.

### 2.7 Đơn kế thừa
Java không hỗ trợ đa kế thừa (multiple inheritance) (như C++). Đa kế thừa cho phép một subclass có thể có nhiều hơn một superclass trực tiếp. Điều này có một nhược điểm nghiêm trọng nếu các superclass có các phiên bản khác nhau của cùng một phương thức. Trong Java, mỗi subclass có một và chỉ một superclass trực tiếp còn gọi là đơn kế thừa (single inheritance). Ngược lại, một superclass có thể có nhiều subclass.

### 2.8 java.lang.Object
Java sử dụng các tiếp cận *common-root*. Tất cả các class trong Java đều có nguồn gốc từ một *lớp gốc chung (common root class)* gọi là <code>java.lang.Object</code>. Class <code>Object</code> được định nghĩa và triển khai các *hành vi chung (common behaviors)*, cái bắt buộc với tất các object của Java đang chạy trong JRE. Các *hành vi chung* này cho phép triển khai các tính năng chẳng hạn như đa luồng (multi-threading) và thu gom rác (garbage collector).

### 2.9 Inheritance Ví dụ 2: class <code>Point2D</code> và <code>Point3D</code>
![](http://www.ntu.edu.sg/home/ehchua/programming/java/images/OOP_PointPoint3D.png)

**Superclass <code>Point2D.java</code>**

```java
/*
 * The Point2D class models a 2D point at (x, y).
 */
public class Point2D {
   // Private instance variables
   private int x, y;

   // Constructors
   public Point2D() {  // default constructor
      this.x = 0;
      this.y = 0;
   }
   public Point2D(int x, int y) {
      this.x = x;
      this.y = y;
   }

   // Getters and Setters
   public int getX() {
      return this.x;
   }
   public void setX(int x) {
      this.x = x;
   }
   public int getY() {
      return this.y;
   }
   public void setY(int y) {
      this.y = y;
   }

   // Return "(x,y)"
   public String toString() {
      return "(" + this.x + "," + this.y + ")";
   }
}
```

**Subclass <code>Point3D.java</code>**

```java
/*
 * The Point3D class models a 3D point at (x, y,z),
 * which is a subclass of Point2D.
 */
public class Point3D extends Point2D {
   // Private instance variables
   private int z;

   // Constructors
   public Point3D() {  // default constructor
      super();     // x = y = 0
      this.z = 0;
   }
   public Point3D(int x, int y, int z) {
      super(x, y);
      this.z = z;
   }

   // Getters and Setters
   public int getZ() {
      return this.z;
   }
   public void setZ(int z) {
      this.z = z;
   }

   // Return "(x,y,z)"
   @Override
   public String toString() {
      return "(" + super.getX() + "," + super.getY() + "," + this.z + ")";
   }
}
```

**Test Driver cho các class <code>Point2D</code> và <code>Point3D</code>**

```java
/*
 * A test driver for the Point2D and Point3D classes
 */
public class TestPoint2DPoint3D {
   public static void main(String[] args) {
      /* Test Point2D */
      // Test constructors and toString()
      Point2D p2a = new Point2D(1, 2);
      System.out.println(p2a);  // toString()
      Point2D p2b = new Point2D();  // default constructor
      System.out.println(p2b);
      // Test Setters and Getters
      p2a.setX(3);  // Test setters
      p2a.setY(4);
      System.out.println(p2a);  // toString()
      System.out.println("x is: " + p2a.getX());
      System.out.println("x is: " + p2a.getY());

      /* Test Point3D */
      // Test constructors and toString()
      Point3D p3a = new Point3D(11, 12, 13);
      System.out.println(p3a);  // toString()
      Point2D p3b = new Point3D();  // default constructor
      System.out.println(p3b);
      // Test Setters and Getters
      p3a.setX(21);  // in superclass
      p3a.setY(22);  // in superclass
      p3a.setZ(23);  // in this class
      System.out.println(p3a);  // toString()
      System.out.println("x is: " + p3a.getX());  // in superclass
      System.out.println("y is: " + p3a.getY());  // in superclass
      System.out.println("z is: " + p3a.getZ());  // in this class
   }
}
```

### 2.10 Inheritance Ví dụ 3: superclass <code>Person</code> và các subclass của nó

![](http://www.ntu.edu.sg/home/ehchua/programming/java/images/OOP_PersonStudnetTeacher.png)

Giả sử chúng ta được yêu cầu mô hình hóa các sinh viên và giáo viên trong ứng dụng của mình. Chúng ta có thể định nghĩa một superclass gọi là <code>Person</code> để lưu trữ các thuộc tính chung chẳng hạn như tên (name) và địa chỉ (address), và các subclass <code>Student</code> và <code>Teacher</code> cho các thuộc tính của riêng chúng. Với student, cần có các môn học (courses) mà sinh viên đăng ký và điểm số (grade) tương ứng của môn học đó, thêm một môn học với điểm số, in tất cả các môn học và điểm số trung bình (average grade). Giả sử một sinh viên đăng ký không quá 30 môn hoặc cho toàn bộ chương trình. Với giáo viên, cần có các môn học và giáo viên này đang dạy, và có khả thăng thêm hoặc loại bỏ môn học đang dạy. Giả sử giáo viên dạy không quá 5 môn học đồng thời.

Chúng ta thiết kế các class như sau:

**Superclass <code>Person.java</code>**

```java
/* 
 * Superclass Person has name and address.
 */
public class Person {
   // private instance variables
   private String name, address;
   
   // Constructor
   public Person(String name, String address) {
      this.name = name;
      this.address = address;
   }
   
   // Getters and Setters
   public String getName() {
      return name;
   }
   public String getAddress() {
      return address;
   }
   public void setAddress(String address) {
      this.address = address;
   }
   
   // Describle itself
   public String toString() {
      return name + "(" + address + ")";
   }
}
```

**Subclass <code>Student.java</code>**

```java
/*
 * The Student class, subclass of Person.
 */
public class Student extends Person {
   // private instance variables
   private int numCourses;   // number of courses taken so far
   private String[] courses; // course codes
   private int[] grades;     // grade for the corresponding course codes
   private static final int MAX_COURSES = 30; // maximum number of courses
   
   // Constructor
   public Student(String name, String address) {
      super(name, address);
      numCourses = 0;
      courses = new String[MAX_COURSES];
      grades = new int[MAX_COURSES];
   }
   
   // Describe itself
   @Override
   public String toString() {
      return "Student: " + super.toString();
   }
   
   // Add a course and its grade - No validation in this method 
   public void addCourseGrade(String course, int grade) {
      courses[numCourses] = course;
      grades[numCourses] = grade;
      ++numCourses;
   }
   
   // Print all courses taken and their grade
   public void printGrades() {
      System.out.print(this);
      for (int i = 0; i < numCourses; ++i) {
         System.out.print(" " + courses[i] + ":" + grades[i]);
      }
      System.out.println();
   }
   
   // Compute the average grade
   public double getAverageGrade() {
      int sum = 0;
      for (int i = 0; i < numCourses; i++ ) {
         sum += grades[i];
      }
      return (double)sum/numCourses;
   }
}
```

**Subclass <code>Teacher.java</code>**

```java
/*
 * The Teacher class, subclass of Person.
 */
public class Teacher extends Person {
   // private instance variables
   private int numCourses;   // number of courses taught currently
   private String[] courses; // course codes
   private static final int MAX_COURSES = 5; // maximum courses
   
   // Constructor
   public Teacher(String name, String address) {
      super(name, address);
      numCourses = 0;
      courses = new String[MAX_COURSES];
   }
   
   // Describe itself
   @Override
   public String toString() {
      return "Teacher: " + super.toString();
   }
   
   // Return false if the course already existed
   public boolean addCourse(String course) {
      // Check if the course already in the course list
      for (int i = 0; i < numCourses; i++) {
         if (courses[i].equals(course)) return false;
      }
      courses[numCourses] = course;
      numCourses++;
      return true;
   }
   
   // Return false if the course cannot be found in the course list
   public boolean removeCourse(String course) {
      boolean found = false;
      // Look for the course index
      int courseIndex = -1;  // need to initialize
      for (int i = 0; i < numCourses; i++) {
         if (courses[i].equals(course)) {
            courseIndex = i;
            found = true;
            break;
         }
      }
      if (found) {
         // Remove the course and re-arrange for courses array
         for (int i = courseIndex; i < numCourses-1; i++) {
            courses[i] = courses[i+1];
         }
         numCourses--;
         return true;
      } else {
         return false;
      }
   }
}
```

**Test Driver (<code>TestPerson.java</code>)**

```java
/*
 * A test driver for Person and its subclasses.
 */
public class TestPerson {
   public static void main(String[] args) {
      /* Test Student class */
      Student s1 = new Student("Tan Ah Teck", "1 Happy Ave");
      s1.addCourseGrade("IM101", 97);
      s1.addCourseGrade("IM102", 68);
      s1.printGrades();
      System.out.println("Average is " + s1.getAverageGrade());
      
      /* Test Teacher class */
      Teacher t1 = new Teacher("Paul Tan", "8 sunset way");
      System.out.println(t1);
      String[] courses = {"IM101", "IM102", "IM101"};
      for (String course: courses) {
         if (t1.addCourse(course)) {
            System.out.println(course + " added.");
         } else {
            System.out.println(course + " cannot be added.");
         }
      }
      for (String course: courses) {
         if (t1.removeCourse(course)) {
            System.out.println(course + " removed.");
         } else {
            System.out.println(course + " cannot be removed.");
         }
      }
   }
}
```

Kết quả:

```bash
Tan Ah Teck(1 Happy Ave)
Tan Ah Teck
8 Sunrise Place
Student: Mohd Ali(8 Kg Java)
Mohd Ali
9 Kg Satu
Student: Mohd Ali(9 Kg Satu) IM101:97 IM102:68
Average is: 82.5
Teacher: Paul Tan(8 sunset way)
IM101 added.
IM102 added.
IM101 cannot be added.
IM101 removed.
IM102 removed.
IM101 cannot be removed.
```
