import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { SignupValidation } from "@/lib/validation";
import { z } from "zod";
import Loader from "@/components/shared/Loader";
import { Link } from "react-router-dom";
import { createUserAccount } from "@/lib/appwrite/api";
import { useToast } from "@/components/ui/use-toast";

const SignupForm = () => {
  const isLoading = true;
  const { toast } = useToast();

  // 1. Define your form.
  const form = useForm<z.infer<typeof SignupValidation>>({
    resolver: zodResolver(SignupValidation),
    defaultValues: {
      name: "",
      username: "",
      email: "",
      password: "",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof SignupValidation>) {
    const newUser = await createUserAccount(values);
    console.log(newUser);
  }

  return (
    <Form {...form}>
      <div className="sm:w-420 flex-center flex-col">
        <img
          className="h-2/6"
          src="https://i.ibb.co/6Yc7HG4/catlogo.png"
          alt="catlogo"
        />
        <h2 className="h3-bold md:h2-bold pt-2 sm:pt-4">
          Create a new account
        </h2>
        <p className="text-light-3 small-medium md:base-regular mt-2">
          Add vibrant hues to your life's canvas
        </p>
      </div>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-3 w-6/12 mt-1"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input type="text" className="shad-input" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>User Name</FormLabel>
              <FormControl>
                <Input type="text" className="shad-input" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type="email" className="shad-input" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type="password" className="shad-input" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="shad-button_primary">
          {isLoading ? "Sign Up" : <Loader />}
        </Button>

        <p className="text-small-regular text-light-2 text-center">
          Already have an account?
          <Link
            to="/sign-in"
            className="text-primary-500 text-small-semibold ml-1"
          >
            Log in
          </Link>
        </p>
      </form>
    </Form>
  );
};

export default SignupForm;
