/**
 * Zerythous Enterprise Automation Hub
 * Integrates Google Apps Script (Google Sheets persistence) and Resend (Smart Mailing Automation)
 */

export interface SubmissionPayload {
  type: "contact_form" | "project_brief"
  timestamp: string
  name: string
  email: string
  phone?: string | null
  company?: string | null
  subjectOrProject?: string
  messageOrRequirements?: string
  budget?: string | null
  timeline?: string | null
  services?: string[]
}

/**
 * Dispatches form data to Google Apps Script Webhook
 * Appends rows seamlessly to Google Sheets
 */
export async function sendToGoogleAppsScript(payload: SubmissionPayload) {
  const scriptUrl = process.env.GOOGLE_APPS_SCRIPT_URL || process.env.NEXT_PUBLIC_GOOGLE_SCRIPT_URL

  if (!scriptUrl) {
    console.info("[Automations] Google Apps Script URL not configured. Skipping webhook.")
    return { success: false, reason: "NOT_CONFIGURED" }
  }

  try {
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 6000)

    const response = await fetch(scriptUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
      signal: controller.signal,
    })

    clearTimeout(timeoutId)

    if (response.ok) {
      return { success: true }
    } else {
      console.warn("[Automations] Google Apps Script returned status:", response.status)
      return { success: false, status: response.status }
    }
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err)
    console.error("[Automations] Error dispatching to Google Apps Script:", message)
    return { success: false, error: message }
  }
}

/**
 * Dispatches transactional emails via Resend API
 */
export async function sendResendEmail({
  to,
  subject,
  html,
  replyTo,
}: {
  to: string | string[]
  subject: string
  html: string
  replyTo?: string
}) {
  const apiKey = process.env.RESEND_API_KEY
  const fromEmail = process.env.RESEND_FROM_EMAIL || "Zerythous AI <briefs@zerythous.com>"

  if (!apiKey) {
    console.info("[Automations] Resend API Key not configured. Skipping email dispatch.")
    return { success: false, reason: "NOT_CONFIGURED" }
  }

  try {
    const recipientList = Array.isArray(to) ? to : [to]
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 7000)

    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: fromEmail,
        to: recipientList,
        subject,
        html,
        reply_to: replyTo,
      }),
      signal: controller.signal,
    })

    clearTimeout(timeoutId)

    if (response.ok) {
      const result = await response.json()
      return { success: true, data: result }
    } else {
      const errorText = await response.text()
      console.error("[Automations] Resend API error:", response.status, errorText)
      return { success: false, status: response.status, error: errorText }
    }
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err)
    console.error("[Automations] Error sending email via Resend:", message)
    return { success: false, error: message }
  }
}

/**
 * Generates an executive celebration confirmation email for the client
 */
