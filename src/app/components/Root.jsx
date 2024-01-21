import React from 'react'
import { useUser, useSession } from '@clerk/nextjs'
import {RouterProvider, Router} from '@tanstack/react-query'
const Root = () => {
    const userInfo = useUser();
    const sessionInfo = useSession();
    const authentication = {
        user: userInfo.user,
        isSignedIn: userInfo.isSignedIn,
        session: sessionInfo.session,
    };

    // const router = new Router({
    //     routeTree,
    //     defaultPreload: "intent",
    //     context: {
    //         queryClient,
    //         authentication: undefined,
    //     },
    // })
  return (
      <RouterProvider context={{ authentication }} />
  )
}

export default Root