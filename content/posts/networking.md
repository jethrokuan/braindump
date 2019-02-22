+++
title = "Computer Networking"
author = ["Jethro Kuan"]
lastmod = 2019-02-20T16:52:08+08:00
tags = ["networking"]
draft = false
math = true
+++

## Introduction {#introduction}


### What is the Internet? {#what-is-the-internet}

The internet is a computer network that interconnects hundreds of
millions of computing devices throughout the world.

End systems are connected together by a network of _communication links_
and _packet switches_. The common packet switches are routers and
link-layer switches. The sequence of communication links and packet
switches traversed by a packet from the sending end system to the
receiving end system is known as the route, or path through a network.

End systems access the internet through _Internet Service Providers
(ISPs)_. ISPs provide a variety of types of network access to the end
systems.

End systems, packet switches and other pieces of the Internet run
protocols that control the sending and receiving of information within
the internet. The Internet's principal protocols are the Transmission
Control Protocol (TCP) and the Internet Protocol (IP), known
collectively as TCP/IP.


### What is a protocol? {#what-is-a-protocol}

> A protocol defines the format and the order of messages exchanged
> between two or more communicating entities, as well as the actions
> taken on the transmission and/or receipt of a message or other event.


### The Network Edge {#the-network-edge}

The computers and other devices that are connected to the Internet are
often called end systems. This is because they sit at the edge of the
Internet. Each system are also referred to as hosts because they host
application programs such as the web browser, or a server. Hosts are
sometimes further divided into 2 categories: _clients_ and _servers_.

Access networks include the digital subscriber line (DSL), cable, and
fiber to the home (FTTH). Ethernet and WiFi access networks are now
common across enterprise, university campuses as well as in homes.
Wide-area wireless access such as 4G and LTE provide wireless access
to the Internet by sending and receiving packets through a base
station.


### Physical Mediums {#physical-mediums}

For reach transmitter-receiver pair, bits are interchanged. These bits
are sent by electromagnetic waves, or optical pulses across a physical
medium.

The least expensive and most commonly used transmission medium is the
twisted-pair copper wire. It consists of 2 insulated copper wires,
twisted togethter to reduce electrical interference from similar pairs
close by.

{{< figure src="/ox-hugo/UTP-Cable-Picture_2019-01-14_11-24-30.jpg" caption="Figure 1: A Unshielded-Twisted-Pair (UTP) cable" >}}

Coaxial cables consist of 2 copper conductors, but the two conductors
are concentric rather than parallel. These achieve high data
transmission rates, and can be used as a guided shared medium. They
are common in cable television systems.

{{< figure src="/ox-hugo/SW-33020-6_3_2019-01-14_11-25-43.jpg" caption="Figure 2: A Coaxial cable" >}}


### The Network Core {#the-network-core}


#### Packet Switching {#packet-switching}

In a network application, end systems exchange messages with each
other. Messages can contain anything the application designer wants.
To send a message from a source end system to a destination end
system, the source breaks long messages into smaller chunks of data
known as _packets_. Each packet travels through communication links and
packet switches. Packets are transmitted over each communication link
at a rate equal to the full transmission rate of the link. So if a
source end system or a packet switch is sending a packet of \\(L\\) bits
over a link with transmission rate \\(R\\) bits/sec, then the time to
transmit the packet is \\(\frac{L}{R}\\) seconds.

Most packet switches use _store-and-forward transmission_ at the inputs
to the links. This means that the packet switch must receive the
entire packet before it can begin to transmit the first bit of the
packet onto the outbound link.

Each packet switch has multiple links attached to it. For each
attached link, the packet switch has an _output buffer_, which stores
packets that the router is about to send into that link. If an
arriving packet needs to be transmitted onto a link but finds the link
busy with the transmission of another packet, the arriving packet must
wait in the output buffer. This results in output buffer _queuing
delays_. Packet loss will occur -- either the arriving packet or one of
the already-queued packets will be dropped.

How does a router determine which link it should forward the packet
onto? In the Internet, each end system is assigned an IP address. The
source end system includes the destination IP address in the packet's
header. Each router has a _forwarding table_ that maps destination
addresses to its outbound links.


#### Circuit Switching {#circuit-switching}

In circuit-switched networks, the resources needed along apath
(buffers, link transmission rate) to provide for communication between
end-systems are reserved for the duration of the communication session
between the end systems. Traditional telephone networks are examples
of such circuit-switched networks.

A circuit in a link is implemented with either _frequency-division
multiplexing (FDM)_ or _time-division multiplexing (TDM)_. With FDM, the
frequency spectrum of a link is divided up among the connections
established across the link. For a TDM link, time is divided into
frames of fixed duration, and each frame is divided into a fixed
number of time slots.

