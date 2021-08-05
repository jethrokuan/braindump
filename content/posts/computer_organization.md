+++
title = "Computer Organization"
author = ["Jethro Kuan"]
draft = false
+++

tags
: [Operating Systems]({{<relref "operating_systems.md#" >}})


## Pipelining {#pipelining}

-   Increases throughput, but not latency


### Structural Hazard {#structural-hazard}


### Data Hazard {#data-hazard}

-   Resolved with extra hardware


### Control Hazard {#control-hazard}

-   Branch instructions need to tell which branch, but have only just
    read from memory
-   Branch prediction (static/dynamic)


## Pipelined Datapath and Control {#pipelined-datapath-and-control}

1.  IF: Instruction Fetch
2.  ID: Instruction Decode and register file read
3.  EX: Execution or address calculation
4.  MEM: Data memory access
5.  WB: Write Back


### Issues {#issues}

1.  Write-back stage places the result back into the register file in
    the middle of the data path (Data Hazard)
2.  Selection of the next value of the PC, between incremented PC and
    branch address from the MEM stage (Control Hazard)

Data flow does not affect current instruction, but only influence
later instructions.