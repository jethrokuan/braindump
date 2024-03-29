+++
title = "Setting up Dynamic DNS on Raspberry Pi"
author = ["Jethro Kuan"]
draft = false
+++

We want to expose the device to the external web, but our external IP address is
always changing (depending on your ISP).

The solution is dynamic DNS: where we have a domain name resolve to the
ever-changing IP address. We may use a service like [FreeDNS](https://freedns.afraid.org/).

First, setup an account at the linked website, and register a subdomain. Next,
we can simply install a [FreeDNS client](https://freedns.afraid.org/scripts/freedns.clients.php) on the device:

```bash
sudo apt install ddclient
```

This will walk you through the steps for setting `ddclient`. The following
example config is provided by the website:

```text
daemon=5m
timeout=10
syslog=no # log update msgs to syslog
#mail=root # mail all msgs to root
#mail-failure=root # mail failed update msgs to root
pid=/var/run/ddclient.pid # record PID in file.
ssl=yes # use ssl-support. Works with
# ssl-library

use=if, if=eth0
server=freedns.afraid.org
protocol=freedns                # or dyndns1 if facing difficulty
login=login_name
password=the_password
somedomain.mooo.com
```