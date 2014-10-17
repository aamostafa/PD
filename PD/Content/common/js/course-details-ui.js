$(document).ready(function () {
    /*** FAQ Collapse ***/
    $("ul.faq-list-question li p").hide();
    $("ul.faq-list-question li .answer-text").hide();
    $("ul.faq-list-question .collapse-btn a").addClass("iconplus");

    $("ul.faq-list-question .collapse-btn a").click(function (e) {
        e.preventDefault();
        $(this).parent().parent().find("p").toggle();
        $(this).parent().parent().find(".answer-text").toggle();
        //$(this).toggleClass("iconminus").toggleClass("iconplus");
    });
    $("ul.faq-list-question li h3").click(function (e) {
        e.preventDefault();
        $(this).parent().find("p").toggle();
        $(this).parent().find(".answer-text").toggle();
        $(this).parent().find(".collapse-btn a").toggleClass("iconminus").toggleClass("iconplus");

    })


    /*** Course schedule Collapse ***/
    $(".session-details").hide();
    $(".collapse-btn a").addClass("iconplus");
    $(".session-head").find("h3").addClass("ellipsis");
    $(".session-head").click(function () {
        $(this).find("h3").toggleClass("ellipsis");
        $(this).siblings(".session-details").toggleClass("show");
        $(this).siblings(".session-details").parent().find(".collapse-btn a").toggleClass("iconplus").toggleClass("iconminus");
    })
    $(".collapse-btn a").click(function (e) {
        e.preventDefault();
        $(this).parent().siblings(".session-head").find("h3").toggleClass("ellipsis");
        $(this).parent().siblings(".session-details").toggleClass("show");
        $(this).toggleClass("iconplus").toggleClass("iconminus");
    })
    

});
