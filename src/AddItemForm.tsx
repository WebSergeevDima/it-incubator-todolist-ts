import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

type PropsType = {
    callBack: (todolistId: string) => void
};

const AddItemForm: React.FC<PropsType> = (props) => {

    let [title, setTitle] = useState<string>('');
    let [error, setError] = useState<boolean>(false);

    const recommendedTitleLang = 20;
    const isAddTaskPossible: boolean = !title.length || title.length > recommendedTitleLang;

    const setLocalTitleHandler = (e: ChangeEvent<HTMLInputElement>) => setTitle(e.currentTarget.value);

    const onKeyDownAddTaskHandler = (e: KeyboardEvent<HTMLInputElement>) => isAddTaskPossible ? undefined : e.key === 'Enter' && addTaskHandler();

    const addTaskHandler = () => {

        const trimmedTitle = title.trim();

        if (trimmedTitle) {
            props.callBack(trimmedTitle);
        } else {
            setError(true);
        }
        setTitle('');

    }
    const longTitle = title.length > recommendedTitleLang ? <h2>Is big(</h2> : '';
    const errorTitleMessage = error && <h2>Is HARD!!(</h2>;

    const buttonStyle = {maxWidth: '30px', maxHeight: '30px', minWidth: '30px', minHeight: '30px'};

    return (
        <div>
            {/*{ className={error ? 'input-error' : ''}}*/}
            <TextField
                size={'small'}
                id="outlined-basic"
                label={error ? 'Title is req-d!' : 'Please type here...'}
                variant="outlined" value={title}
                onChange={setLocalTitleHandler}
                       onKeyDown={onKeyDownAddTaskHandler} error={!!error}  />
            <Button variant="contained" size="small" onClick={addTaskHandler} disabled={isAddTaskPossible}
                    style={buttonStyle}>+</Button>
            {longTitle}
        </div>
    );
}

export default AddItemForm;