   $(document).ready(function(){

	//slider
	$('.work-slider').slick({
		slidesToShow: 4,
		autoplay: false,
		speed: 500,
		vertical:false,
		arrows:false,
		infinite:false,
		responsive: [
			{
				breakpoint: 1025,
				settings: {
					arrows: false,
					slidesToShow: 3
				}
			},
			{
				breakpoint: 769,
				settings: {
					arrows: false,
					slidesToShow: 2
				}
			},
			{
				breakpoint: 481,
				settings: {
					arrows: false,
					slidesToShow: 1
				}
			}
		]
	});

	$('.review-slider').slick({
		slidesToShow: 3,
		autoplay: false,
		speed: 500,
		vertical:false,
		arrows:false,
		infinite:false,
		responsive: [
			{
				breakpoint: 1025,
				settings: {
					arrows: false,
					slidesToShow: 3
				}
			},
			{
				breakpoint: 769,
				settings: {
					arrows: false,
					slidesToShow: 2
				}
			},
			{
				breakpoint: 481,
				settings: {
					arrows: false,
					slidesToShow: 1
				}
			}
		]
	});

	$('.slider-control--right').click(function(){
		$(this).closest(".slider-wrap").find(".slider-item").slick('slickNext');
	});

	$('.slider-control--left').click(function(){
		$(this).closest(".slider-wrap").find(".slider-item").slick('slickPrev');
	});

	//slick item height
	slickHeight = function() {
		var stHeight = $(' .review-slider .slick-track').height();
		$('.review-slider__el').css('height', stHeight + 'px');
		var stHeightEl = $('.b-wrap').find('.slick-slide').height();
		console.log(stHeightEl);
		$('.b-el').css('height', stHeightEl + 'px');
	};
	slickHeight();

	$('window').resize(function(){
		sickHeight();
	});
	//slider === end

	//video popup
	$('.fancybox').fancybox({});
	//video popup === end

	//modals
	var modalState = {
		"isModalShow": false,
		"scrollPos": 0
	};
	$('.modal-content').click(function(event){
		event.stopPropagation();
	});

	var openModal = function () {
		if(!$('.modal-layer').hasClass('modal-layer-show')){
			$('.modal-layer').addClass('modal-layer-show');
			modalState.scrollPos = $(window).scrollTop();
			$('body').css({
					overflow: 'hidden',
					position: 'fixed',
					overflowY: 'scroll',
					top : -modalState.scrollPos,
					width:'100%'
				});
		}
		/*if($(window).width() < 640){
		 		var viewportHeight = $('.modal-cont').outerHeight();
				$('.modal-content').css('maxHeight', viewportHeight);
		}*/
		modalState.isModalShow = true;
	};

	var closeModal = function () {
		$('.modal-layer').removeClass('modal-layer-show');
		$('body').css({
			overflow: '',
			position: '',
			top : modalState.scrollPos
		});
		$(window).scrollTop(modalState.scrollPos);
		$('.modal').removeClass('modal__show');
		modalState.isModalShow = false;
	};

	var initModal = function(el){
		openModal();
		$('.modal').each(function () {
			if ($(this).data('modal')===el){
				$(this).addClass('modal__show')
			} else {
				$(this).removeClass('modal__show')
			}
		});
		var modalHeightCont = $(window).height();
		$('.modal-filter').height(modalHeightCont);
		$('.modal-wrap').css('height',modalHeightCont );
		$('.modal-wrap').css('minHeight',modalHeightCont );
	};

	$('.modal-get').click(function (){
		var currentModal = $(this).data("modal");
		initModal(currentModal);
	});

	$('.modal-layer , .modal-close').click(function (){
		closeModal();
	});
	//modals===end

	//mobile menu
	$('.head-toggle--open').click(function(){
		$('body').css({
			overflow: '',
			position: '',
			top: ''
		})
	});

	$('.head-toggle').click(function(event){
		event.stopPropagation();
		$('.head-wrap').toggleClass('head--up');
		$(this).toggleClass('head-toggle--open');
		$('.slide-menu').toggleClass('slide-menu--open');
		$('body').toggleClass('body-fix')
	});

	$('.slide-menu').on("click", function (event) {
		event.stopPropagation();
	});

	$(document).on("click", function () {
			$('.head-wrap').removeClass('head--up');
			$('.head-toggle').removeClass('head-toggle--open');
			$('.slide-menu').removeClass('slide-menu--open');
			console.log(modalState.isModalShow);
			if(modalState.isModalShow == false){
				$('body').removeClass('body-fix')
		}
	});
	//mobile menu===end


	function detectIE() {
	var ua = window.navigator.userAgent;

	var msie = ua.indexOf('MSIE ');
	if (msie > 0) {
		// IE 10 or older => return version number
		return parseInt(ua.substring(msie + 5, ua.indexOf('.', msie)), 10);
	}

	var trident = ua.indexOf('Trident/');
	if (trident > 0) {
		// IE 11 => return version number
		var rv = ua.indexOf('rv:');
		return parseInt(ua.substring(rv + 3, ua.indexOf('.', rv)), 10);
	}

	var edge = ua.indexOf('Edge/');
	if (edge > 0) {
		// Edge (IE 12+) => return version number
		return parseInt(ua.substring(edge + 5, ua.indexOf('.', edge)), 10);
	}

	// other browser
	return false;
}

	console.log(detectIE());
	if (detectIE() <= 14 && detectIE()) {
		$('body').empty();
		$('body').prepend('' +
		 '<div class="old-browser">' +
			'<div class="old-browser-text"> Сайт не поддерживае Браузер Internet Explorer</div><br>' +
			'<div class="old-browser-text"> Установите <br><br> Chrome Firefox Opera </div><br>' +
		'</div>');
	}

	//for init SVG 
	svg4everybody();
	// ==== clear storage =====
	 localStorage.clear();
	 sessionStorage.clear();
	 $(window).unload(function(){
		 localStorage.clear();
	 });
	// ==== clear storage end =====

/*
	ymaps.ready(init);
	function init () {
			// Создание экземпляра карты и его привязка к контейнеру с
			// заданным id ("map").
			map = new ymaps.Map('map', {
					center: [56.326944, 44.0075], // Нижний Новгород
					zoom: 14,
					//type: 'yandex#satellite'
			});
			map.controls.remove('geolocationControl');
			map.controls.remove('searchControl');
			map.controls.remove('trafficControl');
			map.controls.remove('typeSelector');
			map.controls.remove('fullscreenControl');
			map.controls.remove('rulerControl');
			map.behaviors.disable(['scrollZoom']);
			map.controls.remove(['zoomControl']);
			var myPlacemark0 = new ymaps.Placemark([55.752577, 37.632134])
	}

*/


	})

