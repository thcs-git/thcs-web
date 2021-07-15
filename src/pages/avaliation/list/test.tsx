import React, { useState, useEffect } from 'react'
import { Grid, } from '@material-ui/core';
import { useForm, Form } from '../list/useForm';


const initialFValues = {
    id: 0,
    name: '',
}

export default function EmployeeForm(props: any) {
    const { addOrEdit, recordForEdit } = props

    const validate = (fieldValues = values) => {
        let temp = { ...errors }
        if ('name' in fieldValues)
            temp.name = fieldValues.name ? "" : "This field is required."
        setErrors({
            ...temp
        })

        if (fieldValues == values)
            return Object.values(temp).every(x => x == "")
    }

    const {
        values,
        setValues,
        errors,
        setErrors,
        handleInputChange,
        resetForm
    } = useForm(initialFValues, true, validate);

    const handleSubmit = (e: any) => {
        e.preventDefault()
        if (validate()) {
            addOrEdit(values, resetForm);
        }
    }

    useEffect(() => {
        if (recordForEdit != null)
            setValues({
                ...recordForEdit
            })
    }, [recordForEdit])

    return (

        <Form onSubmit={handleSubmit}>
            <Grid container>
                <Grid item xs={6}>



                    {values.name}

                
                </Grid>

            </Grid>
        </Form>
    )
}