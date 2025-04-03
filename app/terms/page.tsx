// File: app/terms/page.tsx
"use client"; // Mark as client component to use hooks like useRouter

import React from 'react';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation'; // Import useRouter
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { APP_NAME } from '@/lib/constants';

export default function TermsPage() {
    const router = useRouter(); // Initialize router

  return (
    <div className="min-h-screen bg-background text-foreground p-4 md:p-8">
        <Button variant="link" onClick={() => router.push('/')} className="mb-4">← Back to Home</Button>
      <Card className="max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl md:text-3xl">Terms of Service</CardTitle>
        </CardHeader>
        <CardContent className="prose prose-sm sm:prose lg:prose-lg dark:prose-invert max-w-none space-y-4">
          <p>Last Updated: [Insert Date]</p>

          <h2>1. Acceptance of Terms</h2>
          <p>
            By accessing or using the {APP_NAME} service ("Service"), you agree to be bound by these Terms of Service ("Terms"). If you disagree with any part of the terms, then you may not access the Service.
          </p>

          <h2>2. Service Description</h2>
          <p>
            {APP_NAME} provides a platform for querying enterprise knowledge bases using natural language processing. Features include document upload, processing, indexing, and natural language querying.
          </p>

          <h2>3. User Accounts</h2>
          <p>
            You are responsible for safeguarding your account credentials and for any activities or actions under your account. You must notify us immediately upon becoming aware of any breach of security or unauthorized use of your account.
          </p>

          <h2>4. User Content</h2>
          <p>
            You retain ownership of any documents or data you upload to the Service ("User Content"). By uploading User Content, you grant {APP_NAME} a worldwide, non-exclusive, royalty-free license to use, process, store, and display your User Content solely for the purpose of providing the Service to you.
          </p>

          <h2>5. Acceptable Use</h2>
          <p>
            You agree not to misuse the Service. Prohibited activities include, but are not limited to: [List prohibited activities, e.g., uploading illegal content, attempting to breach security, overloading the system].
          </p>

          <h2>6. Termination</h2>
          <p>
            We may terminate or suspend your access to the Service immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms.
          </p>

          <h2>7. Disclaimer of Warranties</h2>
          <p>
            The Service is provided on an "AS IS" and "AS AVAILABLE" basis. {APP_NAME} makes no warranties, expressed or implied, and hereby disclaims all other warranties including, without limitation, implied warranties of merchantability, fitness for a particular purpose, or non-infringement.
          </p>

          <h2>8. Limitation of Liability</h2>
          <p>
            In no event shall {APP_NAME}, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your access to or use of or inability to access or use the Service.
          </p>

          <h2>9. Governing Law</h2>
          <p>
            These Terms shall be governed and construed in accordance with the laws of [Your Jurisdiction], without regard to its conflict of law provisions.
          </p>

          <h2>10. Changes to Terms</h2>
          <p>
            We reserve the right, at our sole discretion, to modify or replace these Terms at any time. We will provide notice of any changes by posting the new Terms on this page.
          </p>

          <h2>11. Contact Us</h2>
          <p>
            If you have any questions about these Terms, please contact us at [Your Contact Email/Link].
          </p>
        </CardContent>
      </Card>
    </div>
  );
}