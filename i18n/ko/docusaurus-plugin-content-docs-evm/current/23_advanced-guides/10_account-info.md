---
title: 토큰 및 내역 목록
---

계정에 대한 토큰 잔고 및 거래 내역 목록을 가져와야 하는 경우가 있습니다.일반적인 사용 사례입니다. 
다양한 블록체인 애플리케이션에 적합합니다. 

우리는 사용합니다 [`블록스카우트`](https://docs.blockscout.com/) 사용할 수 있는 다양한 API가 있는 탐색기로서
블록체인에 대한 다양한 정보를 얻을 수 있습니다.

## 당사의 호스팅 서버

이러한 모든 API에 대해 당사의 호스팅 서버를 사용할 수 있습니다. 

```
MAINNET:
https://explorer.evm.eosnetwork.com/

TESTNET:
https://explorer.testnet.evm.eosnetwork.com/
```

## 토큰 잔고 가져오기

계정의 토큰 잔고 목록을 가져오려면 계정 모듈 API를 사용할 수 있습니다. `tokenlist` 끝점.


```
/api?module=account&action=tokenlist&address={address}
```

이 엔드포인트에 대한 자세한 내용은 을 참조하십시오. [블록스카우트 문서](https://docs.blockscout.com/for-users/api/rpc-endpoints/account#get-list-of-tokens-owned-by-address).

## 거래 내역 가져오기

계정에 대한 거래 목록을 가져오려면 계정 모듈 API를 사용할 수 있습니다. `txlist` 끝점.

```
/api?module=account&action=txlist&address={address}&startblock=555555&endblock=666666&page=1&offset=5&sort=asc
```

이 엔드포인트에 대한 자세한 내용은 을 참조하십시오. [블록스카우트 문서](https://docs.blockscout.com/for-users/api/rpc-endpoints/account#get-transactions-by-address).
