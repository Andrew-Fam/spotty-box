function displayErrorMessage (message) {
	console.log(message);
}

function sizeSelectorInit() {
	$('.size-selector').click(function (){
		var self = $(this);
		if(self.hasClass('checked')){
			
		}else {
			$('.size-selector').removeClass('checked');
			$('.size-selector input[type="radio"]').prop('checked',false);
			self.addClass('checked');
			self.find('input[type="radio"]').prop('checked',true);
		}
	});
}

function checkoutProgressInit() {
	$('#checkout-wizard').on('slid.bs.carousel', function () {
		currentIndex = $('#checkout-wizard .item.active').data('step');
		var indicators = $(".checkout-progress .progress-indicator .indicator ");
		indicators.removeClass('active');
		indicators.eq(currentIndex).addClass('active');
	}).on('slide.bs.carousel', function () {
		$('html,body').animate({
          scrollTop: 0
        }, 200);
	});
}



function updateSectionStackOffset() {
	var stackOffset = 0;
	$('section.stack.sticky').each(function (){
		stackOffset+= $(this).outerHeight();
	});
	//console.log('stack group height: '+$('.stack-group').outerHeight());
	$('.stack-group').css('padding-top',stackOffset+'px');
}
function stackSection() {
	var sections = $('section.stack');
	
	

	/*var maxCardHeight = 0;
	sections.each(function () {
		if($(this).outerHeight()>maxCardHeight){
			maxCardHeight = $(this).outerHeight();
		}
	});*/
	//console.log(maxCardHeight+":"+$(window).height());

	if(sections.length > 0) {
		var stackOffset = 0;
		$('section.stack').each(function(){
			$(this).data('original-offset',$(this).offset().top);
		});
		$(window).scroll(function(){
			if($(window).width()>768){
				var scroll = $(window).scrollTop();
				var navHeight = $('#main-nav').outerHeight();
				sections.each( function (){
					var self = $(this);
					if(scroll>self.data('original-offset')-navHeight && self.outerHeight() < $(window).height()-navHeight){
						if(!self.hasClass('sticky')){
							self.addClass('sticky');
						}
					} else if(scroll>self.data('original-offset')-navHeight +self.outerHeight()) {
						self.addClass('sticky');
					}
					else {
						if(self.hasClass('sticky')){
							self.removeClass('sticky');
						}
					}


					updateSectionStackOffset();
				});

			}else {
				sections.removeClass('sticky');
			}
			//videoOverlay();
		});
	}
}
function stackSectionResize() {
	//var sections = $('section.stack');
	$('.stack.sticky').removeClass('sticky');
	updateSectionStackOffset();
	$('section.stack').each(function(){
		$(this).data('original-offset',$(this).offset().top);
	});
	updateSectionStackOffset();
}
/*
function recapParallax() {
	var $howItWorks = $('#how-it-works');
	var $recap = $('#recap');
	if($(window).width()>768){
		$recap.css('margin-top',-($howItWorks.outerHeight()));
		$(window).scroll(function (){
			
			var scroll = $(window).scrollTop() - ($howItWorks.offset().top-$howItWorks.outerHeight());
			//console.log("scroll: "+scroll);
			if(scroll>0 && scroll/1.5 <= $howItWorks.outerHeight()) {
				var offset = -$howItWorks.outerHeight() + scroll/1.5;
				$recap.css('margin-top',offset);
				$('body').css('padding-bottom',offset);
			}
			
		});
	}
}*/
function oldIE() {
	console.log('Fuck old IE LOL!');
}


function videoOverlay () {
	$('.video-player-wrap').each(function () {
		var videoOverlay = $(this);
		var videoObject = videoOverlay.parent().find('.video-object');
		videoOverlay.css('height',videoObject.outerHeight());
		videoOverlay.css('width',videoObject.outerWidth());
		videoOverlay.css('left',videoObject.offset().left-videoObject.parent().offset().left);
		//console.log('videoOverlay');
	});
}

$(document).ready(function () {
	sizeSelectorInit();
	checkoutProgressInit();
	//mobileInputFocusBugFix();
	
	if ($('html').is('.ie6, .ie7, .ie8')) {
		oldIE();
	} else {
		stackSection();
		//recapParallax();
		$(window).resize(function() {
			if($(window).width()>768){
				//recapParallax();
				stackSectionResize();
			}
		});
	}

	$(window).resize(function () {
		videoOverlay();
	});
	videoOverlay();
});


