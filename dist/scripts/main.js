// UI CONTROLLER

const UICtrl = (function(){
  // DOM Selectors
  const DOMSelectors = {
    totalHoursHours: document.querySelector('#total-hours'),
    totalGoal: document.querySelector('#total-goal'),

    clockInBtn: document.querySelector('#clock-in-btn'),
    clockOutBtn: document.querySelector('#clock-out-btn'),
    
    recordForm: document.querySelector('#record-form'),
    clockInQuestions: document.querySelector('.clock-in-questions'),
    clockOutQuestions: document.querySelector('.clock-out-questions'),

    startSessionBtn: document.querySelector('#start-session-btn'),
    submitSessionBtn: document.querySelector('#submit-session-btn'),

    currentSession: document.querySelector('#current-session'),
    currentSessionDate: document.querySelector('#current-session-date'),
    currentSessionTimeIn: document.querySelector('.current-session-time-in'),
    currentSessionElapsedTime: document.querySelector('#current-session-elapsed-time'),

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

      // Hide current session
      UICtrl.hideCurrentSession();
    },
    getDOMSelectors: function(){
      return DOMSelectors;
    },
    populateRecords: function(records){
      if(records.length > 0){
        let html = '';

        records.forEach(record => {
          html += `<li class="record" id="record-${record.id}">
                    <div class="record-info">
                      <span class="record-date">${record.date}</span> ~ <span class="record-time-in">${record.timeIn[0]}</span> - <span class="record-time-out">${record.timeOut[0]}</span> <span class="record-hours">${record.hours.hrs}</span> hours <span class="record-hours">${record.hours.min}</span> minutes <span class="record-hours">${record.hours.sec}</span> seconds
                    </div>  
                    <button class="view-record btn-text">View Record</button>
                  </li>`
        });

        DOMSelectors.recordList.innerHTML = html;
      }

    },
    showTotalHours: function(hours){
      DOMSelectors.totalHoursHours.textContent = hours;

    },
    hideCurrentSession: function(){
      DOMSelectors.currentSession.style.display = 'none';
    },
    showCurrentSession: function(){
      DOMSelectors.currentSession.style.display = 'flex';
    },
  }
})();



// RECORD CONTROLLER

