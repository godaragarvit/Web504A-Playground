const firebaseConfig = {
    apiKey: "AIzaSyBDglj2vvw-s1pzh9Fx7l76y4uCPLykZLA",
    authDomain: "web504-8abb1.firebaseapp.com",
    projectId: "web504-8abb1",
    storageBucket: "web504-8abb1.appspot.com",
    messagingSenderId: "245596026826",
    appId: "1:245596026826:web:3ecffcdd080b046f4d4133",
    measurementId: "G-512GSSHCW0"
  };
//Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
const database = firebase.database();
const todoRef = firebase.database().ref('todo');
//Select DOM Elements
const addTodoBtn = document.getElementById('add-todo-btn');
const todoInput = document.getElementById('todo-input');
const todoList = document.getElementById('todo-list');
const prioritySelect = document.getElementById('priority-select');
const searchInput = document.getElementById('search-input');
const darkToggle = document.getElementById('dark-mode-toggle');
 
// Event Listener to Add TODO item
addTodoBtn.addEventListener('click', () => {
  const todoText = todoInput.value.trim();
  const priority = prioritySelect.value;
  if (todoText > 0) {
    // Create a new reference in the database for a new todo item
    const newTodoRef = todoRef.push();
    const currentDate = new Date().toLocaleDateString();
    // Set the new todo item's properties in Friebase
    newTodoRef.set({
      text: todoText,
      completed: false,
      date: currentDate,
      priority: priority,
      category: 'General', // Add a default category for now.
    });
    //Clear the input after adding the todo
    todoInput = '';
  }
});
 
//Add keypress event to add todo with 'Enter' key
todoInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    addTodoBtn.click();
  }
});
 
// Event Listener to Toggle Dark Mode
darkToggle.addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');
});
 
