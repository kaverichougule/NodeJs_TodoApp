const readline=require('node:readline');
const fs=require('node:fs');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

function addNewTask(){
    rl.question("Enter task name: ", (taskName) => {
        fs.readFile("tasks.txt",(err,data)=>{
            if(err){
                console.log("Error reading file: ",err);
                return;
            }
            const tempData=data.toString().trim().split("\n");
            const newTask=taskName+"- incomplete\n";
            fs.appendFile("tasks.txt",newTask,(err)=>{
                if(err){
                    console.log("Error in adding the task: ",err);
                    return;
                }
                console.log("Your task has been successfully added");
                userInput();
            })
        })
    });
}

function ViewTask(){
    fs.readFile("tasks.txt",(err,data)=>{
        if(err){
            console.log("Error while displaying the data: ",err);
            return;
        }
        console.log(data.toString());
        userInput();
    })
}

function MarkTask(){
    rl.question("Enter Task Name to mark as done : ", (taskNo) =>{
        const Markdone=parseInt(taskNo);
        fs.readFile("tasks.txt",(err,data)=>{
            if(err){
                console.log("Error in finding the task: ",err);
                return;
            }
            let tasks=data.toString().trim().split("\n");
            for(let i=0;i<tasks.length;i++){
                if((i+1)==Markdone){
                    const getIndex=tasks[i].indexOf("- incomplete");
                    if(getIndex!=-1){
                       tasks[i]=tasks[i].slice(0,getIndex)+" - Completed" ;  
                    }else{
                      console.log("This task is already marked as done")  
                    }              
                }
            }
            const finalData=tasks.join("\n");
            fs.writeFile("tasks.txt",finalData,(err)=>{
              if(err){
                console.log("Error in updating the file: ", err);
                return;
              }
              console.log("The task has been successfully marked as done.");
              userInput();
           }); 
        })
    });
}

function RemoveTask(){
    rl.question("Please enter index of task to be removed: ",(taskNum)=>{
        const removeIndex = parseInt(taskNum);
        fs.readFile("tasks.txt",(err,data)=>{
            if(err){
                console.log("Error in deleting the task: ", err);
                return;
            }
            const tasks=data.toString().trim().split("\n");
            const filteredTask=tasks.filter((item,index)=>{
                return index !== removeIndex-1;
            })
            const updatedTask= filteredTask.join("\n");
            fs.writeFile("tasks.txt",updatedTask,(err)=>{
                if(err){
                    console.log("Error in deleting the task from the file : ", err);
                    return;
                }
                console.log(`The task at index ${removeIndex} has been deleted.`);
                userInput();
            })
        })
    })
}
function userInput(question){
    const questions='\n1. Add a new Task \n2. View a list of task \n3. Mark a task as complete \n4. Remove a  task \n5. Exit';
    console.log(questions);

    rl.question("Choose a task: ",(task)=>{
        const taskNum=parseInt(task);
        switch(taskNum){
            case 1:
                addNewTask();
                break;
            case 2:
                ViewTask();
                break;
            case 3: 
                MarkTask();
                break;
            case 4:
                RemoveTask();
                break;
            case 5:
                process.exit();
                break;
            default:
                console.log("Please choose from the given options");
                userInput();
        }
    })
}
userInput();
