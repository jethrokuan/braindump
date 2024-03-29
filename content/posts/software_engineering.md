+++
title = "Software Engineering"
author = ["Derrick Chua", "Jethro Kuan"]
draft = false
+++

## Object-Oriented Programming {#object-oriented-programming}

-   Every object has both _state_ (data) and _behaviour_ (operations on
    data).
-   Every object has an _interface_ and an _implementation_.
    -   Interface are for other objects to interact with.
    -   Implementations support the interface, and may not be accessible
        to other objects.


### Basic UML Notation {#basic-uml-notation}

The class is denoted with 3 parts: The class name, its attributes, and
its methods.

{{< figure src="/ox-hugo/class_uml.png" >}}

Instances of a class are denoted with 3 parts: its name (and class),
and its attribute values.

{{< figure src="/ox-hugo/instance_uml.png" >}}

Class-level attributes and variables are denoted by <span class="underline">underlines</span>. In
the class diagram below, `totalStudents` and `getTotalStudents` are
class-level.\_

{{< figure src="/ox-hugo/class_level_uml.png" >}}

UML Notation for enumerations:

{{< figure src="/ox-hugo/enumeration_uml.png" >}}


### Associations {#associations}

-   A solid line indicates an association between 2 objects.
-   The concept of _Navigability_ refers to whether the association
    knows about the other class. Arrow heads are used to indicate the
    navigability of the association.

{{< figure src="/ox-hugo/navigability_uml.png" >}}

-   Multiplicity is denoted on each end of the association.

{{< figure src="/ox-hugo/multiplicity_uml.png" >}}

-   Dependencies are weaker associations where interactions between
    objects do not result in a long-term relationship. A dashed arrow
    is used to show dependencies.

{{< figure src="/ox-hugo/dependencies_uml.png" >}}

-   Composition represents a strong whole-part relationship. When the
    whole is destroyed, parts are destroyed too. There cannot be
    cyclical links in composition.

{{< figure src="/ox-hugo/composition_uml.png" >}}

-   Aggregation represents a container-contained relationship.

{{< figure src="/ox-hugo/aggregation_uml.png" >}}

-   An association class represents additional information about an
    association. It is a normal class but plays a special role from a
    design point of view.

{{< figure src="/ox-hugo/association_class_uml.png" >}}


### Inheritance {#inheritance}

Inheritance allows you to define a new class based on an existing
class. This helps group common parts among classes. This is denoted by
an arrow.

{{< figure src="/ox-hugo/inheritance_uml.png" >}}


### Interfaces {#interfaces}

An _interface_ is a behaviour specification. If a class implements the
interface, it is able to support the behaviours specified by the
interface. A class implementing an interface results in an is-a
relationship. In the example below, `AcademicStaff` is a
`SalariedStaff`.

{{< figure src="/ox-hugo/interface_uml.png" >}}

An abstract method is the method interface without the implementation.
It is denoted with the `{abstract}` annotation in the UML diagram.

{{< figure src="/ox-hugo/abstract_uml.png" >}}


### Polymorphism {#polymorphism}

_Polymorphism_ is the ability of different objects to respond, each
it its own way, to identical messages. The mechanisms that enable
polymorphism are:

Substitutability
: write code that expects parent class, yet use
    that code with objects of child classes.

Overriding
: Operations in the super class need to be overridden in
    each of the subclasses.

Dynamic binding
: Calls to overridden methods are bound to the
    implementation of the actual object's class dynamically during
    runtime.


## Modelling Behaviour {#modelling-behaviour}


### Activity Diagrams {#activity-diagrams}

Actions
: Rectangles with rounded edges (Steps)

Control flows
: Lines with arrowheads (Flow of control from one
    action to another)

Alternate paths
: Diamond shapes
    -   Branch or merge nodes
    -   Each control flow leaving branch node has guard condition
    -   Only 1 alernative path can be taken at any time.

Parallel paths
: bar
    -   Forks and join
    -   Indicate start and end of concurrent flows of control

