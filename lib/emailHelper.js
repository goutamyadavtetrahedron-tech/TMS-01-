/**
 * Helper utility to determine dynamic email subjects and format rich lead notification emails.
 */

export function getDynamicEmailSubject(data = {}) {
  const { name = 'Visitor', company, role, pagePath = '', pageTitle = '', formType = 'contact' } = data;
  const displayName = company ? `${company} (${name})` : name;

  if (formType === 'apply' || role || pagePath.includes('/career')) {
    const jobRole = role || 'Career Opportunity';
    return `[Job Application - ${jobRole}] New Application from ${name}`;
  }

  const path = pagePath.toLowerCase();

  // Manufacturing Excellence Services
  if (
    path.includes('/manufacturing-operational-excellence-consulting') ||
    path.includes('/tpm-consultants') ||
    path.includes('/tqm-consultants') ||
    path.includes('/lean-manufacturing-consultants') ||
    path.includes('/manufacturing-excellence') ||
    path.includes('/visual-management-consultants')
  ) {
    let serviceName = "Manufacturing Excellence Services";
    if (path.includes('/manufacturing-operational-excellence-consulting')) serviceName = "Operational Excellence";
    else if (path.includes('/tpm-consultants')) serviceName = "TPM Consulting";
    else if (path.includes('/tqm-consultants')) serviceName = "TQM Consulting";
    else if (path.includes('/lean-manufacturing-consultants')) serviceName = "Lean Manufacturing";
    else if (path.includes('/manufacturing-excellence')) serviceName = "Manufacturing Cost Reduction";
    else if (path.includes('/visual-management-consultants')) serviceName = "Visual Management";
    return `[Lead - Manufacturing Excellence] ${serviceName} Inquiry from ${displayName}`;
  }

  // Plant Layout Design
  if (path.includes('/plant-layout-design')) {
    return `[Lead - Plant Layout Design] New Inquiry from ${displayName}`;
  }

  // Dojo Training Center
  if (path.includes('/dojo-training-center') || path.includes('/dojo-2-0') || path.includes('/mini-dojo-training-center')) {
    let dojoName = "Dojo Training Center";
    if (path.includes('/dojo-2-0')) dojoName = "DOJO 2.0";
    else if (path.includes('/mini-dojo')) dojoName = "Mini DOJO";
    return `[Lead - Dojo Training Center] ${dojoName} Inquiry from ${displayName}`;
  }

  // Digitization & Smart Factory
  if (path.includes('/digitization') || path.includes('/smart-factory')) {
    return `[Lead - Digitization & Smart Factory] New Inquiry from ${displayName}`;
  }

  // ISO Implementation
  if (path.includes('/iso-') || path.includes('/iso-certification-consultants')) {
    return `[Lead - ISO Implementation] Inquiry from ${displayName}`;
  }

  // Skill Training Subcategories
  if (path.includes('/corporate-training-companies/technical-trainings')) {
    return `[Lead - Technical Training] Inquiry from ${displayName}`;
  }
  if (path.includes('/corporate-training-companies/process-improvement-training-courses')) {
    return `[Lead - Process Improvement Training] Inquiry from ${displayName}`;
  }
  if (path.includes('/corporate-training-companies/strategic-training')) {
    return `[Lead - Strategic Training] Inquiry from ${displayName}`;
  }
  if (path.includes('/corporate-training-companies/behavioural-training')) {
    return `[Lead - Behavioural Training] Inquiry from ${displayName}`;
  }
  if (path.includes('/corporate-training-companies')) {
    return `[Lead - Skill Training] Corporate Training Inquiry from ${displayName}`;
  }

  // AMR / AGV / RGV
  if (path.includes('/automated-guided-vehicle-manufacturers') || path.includes('/agv') || path.includes('/amr')) {
    return `[Lead - AMR/AGV/RGV Automation] New Inquiry from ${displayName}`;
  }

  // Energy Audit
  if (path.includes('/energy-audit-and-efficiency-services')) {
    return `[Lead - Energy Cost Reduction] New Inquiry from ${displayName}`;
  }

  // Contact Page
  if (path.includes('/contact-us')) {
    return `[Lead - Contact Us] New Inquiry from ${displayName}`;
  }

  // Home Page
  if (path === '/' || path === '') {
    return `[Lead - Home Page] Website Inquiry from ${displayName}`;
  }

  // Fallback using Page Title or Path
  const cleanCategory = pageTitle ? pageTitle.split('|')[0].trim() : 'Website';
  return `[Lead - ${cleanCategory}] New Inquiry from ${displayName}`;
}

