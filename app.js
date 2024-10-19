const input = document.getElementById('title');
const btn = document.getElementById('submit');
const list = document.getElementById('list');

let notes = [
    {
        title: 'Read the book',
        completed: false
    },
    {
        title: 'Clear the closet',
        completed: false
    },
    {
        title: 'To wash the dog',
        completed: true
    }
    ,
    {
        title: 'Take our the trash',
        completed: true
    },
    {
        title: 'Pet the cat',
        completed: false
    }
];

render();

btn.onclick = function() {
    const inputValue = input.value;

    if (inputValue == '') {
        return false;
    }

    const note = {
        title: inputValue,
        completed: false
    }
    notes.push(note);

    render();
    input.value = '';
};

list.onclick = function(event) {
    if (event.target.dataset.index) {
        const index = event.target.dataset.index;

        if (event.target.dataset.type === 'toggle') {
            notes[index].completed = !notes[index].completed;
        } else if (event.target.dataset.type === 'delete') {
            notes.splice(index, 1);
        }

        render();
    }
}

function render() {
    list.innerHTML = '';

    if (notes.length === 0) {
        list.innerHTML = `<p>No notes found</p>`;
    }

    for(let i = 0; i < notes.length; i++) {
        const note = notes[i];

        const row = document.createElement('tr');
        
        row.innerHTML = getTemplate(note, i);
        list.appendChild(row);
    }
}

function getTemplate(note, index) {
    return `
        <td class="${note.completed ? 'text-decoration-line-through' : ''}">${note.title}</td>
        <td>
            <div class="d-flex justify-content-end">
                <button class="btn btn-${note.completed ? 'success' : 'outline-success'}" style="margin-right: 10px;" data-type="toggle" data-index="${index}">✓</button>
                <button class="btn btn-outline-danger" style="width: 38px;" data-type="delete" data-index="${index}">X</button>    
            </div>
        </td>
    `;
}