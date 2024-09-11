/* eslint-disable @typescript-eslint/no-explicit-any */
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  status:string;
  code:string;
  message:string;
  data:any;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
  const bills = [
    {
      _id: '66e004a9d685b3019740e659',
      filename: 'doc1.pdf',
      status: 'PROCESSING',
      items: [],
      billCurrency: null,
      billAmount: null,
      contactName: null,
      userName: 'John Doe',
      billDate: null,
      createdAt: '2024-09-10T08:34:49.588Z',
      updatedAt: '2024-09-10T10:56:37.962Z',
    },
    {
      _id: '66e004a9d685b3019740e657',
      filename: 'doc1.pdf',
      status: 'PROCESSING',
      items: [],
      billCurrency: null,
      billAmount: null,
      contactName: null,
      userName: 'John Doe',
      billDate: null,
      createdAt: '2024-09-10T08:34:49.588Z',
      updatedAt: '2024-09-10T10:56:37.962Z',
    },
    {
      _id: '66dab03504f6eb3578137a08',
      filename: 'doc2.pdf',
      status: 'ACTION_REQUIRED',
      items: [
        {
          description: 'Translating 1500 words From English to French',
          qty: 1,
          unitPrice: 300,
          total: 300,
        },
        {
          description: 'Translating 50 pages from French to English',
          qty: 1,
          unitPrice: 1000,
          total: 1000,
        },
      ],
      billCurrency: null,
      billAmount: null,
      contactName: null,
      userName: 'John Doe',
      billDate: null,
      createdAt: '2024-09-10T08:34:49.588Z',
      updatedAt: '2024-09-10T10:56:37.962Z',
    },
    {
      _id: '66dab03504f6eb3578199a09',
      filename: 'doc3.pdf',
      status: 'ACTION_REQUIRED',
      items: [
        {
          description: 'Translating 1500 words From English to French',
          qty: 1,
          unitPrice: 300,
          total: 300,
        },
        {
          description: 'Translating 50 pages from French to English',
          qty: 1,
          unitPrice: 1000,
          total: 1000,
        },
      ],
      billCurrency: 'SGD',
      billAmount: 560,
      contactName: 'Luffy',
      userName: 'John Doe',
      billDate: '2024-10-10',
      createdAt: '2024-09-10T08:34:49.588Z',
      updatedAt: '2024-09-10T10:56:37.962Z',
    },
    {
      _id: '668f499b60b530f92ad1209d',
      documentId: '668f499b60b530f92ad1209a',
      filename: 'doc3.jpg',
      status: 'APPROVED',
      dueDate: null,
      category: 'Meals and Entertainment',
      billAmount: 121.45,
      billNumber: null,
      billCurrency: 'SGD',
      items: [],
      contactName: 'Anni',
      userName: 'John Doe',
      billDate: '2024-09-11',
      createdAt: '2024-07-11T02:55:23.785Z',
      updatedAt: '2024-09-06T13:45:14.434Z',
    },
  ];

  res.status(200).json(
    {       
      status: "OK",
      code: "00",
      data: bills,
      message: "get bills"
    }
  );
}