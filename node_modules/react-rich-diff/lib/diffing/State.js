'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _require = require('immutable'),
    List = _require.List,
    Record = _require.Record;

var diffNodes = require('./diffNodes');

var _require2 = require('slate'),
    Raw = _require2.Raw;

var DEFAULTS = {
    changes: List()
};

function serializeNode(node) {
    if (node.kind == 'range') {
        return Raw.serializeRange(node, { terse: true });
    } else {
        return Raw.serializeNode(node, { terse: true });
    }
}

var State = function (_Record) {
    _inherits(State, _Record);

    function State() {
        _classCallCheck(this, State);

        return _possibleConstructorReturn(this, (State.__proto__ || Object.getPrototypeOf(State)).apply(this, arguments));
    }

    _createClass(State, [{
        key: 'serializeToJSON',
        value: function serializeToJSON() {
            var changes = this.changes;

            return {
                changes: changes.map(function (child) {
                    return child.serializeToJSON(serializeNode);
                }).toArray()
            };
        }

        /**
         * Create a diff state from two document.
         * @param  {Document} original
         * @param  {Document} modified
         * @return {State}
         */

    }], [{
        key: 'create',
        value: function create(original, modified) {
            var changes = diffNodes(original.nodes, modified.nodes);

            return new State({ changes: changes });
        }
    }]);

    return State;
}(Record(DEFAULTS));

module.exports = State;