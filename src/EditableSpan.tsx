import React, {ChangeEvent, useState} from 'react';

type PropsType = {
    title: string
    callBack: (title: string) => void
}

const EditableSpan: React.FC<PropsType> = (props) => {

    const [edit, setEdit] = useState(false);
    let [newTitle, setNewTitle] = useState(props.title);

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTitle(e.currentTarget.value);
    }

    const addTask = () => {
        props.callBack(newTitle);
    }

    const editHandler = () => {
        setEdit(!edit);
        addTask();
    }

    return (
            edit ?
                <input value={newTitle} onBlur={editHandler} onChange={onChangeHandler} autoFocus /> :
                <span onDoubleClick={editHandler}>{newTitle}</span>
    );
};

export default EditableSpan;