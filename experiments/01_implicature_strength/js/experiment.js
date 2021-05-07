function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// set up experiment logic for each slide
function make_slides(f) {
  var slides = {};

  var experimentParams;
  var dopo;
  var targetSpeaker;
  var fillerSpeaker;
  var hasAccent;

  // set up initial slide
  slides.i0 = slide({
    name: "i0",
    start: function() {
      exp.startT = Date.now();

      let randomExperimentType = _.sample([0, 1, 2, 3, 4, 5, 6, 7]);
      experimentParams = experimentSettingToParams[randomExperimentType];

      dopo = experimentParams['dopo'];
      targetSpeaker = experimentParams['targetSpeaker'];
      hasAccent = experimentParams['accent'];

      if (targetSpeaker == "nezar") {
        fillerSpeaker = "idan";
      } else {
        fillerSpeaker = "nezar";
      }

      exp.data_trials.unshift({
        "experimentParamsSettingNumber": randomExperimentType,
        "experimentParamsDOPO": dopo,
        "experimentParamsTargetSpeaker": targetSpeaker,
        "experimentParamsFillerSpeaker": fillerSpeaker,
        "experimentParamsHasAccent": hasAccent,
        'id': -1,
        'response': -1,
        'prompt': -1,
        'lastWord': -1,
        'audioPath': -1,
        'speaker': -1,
        'dopo': -1,
        'question': -1,
        'correctAnswer': -1,
        'isTarget': -1,
        'targetHasAccent': -1,
        'isPlaus': -1
      })
    }
  });

  // //GET SUBEXPERIMENT ID
  // // set up the first example slide
  // slides.i1 = slide({
  //   name: "i1",

  //   // this is executed when the slide is shown
  //   start: function() {
  //     // hide error message
  //     $('.err').hide();

  //   },

  //   // this is executed when the participant clicks the "Continue button"
  //   button: function() {
  //     // read in the value of the selected radio button
  //     // this.radio = $("input[name='text']:checked").val();
  //     this.radio = document.getElementById("experimentTypeID").value;
  //     // check whether the participant selected a reasonable value (i.e, 5, 6, or 7)
  //     if (this.radio in experimentSettingToParams) {
  //       // log response
        
  //       experimentParams = experimentSettingToParams[this.radio];

        
  //       this.log_responses();
  //       // continue to next slide
  //       exp.go();
  //     } else {
  //       // participant gave non-reasonable response --> show error message
  //       $('.err').show();
  //       this.log_responses();
  //     }
  //   },

  //   log_responses: function() {
  //     // add response to exp.data_trials
  //     // this data will be submitted at the end of the experiment
  //     exp.data_trials.push({
  //       "slide_number_in_experiment": exp.phase,
  //       "id": "example1",
  //     });
      
  //   },
  // });

  // set up the first example slide
  slides.example1 = slide({
    name: "example1",

    // this is executed when the slide is shown
    start: function() {
      // hide error message
      this.audioPath = "https://github.com/ycm/ling245b-replication/raw/3ee98f0d2366bb42010921bf9360c113c8cc9dbc/experiments/01_implicature_strength/" + "data/Nezar_39_filler_eng.wav";
      this.question = "Did the beekeeper eat someone/something?";
      $("#ex1-question").html(this.question);
      $(".err").hide();
    },

    // handle button click
    playAudioButton: function() {
      audio = document.getElementById("trial-audio");
      audio.setAttribute("src", this.audioPath);
      audio.autoplay = true;
      this.userPlayedAudio = true;
    },

    // handle click on "Continue" button
    button: function() {
      this.radio = $("input[name='text']:checked").val();
      this.lastWord = document.getElementById("example1LastWord").value.toLowerCase();
      console.log("input: " + this.radio + " " + this.lastWord);

      if (this.radio == "No" && this.userPlayedAudio && ['bee', 'bees'].includes(this.lastWord)) {
        this.log_responses();
        exp.go(); //use exp.go() if and only if there is no "present"ed data, ie no list of stimuli.
        // _stream.apply(this); //use _stream.apply(this) if there is a list of "present" stimuli to rotate through
      } else {
        $('.err').show();
      }
    },

    log_responses: function() {
      exp.data_trials.push({
        "id": "example1",
        "response": this.radio,
        "prompt": this.question,
        "lastWord": this.lastWord,
        "experimentParamsSettingNumber": -1,
        "experimentParamsDOPO": -1,
        "experimentParamsTargetSpeaker": -1,
        "experimentParamsFillerSpeaker": -1,
        "experimentParamsHasAccent": -1,
        'audioPath': -1,
        'speaker': -1,
        'dopo': -1,
        'question': -1,
        'correctAnswer': -1,
        'isTarget': -1,
        'targetHasAccent': -1,
        'isPlaus': -1
      });
    }
  });

  // set up slide for second example trial

  slides.example2 = slide({
    name: "example2",

    start: function() {
      // hide error message
      this.audioPath = "https://github.com/ycm/ling245b-replication/raw/3ee98f0d2366bb42010921bf9360c113c8cc9db    c/experiments/01_implicature_strength/" + "data/Idan_11_filler_eng.wav";
      this.question = "Did the queen knight someone/something?";
      $("#ex2-question").html(this.question);
      $(".err").hide();
    },

    // handle button click
    playAudioButton: function() {
      audio = document.getElementById("trial-audio");
      audio.setAttribute("src", this.audioPath);
      audio.autoplay = true;
      this.userPlayedAudio = true;
    },

    // handle click on "Continue" button
    button: function() {
      this.radio = $("input[name='text']:checked").val();
      this.lastWord = document.getElementById("example2LastWord").value.toLowerCase();
      console.log("input: " + this.radio);
      if (this.radio == "Yes" && this.userPlayedAudio && this.lastWord == 'loyalty') {
        this.log_responses();
        exp.go(); //use exp.go() if and only if there is no "present"ed data, ie no list of stimuli.
        // _stream.apply(this); //use _stream.apply(this) if there is a list of "present" stimuli to rotate through
      } else {
        $('.err').show();
      }
    },

    log_responses: function() {
      exp.data_trials.push({
        'experimentParamsSettingNumber': -1,
        'experimentParamsDOPO': -1,
        'experimentParamsTargetSpeaker': -1,
        'experimentParamsFillerSpeaker': -1,
        'experimentParamsHasAccent': -1,
        "id": "example2",
        "response": this.radio,
        "prompt": this.question,
        "lastWord": this.lastWord,
        'audioPath': -1,
        'speaker': -1,
        'dopo': -1,
        'question': -1,
        'correctAnswer': -1,
        'isTarget': -1,
        'targetHasAccent': -1,
        'isPlaus': -1,
      });
    }
  });

  // set up slide with instructions for main experiment
  slides.startExp = slide({
    name: "startExp",
    start: function() {
    },
    button: function() {
      exp.go(); //use exp.go() if and only if there is no "present" data.
    },
  });

  slides.trial = slide({
    name: "trial",

    start: function() {
      header = "Sentence " + exp.currentSentenceNumber.toString() + " of " + exp.numTotalSentencesToTest.toString();
      $("#trial-header").html(header);
    },

    // start: function() {
    //  var stim = {
    //    "TGrep": "37224:9",
    //    "Context": "Speaker A:  and, and i, you know, i still provide most of the things that  go on around the house.<p>Speaker B: right.<p>Speaker A: so, uh, yeah and for a while i was going to school too, and tha-, it was tough.<p>Speaker B: yeah,  i uh, i think that while it 's a good change for i think women to be able  to fulfill their potential in whatever they feel, you know, their expertise may be .<p>Speaker A: uh-huh.<p>Speaker B: uh-huh.<p>Speaker A: uh, i think sometimes other things suffer and tha-, i think it 's hard to find a balance there.<p>Speaker B: ",
    //    "EntireSentence": "but in some ways i think we are expected  to do it all.",
    //    "ButNotAllSentence": "but in <strong>some, but not all</strong> ways i think we are expected  to do it all."
    //  }    
    // The 7 lines above from "start:..." to the end of var stim = {...}" define a placeholder stimulus that you will have to delete when
    // loading in the individual stimulus data. 

    // To rotate through stimulus list, comment out the above 7 lines and  uncomment the following 2:
    present: exp.stimuli,
    present_handle : function(stim) {

      // unselect all radio buttons at the beginning of each trial
      // (by default, the selection of the radio persists across trials)
      $("input[name='text']:checked").prop("checked", false);
      // $("#check-strange").prop("checked", false);

      // store stimulus data
      this.stim = stim;

      // extract original and sentence with "but not all"
      // var original_sentence = stim.EntireSentence;
      // var target_sentence = stim.ButNotAllSentence;

      var params = exp.data_trials[0]

      this.dopo = params['experimentParamsDOPO'];
      this.hasAccent = params['experimentParamsHasAccent'];
      this.currentSpeaker;
      this.isTarget;
      this.question;
      this.correctAnswer;
      this.audioPath;
      this.isPlaus = true;

      this.userPlayedAudio = false;
      
      if(Object.prototype.toString.call(stim) === '[object Array]') {
        this.isTarget = true;
        var p = stim[0];
        var num = stim[1];

        if (p == 'implaus')
          this.isPlaus = false;

        this.currentSpeaker = params['experimentParamsTargetSpeaker'];
        this.question = rawTargets[num][this.dopo][p]['question'];
        this.audioPath = rawTargets[num][this.dopo][p][this.currentSpeaker][this.hasAccent];
        this.correctAnswer = rawTargets[num][this.dopo][p]['answer'];
      } else {
        this.isTarget = false;
        this.currentSpeaker = params['experimentParamsFillerSpeaker'];
        this.question = stim['question'];
        this.audioPath = stim[this.currentSpeaker];
        this.correctAnswer = stim['answer'];
      }


      console.log(this.audioPath);
      
      // replace the placeholder in the HTML document with the relevant sentences for this trial
      $("#trial-question").html(this.question);
      console.log(this.question);
      $(".err").hide();
    },

    playAudioButton: function() {
      audio = document.getElementById("trial-audio");
      audio.setAttribute("src", this.audioPath);
      audio.autoplay = true;
      this.userPlayedAudio = true;
    },

    // handle click on "Continue" button
    button: function() {
      this.radio = $("input[name='text']:checked").val();
      console.log("input: " + this.radio);
      if (this.radio && this.userPlayedAudio) {
        this.log_responses();
        exp.currentSentenceNumber++;

        header = "Sentence " + exp.currentSentenceNumber.toString() + " of " + exp.numTotalSentencesToTest.toString();
        $("#trial-header").html(header);
        //exp.go(); //use exp.go() if and only if there is no "present"ed data, ie no list of stimuli.
        _stream.apply(this); //use _stream.apply(this) if there is a list of "present" stimuli to rotate through
      } else {
        $('.err').show();
      }
    },

    // save response
    log_responses: function() {
      exp.data_trials.push({
        'experimentParamsSettingNumber': -1,
        'experimentParamsDOPO': -1,
        'experimentParamsTargetSpeaker': -1,
        'experimentParamsFillerSpeaker': -1,
        'experimentParamsHasAccent': -1,
        'id': -1,
        'prompt': -1,
        'lastWord': -1,
        "audioPath": this.audioPath,
        "speaker": this.currentSpeaker,
        "dopo": this.dopo,
        "question": this.question,
        "correctAnswer": this.correctAnswer,
        "response": this.radio,
        "isTarget": this.isTarget,
        "targetHasAccent": this.hasAccent,
        "isPlaus": this.isPlaus
      });
    },
  });

  // slide to collect subject information
  slides.subj_info = slide({
    name: "subj_info",
    submit: function(e) {
      exp.subj_data = {
        language: $("#language").val(),
        enjoyment: $("#enjoyment").val(),
        asses: $('input[name="assess"]:checked').val(),
        age: $("#age").val(),
        gender: $("#gender").val(),
        education: $("#education").val(),
        fairprice: $("#fairprice").val(),
        comments: $("#comments").val()
      };
      exp.go(); //use exp.go() if and only if there is no "present" data.
    }
  });

  // 
  slides.thanks = slide({
    name: "thanks",
    start: function() {
      exp.data = {
        "trials": exp.data_trials,
        "catch_trials": exp.catch_trials,
        "system": exp.system,
        "condition": exp.condition,
        "subject_information": exp.subj_data,
        "time_in_minutes": (Date.now() - exp.startT) / 60000
      };
      proliferate.submit(exp.data);
    }
  });

  return slides;
}

