import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  status: string,
  code: string,
  data: {
    exists: boolean
    mainEmailAddress?:string
  },
  message: string
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
  if (req.method === 'POST') {
    const {otp} = req.body;
    if(otp === '123456'){
      res.status(200).json({       
        status: "OK",
        code: "00",
        data: {
          exists: true,
        },
        message: "OTP check" });
    }else{
      res.status(200).json({
        status: "OK",
        code: "00",
        data: {
          exists: false
        },
        message: "OTP check"
      });
  
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