Part of Activity
: rakes
    -   Indicate that part of activity is given as separate diagram
    -   In actions

Actor partitions
: swimlanes
    -   Partition activity diagram to show who is doing which action (Who
        label at the top, as columns)

{{< figure src="/ox-hugo/activity_branch_uml.png" >}}

{{< figure src="/ox-hugo/activity_fork_join_uml.png" >}}


### Sequence Diagrams {#sequence-diagrams}

Method calls
: Solid arrows

Method returns
: Dotted arrows (optional)

Loops
: labeled boxes

Activation bar (optional)
    -   Method is running and in charge of execution
    -   Constructor is active
    -   Dotted lines after activation bar shows a lifeline, i.e. it is
        still alive

Deletion
: Use a X at end of lifeline of an object

Self Invocation
: Draw a second bar within the activation bar for
    inner method and an arrow to show self invocation

Alternative paths
: `Alt` frames (boxes) with dotted horizontal
    lines to separate alternative paths

Optional paths
: `Opt` frames

Reference frames
: frames
    -   `ref` frame to omit details/ Show frame in another sequence
        diagram
    -   `sd` frame to show details

Parallel paths
: For multi-threading, as multiple things are being
    done at the same time

Note:

-   No underlined object names (e.g. :Object)

{{< figure src="/ox-hugo/sequence_uml.png" >}}


## Software Requirements {#software-requirements}

Requirements come from _stakeholders_: parties that are directly
affected by the software project.

functional requirements
: specify what the system should do
    -   data requirements: availability etc.

non-functional requirements
: specify the constraints under which
    system is developed
    -   business and domain rules: the size of the group cannot be more
        than 5
    -   constraints: should be backwards compatible
    -   technical requirements: should work on 32/64-bit environments

Good requirements are: unambiguous, testable, clear, correct,
understandable, feasible, independent, atomic, necessary,
implementation-free

User stories follow the format: `As a _, I can _ so that _`. They
occur on different levels, high-level stories are called epics.


## Design {#design}

Software design has 2 main aspects:

1.  product/external design: designing the external behaviour of the
    product to meet the user requirements.
2.  implementation/internal design: designing how the product will be
    implemented to meet the required external behaviour.

3.  technique for dealing with complexity, establishes a
    level of complexity we are interested in, and
    suppressing more complex details below that level.


### Coupling {#coupling}

Coupling is the **measure of the degree of dependence** between
components. Highly coupled components are:

-   **harder to maintain**: change in one module can cause changes to other modules
-   **harder to integrate**: multiple components have to be integrated at
    the same time
-   **harder to test**: dependence on other modules

Coupling comes in various forms:

Content Coupling
: one module modifies or relies on the internal
    workings of another module.

Common/Global Coupling
: two modules share the same global data

Control Coupling
: one module controls the flow of the other

Data Coupling
: one module sharing data with another module (e.g.
    passing params)

External Coupling
: two modules share an externally imposed convention

Subclass Coupling
: a class inherits from another class

Temporal Coupling
: two actions are bundled together because they
    happen to occur at the same time


### Cohesion {#cohesion}

Cohesion is a **measure of how strongly-related and focused the
various responsibilities of a component are**. Low cohesion can:

-   impede the understandability of modules
-   lower maintainability because  a module can be modified due to
    unrelated causes
-   lowers reusability because they do not represent logical units of
    functionality

Cohesion can be present in many forms:

-   Code related to the same concept are kept together
-   Code invoked close together in time are kept together
-   Code manipulating the same data structure are kept together


## Software Architecture {#software-architecture}

Software architecture shows the **overall organization of the system
and can be viewed as a very high-level design**.


### Architectural Styles {#architectural-styles}

1.  n-tier
    -   n layer
    -   Higher layer communicates to lower tier
    -   Must be independent

2.  Client-server
    -   At least one client component and one server component
    -   Commonly used in distributed apps

3.  Event-driven Style
    -   Detect events from emitters and communicating to event consumers

4.  Transaction processing style
    -   Divides workload down to a number of transactions which are given
        to a dispatcher which controls the execution for each transaction

