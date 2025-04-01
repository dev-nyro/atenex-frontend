// app/contact/page.tsx
import React from 'react';

export default function ContactPage() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-semibold mb-4">Contact Us</h1>
      <p className="text-gray-700 dark:text-gray-300">
        We'd love to hear from you! If you have any questions or feedback,
        please don't hesitate to reach out.
      </p>
      <ul className="mt-4 list-none">
        <li>
          Email: <a href="mailto:support@example.com">support@example.com</a>
        </li>
        <li>Phone: (123) 456-7890</li>
        {/* Add more contact methods as needed */}
      </ul>
    </div>
  );
}