const RecordCtrl = (function(){
  function Record( id, date, timeIn, timeOut, hours, sessionGoals, sessionAccomplishments, nextSessionGoals ){
    this.id = id;
    this.date = date;
    this.timeIn = timeIn;
    this.timeOut = timeOut;
    this.hours = hours;
    this.sessionGoals = sessionGoals;
    this.sessionAccomplishments = sessionAccomplishments;
    this.nextSessionGoals = nextSessionGoals;
  }
  const data = {
    records: [
      // {
      //   id: 1,
      //   date: '7/25/20', 
      //   timeIn: ['11:00am', 0], 
      //   timeOut: ['7:00pm', 0], 
      //   hours: {
      //     sec: 00,
      //     min: 00,
      //     hrs: 08
      //   },
      //   sessionGoals: 'session goal here...',
      //   sessionAccomplishments: 'session accomplishments here...',
      //   nextSessionGoals: 'next session goals here...'
      // },
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
    totalHours: {
      sec: 0,
      min: 0,
      hrs: 0
    }
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

      // add hours of each record
      data.records.forEach(record => {
        const hours = record.hours.hrs;
        totalHours += hours;
      })

      //set data structures total hours
      data.totalHours.hrs = totalHours;

      return data.totalHours.hrs;
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
    setCurrentSessionId: function(id){
      data.currentRecord.id = id;
    },
    setCurrentSessionDate: function(date){
      data.currentRecord.date = date.toLocaleDateString();
    },
    setCurrentSessionTimeIn: function(date){
      // time in seconds
      const timeIn = Math.floor(date.getTime() / 1000);
      // format time
      let time = date.toLocaleTimeString();
      let re = /:[0-9][0-9] /;
      const formatedTime = time.replace(re, '');

      // set current record time in
      data.currentRecord.timeIn = [formatedTime, timeIn];
    },
    setCurrentSessionTimeOut: function(date){
      const timeOut = Math.floor(date.getTime() / 1000);
      // format time
      let time = date.toLocaleTimeString();
      let re = /:[0-9][0-9] /;
      const formatedTime = time.replace(re, '');
      
      // set current record time out
      data.currentRecord.timeOut = [formatedTime, timeOut];
    },
    setCurrentSessionHours: function(hrs, min, sec){
      data.currentRecord.hours = {
        // convert seconds
        hrs: hrs,
        min: min,
        sec: sec,
      }
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

      let id,
          date,
          timeIn,
          timeOut,
          hours,
          sessionGoals,
          sessionAccomplishments,
          nextSessionGoals;
      [id, date, timeIn, timeOut, hours, sessionGoals, sessionAccomplishments, nextSessionGoals] = [record.id, record.date, record.timeIn, record.timeOut, record.hours, record.sessionGoals, record.sessionAccomplishments, record.nextSessionGoals];

      record = new Record( id, date, timeIn, timeOut, hours, sessionGoals, sessionAccomplishments, nextSessionGoals );

      data.records.push(record);
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

    //  CLOCK IN
    const clockInEvent = function(e) {
      //show form - hide clock out questions
      const selectors = UICtrl.getDOMSelectors();
      selectors.clockOutQuestions.style.display = 'none';
      selectors.recordForm.style.transform = 'translateX(0%)';

      e.preventDefault();
    }

    //  START SESSION
    const startSessionEvent = function(e){
      const selectors = UICtrl.getDOMSelectors();
      if(selectors.sessionGoals.value !== '') {
        // store session goal in data structure
        const sessionGoals = selectors.sessionGoals.value;
        RecordCtrl.setCurrentSessionGoals(sessionGoals);

        // store date & time in data structure
        const date = new Date();
        RecordCtrl.setCurrentSessionTimeIn(date);
        RecordCtrl.setCurrentSessionDate(date);

        // slide form off screen
        selectors.recordForm.style.transform = 'translateX(200%)';
        // disable clock in btn
        selectors.clockInBtn.disabled = true;
        // enable clock out btn.
        selectors.clockOutBtn.disabled = false;

        // show current session
        UICtrl.showCurrentSession();

        // start elapsed time
        let miliseconds = new Date() - date;
        console.log(miliseconds / 1000 + ' seconds')
        // https://www.youtube.com/watch?v=fF-vtP3sjPc // stopwatch videos // https://www.youtube.com/watch?v=1INmsFnD-u4

        e.preventDefault();
      } else {
        alert('please make a goal for this session')
        e.preventDefault();
      }
    };


    //  CLOCK OUT
    const clockOutEvent = function(e){
      const selectors = UICtrl.getDOMSelectors();
      // Show clock out questions, hide clock in questions
      selectors.clockInQuestions.style.display = 'none';
      selectors.clockOutQuestions.style.display = 'block';
      // Slide form in
      selectors.recordForm.style.transform = 'translateX(0%)';

      e.preventDefault();
    }

    // SUBMIT SESSION
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

        // convert time out from date to seconds
        const timeOutSeconds = Math.floor(timeOut.getTime() / 1000);

        // store session total hours in data structure
        const timeIn = RecordCtrl.getCurrentRecordTimeIn()[1];
        const diff = timeOutSeconds - timeIn; // diff in seconds between now and start
        let sec = Math.floor(diff % 60); // get seconds value (remainder of diff)
        let min = Math.floor(diff / 60); // get minutes value (quotient of diff)
        let hrs = Math.floor(min / 60); // get minutes value (quotient of min)
        RecordCtrl.setCurrentSessionHours(hrs, min, sec);

        // generate id
        let id;
        const records = RecordCtrl.getRecords();

        if(records.length > 0){
          id = records[records.length - 1].id + 1;
        } else {
          id = 1;
        }

        RecordCtrl.setCurrentSessionId(id);


        // slide out form
        selectors.recordForm.style.transform = 'translateX(-200%)';

        //add record to list
        RecordCtrl.submitCurrentRecord();

        //set initial state
        App.init();
        
        //update total hours
        const hours = RecordCtrl.getTotalHours();
        UICtrl.showTotalHours(hours);

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