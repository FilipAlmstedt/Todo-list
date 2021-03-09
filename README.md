# My first Java Script - ToDo-List
-------
*A to-do list made with vanilla JavaScript. This is based on a school assignment. Focusing on JavaScript.*

## Features on the website
The website shows you a table showing you the todo-list. The user can:
* add a new todo-item 
* delete the items in the list
* sort the list 
* check and uncheck the items to show that the item is done 

## Installation:
Make a new folder. 
1. Run `git clone https://github.com/FilipAlmstedt/Todo-list.git` in your terminal
2. Start `index.html`

To modify code for sass-files: run `npm install node-sass` in terminal.

The same goes to use the gulpfile, run the following commands in the terminal:
- `npm install gulp`
- `npm install gulp-sass`
- `npm install gulp-csso`
- `npm install gulp-rename` 

### Variables
* Use let instead of var
    *Instead of using var, use let and/or const when needed*
* When naming variables use **camelCase**
    *Eg. `let userName = "Anders";`*


### Functions
* **Don't** use arrow functions unless it's for **addEventListner**.
    *Eg. `document.getElementById("buttonIdName").addEventListener('click', () => {functionName();});`*

* Function names should use **camelCase**
    
### Classes
* Class names should use **PascalCase**
    *Eg. `Class Task`*
    
## Project structure
* ProjectFolder/ *- Project root, index and hmtl files goes here, as well as a gitignore, gulp-file and node_modules and the package-lock.json file* 
    * css/ *- Css folder, all css-styling goes in here*
    * scss/ *- Sass folder, all scss-styling goes in here*
    * js/ *- JavaScript folder, all JavaScript logic goes in here*

------
 