Packet switching is offers better sharing of transmission capacity
than circuit switching, and is simpler and more efficient. However,
circuit switching can be more suitable for real-time services.


### A Network of Networks {#a-network-of-networks}

A PoP is a group of one or more routers in the provider's network
where customer ISPs can connect into a provider ISP. For a customer
network to connect to a provider's PoP, it can lease a high-speed link
from a third-party telecommunications provider to directly connect one
of its routers to a router at the PoP. Any ISP may choose to
multi-home, that is, to connect to two or more provider ISPs.

{{< figure src="/ox-hugo/screenshot_2019-01-14_12-14-13.png" caption="Figure 3: Interconnection of ISPs" >}}


### Delays in Packet-Switched Networks {#delays-in-packet-switched-networks}

1.  Processing delay
    1.  Time needed to check bit-level errors in packet
2.  Queuing delay
    1.  Time spent waiting to be transmitted in the link
3.  Transmission delay
    1.  Equal to \\(L/R\\). Transmission delays are typically on the order
        of microseconds to milliseconds in practice.
4.  Propagation delay
    1.  The bit propagates at the propagation speed of the link,
        depending on the physical medium. This speed is roughly the
        speed of light.

Packet loss can occur when it arrives to find a full queue. The router
will drop the packet.

Given these delays, we can compute the end-to-end delay.

\begin{equation}
  d\_{\text{e2e}} = N(d\_{\text{proc}} + d\_{\text{trans}} + d\_{\text{prop}})
\end{equation}

This does not account for the average queuing delay of the node.


### Throughput {#throughput}

The instantaneous throughput at any instant of time is the rate (in
bits/sec) at which a host is receiving the file.


### Protocol Layers and Their Service Models {#protocol-layers-and-their-service-models}

The Internet Protocol stack consists of 5 layers: the physical link,
network, transport, and application layers. The OSI reference model
consists of 7 layers.

{{< figure src="/ox-hugo/screenshot_2019-01-14_12-23-06.png" caption="Figure 4: IP stack and ISO OSI reference model" >}}

Application layer
: network applications and application layer
    protocols reside here. These protocol include HTTP, SMUT and FTP.
    The packet of information at this layer is a **message**.

Transport Layer
: in the Internet there are 2 transport protocols:
    TCP and UDP, each with their own use-case. Each transport-layer
    packet is called a segment.

Network Layer
: responsible for moving packets known as **datagrams**
    from one host to another. It has many routing protocols.

Link Layer
: The network layer relies on this layer to deliver the
    datagram to the next node along the route. These
    services depend on the specific link-layer protocol
    employed for the link. For example, cable access
    networks may use the DOCSIS protocol. Link layer
    protocols include Ethernet and WiFi. Link-layer
    packets are referred to as **frames**.

Physical Layer
: responsible of moving individual bits across
    physical mediums.


## Application Layer {#application-layer}

Networking applications have application-layer protocols that define
the format and order of the messages exchanged between processes, as
well as define the actions taken on the transmission or receipt of a
message.

Example of application-layer protocols include:

1.  HTTP (HyperText Transfer Protocol [RFC 2616]), which defines how
    messages are passed between browser and web-server
2.  SMTP (Simple mail Transfer Protocol [RFC 821]), a protocol for mail
    exchange


### Client and Servers {#client-and-servers}

A network application protocol typically has 2 parts, a client side
and a server side. The host that initiates the session is often
labeled the client. A host can act as both a client and server at the
same time. As a concrete example, a mail server host runs the client
side of SMTP (for sending email), and the server side of SMTP (for
receiving email).


### Sockets {#sockets}

Applications communicate by sending messages over a socket. A
process's socket can be thought of as the process's door: it sends
messages into, and receives messages from the network through this
socket. It is the interface between the application layer and
transport layer within a host.

{{< figure src="/ox-hugo/screenshot_2019-01-25_10-53-43.png" caption="Figure 5: Application processes, sockets, and underlying transport protocol" >}}


### Addressing Processes {#addressing-processes}

In order for a process on one host to send a message to a process on
another host, the sending process must identify the receiving process.
To identify the receiving process, one must specify these 2 pieces of
information:

1.  The name or address of the host machine
2.  An identifier that specifies the identity of the receiving process
    on the destination host

In Internet applications, the destination host is specified by its IP
address. The **IP address** is a 32-bit quantity that uniquely identifies
the interface that connects to the internet. These need to be globally
unique. A receive-side **port number** serves the purpose of identifying
the correct process on the system.

