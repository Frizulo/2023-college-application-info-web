// 頁面載入執行
document.addEventListener('DOMContentLoaded', function () {
    // 學校
    var schoolSearch = document.getElementById('schoolList');
    schoolSearch.innerHTML = '';
    // 抓學校資料
    fetch('../get_school_data/')
    .then(response => response.json())
    .then(data => {
            
        for (var i = 0; i < data.length; i++) {
            var option = document.createElement('option');  // 選項 物件
            option.value = data[i].universityID + ' ' + data[i].universityName;
            schoolSearch.appendChild(option);    // 加入選項
        }
    })
    .catch(error => {
    console.error('Error:', error);
    });

    // 科系
    var departmentSearch = document.getElementById('departmentList');
    departmentSearch.innerHTML = '';
    // 抓科系資料
    fetch('../get_department_data/')
    .then(response => response.json())
    .then(data => {
            
        for (var i = 0; i < data.length; i++) {
            var option = document.createElement('option');  // 選項 物件
            option.value = data[i].departmentName;
            departmentSearch.appendChild(option);    // 加入選項
        }
    })
    .catch(error => {
    console.error('Error:', error);
    });
});

function search(){
    var university = document.getElementById('schoolSearch').value.substr(0,3);
    var universityCorrect = 0;
    var department = document.getElementById('departmentSearch').value;
    var departmentCorrect = 0;
    var departmentID = document.getElementById('codeSearch').value;
    var departmentIDCorrect = 0;
    if(university != ''){
        console.log('university:',university);
        fetch('../get_school_data/')
        .then(response => response.json())
        .then(data => { 
            for (var i = 0; i < data.length; i++) {
                if(university === data[i].universityID){       //  傳資料
                    universityCorrect = 1;
                    break;
                }
            }
            if(universityCorrect === 1){ // 正確
                
                var data_ = {   // 回傳學校代碼
                    universityID: university,
                    departmentName: '',
                    departmentID: '',
                    std: ''
                };
                try {
                    console.log(data_);
                    const response = post(data_)
                    .then(data => {
                        console.log(data);
                        // 返回資料
                        table(data);    // 製作表格
                    })
                    .catch(error => {
                        console.error('Error:', error);
                        // 處理錯誤
                    });
                    // 在這裡處理 response
                    console.log(response);
                } catch (error) {
                    // 處理錯誤
                    console.error(error);
                }
            }
        })
        .catch(error => {
        console.error('Error:', error);
        });
    }

    // 學系名
    if(department != ''){
        console.log('department:',department);
        fetch('../get_department_data/')
        .then(response => response.json())
        .then(data => { 
            for (var i = 0; i < data.length; i++) {
                if(data[i].departmentName.includes(department)){       //  傳資料
                    departmentCorrect = 1;
                    break;
                }
            }
            if(departmentCorrect === 1){ // 正確
                
                var data_ = {   // 回傳系名
                    universityID: '',
                    departmentName: department,
                    departmentID: '',
                    std: ''
                };
                try {
                    console.log(data_);
                    const response = post(data_)
                    .then(data => {
                        console.log(data);
                        // 返回資料
                        table(data);    // 製作表格
                    })
                    .catch(error => {
                        console.error('Error:', error);
                        // 處理錯誤
                    });
                    // 在這裡處理 response
                    console.log(response);
                } catch (error) {
                    // 處理錯誤
                    console.error(error);
                }
            }
        })
        .catch(error => {
        console.error('Error:', error);
        });
    }

    // 代號
    if(departmentID != ''){
        console.log('departmentID:',departmentID);
        fetch('../get_department_code_data/')
        .then(response => response.json())
        .then(data => { 
            for (var i = 0; i < data.length; i++) {
                if(departmentID === data[i].departmentID){       //  傳資料
                    departmentIDCorrect = 1;
                    break;
                }
            }
            
            if(departmentIDCorrect === 1){ // 正確
                var data_ = {   // 回傳校系代碼
                    universityID: '',
                    departmentName: '',
                    departmentID: departmentID,
                    std: ''
                };
                try {
                    console.log(data_);
                    const response = post(data_)
                    .then(data => {
                        console.log(data);
                        // 返回資料
                        table(data);    // 製作表格
                    })
                    .catch(error => {
                        console.error('Error:', error);
                        // 處理錯誤
                    });
                    // 在這裡處理 response
                    console.log(response);
                } catch (error) {
                    // 處理錯誤
                    console.error(error);
                }
            }
        })
        .catch(error => {
        console.error('Error:', error);
        });
    } 
}

// 回傳資料給後端
function post(data) {
    var csrfToken = document.querySelector('[name=csrfmiddlewaretoken]').value;

    return fetch("/get_details_data/", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "X-CSRFToken": csrfToken
        },
        body: JSON.stringify(data)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    });
}

function table(data){
    var details = document.getElementById('info');
    details.innerHTML = '';
    for (var i = 0; i < data.length; i++) {
        var uName = document.createElement('a');
        uName.innerHTML = data[i].universityName;
        var dName = document.createElement('a');
        dName.innerHTML = data[i].departmentName;
        
        var cell = [];
        var row = details.insertRow(-1); // 在表格末尾插入一行
        if(i % 2 === 0){
            row.classList.add('A')
        }
        else{
            row.classList.add('B')
        }
        for(var j = 0; j < 11; j++){
            cell.push(row.insertCell(j));
            if(j < 3 || j === 9){
                cell[j].rowSpan = 2
            }
        }
        cell[0].innerHTML=data[i].departmentID;
        cell[1].appendChild(uName);
        cell[1].appendChild(document.createElement('br'));
        cell[1].appendChild(dName);
        cell[2].innerHTML=data[i].enrollment;
        cell[3].innerHTML=data[i].chineseStandard;
        cell[4].innerHTML=data[i].englishStandard;
        cell[5].innerHTML=data[i].mathAStandard;
        cell[6].innerHTML=data[i].mathBStandard;
        cell[7].innerHTML=data[i].socialStandard;
        cell[8].innerHTML=data[i].scienceStandard;
        cell[9].innerHTML=data[i].englishListeningStandard;
        cell[10].innerHTML=data[i].addtionStandard;
        cell = [];
        var row = details.insertRow(-1); // 在表格末尾插入一行
        if(i % 2 === 0){
            row.classList.add('A')
        }
        else{
            row.classList.add('B')
        }
        for(var j = 0; j < 7; j++){
            cell.push(row.insertCell(j));
        }
        cell[0].innerHTML=data[i].chineseRate;
        cell[1].innerHTML=data[i].englishRate;
        cell[2].innerHTML=data[i].mathARate;
        cell[3].innerHTML=data[i].mathBRate;
        cell[4].innerHTML=data[i].socialRate;
        cell[5].innerHTML=data[i].scienceRate;
        cell[6].innerHTML=data[i].addtionRate;
    }
}

var codeSearchInput = document.getElementById('codeSearch');
var departmentSearchInput = document.getElementById('departmentSearch');
var schoolSearchInput = document.getElementById('schoolSearch');
// 添加 codeSearch input 事件監聽器
codeSearchInput.addEventListener('input', function() {
    schoolSearchInput.value = '';
    departmentSearchInput.value = '';
});

// 添加 departmentSearch input 事件監聽器
departmentSearchInput.addEventListener('input', function() {
    schoolSearchInput.value = '';
    codeSearchInput.value = '';
});

// 添加 schoolSearch input 事件監聽器
schoolSearchInput.addEventListener('input', function() {
    departmentSearchInput.value = '';
    codeSearchInput.value = '';
});