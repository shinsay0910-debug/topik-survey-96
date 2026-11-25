/**
 * TOPIK 96회 설문(VN) → Google Sheets 저장용 Apps Script
 * 사용법: 응답 받을 구글 시트에서 [확장 프로그램 > Apps Script] 열고 이 코드 전체 붙여넣기 → 웹 앱으로 배포
 */
const SHEET_NAME = 'responses';

const FIELDS = ['p_name','p_phone','p_email','consent','info1','info2','info3','info4']
  .concat(Array.from({length: 25}, (_, i) => ['q' + (i + 1), 'reason' + (i + 1)]).flat())
  .concat(['exp1','exp2','exp3','exp4','exp5','user_agent']);

function getSheet_() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sh = ss.getSheetByName(SHEET_NAME);
  if (!sh) sh = ss.insertSheet(SHEET_NAME);
  if (sh.getLastRow() === 0) {
    sh.appendRow(['timestamp'].concat(FIELDS));
    sh.setFrozenRows(1);
    sh.getRange(1, 1, 1, FIELDS.length + 1).setFontWeight('bold');
  }
  return sh;
}

function doPost(e) {
  const lock = LockService.getScriptLock();
  lock.waitLock(20000); // 동시 제출 시 행 덮어쓰기 방지
  try {
    const data = JSON.parse(e.postData.contents);
    const row = [new Date()].concat(FIELDS.map(k => {
      const v = data[k] == null ? '' : String(data[k]);
      return /^[=+\-@]/.test(v) ? "'" + v : v; // 수식 주입 방지
    }));
    getSheet_().appendRow(row);
    return ContentService.createTextOutput(JSON.stringify({ok: true}))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({ok: false, error: String(err)}))
      .setMimeType(ContentService.MimeType.JSON);
  } finally {
    lock.releaseLock();
  }
}

// 배포 URL 동작 확인용 (브라우저로 열면 OK 표시)
function doGet() {
  return ContentService.createTextOutput('OK - TOPIK survey endpoint is running');
}

// 편집기에서 한 번 실행 → 권한 승인 + 헤더 생성
function setup() {
  getSheet_();
}