The user agent is an interface between the user and the network
application. For example, user agents for browsing the Web include
Firefox and Chrome.


### Transmission Control Protocol (TCP) {#transmission-control-protocol--tcp}

The Internet makes available 2 transport protocols to applications,
namely UDP and TCP. When a developer creates a new application for the
Internet, they must choose between the two protocols. Each protocol
offers a different service model.

TCP includes a connection-oriented service and a reliable data
transfer service.

TCP has the client and server exchange transport-layer control
information with each other before the application-level messages
begin to flow. This hand-shaking procedure alerts the client and
server, and a TCP connection is said to exist between the sockets of
the 2 processes. When the application is done with sending messages,
it must tear down the connection.

The communicating processes can rely on TCP to deliver all data sent
without error, and in proper order. TCP also includes a
congestion-control mechanism. The mechanism throttles a process when
the network is congested, attempting to limit each TCP connection to
its fair share of network bandwidth. This control mechanism benefits
the Internet, rather than the direct benefit of the communicating
processes.

TCP does not provide:

1.  A guaranteed minimum transmission rate
2.  Any delay guarantees


### User Datagram Protocol (UDP) {#user-datagram-protocol--udp}

UDP is connectionless, so there is no handshaking before the 2
processes start to communicate. It provides an unreliable data
transfer service. Hence, it provides no guarantee that a message will
ever reach the receiving socket. Messages that do arrive may arrive
out-of-order.

On the other hand, UDP does not include a congestion-control
mechanism, so a sending process can pump data into a UDP socket at any
rate.

This protocol is largely used by real-time applications.


### HTTP {#http}

HTTP is implemented in 2 programs: a client program and a server
program. Clients and servers talk to each other by exchanging HTTP
messages. HTTP defines the structure of these messages.

HTTP use TCP as their underlying transport protocol. The HTTP client
first initiates a TCP connection with the server. Once the connection
is established, the browser and server processes access TCP through
their socket interfaces. The client sends HTTP request messages
through the socket interface, and receives HTTP response messages from
its socket interface.

HTTP can use both nonpersistent and persistent connections. The use of
persistent connections is the default mode for HTTP/1.1.

With non-persistent connections, each TCP connection is closed after
the server sends the object. T he response time for a new HTTP request
is 2 round-trip times plus the transmission time at the server of the
HTML file.

With persistent connections, the server leaves the TCP connection open
after sending a response. Subsequent requests and responses between
the same client and server can be sent over the same connection.

Here's an exmple of the HTTP Request message:

```text
GET /somedir/page.html HTTP/1.1
Host: www.someschool.edu
Connection: close
User-agent: Mozilla/4.0
Accept-language: fr
(extra carriage return, line feed)
```

The general form of a request message looks like this:

{{< figure src="/ox-hugo/screenshot_2019-01-25_11-21-44.png" caption="Figure 6: Format of a HTTP request message" >}}

The response message looks like this:

```text
HTTP/1.1 200 OK
Connection: close
Date: Thu, 06 Aug 1998 12:00:15 GMT
Server: Apache/1.3.0 (Unix)
Last-Modified: Mon, 22 Jun 1998 09:23:24 GMT
Content-Length: 6821
Content-Type: text/html

(data data ...)
```

{{< figure src="/ox-hugo/screenshot_2019-01-25_11-26-41.png" caption="Figure 7: Format of a HTTP response message" >}}


### User-server Interaction: Cookies {#user-server-interaction-cookies}

The HTTP server is stateless. This simplifies server design, and
permits engineers to develop high-performance web servers that can
handle thousands of simultaneous TCP connections. For a website to
identify users, HTTP uses cookies. Cookies, defined in [RFC 6265],
allows sites to keep track of users.

Cookie consists of 4 components:

1.  A cookie header line in the HTTP response message
2.  A cookie header line in the HTTP request message
3.  A cookie file kept on the user's end system, and is managed by the
    user's web browser
4.  A back-end database at the Web site

{{< figure src="/ox-hugo/screenshot_2019-01-25_11-29-28.png" caption="Figure 8: Keeping user state with cookies" >}}


### Web Caching {#web-caching}

A web cache -- also called a proxy server -- may satisfy HTTP requests
on behalf of an origin Web server.


### DNS {#dns}

People prefer the more mnemonic hostname identifier (e.g.
`www.google.com`), whil emrouters prefer fixed-length, hierarchically
structured IP addresses.

In order to reconcile these different preferences, we need a directory
service that translates hostnames to IP addresses. This is the main
task of the Internet's Domain Name System (DNS).

