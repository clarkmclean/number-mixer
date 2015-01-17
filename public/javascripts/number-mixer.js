$(function(){
	//some defaults
	var rowLength = 9;
	var pieceTypes = 4;
	var numOfBlanks = (rowLength+1) + pieceTypes;
	var numOfPieces = (rowLength+1) * (pieceTypes + 1);
	var colorsArray = ['green','blue','red','yellow'];


	//board array
	var pieces = [];
	//create arrays of numbers
	// 4 colors and 1 of blanks or 5 arrays total
	var blank = [];
	var green = [];
	var blue = []
	var red = [];
	var yellow = [];

	$(document).on('click','#startGame', function(){
		startGame();
	});

	function startGame(){
		$('#startGame').addClass('hide');
		$('#boardWrapper').append(buildBoard());
		populateBoard();
	}
	function buildBoard(){
		var html = [];
		html.push('<ul id="board" class="sortable grid">');
		for(var i = 1; i <= 5; i++){
				for(var j = 1; j <= 10; j++){
					html.push('<li class="block ' + i +'"></li>');
				}
		}
		html.push('</ul>')
		return html.join("");
	}
	function populateBoard(){
		// 4 colors
		pieces.push(green,blue,red,yellow);
		// 9 numbers per colors
		for(var i = 0; i < pieces.length;i++){
			for(var j = 1; j <= rowLength; j++){
				pieces[i].push(j);
			}
		}
		// blanks
		for(var i = 1; i <= numOfBlanks;i++){
			blank.push(i);
		}
		// ad them to master array and colors array
		pieces.push(blank);
		colorsArray.push('blank');

		console.log(pieces);

		//put everything in the board
		//select by index of <td>
		//randomly select from multidimensional array
		//make sure to delete from array every time. delete from top level once empty
		var x = 0
		var intervalId = setInterval(function(){
			placePiece(x);
			if(++x === numOfPieces){
				window.clearInterval(intervalId);
				finishBoard();
			}
		}, 25);

	}
	function placePiece(index){
		// random number of piece color
		var num1 = Math.floor(Math.random() * pieces.length);
		// use random type to pick color in array and get color string from color array
		var randType = pieces[num1];
		var color = colorsArray[num1];
		// random number for piece number
		var num2 = Math.floor(Math.random() * randType.length);
		// get piece from array
		var indPiece = randType[num2];
		// get color string from color array
		

		var pieceHtml = '<div class="piece ' + color + '" data-number="' + randType[num2] + '"></div>';

		$('.block:eq(' + index + ')').append(pieceHtml);
		randType.splice(num2, 1);
		if(randType.length == 0){
			pieces.splice(num1,1);
			colorsArray.splice(num1,1);
		}
	}

	function finishBoard(){
		$('.sortable').sortable({
			items: '.block'
		});
	}
});