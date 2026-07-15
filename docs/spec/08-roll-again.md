# 8. Roll Again 规范

## 8.1 位置

Roll Again 永远位于 Contact 后面，并且是页面最后一个主要 section。

它是页面核心反转，而不是普通导航按钮。

用户动线：

~~~text
完成个人主页浏览
↓
发现当前页面只是一个版本
↓
点击 Roll Again
↓
进入另一个展厅
~~~

Room Introduction / Exhibition Note 属于可变中段，不得排在 Roll Again 之后。

---

## 8.2 功能

Roll Again 必须同时完成：

* 生成新 seed；
* 选择新展厅；
* 选择新配色；
* 选择新 Hero 文案；
* 重排可变中段，包括 Archive 与 Room Introduction / Exhibition Note；
* 选择项目描述；
* 更新布局参数；
* 更新 URL；
* 返回 Hero；
* 允许浏览器前进后退。

---

## 8.3 文案

必须保留明确功能说明。

推荐结构：

~~~text
ROLL AGAIN
Generate another version
~~~

主标签可风格化，例如：

* Another Room；
* Reassemble；
* Recompose；
* New Configuration；
* Regenerate；
* Resample；
* Rebuild；
* Enter Another Room。

辅助说明必须始终清楚。

---

## 8.4 行为

点击后：

1. 生成新 seed；
2. 更新 URL；
3. 重新生成页面状态；
4. 重置局部交互状态；
5. 将滚动位置移动到顶部；
6. 恢复 Hero 初始展示；
7. 不整页闪白；
8. 不出现长时间加载。

允许使用页面刷新，也允许客户端重新渲染，但结果必须一致。

---

## 8.5 防止重复

新 seed 可以允许偶然重复某些参数，但应尽量避免连续两次得到完全相同的展厅。

推荐：

~~~js
if (nextRoom === currentRoom) {
  nextRoom = pickAnotherRoom();
}
~~~

不要求所有内容都必须变化。

例如新版本可能：

* 展厅不同但 Hero 文案相同；
* 配色不同但项目顺序相同；
* 项目顺序不同但项目描述相同。

这种局部重复是正常的。

---
