import React, { ChangeEvent } from 'react'
import styles from './Select.module.scss';


const sort = ['relevance', 'newest']
const categor = ['all', 'Art', 'Biography', 'Computers', 'History', 'Medical', 'Poetry']


type PropsType = {
    sorting: string
    categories: string
    handleSelectSorting: (srortingValue: string) => void
    handleSelectCategories: (categoriesValue: string) => void
}

export const Select: React.FC<PropsType> = ({
    sorting, categories, handleSelectSorting, handleSelectCategories
}) => {


    const sortOptions: JSX.Element[] = sort.map((s, i) => (
        <option className={styles.option} key={s + '-' + i}>{s}</option>
    ))

    const categoriesOptions: JSX.Element[] = categor.map((c, i) => (
        <option className={styles.option} key={c + '-' + i}>{c}</option>
    ))

    const handleOnChangeSorting = (e: ChangeEvent<HTMLSelectElement>) => {
        handleSelectSorting(e.currentTarget.value)
    }

    const handleOnChangeCategories = (e: ChangeEvent<HTMLSelectElement>) => {
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
