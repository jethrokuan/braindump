+++
title = "HTTP"
author = ["Jethro Kuan"]
lastmod = 2020-05-31T01:08:21+08:00
draft = false
+++

tags
: [Web Development]({{< relref "web_dev" >}})

## GET Requests and Request Body {#get-requests-and-request-body}

> Yes. In other words, any HTTP request message is allowed to contain a
> message body, and thus must parse messages with that in mind. Server
> semantics for GET, however, are restricted such that a body, if any,
> has no semantic meaning to the request. The requirements on parsing
> are separate from the requirements on method semantics.
>
> So, yes, you can send a body with GET, and no, it is never useful to
> do so.
>
> This is part of the layered design of HTTP/1.1 that will become clear
> again once the spec is partitioned (work in progress).
>
> -- Roy Fielding

Having servers return content based on the value of the request body
in the GET request is a bad practice.
