// Generated by CoffeeScript 1.9.2
var $, ANIMATE_CLASS_NAME, CANCEL_CLASS_NAME, CLASS_NAME, DEFAULT_ITEM, DOC, Flux, ITEM_CLASS_NAME, WIN, elBody, entry, noop;

WIN = window;

DOC = document;

noop = function() {};

$ = WIN["$"];

elBody = $("body");

CLASS_NAME = "flux-dialog";

ITEM_CLASS_NAME = "flux-item";

CANCEL_CLASS_NAME = "flux-cancel";

ANIMATE_CLASS_NAME = "flux-fadeInUp";

DEFAULT_ITEM = {
  html: "",
  css: "",
  fn: noop
};

Flux = (function() {
  function Flux(params) {
    var base;
    if (params == null) {
      params = {};
    }
    this.params = params;
    if ((base = this.params).item == null) {
      base.item = [];
    }
    $.extend(this, params);
    if (this.oncancel == null) {
      this.oncancel = noop;
    }
  }

  Flux.prototype.init = function() {
    var elCancel, elOut;
    if (this.animate) {
      CLASS_NAME += " " + ANIMATE_CLASS_NAME;
    }
    elOut = this.el = $("<ul class='" + CLASS_NAME + "'></ul>");
    $.each(this.item, function(i, j) {
      var css, elItem, fn, html, me;
      j = $.extend(DEFAULT_ITEM, j);
      html = j.html, fn = j.fn, css = j.css, me = j.me;
      elItem = $("<li class='" + ITEM_CLASS_NAME + "' style='" + css + "'>" + html + "</li>");
      return elOut.append(elItem.on("click", me ? fn.bind(me) : fn));
    });
    elCancel = this.elCancel = $("<li class='" + ITEM_CLASS_NAME + " " + CANCEL_CLASS_NAME + "'>" + (this.cancelText || '取消') + "</li>").on("click", (function(_this) {
      return function() {
        _this.hide();
        return _this.oncancel();
      };
    })(this));
    elOut.append(elCancel);
    elBody.append(elOut);
    return this;
  };

  Flux.prototype.show = function() {
    var el;
    el = this.el;
    el.show();
    return this;
  };

  Flux.prototype.hide = function() {
    var el;
    el = this.el;
    el.hide();
    return this;
  };

  Flux.prototype.destroy = function() {
    this.el.remove();
    return this;
  };

  return Flux;

})();

entry = function(params) {
  return (new Flux(params)).init();
};

module.exports = entry;