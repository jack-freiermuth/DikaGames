(function ($) {
    "use strict";

    jQuery(document).ready(function($){

        //scroll
        $('.scrollto, .nav.navbar-nav li a').on('click', function (event) {
            $('.main-menu li a').parent().removeClass('active');
            var $anchor = $($(this).attr('href')).offset().top - 60;
            $(this).parent().addClass('active');
            $('body, html').animate({scrollTop: $anchor}, 600);
            event.preventDefault();
            return false;
        });
        // Cache selectors
        var topMenu = $(".nav.navbar-nav"),
            topMenuHeight = topMenu.outerHeight() + 15,
            // All list items
            menuItems = topMenu.find("a"),
            // Anchors corresponding to menu items
            scrollItems = menuItems.map(function () {
                var item = $($(this).attr("href"));
                if (item.length) {
                    return item;
                }
            });

        // Bind to scroll
        $(window).scroll(function () {
            // Get container scroll position
            var fromTop = $(this).scrollTop() + topMenuHeight;

            // Get id of current scroll item
            var cur = scrollItems.map(function () {
                if ($(this).offset().top < fromTop)
                    return this;
            });
            // Get the id of the current element
            cur = cur[cur.length - 1];
            var id = cur && cur.length ? cur[0].id : "";
            // Set/remove active class
            menuItems
                .parent().removeClass("active")
                .end().filter("[href='#" + id + "']").parent().addClass("active");
        });

        //typed
        Typed.new("#typed", {
            stringsElement: document.getElementById('typed-strings'),
            typeSpeed: 30,
            backDelay: 500,
            loop: false,
            contentType: 'html', // or text
            // defaults to null for infinite loop
            loopCount: null,
            callback: function () {
                foo();
            },
            resetCallback: function () {
                newTyped();
            }
        });

        var resetElement = document.querySelector('.reset');
        if (resetElement) {
            resetElement.addEventListener('click', function () {
                document.getElementById('typed')._typed.reset();
            });
        }


        function newTyped() { /* A new typed object */
        }

        function foo() {
            console.log("Callback");
        }

        //stickynav
        $(".navbar-sticy-top").sticky({topSpacing: 0});

        //preloader
        window.onload = function () {
            setInterval(function () {
                $(".preloader").fadeOut("slow");
            }, 4);
        };

        //owlcarousel
        $(".owl-carousel").owlCarousel({
            items: 1,
            loop: true,
            autoplay: true,
            nav: true,
            autoplayTimeout: 4000,
            autoplayHoverPause: true
        });

        /* Isotop for skills
        –––––––––––––––––––––––––––––––––––––––––––––––––– */
        $(function () {
            $('#mix-wrapper').mixItUp({
            	load: {
            		sort: 'order:asc'
            	},
            	animation: {
            		effects: 'fade rotateZ(-180deg)',
            		duration: 700
            	},
            	selectors: {
            		target: '.mix-target',
            		filter: '.filter-btn',
            		sort: '.sort-btn'
            	},
            	callbacks: {
            		onMixEnd: function(state){
            			console.log(state)
            		}
            	}
            });
        }); /*End of skills isotop*/


        /* Contact Form Send
        –––––––––––––––––––––––––––––––––––––––––––––––––– */
        $('.send-message').on( 'click', function() {

            $.ajax({
                url: 'contact_email.php',
                type: 'post',
                dataType: 'json',
                data: {
                    'name':$('#name').val(),
                    'email':$('#email').val(),
                    'message':$('#message').val(),
                    'g-recaptcha-response':grecaptcha.getResponse()
                },
                success: function (data) {
                    $(".closebtn").parent().css('opacity', '100');
                    console.log('data: ', data);
                	$('.alert').removeClass('success');
                	$(".wrong-entry").each(function() {
                		$(this).removeClass('wrong-entry')
					});

                    if( '0' === data.status_code ) {
                    	$('.alert').addClass('success');
                    } else if ( '1' === data.status_code ) {
                    	// $('.form-control').addClass('wrong-entry');
                    } else if ( '2' === data.status_code ) {
                    } else if ( '3' === data.status_code ) {
                    	$('.g-recaptcha div:first').addClass('wrong-entry');
                    }

                	$('.alert_message').html(data.message);

                },
                error: function(jqXHR, textStatus, errorThrown) {
                    console.log('jqXHR: ',jqXHR);
                    console.log('Response Text: ',jqXHR.responseText);
                    console.log('textStatus: ',textStatus);
                    console.log('errorThrown: ',errorThrown);
                    console.log( "Error" );
                }
            });

            return false;
        });


        /* Success Message for contact form
        –––––––––––––––––––––––––––––––––––––––––––––––––– */
        var close = document.getElementsByClassName("closebtn");
        var i;

        for (i = 0; i < close.length; i++) {
            close[i].onclick = function(){
                var div = this.parentElement;
                setTimeout(function(){ 
                    div.style.opacity = "0";
                }, 600);
            }
        }

    });

})(jQuery);



/* Google Analytics
–––––––––––––––––––––––––––––––––––––––––––––––––– */

$(".gaTracked").click(function() {
	classList = this.className.split(/\s+/);
	var gaTracked_index = 0;
	for (i = 0; i < classList.length; i++) {
		if( 'gaTracked' == classList[i] ) {
			gaTracked_index = i;
			break;
		}
	}

	var event_split = classList[gaTracked_index+1].split("_");

	console.log('event_split: ',event_split);
	var eventCategory = capitalize_words(event_split[0].replace('-', ' '));
	var eventLabel = capitalize_words(event_split[1].replace('-', ' '));

	ga('send', {
	  hitType: 'event',
	  eventCategory: eventCategory,
	  eventAction: 'click',
	  eventLabel: eventLabel
	});
});

function capitalize_words(str) {
 return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
}




