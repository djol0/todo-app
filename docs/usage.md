# Project documentation

The Todo app consists of two main parts: a form and a component for displaying tasks.

<img src="images/app.png" alt="Alt text" width="500" height="400">
<br /> <br />

The form contains four input fields:
- The first one is required and represents the task title.
- The second one is optional and represents the task description.
- The third one is required and is a select option for choosing the column to which the task belongs.
- The fourth one is optional and represents the task's due date.


At the beginning of the content section, there is a heading "My Todos", which represents the title of this section, along with buttons for filtering tasks.

<img src="images/filter.png" alt="Alt text" width="200" height="30">

The filter contains three options:
- Displaying all tasks
- Displaying only active/incomplete tasks
- Displaying completed tasks

<br /> <br />

After that comes the section for displaying tasks. Tasks are grouped into columns. A column represents a collection of similar tasks.

<img src="images/components.png" alt="Alt text" width="500" height="400">

## TASKS

- A task can be deleted by clicking the delete button.
- A task can be marked as completed by checking the checkbox.
- Additionally, a task can be moved to another column.

<img src="images/task.png" alt="Alt text" width="200" height="50">
<img src="images/completed.png" alt="Alt text" width="200" height="50">


## COLUMNS

Columns have two options:

- A new column can be created by clicking the plus icon, entering a name in the text field, and confirming by clicking the check button or pressing Enter.

<img src="images/add.png" alt="Alt text" width="400" height="150">
<img src="images/addform.png" alt="Alt text" width="400" height="150">

<br /> <br />

- A column can be deleted by clicking the "X" button. After clicking, a popup window will appear with the message:

<img src="images/popup.png" alt="Alt text" width="500" height="250">

The user can choose to either delete all tasks or move them to another column.

<img src="images/options.png" alt="Alt text" width="500" height="250">

At least one column must exist at all times. If there is only one column, it cannot be deleted. When the application is first used, a default column named 'Todo Task' is available.