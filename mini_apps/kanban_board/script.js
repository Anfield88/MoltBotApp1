// 状态管理
let tasks = {
    todo: [],
    doing: [],
    done: []
};

// 初始化
document.addEventListener('DOMContentLoaded', () => {
    loadTasks();
    renderBoard();
});

function loadTasks() {
    const saved = localStorage.getItem('kanbanTasks');
    if (saved) {
        tasks = JSON.parse(saved);
    } else {
        // 默认示例数据
        tasks = {
            todo: ['写第一行代码', '设计 Logo'],
            doing: ['正在做 Kanban'],
            done: ['启动项目']
        };
    }
}

function saveTasks() {
    localStorage.setItem('kanbanTasks', JSON.stringify(tasks));
}

function renderBoard() {
    renderColumn('todo');
    renderColumn('doing');
    renderColumn('done');
}

function renderColumn(status) {
    const list = document.getElementById(`${status}-list`);
    list.innerHTML = ''; // 清空当前列表
    
    tasks[status].forEach((text, index) => {
        const card = document.createElement('div');
        card.className = 'task-card';
        card.draggable = true;
        card.id = `${status}-${index}`; // 唯一 ID
        card.innerText = text;
        
        // 拖拽事件
        card.ondragstart = (ev) => {
            ev.dataTransfer.setData("text/plain", JSON.stringify({status, index}));
        };

        // 双击删除
        card.ondblclick = () => {
            if(confirm('删除这个任务吗?')) {
                tasks[status].splice(index, 1);
                saveTasks();
                renderBoard();
            }
        };

        list.appendChild(card);
    });
}

// 添加任务
function handleEnter(ev, status) {
    if (ev.key === 'Enter' && ev.target.value.trim() !== '') {
        const text = ev.target.value.trim();
        tasks[status].push(text);
        ev.target.value = ''; // 清空输入框
        saveTasks();
        renderBoard();
    }
}

// 拖放逻辑 (Drop)
function allowDrop(ev) {
    ev.preventDefault();
}

function drop(ev) {
    ev.preventDefault();
    const data = JSON.parse(ev.dataTransfer.getData("text/plain"));
    const oldStatus = data.status;
    const oldIndex = data.index;
    
    // 找到目标列
    let targetList = ev.target.closest('.task-list');
    if (!targetList) return; // 如果没拖到列表里
    
    // 从 ID 推断新状态 (todo-list -> todo)
    const newStatus = targetList.id.split('-')[0];

    // 移动数据
    const taskText = tasks[oldStatus][oldIndex];
    tasks[oldStatus].splice(oldIndex, 1); // 删旧
    tasks[newStatus].push(taskText);      // 加新
    
    // 🎉 撒花特效：如果是移动到 'done'
    if (newStatus === 'done' && oldStatus !== 'done') {
        confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 }
        });
    }

    saveTasks();
    renderBoard();
}

function clearBoard() {
    if(confirm('确定清空所有任务吗？')) {
        tasks = { todo: [], doing: [], done: [] };
        saveTasks();
        renderBoard();
    }
}
