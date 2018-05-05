$(window).on("scroll", _ => {
    toggleTOCPost();
});

$(window).on('resize', _ => {
    toggleTOCPost();
});

let isTocOpened = false;

$(".js-toc aside").on("click", _ => {
    isTocOpened ? $(".js-toc").removeClass("toc-fixed-slide-in").addClass("toc-fixed-slide-out") : $(".js-toc").removeClass("toc-fixed-slide-out").addClass("toc-fixed-slide-in");
    isTocOpened = !isTocOpened;
});

$(".js-toc-share-buttons").jsSocials({
    showLabel: false,
    showCount: "inside",
    shareIn: "popup",
    shares: ["facebook", "twitter", "linkedin"]
});

$(".js-share-post").jsSocials({
    showLabel: true,
    showCount: true,
    shareIn: "popup",
    shares: ["facebook", "twitter", "googleplus", "linkedin"]
});

// TOC slide
function toggleTOCPost(event) {
    let windowWidth = $(window).width();

    if (windowWidth < 576 || windowWidth > 1366) {
        $(".js-toc").removeClass("toc-fixed toc-fixed-slide-out");
        return;
    } else {
        if ($(".toc-fixed-slide-in").length === 0) {
            $(".js-toc").addClass("toc-fixed toc-fixed-slide-out")
        }
    }

    let siteHeaderHeight = $(".js-site-header").height(),
        homeButtonHeight = $(".js-home-button").height(),
        postTitleHeight = $(".js-post-title").height(),
        windowScrollTop = $(window).scrollTop();

    let conditionHeight = (windowScrollTop > (siteHeaderHeight + homeButtonHeight + postTitleHeight));    
    conditionHeight ? $(".js-toc").fadeIn(100) : $(".js-toc").fadeOut(100);
}


