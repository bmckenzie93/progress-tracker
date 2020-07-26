// UI CONTROLLER

const UICtrl = (function(){
  // DOM Selectors
  const DOMSelectors = {
    totalHours: document.querySelector('#total-hours'),
    totalGoal: document.querySelector('#total-goal'),

    clockInBtn: document.querySelector('#clock-in-btn'),
    clockOutBtn: document.querySelector('#clock-out-btn'),
    
    recordForm: document.querySelector('#record-form'),
    clockInQuestions: document.querySelector('.clock-in-questions'),
    clockOutQuestions: document.querySelector('.clock-out-questions'),

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
    },
    populateRecords: function(records){
      let html = '';

      records.forEach(record => {
        html += `<li class="record" id="record-${record.id}">
        <div class="record-info">
          <span class="record-date">${record.date}</span> <span class="record-time-in">${record.timeIn}</span> - <span class="record-time-out">${record.timeOut}</span> *<span class="record-hours">${record.hours}</span> Hrs
        </div>  
        <button class="view-record btn-text">View Record</button>
      </li>`
      });

      DOMSelectors.recordList.innerHTML = html;
    }
  }
})();



// RECORD CONTROLLER

const RecordCtrl = (function(){
  const data = {
    records: [
      {
        id: 1,
        date: '7/25/20', 
        timeIn: '11:00am', 
        timeOut: '7:00pm', 
        hours: 8,
        sessionGoals: 'session goal here...',
        sessionAccomplishments: 'session accomplishments here...',
        nextSessionGoals: 'next session goals here...'
      },
      {
        id: 2, 
        date: '7/23/20', 
        timeIn: '12:00am', 
        timeOut: '8:00pm', 
        hours: 8,
        sessionGoals: 'session goal here...',
        sessionAccomplishments: 'session accomplishments here...',
        nextSessionGoals: 'next session goals here...'
      },
      {
        id: 3, 
        date: '7/21/20', 
        timeIn: '10:00am', 
        timeOut: '6:00pm', 
        hours: 8,
        sessionGoals: 'session goal here...',
        sessionAccomplishments: 'session accomplishments here...',
        nextSessionGoals: 'next session goals here...'
      }
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
    addRecordToData: function(record){
      data.records.push(record);
    }
  }
})();




// APP CONTROLLER
  const App = (function(UICtrl, RecordCtrl){
    const loadEventListners = function(){
      const selectors = UICtrl.getDOMSelectors();

      selectors.clockInBtn.addEventListener('click', clockInEvent);
      selectors.startSessionBtn.addEventListener('click', startSessionEvent);
    }

    const clockInEvent = function(e) {
      //show form - hide clock out questions
      const selectors = UICtrl.getDOMSelectors();
      selectors.clockOutQuestions.style.display = 'none';
      selectors.recordForm.style.transform = 'translateX(0%)';

      e.preventDefault();
    }

    const startSessionEvent = function(e){
      //store value, start timer, slide out form
      const selectors = UICtrl.getDOMSelectors();
      if(selectors.sessionGoals.value !== '') {
        const sessionGoal = selectors.sessionGoals.value;
        UICtrl.data.currentRecord.sessionGoal = sessionGoal;
        selectors.recordForm.style.transform = 'translateX(200%)';

        e.preventDefault();
      } else {
        alert('please make a goal for this session')
        e.preventDefault();
      }
    }

    return {
      init: function() {
        loadEventListners();
        
        // populate record list
        const records = RecordCtrl.getRecords();
        UICtrl.populateRecords(records);

      }
    }
  })(UICtrl, RecordCtrl);

  App.init();