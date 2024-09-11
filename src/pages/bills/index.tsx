/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @next/next/no-img-element */
import React, { Fragment, useEffect, useState } from 'react'
import { useRouter } from 'next/router';
import useSWR from 'swr';
import { get } from 'lodash';
import BillStatus from '@/components/BillStatus';

export default function BillsPage() {
    const router = useRouter();
    const [datalist, setDatalist] = useState([]);

    const handleLogout = () =>{
        localStorage.setItem('grofEmailAddress', '');
        router.push({ pathname: '/login', query: router.query });
    }

    const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api';
    const fetcher = async () => {
        try {
          const fetchGetBills = fetch(`${API_URL}/bills`).then(response => response.json());
          const results = await Promise.all([
            fetchGetBills,
          ]).then(
            ([
              getBillsResponse,
            ]) => {
              return {
                isError: false,
                datalist: getBillsResponse.data
              };
            }
          );
    
          return results;
        } catch (e) {
          return {
            isError: true,
            datalist: [],
          };
        }
      };

    const { data } = useSWR<any>(
        { name: 'get-bills' },
        fetcher
      );

    const handleClick = (id:string)=>{
        router.push({ pathname: '/bills/'+id, query: router.query });
    }

    useEffect(() => {
        const savedValue = window.localStorage.getItem("grofEmailAddress");
        if (savedValue === '') {
            router.push({ pathname: '/login', query: router.query });
        }else{
            if(data){
                setDatalist(data.datalist);
            }
        }
    },[data, router, setDatalist]);
  return(
      <Fragment>
        <div className="white text-sm flex flex-col lg:flex-row min-h-screen">
            <div className="bg-secondary text-white text-sm lg:pt-9 lg:pl-5 lg:text-base w-[280px] lg:max-w-[280px]">
                <div className="mb-3 w-[70px] h-[28px] lg:w-[149px] lg:h-[60px]">
                    <img src="../grof-logo.svg" width="auto" height="auto" alt="vector" className="pt-3 pl-3" />
                </div>
                <p className="bold pl-3 pt-2 text-base lg:text-2xl lg:p-5">Bill Listing</p>
            </div>
            <div className="text-sm w-full grid-cols-6 md:grid lg:py-10 lg:text-base">
                <div className="p-10 col-span-6 h-full">
                    <div className="white text-sm flex flex-col lg:flex-row">
                        <div className="p-4 text-sm w-full grid-cols-6 md:grid lg:py-6 lg:text-base">
                            <div className="p-3 col-span-5 h-full text-left">
                                <h1 className="text-lg font-bold">List Bills</h1>
                            </div>
                            <div>
                                <button className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" onClick={handleLogout}>Logout</button>
                            </div>
                        </div>
                    </div>
                    <hr />
                    <div className="relative overflow-x-auto">
                        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                <tr>
                                    <th scope="col" className="px-6 py-3">Status</th>
                                    <th scope="col" className="px-6 py-3">Contact</th>
                                    <th scope="col" className="px-6 py-3">Bill Date</th>
                                    <th scope="col" className="px-6 py-3">User</th>
                                    <th scope="col" className="px-6 py-3">Bill Amount</th>
                                </tr>
                            </thead>
                            <tbody>
                                {datalist?.map((obj:any,key)=>{
                                    return (
                                        <tr key={key} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700" onClick={()=>handleClick(obj._id)}>
                                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                <BillStatus status={get(obj,'status','')} />
                                            </th>
                                            <td className="px-6 py-4">
                                                {obj.contactName}
                                            </td>
                                            <td className="px-6 py-4">
                                                {get(obj,'billDate',null) ? obj.billDate : '-'}
                                            </td>
                                            <td className="px-6 py-4">
                                                {obj.userName}
                                            </td>
                                            <td className="px-6 py-4">
                                                {obj.billAmount ? `${obj.billCurrency}${obj.billAmount}` : '-'}
                                            </td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>

      </Fragment>
    )
}