# github api 对接遇到的问题整理

## rate limt 问题

简单讲：直接调 github 接口的时候，会返回：

```json
{
    "message":"API rate limit exceeded for xxx.xxx.xxx.xxx. (But here's the good news: Authenticated requests get a higher rate limit. Check out the documentation for more details.)",
    "documentation_url":"https://docs.github.com/rest/overview/resources-in-the-rest-api#rate-limiting"
}
```

遂直接加 token 请求，能返回期望的数据。

增加 token 之后，可享受 5000 请求/小时 的限制。

[了解速率限制规则](https://docs.github.com/cn/rest/overview/resources-in-the-rest-api#rate-limiting)

[获取当前的速率限制状态](https://docs.github.com/cn/rest/reference/rate-limit)

[生成 token 地址](https://github.com/settings/tokens)

**以后的任何请求，都需要携带这个 token，且这个 token 自带用户信息。**

## 获取当前用户的 starrd 项目列表

[/user](https://docs.github.com/cn/rest/reference/users#get-the-authenticated-user) 会返回当前用户的详细信息。**starred_url** 字段就是或许用户 starred 列表的信息。

## 获取个人 starred 项目列表

github 的查询接口默认进行分页，默认每页返回 30 天数据，最多支持 100 条数据。有关分页的信息包含在 request.header.link 中。根据总页数和每夜多少条，可以推算出 starred 项目的总数。

```
<https://api.github.com/search/code?q=addClass+user%3Amozilla&page=2>; rel="next",
<https://api.github.com/search/code?q=addClass+user%3Amozilla&page=34>; rel="last"
```

[分页文档](https://docs.github.com/cn/rest/guides/traversing-with-pagination)
