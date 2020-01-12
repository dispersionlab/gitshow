'use strict';

var _require = require('immutable'),
    List = _require.List;

/**
 * Split a text node into a list of range.
 * Range are defined by common marks and words.
 *
 * @param {Text} node
 * @return {List<Range>}
 */


function getRangesFromText(text) {
    var ranges = text.getRanges().reduce(function (result, range) {
        var words = range.text.split(/(\s+)/);

        words.forEach(function (word) {
            if (!word) {
                return;
            }

            result.push(range.set('text', word));
        });

        return result;
    }, []);

    return List(ranges);
}

module.exports = getRangesFromText;