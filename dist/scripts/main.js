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
    setInitialState: function(){
      // Reset data structure : empty current session
      RecordCtrl.clearCurrentRecord();

      // Show clock in button
      DOMSelectors.clockInBtn.disabled = false;
      DOMSelectors.clockOutBtn.disabled = true;
      
      // Show clock in questions
      DOMSelectors.clockInQuestions.style.display = 'block';
      DOMSelectors.clockOutQuestions.style.display = 'none';
      
      // Clear form inputs 
      DOMSelectors.sessionGoals.value = '';
      DOMSelectors.sessionAccomplishments.value = '';
      DOMSelectors.nextSessionGoals.value = '';
    },
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
    },
    showTotalHours: function(hours){
      DOMSelectors.totalHours.textContent = hours;
    },
  }
})();



// RECORD CONTROLLER

const RecordCtrl = (function(){
  function Record( date, timeIn, timeOut, sessionGoals, sessionAccomplishments, nextSessionGoals ){
    //this.id = id;
    this.date = date;
    this.timeIn = timeIn;
    this.timeOut = timeOut;
    //this.hours = hours;
    this.sessionGoals = sessionGoals;
    this.sessionAccomplishments = sessionAccomplishments;
    this.nextSessionGoals = nextSessionGoals;
  }
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
      // {
      //   id: 2, 
      //   date: '7/23/20', 
      //   timeIn: '12:00am', 
      //   timeOut: '8:00pm', 
      //   hours: 8,
      //   sessionGoals: 'session goal here...',
      //   sessionAccomplishments: 'session accomplishments here...',
      //   nextSessionGoals: 'next session goals here...'
      // },
      // {
      //   id: 3, 
      //   date: '7/21/20', 
      //   timeIn: '10:00am', 
      //   timeOut: '6:00pm', 
      //   hours: 8,
      //   sessionGoals: 'session goal here...',
      //   sessionAccomplishments: 'session accomplishments here...',
      //   nextSessionGoals: 'next session goals here...'
      // }
    ],
  currentRecord: {},
  totalHours: 0
  }

  return {
    addRecordToData: function(record){
      data.records.push(record);
    },
    logData: function(){
      return data;
    },
    getTotalHours: function(){
      let totalHours = 0;

      data.records.forEach(record => {
        const hours = record.hours;
        totalHours += hours;
      })
      //set data structures total hours
      data.totalHours = totalHours;

      return data.totalHours;
    },
    getRecords: function(){
      return data.records;
    },
    getCurrentRecord: function(){
      return data.currentRecord;
    },
    getCurrentRecordTimeIn: function(){
      return data.currentRecord.timeIn;
    },
    setCurrentSessionDate: function(date){
      data.currentRecord.date = date.toLocaleDateString();
    },
    setCurrentSessionTimeIn: function(date){
      // format time
      let time = date.toLocaleTimeString();
      let re = /:[0-9][0-9] /;
      const formatedTime = time.replace(re, '');

      // set current record time in
      data.currentRecord.timeIn = formatedTime;
    },
    setCurrentSessionTimeOut: function(date){
      // format time
      let time = date.toLocaleTimeString();
      let re = /:[0-9][0-9] /;
      const formatedTime = time.replace(re, '');
      
      // set current record time in
      data.currentRecord.timeOut = formatedTime;
    },
    setCurrentSessionHours: function(miliseconds){
      data.currentRecord.hours = miliseconds;
      //
      //      CONVERT THE MILISECONDS TO HOURS NEXT
      //
    },
    setCurrentSessionGoals: function(text){
      data.currentRecord.sessionGoals = text;
    },
    setCurrentSessionAccomplishments: function(text){
      data.currentRecord.sessionAccomplishments = text;
    },
    setCurrentNextSessionGoals: function(text){
      data.currentRecord.nextSessionGoals = text;
    },
    submitCurrentRecord: function(){
      let record = RecordCtrl.getCurrentRecord();

      let date,
          timeIn,
          timeOut,
          sessionGoals,
          sessionAccomplishments,
          nextSessionGoals;
      [date, timeIn, timeOut, sessionGoals, sessionAccomplishments, nextSessionGoals] = [record.date, record.timeIn, record.timeOut, record.sessionGoals, record.sessionAccomplishments, record.nextSessionGoals];

      record = new Record( date, timeIn, timeOut, sessionGoals, sessionAccomplishments, nextSessionGoals );

      console.log(record);

      data.records.push(record);
      console.log(data.records);
    },
    clearCurrentRecord: function(){
      data.records.currentRecord = {};
    },
  }
})();




