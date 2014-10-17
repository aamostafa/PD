$(document).ready(function () {
    
    /*** site  search textfield code (add code for fadeout tooltip when is click out***/
    $('body').bind('click', function (e) {
        if ($(e.target).closest('#txtSearchBox').length == 0) {
            $('.search-tooltip').fadeOut('fast');

        }
    });

    /*** tree focus top fix issue***/
    if ($('#filter-accordion')) {
        $(document).on('click', '#filter-accordion ul.dynatree-container li ul li', function () {
            $('#s4-workspace').animate({ scrollTop: 0 }, 'fast');
        });
    }

});


/*** course catalogue carousel***/
/*function courseItemHover() {
    $(".list-course-by-category .course-item").each(function (i) {
        $(this).hover(
				    function () {
				        var trimDetailsTxt = $(this).find('.custom-course-item-details');
				        smartTrimText(trimDetailsTxt, 290);
				        $(this).find('.course-img').animate({ "top": "-164px" }, "fast");
				        $(this).find('details').animate({ "top": "-5px" }, "fast");
				    }, function () {
				        $(this).find('.course-img').animate({ "top": "0px" }, "fast");
				        $(this).find('details').animate({ "top": "0px" }, "fast");
				    }
	      );

    });

}
*/



/*** site  search textfield code ***/

function check_content(e) {


    var text = document.getElementById("txtSearchBox").value;
    if (text.length >= 30) {
        document.getElementById("txtSearchBox").title = '<%= GetGlobalResourceObject("PD.Dashboard", "SearchBoxValidationMSG") %>';
        var titleText = '<%= GetGlobalResourceObject("PD.Dashboard", "SearchBoxValidationMSG") %>';
        $('.search-tooltip .search-tooltip-title').text(titleText);
        $('.search-tooltip').fadeIn('slow');
        return false;
    } else {
        document.getElementById("txtSearchBox").title = '';
        return true;
    }
}

function limitText(limitField, limitNum, e) {
    if (e.keyCode == 13) {
        btnSearchClick()
        e.preventDefault();
    }

    searchTooltip();
    if (limitField.value.length > limitNum) {
        limitField.value = limitField.value.substring(0, limitNum);

    } else {

    }

}

function searchTooltip() {
    var text = document.getElementById("txtSearchBox").value;

    if (text.length >= 30) {
        document.getElementById("txtSearchBox").title = 'Length should not be greater than 30';
        var titleText = 'Length should not be greater than 30';
        $('.search-tooltip .search-tooltip-title').text(titleText);
        $('.search-tooltip').fadeIn('slow');
        return false;
    } else {
        document.getElementById("txtSearchBox").title = '';
        return true;
    }

}
function limitText(limitField, limitNum, e) {
    if (e.keyCode == 13) {
        btnSearchClick()
        e.preventDefault();
    }

    searchTooltip();
    if (limitField.value.length > limitNum) {
        limitField.value = limitField.value.substring(0, limitNum);

    } else {

    }

}


/*** smart trimming ***/
function smartTrimText(elem, numChars) {

    var text, trimmedStr, afterLastChar, dots, altCharIndex, isSmartTrim;
    text = $.trim($(elem).text());
    trimmedStr = text.substring(0, numChars - 1); //the trimmed text according to the number of characters required                
    afterLastChar = text.charAt(numChars - 1); //the character after the last one  
    dots = "<span class='dots'>...</span>";

    if (afterLastChar === " ") isSmartTrim = false; //will no require smart trimming, just normal trimming
    else isSmartTrim = true;

    if (text.length > numChars) {
        if (isSmartTrim) {
            altCharIndex = trimmedStr.lastIndexOf(" ");
            trimmedStr = trimmedStr.substring(0, altCharIndex);
        }
        $(elem).text(trimmedStr).append(dots).attr('title', text);
    }
}

/*** all link hover effect fix issue***/
function checkChildren() {


    $("#filter-accordion ul.dynatree-container li").click(function () {
        $('.linkAll').removeClass('active-link');
    });
}


/*** all link fix issue***/
function productCatalogueFunctions() {


    // trim text
    $(".list-course-by-category .course-item").each(function (i) {
        $(this).hover(
                    function () {
                        var trimDetailsTxt = $(this).find('.custom-course-item-details');
                        smartTrimText(trimDetailsTxt, 290);
                        $(this).find('.course-img').stop().animate({ "top": "-254px" }, "slow");
                        $(this).find('.block-details').stop().animate({ "top": "0px" }, "slow");
                        $(this).find('p.custom-course-item-details,footer.favorite-bar-hover').fadeTo("slow", 1);

                    }, function () {
                        $(this).find('.course-img').stop().animate({ "top": "0px" }, "slow");
                        $(this).find('.block-details').stop().animate({ "top": "249px" }, "slow");
                        $(this).find('p.custom-course-item-details,footer.favorite-bar-hover').fadeTo("slow", 0);

                    }
          );

    });



    // all text fix issues

    /** remove active class from tree if you press all link **/
    $(".linkAll").click(function () {
        $(this).addClass('active-all');
        $('ul.dynatree-container li span.dynatree-active').removeClass('dynatree-active');
    });




    // pagination scrolltop fix
    $(".pageNumbers a").click(function () {
        $('#s4-workspace').animate({
            scrollTop: 0
        }, 'fast');
    });


    // course list lastchild margin fix
    var lang = $('html').attr("dir");
    if (lang == "rtl") {

        $('ul.list-course-by-category li:nth-child(3n)').addClass("margin0-left");
    }
    else {
        $('ul.list-course-by-category li:nth-child(3n)').addClass("margin0-right");
    }





}

