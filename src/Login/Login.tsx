import React from 'react'
import Grid from '@mui/material/Grid';
import Checkbox from '@mui/material/Checkbox';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import FormLabel from '@mui/material/FormLabel';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import {FormikValues, useFormik} from "formik";

export const Login = () => {

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            rememberMe: false,
        },
        validate: (value: FormikValues) => {
            let error: FormikErrorType = {}
            if (!value.email) {
                error.email = 'Required'
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value.email)) {
                error.email = 'Invalid email address'
            }

            if (!value.password) {
                error.password = 'Required'
            } else if (value.password.length < 3) {
                error.password = 'Invalid  password'
            }
            return error
        },
        onSubmit: values => {
            alert(JSON.stringify(values))
            formik.resetForm();
        },
    })

    return <Grid container justifyContent={'center'}>
        <Grid item justifyContent={'center'}>
            <FormControl>
                <FormLabel>
                    <p>To log in get registered
                        <a href={'https://social-network.samuraijs.com/'}
                           target={'_blank'}> here
                        </a>
                    </p>
                    <p>or use common test account credentials:</p>
                    <p>Email: free@samuraijs.com</p>
                    <p>Password: free</p>
                </FormLabel>
                <form onSubmit={formik.handleSubmit}>
                <FormGroup>
                        <TextField label="Email" margin="normal"
                                   {...formik.getFieldProps('email')}/>
                    {formik.errors.email && formik.touched.email && <div style={{color: 'red'}}>{formik.errors.email}</div>}
                        <TextField type="password" label="Password" margin="normal"
                                   {...formik.getFieldProps('password')}/>
                    {formik.errors.password && formik.touched.password && <div style={{color: 'red'}}>{formik.errors.password}</div>}
                    <FormControlLabel label={'Remember me'}
                                          control={<Checkbox  name="rememberMe"
                                                              onChange={formik.handleChange}
                                                              value={formik.values.rememberMe}/>}/>
                        <Button type={'submit'} variant={'contained'} color={'primary'}>
                            Login
                        </Button>
                </FormGroup>
                </form>
            </FormControl>
        </Grid>
    </Grid>
}

type FormikErrorType = {
    email?: string
    password?: string
    rememberMe?: boolean
}