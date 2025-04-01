// app/about/page.tsx
"use client"; // Add this line

import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { APP_NAME } from '@/lib/constants';
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from '@/components/ui/button'; // Import the Button component
import { useRouter } from 'next/navigation'; // Import the useRouter hook

const teamMembers = [
    { name: "Demo User 1", role: "Founder", imageUrl: null },
    { name: "Demo User 2", role: "Co-Founder", imageUrl: null },
    { name: "Demo User 3", role: "Lead Engineer", imageUrl: null },
    // Add more team members as needed
];

const milestones = [
    { year: 2023, event: "Atenex founded with a vision for accessible knowledge." },
    // Add more milestones
];

export default function AboutPage() {
    const router = useRouter(); // Initialize the router

  return (
      <div className="container mx-auto p-6 space-y-4">
          <Button variant="link" onClick={() => router.push('/')}>Back to Home</Button> {/* Button to go back */}
          <h1 className="text-3xl font-semibold">About {APP_NAME}</h1>

          <Card>
              <CardHeader>
                  <CardTitle>Our Mission</CardTitle>
                  <CardDescription>
                      Empowering organizations with seamless access to their collective knowledge.
                  </CardDescription>
              </CardHeader>
              <CardContent>
                  <p>
                      We are committed to providing innovative solutions that streamline knowledge management,
                      facilitate informed decision-making, and enhance team productivity.
                  </p>
              </CardContent>
          </Card>

          <Separator />

          <Card>
              <CardHeader>
                  <CardTitle>Our Vision</CardTitle>
                  <CardDescription>
                      To be the leading knowledge query platform, transforming how businesses leverage information.
                  </CardDescription>
              </CardHeader>
              <CardContent>
                  <p>
                      We envision a future where organizations can effortlessly tap into their internal expertise,
                      fostering a culture of continuous learning and growth.
                  </p>
              </CardContent>
          </Card>

          <Separator />

          <Card>
              <CardHeader>
                  <CardTitle>Our Values</CardTitle>
                  <CardDescription>
                      Integrity, Innovation, Collaboration, and Customer Success.
                  </CardDescription>
              </CardHeader>
              <CardContent>
                  <ul className="list-disc list-inside space-y-1">
                      <li>
                          <strong>Integrity:</strong> We uphold the highest ethical standards in all our operations.
                      </li>
                      <li>
                          <strong>Innovation:</strong> We continuously seek new ways to improve our platform and services.
                      </li>
                      <li>
                          <strong>Collaboration:</strong> We believe in working together to achieve shared goals.
                      </li>
                      <li>
                          <strong>Customer Success:</strong> We are dedicated to helping our customers succeed.
                      </li>
                  </ul>
              </CardContent>
          </Card>
          <Separator />

          <Card>
              <CardHeader>
                  <CardTitle>Meet Our Team</CardTitle>
                  <CardDescription>
                      The talented individuals behind {APP_NAME}.
                  </CardDescription>
              </CardHeader>
              <CardContent className="flex justify-center">
                  <div className="grid sm:grid-cols-3 gap-4"> {/* Flex Container for centering */}
                    {teamMembers.map((member) => (
                        <div key={member.name} className="flex flex-col items-center">
                            <Avatar className="h-16 w-16">
                                {member.imageUrl ? (
                                    <img src={member.imageUrl} alt={member.name} />
                                ) : (
                                    <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                                )}
                            </Avatar>
                            <div className="mt-2 text-center">
                                <p className="font-medium">{member.name}</p>
                                <p className="text-sm text-muted-foreground">{member.role}</p>
                            </div>
                        </div>
                    ))}
                </div>
              </CardContent>
          </Card>
      </div>
  );
}