# 异常事件信息分级上报管理平台

> 异常事件信息分级上报管理平台


## 开发模式
> npm start

## 编译
> npm run build

## 编译+部署
> npm run deploy
 
## 分析包大小
> npm run anany

## 测试
> npm test

### 更新测试快照
> umi test -u

## 代码规范分析

> npm run lint:js

> npm run lint:style
 
## 代码提交 

提交时会进行校验，如果校验失败需要强制提交时：

> git commit --no-verify -m "移除控制台所有warning信息"
## 数据库层初始化
 

## 新增页面

> npm run add pagename

会自动增加一个pagename的页面，（需要手动到 config/routes.ts 中指定路由）
------
 
## 参考文档

需要了解的一些前置知识：

[react](https://zh-hans.reactjs.org/)

[ES6](http://es6.ruanyifeng.com/)

[umi js](https://umijs.org/zh-CN/docs/getting-started)

[react-use 文档](https://github.com/zenghongtu/react-use-chinese/blob/master/docs/useFullscreen.md)

[Typescript](https://www.typescriptlang.org/index.html)

## 富文本编辑器

braft editor:[https://braft.margox.cn/](https://braft.margox.cn/)

# 单元测试资料

[jest](https://jestjs.io/) 

[react-testing-library](https://github.com/testing-library/react-testing-library)

[test-renderer](https://zh-hans.reactjs.org/docs/test-renderer.html)
 
 ---

 # todo

## 需要单独处理的复杂API 

- [ x ] 1.腾讯通RTX用户列表

```js
// 全局配置rtx xml文件
let rtxUrl = 'http://10.8.1.25:100/rtx/rtx_CDYC.xml';
```

> http://10.8.1.27:4040/api/rtx?username[]=李宾&username[]=王菠

```json
{
  "rows": 0,
  "data": [
    {
      "username": "李宾",
      "uid": "54002780",
      "rtxid": "10654"
    },
    {
      "username": "王菠",
      "uid": "54002697",
      "rtxid": "11179"
    }
  ],
  "header": ["uid", "username", "rtxid"],
  "title": "用户 uid 信息查询",
  "source": "腾讯通 RTX 服务"
}
```
（1）将腾讯通服务器中对应的xml文件以http服务的形式对外暴露，通过 10.8.1.27 解析还原成rtx用户列表；

原系统中部署的结果：

> 部门： http://10.8.2.111:8012/OrgstructFile/Orgstruct_0.xml

> 人员： http://10.8.2.111:8012/OrgstructFile/UserList_0.xml

[!img]("./public/demo/rtx.png")

```js

// 处理完毕的公共接口：http://10.8.1.25:100/39/rtxusers/5.json
// mock数据： /mock/rtxuser.json
// 被代理的接口： http://10.8.1.27:4040/api/rtx/users
```

（2）打开系统后，自动载入用户列表，在@操作中从人员列表中搜索，如 @张 过滤出 【 @张三 】  【 @张三丰 】等人员信息；

---

- [ x ] 2.中文分词接口

https://github.com/fxsjy/jieba

https://github.com/yanyiwu/nodejieba

（1）以node/python做中文分词后端；

（2）用于文章标题分词，提取关键词

---

- [ ] 3.任务调度

对于设定了时间的任务，在指定时间发送消息推送，此时需要处理任务的触发操作，其中已发送/超过时间的任务不处理；

https://github.com/node-schedule/node-schedule

支持指定时间：

```js
const schedule = require('node-schedule');
const date = new Date(2012, 11, 21, 5, 30, 0);

const job = schedule.scheduleJob(date, function(){
  console.log('The world is going to end today.');
});
```

CRON表达式。

```
*    *    *    *    *    *
┬    ┬    ┬    ┬    ┬    ┬
│    │    │    │    │    │
│    │    │    │    │    └ day of week (0 - 7) (0 or 7 is Sun)
│    │    │    │    └───── month (1 - 12)
│    │    │    └────────── day of month (1 - 31)
│    │    └─────────────── hour (0 - 23)
│    └──────────────────── minute (0 - 59)
└───────────────────────── second (0 - 59, OPTIONAL)
```


```js
const schedule = require('node-schedule');

const job = schedule.scheduleJob('42 * * * *', function(){
  console.log('The answer to life, the universe, and everything!');
});
```

手工指定时间：
```js
const rule = new schedule.RecurrenceRule();
rule.dayOfWeek = [0, new schedule.Range(4, 6)];
rule.hour = 17;
rule.minute = 0;

const job = schedule.scheduleJob(rule, function(){
  console.log('Today is recognized by Rebecca Black!');
});
``` 
> Tips 
```
Unsupported Cron Features

Currently, W (nearest weekday) and L (last day of month/week) are not supported. Most other features supported by popular cron implementations should work just fine, including # (nth weekday of the month).

cron-parser is used to parse crontab instructions.
```
---

https://github.com/kelektiv/node-cron 未提示使用限制


--
任务的手动停止；

任务执行日志显示；

~~分布式~~

任务必须触发

Node-mail发送邮件

RTX消息只推送在线人员；全部人员推送


---

Egg.js的定时任务：https://eggjs.org/zh-cn/basics/schedule.html

---


- [ x ] 4.mock数据

根据质量平台上的内容，提供mock数据，如文章列表，文章评论信息。


---

#  DROP TRIGGER Statement

https://dev.mysql.com/doc/refman/8.0/en/drop-trigger.html

```sql 
DROP TRIGGER [IF EXISTS] [schema_name.]trigger_name
```