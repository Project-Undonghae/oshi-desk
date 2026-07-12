# Oshi Desk Marketing Foundation

## GA4 key event

GA4 관리자에서 `download_click` 이벤트를 key event로 지정한다.

권장 커스텀 차원:

- `product` (`mini` 또는 `pet`)
- `character`
- `platform`
- `character_label`
- `platform_label`
- `file_name`
- `file_extension`
- `utm_source`
- `utm_medium`
- `utm_campaign`
- `utm_content`
- `utm_term`
- `referrer_host`

Mini/Pet 다운로드 확인 방법:

1. GA4 관리자 → 데이터 표시 → 맞춤 정의에서 이벤트 범위 커스텀 차원 `product`를 등록한다.
2. GA4 탐색 → 자유 형식에서 행에 `product`, 값에 `이벤트 수`를 추가한다.
3. 필터를 `이벤트 이름 = download_click`로 설정한다.

실시간 검증은 GA4 DebugView 또는 실시간 보고서에서 `download_click` 이벤트의 `product`, `character`, `platform` 값을 확인한다.

## Search Console

Google Search Console에 `https://www.oshidesk.com/` 속성을 등록한다.

제출할 사이트맵:

```text
https://www.oshidesk.com/sitemap.xml
```

## Bing Webmaster Tools

Bing Webmaster Tools에 `https://www.oshidesk.com/` 사이트를 추가하고 소유권을 확인한다.

권장 순서:

1. Google Search Console에 먼저 등록되어 있다면 Bing의 Google Search Console 가져오기를 사용한다.
2. 가져오기가 어렵다면 HTML 메타 태그 또는 DNS 레코드 방식으로 소유권을 확인한다.
3. 사이트맵 메뉴에서 아래 URL을 제출한다.

```text
https://www.oshidesk.com/sitemap.xml
```

## Naver Search Advisor

네이버 서치어드바이저 웹마스터 도구에 `https://www.oshidesk.com/` 사이트를 등록하고 소유확인을 진행한다.

권장 순서:

1. HTML 파일 업로드 또는 HTML 메타 태그 방식으로 사이트 소유확인을 한다.
2. 사이트맵 제출 메뉴에서 아래 URL을 제출한다.
3. robots.txt 검증 메뉴에서 `Yeti` 접근이 허용되는지 확인한다.

```text
https://www.oshidesk.com/sitemap.xml
```

확인할 공개 URL:

```text
https://www.oshidesk.com/robots.txt
https://www.oshidesk.com/sitemap.xml
```

## UTM rules

캠페인 이름은 소문자, 숫자, 언더스코어만 사용한다.

형식:

```text
https://www.oshidesk.com/?utm_source={source}&utm_medium={medium}&utm_campaign={campaign}&utm_content={content}
```

권장 source:

- `x`
- `discord`
- `community`
- `github`
- `friend`

권장 medium:

- `social`
- `community`
- `release`
- `dm`
- `referral`

런칭 예시:

```text
https://www.oshidesk.com/?utm_source=x&utm_medium=social&utm_campaign=launch_v024&utm_content=main_post
https://www.oshidesk.com/?utm_source=community&utm_medium=community&utm_campaign=launch_v024&utm_content=hebi_post
https://www.oshidesk.com/?utm_source=github&utm_medium=release&utm_campaign=launch_v024&utm_content=release_notes
```

캐릭터별로 소재를 나눌 때:

```text
https://www.oshidesk.com/?utm_source=x&utm_medium=social&utm_campaign=launch_v024&utm_content=hebi
https://www.oshidesk.com/?utm_source=x&utm_medium=social&utm_campaign=launch_v024&utm_content=isha
```
