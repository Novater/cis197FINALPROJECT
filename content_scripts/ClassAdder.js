var ClassAdder = function ($classTable, $requestButton) {

  var $classesToAdd = $('#courses-to-add > form > div > div');
  $.each($classesToAdd, function () {
    $(this).attr('class', 'class-to-add');
    $(this).attr('id', 'class-to-add');
  });

  var $addButtons = $('#class-to-add > span > button');
  $.each($addButtons, function () {
    $(this).attr('class', 'add-button');
    $(this).attr('id', 'add-button');
  });
  
  if (true) {
    var selectClassOption = document.getElementsByClassName('fastFormField')[6];
    var $selectClassJQuery = $(selectClassOption);
    var enrollBox = document.getElementsByName('enrollmentCourseCartAndScheduleBox');
    $(enrollBox).attr('class', 'enroll-box');
    console.log('enroll box is ' + enrollBox);
    console.log($selectClassJQuery);
    console.log(selectClassOption);
    var options = selectClassOption.options;
    for (var opt, j = 0; opt = options[j]; j++) {
  	  console.log('trying to get the right spinner value');
  	  if (opt.value === '-1') {
  	  	if (selectClassOption.selectedIndex != j) {
  	      console.log('hi im the index of the course cart');
  	      selectClassOption.selectedIndex = j;
  	      console.log('trying to click');
  	      console.log('reached this point');
  	      setTimeout(function () { selectClassOption.click() }, 1000);
  	      setTimeout(function () { $(enrollBox).trigger('submit') }, 3000);
  	      setTimeout(function () { $selectClassJQuery.trigger('change') }, 6000);
  	      console.log('reached this point 2 ');
  	      console.log('reached this point 3'); 
  	      return;
  	      break;
  	    }
  	  }
    }
  }
  var clickButtons = document.getElementsByClassName('add-button');
  var i = 0;
  if (localStorage.getItem('i-value')) {
  	i = parseInt(localStorage.getItem('i-value'));
  }
  if (localStorage.getItem('i-value') === '-1') {
    localStorage.setItem('i-value', '0');
    setTimeout(function () { location = '' }, 1000);
    return;
  }
  if (localStorage.getItem('click-add') === 'false') {
  	localStorage.setItem('click-add', 'true');
  	console.log('i is at ' + i);
  	clickButtons[i].click();
  	console.log('trying to now add class');
  	console.log('click-add set to ' + localStorage.getItem('click-add'));
  	setTimeout(function () { location = '' }, 1000);
  	return;
  }
  else {
    localStorage.setItem('click-add', 'false');
  	var addCourseButton = document.getElementsByClassName('add-course-button')[0];
  	console.log('add course button is ' + addCourseButton);
  	setTimeout(function () { addCourseButton.click() }, 3000);
  	setTimeout(function () { location = '' }, 5000);
  	console.log('clicked the add button');
  	if (i === clickButtons.length - 1) {
  	  localStorage.setItem('i-value', '-1');
  	  localStorage.setItem('click-add', 'false');
  	  return;
    }
  }
  i++;
  console.log('storing i as ' + i);
  localStorage.setItem('i-value', i);
  return;
};