import { BaseSyntheticEvent } from 'react';

export default function LogToday(){
    function handleSubmit(e : BaseSyntheticEvent){
        e.preventDefault();
        
        const formJson = Object.fromEntries(new FormData(e.target).entries());
        logToday(formJson['logEntry']);
    }

    function logToday(text){
        if (text)
            console.log('successfully logged', text, new Date());
        // empty text shouldn't be logged
        else {
            const dialogConfig = {
                title: "Fuck_U_Man",
                message:"What is wrong with you?"
            };
            window.api.openDialog('showMessageBox', dialogConfig);
        }
    }

    return (
        <form method="post" onSubmit={handleSubmit}>
            <textarea 
                name='logEntry' 
                placeholder={"Today I've done..."} 
                rows={5} cols={50}
            />
            <button type="submit">LogToday</button>
        </form>
    );
}