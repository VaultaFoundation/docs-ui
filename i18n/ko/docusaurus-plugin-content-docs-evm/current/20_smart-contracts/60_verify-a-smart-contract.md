---
title: 스마트 컨트랙트 확인
---

스마트 계약을 확인하려면 다음 사항을 알아야 합니다.

- 스마트 컨트랙트 주소
- 배포된 컨트랙트를 컴파일할 때 사용한 컴파일러 버전
- EVM 버전
- 스마트 컨트랙트를 위한 솔리디티 플래트닝 소스 코드

## 인증 페이지로 이동

이 URL을 복사하여 바꾸십시오. `SMART_CONTRACT_ADDRESS` 스마트 컨트랙트 주소와 함께:

```
https://explorer.evm.eosnetwork.com/address/SMART_CONTRACT_ADDRESS/verify-via-flattened-code/new
```

브라우저에 붙여넣으면 다음 페이지가 표시됩니다.

![verify smart contract](/images/verify_contract.png)

## 인증 프로세스 완료

1.모든 필드 작성
3.솔리디티 컨트랙트 (평면화, 임포트 없는 단일 파일) 소스 코드를 복사하여 붙여넣기
4.클릭 `Verify & Push` 단추
