# TOPIK 96회 문항 적합성 설문 (VN)

GitHub Pages로 배포하는 설문 페이지. 제출 응답은 Google Sheets에 한 행씩 저장됩니다.

```
index.html            설문 페이지 (GitHub Pages 진입점)
apps-script/Code.gs   구글 시트 저장용 Apps Script
```

## 1. 구글 시트 + Apps Script (약 5분)

1. Google Drive → 새 **스프레드시트** 생성 (예: `TOPIK83_VN_응답`)
2. 메뉴 **확장 프로그램 → Apps Script**
3. 기본 코드 삭제 → `apps-script/Code.gs` 내용 전체 붙여넣기 → 저장
4. 함수 선택 드롭다운에서 `setup` 선택 → **실행** → 권한 승인
   (“확인되지 않은 앱” 경고 → 고급 → 이동 → 허용). 시트에 `responses` 탭과 헤더가 생성됨
5. 오른쪽 위 **배포 → 새 배포** → 유형: **웹 앱**
   - 다음 사용자로 실행: **나**
   - 액세스 권한: **모든 사용자** ← 반드시 이 값이어야 익명 응답자가 제출 가능
6. **배포** → 나오는 **웹 앱 URL**(`https://script.google.com/macros/s/…/exec`) 복사
7. `index.html`에서 `PASTE_YOUR_APPS_SCRIPT_URL_HERE`를 복사한 URL로 교체

> 확인: 웹 앱 URL을 브라우저에서 열면 `OK - TOPIK survey endpoint is running` 표시

> Code.gs를 수정한 경우: **배포 → 배포 관리 → 편집(연필) → 버전: 새 버전 → 배포**.
> 새 배포를 만들면 URL이 바뀌므로 index.html도 같이 바꿔야 함.

## 2. GitHub Pages 배포

1. GitHub에서 **New repository** (예: `topik-survey`, Public)
2. **Add file → Upload files** → `index.html`, `README.md`, `apps-script` 폴더 업로드 → Commit
3. **Settings → Pages** → Source: `Deploy from a branch`, Branch: `main` / `/ (root)` → Save
4. 1~2분 후 `https://<계정명>.github.io/topik-survey/` 로 접속 → 이 링크를 응답자에게 공유

※ GitHub Pages(무료 계정)는 Public 저장소만 가능. 설문 HTML만 공개되고 **응답 데이터는 구글 시트에만 저장**되므로 저장소에는 개인정보가 올라가지 않습니다.

## 3. 테스트

1. Pages 링크에서 25문항 모두 응답 + 동의 체크 → 제출
2. 구글 시트 `responses` 탭에 행 추가 확인 (수 초 소요)
3. 테스트 행 삭제 후 링크 배포

## 시트 컬럼

`timestamp, p_name, p_phone, p_email, consent, info1~info4, q1, reason1 … q25, reason25, exp1~exp5, user_agent`

- `q1~q25`: 1~4점 척도 (1·2점 선택 시 `reasonN`에 사유)
- `info3`: TOPIK 응시 회차 등 자유 입력

## 참고

- 응답 전송 실패(네트워크 오류) 시 응답자 PC에 CSV 백업이 자동 다운로드됨
- 개인정보(이름·전화·이메일) 동의 체크 없이 제출 불가
- 시트는 비공개 유지 권장 (공유 시 개인정보 열람 범위 주의). 연구 종료 후 개인정보 열 삭제
