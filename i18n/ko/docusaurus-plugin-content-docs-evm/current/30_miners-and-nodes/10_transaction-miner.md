---
title: 트랜잭션 마이너
--- 

EOS EVM 트랜잭션 마이너는 이더리움 형식의 트랜잭션을 처리할 수 있는 간단한 트랜잭션 릴레이입니다. 
EOS 네이티브 노드의 EOS EVM 계약으로 푸시하십시오. 


## 마이너 계정

**마이너 계정**으로 사용할 EOS 네트워크 계정이 필요합니다. 

EOS EVM Miner 소프트웨어는 수신한 EVM 트랜잭션을 가져와서 EOS 트랜잭션으로 변환한 다음 전송합니다. 
에 `eosio.evm` 네이티브 EOS 네트워크에서의 계약. 

이러한 거래의 중계자로서 귀하는 귀하가 제공하는 서비스에 대한 보상을 받을 수 있습니다.

### 마이너 및 리소스

마이너 계정이 트랜잭션을 중계함에 따라 CPU와 NET 리소스가 서서히 고갈될 것입니다.이러한 사항을 관리해야 합니다.
채굴자가 계속 운영할 수 있도록 하는 리소스

PowerUp과 같은 서비스는 채굴자 계정이 계속 운영될 수 있는 충분한 리소스를 확보할 수 있도록 자동화되어야 합니다. 
중단 없이.

> ❔ **RAM은 필요하지 않습니다**
> 
> 마이너 계정은 트랜잭션을 중계하기 때문에 RAM 리소스를 고갈시키지 않습니다.CPU 및 NET 리소스만 사용합니다.
> 더 `eosio.evm` 계약은 EVM 거래에서 징수하는 수수료를 통해 EOS EVM이 사용하는 RAM에 대해 지불합니다.

### 마이너 등록

마이너 계정이 있으면 마이너 계정에 등록해야 합니다. `eosio.evm` 계약.

```bash
cleos -u https://eos.greymass.com/ push action eosio.evm open '["<your-miner-account>"]' -p <your-miner-account>
```

웹 인터페이스를 사용하여 등록하려면 다음 사이트를 방문하십시오. [bloks.io](https://bloks.io/account/eosio.evm?loadContract=true&tab=Actions&account=eosio.evm&scope=eosio.evm&limit=100&action=open)
다음과 같은 지갑을 사용하여 거래에 서명합니다. [앵커](https://www.greymass.com/anchor).

### 채굴 보상 보기

더 `eosio.evm` 계약서에는 채굴을 통해 얻은 보상이 테이블에 저장됩니다.이러한 보상은 다음과 같이 언제든지 확인할 수 있습니다.
컨트랙트에서 테이블 행 가져오기 `balances` 마이너 계정에 상한과 하한이 설정된 테이블:

```bash
cleos -u https://eos.greymass.com/ get table eosio.evm eosio.evm balances -U <your-miner-account> -L <your-miner-account>
```

동일한 데이터를 다음에서도 볼 수 있습니다. [bloks.io](https://bloks.io/account/eosio.evm?loadContract=true&tab=Tables&account=eosio.evm&scope=eosio.evm&limit=100&table=balances)


### 채굴 보상 인출

더 `eosio.evm` 계약서에는 채굴을 통해 얻은 보상이 테이블에 저장됩니다.이러한 리워드는 언제든지 인출할 수 있습니다.
에 트랜잭션을 보내는 데 걸리는 시간 `eosio.evm` 다음과 같은 조치를 취하는 계약:

```bash
cleos -u https://eos.greymass.com/ push action eosio.evm withdraw '["<your-miner-account>", "1.0000 EOS"]' -p <your-miner-account>
```

웹 인터페이스를 사용하여 소유권을 주장하려면 다음 사이트를 방문하십시오. [bloks.io](https://bloks.io/account/eosio.evm?loadContract=true&tab=Actions&account=eosio.evm&scope=eosio.evm&limit=100&table=balances&action=withdraw)
다음과 같은 지갑을 사용하여 거래에 서명합니다. [앵커](https://www.greymass.com/anchor).


## 마이너 설정

### 설치

가지고 있는지 확인하십시오 `node` 컴퓨터에 설치되었습니다. 

권장 버전은 다음과 같습니다. [`18.16.0`](https://nodejs.org/en/download), 최소 버전은 `16.16.0`.

#### GitHub에서 마이너를 가져와 모든 종속성을 설치합니다.

```bash
git clone https://github.com/eosnetworkfoundation/eos-evm-miner.git
cd eos-evm-miner
yarn
```

#### 환경 변수도 설정해야 합니다.
복사하기 `.env.example` 파일 대상 `.env` 그리고 환경 변수를 채웁니다.

| 이름 | 설명 | 기본값 |
| --- |-------------------------------------------------------------------------------------------------------------------|---------|
| `PRIVATE_KEY` | 마이너 계정의 개인 키 | |
| `MINER_ACCOUNT` | EOS 네트워크의 마이너 계정 이름 | |
| `RPC_ENDPOINTS` | 연결할 EOS RPC 엔드포인트 목록 (쉼표로 구분) | |
| `PORT` | 들어오는 이더리움 거래를 수신하는 포트 | `50305` |
| `LOCK_GAS_PRICE` | 로 설정된 경우 `true`, 일단 가스 가격이 설정되면, 이 마이너는 새로운 가스 가격을 가져오기 위해 EOS API 노드를 다시 방문하지 않을 것입니다 | `true`  |




### 마이닝 시작

```bash
yarn mine
```

> 📄 **로그**:
> 
> A `logs` 디렉토리는 두 개의 로그 파일이 있는 프로젝트 루트에 생성됩니다.
> - **error.log**: 오류 로그만
> - **통합 로그**: 기타 모든 것





