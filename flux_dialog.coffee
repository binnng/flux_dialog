# 从底部弹出的dialog
# 基于zepto
# binnng
# 2015/07/10
# demo
# var FluxDialog = require("flux_dialog");
# var myFluxDialog = FluxDialog({
#   // 按钮组
#   item: [
#     {
#       html: "退出登录",
#       fn: UserName.onLogout,
#       css: "color: #f90",
#       // fn执行绑定的this
#       me: window
#     }
#   ],
#   animate: true,
#   animateTime: 300,
#   cancelText: "取消",
#   oncancel: function() {...}
# });

WIN = window
DOC = document
noop = ->

$ = WIN["$"]

elBody = $ "body"


CLASS_NAME = "flux-dialog"
ITEM_CLASS_NAME = "flux-item"
CANCEL_CLASS_NAME = "flux-cancel"
ANIMATE_CLASS_NAME = "flux-fadeInUp"

DEFAULT_ITEM = 
  html: ""
  css: ""
  fn: noop


class Flux

  constructor: (params = {}) ->
    @params = params
    @params.item ?= []

    $.extend @, params

    @oncancel ?= noop


  init: ->
    if @animate
      CLASS_NAME += " #{ANIMATE_CLASS_NAME}"
      
    elOut = @el = $ "<ul class='#{CLASS_NAME}'></ul>"


    $.each @item, (i, j) ->

      j = $.extend DEFAULT_ITEM, j

      {
        html
        fn
        css
        me
      } = j

      elItem = $ "<li class='#{ITEM_CLASS_NAME}' style='#{css}'>#{html}</li>"
      elOut.append elItem.on "click", if me then fn.bind me else fn

    elCancel = @elCancel = $("<li class='#{ITEM_CLASS_NAME} #{CANCEL_CLASS_NAME}'>#{@cancelText or '取消'}</li>").on "click", =>
        @.hide()
        @oncancel()

    elOut.append elCancel

    elBody.append elOut

    @

  show: ->

    el = @el

    el.show()

    @

  hide: ->

    el = @el

    el.hide()

    @

  destroy: ->

    @el.remove()

    @


entry = (params) ->
  (new Flux params).init()

module.exports = entry
