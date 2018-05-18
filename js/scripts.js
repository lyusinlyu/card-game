$(document).ready(function() {

	// Global variables declaration
	var success = 0;
	var card1Id = null;
	var card1Name = null;
	var clickable = true;
	var cards = [ "valet", "man", "queen", "eagle", "flag", "dog", ];
	var h2 = document.getElementsByTagName('h2')[1], seconds = 0, minutes = 0, hours = 0, timeout;

	// Doublicates the given array, shuffles it, then fills DOM with card-items
	function startNewGame(arr) {
		var arr2 = [];

		for (var i = 0; i < arr.length; i++) {
			arr2.push(arr[i], arr[i]);
		}

		arr = arr2.sort(function(a, b){return 0.5 - Math.random()});

		for (var i = 0; i < arr.length; i++) {
			var name = arr[i];
			$('.card-row').append('<div id="'+i+'" name="'+name+'" class="col-3 img-card"><img src="images/main.jpg" class="img-fluid back"><img src="images/'+name+'.jpg" class="img-fluid front"></div>');
		}

		timer();
	}

	startNewGame(cards);

	// Hides the back-side card img, and shows the front-side one.
	function openCard(cardId) {
		$('#' + cardId + ' .back').css('display', 'none').next().show();
	}

	// Hides the front-side card img, and shows the back-side one. Sets global variables to default values. 
	function closeCards(cardId1, cardId2) {
		$('#' + cardId1 + ' .front, #' + cardId2 + ' .front' ).css('display', 'none').prev().show();
		card1Id = null;
		card1Name = null;
		clickable = true;
	}

	// Timer functions start
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
	    
	    h2.textContent = (hours ? (hours > 9 ? hours : "0" + hours) : "00") + ":" + (minutes ? (minutes > 9 ? minutes : "0" + minutes) : "00") + ":" + (seconds > 9 ? seconds : "0" + seconds);

	    timer();
	}

	function clearTime() {
		h2.textContent = "00:00:00";
	    seconds = 0; minutes = 0; hours = 0;
	}

	function timer() {
	    timeout = setTimeout(addTime, 1000);
	}
	// Timer functions end

	// Alerts the end of the game, current time result, and shows the replay button
	function endGame(time) {
		var message = "<span>Your Time Result Is </span>" + time;
		$('.time-result').html(message);
		$('.header').css('display', 'flex');
	}

	// Hides replay button. Empty .card-row element, sets global variables to their default values, and refill the DOM with cards
	function replayGame() {
		$('.header').hide();
		$('.card-row').html("");
		success = 0;
		card1Id = null;
		card1Name = null;
		clickable = true;
		h2 = document.getElementsByTagName('h2')[0], seconds = 0, minutes = 0, hours = 0, timeout;
		startNewGame(cards);
	}

	// replay button click handler
	$(document).on("click", ".replay", function() {
		replayGame();
	});

	// Card-items click handler
	$(document).on("click",".back",function(){

		if (!clickable) {
			return;
		} 

		if (!card1Id) {
			card1Id = $(this).parent().attr('id');
			card1Name = $('#' + card1Id).attr('name');
			openCard(card1Id);
		} else {
			var card2Id = $(this).parent().attr('id');
			var card2Name = $('#' + card2Id).attr('name');
			openCard(card2Id);

			if (card1Name === card2Name) {
				success++;
				card1Id = null;
				card1Name = null;
			} else {			
				clickable = false;
				setTimeout(function() {
					closeCards(card1Id, card2Id);
				}, 1000);
			}
		}

		if ( success === 6 ) {
			var timePassed = h2.textContent;
			clearTimeout(timeout);
			clearTime();
			setTimeout(function() {
				endGame(timePassed);
			},1200);
		}

	});
});