+++
title = "Linux"
author = ["Jethro Kuan"]
lastmod = 2020-03-07T23:43:19+08:00
draft = false
+++

-   `127.0.1.1` in `/etc/hosts` is to allow some applications like Gnome to
    resolve the hostname to an ip address with a canonical fully
    qualified domain name - FQDN ([Source](http://www.leonardoborda.com/blog/127-0-1-1-ubuntu-debian/))
-   `sudo` needs to resolve hostnames because the sudoers file specifies
    hostnames in the rules. Hence sudo requires both loopback and
    "real". ([Source](https://unix.stackexchange.com/questions/218145/why-does-sudo-need-the-loopback-interface))
-   `pkexec` lets authorized users execute programs as another user.
