+++
title = "Setting up a Static IP Address on Raspberry Pi"
author = ["Jethro Kuan"]
draft = false
+++

This really just involves editing `/etc/dhcpcd.conf`. The configuration here looks like:

```text
interface eth0
static ip_address=192.168.1.10
static routers=192.168.1.1      # Set this to the router's gateway address
static domain_name_servers=192.168.1.1 1.1.1.1 8.8.8.8 # List of DNS servers, may use router as the only and default
```