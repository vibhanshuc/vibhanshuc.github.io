/** author: vibhanshu chaturvedi **/
'use strict';
var w = 200, h = 220, padding = 2, dataset = [5, 10, 13, 19, 21, 25, 11, 25, 22, 18 ];

var svg = d3.select('#svg-dataset')
            .append('svg')
            .attr({'width': w, 'height': h});

svg.selectAll('rect')
    .data(dataset)
    .enter()
    .append('rect')
    .attr({
        x: function (d, i) { return i * (w / dataset.length); },
        y: function (d) { return h - (d * 4); },
        width: w / dataset.length - padding,
        height: function (d) { return d * 4; },
        fill:  function (d) { return 'rgb(0 ,' + (d * 4 + 10) + ' , 0)'; }
    });

svg.selectAll('text')
    .data(dataset)
    .enter()
    .append('text')
    .text(function (d) { return d; })
    .attr({
        'text-anchor': 'middle',
        x: function (d, i) { return i * (w / dataset.length) + (w / dataset.length - padding) / 2; },
        y: function (d) { return h - (d * 4) + 14; },
        'font-size': 12,
        'fill': '#ffffff'
    });


var svgLine = d3.select('#d3-line-chart')
                  .append('svg')
                  .attr({width: w, height: h});

var monthlySales = [
    {'month': 10, 'sales': 20},
    {'month': 20, 'sales': 14},
    {'month': 30, 'sales': 20},
    {'month': 40, 'sales': 21},
    {'month': 50, 'sales': 15},
    {'month': 60, 'sales': 22},
    {'month': 70, 'sales': 9},
    {'month': 80, 'sales': 6},
    {'month': 90, 'sales': 23},
    {'month': 100, 'sales': 70}
];

var lineFun = d3.svg.line()
    .x(function (d) { return d.month * 2; })
    .y(function (d) { return h - d.sales; })
    .interpolate('linear');

var viz = svgLine.append('path')
        .attr({
            d: lineFun(monthlySales),
            'stroke': 'purple',
            'stroke-width': 2,
            'fill': 'none'
        });