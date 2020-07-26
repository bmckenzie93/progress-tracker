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



// RECORD CONTROLLER

const RecordCtrl = (function(){
  const data = {
    records: [
      {id: 1, date: '7/25/20', timeIn: '11:00am', timeOut: '7:00pm', hours: 8},
      {id: 2, date: '7/23/20', timeIn: '12:00am', timeOut: '8:00pm', hours: 8},
      {id: 3, date: '7/21/20', timeIn: '10:00am', timeOut: '6:00pm', hours: 8}
    ],
  currentRecord: null,
  }

  return {
    logData: function(){
      return data;
    },
    getRecords: function(){
      return data.records;
    },
    getCurrentRecord: function(){
      return data.currentRecord;
    },
  }
})();




// APP CONTROLLER
  const App = (function(UICtrl, RecordCtrl){
    const loadEventListners = function(){
      const selectors = UICtrl.getDOMSelectors();

      selectors.clockInBtn.addEventListener('click', clockInEvent);
    }

    const clockInEvent = function() {
      console.log('clock in event fired');
    }

    return {
      init: function() {
        loadEventListners();
      }
    }
  })(UICtrl, RecordCtrl);

  App.init();