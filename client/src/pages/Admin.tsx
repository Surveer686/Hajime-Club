import { Navbar } from "@/components/Navbar";
import { useAuth } from "@/hooks/use-auth";
import { useSessions, useAnnouncements, useAdminUsers, useCreateSession, useCreateAnnouncement, useDeleteSession, useDeleteAnnouncement, useDeleteUser, useVerifyUser } from "@/hooks/use-resources";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertSessionSchema, insertAnnouncementSchema } from "@shared/schema";
import { format } from "date-fns";
import { Users, Calendar, Megaphone, Trash2, Plus, Loader2, CheckCircle, AlertCircle, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { useState, useEffect } from "react";

export default function Admin() {
  const { user } = useAuth();
  const { data: users } = useAdminUsers();
  const { data: sessions } = useSessions();
  const { data: announcements } = useAnnouncements();
  const { mutate: deleteSession } = useDeleteSession();
  const { mutate: deleteAnnouncement } = useDeleteAnnouncement();
  const { mutate: deleteUser } = useDeleteUser();
  const { mutate: verifyUser } = useVerifyUser();
  
  // Forms
  const { mutate: createSession, isPending: creatingSession } = useCreateSession();
  const { mutate: createAnnouncement, isPending: creatingAnnouncement } = useCreateAnnouncement();
  
  const [sessionOpen, setSessionOpen] = useState(false);
  const [announceOpen, setAnnounceOpen] = useState(false);
  const [confirmAction, setConfirmAction] = useState<{ type: 'verify' | 'delete' | null; userId?: number; userName?: string }>({ type: null });
  const [sessionSubmitted, setSessionSubmitted] = useState(false);
  const [announceSubmitted, setAnnounceSubmitted] = useState(false);

  const sessionForm = useForm({
    resolver: zodResolver(insertSessionSchema),
    defaultValues: {
      title: "",
      date: "",
      startTime: "",
      endTime: "",
      instructor: "",
      capacity: 20,
    }
  });
  const announceForm = useForm({
    resolver: zodResolver(insertAnnouncementSchema),
    defaultValues: {
      title: "",
      body: "",
    }
  });

  const onSessionSubmit = (data: any) => {
    const submitData = typeof data.date === 'string' ? { ...data, date: new Date(data.date) } : data;
    setSessionSubmitted(true);
    createSession(submitData);
  };

  const onAnnounceSubmit = async (data: any) => {
    console.log("Submitting announcement with data:", data);
    if (!user?.id) {
      console.error("User ID is missing");
      return;
    }
    console.log("Creating announcement for user:", user.id);
    createAnnouncement({ title: data.title, body: data.body, authorId: user.id });
  };

  // Close dialogs and reset forms when mutations complete successfully
  useEffect(() => {
    if (sessionSubmitted && !creatingSession) {
      console.log("Resetting session form");
      sessionForm.reset();
      setSessionOpen(false);
      setSessionSubmitted(false);
    }
  }, [creatingSession]);

  useEffect(() => {
    if (announceSubmitted && !creatingAnnouncement) {
      console.log("Resetting announcement form");
      announceForm.reset();
      setAnnounceOpen(false);
      setAnnounceSubmitted(false);
    }
  }, [creatingAnnouncement]);

  if (user?.role !== 'admin') return <div className="p-8">Access Denied</div>;

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-display font-bold text-primary mb-8">Admin Dashboard</h1>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="bg-white p-1 rounded-xl border">
            <TabsTrigger value="overview" className="rounded-lg data-[state=active]:bg-primary data-[state=active]:text-white">Overview</TabsTrigger>
            <TabsTrigger value="sessions" className="rounded-lg data-[state=active]:bg-primary data-[state=active]:text-white">Sessions</TabsTrigger>
            <TabsTrigger value="users" className="rounded-lg data-[state=active]:bg-primary data-[state=active]:text-white">Members</TabsTrigger>
            <TabsTrigger value="announcements" className="rounded-lg data-[state=active]:bg-primary data-[state=active]:text-white">Announcements</TabsTrigger>
          </TabsList>

          {/* OVERVIEW TAB */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Total Users Card */}
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-500">Total Users</p>
                      <p className="text-3xl font-bold text-primary mt-1">{users?.length || 0}</p>
                    </div>
                    <Users className="w-8 h-8 text-blue-500" />
                  </div>
                </CardContent>
              </Card>

              {/* Verified Students Card */}
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-500">Verified Students</p>
                      <p className="text-3xl font-bold text-green-600 mt-1">
                        {users?.filter((u: any) => u.role === 'student' && u.verified).length || 0}
                      </p>
                    </div>
                    <CheckCircle className="w-8 h-8 text-green-500" />
                  </div>
                </CardContent>
              </Card>

              {/* Active Sessions Card */}
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-500">Active Sessions</p>
                      <p className="text-3xl font-bold text-blue-600 mt-1">{sessions?.length || 0}</p>
                    </div>
                    <Calendar className="w-8 h-8 text-blue-500" />
                  </div>
                </CardContent>
              </Card>

              {/* Recent Announcements Card */}
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-500">Announcements</p>
                      <p className="text-3xl font-bold text-purple-600 mt-1">{announcements?.length || 0}</p>
                    </div>
                    <Megaphone className="w-8 h-8 text-purple-500" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Recent Announcements Section */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Megaphone className="w-5 h-5" />
                  Recent Announcements
                </CardTitle>
              </CardHeader>
              <CardContent>
                {announcements && announcements.length > 0 ? (
                  <div className="space-y-4">
                    {announcements.slice(0, 5).map((ann: any) => (
                      <div key={ann.id} className="border-b pb-4 last:border-b-0 last:pb-0">
                        <h3 className="font-medium text-gray-900">{ann.title}</h3>
                        <p className="text-sm text-gray-500 mt-1">{ann.body.substring(0, 100)}...</p>
                        <p className="text-xs text-gray-400 mt-2">{format(new Date(ann.createdAt), "MMM dd, yyyy HH:mm")}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500 text-center py-6">No announcements yet</p>
                )}
              </CardContent>
            </Card>

            {/* Upcoming Sessions Section */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="w-5 h-5" />
                  Upcoming Sessions
                </CardTitle>
              </CardHeader>
              <CardContent>
                {sessions && sessions.length > 0 ? (
                  <div className="space-y-4">
                    {sessions.slice(0, 5).map((s: any) => (
                      <div key={s.id} className="border-b pb-4 last:border-b-0 last:pb-0">
                        <h3 className="font-medium text-gray-900">{s.title}</h3>
                        <p className="text-sm text-gray-500 mt-1">
                          {format(new Date(s.date), "MMM dd, yyyy")} • {s.startTime} - {s.endTime}
                        </p>
                        <p className="text-sm text-gray-500">Instructor: {s.instructor}</p>
                        <p className="text-xs text-gray-400 mt-2">Capacity: {s.capacity}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500 text-center py-6">No sessions scheduled</p>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* SESSIONS TAB */}
          <TabsContent value="sessions" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold flex items-center gap-2"><Calendar className="w-5 h-5" /> Manage Sessions</h2>
              <Dialog open={sessionOpen} onOpenChange={setSessionOpen}>
                <DialogTrigger asChild>
                  <Button className="btn-primary flex items-center gap-2"><Plus className="w-4 h-4" /> Create Session</Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Create New Session</DialogTitle>
                    <DialogDescription>Add a new training session to the schedule</DialogDescription>
                  </DialogHeader>
                  <form onSubmit={sessionForm.handleSubmit(onSessionSubmit)} className="space-y-4 mt-4">
                    <div>
                      <Input {...sessionForm.register("title")} placeholder="Title (e.g. Beginners Judo)" data-testid="input-session-title" />
                      {sessionForm.formState.errors.title && <p className="text-red-500 text-xs mt-1">{(sessionForm.formState.errors.title as any)?.message}</p>}
                    </div>
                    <div>
                      <Input {...sessionForm.register("date")} type="date" data-testid="input-session-date" />
                      {sessionForm.formState.errors.date && <p className="text-red-500 text-xs mt-1">{(sessionForm.formState.errors.date as any)?.message}</p>}
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Input {...sessionForm.register("startTime")} type="time" data-testid="input-session-start" />
                        {sessionForm.formState.errors.startTime && <p className="text-red-500 text-xs mt-1">{(sessionForm.formState.errors.startTime as any)?.message}</p>}
                      </div>
                      <div>
                        <Input {...sessionForm.register("endTime")} type="time" data-testid="input-session-end" />
                        {sessionForm.formState.errors.endTime && <p className="text-red-500 text-xs mt-1">{(sessionForm.formState.errors.endTime as any)?.message}</p>}
                      </div>
                    </div>
                    <div>
                      <Input {...sessionForm.register("instructor")} placeholder="Instructor Name" data-testid="input-session-instructor" />
                      {sessionForm.formState.errors.instructor && <p className="text-red-500 text-xs mt-1">{(sessionForm.formState.errors.instructor as any)?.message}</p>}
                    </div>
                    <div>
                      <Input {...sessionForm.register("capacity", { valueAsNumber: true })} type="number" placeholder="Capacity" data-testid="input-session-capacity" />
                      {sessionForm.formState.errors.capacity && <p className="text-red-500 text-xs mt-1">{(sessionForm.formState.errors.capacity as any)?.message}</p>}
                    </div>
                    <Button type="submit" disabled={creatingSession} className="w-full" data-testid="button-create-session">
                      {creatingSession ? <Loader2 className="animate-spin" /> : "Create Session"}
                    </Button>
                  </form>
                </DialogContent>
              </Dialog>
            </div>

            <Card>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Date</TableHead>
                      <TableHead>Title</TableHead>
                      <TableHead>Time</TableHead>
                      <TableHead>Instructor</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {sessions?.map((s: any) => (
                      <TableRow key={s.id}>
                        <TableCell>{format(new Date(s.date), "MMM dd, yyyy")}</TableCell>
                        <TableCell className="font-medium">{s.title}</TableCell>
                        <TableCell>{s.startTime} - {s.endTime}</TableCell>
                        <TableCell>{s.instructor}</TableCell>
                        <TableCell className="text-right">
                          <Button variant="ghost" size="icon" onClick={() => deleteSession(s.id)} className="text-red-500 hover:text-red-700 hover:bg-red-50">
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* USERS TAB */}
          <TabsContent value="users">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2"><Users className="w-5 h-5" /> Member Directory</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Photo</TableHead>
                      <TableHead>Name</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Role</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Joined</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {users?.map((u: any) => (
                      <TableRow key={u.id}>
                        <TableCell>
                          <Avatar className="h-10 w-10">
                            {u.profilePicture && <AvatarImage src={u.profilePicture} />}
                            <AvatarFallback>{u.name?.charAt(0)}</AvatarFallback>
                          </Avatar>
                        </TableCell>
                        <TableCell className="font-medium">{u.name}</TableCell>
                        <TableCell>{u.email}</TableCell>
                        <TableCell>
                          <span className={`px-2 py-1 rounded-full text-xs ${u.role === 'admin' ? 'bg-purple-100 text-purple-700' : 'bg-blue-100 text-blue-700'}`}>
                            {u.role}
                          </span>
                        </TableCell>
                        <TableCell>
                          {u.role === 'student' && (
                            u.verified ? (
                              <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs bg-green-100 text-green-700">
                                <CheckCircle className="w-3 h-3" /> Verified
                              </span>
                            ) : (
                              <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs bg-yellow-100 text-yellow-700">
                                <AlertCircle className="w-3 h-3" /> Not Verified
                              </span>
                            )
                          )}
                        </TableCell>
                        <TableCell>{format(new Date(u.joinedAt), "MMM dd, yyyy")}</TableCell>
                        <TableCell className="text-right space-x-2">
                          {u.role === 'student' && !u.verified && (
                            <Button size="sm" onClick={() => setConfirmAction({ type: 'verify', userId: u.id, userName: u.name })} className="bg-green-600 hover:bg-green-700 text-white" data-testid={`button-verify-${u.id}`}>
                              Verify
                            </Button>
                          )}
                          {u.id !== user?.id && (
                            <Button variant="ghost" size="icon" onClick={() => setConfirmAction({ type: 'delete', userId: u.id, userName: u.name })} className="text-red-500 hover:text-red-700 hover:bg-red-50" data-testid={`button-delete-${u.id}`}>
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* ANNOUNCEMENTS TAB */}
          <TabsContent value="announcements">
             <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold flex items-center gap-2"><Megaphone className="w-5 h-5" /> Announcements</h2>
              <Dialog open={announceOpen} onOpenChange={setAnnounceOpen}>
                <DialogTrigger asChild>
                  <Button className="btn-primary flex items-center gap-2"><Plus className="w-4 h-4" /> Post Announcement</Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>New Announcement</DialogTitle>
                    <DialogDescription>Share an announcement with all members</DialogDescription>
                  </DialogHeader>
                  <form onSubmit={announceForm.handleSubmit(onAnnounceSubmit)} className="space-y-4 mt-4">
                    <div>
                      <Input {...announceForm.register("title")} placeholder="Title" data-testid="input-announce-title" />
                      {announceForm.formState.errors.title && <p className="text-red-500 text-xs mt-1">{String((announceForm.formState.errors.title as any)?.message)}</p>}
                    </div>
                    <div>
                      <Textarea {...announceForm.register("body")} placeholder="Message body..." className="min-h-[100px]" data-testid="input-announce-body" />
                      {announceForm.formState.errors.body && <p className="text-red-500 text-xs mt-1">{String((announceForm.formState.errors.body as any)?.message)}</p>}
                    </div>
                    <Button type="submit" disabled={creatingAnnouncement} className="w-full" data-testid="button-create-announcement">
                      {creatingAnnouncement ? <Loader2 className="animate-spin" /> : "Post Announcement"}
                    </Button>
                  </form>
                </DialogContent>
              </Dialog>
            </div>
            <Card>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Title</TableHead>
                      <TableHead>Content</TableHead>
                      <TableHead>Posted</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {announcements?.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={4} className="text-center py-6 text-gray-400">No announcements yet</TableCell>
                      </TableRow>
                    ) : (
                      announcements?.map((ann: any) => (
                        <TableRow key={ann.id}>
                          <TableCell className="font-medium">{ann.title}</TableCell>
                          <TableCell>{ann.body.substring(0, 50)}...</TableCell>
                          <TableCell>{format(new Date(ann.createdAt), "MMM dd, yyyy")}</TableCell>
                          <TableCell className="text-right">
                            <Button variant="ghost" size="icon" onClick={() => deleteAnnouncement(ann.id)} className="text-red-500 hover:text-red-700 hover:bg-red-50">
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Confirmation Dialog for Verify */}
      <AlertDialog open={confirmAction.type === 'verify'} onOpenChange={(open) => !open && setConfirmAction({ type: null })}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Verify Student</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to verify <strong>{confirmAction.userName}</strong>? This will mark them as a verified member.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div className="flex gap-3 justify-end">
            <AlertDialogCancel data-testid="button-cancel-verify">Cancel</AlertDialogCancel>
            <AlertDialogAction 
              onClick={() => {
                if (confirmAction.userId) {
                  verifyUser(confirmAction.userId);
                  setConfirmAction({ type: null });
                }
              }}
              className="bg-green-600 hover:bg-green-700 text-white"
              data-testid="button-confirm-verify"
            >
              Verify
            </AlertDialogAction>
          </div>
        </AlertDialogContent>
      </AlertDialog>

      {/* Confirmation Dialog for Delete */}
      <AlertDialog open={confirmAction.type === 'delete'} onOpenChange={(open) => !open && setConfirmAction({ type: null })}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Student</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete <strong>{confirmAction.userName}</strong>? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div className="flex gap-3 justify-end">
            <AlertDialogCancel data-testid="button-cancel-delete">Cancel</AlertDialogCancel>
            <AlertDialogAction 
              onClick={() => {
                if (confirmAction.userId) {
                  deleteUser(confirmAction.userId);
                  setConfirmAction({ type: null });
                }
              }}
              className="bg-red-600 hover:bg-red-700 text-white"
              data-testid="button-confirm-delete"
            >
              Delete
            </AlertDialogAction>
          </div>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
