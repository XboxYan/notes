---
title: CSS3 中关于 *-of-type 和 *-child的差异性及适用场景
date: 2019-05-16 18:58:39
tags: [css3]
published: true
hideInList: false
feature: /post-images/css3-of-type-child.jpg
---
CSS3 中有很多表示元素序号的选择器，有以下几种

`:first-child`、`:first-of-type`、`:last-of-type`、`:only-of-type`、`:only-child`、`:nth-child(n)`、`:nth-last-child(n)`、`:nth-of-type(n)`、`:nth-last-of-type(n)`、`:last-child`

<!-- more -->

初学者可能会比较容易混淆，这里我可以分一下类

|***-of-type**|***-child**|
|---|---|
|`:first-of-type`|`:first-child`|
|`:last-of-type`|`:last-child`|
|`:nth-of-type(n)`|`:nth-child(n)`|
|`:nth-last-of-type(n)`|`:nth-last-child(n)`|
|`:only-of-type`|`:only-child`|

可以看出完全是一一对应，相信CSS开发者都对这些选择器的功能有个大致印象，比如`first-*`表示第一个，`nth-*`表示第几个，`nth-last-*`表示倒数第几个...

## *-of-type 和 *-child

那么，***-of-type**和***-child** 到底有什么区别呢？

从字面上来看，其实就是`type`和`child`的区别，也就是说

**`type`表示类型，一类元素，比如都是`p`元素或者`div`元素**

**`child`表示子元素，没有什么限制**

这样描述可能不直观，下面列举一个实例来说明

## :first-of-type 和 :first-child

```html
<div>
	<h1 class="h1">标题1</h1>
	<h1  class="h2">标题2</h1>
	<p class="p1">段落1</p>
	<p class="p2">段落2</p>
</div>
```

这里写了一个交互实例，可以随时比较各个选择器的结果

