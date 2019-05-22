---
title: CSS 关于多级菜单的内边距的处理方式
date: 2019-05-21 19:26:54
tags: [css]
published: true
hideInList: false
feature: 
---
## 多级菜单

在平时的项目中会经常碰到这样一种布局，暂且称之为多级菜单吧

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

未完待续...



