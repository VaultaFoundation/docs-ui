---
title: 트랜잭션 프로토콜
---


## 1.개요

액션은 스마트 컨트랙트 내의 원자적 행동을 정의합니다.상위 수준에서 트랜잭션은 분산된 애플리케이션 내에서 원자적으로 실행되는 작업 그룹을 정의합니다.데이터베이스 트랜잭션과 마찬가지로, 블록체인 트랜잭션을 구성하는 작업 그룹은 모두 미리 정의된 순서대로 하나씩 성공해야 합니다. 그렇지 않으면 트랜잭션이 실패합니다.트랜잭션이 실패할 경우 트랜잭션의 원자성과 무결성을 유지하기 위해 블록체인 상태는 트랜잭션을 처리하기 전의 상태와 일치하는 상태로 복원됩니다.이를 통해 장애 시점 이전에 실행된 작업으로 인한 부작용이 발생하지 않습니다.


### 1.1.액션

이전에 블록체인에서 생성된 한 명 이상의 행위자가 작업을 승인할 수 있습니다.액션은 스마트 컨트랙트 내에서 명시적으로 생성되거나 애플리케이션 코드에 의해 암시적으로 생성될 수 있습니다.주어진 모든 것에 대해 `actor:action` 한 쌍에는 최대 하나의 명시적 관련 최소 권한이 있습니다.명시적인 최소 권한 설정이 없는 경우 암시적 기본값은 다음과 같습니다. `actor@active`.각 행위자는 주어진 액션에 대해 개인적인 최소 권한을 독립적으로 설정할 수 있습니다.또한 EOS 소프트웨어 내에는 복잡하지만 유연한 권한 부여 구조가 마련되어 있어 행위자가 다른 계정을 대신하여 조치를 취할 수 있습니다.따라서 액터가 액션을 보낼 수 있는 권한을 부여하기 위한 추가 검사가 시행됩니다 (참조). [3.4.2.권한 확인](#342-permission-check)).

트랜잭션에는 두 가지 유형의 작업이 포함됩니다.주로 EOS 소프트웨어에서 실행되는 방식이 다릅니다.

1.서명된 트랜잭션에 존재하는 명시적 행위 (참조) [2.트랜잭션 인스턴스](#2-transaction-instance)).
2.암시적 (인라인) 액션은 트랜잭션 처리의 부작용으로 생성됩니다.

암시적 (인라인) 액션도 명시적 액션과 마찬가지로 스마트 컨트랙트 코드에서 정의됩니다.주요 차이점은 인라인 액션은 네트워크를 통해 전파되어 결국에는 블록에 포함되는 실제 트랜잭션에 포함되지 않고 암시적이라는 것입니다.


### 1.1.1.명시적 조치

이름에서 알 수 있듯이 정기적이거나 명시적인 작업은 트랜잭션을 구성하는 실제 작업 목록에 포함됩니다.명시적 액션은 액션 인스턴스로 인코딩됩니다 (참조). [3.4.3.액션 인스턴스](#343-action-instance)) 트랜잭션에 푸시되기 전에명시적 작업에는 트랜잭션의 일부로 실행될 작업과 관련된 실제 페이로드 데이터 (있는 경우) 도 포함됩니다.


#### 1.1.2.암시적 액션

암시적 (인라인) 작업은 트랜잭션 내의 명시적 호출자 작업 (또는 중첩된 경우 다른 인라인 작업) 의 결과로 생성되며, 호출자 작업이 계속되려면 해당 암시적 작업이 작업을 수행해야 합니다.따라서 인라인 작업은 호출자 작업과 동일한 범위 및 권한 내에서 작동합니다.따라서 인라인 작업은 동일한 트랜잭션 내에서 실행되도록 보장됩니다.


### 1.2.스마트 컨트랙트

EOS에서 스마트 계약은 일반적으로 기능별로 그룹화된 일련의 작업과 이러한 작업이 의존하는 일련의 유형 정의로 구성됩니다.따라서 액션은 계약의 실제 행동을 지정하고 정의합니다.표준 EOS 계약에는 계정 생성, 생산자 투표, 토큰 운영 등에 대한 몇 가지 조치가 구현되어 있습니다. 애플리케이션 개발자는 자체 스마트 계약 및 애플리케이션 내에서 사용자 지정 작업을 생성하여 이 기능을 확장, 대체 또는 비활성화할 수 있습니다.반면 트랜잭션은 일반적으로 애플리케이션 수준에서 생성됩니다.스마트 콘트랙트는 영향을 받지 않습니다.


### 1.2.1.구현

EOS 스마트 계약은 다음에서 파생되는 C++ 클래스로 구현됩니다. `eosio::contract`.액션은 파생 클래스 내에서 C++ 메서드로 구현됩니다.반면 트랜잭션은 EOS 애플리케이션 내에서 동적으로 (트랜잭션 인스턴스로) 생성됩니다.EOS 소프트웨어는 각 트랜잭션 인스턴스를 처리하고 생성, 서명, 검증 및 실행으로 발전함에 따라 상태를 추적합니다.


## 2.트랜잭션 인스턴스

트랜잭션 인스턴스는 트랜잭션 헤더와 실제 트랜잭션을 만드는 액션 인스턴스 및 트랜잭션 확장 목록으로 구성됩니다.트랜잭션 헤더에는 트랜잭션이 실행을 위해 푸시될 때 계산되는 만료 시간을 기준으로 트랜잭션이 블록에 포함되는지 평가하는 데 필요한 정보가 포함됩니다.기타 필드에는 트랜잭션을 포함하는 블록 번호, “크로스 체인” 또는 “크로스 포크” 공격을 방지하는 데 사용되는 블록 ID 접두사, CPU 및 네트워크 사용량 상한선, 트랜잭션 지연 시간 (초) 등이 있습니다 (해당하는 경우).아래 다이어그램은 트랜잭션 인스턴스를 보여줍니다.

![](/images/protocol-xacts_instance.png "Transaction Instance")

액션 인스턴스는 일반 액션 또는 컨텍스트 프리 액션으로 구성될 수 있습니다.서명은 트랜잭션 수준에서 생성되고 검증됩니다.계정과 권한은 작업별로 처리됩니다.각 작업 인스턴스에는 작업에 지정된 행위자의 권한 수준과 해당 작업에 대해 스마트 계약에 정의된 실제 권한을 기반으로 실행 권한이 있는지 여부를 검증하는 정보가 포함되어 있습니다 (참조). [3.4.2.권한 확인](#342-permission-check)).


### 2.1.거래 ID

트랜잭션 인스턴스에는 한 트랜잭션을 다른 트랜잭션과 구분하는 최소 필드 집합이 포함됩니다.따라서 트랜잭션 ID는 트랜잭션 인스턴스에 포함된 기본 필드의 암호화 해시로 구성됩니다.따라서 트랜잭션 ID는 트랜잭션 내에 캡슐화된 작업 목록, 트랜잭션 헤더 및 내장된 트랜잭션 확장 (선택 사항) 에 의해서만 결정됩니다.트랜잭션 인스턴스는 서명된 트랜잭션 인스턴스 또는 패킹된 트랜잭션 인스턴스로 더욱 전문화될 수 있습니다.


### 2.2.서명된 트랜잭션 인스턴스

서명된 트랜잭션은 트랜잭션에 서명한 계정에서 생성된 서명을 포함하도록 트랜잭션 스키마의 기본 내용을 확장합니다.또한 트랜잭션 인스턴스에 포함된 컨텍스트 프리 작업 (있는 경우) 과 관련된 모든 데이터도 포함됩니다 (참조). `signed_transaction` 아래 스키마).해당 행위자가 서명하지 않는 한 트랜잭션은 실행 및 검증할 준비가 되지 않았습니다.

#### 서명된 트랜잭션 스키마

이름 | 유형 | 설명
-|-|-
`expiration` | `time_point_sec` | 거래가 만료되기 전까지 확인되어야 하는 시간
`ref_block_num` | `uint16_t` | 마지막 $2^ {16} $ 블록에 있는 블록 번호의 하위 16비트
`ref_block_prefix` | `uint32_t` | 에서 참조하는 블록 ID의 하위 32비트 `ref_block_num'
`최대 순사용량_단어` | `unsignned_int` | upper limit on total network bandwidth billed (in 64-bit words)
`최대_CPU_사용량_밀리초` | `uint8_t` | upper limit on total CPU time billed (in milliseconds)
`지연_초` | `unsignned_int` | number of seconds to delay transaction for
`컨텍스트_프리_액션` | array of `동작` | list of context-free actions if any
`행위` | array of `동작` | list of [액션 인스턴스](#343-action-instance)
`트랜잭션_확장` | `확장_유형` | extends fields to support additional features
`서명` | array of `서명_유형` | digital signatures after transaction is signed
`컨텍스트_프리_데이터` | array of `바이트` | context-free action data to send if any


### 2.3. Packed Transaction Instance

A packed transaction is an optionally compressed signed transaction with additional housekeeping fields to allow for decompression and quick validation. Packed transactions minimize space footprint and block size in the long run (see `포장 트랜잭션` schema below). A packed transaction forms the most generic type of transaction in the EOS blockchain. Consequently, when transactions are pushed to a block, they are actually packed transactions whether compressed or not.

#### packed_transaction schema

Name | Type | Description
-|-|-
`서명` | `서명_유형` | digital signatures after transaction is signed
`압축` | `압축_유형` | compression method used
`패킹된_컨텍스트_무료_데이터` | `바이트` | compressed context-free data (if transaction compressed)
`packed_trx` | `바이트` | compressed transaction (if compressed)
`언팩드_trx` | `서명된_거래` | cached decompressed transaction
`trx_id` | `트랜잭션_ID_유형` | transaction ID

The `언팩드_trx` field holds the cached unpacked transaction after the transaction instance is constructed. If the signed transaction was previously compressed, it is decompressed from the `packed_trx` field and cached to `언팩드_trx`. If the signed transaction was stored uncompressed, it is simply copied verbatim to `언팩드_trx`. The `서명` field allows a quick signature validation of the transaction without requiring a full decompression of the transaction.


## 3. Transaction Lifecycle

Transactions go through various stages during their lifespan. First, a transaction is created in an application or an EOS client such as cleos by pushing the associated actions into the transaction. Next, the transaction is sent to the locally connected node, which in turn relays it to the active producing nodes for validation and execution via the peer-to-peer network. Next, the validated transaction is pushed to a block by the active producer on schedule along with other transactions. Finally the block that contains the transaction is pushed to all other nodes for validation. When a supermajority of producers have validated the block, and the block becomes irreversible, the transaction gets permanently recorded in the blockchain and it is considered immutable.


### 3.1. Create Transaction

Transactions are created within an application by instantiating a transaction object and pushing the related action instances into a list within the transaction instance. An action instance contains the actual details about the receiver account to whom the action is intended, the name of the action, the list of actors and permission levels that must authorize the transaction via signatures and delays, and the actual message to be sent, if any (see `동작` schema below).

#### action schema

Name | Type | Description
-|-|-
`계정` | `이름` | encoded 13-char account name
`액션_이름` | `이름` | encoded 13-char action name
`권한 부여` | array of `권한 수준` | list of `액터:권한` authorizations
`데이터` | `바이트` | action data to send

After the transaction instance is created at the application level, the transaction is arranged for processing. This involves two main steps: signing the transaction and pushing the signed transaction to the local node for actual propagation and execution of the transaction. These steps are typically performed within the EOS application.


### 3.2. Sign Transaction

The transaction must be signed by a set of keys sufficient to satisfy the accumulated set of explicit `액터:권한` pairs specified in all the actions enclosed within the transaction. This linkage is done through the authority table for the given permission. The actual signing key is obtained by querying the wallet associated with the signing account on the client where the application is run.

The transaction signing process takes three parameters: the transaction instance to sign, the set of public keys from which the associated private keys within the application wallet are retrieved, and the chain ID. The chain ID identifies the actual EOS blockchain and consists of a hash of its genesis state, which depends on the blockchain’s initial configuration parameters. Before signing the transaction, the EOS software first computes a digest of the transaction. The digest value is a SHA-256 hash of the chain ID, the transaction instance, and the context free data if the transaction has any context free actions. Any instance fields get serialized before computing any cryptographic hashes to avoid including reference fields (memory addresses) in the hash computation. The transaction digest computation and the signing process are depicted below.

![](/images/protocol-xact_sign.png "Transaction Signing")

After the transaction digest is computed, the digest is finally signed with the private key associated with the signing account’s public key. The public-private key pair is usually stored within the local machine that connects to the local node. The signing process is performed within the wallet manager associated with the signing account, which is typically the same user that deploys the application. The wallet manager provides a virtual secure enclave to perform the digital signing, so a message signature is generated without the private key ever leaving the wallet. After the signature is generated, it is finally added to the signed transaction instance.


### 3.3. Push Transaction

After the transaction is signed, a packed transaction instance is created from the signed transaction instance and pushed from the application to the local node, which in turn relays the transaction to the active producing nodes for signature verification, execution, and validation. Every producing node that receives a transaction will attempt to execute and validate it in their local context before relaying it to the next producing node. Hence, valid transactions are relayed while invalid ones are dropped. The idea behind this is to prevent bad actors from spamming the network with bogus transactions. The expectation is for bad transactions to get filtered and dropped before reaching the active producer on schedule. When a transaction is received, no assumption is made on its validity. All transactions are validated again by the next producing node, regardless of whether it is producing blocks. The only difference is that the producer on schedule attempts to produce blocks by pushing the transactions it validates into a pending block before pushing the finalized block to its own local chain and relaying it to other nodes.


### 3.4. Verify Transaction

The process to verify a transaction is twofold. First, the public keys associated with the accounts that signed the transaction are recovered from the set of signatures provided in the transaction. Such a recovery is cryptographically possible for ECDSA, the elliptic curve digital signature algorithm used in EOS. Second, the public key of each actor specified in the list of action authorizations (actor:permission) from each action included in the transaction is checked against the set of recovered keys to see if it is satisfied. Third, each satisfied `액터:권한` is checked against the associated minimum permission required for that `배우:계약: :액션` pair to see if it meets or exceeds that minimum. This last check is performed at the action level before any action is executed (see [3.4.2.권한 확인](#342-permission-check)).


#### 3.4.1. Transaction Context

Once the public keys are recovered, a transaction context is created from the transaction instance. The transaction context keeps track of the trace of actions and the action receipt generated as each action is dispatched and executed. All state generated is kept within a transaction trace instance and a list of action receipts. The transaction trace consists of a list of action traces. Each action trace contains information about the executed action, which includes the action receipt, the action instance, whether it is a context-free action, and the transaction ID that generated the action. The action receipt is generated later during transaction execution and finalization.


#### 3.4.2. Permission Check

Since the sequence of actions contained in the transaction must be executed atomically as a whole, the EOS software first checks that the actors specified in each action have the minimum permission required to execute it. To that end, the software checks the following for each action:

*   The named permission of each actor specified in each action instance.
*   The named permission of the corresponding `배우:계약: :액션` pair specified in the smart contract.

If there is at least one actor whose set of named permissions fail to meet the minimum permission level required by the corresponding `배우:계약: :액션` pair in the smart contract, the transaction fails. The reason why action permissions are checked before any action is executed is due to performance. It is more efficient to cancel a transaction with all actions unexecuted, than doing so after a few actions executed, but later were rolled back as a result of a failed action or authorization. Any state changes incurred during a failed action must be undone to preserve data integrity. Database sessions are expensive in terms of memory usage and computing resources. Therefore, undo operations must be minimized as possible.


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

Once the proper action handler is located, the appropriate whitelists and blacklists are checked. If the node is currently producing blocks, the receiver account is checked against the account whitelist and blacklist, if any. The action blacklist is checked next, if any. If the receiver account or the action name are in a blacklist, the action is aborted. If the receiver account is already on the whitelist, the blacklist check is skipped. If all checks pass, the action is finally executed by invoking the corresponding action handler, passing the actor account in the `...에서` parameter and the receiving account in the `에` parameter.


### 3.6. Finalize Transaction

After all actions included in the transaction are executed, the transaction enters the finalization stage. In this step, a corresponding action receipt is produced for each action. The action receipt contains a hash of the corresponding action instance, a few counters used for analytics, and the receiver account to which the action is intended to, if applicable.


#### 3.6.1. Transaction Receipt

After all action receipts are generated for the transaction, a transaction receipt is finally created and pushed into the signed block, along with other transaction receipts included in the block. The transaction receipt summarizes the result of the transaction (executed, unexecuted, failed, deferred, expired, etc.), including the actual amount of CPU billed in microseconds, and the total NET storage used (see `거래_영수증` schema below).

##### transaction_receipt schema

Name | Type | Description
-|-|-
`상태` | `uint8_t` | result of transaction execution attempt
`CPU_USE_USE` | `uint32_t` | total CPU used in microseconds
`순사용량_단어` | `부호없는 정수` | total NET used in 64-bit words
`trx` | `변형이 있습니다` | holds transaction ID or packed transaction

The `상태` field is an 8-bit enumeration type that can hold one of the following results:

* `실행되었습니다` - transaction succeeded, no error handler executed.
* `소프트_페일` - transaction failed, error handler succeeded.
* `하드_페일` - transaction failed, error handler failed.
* `지연되었습니다` - transaction delayed by user for future execution.
* `만료` - transaction expired, CPU/NET refunded to user.

> ℹ️ The `지연되었습니다` status only applies to **delayed user transactions**, that is, explicit user-created transactions that have a delay to satisfy authorizations (see [3.6.3.지연된 사용자 거래](#363-delayed-user-transactions) for more information).

The `trx` field holds the transaction ID or the packed transaction itself. The actual choice depends on the transaction type. Receipts generated from Deferred Transactions and Delayed User Transactions are stored by transaction ID; all other types are stored as packed transactions.

#### 3.6.2. Deferred Transactions

Deferred transactions are generated as a side effect of processing the blockchain, so their state is stored in the chain database, not within a block. Therefore, there is no need to explicitly include their contents in the transaction receipt. All in-sync nodes should be aware of the form of a deferred transaction as a matter of consensus. Deferred transactions issued by a smart contract have no role or effect on the `지연되었습니다` status field of the transaction receipt.

> ⚠ **Warning:**
> Deprecation Notice
> Deferred transactions are deprecated as of EOS 2.0.

#### 3.6.3. Delayed User Transactions

Delayed user transactions contain the packed transactions when they are pushed to the network (at the start of the delay timer). However, unlike regular transactions, they bear a "delayed" status so their execution and validation can be postponed. Later on when they execute/fail/expire (at the end of the delay timer), they only contain the transaction ID. This is because any in-sync node will have the transaction content from a previously broadcast block.


### 3.7. Validate Transaction

A transaction is verified and validated at various stages during its lifecycle: first when it propagates on the peer-to-peer network as a loose transaction (see [3.4.거래 확인](#34-verify-transaction)), then during block validation as the block is confirmed among a supermajority of block producers, and optionally during a blockchain replay if nodeos is configured to fully re-validate transactions during replays. By default, recorded transactions are not completely re-validated during replays since it is assumed that the node operator has established trust in the local block log, either personally or through a side-channel so it is no longer considered a potential source of byzantine information.


#### 3.7.1. Validation Process

When validating a transaction as part of a block, multiple validations occur at various levels. In full block validation, all transactions recorded in the block are replayed and the locally calculated merkle tree root hashes (generated from the transaction receipt data and the action receipt data, respectively) are compared against the `트랜잭션_루트` and `블록 헤더의 action_mroot` 필드.따라서 기록된 트랜잭션이 블록 내에서 변조되면 머클 트리 루트 해시가 불일치를 야기할 뿐만 아니라 트랜잭션 서명도 검증하지 못할 수 있습니다.선의의 블록 생산자가 변조를 수행하지 않았다면 블록 서명의 검증도 실패할 것입니다 (참조 [컨센서스 프로토콜: 5.3.블록 검증](01_consensus-protocol.md#53-block-validation)).
