$(window).on("scroll", _ => {
    toggleSharePostWidget();
});

$(window).on('resize', _ => {
    toggleSharePostWidget();
});

function toggleSharePostWidget() {
    let windowWidth = $(window).width();
    let $_jsSharePostWidget = $(".js-share-post-widget");

    if (windowWidth < 1024) {
        $_jsSharePostWidget.removeClass("share-buttons-fix-fadeIn").addClass("share-buttons-fix-fadeOut");
        return;
    }

    let siteHeaderHeight = $(".js-site-header").height(),
        postContentHeight = $(".js-post-content").height(),
        windowScrollTop = $(window).scrollTop();
    let condition = ((siteHeaderHeight < windowScrollTop) && (windowScrollTop < postContentHeight - 200));

    condition ? $_jsSharePostWidget.removeClass("share-buttons-fix-fadeOut").addClass("share-buttons-fix-fadeIn") : $_jsSharePostWidget.removeClass("share-buttons-fix-fadeIn").addClass("share-buttons-fix-fadeOut");
}

$(".js-share-post-widget").jsSocials({
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