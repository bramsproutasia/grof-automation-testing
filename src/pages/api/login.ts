import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  status: string,
  code: string,
  data: {
    exists: boolean
    credential?:{
      emailAddress:string
    }
  },
  message: string
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
  if (req.method === 'POST') {
    const {emailAddress} = req.body;
    if(emailAddress === 'testing@grof.co'){
      res.status(200).json({       
        status: "OK",
        code: "00",
        data: {
          exists: true,
          credential:{
            emailAddress: emailAddress
          }
        },
        message: "Exists check" });
    }else{
      res.status(200).json({
        status: "OK",
        code: "00",
        data: {
          exists: false
        },
        message: "Exists check"
      });
  
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
