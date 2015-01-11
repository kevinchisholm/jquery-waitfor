
function makeBox(cssClass){
	var $box = $('<div class="demoBox" style="display:none;"></div>');

	$box.addClass(cssClass);

	$box.html(cssClass);

	return $box;
};

function injectBox($target,$box){
	var deferred = new $.Deferred();

	$target.append($box);

	$box.fadeIn(400,function(){
		deferred.resolve();
	});

	return deferred;
};

function removeBox($box){
	var deferred = new $.Deferred();

	$box.fadeOut(400,function(){
		$box.remove();
		deferred.resolve();
	});
	
	return deferred;
};

function initializePlugin(){
	jQuery.waitFor({
	  //logging: true,
	  //maxIterations: 10,
	  pollDelay: 500,
	  elements : ['.demoBox.one','.demoBox.two','.demoBox.three'],
	  progress: function(selector,counter){
	    $('.progressMessage ul').prepend('<li><p><span class="key selector">Selector:</span><span class="val">' + selector + ', ' + '</span><span class="key counter">Iteration:</span><span class="val">' + counter + ':</span></p></li>');
	  },
	  success: function(){
	  	$('.removeAll').fadeIn(400);
	  	$('.progressMessage').hide(400);
	    $('.successMessage').fadeIn(400);
	  },
	  failure: function(selector,counter){
	  	$('.removeAll').fadeIn(400);
	  	$('.failureMessage').fadeIn();
	  }
	});
};

$(document).ready(function(){

	$('.demoBoxContainer .controls .show').click(function(){
		var $me = $(this),
			$parent = $me.parent().parent(),
			cssClass = $parent.attr('data-cssClass');

		injectBox($parent,makeBox(cssClass)).done(function(){
			$me.hide(400);
			//$parent.find('.hide').show();
		});
	});

	$('.removeAll').click(function(){
		$(this).hide();

		$('.demoBox').remove();
		$('.successMessage, .failureMessage').hide();
		$('.progressMessage').show();
		$('.controls .show').fadeIn();
		initializePlugin();
	});

	//initialize the plugin
	initializePlugin();
});


