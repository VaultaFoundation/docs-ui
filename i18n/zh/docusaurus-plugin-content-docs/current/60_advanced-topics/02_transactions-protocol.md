---
title: 交易协议
---


## 1。概述

操作定义智能合约中的原子行为。在更高的层面上，事务定义了在去中心化应用程序中以原子方式执行的操作组。与数据库事务类似，形成区块链交易的一组操作必须按照预定义的顺序一个接一个地成功，否则交易将失败。为了在交易失败时保持交易的原子性和完整性，区块链状态会恢复到与处理交易之前的状态一致的状态。这样可以保证在故障点之前执行的任何操作都不会产生任何副作用。


### 1.1。行动

一个动作可以由之前在区块链上创建的一个或多个参与者授权。操作可以在智能合约中显式创建，也可以由应用程序代码隐式生成。对于任何给定的 `actor:action` pair 最多有一个显式关联的最低权限。如果未设置明确的最低权限，则隐式默认值为 `actor@active`。每个演员都可以独立为给定动作设置其个人最低权限。此外，EOS软件中还设置了复杂但灵活的授权结构，允许参与者代表其他账户推送操作。因此，需要进行进一步的检查，以授权参与者发送操作（请参阅 [3.4.2。权限检查](#342-permission-check)）。

交易涉及两种类型的操作。它们的主要不同之处在于 EOS 软件执行它们的方式：

1.显式操作，存在于已签名的交易中（请参阅 [2.交易实例](#2-transaction-instance)）。
2.隐式（内联）操作，这些操作是作为处理事务的副作用而创建的。

隐式（内联）操作也在智能合约代码中定义，就像显式操作一样。关键区别在于，内联操作不包含在通过网络传播并最终包含在区块中的实际交易中；它们是隐含的。


#### 1.1.1。显式操作

顾名思义，常规或显式操作包含在构成交易的实际操作列表中。显式操作被编码为操作实例（请参阅 [3.4.3。操作实例](#343-action-instance)）然后才被推入交易。显式操作还包含与作为事务一部分执行的操作关联的实际有效载荷数据（如果有）。


#### 1.1.2。隐式操作

隐式（内联）操作是由于事务（或其他内联操作，如果是嵌套的）中的显式调用者操作而生成的，该动作需要该隐式操作执行操作才能使调用者操作继续。因此，内联操作的作用范围和权限与调用者操作相同。因此，行内操作可以保证在同一事务中执行。


### 1.2。智能合约

在EOS中，智能合约由一组操作组成，通常按功能分组，以及这些操作所依赖的一组类型定义。因此，行动规定和定义了合同的实际行为。标准EOS合约中实现了多个操作，用于创建账户、生产者投票、代币操作等。应用程序开发人员可以通过在自己的智能合约和应用程序中创建自定义操作来完全扩展、替换或禁用此功能。另一方面，事务通常是在应用程序级别创建的。智能合约对他们来说是不可知的。


#### 1.2.1。实施

EOS 智能合约以 C++ 类的形式实现，其派生自 `eosio::contract`。操作在派生类中以 C++ 方法的形式实现。另一方面，交易是在EOS应用程序中动态生成的（作为交易实例）。EOS 软件处理每个交易实例，并跟踪其从创建、签名、验证和执行的演变过程中的状态。


## 2。交易实例

事务实例由事务标头以及进行实际交易的操作实例和事务扩展的列表组成。交易标头包含根据交易的到期时间评估交易是否包含在区块中的必要信息，该到期时间是在交易被推送执行时计算的。其他字段包括包含交易的区块号、用于防止 “跨链” 或 “跨分叉” 攻击的区块 ID 前缀、CPU 和网络使用量的上限以及延迟交易的秒数（如果适用）。下图描绘了一个事务实例。

![](/images/protocol-xacts_instance.png "Transaction Instance")

操作实例可以由常规操作或上下文无关操作组成。签名是在交易级别创建和验证的。账户和权限按每个操作进行处理。每个操作实例都包含用于验证是否有权根据操作中指定的参与者的权限级别以及智能合约中为该操作定义的实际授权来验证其是否被授权执行的信息（请参阅 [3.4.2。权限检查](#342-permission-check)）。


### 2.1。交易编号

交易实例包含最少的字段集，用于区分一个事务和另一个事务。因此，交易 ID 由交易实例中包含的基本字段的加密哈希组成。因此，事务 ID 完全由封装在事务、事务标头和任何嵌入式事务扩展插件（可选）中的操作列表决定。可以进一步将事务实例专门化为已签名的事务实例或打包的事务实例。


### 2.2。已签名的交易实例

已签名的交易扩展了交易架构的基本内容，以包括签署交易的账户生成的签名。它还包括与交易实例中包含的无上下文操作相关的任何数据（如果有）（请参阅 `signed_transaction` 下面的架构）。除非由适用的参与者签署，否则交易尚未准备好进行执行和验证。

#### signed_transaction 架构

名称 | 类型 | 描述
-|-|-
`expiration` | `time_point_sec` | 交易到期前必须确认的时间
`ref_block_num` | `uint16_t` | 过去 $2^ {16} $ 区块中区块号的低 16 位
`ref_block_prefix` | `uint32_t` | 所指的区块 ID 的低 32 位 `ref_block_num'
`max_net_usage_words` | `unsigned_int` | upper limit on total network bandwidth billed (in 64-bit words)
`max_cpu_usage_ms` | `uint8_t` | upper limit on total CPU time billed (in milliseconds)
`delay_sec` | `unsigned_int` | number of seconds to delay transaction for
`上下文_free_actions` | array of `行动` | list of context-free actions if any
`行动` | array of `行动` | list of [操作实例](#343-action-instance)
`交易扩展` | `扩展名_类型` | extends fields to support additional features
`签名` | array of `签名类型` | digital signatures after transaction is signed
`上下文_free_data` | array of `字节` | context-free action data to send if any


### 2.3. Packed Transaction Instance

A packed transaction is an optionally compressed signed transaction with additional housekeeping fields to allow for decompression and quick validation. Packed transactions minimize space footprint and block size in the long run (see `打包交易` schema below). A packed transaction forms the most generic type of transaction in the EOS blockchain. Consequently, when transactions are pushed to a block, they are actually packed transactions whether compressed or not.

#### packed_transaction schema

Name | Type | Description
-|-|-
`签名` | `签名类型` | digital signatures after transaction is signed
`压缩` | `压缩类型` | compression method used
`packed_context_free_data` | `字节` | compressed context-free data (if transaction compressed)
`packed_trx` | `字节` | compressed transaction (if compressed)
`unpacked_trx` | `已签名的交易` | cached decompressed transaction
`trx_id` | `交易 id_type` | transaction ID

The `unpacked_trx` field holds the cached unpacked transaction after the transaction instance is constructed. If the signed transaction was previously compressed, it is decompressed from the `packed_trx` field and cached to `unpacked_trx`. If the signed transaction was stored uncompressed, it is simply copied verbatim to `unpacked_trx`. The `签名` field allows a quick signature validation of the transaction without requiring a full decompression of the transaction.


## 3. Transaction Lifecycle

Transactions go through various stages during their lifespan. First, a transaction is created in an application or an EOS client such as cleos by pushing the associated actions into the transaction. Next, the transaction is sent to the locally connected node, which in turn relays it to the active producing nodes for validation and execution via the peer-to-peer network. Next, the validated transaction is pushed to a block by the active producer on schedule along with other transactions. Finally the block that contains the transaction is pushed to all other nodes for validation. When a supermajority of producers have validated the block, and the block becomes irreversible, the transaction gets permanently recorded in the blockchain and it is considered immutable.


### 3.1. Create Transaction

Transactions are created within an application by instantiating a transaction object and pushing the related action instances into a list within the transaction instance. An action instance contains the actual details about the receiver account to whom the action is intended, the name of the action, the list of actors and permission levels that must authorize the transaction via signatures and delays, and the actual message to be sent, if any (see `行动` schema below).

#### action schema

Name | Type | Description
-|-|-
`帐户` | `名称` | encoded 13-char account name
`操作名称` | `名称` | encoded 13-char action name
`授权` | array of `权限级别` | list of `演员:权限` authorizations
`数据` | `字节` | action data to send

After the transaction instance is created at the application level, the transaction is arranged for processing. This involves two main steps: signing the transaction and pushing the signed transaction to the local node for actual propagation and execution of the transaction. These steps are typically performed within the EOS application.


### 3.2. Sign Transaction

The transaction must be signed by a set of keys sufficient to satisfy the accumulated set of explicit `演员:权限` pairs specified in all the actions enclosed within the transaction. This linkage is done through the authority table for the given permission. The actual signing key is obtained by querying the wallet associated with the signing account on the client where the application is run.

The transaction signing process takes three parameters: the transaction instance to sign, the set of public keys from which the associated private keys within the application wallet are retrieved, and the chain ID. The chain ID identifies the actual EOS blockchain and consists of a hash of its genesis state, which depends on the blockchain’s initial configuration parameters. Before signing the transaction, the EOS software first computes a digest of the transaction. The digest value is a SHA-256 hash of the chain ID, the transaction instance, and the context free data if the transaction has any context free actions. Any instance fields get serialized before computing any cryptographic hashes to avoid including reference fields (memory addresses) in the hash computation. The transaction digest computation and the signing process are depicted below.

![](/images/protocol-xact_sign.png "Transaction Signing")

After the transaction digest is computed, the digest is finally signed with the private key associated with the signing account’s public key. The public-private key pair is usually stored within the local machine that connects to the local node. The signing process is performed within the wallet manager associated with the signing account, which is typically the same user that deploys the application. The wallet manager provides a virtual secure enclave to perform the digital signing, so a message signature is generated without the private key ever leaving the wallet. After the signature is generated, it is finally added to the signed transaction instance.


### 3.3. Push Transaction

After the transaction is signed, a packed transaction instance is created from the signed transaction instance and pushed from the application to the local node, which in turn relays the transaction to the active producing nodes for signature verification, execution, and validation. Every producing node that receives a transaction will attempt to execute and validate it in their local context before relaying it to the next producing node. Hence, valid transactions are relayed while invalid ones are dropped. The idea behind this is to prevent bad actors from spamming the network with bogus transactions. The expectation is for bad transactions to get filtered and dropped before reaching the active producer on schedule. When a transaction is received, no assumption is made on its validity. All transactions are validated again by the next producing node, regardless of whether it is producing blocks. The only difference is that the producer on schedule attempts to produce blocks by pushing the transactions it validates into a pending block before pushing the finalized block to its own local chain and relaying it to other nodes.


### 3.4. Verify Transaction

The process to verify a transaction is twofold. First, the public keys associated with the accounts that signed the transaction are recovered from the set of signatures provided in the transaction. Such a recovery is cryptographically possible for ECDSA, the elliptic curve digital signature algorithm used in EOS. Second, the public key of each actor specified in the list of action authorizations (actor:permission) from each action included in the transaction is checked against the set of recovered keys to see if it is satisfied. Third, each satisfied `演员:权限` is checked against the associated minimum permission required for that `演员:合同:: 动作` pair to see if it meets or exceeds that minimum. This last check is performed at the action level before any action is executed (see [3.4.2。权限检查](#342-permission-check)).


#### 3.4.1. Transaction Context

Once the public keys are recovered, a transaction context is created from the transaction instance. The transaction context keeps track of the trace of actions and the action receipt generated as each action is dispatched and executed. All state generated is kept within a transaction trace instance and a list of action receipts. The transaction trace consists of a list of action traces. Each action trace contains information about the executed action, which includes the action receipt, the action instance, whether it is a context-free action, and the transaction ID that generated the action. The action receipt is generated later during transaction execution and finalization.


#### 3.4.2. Permission Check

Since the sequence of actions contained in the transaction must be executed atomically as a whole, the EOS software first checks that the actors specified in each action have the minimum permission required to execute it. To that end, the software checks the following for each action:

*   The named permission of each actor specified in each action instance.
*   The named permission of the corresponding `演员:合同:: 动作` pair specified in the smart contract.

If there is at least one actor whose set of named permissions fail to meet the minimum permission level required by the corresponding `演员:合同:: 动作` pair in the smart contract, the transaction fails. The reason why action permissions are checked before any action is executed is due to performance. It is more efficient to cancel a transaction with all actions unexecuted, than doing so after a few actions executed, but later were rolled back as a result of a failed action or authorization. Any state changes incurred during a failed action must be undone to preserve data integrity. Database sessions are expensive in terms of memory usage and computing resources. Therefore, undo operations must be minimized as possible.


#### 3.4.3. Action Instance

The diagram below depicts an action instance. It consists of the receiver account, the action name, the list of actors and their permissions, and the action data containing the message to be sent, if any, to the receiver account.

![](/images/protocol-xacts_act_instance.png "Action Instance")

#### 3.4.4. Authority Check

After the minimum permission levels are checked, the authority table for the receiver account’s permission that matches each actor’s permission within the action instance is checked.


### 3.5. Execute Transaction

To execute the transaction, a chain database session is started and a snapshot is taken. This allows to roll back any changes made to the chain state in case any of the transaction actions fails. A corresponding transaction context keeps the transaction state during execution. To execute the transaction, each action associated with the corresponding transaction instance is dispatched for execution. Context free actions, if any, are dispatched first, followed by regular actions.


#### 3.5.1. Apply Context

To prepare for action execution, an apply context instance is created locally for each action. The apply context, as its name implies, contains references to the necessary resources to apply the action, such as an instance to the chain controller (see [Network Peer Protocol: 2.2. Chain Controller](03_network-peer-protocol.md#22-chain-controller)), the chain database where state is kept, the transaction context where the transaction is running, the actual action instance, and the receiver account to whom the action is intended.


#### 3.5.2. Action Trace

To prepare each action for execution, both action receipt and action trace instances are initialized. First, a hash of the action instance itself is computed and stored in the action receipt. Next, the action trace is initialized with statistics about the pending block where the transaction that includes the action will be pushed to. Therefore, an action trace allows an action to be traced to the actual block and transaction that includes the action, including the actual node that produced the block. Finally, the action handler is located by matching the handler name, receiver account, and actor account with the list of action handlers maintained by the chain controller within the producing node. These action handlers are applied in the controller when the system contracts and the client application are loaded. The handlers take the receiver account name, the contract name, the action name, and the action handler.


#### 3.5.3. Action Execution

Once the proper action handler is located, the appropriate whitelists and blacklists are checked. If the node is currently producing blocks, the receiver account is checked against the account whitelist and blacklist, if any. The action blacklist is checked next, if any. If the receiver account or the action name are in a blacklist, the action is aborted. If the receiver account is already on the whitelist, the blacklist check is skipped. If all checks pass, the action is finally executed by invoking the corresponding action handler, passing the actor account in the `从` parameter and the receiving account in the `到` parameter.


### 3.6. Finalize Transaction

After all actions included in the transaction are executed, the transaction enters the finalization stage. In this step, a corresponding action receipt is produced for each action. The action receipt contains a hash of the corresponding action instance, a few counters used for analytics, and the receiver account to which the action is intended to, if applicable.


#### 3.6.1. Transaction Receipt

After all action receipts are generated for the transaction, a transaction receipt is finally created and pushed into the signed block, along with other transaction receipts included in the block. The transaction receipt summarizes the result of the transaction (executed, unexecuted, failed, deferred, expired, etc.), including the actual amount of CPU billed in microseconds, and the total NET storage used (see `交易收据` schema below).

##### transaction_receipt schema

Name | Type | Description
-|-|-
`状态` | `uint8_t` | result of transaction execution attempt
`cpu_usage_us` | `uint32_t` | total CPU used in microseconds
`net_Usage_words` | `无符号整数` | total NET used in 64-bit words
`trx` | `变体` | holds transaction ID or packed transaction

The `状态` field is an 8-bit enumeration type that can hold one of the following results:

* `被处决` - transaction succeeded, no error handler executed.
* `软失败` - transaction failed, error handler succeeded.
* `hard_fail` - transaction failed, error handler failed.
* `延迟` - transaction delayed by user for future execution.
* `过期` - transaction expired, CPU/NET refunded to user.

> ℹ️ The `延迟` status only applies to **delayed user transactions**, that is, explicit user-created transactions that have a delay to satisfy authorizations (see [3.6.3。用户交易延迟](#363-delayed-user-transactions) for more information).

The `trx` field holds the transaction ID or the packed transaction itself. The actual choice depends on the transaction type. Receipts generated from Deferred Transactions and Delayed User Transactions are stored by transaction ID; all other types are stored as packed transactions.

#### 3.6.2. Deferred Transactions

Deferred transactions are generated as a side effect of processing the blockchain, so their state is stored in the chain database, not within a block. Therefore, there is no need to explicitly include their contents in the transaction receipt. All in-sync nodes should be aware of the form of a deferred transaction as a matter of consensus. Deferred transactions issued by a smart contract have no role or effect on the `延迟` status field of the transaction receipt.

> ⚠ **Warning:**
> Deprecation Notice
> Deferred transactions are deprecated as of EOS 2.0.

#### 3.6.3. Delayed User Transactions

Delayed user transactions contain the packed transactions when they are pushed to the network (at the start of the delay timer). However, unlike regular transactions, they bear a "delayed" status so their execution and validation can be postponed. Later on when they execute/fail/expire (at the end of the delay timer), they only contain the transaction ID. This is because any in-sync node will have the transaction content from a previously broadcast block.


### 3.7. Validate Transaction

A transaction is verified and validated at various stages during its lifecycle: first when it propagates on the peer-to-peer network as a loose transaction (see [3.4。验证交易](#34-verify-transaction)), then during block validation as the block is confirmed among a supermajority of block producers, and optionally during a blockchain replay if nodeos is configured to fully re-validate transactions during replays. By default, recorded transactions are not completely re-validated during replays since it is assumed that the node operator has established trust in the local block log, either personally or through a side-channel so it is no longer considered a potential source of byzantine information.


#### 3.7.1. Validation Process

When validating a transaction as part of a block, multiple validations occur at various levels. In full block validation, all transactions recorded in the block are replayed and the locally calculated merkle tree root hashes (generated from the transaction receipt data and the action receipt data, respectively) are compared against the `交易_mroot` and `区块标题中的 action_mroot 字段。因此，如果记录的交易在区块内被篡改，不仅默克尔树根哈希会导致不匹配，而且交易签名也将无法验证。如果篡改不是由真正的区块生产者进行的，则区块签名也将无法验证（请参阅 [共识协议：5.3。区块验证](01_consensus-protocol.md#53-block-validation)).
