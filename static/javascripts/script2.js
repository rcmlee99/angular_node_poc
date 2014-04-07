$(function() {

	// location changer
	var locationName = $('#footer-location-name');
	var locationArrow = $('#location-flag-container-arrow');
	var x = parseInt(locationArrow.css('right')) + Math.ceil(locationName.outerWidth() / 2);
	locationArrow.css('right', x);

	$('#change-location-link').click(function() {
	$('#location-flag-container').toggle('blind', {direction: 'down'}, 180);
	return false;
	});

	$('#footer img').retina();
	$('#location-box img').retina();
	// end location changer

	// press lightbox
	if ($().fancybox) {
		$("a.lightbox").fancybox({
			'padding': 30,
			'margin': 20,
			'overlayColor': '#FFF',
			'hideOnContentClick': false,
			'showNavArrows': false,
			'showCloseButton': true,
			'cyclic': true,
			'titlePosition': 'inside',
			'titleFormat': customTitleFormat,
			'onComplete' : function(){
				$("#fancybox-img").retina();
			}
		});
	}

	function customTitleFormat(title, currentArray, currentIndex, currentOpts) {
	// if (currentArray.length == 1 && title.length == 0)
	// return '';
	pagination = jsTranslation.ImageXOfY.replace('{0}', '<b>' + (currentIndex + 1) + '</b>').replace('{1}', '<b>' + currentArray.length + '</b>');
	if (currentArray.length == 1)
		return '<div id="lightboxTitle">' + title + '</div>';
	return '<div id="lightboxTitle">' + title + '&nbsp;'
		+ '<span>' + pagination + '&nbsp;&nbsp; <a href="javascript:;" onclick="$.fancybox.prev()">&lt; ' + jsTranslation.Previous + '</a> | <a href="javascript:;" onclick="$.fancybox.next()">' + jsTranslation.Next + ' &gt;</a></span>'
		+ '</div>';
	}
	// end press lightbox
	
	// shipping message wrap
	$('.table-product-buy span').each(function () {
		$(this).html($(this).html().replace('Shipping ','Shipping<br>'));
		$(this).html($(this).html().replace(' Shipping','<br>Shipping'));
	});
	// end shipping message wrap

	// superscript product page titles
	$('.staticHtml h2:contains("™"), .staticHtml h3:contains("™")').each(function(){
		sup = $(this);
		sup.html(sup.html().replace('™', '<span class="sup">&trade;</span>'));
	});
	// end superscript product page titles

	// product matrix download now
	$('.staticHtml .table-product-buy:contains("Download Now")').each(function(){
		sup = $(this);
		sup.html(sup.html().replace('Download Now', 'Download'));
	});
	// end product matrix download now

	// test for united states
	imperial = ($('body').hasClass('us')) ? true : false;

	// retina images
	$('body.v2 div.staticHtml img, body.v2 #hero #main img, body.v3 div.staticHtml img').not('.one-x').retina();
	$('body#Home-products img').not('.one-x').retina();
	$('body#Home img').not('.one-x').retina();
	$('section.press-images img, section.corporate-logos img').not('.one-x').retina();
	// end retina

	// footer extension
	if( $(window).height() > $('body').height() ){
		var ext = $(window).height() - $('body').height() + $('#footer-wrapper').height();
		$('#footer-wrapper').height(ext);
	}
	// end footer extension

	/* ATEM Production Studio Product Grid Title */
	$('body.atemproductionstudio4k #product-grid-title').html('ATEM Production Studio');

	/* xxx-xxx Product Grid Title */
	$('body.xxxxxx #product-grid-title').html('xxx-xxx');

});

function GetAjaxUrl(url) {
		return url + '?location=' + $('#current-node').attr('location-code') + '&currentNode=' + $('#current-node').attr('node-id');
}