//cash SVG

;( function( window, document )
{
	'use strict';

	var file  = 'img/pack.html',
		revision = 1;

	if( !document.createElementNS || !document.createElementNS( 'http://www.w3.org/2000/svg', 'svg' ).createSVGRect )
		return true;

	var isLocalStorage = 'localStorage' in window && window[ 'localStorage' ] !== null,
		request,
		data,
		insertIT = function()
		{
			document.body.insertAdjacentHTML( 'afterbegin', data );
		},
		insert = function()
		{
			if( document.body ) insertIT();
			else document.addEventListener( 'DOMContentLoaded', insertIT );
		};

	if( isLocalStorage && localStorage.getItem( 'inlineSVGrev' ) == revision )
	{
		data = localStorage.getItem( 'inlineSVGdata' );
		if( data )
		{
			insert();
			return true;
		}
	}

	try
	{
		request = new XMLHttpRequest();
		request.open( 'GET', file, true );
		request.onload = function()
		{
			if( request.status >= 200 && request.status < 400 )
			{
				data = request.responseText;
				insert();
				if( isLocalStorage )
				{
					localStorage.setItem( 'inlineSVGdata',  data );
					localStorage.setItem( 'inlineSVGrev',   revision );
				}
			}
		}
		request.send();
	}
	catch( e ){}

}( window, document ) );