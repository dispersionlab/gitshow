'use strict';

var _require = require('immutable'),
    List = _require.List;

var TYPES = require('./TYPES');

/**
 * Group changes to wrap identical nodes.
 * @param  {List<Change>} changes
 * @param  {Number} minToWrap
 * @param  {Number} borderSize
 * @return {List<Change|List<Change>} groups
 */
function groupChanges(changes, minToWrap) {
    var borderSize = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;

    if (!minToWrap) {
        return changes;
    }

    var results = [];
    var accu = [];

    changes.forEach(function (change, i) {
        var isLast = i == changes.size - 1;
        var isIdentical = change.type == TYPES.IDENTICAL;

        if (isIdentical) {
            accu.push(change);
        }

        if (!isIdentical || isLast) {
            if (accu.length > minToWrap) {
                var toWrap = accu.slice(0, -borderSize);
                var border = accu.slice(-borderSize);

                results.push(List(toWrap));
                results = results.concat(border);
            } else {
                results = results.concat(accu);
            }
            accu = [];
        }

        if (!isIdentical) {
            results.push(change);
        }
    });

    return List(results);
}

module.exports = groupChanges;