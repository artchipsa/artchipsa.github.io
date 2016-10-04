"use strict";
function Popup(params) {
    var _this = this;
    _this.$popupBack = params.$popup.closest(".popup-back");
    _this.$popup = params.$popup;

    _this.open = function () {
        _this.$popupBack.addClass("show");
        _this.$popup.addClass("show");

        $(document.body).on("keydown", _this.keyHandler);
        $(document.body).one("click", function () {
            _this.close();
        });

        _this.closeComplete = undefined;
    };


    _this.close = function () {
        _this.$popupBack.removeClass("show");
        _this.$popup.removeClass("show");

        $(document.body).off("keydown", _this.keyHandler);
        $(document.body).off("click", _this.close);

        _this.closeComplete = function () {
            params.onCloseComplete && params.onCloseComplete.apply(this);
        };

        _this.$popup.one("transitionend oTransitionEnd MSTransitionEnd", function () {
            _this.closeComplete && _this.closeComplete();
        });

        params.onClose && params.onClose.apply(_this);
    };

    _this.setTitle = function (title) {
        _this.$popup.find(".title").html(title);
    };

    _this.setText = function (text) {
        _this.$popup.find(".text").html(text);
    };

    params.$popup.on("click", ".js-close", function (event) {
        _this.close();
        event.stopPropagation();
    });

    _this.$popup.on("click", function (event) {
        event.stopPropagation();
    });

    _this.keyHandler = function (event) {
        event.keyCode === 27 && _this.close();
    };

    _this.$popup.on("close", function() {
        if (!_this.$popup.hasClass("show")) return;
        _this.close();
    });

    _this.$popup.data({ popup: _this });
}