// app/about/page.tsx
import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { APP_NAME } from '@/lib/constants';
import { Separator } from "@/components/ui/separator";

export default function AboutPage() {
  return (
      <div className="container mx-auto p-6 space-y-4">
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
      </div>
  );
}