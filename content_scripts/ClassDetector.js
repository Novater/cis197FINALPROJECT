var ClassDetector = function ($classTextBox, $descriptionTextBox, $instructorTextBox) {
  this.state = {
	$classBox : $classTextBox,
	$descriptionBox : $descriptionTextBox,
	$instructorTextBox : $instructorTextBox,
	classOpenArray : [],
	startTime : '',
	endTime : '',
	dayOfWeek : '',
	finishedAdding : false,
	time : null,
	searched : false
  };
};

ClassDetector.prototype.search = function (className, description, instructor, startTime, endTime, daysOfWeek) {
  var thisClass = className;
  var thisDescription = description;
  var thisInstructor = instructor;
  this.state.startTime = startTime;
  this.state.endTime = endTime;
  this.state.dayOfWeek = daysOfWeek;
  localStorage.setItem('class-name', className);
  localStorage.setItem('instructor-name', instructor);
  localStorage.setItem('daysOfWeek', daysOfWeek);
  localStorage.setItem('timeStart', this.state.startTime);
  localStorage.setItem('endTime', this.state.endTime); 
  localStorage.setItem('finishedAdding', 'false'); 
  localStorage.setItem('found-one-item', 'false');
  localStorage.setItem('i-value', '0');
  localStorage.setItem('click-add', 'false');
  var searchButton = document.getElementsByClassName('fastGreenButton')[0];
  this.state.$classBox.value = thisClass;
  if (daysOfWeek != '') {
    this.state.$instructorTextBox.value = thisInstructor;
  } 
  this.state.time = new Date().getTime();

  localStorage.setItem('time', this.state.time.toString());
  this.state.searched = true;
  localStorage.setItem('searched', 'true');
  //this.state.$descriptionBox.value = thisDescription;
  //var instructorSearchField = document.getElementById('instructorNameComboId') = thisInstructor;
  searchButton.click();
};

ClassDetector.prototype.parse = function() { 
	
  var $filterStepOne = $('table');
  var i = 0;
  var $classTable;
  $.each($filterStepOne, function() {
    i++;
    if (i === 14) {
      $classTable = $(this);
      $classTable.attr('class', 'useful-table');
      $classTable.attr('id', 'useful-table');
    }
  });

  var $rows = $('#useful-table > tbody > tr');

  var j = 0;
  $.each($rows, function () {
    j++;
    if (j != 1) {
      $(this).attr('class', 'potential-class');
      $(this).attr('id', 'potential-class');
    }
  });
  
  var $rowCategories = $('#potential-class > td');
  var k = 0;
  $.each($rowCategories, function () {
    k++;
    if (k === 6) {
      $(this).attr('id', 'class-status');
      $(this).attr('class', 'class-status');
    }
    if (k === 7) {
      $(this).attr('id', 'class-time');
      $(this).attr('class', 'class-time');
    }
    if (k === 8) {
      $(this).attr('id', 'add-button');
      $(this).attr('class', 'add-button');
      k = 0;
    }
  var $classTimes = $('#class-time > div > div');
  var m = 0;
  $.each($classTimes, function () {
    m++;
    if (m === 1) {
      $(this).attr('id', 'days-class');
      $(this).attr('class', 'days-class');
    }
    if (m === 2) {
      $(this).attr('id', 'start-time');
      $(this).attr('class', 'start-time');
    }
    if (m === 3) {
      $(this).attr('id', 'end-time');
      $(this).attr('class', 'end-time');
    }
    if (m === 4) {
      m = 0;
    }
  })
  });

  var classesToReview = document.getElementsByClassName('potential-class');
  for (i = 0; i < classesToReview.length; i++) {
  	var classStatus = classesToReview[i].getElementsByClassName('class-status')[0].innerText;
  	var timeArea = classesToReview[i].getElementsByClassName('class-time')[0];
  	var startTime = timeArea.getElementsByClassName('start-time')[0].innerText;
  	var startTimeTrim = startTime.substring(0, startTime.length - 1);
  	var endTime = timeArea.getElementsByClassName('end-time')[0].innerText;
  	var endTimeTrim = endTime.substring(0, endTime.length - 1);
  	var days = timeArea.getElementsByClassName('days-class')[0].innerText;

  	var start = Date.parse('01/01/2011 ' + startTimeTrim);
  	var end = Date.parse('01/01/2011 ' + endTimeTrim);

  	var expectStart = Date.parse('01/01/2011 ' + this.state.startTime);
  	var expectEnd = Date.parse('01/01/2011 ' + this.state.endTime);

  	if (this.state.startTime === '' && this.state.endTime === '' && this.state.dayOfWeek === '') { 
      if (classStatus === 'Open') {
      	this.state.classOpenArray.push(i);
      }
	} else {

      if (classStatus === 'Open' && start >= expectStart && end <= expectEnd && days === this.state.dayOfWeek) {
	    this.state.classOpenArray.push(i);
	  }
	}
  }

  localStorage.setItem('classList', JSON.stringify(this.state.classOpenArray));
};

ClassDetector.prototype.addOpenClasses = function() {
  var classesToTry = this.state.classOpenArray;
  var classes = document.getElementsByClassName('potential-class');
  var currentThis = this;

  for (var i = 0; i < classesToTry.length; i++) {
  	var numberClass = classesToTry[i];
  	var buttonArea = classes[numberClass].getElementsByClassName('add-button')[0];

  	if (buttonArea.innerText != 'In cart') {

  	  var button = buttonArea.getElementsByTagName('button')[0];
  	  localStorage.setItem('found-one-item', 'true');
  	  button.click();
  	  break;
  	}

    if (i != classesToTry.length - 1) {
  	  //DO NOTHING
  	} else {

  	  currentThis.state.finishedAdding = true;
  	  localStorage.setItem('finishedAdding', 'true');
  	}
  } 
}

ClassDetector.prototype.refresh = function () {
  var time = new Date().getTime();
  var startTime = localStorage.getItem('time');

  window.location.reload(true);
}

ClassDetector.prototype.navigateBack = function () {
  var clickLinkArea = document.getElementsByClassName('studentRightRailTableData')[1];
  var clickCourseSearch = clickLinkArea.getElementsByClassName('fastWhitelinkButton')[1];
  clickCourseSearch.click();
}

ClassDetector.prototype.navigateAddClass = function () {
  var clickLinkArea = document.getElementsByClassName('studentRightRailTableData')[1];
  var clickCourseAdd = clickLinkArea.getElementsByClassName('fastWhitelinkButton')[2];
  clickCourseAdd.click();
}