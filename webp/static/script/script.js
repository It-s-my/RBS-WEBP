const path = "http://localhost:9021/"; // Путь к  серверу
//Константа для сортировки
const sortAsc = "asc"
const sortDesc = "desc"

// Получение текущего пути
let currentPath = document.getElementById('current-path').innerHTML

// Кнопка "Назад"
const goBackButton = document.getElementById('goback');
// Флаг для управления сортировкой
let flag = true
//История путей
let pathHistory = [currentPath];

//Управление спинером on делает его видимым off - невидимым
const Spin = {
    LoadSpin: document.getElementById('load-spin'),
    on() {
        this.LoadSpin.style.display = 'block'
    },
    off() {
        this.LoadSpin.style.display = 'none'
    }
}

//upload - загрузка данных при загрузке страницы
async function upload(currentPath,sortFlag) {
    Spin.on()
    let sort = sortAsc

    if (!sortFlag) {
        sort = sortDesc
    }


    await fetch(path + '?root=/home/' + currentPath.slice(1, -1)+ '&sort=' + sort, {
        method: "GET",
    })
        .then(response => response.json())
        .then(data => {
            let file_list = document.getElementById("new")
            file_list.innerHTML = ""

            data.forEach(element => {
                file_list.inertHTML += ` <div class="File-Container"></div>`
                if (element["Type"] === "directory") {
                    console.log(element["Name"]);
                    file_list.innerHTML += ` <div class="File-Menu-Container" id="new"><div class="Type-con"><div class="Type">Dir</div></div><div class="Name-Form"> <div class="Name-Form-Container"><a href="#" onclick="navigateToDirectory(event)">${element["Name"]}</a></div></div><div class="Size-Form"><div class="Size">${element["Size"]}</div></div></div>`
                }
                if (element["Type"] === "file") {
                    console.log(element["Name"]);
                    file_list.innerHTML += ` <div class="File-Menu-Container"><div class="Type-con"><div class="Type">File</div>
                                                            </div><div class="Name-Form"> <div class="Name-Form-Container">${element["Name"]}</div>
                                                                     </div>
                                                                                             <div class="Size-Form">
                                                                                               <div class="Size">${element["Size"]}</div>
                                                                                                              </div>
                                                                                                                      </div>`
                }
            });
        })
        .catch(error => {
            console.error('Ошибка:', error);
        })
Spin.off()
}
//Вызов функции
upload(currentPath,flag)
//navigateToDirectory - для прохода вглубь директории при нажатии на неё
function navigateToDirectory(event) {
    let clickedElement = event.target;

    let currentPath = document.getElementById('current-path').textContent + clickedElement.textContent + "/"

    document.getElementById('current-path').innerHTML = currentPath

    upload(currentPath,flag)
    JSON.parse()
    console.log(currentPath)
}
//backBut - Для возвращения назад по директории при нажатии кнопки назад
function backBut() {
    let currentPath = document.getElementById('current-path').textContent

    if (currentPath === "/") {
        alert("Дальше некуда!")
        return
    }

    let pathArray = currentPath.split('/');

    pathArray.pop();
    pathArray.pop();

    let newPath = pathArray.join('/') + "/";

    document.getElementById('current-path').innerHTML = newPath

    upload(newPath, flag)
}
//sort - для выбора сортировки asc/desc
function sort() {
    let currentPath = document.getElementById('current-path').textContent;
    flag = !flag; // Переключаем флаг при каждом вызове функции

    let buttonSort = document.querySelector(".S-but");

    if (flag) {
        buttonSort.textContent = "Asc"; // Устанавливаем текст на кнопке в зависимости от состояния сортировки
    } else {
        buttonSort.textContent = "Desc"; // Устанавливаем текст на кнопке в зависимости от состояния сортировки
    }

    upload(currentPath, flag);
}