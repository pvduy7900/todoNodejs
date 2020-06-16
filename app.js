// const fs = require("fs")
// const yargs = require("yargs")

// yargs.command({
//     command: "list",
//     describe: "show list from data.json",
    
//     handler: function () {
//         const data = loadData();
//         data.forEach(({ todo, status }, idx) =>
//             console.log(chalk.blueBright.bold(`
//                     idx:${idx}
//                     todo:${todo}
//                     status:${status}`)
//             )
//     );
// }
// }).help().argv

// yargs.command({
//     command: "add",
//     describe: "add sth new to data.json",
//     builder: {
//         todo:{
//             alias:"",
//             describe:"",

//         },
//         status:{

//         }

//     },
//     handler: function () {
//         addTodo()
//     }
// }).help().argv

// yargs.command({
//     command: "remove",
//     describe: "remove sth from data.json",
//     builder: {

//     },
//     handler: function () {
//         removeTodo()
//     }
// }).help().argv



const fs = require("fs") 
const yargs = require("yargs")
const chalk = require("chalk")

function loadData() {
    try {
        const buffer = fs.readFileSync("data.json");
        const data = buffer.toString();  
        const dataObj = JSON.parse(data);
        return dataObj;
    } catch (err) {
        return [];
    }
}

function saveData(data) {
    fs.writeFileSync("data.json", JSON.stringify(data));
}

function addTodo(todo, status) {
    const data = loadData();
    console.log(data);
    const newTodo = { todo: todo, status: status } // this is the new todo and new status
    data.push(newTodo); // push new one in to data
    saveData(data);
}

function removeTodo(removeIdx){
    const data = loadData();
    console.log(data);


        const remove = data.filter((item, index) => {
            console.log(item)
            console.log(index)
            console.log(index != removeIdx);
            console.log("======");

        return index != removeIdx


    });
    saveData(remove);
}


yargs.command({
    command: "List",
    describe: "Listing of todos",
    handler: function () {
        console.log(chalk.blue.bold("listing todo"));
        const data = loadData();
        data.forEach(({ todo, status }, idx) =>
            console.log(
                chalk.blueBright.bold(`
            idx:${idx}
            todo:${todo}
            status:${status}`)
            )
        )
    }
}).help().argv

yargs.command({
    command: "add",
    describe: "add new todo",
    builder: {
        todo: {
            describe: "todo content",
            demandOption: true,
            type: "string",
            alias: "t",
        },
        status: {
            describe: "status of todo",
            demandOption: false,
            type: "boolean",
            alias: "stt",
            default: false,
        },
    },
    handler: function ({ todo, status }) {
        addTodo(todo, status);
        console.log("added");
    },
}).help().argv


yargs.command({
    command: "remove",
    describe: "remove todo",
    builder: {
        idx: {
            describe: "todo content",
            demandOption: true,
            type: "string",
            alias: "rm",
        },
    },
    handler: function ({ idx }) {
        removeTodo(idx);
        console.log("remove");
    },

}).help().argv


