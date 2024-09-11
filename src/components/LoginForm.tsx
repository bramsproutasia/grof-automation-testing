/* eslint-disable @typescript-eslint/no-explicit-any */
import * as Yup from 'yup';
import { Fragment, useRef } from "react";
import { useRouter } from 'next/router';
import { Field, Form, Formik } from "formik";
import { useLoginCredentialStore } from "@/hooks/login/useLoginCredentialStore";
import { useGlobalSnackbarStore } from "@/hooks/app/useGlobalSnackbar";
export default function LoginForm() {
    const router = useRouter();
    const { setGlobalSnackbar } = useRef(useGlobalSnackbarStore.getState()).current;

    const setCredentials = useLoginCredentialStore(
        (state) => state.updateCredentials
    );

    const LoginSchema = Yup.object().shape({
        emailAddress: Yup.string().email('Please enter a valid email address').required('Please enter a valid email address'),
    });

    const handleSubmit = (values:any) =>{
        fetch('http://localhost:3000/api/login', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify(values),
        })
        .then((response) => response.json())
        .then((res) => {
            if(res.data.exists) {
                setCredentials({
                    credentials: {
                        ...res.data.credential,
                        emailAddress: res.data.credential?.emailAddress,
                        channel: 'email',
                    },
                });
                router.push({ pathname: 'login/enter-pin', query: router.query });
            }else if(!res.data.exists){
                setGlobalSnackbar('Couldn’t found your account. Please login with registered credential', 'error');
            }else{
                setGlobalSnackbar(res.message, 'error');
            }
        })
        .catch(() => {
            setGlobalSnackbar('Couldn’t found your account. Please login with registered credential','error');
        });
    }

    return (
        <Fragment>
            <h1 className="mb-2 bold">Enter Your Phone Number or Email</h1>
            <p className="mb-4">Please enter your registered phone number or email below.</p>
            <Formik
            initialValues={{ emailAddress: null }}
            validationSchema={LoginSchema}
            onSubmit={handleSubmit}
            >
                {({ values, errors, touched }) => (
                    <Form>
                        <div className="md:p-5 mb-3 md:border-2 md:border-gray md:rounded-2xl flex flex-col gap-5">
                            <div>
                                <label htmlFor="emailAddress" className="block mb-2 text-gray-900 dark:text-white text bold mt-3">Registered phone number or email</label>
                                <Field name="emailAddress" type="email" className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter phone number or email" autoFocus />
                                {errors.emailAddress && touched.emailAddress ? <div className="text-red-500 text-xs pl-2 pt-1">{errors.emailAddress}</div> : null}
                            </div>
                                
                            <button type="submit" className="w-full text-white bg-primary hover:bg-primary focus:ring-4 focus:outline-none focus:ring-primary font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary dark:hover:bg-primary dark:focus:ring-primary disabled:bg-[#f1f1f1] disabled:text-[#c4c4c4] disabled:border-[#c4c4c4] disabled:border disabled:cursor-not-allowed" disabled={values.emailAddress === null || !!errors.emailAddress}>Continue</button>
                        </div>
                    </Form>
                )}
            </Formik>
        </Fragment>
    );
}