import {Button} from "@nextui-org/react";
import React from 'react';
import { signIn } from "next-auth/react";
import { useRouter } from 'next/router';

function Login() {
  const router = useRouter();
  const callbackurl = (router.query?.callbackUrl) ?? "/";
 
  return (
    <div>
      <h1>WELCOME TO OAuth with pages directory</h1>
      <Button
        variant='contained'
        color='primary'
        onClick={() => signIn('azure-ad', { callbackUrl: callbackurl as string })
        .then(response => {
          console.log("authentication successful: ", response);
        })
        .catch(error => {
          console.error("Authentication error: ", error)
        })
        
        
        }>Login</Button>
  </div>
  )
}
export default Login
