+++
title = "Small Queries Are Efficient in SQLite"
author = ["Jethro Kuan"]
draft = false
+++

In a typical client/server database, each SQL statement requires a message
round-trip from the application to the database server and back to the
application. However, SQLite does not suffer from this problem, because it is
not client-server. The SQLite database runs in the same process address space as
the application, so there are no message round-trips: only a function call.