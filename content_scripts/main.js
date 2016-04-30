window.classDetector = new ClassDetector(null, null, null);

var url = document.URL;
var header = document.getElementsByClassName('headerRed')[0];

console.log(header.innerText);

console.log(header.innerText.substring(0, 16));
if (header.innerText.substring(0, 16) === 'Course selection') {
  var addTable = document.getElementsByClassName('pitDarkDataTableSearch')[0];
  addTable.setAttribute('id', 'add-course-table');
  var $buttons = $('#add-course-table > tbody > tr > td > button');
  var $addCourseButton = $buttons[2];
  var i = 0;
  $.each($buttons, function () {
    i++;
    if (i === 3) {
      $(this).attr('id', 'add-course-button');
      $(this).attr('class', 'add-course-button');
    }
  });
  var classTableArea = document.getElementsByClassName('studentRightRailTable')[0];
  classTableArea.setAttribute('id', 'courses-to-add');
  var $classTable = $('#courses-to-add > form > class')[1];
  window.classAdder = new ClassAdder($classTable, $addCourseButton);
}
if (header.innerText === 'Course search') {
  var $courseSearchField = document.getElementById('courseIdSearchField');
  var $descriptionSearchField = document.getElementById('SW154Q88');
  var $inputProfessor = document.getElementsByTagName('input')[7];
  window.classDetector = new ClassDetector($courseSearchField, $descriptionSearchField, $inputProfessor);
  if (localStorage.getItem('found-one-item') === 'false' && localStorage.getItem('searched') === 'false' 
  	  && (localStorage.getItem('class-name') != undefined && localStorage.getItem('class-name') != '')) {
  	window.classDetector.search(localStorage.getItem('class-name'), '', localStorage.getItem('instructor-name'), localStorage.getItem('timeStart'), localStorage.getItem('endTime'), localStorage.getItem('daysOfWeek'));
  }
  var startTime = localStorage.getItem('timeStart');
  var endTime = localStorage.getItem('endTime');
  var retrievedDays = localStorage.getItem('daysOfWeek');
  var finishedAdding = localStorage.getItem('finishedAdding');
  //console.log(finishedAdding + 'is finishedAdding');
  var time = localStorage.getItem('time');
  var searched = localStorage.getItem('searched');
  window.classDetector.searched = searched === 'true';
  //console.log('finished adding retrieved as ' + finishedAdding);
  window.classDetector.state.startTime = startTime;
  window.classDetector.state.endTime = endTime;
  window.classDetector.state.dayOfWeek = retrievedDays;
  window.classDetector.parse();
  window.classDetector.addOpenClasses();

  if (window.classDetector.searched === true && localStorage.getItem('finishedAdding') === 'true') {
  	if (localStorage.getItem('found-one-item') === 'true') {
  	  console.log('going to add classes now');
      localStorage.setItem('add-classes', 'true');
      window.location.reload(true);
  	} else {
	  localStorage.setItem('searched', 'false');
	  console.log('going to refresh now');
	  window.classDetector.time = time;
	  console.log('time before refresh is ' + time);
	  setTimeout(function () { location = '' }, 60000);
    }
  }
}

if (header.innerText === 'Front page') {
  console.log('searched is ' + localStorage.getItem('searched'));
  if (localStorage.getItem('searched') === 'false') {
  	console.log('setting click add to false');
    localStorage.setItem('click-add', 'false');
  }
  console.log('click add is ' + localStorage.getItem('click-add'));
  if (localStorage.getItem('add-classes') === 'true' && localStorage.getItem('searched') === 'true') {
  	console.log('going to add some classes now');
  	localStorage.setItem('add-classes', 'false');
  	localStorage.setItem('found-one-item', 'false');
  	localStorage.setItem('finishedAdding', 'false');
  	localStorage.setItem('class-name', '');
  	localStorage.setItem('instructor-name', '');
  	localStorage.setItem('timeStart', '');
  	localStorage.setItem('endTime', '');
  	localStorage.setItem('daysOfWeek', '');
  	setTimeout(function () { window.classDetector.navigateAddClass() }, 5000);
  } else if (localStorage.getItem('click-add') === 'true') {
  	console.log('click course add!');
  	var clickLinkArea = document.getElementsByClassName('studentRightRailTableData')[1];
    var clickCourseAdd = clickLinkArea.getElementsByClassName('fastWhitelinkButton')[2];
    setTimeout(function () { clickCourseAdd.click() }, 5000);
  } else {
    window.classDetector.navigateBack();
    window.classDetector.finishedAdding = false;
    localStorage.setItem('finishedAdding', 'false');
    window.classDetector.searched = false;
    localStorage.setItem('searched', 'false');
  }
}