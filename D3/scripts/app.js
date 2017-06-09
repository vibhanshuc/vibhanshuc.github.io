/** author: vibhanshu chaturvedi **/
(function () {
  'use strict';
  /* global d3 */

  var w = 200,
      h = 220,
      padding = 2,
      dataset = [5, 10, 13, 19, 21, 25, 11, 25, 22, 18 ];

  d3.select('#svg-rect')
    .append('svg')
    .append('rect')
    .attr('width', 200)
    .attr('height', 300)
    .style('fill', 'violet');

  d3.select('#svg-circle')
    .append('svg')
    .attr('height', '50')
    .attr('width', '150')
    .append('circle')
    .attrs({'cx': 25, 'cy': 25, 'r': 25});

  var svg = d3.select('#svg-dataset')
    .append('svg')
    .attrs({'width': w, 'height': h});

  svg.selectAll('rect')
    .data(dataset)
    .enter()
    .append('rect')
    .attrs({
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
    .attrs({
      'text-anchor': 'middle',
      x: function (d, i) { return i * (w / dataset.length) + (w / dataset.length - padding) / 2; },
      y: function (d) { return h - (d * 4) + 14; },
      'font-size': 12,
      'fill': '#ffffff'
    });


  var svgLine = d3.select('#d3-line-chart')
    .append('svg')
    .attrs({width: w, height: h});

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

  var lineFun = d3.line()
    .x(function (d) { return d.month * 2; })
    .y(function (d) { return h - d.sales; })
    .curve(d3.curveBasis);

  var viz = svgLine.append('path')
    .attrs({
      d: lineFun(monthlySales),
      'stroke': 'purple',
      'stroke-width': 2,
      'fill': 'none'
    });

}());
