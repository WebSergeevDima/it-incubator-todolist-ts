import React, {ChangeEvent, KeyboardEvent, useState} from "react";

type PropsType = {
    callBack: (todolistId: string) => void
};

const AddItemForm: React.FC<PropsType> = (props) => {

    let [title, setTitle] = useState<string>('');
    let [error, setError] = useState<boolean>(false);

    const recommendedTitleLang = 20;
    const isAddTaskPossible:boolean = !title.length || title.length > recommendedTitleLang;

    const setLocalTitleHandler = (e: ChangeEvent<HTMLInputElement>) =>  setTitle(e.currentTarget.value);

    const onKeyDownAddTaskHandler = (e: KeyboardEvent<HTMLInputElement>) => isAddTaskPossible ? undefined : e.key === 'Enter' && addTaskHandler();

    const addTaskHandler = () => {

        const trimmedTitle = title.trim();

        if(trimmedTitle) {
            props.callBack(trimmedTitle);
        } else {
            setError(true);
        }
        setTitle('');

    }
    const longTitle = title.length > recommendedTitleLang ? <h2>Is big(</h2> : '';
    const errorTitleMessage = error && <h2>Is HARD!!(</h2>;

    return (
        <div>
            <input placeholder={'Write task'} value={title} onChange={setLocalTitleHandler}
                   onKeyDown={onKeyDownAddTaskHandler} className={error ? 'input-error' : ''}/>
            <button onClick={addTaskHandler} disabled={isAddTaskPossible}>+</button>
            {longTitle}
            {errorTitleMessage}
        </div>
    );
}

export default AddItemForm;