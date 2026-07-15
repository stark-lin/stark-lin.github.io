# 11. 随机系统规范

## 11.1 随机层级

~~~text
Seed
├── Room
├── Color Scheme
├── Hero Headline
├── Hero Secondary Line
├── Variable Middle Order
├── Project Order
├── Project Description Variants
├── Section Combination
├── Contact Line
├── Layout Variant
├── Decorative Parameters
└── Motion Parameters
~~~

各层级平行，不互相决定内容语气。

---

## 11.2 确定性

同一 seed 必须得到：

* 相同展厅；
* 相同配色；
* 相同 Hero；
* 相同项目顺序；
* 相同中段顺序，包括 Room Introduction / Exhibition Note 的位置；
* 相同描述版本；
* 相同布局变体；
* 相同装饰参数。

必须避免在组件中直接调用无 seed 的：

~~~js
Math.random()
~~~

---

## 11.3 随机流隔离

推荐为不同系统派生独立随机流。

~~~js
const roomRng = deriveRng(seed, "room");
const copyRng = deriveRng(seed, "copy");
const layoutRng = deriveRng(seed, "layout");
const colorRng = deriveRng(seed, "color");
const motionRng = deriveRng(seed, "motion");
~~~

这样修改某一个内容池时，不会导致所有随机结果重新洗牌。

---

## 11.4 URL 规则

推荐：

~~~text
/?seed=...
~~~

可选：

~~~text
/?seed=...&lang=en
~~~

分享 URL 后必须：

* 重现当前页面；
* 不触发首次提示；
* 保留当前语言；
* 支持浏览器返回；
* 不依赖本地缓存。

---
