import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function PrivacyPage() {
  return (
    <div className="container max-w-3xl py-6">
      <Card>
        <CardHeader>
          <CardTitle>Privacy Policy</CardTitle>
        </CardHeader>
        <CardContent className="prose prose-sm dark:prose-invert">
          <h2>1. Information We Collect</h2>
          <p>
            We collect information that you provide directly to us, including when you create an
            account, update your profile, or communicate with us. This may include:
          </p>
          <ul>
            <li>Name and email address</li>
            <li>Profile information</li>
            <li>Instagram account information</li>
            <li>Communications you send to us</li>
          </ul>

          <h2>2. How We Use Your Information</h2>
          <p>We use the information we collect to:</p>
          <ul>
            <li>Provide, maintain, and improve our services</li>
            <li>Process your transactions</li>
            <li>Send you technical notices and support messages</li>
            <li>Communicate with you about products, services, and events</li>
            <li>Monitor and analyze trends and usage</li>
            <li>Detect, investigate, and prevent fraud and other illegal activities</li>
          </ul>

          <h2>3. Information Sharing</h2>
          <p>
            We do not share your personal information with third parties except in the following
            circumstances:
          </p>
          <ul>
            <li>With your consent</li>
            <li>To comply with legal obligations</li>
            <li>To protect our rights and the rights of others</li>
            <li>In connection with a business transfer</li>
          </ul>

          <h2>4. Data Security</h2>
          <p>
            We take reasonable measures to help protect your personal information from loss, theft,
            misuse, unauthorized access, disclosure, alteration, and destruction.
          </p>

          <h2>5. Your Rights</h2>
          <p>You have the right to:</p>
          <ul>
            <li>Access your personal information</li>
            <li>Correct inaccurate information</li>
            <li>Request deletion of your information</li>
            <li>Object to processing of your information</li>
            <li>Export your data</li>
          </ul>

          <h2>6. Cookies and Similar Technologies</h2>
          <p>
            We use cookies and similar technologies to collect information about your browsing
            activities and to maintain your preferences.
          </p>

          <h2>7. Children's Privacy</h2>
          <p>
            Our services are not directed to children under 13. We do not knowingly collect personal
            information from children under 13.
          </p>

          <h2>8. Changes to This Policy</h2>
          <p>
            We may update this Privacy Policy from time to time. We will notify you of any changes by
            posting the new Privacy Policy on this page.
          </p>

          <h2>9. Contact Us</h2>
          <p>
            If you have any questions about this Privacy Policy, please contact us at
            privacy@instatrack.com.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