/// initialize experiment
function init() {

  exp.trials = [];
  exp.catch_trials = [];

  var NUM_FILLERS = 40;
  var NUM_TOTAL_SENTENCES_TO_TEST = 60;
  
  var fillers = rawFillers;
  fillers.splice(38, 1);
  fillers.splice(10, 1);
  var stimuli = _.shuffle(fillers.slice(0)).slice(0, NUM_FILLERS);

  console.log(fillers);
  
  var plaus_implaus_list = [];
  for (i = 0; i < 10; i++) {
    plaus_implaus_list.push(['plaus']);
    plaus_implaus_list.push(['implaus']);
  }
  plaus_implaus_list = _.shuffle(plaus_implaus_list);
  for (i = 0; i < 20; i++) {
    plaus_implaus_list[i].push(i);

    stimuli.push(plaus_implaus_list[i]);
  }

  stimuli = _.shuffle(stimuli);

  stimuli = stimuli.slice(0, NUM_TOTAL_SENTENCES_TO_TEST);

  exp.numTotalSentencesToTest = NUM_TOTAL_SENTENCES_TO_TEST;
  exp.currentSentenceNumber = 1;

  exp.stimuli = stimuli; //call _.shuffle(stimuli) to randomize the order;
  console.log(exp.stimuli)
  exp.n_trials = exp.stimuli.length;


  exp.system = {
    Browser: BrowserDetect.browser,
    OS: BrowserDetect.OS,
    screenH: screen.height,
    screenUH: exp.height,
    screenW: screen.width,
    screenUW: exp.width
  };

  //blocks of the experiment:
  exp.structure = [
    "i0",
    "example1",
    "example2",
    "startExp",
    "trial",
    "subj_info",
    "thanks"
  ];

  exp.data_trials = [];

  //make corresponding slides:
  exp.slides = make_slides(exp);

  exp.nQs = utils.get_exp_length();
  //this does not work if there are stacks of stims (but does work for an experiment with this structure)
  //relies on structure and slides being defined

  var params = exp.data_trials[0];

  $('.slide').hide(); //hide everything

  $("#start_button").click(function() {
    exp.go();
  });

  exp.go(); //show first slide
}
