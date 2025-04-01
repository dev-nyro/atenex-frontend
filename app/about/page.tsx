// app/about/page.tsx
import React from 'react';

export default function AboutPage() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-semibold mb-4">About Us</h1>
      <p className="text-gray-700 dark:text-gray-300">
        Atenex is an innovative knowledge management platform designed to help
        organizations unlock the power of their collective knowledge.
        We strive to provide a seamless and intuitive experience, allowing
        users to easily access and share information.
      </p>
      <p className="mt-4 text-gray-700 dark:text-gray-300">
        Our mission is to empower teams to make better decisions with faster access
        to relevant insights.
      </p>
      {/* Add more content as needed */}
    </div>
  );
}