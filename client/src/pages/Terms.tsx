import { Navbar } from "@/components/Navbar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { AlertCircle } from "lucide-react";

export default function Terms() {
  const terms = [
    {
      title: "1. Sportsman Spirit",
      desc: "Members should maintain a positive attitude, be willing to learn, and support fellow participants."
    },
    {
      title: "2. No Active Participation in Other Sports",
      desc: "Members should not be currently enrolled in other sports activities that may cause schedule conflicts or reduce commitment."
    },
    {
      title: "3. Minimum Time Commitment",
      desc: "Members must dedicate 2-3 hours on at least 3 alternate days in the evening as per the club schedule."
    },
    {
      title: "4. Respectful Behaviour",
      desc: "Treat instructors, peers, and club property with respect at all times. Any form of misbehaviour will not be tolerated."
    },
    {
      title: "5. Discipline Is Mandatory",
      desc: "Follow instructions carefully, maintain discipline during practice, and contribute to a focused training environment."
    },
    {
      title: "6. Punctuality",
      desc: "Strictly maintain timely and regular participation."
    },
    {
      title: "7. Safety First",
      desc: "All members must follow safety instructions strictly to avoid injuries. Strictly NO reckless behaviour."
    },
    {
      title: "8. No Misuse of Skills",
      desc: "The club is for discipline - never for aggression or harming others."
    },
  ];

  return (
    <div className="min-h-screen bg-background pb-12">
      <Navbar />
      
      <div className="max-w-3xl mx-auto px-4 pt-12">
        <div className="bg-white rounded-2xl shadow-xl border border-border overflow-hidden">
          <div className="bg-primary p-8 text-center text-white">
            <h1 className="text-3xl font-display font-bold mb-2">Terms & Conditions</h1>
            <p className="opacity-80">Please read carefully before joining Hajime Club</p>
          </div>

          <ScrollArea className="h-[600px] p-8">
            <div className="prose prose-blue max-w-none">
              <p className="text-lg font-medium text-muted-foreground mb-8">
                To maintain a productive, safe, and disciplined environment for learning basic Judo and self-defense, all members must agree to the following guidelines:
              </p>

              <div className="space-y-6">
                {terms.map((term, idx) => (
                  <div key={idx} className="bg-secondary/5 p-4 rounded-lg border-l-4 border-secondary">
                    <h3 className="text-lg font-bold text-primary mb-1">{term.title}</h3>
                    <p className="text-gray-700">{term.desc}</p>
                  </div>
                ))}
              </div>

              <div className="mt-8 p-6 bg-red-50 rounded-xl border border-red-100 flex gap-4">
                <AlertCircle className="w-6 h-6 text-red-600 flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-bold text-red-900 mb-1">Final Notice</h4>
                  <p className="text-red-800 text-sm">
                    Welcome to the Club! If you fulfill these simple requirements and are genuinely committed, you are welcome to join. Only those who agree to these terms should enter the group.
                  </p>
                </div>
              </div>
            </div>
          </ScrollArea>
        </div>
      </div>
    </div>
  );
}