5.  Service-oriented architecture (SOA)
    -   Combining functionalities packaged by programmatically accessible
        services
    -   e.g. Creating an SOA app that uses Amazon web services

6.  Pipes and Filters pattern
    -   Break down processing tasks by modules (streams) into separate
        components(filters), each into 1 task
    -   Combine them into a pipeline by standardising format of data each
        component sends and receives
    -   Bottleneck - Slowest filter
    -   Components can be run independently
    -   Used when processing steps by an application have different
        scalability requirements

7.  Broker pattern
    -   Broker component coordinates communication, such as forwarding
        requests, as well as for transmitting results and exceptions
    -   Used to structure distributed software systems with decoupled
        components interacting by remote service invocations

8.  Peer-to-peer
    -   Partitions workload between peers (both 'client' and 'server' to
        other nodes)

9.  Message-driven processing
    -   Client sends service requests in specially-formatted messages to
        request brokers(programs)
    -   Request brokers maintain queues of requests (and maybe replies) to
        screen their details


## Software Design Patterns {#software-design-patterns}

Software Design Patterns are **elegant reusable solutions to commonly
recurring problems within a given context in software design**.

Design patterns are specified with: context, problem, solution,
anti-patterns, consequences and other useful information.


### Singleton {#singleton}

-   **Context**: certain classes should have no more than 1 instance.
-   **Problem**: a normal class can be instantiated multiple times by
    invoking the constructor
-   **Solution**: make the constructor of the singleton class `private`,
    provide a public class-level method to access the single instance.
-   Pros:
    -   Easy to apply
    -   Effective with minimal work
    -   Access singleton from anywhere
-   Cons:
    -   Global variable, increases coupling
    -   Hard to test as they cannot be replaced with stubs
    -   Singletons carry data from one test to another


### Abstraction Occurrence {#abstraction-occurrence}

-   **Context**: Group of similar entities that appear to be occurrences
    of the same thing, sharing a lot of common information, but differ
    in many ways.
-   **Problem**: representing objects as a single class would result in
    duplication of data, leading to inconsistencies in data.
-   **Solution**: Let a copy of the entity be represented by multiple
    objects, separating the common and unique information into 2
    classes.


### Facade Pattern {#facade-pattern}

-   **Context**: Components need access to functionality deep inside other
    components
-   **Problem**: Access to component should be allowed without exposing
    internal details
-   **Solution**: Create a Facade class that sits between the component
    internals and users of the component that access the component
    happens through the facade class.

{{< figure src="/ox-hugo/facade.png" >}}


### Command Pattern {#command-pattern}

-   **Context**: A system is required to execute a number of commands,s
    each doing a different task.
-   **Problem**: Prefer to have code executing command to not have to know
    each command type
-   **Solution**: Have  a general `Command` object that can be passed
    around, stored and executed without knowing the type of command.


### MVC Pattern {#mvc-pattern}

-   **Context**: applications support storage/retrieval of information,
    display, and updating stored information
-   **Problem**: want to reduce coupling between interlinked nature of the
    above features
-   **Solution**: _View_ displays data, interacts with the user.
    _Controller_ detects UI events, and updates the model/view when
    necessary. _Model_ stores and maintains the data, updates the views
    if necessary.


### Observer Pattern {#observer-pattern}

-   **Context**: An object is interested in getting notified when a change
    happens to another object
-   **Problem**: the observed object does not want to be coupled to
    objects that are 'observing' it
-   **Solution**: Force the communication through an interface know to
    both parties.

{{< figure src="/ox-hugo/observer.png" >}}


## Implementation {#implementation}

Debugging
: process of discovering defects in the program.
    -   inserting temporary print statements incur extra effort, manually
        tracing through code is difficult and time consuming. We should
        use a debugger tool, which allows pausing and stepping through
        execution of the code.


### Code Quality {#code-quality}

There are various dimensions of code quality, including **run-time
efficiency, security, and robustness**. The most important perhaps is
**readability**.

Some basic guidelines:

1.  Avoid long methods
2.  Avoid deep nesting
3.  Avoid complicated expressions
4.  Avoid Magic numbers
5.  Make the code obvious, e.g. by using explicity type conversion
6.  Structure code logically
7.  Do not trip up the reader, with things like unused parameters in
    the method signature
8.  Practice KISSing
9.  Avoid premature optimizations
10. Make the happy path prominent
11. SLAP (Single level of abstraction per method) hard
12. Make the happy path prominent

It is also good to follow a **coding standard**.

Comments should explain the what and why, and not the how. Write
comments minimally but sufficiently, not repeating the obvious and
writing with the reader in mind.


### Refactoring {#refactoring}

Refactoring **improves a program's internal structure in small steps without
modifying its external behaviour.** It is not rewriting, and not bug-fixing.

Common refactors include:

-   Consolidate duplicate conditional fragments
-   extract method


### Error Handling {#error-handling}

Exceptions are events that occur during the execution of a program,
that **disrupt the normal flow of the program's instructions**.

Exception objects encapsulate the unusual situation so that another
piece of code can catch it and deal with it. Exception objects
propagate up the  method call hierarchy until it is dealt with.


### Assertions {#assertions}

Assertions are used to define assumptions about the program state so
that the runtime can verify them. If the runtime detects an assertion
failure, it typically takes some drastic action, such as terminating
the program. Assertions can be disabled without modifying the code.


### Logging {#logging}

Logging is **The deliberate recording of certain information during
   program execution for future reference**, and is useful for
   troubleshooting problems. Most languages come with a logging
   mechanism, and the logger has different levels: SEVERE,
   INFO, WARNING etc.


#### Build automation {#build-automation}

1.  Gradle
    -   Automates tasks such as:
        -   Running tests
        -   Manage library dependencies
        -   Analyse code for style compliance

    -   Gradle configuration is defined in build script build.gradle
    -   Gradle commands are run in gradlew (wrapper) which runs the
        following commands by default:
        -   clean
        -   headless
        -   allTests
        -   coverage

    -   Dependencies are updated automatically by other relevant Gradle
        tasks


#### Continuous Integration (CI) {#continuous-integration-ci}

1.  Integration, building and testing happens automatically after code
    change
2.  Travis CI
3.  Continuous Deployment (CD) - Changes are integreated, and deployed to
    end-users at the same time (e.g. Travis)


### Defensive Programming {#defensive-programming}

-   Leave no room for things to go wrong

-   Enforce compulsory associations(perform checks for null)
-   Enforce 1-to-1 associations (Initialise an association as a new
    object first, before assignment)
-   Enforce referential integrity (Inconsistency in object references)
    (invoke the peer method when one is called)


### Design-by-Contract {#design-by-contract}

DbC is an \*approach for designing software that requires defining
  formal, precise and verifiable interface specifications for software
  components\*.

-   Meet interface specifications for different components
    (preconditions must be met) to fulfil contract


### Integration Approaches {#integration-approaches}

1.  Late and one-time
    -   Wait till all components are completed and integrate all finished
        components near end of project
    -   Not recommended due to possible component incompatabilities, which
        can lead to delivery delays
2.  Early and frequent
    -   Integrate early and evolve each part in parallel, in small steps,
        re-integrating frequently
3.  Big-Bang vs Incremental Integration
    -   Big-bang can lead to many problems at the same time
4.  Top-Down vs Bottom-Up
    -   Top-Down require stubs
    -   Bottom-up require drivers
    -   Sandwich for both to 'meet' in the middle


### Reuse {#reuse}

By reusing tried and tested components, the robustness of a new
software system can be enhanced while reducing the manpower and time
requirement. There are costs associated with reuse.


### APIs {#apis}

An Application  Programming Interface (API) specifies the interface
through which other programs can interact with a software component.


### Libraries and Frameworks {#libraries-and-frameworks}

A library is a collection of modular code that is general and can be
used by other programs. A software framework is a reusable
implementation of a software providing generic functionality that can
be selectively customized to produce a specific application. Libraries
are meant to be used 'as is' while frameworks are meant to be
customized/extended. Your code calls the library code while the
framework code calls your code.


