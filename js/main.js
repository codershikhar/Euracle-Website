(function ($) {
	"use strict"

	///////////////////////////
	// Preloader
	$(window).on('load', function () {
		$("#preloader").delay(600).fadeOut();
	});

	///////////////////////////
	// Scrollspy
	$('body').scrollspy({
		target: '#nav',
		offset: $(window).height() / 2
	});

	///////////////////////////
	// Smooth scroll
	$("#nav .main-nav a[href^='#']").on('click', function (e) {
		e.preventDefault();
		var hash = this.hash;
		$('html, body').animate({
			scrollTop: $(this.hash).offset().top
		}, 600);
	});

	$(".home-wrapper a[href^='#']").on('click', function (e) {
		e.preventDefault();
		var hash = this.hash;
		$('html, body').animate({
			scrollTop: $(this.hash).offset().top
		}, 600);
	});

	$('#back-to-top').on('click', function () {
		$('body,html').animate({
			scrollTop: 0
		}, 600);
	});

	///////////////////////////
	// Btn nav collapse
	$('#nav .nav-collapse').on('click', function () {
		$('#nav').toggleClass('open');
	});

	///////////////////////////
	// Mobile dropdown
	$('.has-dropdown a').on('click', function () {
		$(this).parent().toggleClass('open-drop');
	});

	///////////////////////////
	// On Scroll
	$(window).on('scroll', function () {
		var wScroll = $(this).scrollTop();

		// Fixed nav
		wScroll > 1 ? $('#nav').addClass('fixed-nav') : $('#nav').removeClass('fixed-nav');

		// Back To Top Appear
		wScroll > 700 ? $('#back-to-top').fadeIn() : $('#back-to-top').fadeOut();
	});

	///////////////////////////
	// magnificPopup
	$('.work').magnificPopup({
		delegate: '.lightbox',
		type: 'image'
	});

	///////////////////////////
	// Owl Carousel
	$('#about-slider').owlCarousel({
		items: 1,
		loop: true,
		margin: 15,
		nav: true,
		navText: ['<i class="fa fa-angle-left"></i>', '<i class="fa fa-angle-right"></i>'],
		dots: true,
		autoplay: true,
		animateOut: 'fadeOut'
	});

	$('#testimonial-slider').owlCarousel({
		loop: true,
		margin: 15,
		dots: true,
		nav: false,
		autoplay: true,
		responsive: {
			0: {
				items: 1
			},
			992: {
				items: 2
			}
		}
	});

	///////////////////////////
	// Technologies slider
	$(document).ready(function () {
		//you can set this, as long as it's not greater than the slides length
		var show = 5;
		//var w = $('#tech-slider').width() / show;
		var w = $('.tech-slide').width() + 20;
		var l = $('.tech-slide').length;

		//$('.tech-slide').width(w);
		$('#tech-slide-container').width(w * l)

		function slider() {
			$('.tech-slide:first-child').animate({
				marginLeft: -w
			}, 'slow', function () {
				$(this).appendTo($(this).parent()).css({ marginLeft: 20 });
			});
		}
		var timer = setInterval(slider, 1500);

		// $('.tech-slide').hover(function () {
		// 	//clearInterval(timer);
		// }, function () {
		// 	timer = setInterval(slider, 1500);
		// });
	});

	///////////////////////////
	// Blog
	// TODO: Replace the following with your app's Firebase project configuration
	var firebaseConfig = {
		apiKey: "AIzaSyAWGqIEUISLCAsctZ0SYISWuiAM60x9GXc",
		authDomain: "euracle-blog-data.firebaseapp.com",
		databaseURL: "https://euracle-blog-data.firebaseio.com",
		projectId: "euracle-blog-data",
		storageBucket: "euracle-blog-data.appspot.com",
		messagingSenderId: "988760792764",
		appId: "1:988760792764:web:cd6dab7d7ef52650"
	};

	// Initialize Firebase
	firebase.initializeApp(firebaseConfig);

	firebase.database()
		.ref('/blog')
		.once('value')
		.then(function (snapshot) {
			console.log('blog', snapshot.val())
		});

	$('#contact-submit').click(function () {
		console.log('contact button clicked');
		var name = $('#contact-name').val();
		var email = $('#contact-email').val();
		var subject = $('#contact-subject').val();
		var message = $('#contact-message').val();
		if (name.length > 0 && email.length > 0) {
			firebase.database().ref('contact/' + new Date()).set({
				name: name,
				email: email,
				subject: subject,
				message: message
			});
			var x = document.getElementById("error-submitting-contact");
			x.innerText = "Response Submitted!!";
			x.className = "show";
			setTimeout(function () { x.className = x.className.replace("show", ""); }, 3000);
			document.getElementById("contact-name").value = "";
			document.getElementById("contact-email").value = "";
			document.getElementById("contact-subject").value = "";
			document.getElementById("contact-message").value = "";
		} else {
			var x = document.getElementById("error-submitting-contact");
			x.innerText = "Error: Please fill the mandatory fields(*)";
			x.className = "show";
			setTimeout(function () { x.className = x.className.replace("show", ""); }, 3000);
		}
	});

})(jQuery);
