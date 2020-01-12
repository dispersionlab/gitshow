'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _require = require('immutable'),
    List = _require.List,
    Record = _require.Record;

var Change = require('./Change');
var lcs = require('./lcs');

var DEFAULTS = {
    // Compare if two nodes are of the same type (for example "are they both paragraphs ?")
    isVariant: function isVariant(a, b) {
        return a == b;
    },
    // Compare if two nodes have the same props
    isEqual: function isEqual(a, b) {
        return a == b;
    },
    // Return children for an entry
    getChildren: function getChildren(a) {
        return [];
    },
    // Lower-limit to consider two nodes has modified
    getThreshold: function getThreshold(a, b) {
        return 0.3;
    }
};

var Differ = function (_Record) {
    _inherits(Differ, _Record);

    function Differ() {
        _classCallCheck(this, Differ);

        return _possibleConstructorReturn(this, (Differ.__proto__ || Object.getPrototypeOf(Differ)).apply(this, arguments));
    }

    _createClass(Differ, [{
        key: 'compare',


        /**
         * Compare two nodes.
         * @param {T} a
         * @param {T} b
         * @return {Boolean|Mixed}
         */
        value: function compare(a, b) {
            if (!this.isVariant(a, b)) {
                return false;
            }

            var children = this.diff(this.getChildren(a), this.getChildren(b));

            var score = Change.getScore(children);
            if (score < this.getThreshold(a, b)) {
                return false;
            }

            return {
                score: score,
                children: children
            };
        }

        /**
         * Create a diff from a LCS matrix.
         *
         * @param  {Array<Array<Number>>} matrix
         * @param  {Array<T>} xs
         * @param  {Array<T>} ys
         * @param  {Number} i
         * @param  {Number} j
         * @return {Array<Change>} changes
         */

    }, {
        key: 'diffFromLCS',
        value: function diffFromLCS(matrix, xs, ys, i, j) {
            if (i === 0 && j === 0) {
                return [];
            }

            var xv = xs[i - 1];
            var yv = ys[j - 1];

            var variant = xv && yv && matrix[i] && matrix[i][j] ? matrix[i][j].result : null;

            if (i > 0 && j > 0 && variant) {
                var areNodesEqual = this.isEqual(xv, yv);
                var change = areNodesEqual && variant.score == 1 ? Change.createIdentity(xv) : Change.createUpdate(xv, yv, (areNodesEqual ? 1 : 0.5) * variant.score, variant.children);

                return this.diffFromLCS(matrix, xs, ys, i - 1, j - 1).concat([change]);
            } else if (j > 0 && (i === 0 || matrix[i][j - 1].value >= matrix[i - 1][j].value)) {
                return this.diffFromLCS(matrix, xs, ys, i, j - 1).concat([Change.createAddition(yv)]);
            } else if (i > 0 && (j === 0 || matrix[i][j - 1].value < matrix[i - 1][j].value)) {
                return this.diffFromLCS(matrix, xs, ys, i - 1, j).concat([Change.createRemoval(xv)]);
            } else {
                throw new Error('Invalid LCS matrix');
            }
        }

        /**
         * Diff two tree of items.
         *
         * @param  {List}  original
         * @param  {List}  modified
         * @return {List<Change>}
         */

    }, {
        key: 'diff',
        value: function diff(original, modified) {
            var _this2 = this;

            original = List(original).toArray();
            modified = List(modified).toArray();

            if (original.length == 0 && modified.length == 0) {
                return List();
            }

            var matrix = lcs.computeLcsMatrix(original, modified, function (a, b) {
                return _this2.compare(a, b);
            });

            var result = this.diffFromLCS(matrix, original, modified, original.length, modified.length);

            return List(result);
        }
    }], [{
        key: 'create',


        /**
         * Create a new differ.
         * @param {Object} props
         */
        value: function create(props) {
            return new Differ(props);
        }
    }]);

    return Differ;
}(Record(DEFAULTS));

module.exports = Differ;