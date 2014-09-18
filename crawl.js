var combining_diacritical_marks = [
  "\u0300", // grave accent
  "\u0301", // acute accent
  "\u0302", // circumflex accent
  "\u0303", // tilde
  "\u0304", // macron
  "\u0305", // overline
  "\u0306", // breve
  "\u0307", // dot above
  "\u0308", // diaeresis
  "\u0309", // hook above
  "\u030a", // ring above
  "\u030b", // double acute accent
  "\u030c", // caron
  "\u030d", // vertical line above
  "\u030e", // double vertical line above
  "\u030f", // double grave accent
  "\u0310", // candrabindu
  "\u0311", // inverted breve
  "\u0312", // turned comma above
  "\u0313", // comma above
  "\u0314", // reversed comma above
  "\u0315", // comma above right
  "\u0316", // grave accent below
  "\u0317", // acute accent below
  "\u0318", // left tack below
  "\u0319", // right tack below
  "\u031a", // left angle above
  "\u031b", // horn
  "\u031c", // left half ring below
  "\u031d", // up tack below
  "\u031e", // down tack below
  "\u031f", // plus sign below
  "\u0320", // minus sign below
  "\u0321", // palatalized hook below
  "\u0322", // retroflex hook below
  "\u0323", // dot below
  "\u0324", // diaeresis below
  "\u0325", // ring below
  "\u0326", // comma below
  "\u0327", // cedilla
  "\u0328", // ogonek
  "\u0329", // vertical line below
  "\u032a", // bridge below
  "\u032b", // inverted double arch below
  "\u032c", // caron below
  "\u032d", // circumflex accent below
  "\u032e", // breve below
  "\u032f", // inverted breve below
  "\u0330", // tilde below
  "\u0331", // macron below
  "\u0332", // low line
  "\u0333", // double low line
  "\u0334", // tilde overlay
  "\u0335", // short stroke overlay
  "\u0336", // long stroke overlay
  "\u0337", // short solidus overlay
  "\u0338", // long solidus overlay
  "\u0339", // right half ring below
  "\u033a", // inverted bridge below
  "\u033b", // square below
  "\u033c", // seagull below
  "\u033d", // x above
  "\u033e", // vertical tilde
  "\u033f", // double overline
  "\u0340", // grave tone mark
  "\u0341", // acute tone mark
  "\u0342", // greek perispomeni
  "\u0343", // greek koronis
  "\u0344", // greek dialytika tonos
  "\u0345", // greek ypogegrammeni
  "\u0346", // bridge above
  "\u0347", // equals sign below
  "\u0348", // double vertical line below
  "\u0349", // left angle below
  "\u034a", // not tilde above
  "\u034b", // homothetic above
  "\u034c", // almost equal to above
  "\u034d", // left right arrow below
  "\u034e", // upwards arrow below
  // "\u034f", // grapheme joiner
  "\u0350", // right arrowhead above
  "\u0351", // left half ring above
  "\u0352", // fermata
  "\u0353", // x below
  "\u0354", // left arrowhead below
  "\u0355", // right arrowhead below
  "\u0356", // right arrowhead and up arrowhead below
  "\u0357", // right half ring above
  "\u0358", // dot above right
  "\u0359", // asterisk below
  "\u035a", // double ring below
  "\u035b", // zigzag above
  "\u035c", // double breve below
  "\u035d", // double breve
  "\u035e", // double macron
  "\u035f", // double macron below
  "\u0360", // double tilde
  "\u0361", // double inverted breve
  "\u0362", // double rightwards arrow below
  "\u0363", // latin small letter a
  "\u0364", // latin small letter e
  "\u0365", // latin small letter i
  "\u0366", // latin small letter o
  "\u0367", // latin small letter u
  "\u0368", // latin small letter c
  "\u0369", // latin small letter d
  "\u036a", // latin small letter h
  "\u036b", // latin small letter m
  "\u036c", // latin small letter r
  "\u036d", // latin small letter t
  "\u036e", // latin small letter v
  "\u036f" // latin small letter x
]

var Crawly = function() {
  this.longestNodeLength = -1;
  this.textarea = document.createElement("textarea");
};

Crawly.prototype.getTextNodes = function() {
  if (this.nodes) {
    return this.nodes;
  }

  this.nodes = [];
  var elements = document.getElementsByTagName("*");
  for (var i = 0; i < elements.length; i++) {
    var element = elements[i];
    var childNodes = element.childNodes;
    for (var j = 0; j < childNodes.length; j++) {
      var node = childNodes[j];
      if (node && node.nodeType == Text.TEXT_NODE) {
        if (node.textContent.match(/\S/)) {
          this.nodes.push(node);
          if (node.length > this.longestNodeLength) {
            this.longestNodeLength = node.length;
          }
        }
      }
    }
  }
  return this.nodes;
};

Crawly.prototype.decodeHTML = function(html) {
  this.textarea.innerHTML = html;
  return this.textarea.value;
};

Crawly.prototype.getRandomInteger = function(max) {
  return Math.floor(Math.random() * max);
};

Crawly.prototype.getRandomElement = function(ary) {
  return ary[this.getRandomInteger(ary.length)];
};

Crawly.prototype.getRandomCombiningDiacriticalMark = function() {
  return this.getRandomElement(combining_diacritical_marks);
},

Crawly.prototype.crawl = function() {
  var node = this.getRandomElement(this.getTextNodes());
  var str = this.decodeHTML(node.textContent);

  var insertionPoint = this.getRandomInteger(this.longestNodeLength) + 1;
  if (insertionPoint <= str.length) {
    var c = str[insertionPoint - 1];
    if (c >= "a" && c <= "z" || c >= "A" && c <= "Z" || c >= "\u0300" && c <= "\u036f") {
      var out = str.slice(0, insertionPoint);
      // var times = this.getRandomInteger(8);
      // for (var i = 0; i < times; i++) {
        out = out + this.getRandomCombiningDiacriticalMark();
      // }
      out = out + str.slice(insertionPoint, str.length);
      node.textContent = out;
    }
  }

  window.setTimeout(this.crawl.bind(this), 100);
}

var crawly = new Crawly();
crawly.crawl()
