import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; // Import CommonModule
import { FormsModule } from '@angular/forms'; // Import FormsModule if using ngModel

interface TodoItem {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule] // Include CommonModule and FormsModule
})
export class TodoListComponent implements OnInit {
  todoItemList: TodoItem[] = [];
  filteredTodoList: TodoItem[] = [];

  ngOnInit(): void {
    this.fetchTodoItems();
  }

  async fetchTodoItems() {
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/todos/');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      this.todoItemList = await response.json();
      this.filteredTodoList = this.todoItemList;
    } catch (error) {
      console.error('Error fetching todo items:', error);
    }
  }

  filterResults(text: string) {
    if (!text) {
      this.filteredTodoList = this.todoItemList;
      return;
    }
    this.filteredTodoList = this.todoItemList.filter((todoItem) =>
      todoItem.title.toLowerCase().includes(text.toLowerCase())
    );
  }
}
