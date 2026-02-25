# Marquee 컴포넌트


## 개요


`Marquee.jsx`는 텍스트 항목들을 무한 반복으로 수평 스크롤하는 마르키(흘러가는 배너) 컴포넌트입니다. GSAP 애니메이션 라이브러리를 활용하여 부드러운 루프 애니메이션을 구현하며, 마우스 휠 이벤트에 반응하여 스크롤 속도가 동적으로 변합니다.


---


## 사용 라이브러리


| 라이브러리 | 용도 |
|---|---|
| `gsap` | 타임라인 기반 애니메이션 엔진 |
| `gsap/Observer` | 마우스 휠 이벤트 감지 |
| `@iconify/react` | 아이콘 렌더링 |
| `react` (`useEffect`, `useRef`) | 컴포넌트 생명주기 및 DOM 참조 |


---


## Props


| Props | 타입 | 기본값 | 설명 |
|---|---|---|---|
| `items` | `string[]` | (필수) | 마르키에 표시할 텍스트 항목 배열 |
| `className` | `string` | `'text-white bg-black'` | 컨테이너에 적용할 Tailwind 클래스 |
| `icon` | `string` | `'mdi:star-four-points'` | 각 항목 사이에 표시할 Iconify 아이콘 이름 |
| `iconClassName` | `string` | `''` | 아이콘에 적용할 추가 클래스 |
| `reverse` | `boolean` | `false` | `true`이면 반대 방향(오른쪽→왼쪽)으로 스크롤 |


---


## 주요 내부 함수


### `horizontalLoop(items, config)`


GSAP 기반의 무한 수평 루프 애니메이션을 생성하는 핵심 함수입니다.


**동작 원리:**


1. **위치 계산**: 각 아이템의 `offsetLeft`, `width`, `xPercent`를 측정하여 전체 너비(`totalWidth`)를 산출합니다.
2. **타임라인 구성**: 각 아이템에 대해 두 가지 트윈을 등록합니다.
   - 현재 위치에서 루프 시작점까지 이동 (`.to`)
   - 루프 끝 지점에서 원래 위치로 복귀 (`.fromTo`)
3. **루프 완성**: `tl.progress(1, true).progress(0, true)`로 사전 렌더링하여 성능을 최적화합니다.


**반환 타임라인 메서드:**


| 메서드 | 설명 |
|---|---|
| `tl.next(vars)` | 다음 아이템으로 이동 |
| `tl.previous(vars)` | 이전 아이템으로 이동 |
| `tl.current()` | 현재 인덱스 반환 |
| `tl.toIndex(index, vars)` | 특정 인덱스로 이동 |


**config 옵션:**


| 옵션 | 설명 |
|---|---|
| `repeat` | 반복 횟수 (`-1`이면 무한 반복) |
| `speed` | 스크롤 속도 (기본값: `1`, px/100ms 기준) |
| `paddingRight` | 아이템 간 우측 여백 |
| `reversed` | 역방향 시작 여부 |
| `paused` | 일시정지 상태로 시작 여부 |
| `snap` | 스냅 단위 (`false`이면 비활성화) |


---


## useEffect 동작 흐름


```
컴포넌트 마운트
  └─ horizontalLoop() 호출 → GSAP 타임라인 생성 (repeat: -1, 무한 루프)
       └─ Observer.create() 호출 → 마우스 휠 감지 시작
            └─ onChangeY: 휠 방향에 따라 timeScale을 조절
                 ├─ 순방향 휠 아래: 정방향 가속 (factor = +2.5)
                 └─ 역방향 휠: factor *= -1 (반대 방향 가속)
컴포넌트 언마운트
  └─ tl.kill() → 타임라인 정리
```


### 마우스 휠 인터랙션 상세


마우스 휠 스크롤 시 `timeScale`을 순간적으로 높였다가 서서히 복원합니다.


```
0s      0.2s     0.5s     1.5s
|──────|────────────────────|
timeScale: factor*2.5 → factor/2.5
(급가속 후 감속)
```


- `factor = 2.5` (기본)
- 역방향 스크롤이면 `factor *= -1` 적용


---


## 렌더 구조


```jsx
<div (컨테이너, overflow-hidden, flex)>
  <div (flex 래퍼)>
    {items.map((text) => (
      <span (px-16, gap-x-32)>
        {text}  <Icon />
      </span>
    ))}
  </div>
</div>
```


- 컨테이너: `h-20 md:h-[100px]`, `whitespace-nowrap`으로 줄바꿈 방지
- 각 `<span>`은 `ref`로 등록되어 GSAP 애니메이션 대상이 됨
- 텍스트와 아이콘이 쌍으로 구성됨


---


## 사용 예시


```jsx
<Marquee
  items={['React', 'GSAP', 'Tailwind', 'Vite']}
  className="text-black bg-yellow-400"
  icon="mdi:star-four-points"
  iconClassName="text-xl"
  reverse={false}
/>
```


```jsx
// 반대 방향으로 스크롤
<Marquee
  items={['Design', 'Motion', 'Creative']}
  reverse={true}
/>
```


---


## 주의사항


- `items` 배열이 변경되거나 `reverse`가 변경되면 `useEffect`가 재실행되며 새 타임라인이 생성됩니다.
- `Observer`는 전역으로 등록되므로, 여러 `Marquee` 컴포넌트가 동시에 존재할 경우 모두 반응합니다.
- 컴포넌트 언마운트 시 `tl.kill()`로 메모리 누수를 방지합니다.