### Platforms {#platforms}

A platform provides a runtime environment for applications. A
platform is often bundled with libraries, tools and frameworks.


## Quality Assurance {#quality-assurance}

QA ensures that the software being built has the required levels of
quality. This is achieved through:

code reviews
: the systematic examination of code with the
    intention of finding where the code can be improved

static analysis
: analysis of the code without actually executing
    the code (e.g. Linters)

formal verification
: mathematical techniques, used to prove the
    correctness of a program. it can only be used to prove the
    absence of errors, but only proves compliance with the
    specification, and not the actual utility of the software.


### Testing {#testing}

When testing, we execute a set of test cases, containing the **input**
and the **expected behaviour**. Test cases can be determined based on
the specification.


#### Unit Testing {#unit-testing}

-   testing individual units to ensure each piece works correctly. In
    OOP, this includes writing one or more unit tests for each public
    method of a class.
-   A proper unit test requires the unit to be testing in isolation,
    hence stubs are created for the dependencies.
-   **Dependency injection** is the process of replacing current
    dependencies with another object, commonly seen with stubs.
    Polymorphism can be used to implement this.


#### Integration Testing {#integration-testing}

-   testing whether different parts of the software work together as
    expected. It aims to discover bugs in the "glue code" related to how
    components interact with each other.


#### System Testing {#system-testing}

-   Takes the whole system and tests it against the system specification
-   System test cases are based on the specified external behaviour of
    the system
-   System testing includes testing against non-functional requirements


#### Others {#others}

-   alpha testing is performed by the users, under controlled conditions
    set by the software development team
-   beta testing is performed by a selected subset of users of the
    system in their natural work setting
-   dogfooding is the creators of the product using their own product
-   developer testing is done by the developers themselves, so as to
    locate the cause of test case failure or fixing bugs
-   regression testing is the retesting the SUT to detect regressions when a system is modified.


#### Exploratory vs Scripted Testing {#exploratory-vs-scripted-testing}

-   Exploratory testing devises test cases on-the-fly, creating new test
    cases based on the results of past test cases
    -   dependent on the tester's prior experience and intuition
-   Scripted testing is a set of test cases based on the expected
    behaviour of the SUT
    -   more systematic, and hence likely to discover more bugs given
        sufficient time


#### Acceptance Testing {#acceptance-testing}

-   test the delivered system to ensure it meets the user requirements

| System Testing                        | Acceptance Testing                                 |
|---------------------------------------|----------------------------------------------------|
| done against the system specification | Done against the requirements specification        |
| done by testers on the project team   | done by a team that represents the customer        |
| done on the development environment   | done on the deployment site, or a close simulation |
| both negative and positive test cases | focus on positive test cases                       |


#### Coverage {#coverage}

Coverage is the metric used to measure the extent to which  testing
exercises the code.

function/method coverage
: based on the functions executed

statement coverage
: based on the number of lines of code executed

decision/branch coverage
: based on the decision points exercised

condition coverage
: based on the boolean sub-expressions

path coverage
: in terms of possible paths through a given part of
    the code executed

entry/exit coverage
: in terms of possible calls to and exits from
    the operations in the SUT


#### Test Case Design {#test-case-design}

black-box
: designed exclusively based on the SUT's specified
    external behaviour

white-box
: test cases are designed based on what is known about
    the SUT's implementation

gray-box
: uses some important information about the
    implementation.

Equivalence partitions are **groups of test inputs that are likely to
be processed by the SUTs in the same way**. This can be determined by
identifying:

1.  target object of method call
2.  input parameters of method call
3.  other data objects accessed by the method, such as global
    variables.

Boundary Value analysis is a \*test case design heuristic that is
based on the observation that bugs often result from incorrect
handling of boundaries of equivalence partitions\*.

Other heuristics include:

-   each valid input at least once in a positive test case
-   no more than 1 invalid input in a test case


## Software Engineering Principles {#software-engineering-principles}


