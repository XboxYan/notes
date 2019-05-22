---
title: CSS3 元素出现动画实例
date: 2019-04-16 21:15:05
tags: [css3]
published: true
hideInList: false
feature: /post-images/css3-appear-animation.jpg
---
css3中实现动画一般有两种方式，一个是`transition`过渡，一个是`animation`动画。最主要区别就是`transition`需要条件触发，通常会用`hover`来触发，而`animation`则更灵活，可以自动播放，也可以通过条件触发。

<!-- more -->

那么，如何实现一个元素出现动画呢？

如果是`transition`，可以很轻松的实现这一效果，例如

```css
.box{
  visibility:hidden;
  opacity:0;
  transform:translateY(100px);
  transition:.3s;
}
.show{
  visibility:visible;
  opacity:1;
  transform:translateY(0);
}
```

这样就实现了一个“从下至上，透明度从0至1”的出现动画，很常用不是吗。

<iframe height="300" style="width: 100%;" scrolling="no" title="show-transition" src="//codepen.io/xboxyan/embed/LveVoO/?height=300&theme-id=34022&default-tab=css,result" frameborder="no" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href='https://codepen.io/xboxyan/pen/LveVoO/'>show-transition</a> by XboxYan
  (<a href='https://codepen.io/xboxyan'>@xboxyan</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>

当然，我们也可以用`animation`来实现，

```css
.box{
  visibility:hidden;
  opacity:0;
  transform:translateY(100px);
  transition:.3s;
}
.show{
  animation:show .5s forwards;
}

.hide{
  visibility:visible;
  opacity: 1;
  transform: translateY(0);
  animation:hide .5s forwards;
}
@keyframes show{
  to {
    visibility:visible;
    opacity: 1;
    transform: translateY(0)
  }
}
@keyframes hide{
  to {
    visibility:hidden;
    opacity: 0;
    transform: translateY(100px)
  }
}
```

我的天，居然要写这么多，才能实现和上面一样的效果，没办法，出现和消失是两组不同的动画，所以需要定义两个动画。

<iframe height="300" style="width: 100%;" scrolling="no" title="show-animation" src="//codepen.io/xboxyan/embed/KYZdKp/?height=300&theme-id=34022&default-tab=css,result" frameborder="no" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href='https://codepen.io/xboxyan/pen/KYZdKp/'>show-animation</a> by XboxYan
  (<a href='https://codepen.io/xboxyan'>@xboxyan</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>

## 元素出现动画

上面简单的介绍了动画的两种实现方法。严格来讲，`transition`只是过渡，只是切换样式过程中有动画的效果，而`animation`才是真正做动画的。当然也需要根据自己的实际需求来选择。

下面来看这样一个需求：

通常页面上要全局显示一个消息提示，类似于`toast`效果。这是我通常的做法

```js
function showMessage(txt){
    this.timer && clearTimeout(this.timer);
    var oDiv = document.getElementById('messageInfo');
    if(!oDiv){
      oDiv = document.createElement('div');
      oDiv.className = 'messageInfo';
      oDiv.id = 'messageInfo';
      document.body.appendChild(oDiv);
    }
    oDiv.innerHTML = '<span>'+txt+'</span>';
    oDiv.classList.add('show');
    this.timer = setTimeout(function(){
      oDiv.classList.remove('show');
    },2000)
}
```

原理就是，向页面添加一个`div#messageInfo`容器，然后添加类名`.show`让元素出现，2s后自动移除`.show`实现隐藏，效果如下

<iframe height="300" style="width: 100%;" scrolling="no" title="toast" src="//codepen.io/xboxyan/embed/axEddQ/?height=300&theme-id=34022&default-tab=js,result" frameborder="no" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href='https://codepen.io/xboxyan/pen/axEddQ/'>toast</a> by XboxYan
  (<a href='https://codepen.io/xboxyan'>@xboxyan</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>

可以很明显的看到一个效果就是，第一次出现的时候是没有动画的，以后就正常了。可能平时项目中，这一点小瑕疵也没什么影响，毕竟很大一部分人连动画都不给啊，直接就是`display:none`和`display:block`，可以说是提不上体验了。

那么，为什么会出现这种现象呢？

首先明白一点，`transition`是不会自动触发的，上面是通过添加和移除类名来实现过渡效果的。但是在第一次元素刚刚创建的时候，此时页面改元素还未加载完成，这个时候立即添加类名，其实是可以等同于是一起创建的，没有形成过渡效果。解决这个问题很简单，就是稍微延时一下

```js
//...
setTimeout(function(){
   oDiv.classList.add('show');
},50)
//...
```

这样就基本上解决了这个问题，如下

<iframe height="300" style="width: 100%;" scrolling="no" title="toast-fix" src="//codepen.io/xboxyan/embed/LveNYN/?height=300&theme-id=34022&default-tab=js,result" frameborder="no" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href='https://codepen.io/xboxyan/pen/LveNYN/'>toast-fix</a> by XboxYan
  (<a href='https://codepen.io/xboxyan'>@xboxyan</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>

但是，理论上这里的延迟越小越好，我测试了一下，大概和浏览器的性能有关吧，用定时器的目的也仅仅是等待元素加载完成，而dom也没有原生监听加载完成事件，所以只能用定时器估一个大概的值。

但是，这仍然是一个瑕疵，从代码结构上来讲，这也是无法忍受的。那么，还有没有更好的方法呢？答案就是`animation`

## Animation

虽然从开头的例子来看，`animation`的写法又臭又长，但是也正体现出它的功能强大，其中之一就是自动播放动画

那么，把上面的`toast`改造一下

```css
.messageInfo{ 
    /**...**/
    animation:show .5s forwards;
}
.hide{
  visibility:visible;
  opacity: 1;
  transform: translateY(0);
  animation:hide .5s forwards;
}
@keyframes show{
  to {
    visibility:visible;
    opacity: 1;
    transform: translateY(0)
  }
}
@keyframes hide{
  to {
    visibility:hidden;
    opacity: 0;
    transform: translateY(-100%)
  }
}
```

js基本和之前一致

```js
function showMessage(txt){
    this.timer && clearTimeout(this.timer);
    var oDiv = document.getElementById('messageInfo');
    if(!oDiv){
      oDiv = document.createElement('div');
      oDiv.className = 'messageInfo';
      oDiv.id = 'messageInfo';
      document.body.appendChild(oDiv);
    }
    oDiv.innerHTML = '<span>'+txt+'</span>';
    oDiv.classList.remove('hide');//默认是显示
    this.timer = 
      setTimeout(function(){
      oDiv.classList.add('hide');//2s后隐藏
    },2000)
}
```

效果如下

<iframe height="300" style="width: 100%;" scrolling="no" title="toast-animation" src="//codepen.io/xboxyan/embed/yrpOPm/?height=300&theme-id=34022&default-tab=css,result" frameborder="no" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href='https://codepen.io/xboxyan/pen/yrpOPm/'>toast-animation</a> by XboxYan
  (<a href='https://codepen.io/xboxyan'>@xboxyan</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>

可以说非常完美了。

## 其他应用场景

元素添加动画

通常在添加表单或者上传图片时，如果需要让新添加的元素产生一个动画效果，那么可以用到`animation`

<iframe height="300" style="width: 100%;" scrolling="no" title="css 元素出现动画" src="//codepen.io/xboxyan/embed/axLPgN/?height=300&theme-id=34022&default-tab=css,result" frameborder="no" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href='https://codepen.io/xboxyan/pen/axLPgN/'>css 元素出现动画</a> by XboxYan
  (<a href='https://codepen.io/xboxyan'>@xboxyan</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>

当然，还可以做到分页加载动画，需要给每个元素添加一个延时`animation-delay`即可

```css
/*animation-delay*/
.list li:not(.hide):nth-child(5n + 1) {
    animation-delay: .3s;
}
.list li:not(.hide):nth-child(5n + 2) {
    animation-delay: .6s;
}
.list li:not(.hide):nth-child(5n + 3) {
    animation-delay: .9s;
}
.list li:not(.hide):nth-child(5n + 4) {
    animation-delay: 1.2s;
}
.list li:not(.hide):nth-child(5n + 5) {
    animation-delay: 1.5s;
}
```

效果如下，元素会依次登场，预览窗口比较小，建议在[原链接](https://codepen.io/xboxyan/pen/dLVwLv)查看

<iframe height="300" style="width: 100%;" scrolling="no" title="css批量出现动画" src="//codepen.io/xboxyan/embed/dLVwLv/?height=300&theme-id=34022&default-tab=css,result" frameborder="no" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href='https://codepen.io/xboxyan/pen/dLVwLv/'>css批量出现动画</a> by XboxYan
  (<a href='https://codepen.io/xboxyan'>@xboxyan</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>

然后，还可以实现九宫格动画，让元素在出现的时候从左上方依次向右下方扩散，同样是用到了`animation-delay`

<iframe height="300" style="width: 100%;" scrolling="no" title="css九宫格出现动画" src="//codepen.io/xboxyan/embed/zXEyLY/?height=300&theme-id=34022&default-tab=css,result" frameborder="no" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href='https://codepen.io/xboxyan/pen/zXEyLY/'>css九宫格出现动画</a> by XboxYan
  (<a href='https://codepen.io/xboxyan'>@xboxyan</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>

很酷炫不是吗，无需用到js，也无需用到其它框架，纯天然，支持的浏览器体验更上一层楼，不支持的浏览器也无伤大雅

## 小节

总体来说，`animation`远比`transition`要强大的多，当然在实际使用中，如果有交互，如鼠标移入，首先看`transition`能否实现，其次才是`animation`，如果像这一类元素出现（生成）动画，那么就需要使用到`animation`了。





