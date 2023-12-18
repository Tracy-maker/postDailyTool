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
import "react-toastify/dist/ReactToastify.css";
import { z } from "zod";
import Loader from "@/components/shared/Loader";
import { useNavigate, useParams } from "react-router-dom";
import { ValidEmail } from "@/lib/validation";
import { useEffect } from "react";
import {  verifyEmail } from "@/lib/appwrite/api";
import { toast } from "react-toastify";

const VerifyEmail = () => {
  const isSubmitting= true;
  const { token } = useParams<{ token: string }>();
  const navigate = useNavigate();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const secret = urlParams.get("secret");
    let userId = urlParams.get("userId");

    // Validate userId format
    if (userId && userId.length <= 36 && /^[a-zA-Z0-9_]*$/.test(userId) && !userId.startsWith('_')) {
      verifyEmail(userId, secret);
    } else {
      console.error("Invalid userId format");
      // Handle invalid userId format appropriately
    }
  }, []);

  // 1. Define your form.
  const form = useForm<z.infer<typeof ValidEmail>>({
    resolver: zodResolver(ValidEmail),
    defaultValues: {
      email: "",
      token: "",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof ValidEmail>) {
    try {
     
      await verifyEmail(values.email, values.token);
      toast.success("Email verified successfully!"); // Using toast.success
      navigate("/");
    } catch (error) {
      toast.error("Verification failed. Please try again."); // Using toast.error
    }
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
          Password Memory Reboot
        </h2>
        <p className="text-light-3 small-medium md:base-regular mt-2">
          "Drop email, let's play password hide and seek! 🕵️‍♂️🔍"
        </p>
      </div>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-9 w-6/12"
      >
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

        <Button type="submit" className="shad-button_primary">
          {isSubmitting ? (
            <div className="flex-center gap-2">
              <Loader />
            </div>
          ) : (
            "Verify your email address"
          )}
        </Button>
      </form>
    </Form>
  );
};

export default VerifyEmail;