export function generateClientCelebrationEmailHtml({
  clientName,
  projectName,
  services,
  budget,
  timeline,
}: {
  clientName: string
  projectName?: string
  services?: string[]
  budget?: string | null
  timeline?: string | null
}) {
  const referenceId = `ZTX-${Math.floor(100000 + Math.random() * 900000)}`

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>Your Zerythous Architecture Blueprint</title>
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin: 0; padding: 0; background-color: #050505; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #ffffff;">
  <table width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: #050505; padding: 40px 20px;">
    <tr>
      <td align="center">
        <table width="600" border="0" cellspacing="0" cellpadding="0" style="max-width: 600px; background-color: #0a0a0a; border: 1px solid #262626; border-radius: 12px; overflow: hidden; box-shadow: 0 20px 40px rgba(0,0,0,0.8);">
          <!-- Top Accent Banner -->
          <tr>
            <td style="background: linear-gradient(90deg, #10b981 0%, #059669 50%, #047857 100%); height: 4px;"></td>
          </tr>
          <!-- Header -->
          <tr>
            <td style="padding: 36px 40px 20px 40px;">
              <table width="100%" border="0" cellspacing="0" cellpadding="0">
                <tr>
                  <td>
                    <span style="font-size: 20px; font-weight: 800; letter-spacing: -0.5px; color: #ffffff; text-transform: uppercase;">
                      ZERYTHOUS<span style="color: #10b981;">.</span>
                    </span>
                  </td>
                  <td align="right">
                    <span style="display: inline-block; padding: 4px 10px; border-radius: 9999px; font-size: 11px; font-weight: 600; background-color: rgba(16, 185, 129, 0.12); color: #10b981; border: 1px solid rgba(16, 185, 129, 0.3);">
                      REF: ${referenceId}
                    </span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <!-- Body Content -->
          <tr>
            <td style="padding: 20px 40px 30px 40px;">
              <h1 style="font-size: 24px; font-weight: 700; line-height: 1.3; margin: 0 0 16px 0; color: #ffffff;">
                Your Architecture Brief Has Been Received.
              </h1>
              <p style="font-size: 15px; line-height: 1.6; color: #a3a3a3; margin: 0 0 24px 0;">
                Hello <strong style="color: #ffffff;">${clientName}</strong>,
              </p>
              <p style="font-size: 15px; line-height: 1.6; color: #a3a3a3; margin: 0 0 24px 0;">
                Thank you for entrusting Zerythous with your mission-critical initiative. Our architectural review committee is currently analyzing your technical scope to produce an end-to-end implementation blueprint.
              </p>

              <!-- Project Summary Card -->
              <table width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: #121212; border: 1px solid #262626; border-radius: 8px; margin-bottom: 28px;">
                <tr>
                  <td style="padding: 20px;">
                    <div style="font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; color: #10b981; margin-bottom: 12px;">
                      Architecture Overview
                    </div>
                    ${projectName ? `<div style="font-size: 14px; color: #d4d4d4; margin-bottom: 8px;"><strong style="color: #ffffff;">Initiative:</strong> ${projectName}</div>` : ""}
                    ${services && services.length > 0 ? `<div style="font-size: 14px; color: #d4d4d4; margin-bottom: 8px;"><strong style="color: #ffffff;">Required Capabilities:</strong> ${services.join(", ")}</div>` : ""}
                    ${budget ? `<div style="font-size: 14px; color: #d4d4d4; margin-bottom: 8px;"><strong style="color: #ffffff;">Allocated Capital:</strong> ${budget}</div>` : ""}
                    ${timeline ? `<div style="font-size: 14px; color: #d4d4d4;"><strong style="color: #ffffff;">Delivery Window:</strong> ${timeline}</div>` : ""}
                  </td>
                </tr>
              </table>

              <!-- Timeline Steps -->
              <div style="margin-bottom: 28px;">
                <div style="font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px; color: #ffffff; margin-bottom: 14px;">
                  What Happens Next
                </div>
                <table width="100%" border="0" cellspacing="0" cellpadding="0">
                  <tr>
                    <td width="32" valign="top" style="padding-bottom: 14px;">
                      <span style="display: inline-block; width: 22px; height: 22px; border-radius: 50%; background-color: #10b981; color: #000000; text-align: center; line-height: 22px; font-size: 11px; font-weight: bold;">1</span>
                    </td>
                    <td valign="top" style="padding-bottom: 14px;">
                      <div style="font-size: 14px; font-weight: 600; color: #ffffff;">Technical Feasibility & Architecture Triage (2-4 hrs)</div>
                      <div style="font-size: 13px; color: #737373;">Our Principal Engineers evaluate stack requirements, multi-agent frameworks, and data topologies.</div>
                    </td>
                  </tr>
                  <tr>
                    <td width="32" valign="top">
                      <span style="display: inline-block; width: 22px; height: 22px; border-radius: 50%; background-color: #262626; color: #ffffff; text-align: center; line-height: 22px; font-size: 11px; font-weight: bold;">2</span>
                    </td>
                    <td valign="top">
                      <div style="font-size: 14px; font-weight: 600; color: #ffffff;">Executive Blueprint Delivery (Within 24 hrs)</div>
                      <div style="font-size: 13px; color: #737373;">You receive a tailored system design, sprint milestones, and an invitation to an architect session.</div>
                    </td>
                  </tr>
                </table>
              </div>

              <!-- CTA Button -->
              <table width="100%" border="0" cellspacing="0" cellpadding="0">
                <tr>
                  <td align="center">
                    <a href="https://calendly.com/zerythous" target="_blank" style="display: inline-block; background-color: #10b981; color: #000000; font-weight: 700; font-size: 14px; padding: 14px 28px; border-radius: 6px; text-decoration: none; letter-spacing: 0.3px;">
                      Direct Architect Dispatch & Call →
                    </a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <!-- Footer -->
          <tr>
            <td style="padding: 24px 40px; background-color: #070707; border-top: 1px solid #1a1a1a; text-align: center;">
              <p style="font-size: 12px; color: #525252; margin: 0 0 6px 0;">
                Zerythous Systems & Enterprise AI Engineering • Confidential & Proprietary
              </p>
              <p style="font-size: 11px; color: #404040; margin: 0;">
                This automated transmission confirms your architecture inquiry. All rights reserved.
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
`
}

/**
 * Generates an internal executive alert email for the Zerythous admin team
 */
export function generateExecutiveAlertEmailHtml(payload: SubmissionPayload) {
  return `
<!DOCTYPE html>
<html lang="en">
<body style="font-family: -apple-system, sans-serif; background-color: #0f172a; color: #f8fafc; padding: 24px;">
  <div style="max-width: 580px; margin: 0 auto; background-color: #1e293b; border: 1px solid #334155; border-radius: 8px; padding: 24px;">
    <div style="background-color: #059669; color: #ffffff; padding: 6px 12px; border-radius: 4px; display: inline-block; font-size: 12px; font-weight: bold; margin-bottom: 16px;">
      🚨 NEW ${payload.type === "project_brief" ? "ENTERPRISE PROJECT BRIEF" : "DIRECT INQUIRY"}
    </div>
    <h2 style="margin: 0 0 16px 0; font-size: 20px; color: #ffffff;">${payload.name} has submitted a new inquiry</h2>
    
    <table width="100%" cellpadding="6" style="border-collapse: collapse; font-size: 14px;">
      <tr><td style="color: #94a3b8; width: 140px;">Client Name:</td><td><strong>${payload.name}</strong></td></tr>
      <tr><td style="color: #94a3b8;">Email Address:</td><td><a href="mailto:${payload.email}" style="color: #38bdf8;">${payload.email}</a></td></tr>
      ${payload.phone ? `<tr><td style="color: #94a3b8;">Phone:</td><td>${payload.phone}</td></tr>` : ""}
      ${payload.company ? `<tr><td style="color: #94a3b8;">Company:</td><td>${payload.company}</td></tr>` : ""}
      ${payload.subjectOrProject ? `<tr><td style="color: #94a3b8;">Initiative / Subject:</td><td>${payload.subjectOrProject}</td></tr>` : ""}
      ${payload.budget ? `<tr><td style="color: #94a3b8;">Budget Tier:</td><td><strong>${payload.budget}</strong></td></tr>` : ""}
      ${payload.timeline ? `<tr><td style="color: #94a3b8;">Timeline:</td><td>${payload.timeline}</td></tr>` : ""}
      ${payload.services && payload.services.length ? `<tr><td style="color: #94a3b8;">Capabilities:</td><td>${payload.services.join(", ")}</td></tr>` : ""}
    </table>

    <div style="margin-top: 20px; padding: 12px; background-color: #0f172a; border-radius: 6px; font-size: 13px; color: #cbd5e1;">
      <strong>Details / Message:</strong><br/>
      ${payload.messageOrRequirements || "No additional notes provided."}
    </div>

    <div style="margin-top: 24px;">
      <a href="http://localhost:3000/admin/pipeline" style="background-color: #10b981; color: #000; text-decoration: none; padding: 10px 18px; border-radius: 6px; font-size: 13px; font-weight: bold; display: inline-block;">
        Open Deal in Admin Pipeline →
      </a>
    </div>
  </div>
</body>
</html>
`
}
