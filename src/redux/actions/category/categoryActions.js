import { db } from './../../../config/firebase'

import {
    GET_CATEGORIES,
    CATEGORY_REQUEST_LOADING,
    CATEGORY_REQUEST_ERROR,
    CATEGORY_CANCEL_LOADING
} from './categoryTypes'

export const getCategories = () => {
    return (dispatch) => {
        dispatch({
            type: CATEGORY_REQUEST_LOADING
        })
        db.collection("category")
            .onSnapshot(snapshot => {
                const categories = []
                snapshot.forEach(doc => {
                    const obj = {
                        id: doc.id,
                        name: doc.data()
                    }
                    categories.push(obj)
                })
                dispatch({
                    type: GET_CATEGORIES,
                    payload: categories
                })
            }, function(error) {
                dispatch({
                    type: CATEGORY_REQUEST_ERROR,
                    payload: error
                })
            })
    }
}