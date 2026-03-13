# IDAS — 서비스 관리 시스템

이 프로젝트는 원본 HTML 파일을 Next.js 웹 애플리케이션으로 변환한 것입니다.

## 시작하기

### 설치

```bash
npm install
```

### 개발 서버 실행

```bash
npm run dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000)을 열어 확인하세요.

### 빌드

```bash
npm run build
```

### 프로덕션 실행

```bash
npm start
```

## 프로젝트 구조

```
idas01/
├── app/                    # Next.js App Router 페이지
│   ├── appointment/        # 예약 관리 페이지
│   ├── checkin/           # 체크인 처리 페이지
│   ├── customer/          # 고객/차량 관리 페이지
│   ├── ro_list/           # RO 관리 페이지
│   ├── vhc/               # VHC 점검 페이지
│   ├── job/               # Job 관리 페이지
│   ├── parts/             # 부품 관리 페이지
│   ├── payment/           # 수납 페이지
│   ├── delivery/          # 출고 페이지
│   ├── survey/            # 후속 관리 페이지
│   └── kpi/               # KPI 대시보드 페이지
├── components/            # React 컴포넌트
│   ├── Header.tsx         # 헤더 컴포넌트
│   ├── Sidebar.tsx        # 사이드바 네비게이션
│   ├── Layout.tsx         # 공통 레이아웃
│   └── Toast.tsx          # 토스트 알림 컴포넌트
├── styles/
│   └── globals.css        # 전역 CSS 스타일
└── package.json           # 프로젝트 의존성
```

## 주요 기능

- ✅ 예약 관리 시스템
- ✅ 체크인 처리
- ✅ RO (Repair Order) 관리
- ✅ VHC 점검
- ✅ Job 관리 (Bay 현황 / Kanban)
- ✅ 부품 관리
- ✅ 수납/출고 처리
- ✅ 후속 관리 (설문, VOC 분석)
- ✅ KPI 대시보드

## 기술 스택

- **Next.js 14** - React 프레임워크
- **TypeScript** - 타입 안정성
- **React Hooks** - 상태 관리
- **CSS Modules** - 스타일링

## 변환 내용

원본 HTML 파일의 다음 요소들이 변환되었습니다:

1. **인라인 CSS** → `styles/globals.css`로 분리
2. **인라인 JavaScript** → React 컴포넌트와 Hooks로 변환
3. **단일 페이지** → Next.js App Router 기반 다중 페이지
4. **Vanilla JS 상태 관리** → React useState/useMemo 사용
5. **DOM 조작** → React 선언적 렌더링

## 추가 개발 가이드

### 새 페이지 추가

1. `app/` 디렉토리에 새 폴더 생성
2. `page.tsx` 파일 생성
3. `Layout` 컴포넌트로 감싸기
4. `Sidebar.tsx`에 네비게이션 항목 추가

### 스타일 수정

`styles/globals.css` 파일에서 CSS 변수와 스타일을 수정할 수 있습니다.

### 데이터 관리

현재는 하드코딩된 데이터를 사용하고 있습니다. 실제 프로젝트에서는:
- API 라우트 추가 (`app/api/`)
- 데이터베이스 연동
- 상태 관리 라이브러리 (Zustand, Redux 등) 사용을 고려하세요.
