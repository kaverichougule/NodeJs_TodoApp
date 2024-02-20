function userInput(){
    const readline = require('node:readline').createInterface({
        input: process.stdin,
        output: process.stdout,
    });
}
  
const main=()=>{
    while(true){
        console.log('1. Add a new task');
        console.log('2. View a list of tasks');
        console.log('3. Mark a task as complete');
        console.log('4. Remove a task');
        console.log('5. Exit');
    }

    const choice=userInput("Enter your choice: ");
    switch(choice){
        case 1:
            addNewTask();
            break;
        case 2:
            viewTask();
            break;
    }
    task.map((ele)=>{
        console.log(ele);
    })
    

    const displayItems=()=>{
        task.map((ele)=>{
            console.log(ele);
        })
    }
    const UserInput=()=>{
        readline.question(`Choose task number: `, num => {
            const taskNumber=parseInt(num);
            switch(num){
                //Add Task
                case 1: 
                    readline.question('Enter the description: ',description=>{
                        addTask(description);
                        displayItems();
                        UserInput();
                    })
            }
        })
    }
}
main()
