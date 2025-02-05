
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"

import Login from "@/components/auth/login/login-form"
import SignUp from "@/components/auth/signup/signup-form"

export default function Auth(){


    return(

        <div className="flex flex-col h-screen w-full justify-center items-center">

            <Tabs defaultValue="login" className="w-[400px]">

              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="login">Login</TabsTrigger>
                <TabsTrigger value="signup">SignUp</TabsTrigger>
              </TabsList>

              <TabsContent value="login">

                <Login></Login>

              </TabsContent>

              <TabsContent value="signup">

                <SignUp></SignUp>
                
              </TabsContent>
            </Tabs>

        </div>
    )
}
