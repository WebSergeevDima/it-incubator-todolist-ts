import React, {ChangeEvent} from 'react';

type PropsType = {
    callback: (isChecked: boolean) => void
    isDone: boolean
}

const SuperCheckbox = (props: PropsType) => {

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        props.callback(e.currentTarget.checked);
    }

    return (
        <div>
            <input type="checkbox" checked={props.isDone} onChange={onChangeHandler}/>
        </div>
    );
};

export default SuperCheckbox;