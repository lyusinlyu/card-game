$( document ).ready(function() {

	var clicked = [];
	var score = 0;
	var success = 0;

	var cards = [
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

	cards = cards.sort(function(a, b){return 0.5 - Math.random()});
	
	for (var i = 0; i < cards.length; i++) {
		var currentId = cards[i]["dataId"];
		var currentType = cards[i]["dataType"];
		$('.card-row').append('<div class="card" class="col-3"><img src="images/main.jpg" id="'+currentId+'" data-type="'+currentType+'" class="img-fluid back" width="150"><img src="images/'+currentType+'.jpg" class="img-fluid front" width="150"></div>');
	}

	$('.back').click(function(){
		$(this).hide().next().show();
    	score += 1;
    	clicked.push($(this).attr('data-type'));
    	var $this = $(this);

    	setTimeout(function(){ 
    		if (clicked[clicked.length-1] != clicked[clicked.length-2]) {
    		$this.show().next().hide();
    		// alert($this.attr("data-type"));
    		}
	 	}, 2000);

	});
});