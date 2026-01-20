import { Navbar } from "@/components/Navbar";
import { useAuth } from "@/hooks/use-auth";
import { useSessions, useAnnouncements, useAttendance, useMarkAttendance, useDeleteAnnouncement } from "@/hooks/use-resources";
import { format } from "date-fns";
import { Calendar, Bell, CheckCircle, Clock, Trash2, Check, AlertCircle, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { type Session, type Attendance } from "@shared/schema";

export default function Dashboard() {
  const { user } = useAuth();
  const { data: sessions } = useSessions();
  const { data: announcements } = useAnnouncements();
  const { data: attendance } = useAttendance();
  const { mutate: markAttendance } = useMarkAttendance();
  const { mutate: deleteAnnouncement } = useDeleteAnnouncement();

  if (!user) return null;

  const isAttending = (sessionId: number) => {
    return attendance?.some((a: Attendance) => a.sessionId === sessionId && a.userId === user.id);
  };

  const handleAttendance = (sessionId: number) => {
    markAttendance({ sessionId, userId: user.id, status: 'present' });
  };

  // Filter upcoming sessions
  const upcomingSessions = sessions?.filter((s: Session) => new Date(s.date) >= new Date()).sort((a: Session, b: Session) => new Date(a.date).getTime() - new Date(b.date).getTime());

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Header */}
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-display font-bold text-primary">Welcome back, {user.name}</h1>
            <p className="text-muted-foreground">Your training dashboard.</p>
          </div>
          <div>
            {user.role === 'admin' ? (
              <div className="inline-flex items-center gap-2 px-3 py-2 rounded-full bg-red-100">
                <Shield className="w-4 h-4 text-red-600" />
                <span className="text-sm font-medium text-red-700">Admin</span>
              </div>
            ) : (
              (user as any)?.verified ? (
                <div className="inline-flex items-center gap-2 px-3 py-2 rounded-full bg-blue-100">
                  <Check className="w-4 h-4 text-blue-600" />
                  <span className="text-sm font-medium text-blue-700">Verified</span>
                </div>
              ) : (
                <div className="inline-flex items-center gap-2 px-3 py-2 rounded-full bg-yellow-100">
                  <AlertCircle className="w-4 h-4 text-yellow-600" />
                  <span className="text-sm font-medium text-yellow-700">Not Verified</span>
                </div>
              )
            )}
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          
          {/* Main Content (Sessions) */}
          <div className="lg:col-span-2 space-y-8">
            <section>
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                <Calendar className="w-5 h-5 text-secondary" /> Upcoming Sessions
              </h2>
              
              <div className="grid gap-4">
                {upcomingSessions?.length === 0 ? (
                  <Card><CardContent className="pt-6 text-center text-muted-foreground">No upcoming sessions scheduled.</CardContent></Card>
                ) : (
                  upcomingSessions?.map((session: Session) => (
                    <Card key={session.id} className="overflow-hidden border-l-4 border-l-secondary">
                      <CardContent className="p-6 flex flex-col sm:flex-row justify-between sm:items-center gap-4">
                        <div>
                          <h3 className="font-bold text-lg text-primary">{session.title}</h3>
                          <div className="text-sm text-gray-500 mt-1 flex flex-col sm:flex-row sm:gap-4">
                            <span>{format(new Date(session.date), "EEEE, MMMM do, yyyy")}</span>
                            <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {session.startTime} - {session.endTime}</span>
                          </div>
                          <p className="text-sm mt-2 text-gray-600">Instructor: {session.instructor}</p>
                        </div>
                        
                        <div>
                          {isAttending(session.id) ? (
                            <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200 px-3 py-1">
                              <CheckCircle className="w-3 h-3 mr-1" /> Registered
                            </Badge>
                          ) : (
                            <Button 
                              onClick={() => handleAttendance(session.id)}
                              className="bg-primary hover:bg-primary/90 text-white"
                            >
                              Mark Attendance
                            </Button>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  ))
                )}
              </div>
            </section>
          </div>

          {/* Sidebar (Announcements & Stats) */}
          <div className="space-y-8">
            <Card>
              <CardHeader className="bg-primary text-white rounded-t-xl">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Bell className="w-5 h-5" /> Announcements
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="divide-y divide-gray-100">
                  {announcements?.length === 0 ? (
                    <div className="p-6 text-center text-gray-400">No new announcements.</div>
                  ) : (
                    announcements?.slice(0, 5).map((ann: any) => (
                      <div key={ann.id} className="p-4 hover:bg-gray-50 transition-colors flex justify-between items-start gap-2">
                        <div className="flex-1">
                          <h4 className="font-bold text-primary text-sm mb-1">{ann.title}</h4>
                          <p className="text-sm text-gray-600 mb-2">{ann.body}</p>
                          <p className="text-xs text-gray-400">{format(new Date(ann.createdAt), "MMM d")}</p>
                        </div>
                        {user?.role === 'admin' && (
                          <Button variant="ghost" size="icon" onClick={() => deleteAnnouncement(ann.id)} className="text-red-500 hover:text-red-700 hover:bg-red-50 mt-1">
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        )}
                      </div>
                    ))
                  )}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Your Stats</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center pb-2 border-b">
                    <span className="text-gray-600">Total Classes</span>
                    <span className="font-bold text-xl">{attendance?.filter((a: any) => a.userId === user.id).length || 0}</span>
                  </div>
                  <div className="flex justify-between items-center pb-2 border-b">
                    <span className="text-gray-600">Status</span>
                    <span className="font-bold text-green-600 bg-green-50 px-2 py-1 rounded text-sm">Active</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Joined</span>
                    <span className="font-medium text-sm">{format(new Date(user.joinedAt), "MMM yyyy")}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

        </div>
      </div>
    </div>
  );
}
