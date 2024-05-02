

// import { z } from "zod"
// import { zodResolver } from "@hookform/resolvers/zod"
// import {
//     Form,FormControl,FormDescription,FormField,FormItem,FormLabel,FormMessage,
//   } from "@/components/ui/form"
// import { useNavigate  } from 'react-router-dom';
// import { Input } from "@/components/ui/input"
// import { Button } from "./components/ui/button"
// // import React from 'react'
// import { useForm } from "react-hook-form"
// import { formSchema } from "./SignUpValid"

// // import { createUserAccount } from "./Appwrite/api";



// const SignUp = () => {
//     const navigate = useNavigate(); // Get the navigate function from useNavigate
//     const print = () => {
//         console.log('Printing something on the screen');
//     };


//     const form = useForm<z.infer<typeof formSchema>>({
//         resolver: zodResolver(formSchema),
//         defaultValues: {
//           email: '',
//           password:''
//         },
//       })     
//       // 2. Define a submit handler.
//     async function onSubmit(values: z.infer<typeof formSchema>) {
//         // const newuser= await createUserAccount(values);
//         // console.log(newuser);
//         <h1>You are getting registered</h1>
//     }
//       return (    
//         <Form {...form} > 
//             <div className="flex flex-1 justify-center items-center flex-col py-10 bg-navy min-h-screen">
//                 <div className="sm:w-420 flex-center flex-col">
//                     <h2 className="h3-bold md:h2-bold pt-5 sm:pt-12">Create a new account</h2>
//                     <p className="text-light-3 small-medium md:base-regular mt-2">register to access your account</p>
        

//                     <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-5 w-full mt-4">
//                         <FormField
//                         control={form.control}
//                         name="email"
//                         render={({ field }) => (
//                             <FormItem>
//                             <FormLabel>Email</FormLabel>
//                             <FormControl>
//                                 <Input type="email" id="email" className="shad-input" {...field} />
//                             </FormControl>
//                             <FormDescription>
//                                 This is your public display name.
//                             </FormDescription>
//                             <FormMessage />
//                             </FormItem>
//                         )}
//                         />
//                         <FormField
//                         control={form.control}
//                         name="password"
//                         render={({ field }) => (
//                             <FormItem>
//                             <FormLabel>Password</FormLabel>
//                             <FormControl>
//                                 <Input type="password" id="password" className="shad-input" {...field} />
//                             </FormControl>
//                             <FormDescription>
//                                 Please write a password.
//                             </FormDescription>
//                             <FormMessage />
//                             </FormItem>
//                         )}
//                         />
//                         <Button type="submit" id="submit" style={{ backgroundColor: 'rgb(120 120 163)'}} className="flex-center gap-2" onClick={print}>
//                         Sign Up</Button>
//                         <p className="text-small-regular text-light-2 text-center mt-2"> Already have an account?
                        
//                         <Button style={{ margin: "25px", backgroundColor: "green" }} onClick={() => navigate("/sign_in")}> 
//                             Log In
//                         </Button>
//                         <script type="module" src="index.js" defer></script>
//                         </p>
//                     </form>

//                 </div>
//           </div>
//         </Form>

//       )
// }

// export default SignUp