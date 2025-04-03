// File: app/privacy/page.tsx
"use client"; // Mark as client component to use hooks like useRouter

import React from 'react';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation'; // Import useRouter
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { APP_NAME } from '@/lib/constants';

export default function PrivacyPage() {
    const router = useRouter(); // Initialize router

  return (
    <div className="min-h-screen bg-background text-foreground p-4 md:p-8">
      <Button variant="link" onClick={() => router.push('/')} className="mb-4">← Back to Home</Button>
      <Card className="max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl md:text-3xl">Privacy Policy</CardTitle>
        </CardHeader>
        <CardContent className="prose prose-sm sm:prose lg:prose-lg dark:prose-invert max-w-none space-y-4">
          <p>Last Updated: [Insert Date]</p>

          <p>
            {APP_NAME} ("us", "we", or "our") operates the {APP_NAME} application (the "Service"). This page informs you of our policies regarding the collection, use, and disclosure of personal data when you use our Service and the choices you have associated with that data.
          </p>

          <h2>1. Information Collection and Use</h2>
          <p>
            We collect several different types of information for various purposes to provide and improve our Service to you.
          </p>
          <ul>
            <li><strong>Personal Data:</strong> While using our Service, we may ask you to provide us with certain personally identifiable information that can be used to contact or identify you ("Personal Data"). Personally identifiable information may include, but is not limited to: Email address, Name, Company Information (if applicable).</li>
            <li><strong>Usage Data:</strong> We may also collect information on how the Service is accessed and used ("Usage Data"). This Usage Data may include information such as your computer's Internet Protocol address (e.g., IP address), browser type, browser version, the pages of our Service that you visit, the time and date of your visit, the time spent on those pages, unique device identifiers and other diagnostic data.</li>
            <li><strong>User Content:</strong> We process the documents and data you upload ("User Content") solely for the purpose of providing the Service features, such as indexing and querying. We treat your User Content as confidential.</li>
          </ul>

          <h2>2. Use of Data</h2>
          <p>{APP_NAME} uses the collected data for various purposes:</p>
          <ul>
            <li>To provide and maintain the Service</li>
            <li>To notify you about changes to our Service</li>
            <li>To allow you to participate in interactive features of our Service when you choose to do so</li>
            <li>To provide customer care and support</li>
            <li>To provide analysis or valuable information so that we can improve the Service</li>
            <li>To monitor the usage of the Service</li>
            <li>To detect, prevent and address technical issues</li>
          </ul>

          <h2>3. Data Storage and Security</h2>
          <p>
            User Content is stored securely using industry-standard cloud storage providers [Specify if possible, e.g., AWS S3, Google Cloud Storage, MinIO]. We implement security measures designed to protect your information from unauthorized access, disclosure, alteration, and destruction. However, no internet transmission or electronic storage is 100% secure.
          </p>

          <h2>4. Service Providers</h2>
          <p>
            We may employ third-party companies and individuals to facilitate our Service ("Service Providers"), to provide the Service on our behalf, to perform Service-related services or to assist us in analyzing how our Service is used. These third parties have access to your Personal Data only to perform these tasks on our behalf and are obligated not to disclose or use it for any other purpose. Examples include: [List categories, e.g., Cloud hosting (AWS/GCP/Azure), LLM providers (OpenAI/Google), Authentication (Supabase)].
          </p>

          <h2>5. Your Data Rights</h2>
          <p>
            Depending on your jurisdiction, you may have certain rights regarding your Personal Data, such as the right to access, correct, delete, or restrict its processing. Please contact us to exercise these rights.
          </p>

          <h2>6. Children's Privacy</h2>
          <p>
            Our Service does not address anyone under the age of 18 ("Children"). We do not knowingly collect personally identifiable information from anyone under the age of 18.
          </p>

          <h2>7. Changes to This Privacy Policy</h2>
          <p>
            We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page. You are advised to review this Privacy Policy periodically for any changes.
          </p>

          <h2>8. Contact Us</h2>
          <p>
            If you have any questions about this Privacy Policy, please contact us: [Your Contact Email/Link]
          </p>
        </CardContent>
      </Card>
    </div>
  );
}