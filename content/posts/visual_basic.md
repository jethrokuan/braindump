+++
title = "Visual Basic"
author = ["Jethro Kuan"]
slug = "visual_basic"
draft = false
+++

## Variables {#variables}

| Concept   | Explanation                      | Examples                                |
|-----------|----------------------------------|-----------------------------------------|
| Variables | Use Dim to declare variables     | `Dim Name As String = "lijin"`          |
|           |                                  | `Dim Year as Integer = 2020`            |
| Arrays    | Arrays have brackets beside them | `Dim Arr() As String = {"OCBC", "UOB"}` |


## Conditionals {#conditionals}

```visual-basic
If Val > 2020 Then
  Console.WriteLine("Value more than 2020")
Else
  Console.WriteLine("Value less than 2020")
End If
```

```visual-basic
Dim Apple as Integer = 5

Select Case Apple
  Case 1
    Console.WriteLine("I have 1 apple.")
  Case 2
    Console.WriteLine("I have 2 apples.")
  Case 5
    Console.WriteLine("I have 5 apples.")
  Case Else
    Console.WriteLine("Not sure how many apples.")
End Select
```


## Looping {#looping}

```visual-basic
Dim A as Integer = 1
While A < 10
  A += 1
End While
Console.WriteLine(A)
```

```visual-basic
For i = 1 to 10
  Console.WriteLine(i)
Next
```

```visual-basic
For Each item As String In groceryItems
  Console.WriteLine(item)
Next
```


## Methods, Subroutines and Classes {#methods-subroutines-and-classes}

Subroutines do not return values, while methods can. Classes can contain methods.

```visual-basic
Public Sub Fibonacci(ByVal n As Integer)
  ...
End Sub

Public Sub Add (ByVal a As Integer, ByVal b As Integer)
   ...
End Sub
```

```visual-basic
Public Function returnsOne() As Integer
   Return 1
End Function
```

```visual-basic
Public Class Calculator
   Public Function Add(ByVal a As Integer, ByVal b As Integer)
      Return a + b
   End Function
End Class

Dim calc As New Calculator()
calc.Add(1, 2)
```

For excel specific functions, see [here](https://www.automateexcel.com/blockedfolder/AutomateExcel-VBA-Cheatsheet.pdf).