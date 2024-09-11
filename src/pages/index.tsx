import { useEffect, useState } from "react";
import BillsPage from "./bills";
import LoginPage from "./login";

export default function Home() {
  // const emailaddress = window.localStorage.getItem('grofEmailAddress');

  const [emailAddress, setEmailAddress] = useState('');

  useEffect(() => {
    const savedValue = window.localStorage.getItem("grofEmailAddress");
    setEmailAddress(savedValue ? savedValue : '');
  }, []);

  if(emailAddress !== ''){
    return <BillsPage />
  }
  return (
    <LoginPage />
  );
}
