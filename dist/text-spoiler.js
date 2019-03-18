"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

(function () {
  var TextSpoilerItem =
  /*#__PURE__*/
  function () {
    /**
     * Creates a new TextSpoilerItem instance
     *
     * @param {node} node - A node
     * @param {int} lines - How many lines should has the node
     */
    function TextSpoilerItem(node, lines) {
      _classCallCheck(this, TextSpoilerItem);

      this.options = {
        isCollapsed: false,
        lines: lines,
        expandedHeight: 0,
        collapsedHeight: 0,
        lineHeight: 0,
        buttonTextExpanded: 'Читать дальше',
        buttonTextCollapsed: 'Скрыть'
      };
      this.node = node;
      this.initDefaultValues();
    }
    /**
     * Creates a spoiler button
     */


    _createClass(TextSpoilerItem, [{
      key: "createButton",
      value: function createButton() {
        this.button = document.createElement('button');
        this.button.className = 'spoiler';
        this.button.addEventListener('click', this.buttonClickHandler.bind(this));
        this.node.parentElement.appendChild(this.button);
      }
      /**
       * The spoiler button click handler
       *
       * @param {even} e - The click event
       */

    }, {
      key: "buttonClickHandler",
      value: function buttonClickHandler(e) {
        this.toggleState();
        this.updateView();
      }
      /**
       * Toggles state
       */

    }, {
      key: "toggleState",
      value: function toggleState() {
        this.options.isCollapsed = !this.options.isCollapsed;
      }
      /**
       * Inits default values of the node
       * @returns {boolean} - is needed to use spoiler?
       */

    }, {
      key: "initDefaultValues",
      value: function initDefaultValues() {
        var self = this;
        var exH, colH, lineH;
        window.addEventListener('load', function () {
          exH = self.node.offsetHeight;
          lineH = TextSpoilerItem.getLineHeight(self.node);
          colH = self.options.lines * lineH;
          if (colH >= exH) return;
          self.options.expandedHeight = exH;
          self.options.collapsedHeight = colH;
          self.options.lineHeight = lineH;
          self.createButton();
          self.setNodeBaseStyle();
          self.updateView();
        });
      }
      /**
       * Updates a node height and a button text
       */

    }, {
      key: "updateView",
      value: function updateView() {
        this.node.style.height = this.options.isCollapsed ? this.options.collapsedHeight + 'px' : this.options.expandedHeight + 'px';
        this.button.innerHTML = this.options.isCollapsed ? this.options.buttonTextCollapsed : this.options.buttonTextExpanded;
      }
      /**
       * Sets up base styles for the node
       */

    }, {
      key: "setNodeBaseStyle",
      value: function setNodeBaseStyle() {
        this.node.style.overflow = 'hidden';
      }
      /**
       * Return line-height of the node in px
       *
       * @param {node} node - The node
       * @returns {number} - The line-height in px of the node
       */

    }], [{
      key: "getLineHeight",
      value: function getLineHeight(node) {
        var res;
        var lhFromStyle = window.getComputedStyle(node).lineHeight;

        if (lhFromStyle !== 'normal') {
          res = lhFromStyle;
        } else {
          var clone = node.cloneNode();
          clone.innerHTML = '&nbsp;';
          clone.style.position = 'absolute';
          node.appendChild(clone);
          res = clone.offsetHeight;
          node.removeChild(clone);
        }

        return res;
      }
    }]);

    return TextSpoilerItem;
  }();

  var TextSpoiler =
  /**
   * Creates a new TextSpoiler instance
   *
   * @param {string} selector - Nodes selector
   * @param {int} lines - How many lines should has a node. By default gets a data-text-spoiler attribute value
   */
  function TextSpoiler(selector) {
    var lines = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 6;

    _classCallCheck(this, TextSpoiler);

    selector = selector || '[data-text-spoiler]';
    document.querySelectorAll(selector).forEach(function (node) {
      lines = +node.getAttribute('data-text-spoiler') || +lines;
      new TextSpoilerItem(node, lines);
    });
  };

  return window.TextSpoiler = TextSpoiler;
})();