 (function() {
        (function init() {
            polyfillGetElementsByClassName();
            var containers = document.getElementsByClassName("adc-gender");
            for (var j = 0, l = containers.length; j < l; j++) {
                var labels = containers[j].getElementsByTagName("label"),
                    inputs = containers[j].getElementsByTagName("input"),
                    autoFwd = (hasClass(containers[j], "autoforward")) ? true : false;
                for (var i = 0, k = labels.length; i < k; i++) {
                    labels[i].onclick = checkIt;
                    inputs[i].onclick = checkClass(i,autoFwd);
                    labels[i].onmouseover = hoverClass(i);
                    labels[i].onmouseout = outClass(i);
                }
            }
        }());

        // Polyfill: Add a getElementsByClassName function IE < 9
        function polyfillGetElementsByClassName() {
            if (!document.getElementsByClassName) {
                document.getElementsByClassName = function(search) {
                    var d = document, elements, pattern, i, results = [];
                    if (d.querySelectorAll) { // IE8
                        return d.querySelectorAll("." + search);
                    }
                    if (d.evaluate) { // IE6, IE7
                        pattern = ".//*[contains(concat(' ', @class, ' '), ' " + search + " ')]";
                        elements = d.evaluate(pattern, d, null, 0, null);
                        while ((i = elements.iterateNext())) {
                            results.push(i);
                        }
                    } else {
                        elements = d.getElementsByTagName("*");
                        pattern = new RegExp("(^|\\s)" + search + "(\\s|$)");
                        for (var j = 0, l = elements.length; j < l; j++) {
                            if ( pattern.test(elements[j].className) ) {
                                results.push(elements[j]);
                            }
                        }
                    }
                    return results;
                }
            }
        }

        function checkIt() {
            var input = document.getElementById(this.htmlFor);
            input.click();
        }

        function hasClass(ele, cls) {
            return ele.className.match(new RegExp('(\\s|^)' + cls + '(\\s|$)'));
        }

        function addClass(ele, cls) {
            if (!hasClass(ele, cls)) ele.className += " " + cls;
        }

        function removeClass(ele, cls) {
            if (hasClass(ele, cls)) {
                var reg = new RegExp('(\\s|^)' + cls + '(\\s|$)');
                ele.className = ele.className.replace(reg, '');
            }
        }

        function checkClass(index, bool) {
            return function () {
                var cls = (index == 0) ? "childOne" : "childTwo",
                    clsSel = (index == 0) ? "childOneSelected" : "childTwoSelected",
                    clsOther = (index == 0) ? "childTwo" : "childOne",
                    clsOtherSel = (index == 0) ? "childTwoSelected" : "childOneSelected",
                    container = this.parentNode.parentNode,
                    obj = container.getElementsByTagName("img")[index],
                    objOther = container.getElementsByTagName("img")[(index == 0) ? 1 : 0];
                removeClass(objOther, clsOtherSel);
                addClass(objOther, clsOther);
                removeClass(obj, cls);
                addClass(obj, clsSel);
                if (bool) document.getElementsByName("Next")[(document.getElementsByName("Next").length - 1)].click();
            }
        }

        function hoverClass(index) {
            return function () {
                var input = document.getElementById(this.htmlFor),
                    cls = (index == 0) ? "childOne" : "childTwo",
                    clsHover = (index == 0) ? "childOneHover" : "childTwoHover",
                    obj = this.children[0].children[0];
                removeClass(obj, cls);
                if (!input.checked) {
                    addClass(obj, clsHover);
                }
            }
        }

        function outClass(index) {
            return function () {
                var input = document.getElementById(this.htmlFor),
                    cls = (index == 0) ? "childOne" : "childTwo",
                    clsHover = (index == 0) ? "childOneHover" : "childTwoHover",
                    obj = this.children[0].children[0];
                removeClass(obj, clsHover);
                if (!input.checked) {
                    addClass(obj, cls);
                }
            }
        }
 }());
