module.exports = ({ fullName, email, phone, subject, message }) => `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8" />
    <title>New Contact Message</title>
</head>

<body
    style="
        margin:0;
        padding:40px;
        background:#f4f7fb;
        font-family:Arial,sans-serif;
    "
>

<table
    width="100%"
    cellpadding="0"
    cellspacing="0"
    style="
        max-width:700px;
        margin:auto;
        background:#ffffff;
        border-radius:12px;
        overflow:hidden;
        border:1px solid #e5e7eb;
    "
>

<tr>
    <td
        style="
            background:#2563eb;
            color:#fff;
            padding:24px;
            text-align:center;
            font-size:26px;
            font-weight:bold;
        "
    >
        Qalam Academy
    </td>
</tr>

<tr>
<td style="padding:30px;">

<h2 style="margin-top:0;">
📩 New Contact Message
</h2>

<p>
A new message has been submitted from the Contact Us page.
</p>

<table
    width="100%"
    cellpadding="10"
    cellspacing="0"
    style="
        border-collapse:collapse;
        margin-top:25px;
    "
>

<tr>
    <td width="170"><strong>Full Name</strong></td>
    <td>${fullName}</td>
</tr>

<tr>
    <td><strong>Email</strong></td>
    <td>${email}</td>
</tr>

<tr>
    <td><strong>Phone</strong></td>
    <td>${phone}</td>
</tr>

<tr>
    <td><strong>Subject</strong></td>
    <td>${subject}</td>
</tr>

<tr>
    <td
        valign="top"
    >
        <strong>Message</strong>
    </td>

    <td
        style="
            white-space:pre-wrap;
            line-height:1.8;
        "
    >
${message}
    </td>
</tr>

</table>

</td>
</tr>

<tr>
<td
    style="
        background:#f9fafb;
        padding:18px;
        text-align:center;
        color:#6b7280;
        font-size:13px;
    "
>
This email was generated automatically by
<strong>Qalam Academy</strong>.
</td>
</tr>

</table>

</body>
</html>
`;