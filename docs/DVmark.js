$(document).ready(function(){

	var s = 1; // Menüüvalik

	$('.m1').click(function () { set(1); });
	$('.m2').click(function () { set(2); });
	$('.m3').click(function () { set(3); });
	$('.m4').click(function () { set(4); });

	function set(c) {
		if (c == s) {
			return
		}
		$('.t' + c.toString()).toggle();
		$('.m' + c.toString()).addClass('selected');
		$('.t' + s.toString()).toggle();
		$('.m' + s.toString()).removeClass('selected');
		s = c;
	}

	$('.t1').toggle();
	$('.m1').addClass('selected');


	// Animate the Document Exchange Mark
	function animateMark(){
		const messIconWidth = 56;
		const messIconHeight = 56; 
		const sRadius = 40; // circle

		var wTL; // wiggle tL 

	   /* 1. build and run tL -> prepareWiggle
	      2. build and run wTL -> registerHoverBehav */	

		function registerHoverBehav() {
			$('#markContainer').hover(function() {
				wTL.restart();
			});
		}

		// Prepare wiggle timeline
		function prepareWiggle() {
			wTL = new TimelineLite({onComplete: registerHoverBehav});
			wTL = new TimelineLite();
			wTL.to('#markM', 0.1, {rotation: '-=20',
				transformOrigin: '28px 28px'});
			wTL.to('#markM', 0.1, {rotation: '+=40'});
			wTL.to('#markM', 0.1, {rotation: '-=20'});			
		}

		var tL = new TimelineLite({onComplete: prepareWiggle});

		// Add  circle
		var sCircle = $('<div></div>')
			.attr('id', 'markC')
			.addClass('markCircle')
			.css('display', 'none')
			.css('left', 50 - sRadius)
			.css('top', 50 - sRadius);
		$('#markContainer').append(sCircle);
		// Grow circle
		tL.to(sCircle, 0.2, {display: 'block',
			width: sRadius * 2,
			height: sRadius * 2,
			borderRadius: sRadius, delay: 0.1});

		// Form a message DOM element. Initial opacity: 0.
		var sym = $('<i class="material-icons">&#xE0BE;</i>')
			.addClass('docIcon');
		$('<div></div>')
			.attr('id', 'markM')
			.addClass('mess')
			.css('left', 50 - messIconWidth / 2)
			.css('top', -60)
			.append(sym)
			.appendTo($('#markContainer'));

		tL.to('#markM', 0.1, {opacity: 1});
	}

	animateMark();

});