<p class="codepen" data-height="622" data-theme-id="34022" data-default-tab="html,result" data-user="xboxyan" data-slug-hash="dEvxPr" style="height: 622px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;" data-pen-title="css3 选择器:first-of-type 和:first-child">
  <span>See the Pen <a href="https://codepen.io/xboxyan/pen/dEvxPr/">
  css3 选择器:first-of-type 和:first-child</a> by XboxYan (<a href="https://codepen.io/xboxyan">@xboxyan</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://static.codepen.io/assets/embed/ei.js"></script>

下面是各种选择的结果

1. `div :first-of-type`可以选中 *标题1* 和 *段落1*

1. `div h1:first-of-type`可以选中 *标题1*

1. `div p:first-of-type`可以选中 *段落1*

1. `div .h1:first-of-type` 可以选中 *标题1*

1. `div .h2:first-of-type` 未匹配

1. `div :first-child` 可以选中 *标题1*

1. `div p:first-child` 未匹配

1. `div h1:first-child`  `可以选中 *标题1*

1. `div .h1:first-child`  `可以选中 *标题1*

1. `div .h2:first-child`  未匹配

这里有个容易出错的地方，比如`div .h2:first-of-type`，很多人以为会选择到第一个class为`.h2`的元素，其实不是的，这里可以这么来理解：

**首先，`div .h2:first-of-type`会查找`.h2`类名所对应的元素，这里是`h1`元素，所以`:first-of-type`会匹配第一个`h1`元素，也就是说，这里的class类名只是找到对应元素类型的作用。接下来结合起来看，第一个`h1`的元素的class并不是`.h2`，所以就无法匹配到。**

**同样，`div p:first-child`也是同样的道理，`:first-child`会首先找第一个元素，然后发现第一个元素并不是`p`元素，所以也匹配不到**

由此可见，我们在用`:first-of-type`时，其实只需要带上标签名就可以了，比如`div p:first-of-type`，根本不需要带上类名，如果不加标签名，那么会选择每种类型元素的第一个（示例1）

而用`:first-child`时，根本不需要带上任何标识，因为始终会匹配到第一个元素，否则加上别的条件就匹配不到了（当然特殊需求除外）。

那么，如果想实现上述第一个`.h2`该如何实现呢，很可惜，这些方式不能满足，你只能通过其他方式来完成，比如`~`选择器

```html
<div>
	<h1 class="h1">标题1</h1>
	<h1  class="h2">标题2</h1>
	<h1  class="h2">标题2</h1>
	<p class="p1">段落1</p>
	<p class="p2">段落2</p>
</div>
```

这种情况下，如何选择到第一个`h1.h2`呢?

---

思考一下...

---

直接给答案

```css
.h2{ 
  outline:2px solid red;
}
.h2~.h2{
  outline:0;
}
```

意思就是先选中所有的`.h2`，然后排除掉兄弟节点的其他`.h2`

<p class="codepen" data-height="379" data-theme-id="34022" data-default-tab="html,result" data-user="xboxyan" data-slug-hash="GamPQJ" style="height: 379px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;" data-pen-title="css 选择器">
  <span>See the Pen <a href="https://codepen.io/xboxyan/pen/GamPQJ/">
  css 选择器</a> by XboxYan (<a href="https://codepen.io/xboxyan">@xboxyan</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://static.codepen.io/assets/embed/ei.js"></script>

理解上面几种选择器的规则，那么下面几类都是一样的了

## :last-of-type和:last-child

这与`:first-of-type` 和 `:first-child`用法完全一致，表示最后一个，这里不做多讲解

有一点注意的是，`:first-child`是CSS2的范畴，意味着在IE8也能使用，而`last-child`是CSS3的规范，在同时都能满足需求时，如果需要更好的兼容性，建议使用`:first-child`。

一个很常见的场景，比如一个列表，列表的每一项都一条分割线，我们可以使用`border`来模拟，那么是上边框还是下边框呢，都可以满足需求

```css
li{
	***
	border-top:1px solid;
}
li:first-child{
	border-top:0;
}
```

显然，使用上边框结合`:first-child`兼容性更好。

## :nth-of-type(n)和:nth-child(n)

这类选择器主要是选择第n个元素，跟元素序号有关，注意这里的起始序号为1（和js略微不同）

`n`可以是数字、关键词或公式。

比如说`p:nth-of-type(1)`表示每个父级下第一个`p`元素，等同于`p:first-of-type`

关键词可以选择`odd`和`even`，分别表示奇数和偶数，常见场景就是表格

```css
tr:nth-child(odd){
	background:#ff0000;
}
tr:nth-child(even){
	background:#0000ff;
}
```

`n`还可以使用公式`an + b`，常见场景是选择周期性的元素

```css
p:nth-child(3n+0){
	background:#ff0000;
}
```

## `:nth-last-of-type(n)`和`:nth-last-child(n)`

与`:nth-of-type(n)`和`:nth-child(n)`基本一致，只是从后面开始计数

结合`:nth-last-child(n)`与`:first-child`可以匹配出列表中不同元素数量的不同样式

比如`:nth-last-child(3):first-child`表示从后往前数选中第3个子元素，同时也是第一个元素，那么就可以判断改列表中共有3个元素，结合兄弟选择器`+`和`~`可以对不同数量的子元素分别指定样式

```css
li:only-child {
  height: 100%;
}
/* 2个 */
li:first-child:nth-last-child(2),
li:first-child:nth-last-child(2) + li {
  width: 50%; height: 50%;
}
li:first-child:nth-last-child(2) + li {
  margin-left: auto;
}
/* 3个 */
li:first-child:nth-last-child(3),
li:first-child:nth-last-child(3) ~ li {
  width: 50%; height: 50%;
}
```

大家可以看看[张鑫旭的这篇文章](https://www.zhangxinxu.com/wordpress/2019/03/nth-last-child-css-layout/)，算是一个比较实用的场景

## `:only-of-type 和 :only-child`

这个是表示当只有一个元素，或者同类型元素只有一个的时候使用

```html
<div>
	<h1 class="h1">标题1</h1>
	<h1  class="h2">标题2</h1>
	<h1  class="h2">标题2</h1>
	<p class="p1">段落1</p>
	<span>文本</span>
</div>
```

* `div :only-of-type`可以选中 *标题2* *文本*
* `div p:only-of-type`可以选中 *标题2*
* `div :only-child` 匹配不到任何元素

## 小节

其实大家只要注意 **`*-of-type` 是选择相同类型的元素 、` *-child`是选择子节点 ** 就好了，

相信未来可能会出现更全面的选择器，比如`nth-of-class`（根据class来选择），`nth-of-*` （根据任意选择器来选择），还是期待一下吧~



