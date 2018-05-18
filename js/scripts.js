$(document).ready(function() {
window.score = 0;
window.success = 0;
window.flippedCard = null;
window.flippedType = null;
window.clickable = true;
window.cards = [
	{ dataType:"valet", dataId:"1" },
	{ dataType:"valet", dataId:"2" },
	{ dataType:"man", dataId:"3" },
	{ dataType:"man", dataId:"4" },
	{ dataType:"queen", dataId:"5" },
	{ dataType:"queen", dataId:"6" },
	{ dataType:"eagle", dataId:"7" },
	{ dataType:"eagle", dataId:"8" },
	{ dataType:"flag", dataId:"9" },
	{ dataType:"flag", dataId:"10" },
	{ dataType:"dog", dataId:"11" },
	{ dataType:"dog", dataId:"12" }
];
var h1 = document.getElementsByTagName('h2')[0], seconds = 0, minutes = 0, hours = 0, timeout;

function startNewGame(arr) {
	arr = arr.sort(function(a, b){return 0.5 - Math.random()});
	for (var i = 0; i < arr.length; i++) {
		var currentId = arr[i]["dataId"];
		var currentType = arr[i]["dataType"];
		$('.card-row').append('<div id="'+currentId+'" data-type="'+currentType+'" class="col-3 img-card"><img src="images/main.jpg" class="img-fluid back" width="150"><img src="images/'+currentType+'.jpg" class="img-fluid front" width="150"></div>');
	}
	timer();
}

startNewGame(cards);


function openCard(cardId) {
	$('#' + cardId + ' .back').css('display', 'none').next().show();
}

function closeCards(cardId1, cardId2) {
	$('#' + cardId1 + ' .front, #' + cardId2 + ' .front' ).css('display', 'none').prev().show();
	flippedCard = null;
	flippedType = null;
	clickable = true;
}

function addTime() {
    seconds++;
    if (seconds >= 60) {
        seconds = 0;
        minutes++;
        if (minutes >= 60) {
            minutes = 0;
            hours++;
        }
    }
    
    h1.textContent = (hours ? (hours > 9 ? hours : "0" + hours) : "00") + ":" + (minutes ? (minutes > 9 ? minutes : "0" + minutes) : "00") + ":" + (seconds > 9 ? seconds : "0" + seconds);

    timer();
}

function clearTime() {
	h1.textContent = "00:00:00";
    seconds = 0; minutes = 0; hours = 0;
}

function timer() {
    timeout = setTimeout(addTime, 1000);
}

function endGame(time) {
	var message = "Your Time Is " + time;
	alert(message);
	$('.header').show();
}

function replayGame() {
	$('.header').hide();
	$('.card-row').html("");
	score = 0;
	success = 0;
	flippedCard = null;
	flippedType = null;
	clickable = true;
	h1 = document.getElementsByTagName('h2')[0], seconds = 0, minutes = 0, hours = 0, timeout;
	startNewGame(cards);
}

$(document).on("click", ".replay", function() {
	replayGame();
});

$(document).on("click",".img-card",function(){
	if (!clickable) {
		return;
	} 
	if (!flippedCard) {
		flippedCard = $(this).attr('id');
		flippedType = $('#' + flippedCard).attr('data-type');
		openCard(flippedCard);
	}else{
		var currentCard = $(this).attr('id');
		var currentType = $('#' + currentCard).attr('data-type');
		openCard(currentCard);
		if (flippedType === currentType) {
			success++;
			flippedCard = null;
			flippedType = null;
		} else {			
			clickable = false;
			setTimeout(function() {
				closeCards(flippedCard, currentCard);
			}, 1000);
		}
	}
	if (success === 6) {
		var timePassed = h1.textContent;
		clearTimeout(timeout);
		clearTime();
		setTimeout(function() {
			endGame(timePassed);
		},1200);
		
	}
});
});