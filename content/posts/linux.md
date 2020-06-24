+++
title = "Linux"
author = ["Jethro Kuan"]
lastmod = 2020-06-24T16:10:15+08:00
draft = false
+++

## Backlinks {#backlinks}

- [Unix]({{< relref "unix" >}})
- [Docker 101]({{< relref "docker" >}})
- [Nix/NixOS]({{< relref "nix" >}})
- [Systems Programming]({{< relref "systems_programming" >}})
- [Branch Prediction]({{< relref "branch_prediction" >}})

- `127.0.1.1` in `/etc/hosts` is to allow some applications like Gnome to
  resolve the hostname to an ip address with a canonical fully
  qualified domain name - FQDN ([Source](http://www.leonardoborda.com/blog/127-0-1-1-ubuntu-debian/))
- `sudo` needs to resolve hostnames because the sudoers file specifies
  hostnames in the rules. Hence sudo requires both loopback and
  "real". ([Source](https://unix.stackexchange.com/questions/218145/why-does-sudo-need-the-loopback-interface))
- `pkexec` lets authorized users execute programs as another user.