//Fetch and render TODO items from Firebase
todoRef.on('value', (snapshot) => {
  // Clear the current list to prepare for any updated content
  todoList.innerHTML = '';
  snapshot.forEach((childSnapshot) => {
    const todoItem = childSnapshot.val(); // Retrieve the todo data
    const todoKey = childSnapshot.key; // Unique key for the todo item
    const li = document.createElement('li'); // Create a list item for each todo
 
    // Create a label to display the category of the todo
    const categoryLabel = document.createElement('div')
    categoryLabel.classList.add('category-label');
    categoryLabel.textContent = todoItem.category;
    li.appendChild(categoryLabel);
 
    const todocontent = document. createElement('div');
    todocontent.classList.add('todo-content')
 
    // creat a status icon based on the task state
    const statusIcon = document.createElement('div')
    statusIcon.classList.add('status-icon')
 
    if(todoItem.completed){
        statusIcon.classList.add('completed')
    statusIcon.innerHTML = '<i class="fas fa-check"></i>'
    } else if (todoItem.priority=== 'high') {
        statusIcon.classList.add('priority')
        statusIcon.innerHTML = '<i class= "fas fa-exclamation-circle"></i>'
     } else if (todoItem.priority === 'medium') {
                statusIcon.classList.add('in-progress');
                statusIcon.innerHTML = '<i class="fas fa-hourglass-half"></i>';
            } else if (todoItem.priority === 'low') {
                statusIcon.classList.add('waiting');
                statusIcon.innerHTML = '<i class="fas fa-pause"></i>';
            } else {
                statusIcon.classList.add('unfinished');
                statusIcon.innerHTML = '<i class="fas fa-times"></i>';
            }
        todocontent.appendChild(todoTextspan)
   
    //Display the todo text
    const todoTextspan = document.createElement('span')
    todoTextspan.textContent = '${todoitems.text}'
    if (todoItem.completed) {
        todoTextspan.classList.add('completed'); //style the text if completed
    }
    todocontent.appendChild('todotextspan')
    }
 
    //creat an edit button
    const editbtn = document.createElement('i')
    editbtn.classList.add('fas', 'fa-edit', 'edit-btn')
    editbtn.addEventListener('click',(event)=> {
        e.stoppropagetion() // prevent click from toggling completion
        const editinput = document.createElement('input')
        editinput.type = 'text'
        editinput.classList.add('todo-input-edit')
        editinput.value = todoItem.text
        todocontent.replacechlid(editinput, todoTextspan) // replace text with input field
        editinput.focus();
 
        //when editing is complete (on losing focus)
        editinput.addEventListener('blur,() =>'{
            const updatedtext = editinput.value.trim()
            // update the todo text and date in firebase
            todoRef.child(todoKey).updated({
                text: updatedtext,
                date: new Date().toLocaleDateString()
            })  
        }else {
            // revert to original text if no valid input
            todocontent.replacechlid(rodotextspan, editinput);
        }
        });
    });
    // creat a complete button
    const completebtn = document.createElement('i')
    completebtn.classList.add('fas','fa-check', 'complete-btn')
    completebtn.addEventListener('click' (e) =>{
        e.stoppropagetion()  // prevent click from triggering other actions
        // toggle the complettion status of the todo item
        todoref.child(todokey).update({
            complete: !todoItem.completed,
        });
    });
 
    //creart an undo button for completed tasks
    const undoBtn = document.createElement9('i')
    undoBtn.classList.add('fas', 'fa-undo', 'undo-btn');
    e.stoppropagetion(); // prevent click from triggering any other actions
    //set the task as incomplete
    todoRef.child(eodokey).update({
        complete: false,
    });
 
    //creat a delete button
    //('fas', 'fa-delete', 'delete-btn)
const deleteBtn = document.createElement('i');
deleteBtn.classList.add('fas', 'fa-delete', 'delete-btn');
 
// Add event listener for the delete button
deleteBtn.addEventListener('click', (e) => {
  e.stopPropagation(); // Prevent any other actions on the item from triggering
 
  // Remove the todo item from Firebase using the unique key
  todoRef.child(todoKey).remove();
 
  // Optionally, remove the item from the DOM immediately
  li.remove();
});
 
// Append the delete button to the list item
li.appendChild(deleteBtn);
 
// Create a list item (li) for the todo
const li = document.createElement('li');
li.classList.add('todo-item');
 
// Create and append the category label
const categoryLabel = document.createElement('div');
categoryLabel.classList.add('category-label');
categoryLabel.textContent = todoItem.category;
li.appendChild(categoryLabel);
 
// Create the container for the todo content
const todoContent = document.createElement('div');
todoContent.classList.add('todo-content');
 
// Create and append the status icon
const statusIcon = document.createElement('div');
statusIcon.classList.add('status-icon');
 
if (todoItem.completed) {
    statusIcon.classList.add('completed');
    statusIcon.innerHTML = '<i class="fas fa-check"></i>';
} else if (todoItem.priority === 'high') {
    statusIcon.classList.add('priority');
    statusIcon.innerHTML = '<i class="fas fa-exclamation-circle"></i>';
} else if (todoItem.priority === 'medium') {
    statusIcon.classList.add('in-progress');
    statusIcon.innerHTML = '<i class="fas fa-hourglass-half"></i>';
} else if (todoItem.priority === 'low') {
    statusIcon.classList.add('waiting');
    statusIcon.innerHTML = '<i class="fas fa-pause"></i>';
} else {
    statusIcon.classList.add('unfinished');
    statusIcon.innerHTML = '<i class="fas fa-times"></i>';
}
todoContent.appendChild(statusIcon);
 
// Create and append the todo text
const todoTextspan = document.createElement('span');
todoTextspan.textContent = todoItem.text;
if (todoItem.completed) {
    todoTextspan.classList.add('completed'); // Style the text if completed
}
todoContent.appendChild(todoTextspan);
 
// Create and append the edit button
const editBtn = document.createElement('i');
editBtn.classList.add('fas', 'fa-edit', 'edit-btn');
editBtn.addEventListener('click', (e) => {
    e.stopPropagation(); // Prevent click from toggling completion
    const editInput = document.createElement('input');
    editInput.type = 'text';
    editInput.classList.add('todo-input-edit');
    editInput.value = todoItem.text;
    todoContent.replaceChild(editInput, todoTextspan); // Replace text with input field
    editInput.focus();
 
    // When editing is complete (on losing focus)
    editInput.addEventListener('blur', () => {
        const updatedText = editInput.value.trim();
        if (updatedText.length > 0) {
            // Update the todo text and date in Firebase
            todoRef.child(todoKey).update({
                text: updatedText,
                date: new Date().toLocaleDateString()
            });
            todoTextspan.textContent = updatedText;
        }
        // Revert to original text if no valid input
        todoContent.replaceChild(todoTextspan, editInput);
    });
});
todoContent.appendChild(editBtn);
 
// Create and append the complete button
const completeBtn = document.createElement('i');
completeBtn.classList.add('fas', 'fa-check', 'complete-btn');
completeBtn.addEventListener('click', (e) => {
    e.stopPropagation(); // Prevent click from triggering other actions
    // Toggle the completion status of the todo item
    todoRef.child(todoKey).update({
        completed: !todoItem.completed,
    });
});
todoContent.appendChild(completeBtn);
  });
});  