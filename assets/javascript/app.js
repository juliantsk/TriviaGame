var questions = [{
        question: "What was 'Little Jerry'?",
        choices: ["Kramer's Pet Rooster", "Kramer's Pet Chicken", "A picture of Jerry as a child", "Jerry's father's nickname for Jerry"],
        answer: 0
    },
    {
        question: "In the 'Bubble Boy' episode, what game do George and the Bubble Boy fight over?",
        choices: ["Monopoly", "Uno", "Trivial Pursuit", "Go Fish"],
        answer: 2
    },
    {
        question: "What kind of pasta does Kramer make a pasta-Jerry out of?",
        choices: ["Penne", "Fusilli", "Tortellini", "Angel Hair"],
        answer: 1
    },
    {
        question: "What does Kramer get installed in his shower?",
        choices: ["A television", "A radio", "A garbage disposal", "A toilet"],
        answer: 2
    },
    {
        question: "What is the name of the alcoholic beverage that can't be detected on the breath?",
        choices: ["Schnapps", "Hennigans", "Schneigals", "Smirnoff"],
        answer: 1
    },
    {
        question: "What are the names of the 'Bizarro' friends that Elaine meets?",
        choices: ["Frank, Sid, and Michael", "Kevin, Gene, and Feldman", "Pete, Sid, and Nuncan", "Herman, Greg, and Monty"],
        answer: 1
    },
    {
        question: "How does one open Elaine's vault?",
        choices: ["A key", "A lockpicking set", "A password", "With Schnapps"],
        answer: 3
    },
    {
        question: "What is the name of Elaine's sister?",
        choices: ["Debra", "Madison", "Helen", "Gail"],
        answer: 3
    },
    {
        question: "What college did Jerry and George attend?",
        choices: ["NYU", "Rutgers", "Queens College", "They did not go to college"],
        answer: 2
    },
    {
        question: "In the final episode, what is the topic of conversation during the last conversation of the episode?",
        choices: ["How they missed the coffee shop", "How they wished they had helped the man who was robbed", "How the second shirt on a button can be too high", "How bad food is in jail"],
        answer: 2
    }
];

var count = 0;
var showQuestion;
var timerRunning = false;
var intervalId;
var answers = {
    correct: 0,
    wrong: 0,
    unanswered: 0
};

$(document).ready(function() {
    // Start button begins questions.
    $("#start").on("click", startQuestions);

    // Display question to div#game.
    function displayQuestion() {
        console.log("dQ");
        var q = questions[count]
        console.log(q.question);
        timer.start();
        $("#game").empty()
            .append($("<h2>").html("Time Remaining: <span id='timer'>" + timer.time + "</span> seconds"))
            .append($("<h2>").text(q.question));
        for (i = 0; q.choices[i]; i++) {
            $("#game").append($("<h3>").addClass("choices").text(q.choices[i]));
        };
    };

    // Increments through the questions and records correct answers.
    function nextQuestion() {
        count++;
        timer.reset();
        showAnswer();
        showQuestion = setInterval(displayQuestion(), 1000 * 5);
        if (count === questions.length) {
            $("#game").html("")
                .append("All done! Here are your results!")
                .append("Correct Answers: " + answers.correct)
                .append("Wrong Answers: " + answers.wrong)
                .append("Unanswered: " + answers.unanswered);
        }
    };

    // Starts the set of questions with an interval of 30 seconds.
    function startQuestions() {
        displayQuestion();
        showQuestion = setInterval(nextQuestion, 1000 * 30);
    };

    // Function triggered by chosing an answer.
    function answerQuestion() {
        clearInterval(showQuestion);
        answerScreen();
    };

    // Timer object.
    var timer = {
        time: 30,
        reset: function() {
            timer.time = 30;
        },
        start: function() {
            if (!timerRunning) {
                intervalId = setInterval(timer.count, 1000);
                timerRunning = true;
            }
        },
        stop: function() {
            clearInterval(intervalId);
            timerRunning = false;
        },
        count: function() {
            timer.time--;
            $("#timer").text(timer.time);
        }
    };

});