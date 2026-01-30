//index feedback表單繳交&清除
document.addEventListener('DOMContentLoaded', function(){
    const content = document.querySelector('.content');
    const deleteBtn = document.getElementById('deleteBtn');
    const submitBtn = document.getElementById('submitBtn');
    const menu = document.getElementById('menu');
    const textInput = document.getElementById('textInput');
    submitBtn.addEventListener('click', function(){
      content.style.transition = 'transform 1s ease-out';
      content.style.transform = 'translateY(-100%)';
      setTimeout(function(){
        // 清空內容
        menu.selectedIndex = -1;
        textInput.value = '';
        content.style.transition = 'transform 1s ease-in';
        content.style.transform = 'translateY(0)';
      }, 1000);
    });
    deleteBtn.addEventListener('click', function(){
      // 清空選單
      menu.selectedIndex = -1;
      // 清空文字輸入框
      textInput.value = '';
    });
});