const form = document.getElementById('todo-form');
const input = document.getElementById('todo-input');
const list = document.getElementById('todo-list');
const search = document.getElementById('search');
const submitButton = document.getElementById('submit-button');

let isEditing = false;
let currentTaskSpan = null;

form.addEventListener('submit', function (e) {
  e.preventDefault();
  const taskText = input.value.trim();
  if (taskText !== '') {
    if (isEditing && currentTaskSpan) {
      currentTaskSpan.textContent = taskText;
      isEditing = false;
      currentTaskSpan = null;
      submitButton.textContent = 'Add';
    } else {
      addTask(taskText);
    }
    input.value = '';
  }
});

function addTask(text) {
  const li = document.createElement('li');
  li.innerHTML = `
    <label>
      <input type="checkbox" />
      <span>${text}</span>
    </label>
    <div class="actions">
      <span class="edit">
        <i class="fa-solid fa-pen"></i>
      </span>
      <span class="delete">
          <i class="fa-solid fa-trash"></i>
      </span>
    </div>
  `;

  const deleteBtn = li.querySelector('.delete');
  deleteBtn.addEventListener('click', () => {
    list.removeChild(li);
  });

  const editBtn = li.querySelector('.edit');
  editBtn.addEventListener('click', () => {
    const span = li.querySelector('span');
    input.value = span.textContent;
    input.focus();
    isEditing = true;
    currentTaskSpan = span;
    submitButton.textContent = 'Update';
  });

  list.appendChild(li);
}

search.addEventListener('input', function () {
  const searchTerm = search.value.toLowerCase();
  const items = list.querySelectorAll('li');
  items.forEach(item => {
    const taskText = item.querySelector('span').textContent.toLowerCase();
    item.style.display = taskText.includes(searchTerm) ? '' : 'none';
  });
});