// Element.closest() polyfill
// https://developer.mozilla.org/en-US/docs/Web/API/Element/closest#Polyfill
if (!Element.prototype.matches)
  Element.prototype.matches = Element.prototype.msMatchesSelector ||
                              Element.prototype.webkitMatchesSelector;

if (!Element.prototype.closest) {
  Element.prototype.closest = function(s) {
    var el = this;
    if (!document.documentElement.contains(el)) return null;
    do {
      if (el.matches(s)) return el;
      el = el.parentElement || el.parentNode;
    } while (el !== null && el.nodeType === 1);
    return null;
  };
}

(function () {
"use strict";

  var dQuery = function (s) {
    this.selector = null;
    if (typeof s === "string") {
      // Current selector
      this.selector = s;
      // Set of elements matching the current selector
      this.value = Array.prototype.slice.call(document.querySelectorAll(s));
    } else {
      // Set of elements is the current DOM object
      this.value = [s];
    }
  };

  dQuery.prototype = {
    each: function (fn) {
      // Execute a function for each matched element
      [].forEach.call(this.value, fn);
      return this;
    },
    css: function (a, v) {
      // Set one CSS property for each matched element
      // (first, transform "snake-case" to "camelCase")
      a = a.replace(/(\-\w)/g, function(m) { return m[1].toUpperCase(); });
      return this.each(function (i) {
        i.style[a] = v;
      });
    },
    hide: function () {
      // Hide each matched element
      return this.each(function (i) {
        i.style.display = "none";
      });
    },
    show: function () {
      // Display each matched element
      return this.each(function (i) {
        i.style.display = "block";
      });
    },
    on: function (type, filter, fn) {
      // Attach an event handler function to each matched element
      if (typeof filter === "string") {
        // Syntax .on(type, filter, fn)
        // => Re-match elements to current selector + parameter filter
        var s = this.selector + " " + filter;
        this.value = Array.prototype.slice.call(document.querySelectorAll(s));
        this.selector = s;
      } else {
        // Syntax .on(type, fn)
        // => "filter" parameter is in fact the "fn" parameter
        fn = filter;
      }
      var _selector = this.selector;
      return this.each(function (i) {
        document.addEventListener(type, function (event) {
          var debug = document.getElementById("debug");
          var temp = `_selector : ${_selector} => ${event.type} on ${event.target.id}`;
          console.log(`_selector : ${_selector} => ${event.type} on ${event.target.id}`);
          if (_selector === null) {
            if (debug) debug.value = temp + "\n" + debug.value;
            fn(event); // fn.call(event.target, event);
            event.stopImmediatePropagation();
            return false;
          } else if (event.target.closest(_selector)) {
            if (debug) debug.value = temp + " => closest\n" + debug.value;
            console.log(`  dispatch : closest`);
            fn(event); // fn.call(event.target, event);
            event.stopImmediatePropagation();
            return false;
          } else if (event.target.matches(_selector)) {
            if (debug) debug.value = temp + " => matches\n" + debug.value;
            console.log(`  dispatch : matches`);
            fn(event); // fn.call(event.target, event);
            event.stopImmediatePropagation();
            return false;
          } else {
            if (debug) debug.value = temp + " => none\n" + debug.value;
            console.log(`  dispatch : none`);
          }
        }, false);
      });
    },
    addClass: function (v) {
      // Adds one specified class to each matched element
      return this.each(function (i) {
        if (i.classList) {
          i.classList.add(v);
        } else {
          i.className += " " + v;
        }
      });
    },
    removeClass: function (v) {
      // Remove one single class from each matched element
      return this.each(function (i) {
        if (i.classList) {
          i.classList.remove(v);
        } else {
          i.className = i.className.replace(new RegExp(v + " *", "g"), "");
        }
      });
    },
    html: function (v) {
      // Set the HTML content of each matched element
      return this.each(function (i) {
        i.innerHTML = v;
        // ou .remove() puis .append() ?
      });
    },
    append: function (v) {
      // Insert HTML content or elements to the end of each matched element
      return this.each(function (i) {
        i.insertAdjacentHTML("beforeend", v);
      });
    },
    text: function (v) {
      // Set the text content of each matched element
      return this.each(function (i) {
        i.textContent = v;
      });
    },
    remove: function () {
      // Remove each matched element from the DOM
      return this.each(function (i) {
        i.parentNode.removeChild(i);
      });
    },
    draggable: function (a) {
      // Avoid jQuery UI drag&drop errors
      return this;
    },
    droppable: function (a) {
      // Avoid jQuery UI drag&drop errors
      return this;
    },
    parent: function () {
      // Get the parent of the first matched element
      this.value = [this.value[0].parentNode];
      return this;
    },
    attr: function (v) {
      // Get the attribute value of the first matched element
      return this.value[0].getAttribute(v);
    },
  };

  window.$ = function (selector) {
    return new dQuery(selector);
  };

})();
