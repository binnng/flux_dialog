# flux_dialog
从底部弹出选择框的一种实现。


## 使用方式

```
var FluxDialog = require("flux_dialog");
var myFluxDialog = FluxDialog({
 // 按钮组
  item: [
   {
      html: "退出登录",
      fn: UserName.onLogout,
      css: "color: #f90",
      // fn执行绑定的this
      me: window
    }
  ],
  animate: true,
  animateTime: 300,
  cancelText: "取消",
  oncancel: function() {...}
});
```


![image](https://cloud.githubusercontent.com/assets/2696107/9217587/1ef447d6-40fc-11e5-8ca0-6ad9f9815985.png)