// APP CONTROLLER
  const App = (function(UICtrl, RecordCtrl){
    const loadEventListners = function(){
      const selectors = UICtrl.getDOMSelectors();

      selectors.clockInBtn.addEventListener('click', clockInEvent);
      selectors.startSessionBtn.addEventListener('click', startSessionEvent);
      selectors.clockOutBtn.addEventListener('click', clockOutEvent);
      selectors.submitSessionBtn.addEventListener('click', submitSessionEvent);
    }

    const clockInEvent = function(e) {
      //show form - hide clock out questions
      const selectors = UICtrl.getDOMSelectors();
      selectors.clockOutQuestions.style.display = 'none';
      selectors.recordForm.style.transform = 'translateX(0%)';

      e.preventDefault();
    }

    const startSessionEvent = function(e){
      const selectors = UICtrl.getDOMSelectors();
      if(selectors.sessionGoals.value !== '') {
        // store session goal in data structure
        const sessionGoals = selectors.sessionGoals.value;
        RecordCtrl.setCurrentSessionGoals(sessionGoals);
        // store time in / date in data structure
        const date = new Date();
        RecordCtrl.setCurrentSessionTimeIn(date);
        RecordCtrl.setCurrentSessionDate(date);
        // slide form off screen
        selectors.recordForm.style.transform = 'translateX(200%)';
        // disable clock in btn
        selectors.clockInBtn.disabled = true;
        // enable clock out btn.
        selectors.clockOutBtn.disabled = false;

        e.preventDefault();
      } else {
        alert('please make a goal for this session')
        e.preventDefault();
      }
    };

    const clockOutEvent = function(e){
      const selectors = UICtrl.getDOMSelectors();
      // Show clock out questions, hide clock in questions
      selectors.clockInQuestions.style.display = 'none';
      selectors.clockOutQuestions.style.display = 'block';
      // Slide form in
      selectors.recordForm.style.transform = 'translateX(0%)';

      e.preventDefault();
    }

    const submitSessionEvent = function(e){
      const selectors = UICtrl.getDOMSelectors();
      if(selectors.sessionAccomplishments.value !== '' && selectors.nextSessionGoals.value !== ''){
        // Store answers to the clock out questions
        const sessionAccomplishments = selectors.sessionAccomplishments.value;
        RecordCtrl.setCurrentSessionAccomplishments(sessionAccomplishments);
        const nextSessionGoals = selectors.nextSessionGoals.value;
        RecordCtrl.setCurrentNextSessionGoals(nextSessionGoals);

        //store time out in data structure
        const timeOut = new Date();
        RecordCtrl.setCurrentSessionTimeOut(timeOut);

        // store hours in data structure
        const timeIn = RecordCtrl.getCurrentRecordTimeIn();
        const hours = timeOut - timeIn;


        // slide out form
        selectors.recordForm.style.transform = 'translateX(-200%)';
        //hours
        //id
        //add record to list
        RecordCtrl.submitCurrentRecord();
                //set initial state
                App.init();
        //update total hours
        console.log(RecordCtrl.getCurrentRecord());
        e.preventDefault();
      } else {
        alert('Please record accomplishments from this session AND goals for next session.')
        e.preventDefault();
      }
    }


    return {
      init: function() {
        //testing
        



        // load event listners
        loadEventListners();

        // Set initial state
        UICtrl.setInitialState();
        
        // populate record list
        const records = RecordCtrl.getRecords();
        UICtrl.populateRecords(records);

        // show total hours
        const totalHours = RecordCtrl.getTotalHours();
        UICtrl.showTotalHours(totalHours);
      }
    }
  })(UICtrl, RecordCtrl);

  App.init();