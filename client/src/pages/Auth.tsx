import { useState } from "react";
import { Link, useLocation } from "wouter";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { insertUserSchema } from "@shared/schema";
import { useAuth } from "@/hooks/use-auth";
import { Loader2, ArrowLeft } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";

export default function AuthPage() {
  const [location] = useLocation();
  const isRegister = location === "/register";
  const { login, register, isLoggingIn, isRegistering } = useAuth();
  
  // Custom schema to validate password confirmation & terms
  const registerSchema = insertUserSchema.extend({
    confirmPassword: z.string(),
  }).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  }).refine((data) => data.acceptedTerms === true, {
    message: "You must accept the terms",
    path: ["acceptedTerms"],
  });

  const loginSchema = z.object({
    username: z.string().min(1, "Email is required"),
    password: z.string().min(1, "Password is required"),
  });

  const regForm = useForm({
    resolver: zodResolver(registerSchema),
    defaultValues: { acceptedTerms: false, role: 'student' }
  });

  const loginForm = useForm({
    resolver: zodResolver(loginSchema)
  });

  const onLogin = (data: z.infer<typeof loginSchema>) => {
    login(data);
  };

  const onRegister = (data: any) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { confirmPassword, ...userData } = data;
    register(userData);
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-background">
      {/* Visual Side */}
      <div className="hidden md:flex flex-1 bg-primary text-white p-12 flex-col justify-between relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://pixabay.com/get/g7e04474b4804251ee2baa408f558bd924ec123f735f75d7db1aee2c590801063592aeb93150bd1720f0d6a86126715021b69660c768f6a3c29b55fee706269fd_1280.jpg')] bg-cover opacity-20" />
        <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary/80 to-transparent" />
        
        <div className="relative z-10">
          <Link href="/" className="inline-flex items-center gap-2 text-white/80 hover:text-white transition-colors">
            <ArrowLeft className="w-5 h-5" /> Back to Home
          </Link>
        </div>
        
        <div className="relative z-10 max-w-lg">
          <h1 className="text-5xl font-display font-bold mb-6">Discipline.<br/>Respect.<br/>Strength.</h1>
          <p className="text-xl text-gray-300">Join the Hajime Club community and start your journey towards mastery.</p>
        </div>
        
        <div className="relative z-10">
          <p className="text-sm opacity-60">© 2024 Hajime Club</p>
        </div>
      </div>

      {/* Form Side */}
      <div className="flex-1 flex items-center justify-center p-6 sm:p-12 overflow-y-auto">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center md:text-left">
            <h2 className="text-3xl font-display font-bold text-primary">
              {isRegister ? "Create Account" : "Welcome Back"}
            </h2>
            <p className="mt-2 text-muted-foreground">
              {isRegister ? "Start your training today." : "Please enter your details."}
            </p>
          </div>

          {isRegister ? (
            <form onSubmit={regForm.handleSubmit(onRegister)} className="space-y-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Full Name</label>
                  <input {...regForm.register("name")} className="input-field" placeholder="John Doe" />
                  {regForm.formState.errors.name && <p className="text-sm text-red-500 mt-1">{String(regForm.formState.errors.name.message)}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Email</label>
                  <input {...regForm.register("email")} type="email" className="input-field" placeholder="john@example.com" />
                  {regForm.formState.errors.email && <p className="text-sm text-red-500 mt-1">{String(regForm.formState.errors.email.message)}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Password</label>
                  <input {...regForm.register("password")} type="password" className="input-field" />
                  {regForm.formState.errors.password && <p className="text-sm text-red-500 mt-1">{String(regForm.formState.errors.password.message)}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Confirm Password</label>
                  <input {...regForm.register("confirmPassword")} type="password" className="input-field" />
                  {regForm.formState.errors.confirmPassword && <p className="text-sm text-red-500 mt-1">{String(regForm.formState.errors.confirmPassword.message)}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Phone (Optional)</label>
                  <input {...regForm.register("phone")} className="input-field" placeholder="+1 (555) ..." />
                </div>

                <div className="flex items-start space-x-3 p-4 bg-secondary/5 rounded-lg border border-secondary/20">
                  <Checkbox 
                    id="terms" 
                    checked={regForm.watch("acceptedTerms")}
                    onCheckedChange={(c) => regForm.setValue("acceptedTerms", c === true)}
                  />
                  <div className="grid gap-1.5 leading-none">
                    <label htmlFor="terms" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                      I accept the <Link href="/terms" className="text-primary underline font-bold hover:text-secondary">Terms and Conditions</Link>
                    </label>
                    <p className="text-xs text-muted-foreground">You must agree to the club rules.</p>
                    {regForm.formState.errors.acceptedTerms && <p className="text-xs text-red-500">{String(regForm.formState.errors.acceptedTerms.message)}</p>}
                  </div>
                </div>
              </div>

              <button type="submit" disabled={isRegistering} className="w-full btn-primary flex justify-center">
                {isRegistering ? <Loader2 className="animate-spin" /> : "Create Account"}
              </button>
            </form>
          ) : (
            <form onSubmit={loginForm.handleSubmit(onLogin)} className="space-y-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Email</label>
                  <input {...loginForm.register("username")} className="input-field" placeholder="john@example.com" />
                  {loginForm.formState.errors.username && <p className="text-sm text-red-500 mt-1">{String(loginForm.formState.errors.username.message)}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Password</label>
                  <input {...loginForm.register("password")} type="password" className="input-field" />
                  {loginForm.formState.errors.password && <p className="text-sm text-red-500 mt-1">{String(loginForm.formState.errors.password.message)}</p>}
                </div>
              </div>

              <button type="submit" disabled={isLoggingIn} className="w-full btn-primary flex justify-center">
                {isLoggingIn ? <Loader2 className="animate-spin" /> : "Sign In"}
              </button>
            </form>
          )}

          <div className="mt-6 text-center text-sm">
            {isRegister ? (
              <p>Already have an account? <Link href="/login" className="text-primary font-bold hover:underline">Log in</Link></p>
            ) : (
              <p>Don't have an account? <Link href="/register" className="text-primary font-bold hover:underline">Register now</Link></p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
