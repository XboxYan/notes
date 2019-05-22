---
title: CSS 关于多级菜单的内边距的处理方式
date: 2019-05-21 19:26:54
tags: [css]
published: true
hideInList: false
feature: /post-images/css-tree-padding.jpg
---
在平时的项目中会经常碰到这样一种布局，暂且称之为多级菜单吧

<!-- more -->

![](https://xboxyan.codelabo.cn/post-images/1558439549223.png)

（截图来自于[ant-design](https://ant.design/components/menu-cn/)）

这类布局也很容易，大概就是这样`ul`和`li`嵌套，如下

```html
<ul class="parent">
    <li>
        <div>Navigation01</div>
        <ul>
            <li><div>Option01</div></li>
            <li><div>Option02</div></li>
            <li>
                <div>Submenu</div>
                <ul>
                    <li><div>Option03</div></li>
                    <li><div>Option04</div></li>
                </ul>
            </li>
        </ul>
    </li>
    <li><div>Navigation02</div></li>
</ul>
```

于是就得到下面一个很原始的样式。

![](https://xboxyan.codelabo.cn/post-images/1558440703375.png)

再经过简单的修饰就可以达到上面的效果了。

当然，这个很容易，一般情况下我们是通过设置内边距来完成的，比如默认为

```css
ul{
	padding-left:40px;
}
```

然后每一层级跟随父级逐步累积，然后就实现了，层级越深，距离左边的缩进越多的效果。

## 多级菜单选中范围

通过上面的布局和样式，很显然每一项的选择范围都是逐步缩进的，

![](https://xboxyan.codelabo.cn/post-images/1558441705019.png)

但是，可能设计师觉得不好看，往往会设计成通栏的形式，比如像上面[ant-design](https://ant.design/components/menu-cn/)的设计

![](https://xboxyan.codelabo.cn/post-images/1558441856625.png)

那么，该如何处理呢？

## 通栏的处理方式

首先，一个很自然的思路就是去除`ul`的`padding`，改为每一个子项分别指定`padding`

```css
ul.parent{
	padding: 0;
}
```

然后将内边距直接写在`html`上，如下

```html
<ul  class="parent">
    <li>
        <div style="padding-left:40px">Navigation01</div>
        <ul>
            <li><div style="padding-left:80px">Option01</div></li>
            <li><div style="padding-left:80px">Option02</div></li>
            <li>
                <div style="padding-left:80px">Submenu</div>
                <ul>
                    <li><div style="padding-left:120px">Option03</div></li>
                    <li><div style="padding-left:120px">Option04</div></li>
                </ul>
            </li>
        </ul>
    </li>
    <li><div style="padding-left:40px">Navigation02</div></li>
</ul>
```

如果菜单层级较多，我们通常使用js来辅助生成，注意每一次循环来指定不同的内边距就可以了

![](https://xboxyan.codelabo.cn/post-images/1558442384266.png)

[ant-design](https://ant.design/components/menu-cn/)也是采取这种方式，可以自行打开控制台去查看。

记得刚入前端的时候就是采取的这种方式，效果实现就好。

不过，在现在看来，在`html`中使用内联样式始终不雅，而且数量较多时还需要和`js`扯上关系，能否优化一下呢

下面列举两种css方式

### 1.子选择器

我们可以在上面的基础上，分别控制每一级的内边距，这里我们可以使用子选择器`>`

```css
ul.parent>li>div{/**第一级**/
    padding-left: 40px;
}
ul.parent>li>ul>li>div{/**第二级**/
    padding-left: 80px;
}
ul.parent>li>ul>li>ul>li>div{/**第三级**/
    padding-left: 120px;
}
/** ... **/
```

通常，在层级不是特别多的情况下，我们可以一一罗列出来，只需用选择器`ul>li`叠加即可，是不是比`style`方便维护了很多呢？

### 2.absolute半依赖定位

在讲这个方法之前，首先搞清楚一个问题

`absolute`在不设置方向属性`left`，`top`，`right`，`bottom`时，默认位置是哪里？

在我的学习过程中，很多地方讲到的都是说`absolute`是绝对定位，是相对于第一个有定位属性的父级的，所以基本上都是和`relative`一起使用，反正不管三七二十一，直接就给父级加上`position:relative`，有一个可靠的父级，看着比较靠谱，不是吗？

其实，当元素设置了`absolute`属性，没有方向属性时，元素仍保留在原来位置，只是不占空间而已

比如，我给上面每一项后面加一个角标

```html
ul.parent div:after{
    content:'new';
    font-size: 10px;
    position:absolute;
    margin-top: -5px;
    color: red
}
```

![](https://xboxyan.codelabo.cn/post-images/1558496262004.png)

可以看到，虽然设置了`absolute`属性，但元素仍保留在原来位置，一旦设置了`left`等方位属性，就会查找第一个有定位属性的父级。

现在，我们把`css`还原为默认的状态，也就是

```css
ul{
	padding-left:40px;
}
```

现在情况就和初始状态一致，选中范围逐层递减，那么，如何实现选中范围为通栏呢

我们可以给最外层父级设置`position:relative`，因为通栏的宽度是相对于最外层的，然后给选中元素设置

```css
ul.parent div:hover:before{
    content:'';
    position:absolute;
    left:0;
    right:0;
    height:21px;
    background: violet;
    z-index: -1;
}
```
![](https://xboxyan.codelabo.cn/post-images/1558497025343.gif)

这里只设置了水平方向的`left`和`right`，没有设置垂直方向上的属性，所以水平位置会跟随父级定位元素（这里是最外层），而垂直方向位置还是基于当前父级（这里是父级li元素）

注意，这里的高度由于是基于最外层元素，所以，这里不能设置`height:100%`，那么，如何解决这一个小瑕疵呢，毕竟在这里写一个固定高度实在不怎么合适。

这里有两种方式来优化。

#### 方式一

上面的方式如果不指定高度，由于没有内容，高度自然为0，解决方式也很简单，在`content`插入一个空字符或者透明字符即可

```css
ul.parent div:hover:before{
    content:'\A0';
}
```

或者

```css
ul.parent div:hover:before{
    content:'任意字符';
		color:transparent;
}
```

#### 方式二

通常子项目的高度都是固定的，可以给子项目手动指定一个高度，然后选中项继承该高度即可

```css
ul.parent div{
	height:24px;
	line-height:24px;
}
ul.parent div:hover:before{
    content:'';
		height:inherit
}
```

注意这里的`height:inherit`是继承直接父级的高度，有兴趣的可以看[张鑫旭的这篇文章](https://www.zhangxinxu.com/wordpress/2015/02/different-height-100-height-inherit/)

这样也实现了通栏的效果

<p class="codepen" data-height="300" data-theme-id="34022" data-default-tab="html,result" data-user="xboxyan" data-slug-hash="PvOvog" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;" data-pen-title="css多级菜单">
  <span>See the Pen <a href="https://codepen.io/xboxyan/pen/PvOvog/">
  css多级菜单</a> by XboxYan (<a href="https://codepen.io/xboxyan">@xboxyan</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://static.codepen.io/assets/embed/ei.js"></script>

## 小节

上面介绍了两种实现通栏的方法，相比而言，`absolute`效果更好，也易于维护，可能一个并不怎么起眼的属性，有时候也能发挥出意想不到的效果。

下面有一个案例，纯css实现，可以查看一下

![](https://xboxyan.codelabo.cn/post-images/1558500656765.png)

<p class="codepen" data-height="508" data-theme-id="34022" data-default-tab="css,result" data-user="xboxyan" data-slug-hash="VOrOvG" style="height: 508px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;" data-pen-title="css-tree">
  <span>See the Pen <a href="https://codepen.io/xboxyan/pen/VOrOvG/">
  css-tree</a> by XboxYan (<a href="https://codepen.io/xboxyan">@xboxyan</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://static.codepen.io/assets/embed/ei.js"></script>


