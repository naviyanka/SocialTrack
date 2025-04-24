import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function TermsPage() {
  return (
    <div className="container max-w-3xl py-6">
      <Card>
        <CardHeader>
          <CardTitle>Terms of Service</CardTitle>
        </CardHeader>
        <CardContent className="prose prose-sm dark:prose-invert">
          <h2>1. Acceptance of Terms</h2>
          <p>
            By accessing and using this website, you accept and agree to be bound by the terms and
            provision of this agreement.
          </p>

          <h2>2. Use License</h2>
          <p>
            Permission is granted to temporarily download one copy of the materials (information or
            software) on InstaTrack's website for personal, non-commercial transitory viewing only.
          </p>

          <h2>3. User Account</h2>
          <p>
            If you create an account on the website, you are responsible for maintaining the security of
            your account and you are fully responsible for all activities that occur under the account.
          </p>

          <h2>4. Privacy Policy</h2>
          <p>
            Your use of InstaTrack is also governed by our Privacy Policy. Please review our Privacy
            Policy, which also governs the Site and informs users of our data collection practices.
          </p>

          <h2>5. Electronic Communications</h2>
          <p>
            When you use InstaTrack or send emails to us, you are communicating with us electronically.
            You consent to receive communications from us electronically.
          </p>

          <h2>6. User Content</h2>
          <p>
            You retain your rights to any content you submit, post or display on or through InstaTrack.
            By submitting, posting or displaying content on or through InstaTrack, you grant us a
            worldwide, non-exclusive, royalty-free license to use, copy, reproduce, process, adapt,
            modify, publish, transmit, display and distribute such content.
          </p>

          <h2>7. Modifications</h2>
          <p>
            InstaTrack reserves the right, at its sole discretion, to modify or replace any part of
            this Agreement. It is your responsibility to check this Agreement periodically for changes.
          </p>

          <h2>8. Termination</h2>
          <p>
            We may terminate or suspend access to our Service immediately, without prior notice or
            liability, for any reason whatsoever, including without limitation if you breach the Terms.
          </p>

          <h2>9. Governing Law</h2>
          <p>
            These Terms shall be governed and construed in accordance with the laws, without regard to
            its conflict of law provisions.
          </p>

          <h2>10. Contact Information</h2>
          <p>
            If you have any questions about these Terms, please contact us at support@instatrack.com.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
