document.addEventListener("DOMContentLoaded", function(){
    const scrollToTopBtn = document.getElementById("scroll-to-top-btn");
    // 滾動check
    window.addEventListener("scroll", function(){
        // 超過高度顯示
        if (window.scrollY > 300) {
            scrollToTopBtn.style.display = "block";
        } else {
            scrollToTopBtn.style.display = "none";
        }
    });

    // 點擊至網頁最上
    scrollToTopBtn.addEventListener("click", function(){
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });
});
