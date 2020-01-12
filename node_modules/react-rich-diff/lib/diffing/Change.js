'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _require = require('immutable'),
    List = _require.List,
    Record = _require.Record;

var TYPES = require('./TYPES');

var KEY = 0;

var DEFAULTS = {
    key: String(),
    type: String(TYPES.IDENTICAL),
    // Matching score (0 for ADDED/REMOVED, 1 for IDENTICAL, 0 - 1 for MODIFIED)
    score: Number(0),
    original: null,
    modified: null,
    children: null
};

var Change = function (_Record) {
    _inherits(Change, _Record);

    function Change() {
        _classCallCheck(this, Change);

        return _possibleConstructorReturn(this, (Change.__proto__ || Object.getPrototypeOf(Change)).apply(this, arguments));
    }

    _createClass(Change, [{
        key: 'serializeToJSON',
        value: function serializeToJSON(serializeNode) {
            var type = this.type,
                original = this.original,
                modified = this.modified,
                children = this.children;


            switch (type) {
                case TYPES.REMOVED:
                case TYPES.IDENTICAL:
                    return {
                        type: type,
                        original: serializeNode(original)
                    };
                case TYPES.ADDED:
                    return {
                        type: type,
                        modified: serializeNode(modified)
                    };
                case TYPES.MODIFIED:
                    return {
                        type: type,
                        // score,
                        original: serializeNode(original),
                        modified: serializeNode(modified),
                        children: children.map(function (child) {
                            return child.serializeToJSON(serializeNode);
                        }).toArray()
                    };
            }
        }
    }], [{
        key: 'create',
        value: function create(props) {
            return new Change(_extends({
                key: 'c' + KEY++
            }, props));
        }
    }, {
        key: 'createIdentity',
        value: function createIdentity(value) {
            return Change.create({
                type: TYPES.IDENTICAL,
                score: 1,
                original: value,
                modified: value
            });
        }
    }, {
        key: 'createAddition',
        value: function createAddition(modified) {
            return Change.create({
                type: TYPES.ADDED,
                score: 0,
                modified: modified
            });
        }
    }, {
        key: 'createRemoval',
        value: function createRemoval(original) {
            return Change.create({
                type: TYPES.REMOVED,
                score: 0,
                original: original
            });
        }
    }, {
        key: 'createUpdate',
        value: function createUpdate(original, modified, score, children) {
            return Change.create({
                type: TYPES.MODIFIED,
                original: original,
                modified: modified,
                score: score,
                children: List(children)
            });
        }

        /**
         * Calcul score for a list of changes.
         * @param  {List<Change>} changes
         * @return {Number} score
         */

    }, {
        key: 'getScore',
        value: function getScore(changes) {
            if (changes.size == 0) {
                return 1;
            }

            var count = changes.reduce(function (accu, change) {
                return accu + change.score;
            }, 0);

            return count / changes.size;
        }
    }]);

    return Change;
}(Record(DEFAULTS));

module.exports = Change;
module.exports.TYPES = TYPES;