The DNS is (1) a distributed database implemented in a hierarchy of
name servers and (2) an application-layer protocol that allows hosts
and name servers to communicate in order to provide the translation
service. The DNS protocol runs over UDP and uses port 53.

DNS is commonly employed by other application-layer protocols, such as
HTTP, to translate user-supplied host names to IP addresses.

No one name server has all of the mappings of all of the hosts in the
internet. DNS uses a large number of name servers organized in a
hierarchical fashion and distributed around the world.

Local name servers
: Each ISP -- such as a university -- has a
    local name server. when a host issues a DNS query message, the
    message is first sent to the host's local name server.

Root name servers
: There are a dozen or so root name servers,
    situated primarily in North America. When a local name server is
    unable to respond to a DNS query, it acts as a DNS client and
    makes a DNS query to a root name server.

Authoritative name servers
: The root name server may not know the
    IP address of a particular host. Instead the root name server
    knows the IP address of the authoritative name server that has
    the desired mapping. A name server is authoritative for a host if
    it always has a DNS record that translates the host's hostname to
    that host's IP address. When an authoritative name server is
    queried by a root server, the authoritative name server responds
    with a reply containing the desired mapping.

<networking.bib>


## Transport Layer {#transport-layer}

The transport layer resides between the application and network
layers. A transport layer protocol provides for logical communication
between application processes running on different hosts. Although the
communicating processes are not physically connected to each other,
from the application's viewpoint, they are physically connected.
Application processes use the logical communication provided by the
transport layer to send messages to each other, free from the worries
of the physical infrastructure used to carry these messages.

Transport-layer protocols are implemented on end-systems but not in
network routers. Network routers only act on the network-layer fields
of the layer 3 PDUs.

On the sending side, the transport layer converts the messages it
receives from a sending application process into 4-PDUs
(transport-layer protocol data units). This is done by (possibly)
breaking the application messages into smaller chunks and adding a
transport-layer header to each chunk. The transport layer then passes
these 4-PDUs to the network layer, which are then translated into
3-PDUs.

On the receiving side, the transport layer removes the transport
header from the 4-PDUs, reassembles the message, and passes it to the
receiving application process.

All transport-layer protocols provide an application
multiplexing/demultiplexing service. A transport protocol can possibly
provide other services to invoking applications, including reliable
data transfer, bandwidth guarantees and delay guarantees.


### Relationship between the transport layer and network layer {#relationship-between-the-transport-layer-and-network-layer}

The transport layer lies just above the network layer. The
transport-layer protocol provides logical communication between
processes running on different hosts, while the network-layer protocol
provides logical communication between hosts.

The transport-layer protocols live in the ned-systems. Within an
end-system, a transport protocol moves messages from application
processes to the network edge and vice versa, but it doesn't have any
say about how the messages are moved within the network core. A
computer network may make available multiple transport protocols, with
each protocol offering a different service model to applications.

The services that a transport protocol can provide are often
constrained by the service model of the underlying network-layer
protocol. For example, if the network-layer protocol cannot provide
bandwidth or delay guarantees, then the transport-layer protocol on
top of it cannot as well.


### Overview of Transport layer in the Internet {#overview-of-transport-layer-in-the-internet}

the Internet, and more generally a TCP/IP network, makes available two
distinct transport-layer protocols to the application layer: UDP (User
Datagram Protocol) and TCP (Transmission Control Protocol).

UDP provides an unreliable, connectionless service to the invoking
application. TCP provides a reliable, connection-oriented service to
the invoking application.

The Internet's network-layer protocol is called IP, which stands for
Internet Protocol. The IP service model is a best-effort delivery
service. This means that IP makes its "best effort" to deliver
segments between communicating hosts, but makes no guarantees.

The fundamental responsibility of TCP and UDP is to extend IP's
delivery service between 2 end systems to a delivery service between
two processes running on the end system. Extending host-to-host
delivery to process-to-process delivery is called application
multiplexing and demultiplexing. UDP and TCP also provide
error-detection fields in their headers. These are the only 2 services
UDP provides.

TCP offers additional services. First, it provides reliable data
transfer. Using flow control, sequence numbering, acknowledgments,
and timers, TCP ensures that data is delivered correctly and in order.
TCP also uses congestion control, which is a service provided to the
Internet as a whole rather than a service provided to the invoking
application. This is done by regulating the rate at which the
sending-side TCPs can send traffic into the network.


### Multiplexing and Demultiplexing Applications {#multiplexing-and-demultiplexing-applications}

The job of delivering the data in a transport-layer segment to the
correct application process is called _demultiplexing_. The job of
gathering data at the source host from different application
processes, enveloping the data with header information to create
segments and passing to the network layer, is called _multiplexing_.

