import React, { ChangeEvent } from 'react'
import styles from './Select.module.scss';

type PropsType = {
    sort: string[]
    categor: string[]
    sorting: string
    categories: string
    handleSelectSorting: (srortingValue: string) => void
    handleSelectCategories: (categoriesValue: string) => void
}
export const Select: React.FC<PropsType> = (
    {
        sort, categor, sorting, categories,
        handleSelectSorting, handleSelectCategories
    }) => {


    const sortOptions: JSX.Element[] = sort.map((o, i) => ( // map options with key
        <option className={styles.option} key={o + '-' + i}>{o}</option>
    ))

    const categoriesOptions: JSX.Element[] = categor.map((o, i) => ( // map options with key
        <option className={styles.option} key={o + '-' + i}>{o}</option>
    ))

    const handleOnChangeSorting = (e: ChangeEvent<HTMLSelectElement>) => {
        // setSorting(e.currentTarget.value)
        handleSelectSorting(e.currentTarget.value)

    }

    const handleOnChangeCategories = (e: ChangeEvent<HTMLSelectElement>) => {
        // setCategories(e.currentTarget.value)
        handleSelectCategories(e.currentTarget.value)
    }


    return (
        <div className={styles.select}>
            <div> Categories
                <select value={categories} onChange={handleOnChangeCategories}>
                    {categoriesOptions}
                </select>
            </div>
            <div> Sorting by
                <select value={sorting} onChange={handleOnChangeSorting}>
                    {sortOptions}
                </select>
            </div>
        </div>
    )
}
