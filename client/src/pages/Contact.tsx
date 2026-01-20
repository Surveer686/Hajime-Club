import { Navbar } from "@/components/Navbar";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertContactSchema, type InsertContact } from "@shared/schema";
import { useContact } from "@/hooks/use-resources";
import { Mail, MapPin, Phone } from "lucide-react";
import { Loader2 } from "lucide-react";

export default function Contact() {
  const { mutate, isPending } = useContact();
  const form = useForm<InsertContact>({
    resolver: zodResolver(insertContactSchema),
  });

  const onSubmit = (data: InsertContact) => {
    mutate(data, {
      onSuccess: () => form.reset(),
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16">
          
          {/* Contact Info */}
          <div>
            <h1 className="text-5xl font-display font-bold text-primary mb-6">Get In Touch</h1>
            <p className="text-lg text-muted-foreground mb-10">
              Have questions about membership, training schedules, or requirements? Send us a message or visit us during training hours.
            </p>

            <div className="space-y-8">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-secondary/10 rounded-lg">
                  <MapPin className="w-6 h-6 text-secondary" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-primary">Training Center</h3>
                  <p className="text-muted-foreground">123 Dojo Street, Martial Arts District<br/>City, State 12345</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-3 bg-secondary/10 rounded-lg">
                  <Mail className="w-6 h-6 text-secondary" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-primary">Email Us</h3>
                  <p className="text-muted-foreground">contact@hajimeclub.com</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-3 bg-secondary/10 rounded-lg">
                  <Phone className="w-6 h-6 text-secondary" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-primary">Call Us</h3>
                  <p className="text-muted-foreground">+1 (555) 123-4567</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white p-8 rounded-3xl shadow-xl border border-border">
            <h2 className="text-2xl font-bold mb-6 text-primary">Send a Message</h2>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                <input
                  {...form.register("name")}
                  className="input-field"
                  placeholder="Your full name"
                />
                {form.formState.errors.name && (
                  <p className="text-sm text-red-500 mt-1">{form.formState.errors.name.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                <input
                  {...form.register("email")}
                  className="input-field"
                  placeholder="you@example.com"
                  type="email"
                />
                {form.formState.errors.email && (
                  <p className="text-sm text-red-500 mt-1">{form.formState.errors.email.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                <textarea
                  {...form.register("message")}
                  className="input-field min-h-[150px] resize-y"
                  placeholder="How can we help you?"
                />
                {form.formState.errors.message && (
                  <p className="text-sm text-red-500 mt-1">{form.formState.errors.message.message}</p>
                )}
              </div>

              <button
                type="submit"
                disabled={isPending}
                className="w-full btn-primary flex items-center justify-center"
              >
                {isPending ? <Loader2 className="w-5 h-5 animate-spin" /> : "Send Message"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
