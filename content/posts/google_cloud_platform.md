+++
title = "Google Cloud Platform"
author = ["Jethro Kuan"]
draft = false
+++

## Cloud ML {#cloud-ml}

-   Exactly one replica is designated the master. This task manages the
    others and reports status for the job as a whole. The training
    service runs until your job succeeds or encounters an unrecoverable
    error. In the distributed case, it is the status of the master
    replica that signals the overall job status.
-   If you are running a single-process job, the sole replica is the
    master for the job.
-   One or more replicas may be designated as workers. These replicas do
    their portion of the work as you designate in your job
    configuration.
-   One or more replicas may be designated as parameter servers. These
    replicas coordinate shared model state between the workers.

For more on the distributed training flow, see
<https://cloud.google.com/ml-engine/docs/tensorflow/distributed-tensorflow-mnist-cloud-datalab>