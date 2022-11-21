window.addEventListener('load',function() {
  let focus = document.querySelector('.focus');
  let ul = focus.querySelector('ul');
  let ol = focus.querySelector('ol');
  // index控制轮播图索引
  let index = 0;
  let timer = setInterval(function() {
    index++;
    ul.style.transition = 'all .4s';
    ul.style.transform = 'translateX('+ (-index*focus.offsetWidth) +'px)';
  },2000);

  // 监听过渡结束事件，实现轮播图无缝滚动
  ul.addEventListener('transitionend',function() {
    if(index >= 3) {
      index = 0;
      ul.style.transition = 'none';
      ul.style.transform = 'translateX('+ (-index*focus.offsetWidth) +'px)';
    } else if(index < 0) {
      index = 2;
      ul.style.transition = 'none';
      ul.style.transform = 'translateX('+ (-index*focus.offsetWidth) +'px)';
    }
    // 小圆点跟随变化效果
    ol.querySelector('.current').classList.remove('current');
    ol.children[index].classList.add('current');
  })

  // 手指拖动轮播图效果
  let startX = 0;  //手指点下位置
  let moveX = 0;  //手指移动的距离
  ul.addEventListener('touchstart',function(e) {
    startX = e.targetTouches[0].pageX;
    // 手指点下停止定时器
    clearInterval(timer);
  })
  ul.addEventListener('touchmove',function(e) {
    e.preventDefault();  // 阻止默认滑动窗口事件
    moveX = e.targetTouches[0].pageX - startX;
    ul.style.transition = 'none';
    ul.style.transform = 'translateX('+ (-index*focus.offsetWidth + moveX) +'px)';
  })
  ul.addEventListener('touchend',function(e) {
    // 移动距离大于50，滚到上一张。小于-50下一张。否则回到原位置
    if(moveX > 50) {
      index--;
    } else if(moveX < -50) {
      index++;
    }
    ul.style.transition = 'all .3s';
    ul.style.transform = 'translateX('+ (-index*focus.offsetWidth) +'px)';
    // 手指离开开启定时器，先清除保证只有一个定时器在工作
    clearInterval(timer);
    timer = setInterval(function () {
      index++;
      ul.style.transition = 'all .4s';
      ul.style.transform = 'translateX(' + (-index * focus.offsetWidth) + 'px)';
    }, 2000)
  })

  // 返回顶部
  let goBack = document.querySelector('.goBack');
  window.addEventListener('scroll',function() {
    if(window.pageYOffset >= focus.offsetTop) {
      goBack.style.display = 'block';
    } else {
      goBack.style.display = 'none';
    }
  })
  goBack.addEventListener('click',function() {
    window.scroll(0,0);
  })
})