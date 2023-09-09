function LogToday(){
    function logToday(){
        console.log('successfully logged');
    }

    return <>
        <textarea id='log-entry'/>
        <button onClick={logToday}>LogToday</button>
    </>
}

export default LogToday;