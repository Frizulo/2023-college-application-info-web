document.addEventListener("DOMContentLoaded", function () {
    const navBarHeight = document.querySelector('.nav').offsetHeight;
  
    const scrollToTarget = function (targetId) {
      const target = document.getElementById(targetId);
  
      // 計算目標座標扣除導覽列高度(直接移動被導覽列遮擋因此增加)
      const targetY = target.getBoundingClientRect().top + window.scrollY - navBarHeight;
  
      // 順移至指定位置
      window.scrollTo({
        top: targetY,
        behavior: "smooth"
      });
    };
  
    document.getElementById("first").addEventListener("click", function () {
      scrollToTarget("target_first");
    });
  
    document.getElementById("second").addEventListener("click", function () {
      scrollToTarget("target_second");
    });
  
    document.getElementById("third").addEventListener("click", function () {
      scrollToTarget("target_third");
    });
  
    document.getElementById("fourth").addEventListener("click", function () {
      scrollToTarget("target_fourth");
    });
  
    document.getElementById("fifth").addEventListener("click", function () {
      scrollToTarget("target_fifth");
    });
  });
  