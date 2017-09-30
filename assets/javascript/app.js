  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyAY8c5aiPA5zOc-gYe40YxZPQ26AbQQ4FM",
    authDomain: "train-scheduler-edd74.firebaseapp.com",
    databaseURL: "https://train-scheduler-edd74.firebaseio.com",
    projectId: "train-scheduler-edd74",
    storageBucket: "train-scheduler-edd74.appspot.com",
    messagingSenderId: "999617093705"
  };
  firebase.initializeApp(config);

var database = firebase.database();
   var trainName = "";
    var destination = "";
    var frequencyInput = "";
    var trainTimeInput = "";


 // 2. Button for adding Trains
 $("#addTrainBtn").on("click", function() {
  event.preventDefault();

  // Grabbed values from text boxes
    var trainName = $("#trainNameInput").val().trim();
    var destination = $("#destinationInput").val().trim();
    var frequencyInput = $("#frequencyInput").val().trim();
    var trainTimeInput = moment($("#trainTimeInput").val().trim(), "HH:mm").subtract(10, "years").format("X");;
  

    // Code for handling the push
        var newTrain = {
         name: trainName,
         destination: destination,
         trainTime: trainTimeInput,
         frequency: frequencyInput,
         dateAdded: firebase.database.ServerValue.TIMESTAMP
     }

  
  $("#trainName").val("");
  $("#destination").val("");
  $("#frequencyInput").val("");
  $("#trainTimeInput").val("");
});


database.ref().orderByChild("dateAdded").on("child_added", function(snapshot) {
  // storing the snapshot.val() in a variable for convenience
     var firebasetrainName = childSnapshot.val().trainName;
     var firebasedestination = childSnapshot.val().destination;
     var firebasetrainTimeInput = childSnapshot.val().trainTimeInput;
     var firebasefrequencyInput = childSnapshot.val().frequencyInput;

     var diffTime = moment().diff(moment.unix(firebaseTrainTimeInput), "minutes");
     var timeRemainder = moment().diff(moment.unix(firebaseTrainTimeInput), "minutes") % firebasefrequencyInput;
     var minutes = firebasefrequencyInput - timeRemainder;

     var nextTrainArrival = moment().add(minutes, "m").format("hh:mm A");
     
     // Test for correct times and info
     console.log(minutes);
     console.log(nextTrainArrival);
     console.log(moment().format("hh:mm A"));
     console.log(nextTrainArrival);
     console.log(moment().format("X"));

  
 
 // Append train info to table on page
     $("#trainTable > tbody").append("<tr><td>" + firebasetrainName + "</td><td>" + "</td><td>" + firebasedestination + "</td><td>" + firebasefrequencyInput + " mins" + "</td><td>" + nextTrainArrival + "</td><td>" + minutes + "</td></tr>");

  
 });