export function formatAdminEmailHtml(data = {}) {
  const {
    name = '',
    company = '',
    email = '',
    mobile = '',
    requirements = '',
    role = '',
    linkedin = '',
    coverLetter = '',
    pageUrl = '',
    pagePath = '',
    pageTitle = '',
    referrer = '',
    submissionTime = '',
    formType = 'contact',
  } = data;

  const isCareer = formType === 'apply' || !!role;
  const heading = isCareer ? `New Job Application: ${role}` : 'New Lead / Website Inquiry';
  const timeFormatted = submissionTime || new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }) + ' (IST)';

  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <style>
        body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f4f6f9; margin: 0; padding: 20px; color: #333; }
        .container { max-width: 650px; background: #ffffff; margin: 0 auto; border-radius: 10px; overflow: hidden; box-shadow: 0 4px 15px rgba(0,0,0,0.08); border: 1px solid #e1e8ed; }
        .header { background: linear-gradient(135deg, #ff6600, #ff8800); padding: 24px; text-align: center; color: #ffffff; }
        .header h2 { margin: 0; font-size: 22px; font-weight: 700; }
        .content { padding: 25px; }
        .section-title { font-size: 15px; text-transform: uppercase; letter-spacing: 1px; color: #ff6600; font-weight: 700; margin-bottom: 12px; border-bottom: 2px solid #fff0e6; padding-bottom: 6px; }
        table { width: 100%; border-collapse: collapse; margin-bottom: 20px; }
        th, td { padding: 10px 12px; text-align: left; font-size: 14px; border-bottom: 1px solid #f0f0f0; }
        th { width: 35%; color: #666; font-weight: 600; background: #fafafa; }
        td { color: #111; word-break: break-word; }
        .message-box { background: #f9fbfd; border-left: 4px solid #ff6600; padding: 15px; font-size: 14px; color: #222; border-radius: 4px; line-height: 1.6; white-space: pre-wrap; margin-bottom: 20px; }
        .footer { background: #f8f9fa; text-align: center; padding: 15px; font-size: 12px; color: #888; border-top: 1px solid #eee; }
        a { color: #ff6600; text-decoration: none; word-break: break-all; }
        a:hover { text-decoration: underline; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h2>${heading}</h2>
        </div>
        <div class="content">

          <div class="section-title">Lead Information</div>
          <table>
            ${isCareer ? `<tr><th>Applied Role</th><td><strong>${role}</strong></td></tr>` : ''}
            <tr><th>Full Name</th><td><strong>${name}</strong></td></tr>
            ${company ? `<tr><th>Company Name</th><td>${company}</td></tr>` : ''}
            <tr><th>Email Address</th><td><a href="mailto:${email}">${email}</a></td></tr>
            <tr><th>Mobile Number</th><td><a href="tel:${mobile}">${mobile}</a></td></tr>
            ${linkedin ? `<tr><th>LinkedIn Profile</th><td><a href="${linkedin}" target="_blank">${linkedin}</a></td></tr>` : ''}
          </table>

          <div class="section-title">${isCareer ? 'Cover Letter / Remarks' : 'Requirements / Message'}</div>
          <div class="message-box">${isCareer ? (coverLetter || 'No cover letter provided.') : (requirements || 'No requirements specified.')}</div>

          <div class="section-title">Submission Context & Source</div>
          <table>
            <tr><th>Submission Date & Time</th><td>${timeFormatted}</td></tr>
            ${pageUrl ? `<tr><th>Page URL</th><td><a href="${pageUrl}" target="_blank">${pageUrl}</a></td></tr>` : ''}
            ${pagePath ? `<tr><th>Page Path</th><td><code>${pagePath}</code></td></tr>` : ''}
            ${pageTitle ? `<tr><th>Page Title</th><td>${pageTitle}</td></tr>` : ''}
            ${referrer ? `<tr><th>Traffic Referrer</th><td>${referrer}</td></tr>` : ''}
          </table>

        </div>
        <div class="footer">
          Notification sent automatically from Tetrahedron Website Lead Management System.
        </div>
      </div>
    </body>
    </html>
  `;
}

export function formatAdminEmailText(data = {}) {
  const {
    name = '',
    company = '',
    email = '',
    mobile = '',
    requirements = '',
    role = '',
    linkedin = '',
    coverLetter = '',
    pageUrl = '',
    pagePath = '',
    pageTitle = '',
    referrer = '',
    submissionTime = '',
    formType = 'contact',
  } = data;

  const isCareer = formType === 'apply' || !!role;
  const timeFormatted = submissionTime || new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }) + ' (IST)';

  return `
==================================================
${isCareer ? `NEW JOB APPLICATION: ${role}` : 'NEW WEBSITE LEAD / INQUIRY'}
==================================================

LEAD DETAILS:
--------------------------------------------------
${isCareer ? `Applied Role: ${role}\n` : ''}Name: ${name}
${company ? `Company: ${company}\n` : ''}Email: ${email}
Mobile: ${mobile}
${linkedin ? `LinkedIn: ${linkedin}\n` : ''}
${isCareer ? 'COVER LETTER:' : 'REQUIREMENTS / MESSAGE:'}
--------------------------------------------------
${isCareer ? coverLetter : requirements}

SUBMISSION CONTEXT & SOURCE:
--------------------------------------------------
Submission Time: ${timeFormatted}
${pageUrl ? `Page URL: ${pageUrl}\n` : ''}${pagePath ? `Page Path: ${pagePath}\n` : ''}${pageTitle ? `Page Title: ${pageTitle}\n` : ''}${referrer ? `Referrer Source: ${referrer}\n` : ''}
==================================================
  `.trim();
}