This is performed by TCP and UDP by including two special fields in
the segment headers: the **source port-number field** and the **destination
port-number field**.

The port numbers ranging from 0 to 1023 are called **well-known port
numbers**, and are restricted, which means that they are reserved for
use by well-known application protocols such as HTTP and FTP: HTTP
uses port 80, and FTP uses port 21.

To identify the appropriate host, the transport segment also contains
the source and destination IP addresses.


### Connectionless Transport: UDP {#connectionless-transport-udp}

UDP, defined in RFC 768, does as little as a transport protocol can
do. Aside from multiplexing/demultiplexing and some light error
checking, it adds nothing to IP.

UDP takes messages from the application processes, attaches source and
destination port fields for the multiplexing/demultiplexing service,
adds two other small fields, and passes the resulting segment to the
network layer. The network layer encapsulates the segment into an IP
datagram and then makes a best-effort attempt to deliver the segment's
data to the correct application process.

Note that with UDP there is no handshaking between sending and
receiving transport-layer entities before sending a segment. Hence,
UDP is said to be connectionless.

DNS is an example of an application-layer protocol that uses UDP.

There are many applications more suited to UDP for the following
reasons:

No connection establishment
: TCP uses a three-way handshake before
    it starts to transfer data. UDP does not introduce any delay to
    establish a connection.

No connection state
: TCP maintains connection state in the end
    systems. This connection state includes receive and send buffers,
    congestion control parameters, and sequence and acknowledgment
    number parameters. Hence, a server devoted to a particular
    application can typically support many more active clients over UDP.

Small packet header overhead
: The TCP segment has 20 bytes of
    header overhead per segment, while UDP only has 8 bytes of overhead.

Unregulated send rate
: TCP has a congestion control mechanism
    that throttles the sender when one or more links between sender
    and receiver become excessively congested. This throttling can
    have severe impact on real-time applications. The speed at which
    UDP sends data is only constrained by the rate at which the
    application generates data, the capabilities of the source, and
    the access bandwidth to the Internet.

TCP cannot be employed with mulitcast, multicast applications run
over UDP. It is possible to have reliable data transfer using UDP, by
building this into the application itself.


#### UDP Segment Structure {#udp-segment-structure}

{{< figure src="/ox-hugo/screenshot_2019-02-20_16-36-34.png" caption="Figure 9: UDP segment structure" >}}

The UDP segment structure is defined in RFC 768. The UDP header has
only four fields, each consisting of 2 bytes. The port numbers allow
the destination host to pass the application data to the correct
process running on the destination end system. The length field
specifies the number of bytes in the UDP segment (header plus data).
An explicit length value is needed since the size of the data field
may differ between UDP segments.

The checksum provides for error detection. It determines whether bits
within the UDP segment have been altered as it moved from source to
destination. UDP at the sender side performs the 1s complement of the
sum of all the 16-bit words in the segment, with any overflow
encountered during the sum being wrapped around. This result is put
in the checksum field of the UDP segment.

For example, suppose we have 3 16-bit words:

```text
0110011001100000
0101010101010101
1000111100001100
```

The sum of the first two words is:

```text
0110011001100000
0101010101010101
----------------
1011101110110101
```

Adding the third word gives:

```nil
1011101110110101
1000111100001100
----------------
0100101011000010
```

Note this last addition had overflow, which is wrapped around. Thus
the 1s complement of the sum 0100101011000010 is 1011010100111101.

UDP provides a checksum because there is no guarantee that all the
links between source and destination provide error checking. One of
the links may use a link-layer protocol that does not provide error
checking. Even if segments are correctly transferred across a link,
it's possible that bit errors could be introduced when a segment is
stored in a router's memory. Hence, UDP must provide error-detection
at the transport layer, on an end-end basis. Because IP is supposed to
run over just about any layer-2 protocol, it is useful for the
transport layer to provide error checking as a safety measure. UDP
provides nothing for error recovery. Some implementations of UDP
simply discard the damaged segment; others pass the damaged segment to
the application with a warning.


### Principles of Reliable Data Transfer {#principles-of-reliable-data-transfer}

The service abstraction provided to the upper-layer entities is that
of a reliable channel through which data can be transferred. With a
reliable channel, no transferred data bits are corrupted or lost, and
all are delivered in the order in which they are sent. This is the
service model that TCP offers to the Internet applications that invoke
it.

It is the responsibility of a reliable data transfer protocol to
implement this service abstraction. This task is made more difficult
by the fact that the layers beneath it may be unreliable. Here, we
develop increasingly complex models for the sender and receiver sides
of a reliable data transfer protocol.
