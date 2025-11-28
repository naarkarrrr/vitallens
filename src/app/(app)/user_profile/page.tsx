
'use client';

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { staff } from "@/lib/placeholder-data";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";

export default function UserProfilePage() {
    const userAvatar = PlaceHolderImages.find(img => img.id === 'user-avatar');
    const user = staff.find(s => s.role === 'Doctor'); // Example user

    return (
        <div className="grid gap-6">
             <Card>
                <CardHeader>
                    <CardTitle>User Profile</CardTitle>
                    <CardDescription>Manage your personal information, settings, and preferences.</CardDescription>
                </CardHeader>
            </Card>

            <div className="grid md:grid-cols-3 gap-6">
                <div className="md:col-span-1 flex flex-col gap-6">
                    <Card>
                        <CardHeader className="items-center text-center">
                            <Avatar className="h-24 w-24 mb-4">
                                {userAvatar && <AvatarImage src={userAvatar.imageUrl} alt="User" data-ai-hint="user avatar" />}
                                <AvatarFallback className="text-4xl">{user?.name.substring(0,2)}</AvatarFallback>
                            </Avatar>
                            <CardTitle>{user?.name}</CardTitle>
                            <CardDescription>{user?.role} - {user?.specialization}</CardDescription>
                        </CardHeader>
                        <CardContent className="text-center">
                           <Button>Change Photo</Button>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Profile Status</CardTitle>
                        </CardHeader>
                        <CardContent className="grid gap-4">
                             <div className="flex items-center justify-between">
                                <Label htmlFor="duty-status">Duty Status</Label>
                                <Badge variant={user?.duty_status === 'On Duty' ? 'default' : 'outline'} className={user?.duty_status === 'On Duty' ? 'bg-green-500 text-white' : ''}>
                                    {user?.duty_status}
                                </Badge>
                            </div>
                             <div className="flex items-center justify-between">
                                <Label htmlFor="shift-timing">Shift</Label>
                                <span className="text-sm text-muted-foreground">{user?.shift_start} - {user?.shift_end}</span>
                            </div>
                        </CardContent>
                    </Card>
                </div>
                <div className="md:col-span-2 flex flex-col gap-6">
                     <Card>
                        <CardHeader>
                            <CardTitle>Personal Information</CardTitle>
                            <CardDescription>Update your personal details here.</CardDescription>
                        </CardHeader>
                        <CardContent className="grid gap-6">
                            <div className="grid md:grid-cols-2 gap-4">
                                <div className="grid gap-2">
                                    <Label htmlFor="name">Full Name</Label>
                                    <Input id="name" defaultValue={user?.name} />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="email">Email</Label>
                                    <Input id="email" type="email" defaultValue="john.doe@example.com" />
                                </div>
                            </div>
                             <div className="grid md:grid-cols-2 gap-4">
                                <div className="grid gap-2">
                                    <Label htmlFor="role">Role</Label>
                                    <Input id="role" defaultValue={user?.role} disabled />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="specialization">Specialization</Label>
                                    <Input id="specialization" defaultValue={user?.specialization} />
                                </div>
                            </div>
                            <div className="flex justify-end">
                                <Button>Update Profile</Button>
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                            <CardTitle>Notification Settings</CardTitle>
                            <CardDescription>Manage how you receive notifications.</CardDescription>
                        </CardHeader>
                        <CardContent className="grid gap-4">
                            <div className="flex items-center justify-between">
                                <Label htmlFor="email-notifications">Email Notifications</Label>
                                <Switch id="email-notifications" defaultChecked />
                            </div>
                             <div className="flex items-center justify-between">
                                <Label htmlFor="sms-notifications">SMS Alerts for Critical Events</Label>
                                <Switch id="sms-notifications" />
                            </div>
                             <div className="flex items-center justify-between">
                                <Label htmlFor="desktop-notifications">Desktop Notifications</Label>
                                <Switch id="desktop-notifications" defaultChecked />
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
