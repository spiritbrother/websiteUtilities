// Generated by CoffeeScript 1.6.3
/*!
    Copyright see require on https://github.com/thaibault/require

    Conventions see require on https://github.com/thaibault/require

    @author t.sickert@gmail.com (Torben Sickert)
    @version 1.0 stable
    @fileOverview
    This module provides common logic for the whole web page.
*/


(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  (function($) {
    /**
        @memberOf $
        @class
    */

    var Website, _ref;
    Website = (function(_super) {
      __extends(Website, _super);

      function Website() {
        _ref = Website.__super__.constructor.apply(this, arguments);
        return _ref;
      }

      /**
          Holds the class name to provide inspection features.
      
          @property {String}
      */


      Website.prototype.__name__ = 'Website';

      /**
          @description Initializes the interactive web application.
      
          @param {Object} options An options object.
      
          @returns {$.Website} Returns the current instance.
      */


      Website.prototype.initialize = function(options, _parentOptions, _viewportIsOnTop, _currentMediaQueryMode, languageHandler, __googleAnalyticsCode) {
        if (options == null) {
          options = {};
        }
        this._parentOptions = _parentOptions != null ? _parentOptions : {
          logging: false,
          domNodeSelectorPrefix: 'body.{1}',
          onViewportMovesToTop: $.noop(),
          onViewportMovesAwayFromTop: $.noop(),
          onChangeToDesktopMode: $.noop(),
          onChangeToTabletMode: $.noop(),
          onChangeToSmartphoneMode: $.noop(),
          onChangeMediaQueryMode: $.noop(),
          onSwitchSection: $.noop(),
          onStartUpAnimationComplete: $.noop(),
          additionalPageLoadingTimeInMilliseconds: 0,
          googleTrackingCode: 'UA-0-0',
          mediaQueryCssIndicator: {
            extraSmall: 'xs',
            small: 'sm',
            medium: 'md',
            large: 'lg'
          },
          domNode: {
            top: 'div.navigation-bar',
            scrollToTopButtons: 'a[href="#top"]',
            startUpAnimationClassPrefix: '.start-up-animation-number-',
            windowLoadingCover: '> div.window-loading-cover',
            windowLoadingSpinner: '> div.window-loading-cover > div'
          },
          startUpFadeInOptions: {
            easing: 'swing',
            duration: 'slow'
          },
          windowLoadingCoverFadeOutOptions: {
            easing: 'swing',
            duration: 'slow'
          },
          startUpAnimationElementDelayInMiliseconds: 100,
          windowLoadingSpinnerOptions: {
            lines: 9,
            length: 23,
            width: 11,
            radius: 40,
            corners: 1,
            rotate: 75,
            color: '#000',
            speed: 1.1,
            trail: 58,
            shadow: false,
            hwaccel: false,
            className: 'spinner',
            zIndex: 2e9,
            top: 'auto',
            left: 'auto'
          },
          activateLanguageSupport: true,
          language: {},
          scrollInLinearTime: false,
          scrollToTop: {
            duration: 'slow'
          }
        };
        this._viewportIsOnTop = _viewportIsOnTop != null ? _viewportIsOnTop : true;
        this._currentMediaQueryMode = _currentMediaQueryMode != null ? _currentMediaQueryMode : '';
        this.languageHandler = languageHandler != null ? languageHandler : null;
        this.__googleAnalyticsCode = __googleAnalyticsCode != null ? __googleAnalyticsCode : 'var _gaq = _gaq || [];\n  _gaq.push([\'_setAccount\', \'{1}\']);\n  _gaq.push([\'_trackPageview\']);\n\n  (function() {\n    var ga = document.createElement(\'script\');\n    ga.type = \'text/javascript\'; ga.async = true;\n    ga.src = (\'https:\' === document.location.protocol ?\n              \'https://ssl\' : \'http://www\') +\n              \'.google-analytics.com/ga.js\';\n    var s = document.getElementsByTagName(\'script\')[0];\n    s.parentNode.insertBefore(ga, s);\n  })();';
        this._onViewportMovesToTop = this.debounce(this.getMethod(this._onViewportMovesToTop));
        this._onViewportMovesAwayFromTop = this.debounce(this.getMethod(this._onViewportMovesAwayFromTop));
        this._options = $.extend(true, {}, this._parentOptions, this._options);
        Website.__super__.initialize.call(this, options);
        this.$domNodes = this.grabDomNode(this._options.domNode);
        this._options.windowLoadingCoverFadeOutOptions.always = this.getMethod(this._handleStartUpEffects);
        this.$domNodes.windowLoadingSpinner.spin(this._options.windowLoadingSpinnerOptions);
        this._bindScrollEvents().$domNodes.parent.show();
        this.$domNodes.window.ready(this.getMethod(this._removeLoadingCover));
        this._addNavigationEvents()._addMediaQueryChangeEvents()._triggerWindowResizeEvents()._handleGoogleAnalytics(this._options.trackingCode);
        if (this._options.language.logging == null) {
          this._options.language.logging = this._options.logging;
        }
        if (this._options.activateLanguageSupport) {
          this._languageHandler = $.Lang(this._options.language);
        }
        return this;
      };

      /**
          @description This method triggers if the viewport moves to top.
      
          @returns {$.Website} Returns the current instance.
      */


      Website.prototype._onViewportMovesToTop = function() {
        var _this = this;
        if (this.$domNodes.scrollToTopButtons.css('visibility') !== 'hidden') {
          this.$domNodes.scrollToTopButtons.animate({
            bottom: '+=30',
            opacity: 0
          }, {
            duration: 'normal',
            always: function() {
              return _this.$domNodes.scrollToTopButtons.css('bottom', '-=30');
            }
          });
        }
        return this;
      };

      /**
          @description This method triggers if the viewport moves away from
                       top.
      
          @returns {$.Website} Returns the current instance.
      */


      Website.prototype._onViewportMovesAwayFromTop = function() {
        if (this.$domNodes.scrollToTopButtons.css('visibility') !== 'hidden') {
          this.$domNodes.scrollToTopButtons.css({
            bottom: '+=30',
            display: 'block',
            opacity: 0
          }).animate({
            bottom: '-=30',
            queue: false,
            opacity: 1
          }, {
            duration: 'normal'
          });
        }
        return this;
      };

      /**
          @description This method triggers if the responsive design
                       switches to another mode.
      
          @param {String} oldMode Saves the previous mode.
          @param {String} newMode Saves the new mode.
      
          @returns {$.Website} Returns the current instance.
      */


      Website.prototype._onChangeMediaQueryMode = function(oldMode, newMode) {
        return this;
      };

      /**
          @description This method triggers if the responsive design
                       switches to large mode.
      
          @param {String} oldMode Saves the previous mode.
          @param {String} newMode Saves the new mode.
      
          @returns {$.Website} Returns the current instance.
      */


      Website.prototype._onChangeToLargeMode = function(oldMode, newMode) {
        return this;
      };

      /**
          @description This method triggers if the responsive design
                       switches to medium mode.
      
          @param {String} oldMode Saves the previous mode.
          @param {String} newMode Saves the new mode.
      
          @returns {$.Website} Returns the current instance.
      */


      Website.prototype._onChangeToMediumMode = function(oldMode, newMode) {
        return this;
      };

      /**
          @description This method triggers if the responsive design
                       switches to small mode.
      
          @param {String} oldMode Saves the previous mode.
          @param {String} newMode Saves the new mode.
      
          @returns {$.Website} Returns the current instance.
      */


      Website.prototype._onChangeToSmallMode = function(oldMode, newMode) {
        return this;
      };

      /**
          @description This method triggers if the responsive design
                       switches to extra small mode.
      
          @param {String} oldMode Saves the previous mode.
          @param {String} newMode Saves the new mode.
      
          @returns {$.Website} Returns the current instance.
      */


      Website.prototype._onChangeToExtraSmallMode = function(oldMode, newMode) {
        return this;
      };

      /**
          @description This method triggers if we change the current section.
      
          @param {String} sectionName Contains the new section name.
      
          @returns {$.Website} Returns the current instance.
      */


      Website.prototype._onSwitchSection = function(sectionName) {
        return this;
      };

      /**
          @description This method is complete if last startup animation
                       was initialized.
      
          @returns {$.Website} Returns the current instance.
      */


      Website.prototype._onStartUpAnimationComplete = function() {
        return this;
      };

      /**
          @description This method adds triggers for responsive design
                       switches.
      
          @returns {$.Website} Returns the current instance.
      */


      Website.prototype._addMediaQueryChangeEvents = function() {
        this.on(this.$domNodes.window, 'resize', this.getMethod(this._triggerWindowResizeEvents));
        return this;
      };

      /**
          @description This method triggers if the responsive design
                       switches its mode.
      
          @returns {$.Website} Returns the current instance.
      */


      Website.prototype._triggerWindowResizeEvents = function() {
        var _this = this;
        $.each(this._options.mediaQueryCssIndicator, function(name, value) {
          _this.$domNodes.parent.addClass("hidden-" + value);
          if (_this.$domNodes.parent.is(':hidden') && name !== _this._currentMediaQueryMode) {
            _this.fireEvent.apply(_this, [_this.stringFormat('changeMediaQueryMode', name.substr(0, 1).toUpperCase() + name.substr(1)), false, _this, _this._currentMediaQueryMode, name].concat(_this.argumentsObjectToArray(arguments)));
            _this.fireEvent.apply(_this, [_this.stringFormat('changeTo{1}Mode', name.substr(0, 1).toUpperCase() + name.substr(1)), false, _this, _this._currentMediaQueryMode, name].concat(_this.argumentsObjectToArray(arguments)));
            _this._currentMediaQueryMode = name;
          }
          return _this.$domNodes.parent.removeClass("hidden-" + value);
        });
        return this;
      };

      /**
          @description This method triggers if view port arrives at special
                       areas.
      
          @returns {$.Website} Returns the current instance.
      */


      Website.prototype._bindScrollEvents = function() {
        var _this = this;
        this.on(window, 'scroll', function() {
          if (_this.$domNodes.window.scrollTop()) {
            if (_this._viewportIsOnTop) {
              _this._viewportIsOnTop = false;
              return _this.fireEvent.apply(_this, ['viewportMovesAwayFromTop', false, _this].concat(_this.argumentsObjectToArray(arguments)));
            }
          } else if (!_this._viewportIsOnTop) {
            _this._viewportIsOnTop = true;
            return _this.fireEvent.apply(_this, ['viewportMovesToTop', false, _this].concat(_this.argumentsObjectToArray(arguments)));
          }
        });
        return this;
      };

      /**
          @description This method triggers after window is loaded.
      
          @returns {$.Website} Returns the current instance.
      */


      Website.prototype._removeLoadingCover = function() {
        var _this = this;
        window.setTimeout(function() {
          $('[class^="' + _this.sliceDomNodeSelectorPrefix(_this._options.domNode.startUpAnimationClassPrefix).substr(1) + '"]').hide();
          return _this.$domNodes.windowLoadingCover.fadeOut(_this._options.windowLoadingCoverFadeOutOptions);
        }, this._options.additionalPageLoadingTimeInMilliseconds);
        return this;
      };

      /**
          @description This method handles the given start up effect step.
      
          @param {Number} elementNumber The current start up step.
      
          @returns {$.Website} Returns the current instance.
      */


      Website.prototype._handleStartUpEffects = function(elementNumber) {
        var _this = this;
        this.$domNodes.windowLoadingSpinner.spin(false);
        if (!$.isNumeric(elementNumber)) {
          elementNumber = 1;
        }
        window.setTimeout((function() {
          $(_this._options.domNode.startUpAnimationClassPrefix + elementNumber).fadeIn(_this._options.startUpFadeInOptions);
          if ($(_this._options.domNode.startUpAnimationClassPrefix + (elementNumber + 1)).length) {
            return _this._handleStartUpEffects(elementNumber + 1);
          } else {
            return _this.fireEvent('startUpAnimationComplete');
          }
        }), this._options.startUpAnimationElementDelayInMiliseconds);
        return this;
      };

      /**
          @description This method adds triggers to switch section.
      
          @returns {$.Website} Returns the current instance.
      */


      Website.prototype._addNavigationEvents = function() {
        var _this = this;
        this.$domNodes.window.hashchange(function() {
          return _this.fireEvent('switchSection', false, _this, window.location.hash);
        });
        return this._handleScrollToTopButton();
      };

      /**
          @description Adds trigger to scroll top buttons.
      
          @returns {$.Website} Returns the current instance.
      */


      Website.prototype._handleScrollToTopButton = function() {
        var _this = this;
        this.on(this.$domNodes.scrollToTopButtons, 'click', function(event) {
          event.preventDefault();
          return _this._scrollToTop();
        });
        this.$domNodes.scrollToTopButtons.hide();
        return this;
      };

      /**
          @description Scrolls to top of page. Runs the given function after
                       viewport arrives.
      
          @param {Function} onAfter Callback to call after effect has
                                    finished.
      
          @returns {$.Website} Returns the current instance.
      */


      Website.prototype._scrollToTop = function(onAfter) {
        var distanceToTopInPixel;
        if (onAfter == null) {
          onAfter = $.noop();
        }
        this._options.scrollToTop.onAfter = onAfter;
        if (this._options.scrollInLinearTime) {
          distanceToTopInPixel = this.$domNodes.window.scrollTop();
          this._options.scrollToTop.duration = distanceToTopInPixel;
          $.scrollTo({
            top: "-=" + distanceToTopInPixel,
            left: '+=0'
          }, this._options.scrollToTop);
        } else {
          $.scrollTo({
            top: 0,
            left: 0
          }, this._options.scrollToTop);
        }
        return this;
      };

      /**
          @description Scrolls to top of page. Runs the given function after
                       viewport arrives.
      
          @param {String} trackingCode Google's javaScript embedding code
                                       snippet.
      
          @returns {$.Website} Returns the current instance.
      */


      Website.prototype._handleGoogleAnalytics = function(trackingCode) {
        var exception;
        try {
          (new Function(this.stringFormat(this.__googleAnalyticsCode, trackingCode)))();
        } catch (_error) {
          exception = _error;
          this.warn('Problem in google analytics code snippet: {1}', exception);
        }
        return this;
      };

      return Website;

    })($.Tools["class"]);
    /** @ignore*/

    $.Website = function() {
      return $.Tools().controller(Website, arguments);
    };
    /** @ignore*/

    return $.Website["class"] = Website;
  })(this.jQuery);

}).call(this);