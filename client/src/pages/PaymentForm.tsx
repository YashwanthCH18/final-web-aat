import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useToast } from "@/hooks/use-toast";
import { db, paymentsCollection } from "@/lib/firebase";
import { collection, addDoc } from "firebase/firestore";
import { useLocation, useLocation as useLocationHook } from "wouter";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Luhn algorithm for credit card validation
function isValidCreditCard(number: string) {
  // Remove all non-digit characters
  const cleanNumber = number.replace(/\D/g, '');

  if (cleanNumber.length < 13 || cleanNumber.length > 19) {
    return false;
  }

  let sum = 0;
  let isEven = false;

  // Loop through values starting from the rightmost digit
  for (let i = cleanNumber.length - 1; i >= 0; i--) {
    let digit = parseInt(cleanNumber.charAt(i));

    if (isEven) {
      digit *= 2;
      if (digit > 9) {
        digit -= 9;
      }
    }

    sum += digit;
    isEven = !isEven;
  }

  return sum % 10 === 0;
}

const plans = {
  starter: {
    name: "Starter",
    price: "29",
    features: [
      "5 AI-generated blog posts per month",
      "Basic SEO optimization",
      "Standard support",
      "1 user account"
    ]
  },
  professional: {
    name: "Professional",
    price: "79",
    features: [
      "20 AI-generated blog posts per month",
      "Advanced SEO optimization",
      "Priority support",
      "3 user accounts",
      "Content calendar"
    ]
  },
  enterprise: {
    name: "Enterprise",
    price: "199",
    features: [
      "Unlimited AI-generated blog posts",
      "Premium SEO optimization",
      "24/7 dedicated support",
      "Unlimited user accounts",
      "Custom integrations",
      "Analytics dashboard"
    ]
  }
};

const paymentFormSchema = z.object({
  plan: z.enum(["starter", "professional", "enterprise"] as const, {
    required_error: "Please select a plan",
  }),
  name: z.string()
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name must be less than 50 characters")
    .regex(/^[a-zA-Z\s]*$/, "Name can only contain letters and spaces"),
  email: z.string()
    .email("Invalid email address")
    .min(5, "Email must be at least 5 characters")
    .max(100, "Email must be less than 100 characters"),
  phone: z.string()
    .regex(/^\+?[1-9]\d{1,14}$/, "Please enter a valid phone number")
    .min(10, "Phone number must be at least 10 digits")
    .max(15, "Phone number must be less than 15 digits"),
  cardNumber: z.string()
    .min(13, "Card number must be at least 13 digits")
    .max(23, "Card number is too long") 
    .refine((val) => isValidCreditCard(val), {
      message: "Invalid credit card number"
    }),
  expiryDate: z.string()
    .regex(/^(0[1-9]|1[0-2])\/([0-9]{2})$/, "Expiry date must be in MM/YY format")
    .refine((val) => {
      const [month, year] = val.split('/');
      const expiry = new Date(2000 + parseInt(year), parseInt(month) - 1);
      return expiry > new Date();
    }, "Card has expired"),
  cvv: z.string()
    .regex(/^\d{3,4}$/, "CVV must be 3 or 4 digits")
});

export default function PaymentForm() {
  const { toast } = useToast();
  const [location, setLocation] = useLocationHook();

  // Get the plan from URL search params if it exists
  const searchParams = new URLSearchParams(window.location.search);
  const selectedPlan = searchParams.get('plan') as "starter" | "professional" | "enterprise" | null;

  const form = useForm({
    resolver: zodResolver(paymentFormSchema),
    defaultValues: {
      plan: selectedPlan || "starter",
      name: "",
      email: "",
      phone: "",
      cardNumber: "",
      expiryDate: "",
      cvv: ""
    }
  });

  const onSubmit = async (data: z.infer<typeof paymentFormSchema>) => {
    try {
      const paymentInfo = {
        name: data.name,
        email: data.email,
        phone: data.phone,
        plan: data.plan,
        planDetails: plans[data.plan],
        amount: parseInt(plans[data.plan].price),
        createdAt: new Date(),
        lastFourDigits: data.cardNumber.replace(/\D/g, '').slice(-4)
      };

      await addDoc(collection(db, paymentsCollection), paymentInfo);

      toast({
        title: "Payment successful!",
        description: "Thank you for your purchase. Redirecting to home page...",
      });

      // Reset form and redirect to home page after a short delay
      form.reset();
      setTimeout(() => {
        setLocation('/');
      }, 2000);

    } catch (error) {
      console.error("Payment error:", error);
      toast({
        title: "Payment failed",
        description: "Please try again or contact support.",
        variant: "destructive"
      });
    }
  };

  return (
    <div className="min-h-screen pt-20 bg-gradient-to-b from-[#dfdefd] to-white">
      <div className="container mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-lg mx-auto"
        >
          <Card>
            <CardHeader>
              <h1 className="text-3xl font-bold text-center">Payment Details</h1>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="plan"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Select Plan</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a plan" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {Object.entries(plans).map(([key, plan]) => (
                              <SelectItem key={key} value={key}>
                                {plan.name} - ${plan.price}/month
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Full Name</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="John Doe" 
                            {...field}
                            maxLength={50}
                          />
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
                          <Input 
                            type="email" 
                            placeholder="john@example.com" 
                            {...field}
                            maxLength={100}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phone Number</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="+1234567890"
                            {...field}
                            maxLength={15}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="cardNumber"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Card Number</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="1234 5678 9012 3456" 
                            maxLength={23}
                            {...field}
                            onChange={(e) => {
                              // Allow numbers, spaces, and dashes
                              let value = e.target.value.replace(/[^\d\s-]/g, '');
                              // Format the card number with spaces every 4 digits
                              value = value.replace(/(\d{4})(?=\d)/g, '$1 ');
                              field.onChange(value);
                            }}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="expiryDate"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Expiry Date</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="MM/YY" 
                              maxLength={5}
                              {...field}
                              onChange={(e) => {
                                let value = e.target.value.replace(/\D/g, '');
                                if (value.length >= 2) {
                                  value = value.slice(0, 2) + '/' + value.slice(2);
                                }
                                field.onChange(value);
                              }}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="cvv"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>CVV</FormLabel>
                          <FormControl>
                            <Input 
                              type="password" 
                              placeholder="123" 
                              maxLength={4}
                              {...field}
                              onChange={(e) => {
                                const value = e.target.value.replace(/\D/g, '');
                                field.onChange(value);
                              }}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <Button type="submit" className="w-full">
                    Pay Now
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}