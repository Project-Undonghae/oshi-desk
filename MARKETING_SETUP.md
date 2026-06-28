# Oshi Desk Marketing Foundation

## GA4 key event

GA4 관리자에서 `download_click` 이벤트를 key event로 지정한다.

권장 커스텀 차원:

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

## Search Console

Google Search Console에 `https://www.oshidesk.com/` 속성을 등록한다.

제출할 사이트맵:

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
