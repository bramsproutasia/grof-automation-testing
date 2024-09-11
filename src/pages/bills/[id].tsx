/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-explicit-any */
import * as Yup from 'yup';
import useSWR from "swr";
import { get } from "lodash";
import { useRouter } from "next/router";
import { Fragment, useEffect, useRef, useState } from "react";
import { HiArrowLeft } from "react-icons/hi";
import { Field, Form, Formik, useFormikContext } from "formik";
import { useGlobalSnackbarStore } from '@/hooks/app/useGlobalSnackbar';
import BillStatus from '@/components/BillStatus';

const BillDetails: React.FC = () => {
    const router = useRouter();
    const id = router.query.id;
    const { setGlobalSnackbar } = useRef(useGlobalSnackbarStore.getState()).current;
    const [datarow, setDatarow] = useState({});
    const [isApprove, setIsApprove] = useState(true);

    const fetcher = async (params:any) => {
        try {
          const fetchGetBills = fetch('http://localhost:3000/api/bills').then(response => response.json());
          const results = await Promise.all([
            fetchGetBills,
          ]).then(
            ([
              getBillsResponse,
            ]) => {
            const getBillId = getBillsResponse.data.find((obj:any)=>obj._id === params.id);
              return {
                isError: false,
                datarow: get(getBillId,'_id',null) ? getBillId : null,
                isApprove: get(getBillId,'status',null) ? getBillId.status === 'ACTION_REQUIRED' : false,
              };
            }
          );
    
          return results;
        } catch (e) {
          return {
            isError: true,
            isApprove: true,
            datarow: null,
          };
        }
      };

    const { data } = useSWR<any>(
        { name: 'get-bills', id },
        fetcher
      );


    const handleSubmit = () =>{
        setGlobalSnackbar('Bill has been approved', 'success');
        router.push('/bills');
    }

    const LoginSchema = Yup.object().shape({
        contactName: Yup.string().required('Contact Name is required'),
        billDate: Yup.date().required('Bill Date is required'),
        billCurrency: Yup.string().required('Bill Currency is required'),
        billAmount: Yup.number().required('Bill Amount is required'),
    });

    const ButtonApprove = () => {
        const {values,isValid, dirty} = useFormikContext()
        let disabled = true;
        if(((isValid && dirty) || (get(values,'contactName',null) && get(values,'billDate',null) && get(values,'billCurrency',null) && get(values,'billAmount',null))) && isApprove){
            disabled = false;
        }
        return <button type="submit" className="w-full text-white bg-primary hover:bg-primary focus:ring-4 focus:outline-none focus:ring-primary font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary dark:hover:bg-primary dark:focus:ring-primary disabled:bg-[#f1f1f1] disabled:text-[#c4c4c4] disabled:border-[#c4c4c4] disabled:border disabled:cursor-not-allowed" disabled={disabled} >APPROVE</button>
    }

    useEffect(() => {
        const savedValue = window.localStorage.getItem("grofEmailAddress");
        if (savedValue === '') {
            router.push({ pathname: '/login', query: router.query });
        }else{
            if(data){
                setDatarow(data.datarow);
                setIsApprove(data.isApprove);
            }
        }
    },[data, router, setDatarow, setIsApprove]);
    return(
        <Fragment>

            <div className="white text-sm flex flex-col lg:flex-row min-h-screen">
                <div className="bg-secondary text-white text-sm lg:pt-9 lg:pl-5 lg:text-base w-[280px] lg:max-w-[280px]">
                    <div className="mb-3 w-[70px] h-[28px] lg:w-[149px] lg:h-[60px]">
                        <img src="../grof-logo.svg" width="auto" height="auto" alt="vector" className="pt-3 pl-3" />
                    </div>
                    <p className="bold pl-3 pt-2 text-base lg:text-2xl lg:p-5">Bill Details</p>
                </div>
                <div className="text-sm w-full grid-cols-6 md:grid lg:py-10 lg:text-base">
                    <div className="p-10 col-span-6 h-full">
                        <Formik
                            initialValues={{ 
                                contactName: get(datarow,'contactName',null), 
                                billAmount: get(datarow,'billAmount',null),
                                billCurrency: get(datarow,'billCurrency',null),
                                billDate: get(datarow,'billDate',null),
                            }}
                            validationSchema={LoginSchema}
                            onSubmit={handleSubmit}
                            enableReinitialize={true}
                            >
                            {({ errors, touched }) => (
                            <Form>
                                <div className="white text-sm flex flex-col lg:flex-row">
                                    <div className="p-4 text-sm w-full grid-cols-6 md:grid lg:py-6 lg:text-base">
                                        <div className="p-3 col-span-5 h-full text-left">
                                            <div className="flex items-center">
                                                <div className="mr-1 font-lg">
                                                    <HiArrowLeft
                                                    className="cursor"
                                                    onClick={() => {
                                                        router.push({
                                                        pathname: '/bills',
                                                        });
                                                    }}
                                                    />
                                                </div>
                                                <h1 className="text-lg font-bold">Details Bills</h1>
                                            </div>
                                        </div>
                                        <div>
                                            <ButtonApprove />
                                        </div>
                                    </div>
                                </div>
                                
                                <div className="relative overflow-x-auto">
                                    <div className="md:p-5 mb-3 md:border-2 md:border-gray md:rounded-2xl flex flex-col gap-2">
                                        <div className="flex justify-end">
                                            <BillStatus status={get(datarow,'status','')} />
                                        </div>
                                        <div>
                                            <label htmlFor="contactName" className="block mb-2 text-gray-900 dark:text-white text bold">Contact Name</label>
                                            <Field name="contactName" type="text" className="disabled:bg-gray-300 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary focus:border-primary-600 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter contact name" disabled={!isApprove} />
                                            {errors.contactName && touched.contactName ? <div className="text-red-500 text-xs pl-2 pt-1">{errors.contactName}</div> : null}
                                        </div>
                                        <div>
                                            <label htmlFor="billDate" className="block mb-2 text-gray-900 dark:text-white text bold mt-3">Bill Date</label>
                                            <Field name="billDate" type="date" className="disabled:bg-gray-300 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter contact name" disabled={!isApprove} />
                                            {errors.billDate && touched.billDate ? <div className="text-red-500 text-xs pl-2 pt-1">{errors.billDate}</div> : null}
                                        </div>
                                        <div>
                                            <label htmlFor="billAmount" className="block mb-2 text-gray-900 dark:text-white text bold mt-3">Bill Amount</label>
                                            <div className="flex gap-2">
                                                <div className="w-56">
                                                    <Field name="billCurrency" className="disabled:bg-gray-300 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary focus:border-primary-600 w-full block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" as="select" disabled={!isApprove}>
                                                        <option value="">Select Currency</option>
                                                        <option value="SGD">SGD</option>
                                                        <option value="USD">USD</option>
                                                    </Field>
                                                </div>
                                                <div className="w-full">   
                                                    <Field name="billAmount" type="text" className="disabled:bg-gray-300 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter bill amount" disabled={!isApprove} />
                                                    {errors.billAmount && touched.billAmount ? <div className="text-red-500 text-xs pl-2 pt-1">{errors.billAmount}</div> : null}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Form>
                            )}
                        </Formik>
                    </div>
                </div>
            </div>

        </Fragment>
    )
};
export default BillDetails;
