var container = document.getElementById('visualization');

var options = {
  groupOrder: 'content',
  start: moment().startOf('day'),
  end: moment().endOf('day'),
  min: moment().startOf('day'),
  max: moment().endOf('day'),
  zoomMax: 24 * 60 * 60 * 1000,
  zoomMin: 15 * 60 * 1000,
  type: 'range'
};

var groups = new vis.DataSet([{
  id: 1,
  content: 'Contra'
}, {
  id: 2,
  content: 'Hangman'
}, {
  id: 3,
  content: 'Zelda'
}, {
  id: 4,
  content: 'Spartan'
}]);

var items = new vis.DataSet([{
  id: 1,
  group: 1,
  content: 'Item 1',
  start: moment().add(30, 'minutes'),
  end: moment().add(90, 'minutes')
}, {
  id: 2,
  group: 2,
  content: 'Item 2',
  start: moment().add(90, 'minutes'),
  end: moment().add(150, 'minutes')
}, {
  id: 3,
  group: 1,
  content: 'Item 3',
  start: moment().subtract(20, 'minutes'),
  end: moment()
}, {
  id: 4,
  group: 3,
  content: 'Item 4',
  start: moment().subtract(120, 'minutes'),
  end: moment().subtract(90, 'minutes')
}, {
  id: 5,
  group: 4,
  content: 'Item 5',
  start: moment().startOf('day'),
  end: moment().startOf('day').add(50, 'minutes')
}, {
  id: 6,
  group: 3,
  content: 'Item 6',
  start: moment().startOf('day').add(6, 'hours'),
  end: moment().startOf('day').add(9, 'hours'),
}]);

var timeline = new vis.Timeline(container);
timeline.setOptions(options);
timeline.setGroups(groups);
timeline.setItems(items);

function nextDate() {
  options.start.add(1, 'day');
  options.end.add(1, 'day');
  updateTimeLineOptions();
}

function previousDate() {
  options.start.subtract(1, 'day');
  options.end.subtract(1, 'day');
  updateTimeLineOptions();
}

function currentDate() {
  options.start = moment().startOf('day');
  options.end = moment().endOf('day');
  updateTimeLineOptions();
}

function updateTimeLineOptions() {
  console.log(options);
  timeline.setOptions({
    start: options.start,
    end: options.end,
    min: options.start,
    max: options.end
  });
}

document.getElementById('moveToPreviousDate').onclick = function () {
  previousDate();
};

document.getElementById('moveToNextDate').onclick = function () {
  nextDate();
};

document.getElementById('moveToCurrentDate').onclick = function () {
  currentDate();
};

document.getElementById('moveToCustomDate').onchange = function () {
  console.log(this.value);
  options.start = moment(this.value).startOf('day');
  options.end = moment(this.value).endOf('day');
  updateTimeLineOptions();
};