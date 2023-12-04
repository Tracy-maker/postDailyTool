import { Button } from "@/components/ui/button";

import * as z from "zod";

const SignupForm = () => {
  const formSchema = z.object({
    username: z.string().min(2).max(50),
  });

    // 1. Define your form.
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
          username: "",
        },
      })
     
      // 2. Define a submit handler.
      function onSubmit(values: z.infer<typeof formSchema>) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        console.log(values)
      }
    }
  return (
    <div>
      <Button>Click</Button>
    </div>
  );
};

export default SignupForm;
