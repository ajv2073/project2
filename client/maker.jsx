const helper = require('./helper.js');
const React = require('react');
const ReactDOM = require('react-dom');

const handleEntry = (e) => {
    e.preventDefault();
    helper.hideError();

    // const name = e.target.querySelector('#entryName').value;
    // const age = e.target.querySelector('#entryAge').value;
    // const level = e.target.querySelector('#entryLevel').value;

    // if (!name || !age || !level) {
    //     helper.handleError('All fields are required!');
    //     return false;
    // }

    const feeling = e.target.querySelector('#entryFeeling').value;
    const summary = e.target.querySelector('#entrySummary').value;
    const manage = e.target.querySelector('#entryManage').value;
    const future = e.target.querySelector('#entryFuture').value;

    var now = new Date();
    const date = `${helper.returnDay(now.getDay())}, ${helper.returnMonth(now.getMonth())} ${now.getDate()}, ${now.getFullYear()}`;


    if (!feeling || !summary || !manage || !future) {
        helper.handleError('All fields are required!');
        return false;
    }
    // helper.sendEntry(e.target.action, {name, age, level}, loadEntrysFromServer);
    helper.sendPost(e.target.action, {feeling, summary, manage, future, date}, loadEntrysFromServer);
    return false;
}

const EntryForm = (props) => {
    return (
        <form id="entryForm"
            onSubmit={handleEntry}
            name="entryForm"
            action="/maker"
            method="POST"
            className="entryForm"
        >
            <div class="left">
                <div class="dropdownQuestion">
                    <label htmlFor="feeling">How are you on a scale of 1 to 10: </label> <br></br>
                    <select name="feeling" id="entryFeeling">
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                        <option value="6">6</option>
                        <option value="7">7</option>
                        <option value="8">8</option>
                        <option value="9">9</option>
                        <option value="10">10</option>
                    </select>
                </div>

                <div class="paragraphQuestion">
                    <label htmlFor="summary">What did you do today? </label> <br></br>
                    <textarea id="entrySummary" type="text" name="summary" placeholder="Write down your activities" />
                </div>

            </div>
            
            <div class="right">
                <div class="paragraphQuestion">
                    <label htmlFor="manage">How did you manage your health?</label> <br></br>
                    <textarea id="entryManage" type="text" name="manage" placeholder="Write down how you managed your health" />
                </div>


                <div class="paragraphQuestion">
                    <label htmlFor="future">What are your plans for tomorrow?</label> <br></br>
                    <textarea id="entryFuture" type="text" name="future" placeholder="Write down your future plans" /> 
                </div>

            </div>



            <input className="makeEntrySubmit" type="submit" value="Submit Entry!" />
        </form>
    );
}

const EntryList = (props) => {
    if (props.entrys.length === 0) {
        return (
            <div className="entryList">
                <h3 className="emptyEntry">No Entrys Yet!</h3>
            </div>
        );
    }

    const entryNodes = props.entrys.map(entry => {
        return (
            <div key={entry._id} className="entry">
                <h1 className="entryDate"> Entry on {entry.date} </h1>
                <h3>This is what you said about today: </h3>
                <p className="entrySummary"> {entry.summary} </p>
                <h3 className="entryFeeling"> You rated this day a {entry.feeling} out of 10 </h3>
                <h3>When asked how you managed your health, you said: </h3>
                <p className="entryManage"> {entry.manage} </p>
                <h3>When discussing the future, you said: </h3>
                <p className="entryFuture"> {entry.future} </p>
                
            </div>
        );
    });

    return (
        <div className="entryList">
            {entryNodes}
        </div>
    );
}

const loadEntrysFromServer = async () => {
    const response = await fetch('/getEntrys');
    const data = await response.json();
    ReactDOM.render(
        <EntryList entrys={data.entrys} />,
        document.getElementById('entrys')
    );
}

const init = () => {
    ReactDOM.render(
        <EntryForm />,
        document.getElementById('makeEntry')
    );

    ReactDOM.render(
        <EntryList entrys={[]} />,
        document.getElementById('entrys')
    );

    loadEntrysFromServer();
}

window.onload = init;