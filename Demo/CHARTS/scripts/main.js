"use strict";!function(){var e=["Jan","Feb","Mar","Apr","May","June","July","Aug","Sep","Oct","Nov","Dec"],o=_.map(e,function(e){return e.toUpperCase()}),t=_.times(12,_.random.bind(_,30,40));new Chartist.Line("#chart1",{labels:o,series:[t]},{height:"400px",fullWidth:!0,axisX:{showGrid:!0,showLabel:!0,labelOffset:{x:40,y:-60},offset:30},axisY:{showGrid:!1,showLabel:!1,offset:0,position:"end"},low:30,high:40,showPoint:!1,showLine:!0,showArea:!0,chartPadding:0});var s=new Chartist.Bar("#chart2",{labels:["USA","FRA","ITA","NZ","RSA","ESP"],series:[[201,181,161,141,121,11],[200,180,160,140,120,10]]},{width:"400px",height:"300px",seriesBarDistance:0,axisX:{showGrid:!0,showLabel:!0,labelOffset:{x:0,y:20}},axisY:{onlyInteger:!0,scaleMinSpace:20,showGrid:!1,showLabel:!0}});s.on("created",function(e){var o=e.svg.elem("defs");o.elem("linearGradient",{id:"gradient",x2:"40%",y2:"80%",gradientUnits:"userSpaceOnUse"}).elem("stop",{offset:"0","stop-color":"#48afc1"}).parent().elem("stop",{offset:"1","stop-color":"#ab6294"})});var n=new Chartist.Bar("#chart3",{labels:["USA","FRA","ITA","NZ","RSA","ESP"],series:[[201,181,161,141,121,11],[200,180,160,140,120,10]]},{width:"400px",height:"300px",seriesBarDistance:0,axisX:{showGrid:!0,showLabel:!0,labelOffset:{x:0,y:20}},axisY:{onlyInteger:!0,scaleMinSpace:20,showGrid:!1,showLabel:!0}});n.on("created",function(e){var o=e.svg.elem("defs");o.elem("linearGradient",{id:"gradient",x2:"40%",y2:"80%",gradientUnits:"userSpaceOnUse"}).elem("stop",{offset:"0","stop-color":"#48afc1"}).parent().elem("stop",{offset:"1","stop-color":"#ab6294"})});new Chartist.Pie("#delivered",{series:[10,20],labels:[1,2]},{width:"400px",height:"300px",donut:!0,donutWidth:10,showLabel:!0}),new Chartist.Pie("#pre-arrival",{series:[10,20],labels:[1,2]},{width:"400px",height:"300px",labelPosition:"center",labelOffset:30,donut:!0,donutWidth:10,showLabel:!0}),c3.generate({bindto:"#c3-chart-donut-1",data:{columns:[["data1",30],["data2",120]],type:"donut",onclick:function(e,o){console.log("onclick",e,o)},onmouseover:function(e,o){console.log("onmouseover",e,o)},onmouseout:function(e,o){console.log("onmouseout",e,o)}},size:{width:180},donut:{width:6,title:"Iris Petal Width"},legend:{show:!1},interaction:{enabled:!1}}),c3.generate({bindto:"#c3-chart-donut-2",data:{columns:[["data1",10],["data2",120]],type:"donut",onclick:function(e,o){console.log("onclick",e,o)},onmouseover:function(e,o){console.log("onmouseover",e,o)},onmouseout:function(e,o){console.log("onmouseout",e,o)}},size:{width:180},donut:{width:6,title:"Iris Petal Width"},legend:{show:!1},interaction:{enabled:!1}})}();