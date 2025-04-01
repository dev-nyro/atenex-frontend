// app/contact/page.tsx
import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { APP_NAME } from '@/lib/constants';
import { Mail, Phone, MapPin } from 'lucide-react';
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useRouter } from 'next/navigation'; // Import the useRouter hook

export default function ContactPage() {
    const router = useRouter(); // Initialize the router

    return (
        <div className="container mx-auto p-6 space-y-4">
            <Button variant="link" onClick={() => router.push('/')}>Back to Home</Button> {/* Button to go back */}
            <h1 className="text-3xl font-semibold">Contact {APP_NAME}</h1>

            <Card>
                <CardHeader>
                    <CardTitle>General Inquiries</CardTitle>
                    <CardDescription>
                        For questions about our platform, features, or pricing.
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                    <div className="flex items-center space-x-2">
                        <Mail className="h-4 w-4 text-muted-foreground" />
                        <a href="mailto:info@example.com">info@example.com</a>
                    </div>
                    <div className="flex items-center space-x-2">
                        <Phone className="h-4 w-4 text-muted-foreground" />
                        <span>(123) 456-7890</span>
                    </div>
                </CardContent>
            </Card>

            <Separator />

            <Card>
                <CardHeader>
                    <CardTitle>Support</CardTitle>
                    <CardDescription>
                        Need help with using the platform? Contact our support team.
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                    <div className="flex items-center space-x-2">
                        <Mail className="h-4 w-4 text-muted-foreground" />
                        <a href="mailto:support@example.com">support@example.com</a>
                    </div>
                </CardContent>
            </Card>

            <Separator />

            <Card>
                <CardHeader>
                    <CardTitle>Contact Form</CardTitle>
                    <CardDescription>Send us a message directly.</CardDescription>
                </CardHeader>
                <CardContent>
                    <form className="grid gap-4">
                        <div className="grid gap-2">
                            <Label htmlFor="name">Your Name</Label>
                            <Input id="name" placeholder="John Doe" type="text" />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="email">Email</Label>
                            <Input id="email" placeholder="johndoe@example.com" type="email" />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="message">Message</Label>
                            <Textarea id="message" placeholder="Write your message here." />
                        </div>
                        <Button>Send Message</Button>
                    </form>
                </CardContent>
            </Card>

            <Separator />

            <Card>
                <CardHeader>
                    <CardTitle>Our Office</CardTitle>
                    <CardDescription>
                        Visit us at our headquarters.
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                    <div className="flex items-center space-x-2">
                        <MapPin className="h-4 w-4 text-muted-foreground" />
                        <span>123 Main Street, Anytown, CA 12345</span>
                    </div>
                    {/* Google Maps Embed or similar here if desired */}
                </CardContent>
            </Card>
        </div>
    );
}