// RECORD CONTROLLER

const RecordCtrl = (function(){
  
})();



// UI CONTROLLER

const UICtrl = (function(){
  // DOM Selectors
  const DOMSelectors = {
    totalHours: document.querySelector('#total-hours'),
    totalGoal: document.querySelector('#total-goal'),

    clockInBtn: document.querySelector('#clock-in-btn'),
    clockOutBtn: document.querySelector('#clock-out-btn'),

    startSessionBtn: document.querySelector('#start-session-btn'),
    submitSessionBtn: document.querySelector('#submit-session-btn'),

    sessionGoals: document.querySelector('#session-goals'),
    sessionAccomplishments: document.querySelector('#session-accomplishments'),
    nextSessionGoals: document.querySelector('#next-session-goals'),

    recordList: document.querySelector('.record-list'),
    record: document.querySelector('.record'),

    viewRecordBtn: document.querySelector('.view-record-btn'),

    currentRecordDate: document.querySelector('.current-record-date'),
    currentRecordTimeIn: document.querySelector('.current-record-time-in'),
    currentRecordTimeOut: document.querySelector('.current-record-time-out'),
    currentRecordTotalHours: document.querySelector('.current-record-total-hours')
  };

  return {
    getDOMSelectors: function(){
      return DOMSelectors;
    }
  }
})();




// APP CONTROLLER
  const App = (function(UICtrl, RecordCtrl){
  
  })(UICtrl, RecordCtrl);