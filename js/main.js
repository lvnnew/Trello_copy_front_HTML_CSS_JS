// глобальные переменные
// получение всех списков
const lists = document.querySelectorAll('.list')
// кнопка "Добавить доску"
const button = document.querySelector('.button')

function addTask(){
    const btn = document.querySelector('.add__btn')
    const addBtn = document.querySelector('.add__item-btn')
    const cancelBtn = document.querySelector('.cancel__item-btn')
    const textarea = document.querySelector('.textarea')
    const form = document.querySelector('.form')

    let value
// логика разворачивания формы
// обработчик событий на клик по кнопке
// далее стрелочная функция 
// если тык по кнопке произошел, то форма раскроется
// при этом все лишние кнопки (кроме "Отменить") после тыка исчезнут
    btn.addEventListener('click', ()=> {
        form.style.display = 'block'
        btn.style.display = 'none'
        addBtn.style.display = 'none'
        // после ввода данных в texarea, появиться кнопка "Добавить карточку"
        textarea.addEventListener('input', e => {
            value = e.target.value

            if(value){
                addBtn.style.display = 'block'
            } else {
                addBtn.style.display = 'none'
            }
        })
    })
    // кнопка "Отменить"
    // обработчик событий на клик по кнопке
    // далее стрелочная функция 
    // если тык по кнопке произошел, то произойдет очистка и форма свернется в изначальное состояние
    cancelBtn.addEventListener('click', () => {
        textarea.value = ''
        value = ''
        form.style.display = 'none'
        btn.style.display = 'flex'
    })
    // добавление карточек 
    // обработчик событий на клик по кнопке
    addBtn.addEventListener('click', () => {
        const newItem = document.createElement('div') //создает новый элемент типа div
        newItem.classList.add('list__item') //присваивает созданному элементу указанный класс
        newItem.draggable = true //добавляет созданному элементу указанный атрибут
        newItem.textContent = value //добавляет в созданный элемент данные из указанной переменной
        lists[0].append(newItem) //получаем первый элемент из запрошенных ранее списков и помечаем как newItem
        //после добавления карточки срабатывает очистка 
        textarea.value = ''
        value = ''
        form.style.display = 'none'
        btn.style.display = 'flex'


        dragNdrop()
    })
}

addTask()

// добавление новых досок
function addBoard() {
    const boards = document.querySelector('.boards')
    const board = document.createElement('div')
    board.classList.add('boards__item')
    board.innerHTML = `
        <span contenteditable="true" class="title">Введите название</span>
        <div class="list"></div>
    `
    boards.append(board)

    changeTitle()
    dragNdrop()
    delBoard()
}
button.addEventListener('click', addBoard)

// нормальное редактирование заголовка доски
function changeTitle() {
    const titles = document.querySelectorAll('.title')

    titles.forEach( title => {
        title.addEventListener('click', e => e.target.textContent = '')
    } )
}
changeTitle()
// удаление досок
function delBoard() {
	const boards = document.querySelectorAll('.boards__item')
	for (let i = 0; i < boards.length; i++) {
		const board = boards[i]

		board.addEventListener('dblclick', () => {
			board.remove()
		})
	}
}
delBoard()

let draggedItem = null

function dragNdrop() {
    const listItems = document.querySelectorAll('.list__item')
    const lists = document.querySelectorAll('.list')
    // цикл draggNdrop
    for (let i = 0; i < listItems.length; i++) {
        const item = listItems[i]
        // скрывает карточку если начать её перетаскивать
        item.addEventListener('dragstart', () => {
            draggedItem = item
            setTimeout(() => {
                item.style.display = 'none'
            }, 0)
        })
        // возвращает карточку на место, если отпустить её при перетаскивании
        item.addEventListener('dragend', () => {
            setTimeout(() => {
                item.style.display = 'block'
                draggedItem = null
            }, 0)
        })
        // удаление карточек
        item.addEventListener('dblclick', () => {
            item.remove()
        })
        
        for (let j = 0; j < lists.length; j++) {
            const list = lists[j]

            list.addEventListener('dragover', e => e.preventDefault())
            // добавить тень
            list.addEventListener('dragenter', function (e) {
                e.preventDefault()
                this.style.backgroundColor = 'rgba(0,0,0,.3)'
            })
            // убрать тень
            list.addEventListener('dragleave', function (e) {
                this.style.backgroundColor = 'rgba(0,0,0, 0)'
            })
            // сброс тени и реализация дропа
            list.addEventListener('drop', function (e) {
                this.style.backgroundColor = 'rgba(0,0,0, 0)'
                this.append(draggedItem)
            })

        }
    }

}
dragNdrop()