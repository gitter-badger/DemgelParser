var TokenRegex_1 = require('../../TokenRegex');
var Helpers_1 = require('../../Helpers');
var markdown_style_rules_1 = require('./markdown-style-rules');
var MarkdownStyleSpec = (function () {
    function MarkdownStyleSpec() {
        this.rules = new markdown_style_rules_1.MarkdownStyleRules();
        this.regexTokens = [
            new NewLine(this.rules.block.newline),
            new CodeBlock(this.rules.block.code),
            new HrBlock(this.rules.block.hr),
            new BlockQuote(this.rules.block.blockquote),
            new HeadingBlock(this.rules.block.heading),
            new LHeading(this.rules.block.lheading),
            new Paragraph(this.rules.block.paragraph),
            new Text(this.rules.block.text),
            // Inline
            new SpanTag(this.rules.inline.span),
            new InlineText(this.rules.inline.text)
        ];
    }
    MarkdownStyleSpec.prototype.preProcess = function (source) {
        source.source
            .replace(/\r\n|\r/g, '\n')
            .replace(/\t/g, '    ')
            .replace(/\u00e0/g, ' ')
            .replace(/\u2424/g, '\n');
    };
    return MarkdownStyleSpec;
})();
exports.MarkdownStyleSpec = MarkdownStyleSpec;
var NewLine = (function () {
    function NewLine(reg) {
        this.parseType = TokenRegex_1.TokenParseType.Block;
        this.priority = 0;
        this.regex = reg;
    }
    NewLine.prototype.validate = function (matches) {
        return true;
    };
    NewLine.prototype.apply = function (source, matches) {
        source.source = source.source.substring(matches[0].length);
        return [{}];
    };
    return NewLine;
})();
var CodeBlock = (function () {
    function CodeBlock(reg) {
        this.parseType = TokenRegex_1.TokenParseType.Block;
        this.priority = 1;
        this.regex = reg;
    }
    CodeBlock.prototype.validate = function (matches) {
        return true;
    };
    CodeBlock.prototype.apply = function (source, matches, options) {
        source.source = source.source.substring(matches[0].length);
        var cap = matches[0].replace(/^ {4}/gm, '');
        return [{ openTag: '<pre><code>',
                closeTag: '</code></pre>\n',
                text: { source: cap },
                sanitize: false }];
    };
    return CodeBlock;
})();
var HrBlock = (function () {
    function HrBlock(reg) {
        this.parseType = TokenRegex_1.TokenParseType.Block;
        this.priority = 2;
        this.regex = reg;
    }
    HrBlock.prototype.validate = function (matches) {
        return true;
    };
    HrBlock.prototype.apply = function (source, matches) {
        source.source = source.source.substring(matches[0].length);
        return [{ openTag: '<hr>\n' }];
    };
    return HrBlock;
})();
var HeadingBlock = (function () {
    function HeadingBlock(reg) {
        this.parseType = TokenRegex_1.TokenParseType.Block;
        this.priority = 3;
        this.regex = reg;
    }
    HeadingBlock.prototype.validate = function (matches) {
        return true;
    };
    HeadingBlock.prototype.apply = function (source, matches, options) {
        source.source = source.source.substring(matches[0].length);
        var token = '<h' + matches[1].length;
        var styles = Helpers_1.validateStyle(matches[2], options);
        if (styles !== '') {
            token = token + ' style="' + styles + '"';
        }
        var classes = Helpers_1.validateClass(matches[3], options);
        if (classes !== '') {
            token = token + ' class="' + classes + '"';
        }
        token = token + '>';
        return [{ openTag: token,
                closeTag: '</h' + matches[1].length + '>\n',
                text: { source: matches[4] } }];
    };
    return HeadingBlock;
})();
var LHeading = (function () {
    function LHeading(reg) {
        this.parseType = TokenRegex_1.TokenParseType.Block;
        this.priority = 4;
        this.regex = reg;
    }
    LHeading.prototype.validate = function (matches) {
        return true;
    };
    LHeading.prototype.apply = function (source, matches) {
        source.source = source.source.substring(matches[0].length);
        return [{ openTag: '<h' + (matches[2] === '=' ? 1 : 2) + '>',
                closeTag: '</h' + (matches[2] === '=' ? 1 : 2) + '>\n',
                text: { source: matches[1] } }];
    };
    return LHeading;
})();
var Paragraph = (function () {
    function Paragraph(reg) {
        this.parseType = TokenRegex_1.TokenParseType.Block;
        this.priority = 5;
        this.regex = reg;
    }
    Paragraph.prototype.validate = function (matches) {
        return true;
    };
    Paragraph.prototype.apply = function (source, matches) {
        source.source = source.source.substring(matches[0].length);
        return [{ openTag: '<p>',
                closeTag: '</p>\n',
                text: { source: matches[1].charAt(matches[1].length - 1) === '\n'
                        ? matches[1].slice(0, -1)
                        : matches[1] } }];
    };
    return Paragraph;
})();
var Text = (function () {
    function Text(reg) {
        this.parseType = TokenRegex_1.TokenParseType.Block;
        this.priority = 6;
        this.regex = reg;
    }
    Text.prototype.validate = function (matches) {
        return true;
    };
    Text.prototype.apply = function (source, matches) {
        source.source = source.source.substring(matches[0].length);
        return [{ text: { source: matches[0] } }];
    };
    return Text;
})();
var BlockQuote = (function () {
    function BlockQuote(reg) {
        this.parseType = TokenRegex_1.TokenParseType.Block;
        this.priority = 7;
        this.regex = reg;
    }
    BlockQuote.prototype.validate = function (matches) {
        return true;
    };
    BlockQuote.prototype.apply = function (source, matches) {
        source.source = source.source.substring(matches[0].length);
        return [{
                openTag: '<blockquote>\n',
                text: { source: matches[0].replace(/^ *> ?/gm, '') },
                processBlock: true
            },
            {
                closeTag: '</blockquote>\n'
            }];
    };
    return BlockQuote;
})();
/**
 * Inline Classes
 */
