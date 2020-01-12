'use strict';

var NONE = '<None>';

/**
 * Compare two nodes according to some criterias and return a tooltip message.
 * @param  {Node} original
 * @param  {Node} node
 * @param  {Array} criterias
 * @return {String}
 */
function diffToTitle(original, node, criterias) {
    return criterias.reduce(function (title, criteria) {
        var originalValue = original ? criteria.value(original) : null;
        var modifiedValue = criteria.value(node);

        if (originalValue == modifiedValue || criteria.ignoreUnset && !original) {
            return title;
        }

        title = title ? title + ', ' : '';

        if (originalValue) {
            title += criteria.label + ': ' + (originalValue || NONE) + ' => ' + (modifiedValue || NONE);
        } else {
            title += criteria.label + ': ' + modifiedValue;
        }

        return title;
    }, '');
}

module.exports = diffToTitle;