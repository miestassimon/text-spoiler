(function () {

  class TextSpoilerItem {

    /**
     * Creates a new TextSpoilerItem instance
     *
     * @param {node} node - A node
     * @param {int} lines - How many lines should has the node
     */
    constructor(node, lines) {
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
    createButton() {
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
    buttonClickHandler(e) {
      this.toggleState();
      this.updateView();
    }

    /**
     * Toggles state
     */
    toggleState() {
      this.options.isCollapsed = !this.options.isCollapsed;
    }

    /**
     * Inits default values of the node
     * @returns {boolean} - is needed to use spoiler?
     */
    initDefaultValues() {
      let self = this;
      let exH, colH, lineH;

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
    updateView() {
      this.node.style.height = this.options.isCollapsed ?
        this.options.collapsedHeight + 'px' :
        this.options.expandedHeight + 'px';

      this.button.innerHTML = this.options.isCollapsed ?
        this.options.buttonTextCollapsed :
        this.options.buttonTextExpanded;
    }

    /**
     * Sets up base styles for the node
     */
    setNodeBaseStyle() {
      this.node.style.overflow = 'hidden';
    }

    /**
     * Return line-height of the node in px
     *
     * @param {node} node - The node
     * @returns {number} - The line-height in px of the node
     */
    static getLineHeight(node) {
      let res;
      let lhFromStyle = window.getComputedStyle(node).lineHeight;

      if (lhFromStyle !== 'normal') {
        res = lhFromStyle;
      } else {
        let clone = node.cloneNode();
        clone.innerHTML = '&nbsp;';
        clone.style.position = 'absolute';
        node.appendChild(clone);
        res = clone.offsetHeight;
        node.removeChild(clone);
      }

      return res;
    }
  }

  class TextSpoiler {

    /**
     * Creates a new TextSpoiler instance
     *
     * @param {string} selector - Nodes selector
     * @param {int} lines - How many lines should has a node. By default gets a data-text-spoiler attribute value
     */
    constructor(selector, lines = 6) {

      selector = selector || '[data-text-spoiler]';

      document.querySelectorAll(selector)
        .forEach(node => {
          lines = +node.getAttribute('data-text-spoiler') || +lines;
          new TextSpoilerItem(node, lines)
        });
    }
  }

  return window.TextSpoiler = TextSpoiler;

})();