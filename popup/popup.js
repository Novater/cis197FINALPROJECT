$(function () {

  var courseName = document.getElementById('coursename');
  var descriptionName = document.getElementById('description');
  var professorName = document.getElementById('professor');
  var startButton = document.getElementById('start-search');
  var earliestTime = document.getElementById('earliest-time');
  var latestTime = document.getElementById('latest-time');
  var daysOfWeek = document.getElementById('days-of-week');
  var course = '';
  var description = '';
  var professor = '';
  var earliest = '';
  var latest = '';
  var days = '';
  
  daysOfWeek.onkeydown = function (e) {
    var userInput = document.getElementById('days-of-week').value + String.fromCharCode(e.keyCode);
    days = userInput;

    console.log(days);
  };

  courseName.onkeydown = function (e) {
    var userInput = document.getElementById('coursename').value + String.fromCharCode(e.keyCode);
    course = userInput;
    //TESTING
    console.log(course);
  };

  professorName.onkeydown = function (e) {
    var userInput = document.getElementById('professor').value + String.fromCharCode(e.keyCode);
    professor = userInput;
    console.log(professor);
  };

  startButton.onclick = function () {
    chrome.tabs.executeScript(
      {
        code : 'window.classDetector.search(\'' + course + '\', \'' + description + '\', \'' + professor + '\', \'' + earliest + '\', \'' + latest + '\', \'' + days + '\');' 
      }
    );
  };

  earliestTime.onkeydown = function (e) {
    var userInput = document.getElementById('earliest-time').value + String.fromCharCode(e.keyCode);
    earliest = userInput;
  };

  latestTime.onkeydown = function (e) {
    var userInput = document.getElementById('latest-time').value + String.fromCharCode(e.keyCode);
    latest = userInput;
  };

});