var SpanTag = (function () {
    function SpanTag(reg) {
        this.parseType = TokenRegex_1.TokenParseType.Inline;
        this.priority = 75;
        this.regex = reg;
    }
    SpanTag.prototype.validate = function () {
        return true;
    };
    SpanTag.prototype.apply = function (source, matches, options) {
        console.log(matches);
        source.source = source.source.substring(matches[0].length);
        var token = '<span';
        var styles = Helpers_1.validateStyle(matches[1], options);
        if (styles !== '') {
            token = token + ' style="' + styles + '"';
        }
        var classes = Helpers_1.validateClass(matches[2], options);
        if (classes !== '') {
            token = token + ' class="' + classes + '"';
        }
        token = token + '>';
        return [{
                openTag: token,
                closeTag: '</span>',
                text: { source: matches[3] }
            }];
    };
    return SpanTag;
})();
var InlineText = (function () {
    function InlineText(reg) {
        this.parseType = TokenRegex_1.TokenParseType.Inline;
        this.priority = 100;
        this.regex = reg;
    }
    InlineText.prototype.validate = function (matches) {
        return true;
    };
    InlineText.prototype.apply = function (source, matches) {
        source.source = source.source.substring(matches[0].length);
        return [{ text: { source: matches[0] } }];
    };
    return InlineText;
})();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFya2Rvd24tc3R5bGUuanMiLCJzb3VyY2VSb290IjoidHMvIiwic291cmNlcyI6WyJzcmMvbW9kZXMvbWFya2Rvd24tc3R5bGUvbWFya2Rvd24tc3R5bGUudHMiXSwibmFtZXMiOlsiTWFya2Rvd25TdHlsZVNwZWMiLCJNYXJrZG93blN0eWxlU3BlYy5jb25zdHJ1Y3RvciIsIk1hcmtkb3duU3R5bGVTcGVjLnByZVByb2Nlc3MiLCJOZXdMaW5lIiwiTmV3TGluZS5jb25zdHJ1Y3RvciIsIk5ld0xpbmUudmFsaWRhdGUiLCJOZXdMaW5lLmFwcGx5IiwiQ29kZUJsb2NrIiwiQ29kZUJsb2NrLmNvbnN0cnVjdG9yIiwiQ29kZUJsb2NrLnZhbGlkYXRlIiwiQ29kZUJsb2NrLmFwcGx5IiwiSHJCbG9jayIsIkhyQmxvY2suY29uc3RydWN0b3IiLCJIckJsb2NrLnZhbGlkYXRlIiwiSHJCbG9jay5hcHBseSIsIkhlYWRpbmdCbG9jayIsIkhlYWRpbmdCbG9jay5jb25zdHJ1Y3RvciIsIkhlYWRpbmdCbG9jay52YWxpZGF0ZSIsIkhlYWRpbmdCbG9jay5hcHBseSIsIkxIZWFkaW5nIiwiTEhlYWRpbmcuY29uc3RydWN0b3IiLCJMSGVhZGluZy52YWxpZGF0ZSIsIkxIZWFkaW5nLmFwcGx5IiwiUGFyYWdyYXBoIiwiUGFyYWdyYXBoLmNvbnN0cnVjdG9yIiwiUGFyYWdyYXBoLnZhbGlkYXRlIiwiUGFyYWdyYXBoLmFwcGx5IiwiVGV4dCIsIlRleHQuY29uc3RydWN0b3IiLCJUZXh0LnZhbGlkYXRlIiwiVGV4dC5hcHBseSIsIkJsb2NrUXVvdGUiLCJCbG9ja1F1b3RlLmNvbnN0cnVjdG9yIiwiQmxvY2tRdW90ZS52YWxpZGF0ZSIsIkJsb2NrUXVvdGUuYXBwbHkiLCJTcGFuVGFnIiwiU3BhblRhZy5jb25zdHJ1Y3RvciIsIlNwYW5UYWcudmFsaWRhdGUiLCJTcGFuVGFnLmFwcGx5IiwiSW5saW5lVGV4dCIsIklubGluZVRleHQuY29uc3RydWN0b3IiLCJJbmxpbmVUZXh0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