#### Law of Demeter {#law-of-demeter}

1.  An object should have limited knowledge of another object
2.  An object should have limited interaction with closely related
    classes, if foo is coupled to bar, which is coupled to goo, foo
    should not be coupled to goo
3.  Reduces coupling


#### SOLID {#solid}

Single Responsibility Principle
: every module or class should
    have responsibility over a single part of the functionality
    provided by the software, and that responsibility should be
    entirely encapsulated by the class.

Open-Closed Principle
: software entities (classes, modules,
    functions, etc.) should be open for extension, but closed for
    modification"; that is, such an entity can allow its behaviour to
    be extended without modifying its source code.

Liskov Substitution Principle
: Functions that use pointers or
    references to base classes must be able to use objects of derived
    classes without knowing it.- Interface Segregation Principle ::  no client should be forced to
    depend on methods it does not use.

Dependency Inversion Principle
: high level modules should not
    depend on low level modules; both should depend on abstractions.
    Abstractions should not depend on details.


YAGNI
: a principle of extreme programming (XP) that states a
    programmer should not add functionality until deemed
    necessary.

DRY
: Don't repeat yourself, i.e. No duplicate implementations

Brook's Law
: Adding people to a late project makes it later


## Software Development Life Cycles {#software-development-life-cycles}

SDLC consists of different stages such as:

-   Requirements
-   Analysis
-   Design
-   Implementation
-   Testing


#### Sequential models {#sequential-models}

1.  Software development as linear process
2.  Useful for problems that are well-understood and stable
    -   Rarely applicable in real-world projects

3.  Each stage provides artifacts for use in next stage


#### Iterative models {#iterative-models}

1.  Several iterations
2.  Each iteration is a new version
    -   Each iteration is a complete product

3.  Either breadth-first (all major components in parallel) or
    depth-first (Flesh out some components at a time)
4.  Most projects use both, i.e. iterative and incremental process


#### Agile models {#agile-models}

-   Individuals and interactions over processes and tools
-   Working software over comprehensive documentation
-   Customer collaboration over contract negotiation
-   Responding to change over following a plan

-   Requirements based on needs of users, clarified regularly, factored
    into developmental schedule when appropriate
-   Rough project plan, high level design that evolves as the project
    goes on
-   Strong emphasis on transparency and responsibility sharing among
    members


### Popular SDLC process models {#popular-sdlc-process-models}


#### Scrum {#scrum}

-   Scrum master
-   Development team
-   Product Owner

-   Divided into Sprints (basic unit of development)
    -   Preceded by planning meeting
    -   Potentially deliverable product increment is done during Sprint
    -   Creates self-organising teams by encouraging co-location of team
        members
    -   Customers can change their minds about their wants and needs
    -   Sprint backlog
        -   To do
-   Daily scrums
    -   What did you do?
    -   What will you do?
    -   Are there any impediments?


#### Extreme Programming (XP) {#extreme-programming--xp}

1.  Stresses customer satisfaction
2.  Empowers developers to respond to changing customer requirements
3.  Emphasises teamwork
4.  Completes software project via:
    -   Communication
    -   Simplicity
    -   Feedback
    -   Respect
    -   Courage


#### Unified process {#unified-process}

-   Inception
    -   Understand problem and requirements
    -   Communicate
    -   Plan
-   Elaboration
    -   Refine and expands requirements
-   Construction
    -   Major implementation to support use cases
    -   Refine and flesh out design models
    -   Testing of all levels
    -   Multiple releases
-   Transition
    -   Ready system for actual production use
    -   Familiarise end users with the system


### CMMI (Capability Maturity Model Integration) {#cmmi--capability-maturity-model-integration}

-   Determine if process of an organisation is at a certain maturity level
-   Initial
    -   Processes unpredictable, poorly controlled and reactive
-   Managed
    -   Processes characterized for projects and reactive
-   Defined
    -   Processes characterized for organisations and proactive
-   Quantitatively Managed
    -   Processes measured and controllers
-   Optimized
    -   Focus on process improvement