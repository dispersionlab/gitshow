'use strict';

var _nodes, _marks;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/* eslint-disable react/prop-types */
var React = require('react');

var _require = require('markup-it'),
    BLOCKS = _require.BLOCKS,
    MARKS = _require.MARKS,
    INLINES = _require.INLINES;

var Heading = require('./Heading');
var Image = require('./Image');
var Link = require('./Link');
var Table = require('./Table');

function componentFromTag(tagName) {
    return function (props) {
        return React.createElement(tagName, _extends({}, props.attributes), props.children);
    };
}

var SCHEMA = {
    defaultBlock: componentFromTag('div'),
    defaultInline: componentFromTag('span'),
    // Nodes
    nodes: (_nodes = {}, _defineProperty(_nodes, BLOCKS.PARAGRAPH, componentFromTag('p')), _defineProperty(_nodes, BLOCKS.BLOCKQUOTE, componentFromTag('blockquote')), _defineProperty(_nodes, BLOCKS.HR, function (props) {
        return React.createElement('hr', props.attributes);
    }), _defineProperty(_nodes, BLOCKS.CODE, componentFromTag('pre')), _defineProperty(_nodes, BLOCKS.TABLE, Table), _defineProperty(_nodes, BLOCKS.TABLE_ROW, componentFromTag('tr')), _defineProperty(_nodes, BLOCKS.TABLE_CELL, componentFromTag('td')), _defineProperty(_nodes, BLOCKS.UL_LIST, componentFromTag('ul')), _defineProperty(_nodes, BLOCKS.OL_LIST, componentFromTag('ol')), _defineProperty(_nodes, BLOCKS.LIST_ITEM, componentFromTag('li')), _defineProperty(_nodes, BLOCKS.HEADING_1, Heading), _defineProperty(_nodes, BLOCKS.HEADING_2, Heading), _defineProperty(_nodes, BLOCKS.HEADING_3, Heading), _defineProperty(_nodes, BLOCKS.HEADING_4, Heading), _defineProperty(_nodes, BLOCKS.HEADING_5, Heading), _defineProperty(_nodes, BLOCKS.HEADING_6, Heading), _defineProperty(_nodes, INLINES.IMAGE, Image), _defineProperty(_nodes, INLINES.LINK, Link), _nodes),
    marks: (_marks = {}, _defineProperty(_marks, MARKS.BOLD, componentFromTag('strong')), _defineProperty(_marks, MARKS.ITALIC, componentFromTag('em')), _defineProperty(_marks, MARKS.STRIKETHROUGH, componentFromTag('del')), _defineProperty(_marks, MARKS.CODE, componentFromTag('code')), _marks)
};

module.exports = SCHEMA;