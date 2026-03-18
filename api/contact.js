import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

async function verifyRecaptcha(token) {
  const response = await fetch('https://www.google.com/recaptcha/api/siteverify', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: `secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${token}`,
  });
  const data = await response.json();
  return data.success;
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { name, email, message, recaptchaToken } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  // Verify reCAPTCHA (skip if secret key not yet configured)
  if (process.env.RECAPTCHA_SECRET_KEY && !process.env.RECAPTCHA_SECRET_KEY.startsWith('your_')) {
    if (!recaptchaToken) {
      return res.status(400).json({ message: 'Please complete the reCAPTCHA.' });
    }
    const isHuman = await verifyRecaptcha(recaptchaToken);
    if (!isHuman) {
      return res.status(400).json({ message: 'reCAPTCHA verification failed. Please try again.' });
    }
  }

  const submittedAt = new Date().toLocaleString('en-US', {
    timeZone: 'America/Chicago',
    dateStyle: 'full',
    timeStyle: 'short',
  });

  const htmlBody = `
<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8" /></head>
<body style="margin:0;padding:0;background:#f4f4f4;font-family:Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f4f4;padding:32px 0;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:10px;overflow:hidden;box-shadow:0 2px 12px rgba(0,0,0,0.08);">

          <!-- Header -->
          <tr>
            <td style="background:#1a2e4a;padding:28px 36px;">
              <p style="margin:0;color:#a8c4e0;font-size:12px;letter-spacing:2px;text-transform:uppercase;font-weight:bold;">3D Massage — Katy, TX</p>
              <h1 style="margin:6px 0 0;color:#ffffff;font-size:22px;font-weight:bold;">New Contact Form Message</h1>
            </td>
          </tr>

          <!-- Notice bar -->
          <tr>
            <td style="background:#e8f0f8;padding:12px 36px;border-left:4px solid #1a2e4a;">
              <p style="margin:0;color:#1a2e4a;font-size:13px;font-weight:bold;">
                📬 Someone submitted the contact form on your website.
              </p>
            </td>
          </tr>

          <!-- Contact details -->
          <tr>
            <td style="padding:32px 36px 0;">
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="padding:10px 0;border-bottom:1px solid #f0f0f0;">
                    <p style="margin:0;font-size:11px;color:#888;text-transform:uppercase;letter-spacing:1px;font-weight:bold;">Name</p>
                    <p style="margin:4px 0 0;font-size:16px;color:#1a2e4a;font-weight:bold;">${name}</p>
                  </td>
                </tr>
                <tr>
                  <td style="padding:10px 0;border-bottom:1px solid #f0f0f0;">
                    <p style="margin:0;font-size:11px;color:#888;text-transform:uppercase;letter-spacing:1px;font-weight:bold;">Email</p>
                    <p style="margin:4px 0 0;font-size:16px;">
                      <a href="mailto:${email}" style="color:#2a6496;text-decoration:none;">${email}</a>
                    </p>
                  </td>
                </tr>
                <tr>
                  <td style="padding:10px 0;">
                    <p style="margin:0;font-size:11px;color:#888;text-transform:uppercase;letter-spacing:1px;font-weight:bold;">Submitted</p>
                    <p style="margin:4px 0 0;font-size:14px;color:#555;">${submittedAt} (Central Time)</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Message -->
          <tr>
            <td style="padding:24px 36px;">
              <p style="margin:0 0 8px;font-size:11px;color:#888;text-transform:uppercase;letter-spacing:1px;font-weight:bold;">Message</p>
              <div style="background:#f8f9fa;border-left:4px solid #a8c4e0;border-radius:4px;padding:16px 20px;">
                <p style="margin:0;font-size:15px;color:#333;line-height:1.7;white-space:pre-wrap;">${message}</p>
              </div>
            </td>
          </tr>

          <!-- CTA -->
          <tr>
            <td style="padding:0 36px 32px;">
              <a href="mailto:${email}" style="display:inline-block;background:#1a2e4a;color:#ffffff;font-size:14px;font-weight:bold;padding:12px 28px;border-radius:6px;text-decoration:none;letter-spacing:0.5px;">
                Reply to ${name}
              </a>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background:#f8f9fa;padding:20px 36px;border-top:1px solid #eee;">
              <p style="margin:0;font-size:12px;color:#aaa;line-height:1.6;">
                This email was sent automatically from the contact form at <strong>3dmassagekaty.com</strong>.<br />
                Do not reply to this email directly — use the "Reply to ${name}" button above.
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `.trim();

  try {
    await resend.emails.send({
      from: 'Contact Form <onboarding@resend.dev>',
      to: process.env.CONTACT_RECIPIENT_EMAIL,
      reply_to: email,
      subject: `New message from ${name} — 3D Massage Contact Form`,
      html: htmlBody,
    });

    res.status(200).json({ success: true });
  } catch (error) {
    console.error('Resend error:', error);
    res.status(500).json({ message: 'Failed to send email. Please try again.' });
  }
}
