/* eslint-disable @typescript-eslint/no-explicit-any */
import * as Yup from 'yup';
import { useGlobalSnackbarStore } from "@/hooks/app/useGlobalSnackbar";
import { Fragment, useEffect, useRef } from "react";
import { useRouter } from 'next/router';
import { HiArrowLeft } from "react-icons/hi";
import { Field, Form, Formik, useFormikContext } from "formik";
import { useLoginCredentialStore } from '@/hooks/login/useLoginCredentialStore';

export default function OtpForm() {
    const router = useRouter();
    const { setGlobalSnackbar } = useRef(useGlobalSnackbarStore.getState()).current;

    const credentials = useLoginCredentialStore((state) => state.credentials);


    const OtpSchema = Yup.object().shape({
        otp: Yup.string()
        .min(6, "Please enter correct otp!")
        .max(6, "Please enter correct otp!")
        .required("Please enter correct otp"),
    });

    const handleSubmit = (values:any) =>{
        fetch('http://localhost:3000/api/otp', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify(values),
        })
        .then((response) => response.json())
        .then((res) => {
            if(res.data.exists === true) {
                localStorage.setItem('grofEmailAddress', credentials.emailAddress);
                router.push({ pathname: '/bills', query: router.query });
            }else if(!res.data.exists){
                setGlobalSnackbar('Wrong Otp!', 'error');
            }else{
                setGlobalSnackbar(res.message, 'error');
            }
        })
        .catch(() => {
            setGlobalSnackbar('Couldn’t found your account. Please login with registered credential','error');
        });
    }

    const AutoSubmit = () => {
        const {isValid, values, dirty, submitForm} = useFormikContext()
        useEffect(() => {
          if(isValid && dirty){
            void submitForm()
          }
        }, [isValid, values, dirty, submitForm])
        return null
    }

    useEffect(() => {
        if (!credentials.emailAddress) {
          router.push({ pathname: '/login', query: router.query });
        }
    });

    return (
        <Fragment>
            <div className="flex items-center">
                <div className="mt-1 mr-1 font-lg">
                    <HiArrowLeft
                    className="cursor"
                    onClick={() => {
                        router.push({
                        pathname: '/login',
                        query: router.query,
                        });
                    }}
                    />
                </div>
                <h1 className="mt-1 ml-1 bold">Enter OTP Code</h1>
            </div>
            <p className="sprout-text-sm mb-4 mt-1 lg:sprout-mt-4">We have sent a 6 digit OTP code to ({credentials.emailAddress}) Please enter the OTP below.</p>
            <Formik
            initialValues={{ otp: null }}
            validationSchema={OtpSchema}
            onSubmit={handleSubmit}
            >
                {({ errors, touched }) => (
                    <Form>
                        <AutoSubmit />
                        <div className="md:p-5 mb-3 md:border-2 md:border-gray md:rounded-2xl flex flex-col gap-5">
                            <div>
                                <label htmlFor="otp" className="block mb-2 text-gray-900 dark:text-white text bold mt-3">Enter your OTP</label>
                                <Field name="otp" type="text" className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter otp" />
                                {errors.otp && touched.otp ? <div className="text-red-500 text-xs pl-2 pt-1">{errors.otp}</div> : null}
                            </div>
                        </div>
                    </Form>
                )}
            </Formik>
        </Fragment>
    );
}