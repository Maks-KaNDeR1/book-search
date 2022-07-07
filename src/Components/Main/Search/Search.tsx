import React, { ChangeEvent, KeyboardEvent } from 'react'
import { ErrorSnackbar } from '../../ErrorSnackbar/ErrorSnackbar';
import styles from './Search.module.scss';

type PropsType = {
    value: string
    onClickSearchHandler: () => void
    onChangeInputHandler: (value: string) => void
    onKeyPressInputHandler: (value: string) => void
}


export const Search: React.FC<PropsType> = (
    {
        value, onClickSearchHandler, onChangeInputHandler, onKeyPressInputHandler
    }) => {

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        onKeyPressInputHandler(e.code)
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        onChangeInputHandler(e.currentTarget.value)
    }

    return (
        <div className={styles.search}>
            <ErrorSnackbar />
            <h1> Search for books </h1>
            <div>
                <input type="text"
                    autoFocus
                    value={value}
                    onChange={onChangeHandler}
                    onKeyPress={onKeyPressHandler}
                />
                <i onClick={onClickSearchHandler}
                    className="fa fa-search" aria-hidden="true">
                </i>
            </div>
        </div>
    )

}
